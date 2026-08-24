import { mkdir, readdir, writeFile } from 'node:fs/promises'

const outputDirectory = new URL('../public/catalogs/', import.meta.url)

const sources = [
  ['tamu', 'https://catalog.tamu.edu/undergraduate/course-descriptions/'],
  ['utsa', 'https://catalog.utsa.edu/undergraduate/coursedescriptions/'],
  ['ut-austin', 'https://catalog.utexas.edu/courses/'],
  ['uiuc', 'https://catalog.illinois.edu/courses-of-instruction/'],
  ['uic', 'https://catalog.uic.edu/ucat/course-descriptions/'],
  ['cu-boulder', 'https://catalog.colorado.edu/courses-a-z/'],
  ['colorado-state', 'https://catalog.colostate.edu/general-catalog/courses-az/'],
  ['georgia-tech', 'https://catalog.gatech.edu/coursesaz/'],
  ['penn', 'https://catalog.upenn.edu/courses/'],
  ['penn-state', 'https://bulletins.psu.edu/university-course-descriptions/undergraduate/'],
  ['unc', 'https://catalog.unc.edu/courses/'],
  ['nc-state', 'https://catalog.ncsu.edu/course-descriptions/'],
  ['columbia', 'https://bulletin.columbia.edu/columbia-college/departments-instruction/'],
  ['uf', 'https://catalog.ufl.edu/UGRD/courses/'],
]

const onlyColleges = new Set(process.argv.slice(2))
const selectedSources = onlyColleges.size
  ? sources.filter(([collegeId]) => onlyColleges.has(collegeId))
  : sources

const SKIPPED_SEGMENTS = new Set(['course-search', 'print', 'pdf', 'search', 'archive'])
const SUBJECT_NUMBER = String.raw`([A-Z][A-Z&]{0,9}(?:\s[A-Z]{1,4})?)\s+([A-Z]{0,3}\d[A-Z0-9.-]*)`
// Cross-listed headings look like "BICH 201/GENE 201 Title"; keep the primary code only.
const CROSS_LIST_PREFIX = new RegExp(
  String.raw`^(?:\s*/\s*(?:[A-Z][A-Z&]{0,9}\s+)?\d[A-Z0-9.-]*)+\s*[:.\u2013-]?\s*`,
)
const CREDIT_UNITS = String.raw`(?:credit hours?|course units?|credits?|points?|hours?)`
const TRAILING_CREDITS = new RegExp(
  String.raw`[.,;\s]*\b(\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?\s+${CREDIT_UNITS})[\s.]*$`,
  'i',
)

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ndash;|&#8211;/gi, '-')
    .replace(/&mdash;|&#8212;/gi, '-')
    .replace(/&#(|[0-9]+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchHtml(url) {
  let lastError

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'StudyCatalogImporter/1.0 (course catalog snapshot)' },
      })
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
      return await response.text()
    } catch (error) {
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
    }
  }

  throw lastError
}

function subjectLinks(indexUrl, html) {
  const index = new URL(indexUrl)
  const links = new Map()
  const anchorPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi

  for (const match of html.matchAll(anchorPattern)) {
    let url
    try {
      url = new URL(match[1], index)
    } catch {
      continue
    }

    url.hash = ''
    url.search = ''
    if (url.origin !== index.origin || !url.pathname.startsWith(index.pathname)) continue
    if (url.pathname === index.pathname || !url.pathname.endsWith('/')) continue

    const segments = url.pathname.slice(index.pathname.length).replace(/\/$/, '').split('/')
    if (segments.length !== 1 || SKIPPED_SEGMENTS.has(segments[0])) continue

    links.set(url.href, { url: url.href, label: decodeHtml(match[2]) })
  }

  return [...links.values()]
}

function courseBlocks(html) {
  const marker = /<div\b[^>]*class=["'][^"']*\bcourseblock\b[^"']*["'][^>]*>/gi
  const starts = [...html.matchAll(marker)].map((match) => match.index)

  return starts.map((start, position) =>
    html.slice(start, starts[position + 1] ?? Math.min(html.length, start + 6000)),
  )
}

// Each supported CourseLeaf generation exposes the course heading differently.
function headingFrom(block) {
  const classicTitle = block.match(
    /<(p|h[1-6])\b[^>]*class=["'][^"']*\bcourseblocktitle\b[^"']*["'][^>]*>([\s\S]*?)<\/\1>/i,
  )
  if (classicTitle) return { combined: decodeHtml(classicTitle[2]), raw: classicTitle[2] }

  const codeTitle = block.match(
    /<div\b[^>]*class=["'][^"']*\bcourse_codetitle\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
  )
  if (codeTitle) return { combined: decodeHtml(codeTitle[1]), raw: codeTitle[1] }

  const code = block.match(
    /class=["'][^"']*\bdetail-(?:code|coursecode|ut_code)\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/i,
  )
  const title = block.match(/class=["'][^"']*\bdetail-title\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/i)
  if (code && title) {
    return { code: decodeHtml(code[1]), title: decodeHtml(title[1]), raw: `${code[1]} ${title[1]}` }
  }

  return null
}

function parseHeading(heading) {
  const toCode = (subject, number) => `${subject} ${number.replace(/[.\s]+$/, '')}`

  if (heading.code !== undefined) {
    const match = heading.code.match(new RegExp(`^${SUBJECT_NUMBER}`))
    return match ? { code: toCode(match[1], match[2]), title: heading.title } : null
  }

  const match = heading.combined.match(new RegExp(`^${SUBJECT_NUMBER}\\s*[.:\\u2013-]?\\s*(.+)$`))
  return match ? { code: toCode(match[1], match[2]), title: match[3] } : null
}

function coursesFromSubject(collegeId, subject, html) {
  const courses = []
  const seenCodes = new Set()

  for (const block of courseBlocks(html)) {
    const heading = headingFrom(block)
    if (!heading) continue

    const parsed = parseHeading(heading)
    if (!parsed) continue

    const code = parsed.code.replace(/\s+/g, ' ').trim()
    const titleText = parsed.title.replace(CROSS_LIST_PREFIX, '')
    const trailingCredits = titleText.match(TRAILING_CREDITS)?.[1]
    const title = titleText.replace(TRAILING_CREDITS, '').replace(/[.\s]+$/, '').trim()
    if (!title || seenCodes.has(code)) continue
    seenCodes.add(code)

    const details = decodeHtml(block.replace(heading.raw, ''))
    const credits =
      trailingCredits ??
      details.match(new RegExp(String.raw`\b\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?\s+${CREDIT_UNITS}\b`, 'i'))?.[0]

    courses.push({
      id: `${collegeId}-${code.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
      collegeId,
      code,
      title,
      department: subject.label || undefined,
      credits,
      sourceUrl: subject.url,
      catalogYear: '2026-27',
      sortOrder: courses.length + 1,
    })
  }

  return courses
}

async function importCollege(collegeId, indexUrl) {
  const indexHtml = await fetchHtml(indexUrl)
  const subjects = subjectLinks(indexUrl, indexHtml)
  if (subjects.length === 0) throw new Error('No subject links found')

  const collegeCourses = []
  const collegeWarnings = []
  const seenIds = new Set()

  for (const subject of subjects) {
    let subjectHtml
    try {
      subjectHtml = await fetchHtml(subject.url)
    } catch (error) {
      if (!error.message.startsWith('404 ')) throw error
      collegeWarnings.push(`${collegeId}: dead catalog index link: ${subject.url}`)
      continue
    }

    for (const course of coursesFromSubject(collegeId, subject, subjectHtml)) {
      if (seenIds.has(course.id)) continue
      seenIds.add(course.id)
      collegeCourses.push({ ...course, sortOrder: collegeCourses.length + 1 })
    }
  }

  if (collegeCourses.length === 0) throw new Error('No courses found')
  return { courses: collegeCourses, warnings: collegeWarnings }
}

await mkdir(outputDirectory, { recursive: true })

const failures = []
const warnings = []
const generatedAt = new Date().toISOString()

for (const [collegeId, indexUrl] of selectedSources) {
  try {
    const result = await importCollege(collegeId, indexUrl)
    warnings.push(...result.warnings)
    await writeFile(
      new URL(`${collegeId}.json`, outputDirectory),
      JSON.stringify({ generatedAt, courses: result.courses }),
    )
    console.log(`${collegeId}: ${result.courses.length} courses`)
  } catch (error) {
    failures.push(`${collegeId}: ${indexUrl}: ${error.message}`)
  }
}

const written = (await readdir(outputDirectory))
  .filter((name) => name.endsWith('.json') && name !== 'manifest.json')
  .map((name) => name.replace(/\.json$/, ''))
  .sort()

await writeFile(
  new URL('manifest.json', outputDirectory),
  `${JSON.stringify({ generatedAt, colleges: written }, null, 2)}\n`,
)

if (warnings.length > 0) console.warn(warnings.join('\n'))
console.log(`Catalog snapshots available for ${written.length} colleges`)

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exitCode = 1
}
