import type { College, Course, QuestionBank } from '../types'

// Course codes are illustrative and MUST be verified against each college's real catalog
// before this ships. Wrong codes are the fastest way to lose a student's trust.

export const banks: QuestionBank[] = [
  { id: 'bio-1', name: 'Introductory Biology I' },
  { id: 'chem-1', name: 'General Chemistry I' },
  { id: 'calc-1', name: 'Calculus I' },
  { id: 'psyc-1', name: 'General Psychology' },
  { id: 'physics-1', name: 'Physics I' },
  { id: 'stats-1', name: 'Introductory Statistics' },
]

export const colleges: College[] = [
  { id: 'unt', name: 'University of North Texas', state: 'TX', sortOrder: 1 },
  { id: 'ut-austin', name: 'University of Texas at Austin', state: 'TX', sortOrder: 2 },
  { id: 'tamu', name: 'Texas A&M University', state: 'TX', sortOrder: 3 },
  { id: 'ttu', name: 'Texas Tech University', state: 'TX', sortOrder: 4 },
  { id: 'uh', name: 'University of Houston', state: 'TX', sortOrder: 5 },
  { id: 'utsa', name: 'University of Texas at San Antonio', state: 'TX', sortOrder: 6 },
  { id: 'asu', name: 'Arizona State University', state: 'AZ', sortOrder: 7 },
  { id: 'osu', name: 'The Ohio State University', state: 'OH', sortOrder: 8 },
  { id: 'uf', name: 'University of Florida', state: 'FL', sortOrder: 9 },
  { id: 'umich', name: 'University of Michigan', state: 'MI', sortOrder: 10 },
  { id: 'uc-berkeley', name: 'University of California, Berkeley', state: 'CA', sortOrder: 11 },
  { id: 'ucla', name: 'University of California, Los Angeles', state: 'CA', sortOrder: 12 },
  { id: 'stony-brook', name: 'Stony Brook University', state: 'NY', sortOrder: 13 },
  { id: 'buffalo', name: 'University at Buffalo', state: 'NY', sortOrder: 14 },
  { id: 'penn-state', name: 'Pennsylvania State University', state: 'PA', sortOrder: 15 },
  { id: 'pitt', name: 'University of Pittsburgh', state: 'PA', sortOrder: 16 },
  { id: 'uiuc', name: 'University of Illinois Urbana-Champaign', state: 'IL', sortOrder: 17 },
  { id: 'uic', name: 'University of Illinois Chicago', state: 'IL', sortOrder: 18 },
  { id: 'unc', name: 'University of North Carolina at Chapel Hill', state: 'NC', sortOrder: 19 },
  { id: 'nc-state', name: 'North Carolina State University', state: 'NC', sortOrder: 20 },
  { id: 'uw', name: 'University of Washington', state: 'WA', sortOrder: 21 },
  { id: 'wsu', name: 'Washington State University', state: 'WA', sortOrder: 22 },
  { id: 'uva', name: 'University of Virginia', state: 'VA', sortOrder: 23 },
  { id: 'virginia-tech', name: 'Virginia Tech', state: 'VA', sortOrder: 24 },
  { id: 'umass-amherst', name: 'University of Massachusetts Amherst', state: 'MA', sortOrder: 25 },
  { id: 'umass-boston', name: 'University of Massachusetts Boston', state: 'MA', sortOrder: 26 },
  { id: 'cu-boulder', name: 'University of Colorado Boulder', state: 'CO', sortOrder: 27 },
  { id: 'colorado-state', name: 'Colorado State University', state: 'CO', sortOrder: 28 },
  { id: 'uga', name: 'University of Georgia', state: 'GA', sortOrder: 29 },
  { id: 'georgia-tech', name: 'Georgia Institute of Technology', state: 'GA', sortOrder: 30 },
  { id: 'brown', name: 'Brown University', state: 'RI', sortOrder: 31 },
  { id: 'columbia', name: 'Columbia University', state: 'NY', sortOrder: 32 },
  { id: 'cornell', name: 'Cornell University', state: 'NY', sortOrder: 33 },
  { id: 'dartmouth', name: 'Dartmouth College', state: 'NH', sortOrder: 34 },
  { id: 'harvard', name: 'Harvard University', state: 'MA', sortOrder: 35 },
  { id: 'penn', name: 'University of Pennsylvania', state: 'PA', sortOrder: 36 },
  { id: 'princeton', name: 'Princeton University', state: 'NJ', sortOrder: 37 },
  { id: 'yale', name: 'Yale University', state: 'CT', sortOrder: 38 },
]

export const stateNames: Record<string, string> = {
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  FL: 'Florida',
  GA: 'Georgia',
  IL: 'Illinois',
  MA: 'Massachusetts',
  MI: 'Michigan',
  NC: 'North Carolina',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NY: 'New York',
  OH: 'Ohio',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  TX: 'Texas',
  VA: 'Virginia',
  WA: 'Washington',
}

export interface CollegeStateGroup {
  code: string
  name: string
  colleges: College[]
}

export const collegeStateGroups: CollegeStateGroup[] = Object.entries(stateNames)
  .map(([code, name]) => ({
    code,
    name,
    colleges: colleges
      .filter((college) => college.state === code)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }))
  .filter(({ colleges: stateColleges }) => stateColleges.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name))

interface CourseSeed {
  code: string
  title: string
  bankId: string
}

const catalogByCollege: Record<string, CourseSeed[]> = {
  unt: [
    { code: 'BIOL 1710', title: 'Biology for Science Majors I', bankId: 'bio-1' },
    { code: 'CHEM 1410', title: 'General Chemistry for Science Majors I', bankId: 'chem-1' },
    { code: 'MATH 1710', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYC 1630', title: 'General Psychology', bankId: 'psyc-1' },
    { code: 'PHYS 1710', title: 'Mechanics', bankId: 'physics-1' },
    { code: 'MATH 1680', title: 'Elementary Probability and Statistics', bankId: 'stats-1' },
  ],
  'ut-austin': [
    { code: 'BIO 311C', title: 'Introductory Biology I', bankId: 'bio-1' },
    { code: 'CH 301', title: 'Principles of Chemistry I', bankId: 'chem-1' },
    { code: 'M 408C', title: 'Differential and Integral Calculus', bankId: 'calc-1' },
    { code: 'PSY 301', title: 'Introduction to Psychology', bankId: 'psyc-1' },
    { code: 'PHY 303K', title: 'Engineering Physics I', bankId: 'physics-1' },
    { code: 'SDS 301', title: 'Elementary Statistical Methods', bankId: 'stats-1' },
  ],
  tamu: [
    { code: 'BIOL 111', title: 'Introductory Biology I', bankId: 'bio-1' },
    { code: 'CHEM 119', title: 'Fundamentals of Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 151', title: 'Engineering Mathematics I', bankId: 'calc-1' },
    { code: 'PSYC 107', title: 'Introduction to Psychology', bankId: 'psyc-1' },
    { code: 'PHYS 206', title: 'Newtonian Mechanics for Engineering and Science', bankId: 'physics-1' },
    { code: 'STAT 211', title: 'Principles of Statistics I', bankId: 'stats-1' },
  ],
  ttu: [
    { code: 'BIOL 1403', title: 'Biology I', bankId: 'bio-1' },
    { code: 'CHEM 1307', title: 'Principles of Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 1451', title: 'Calculus I with Applications', bankId: 'calc-1' },
    { code: 'PSY 1300', title: 'General Psychology', bankId: 'psyc-1' },
  ],
  uh: [
    { code: 'BIOL 1361', title: 'Introduction to Biological Science I', bankId: 'bio-1' },
    { code: 'CHEM 1331', title: 'Fundamentals of Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 1431', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYC 1300', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  utsa: [
    { code: 'BIO 1404', title: 'Biosciences I', bankId: 'bio-1' },
    { code: 'CHE 1103', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MAT 1214', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSY 1013', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  asu: [
    { code: 'BIO 181', title: 'General Biology I', bankId: 'bio-1' },
    { code: 'CHM 113', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MAT 265', title: 'Calculus for Engineers I', bankId: 'calc-1' },
    { code: 'PSY 101', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  osu: [
    { code: 'BIOLOGY 1113', title: 'Energy Transfer and Development', bankId: 'bio-1' },
    { code: 'CHEM 1210', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 1151', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYCH 1100', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  uf: [
    { code: 'BSC 2010', title: 'Integrated Principles of Biology 1', bankId: 'bio-1' },
    { code: 'CHM 2045', title: 'General Chemistry 1', bankId: 'chem-1' },
    { code: 'MAC 2311', title: 'Analytic Geometry and Calculus 1', bankId: 'calc-1' },
    { code: 'PSY 2012', title: 'General Psychology', bankId: 'psyc-1' },
  ],
  umich: [
    { code: 'BIOLOGY 171', title: 'Introductory Biology', bankId: 'bio-1' },
    { code: 'CHEM 130', title: 'General Chemistry', bankId: 'chem-1' },
    { code: 'MATH 115', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYCH 111', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  'uc-berkeley': [
    { code: 'BIOLOGY 1A', title: 'General Biology Lecture', bankId: 'bio-1' },
    { code: 'CHEM 1A', title: 'General Chemistry', bankId: 'chem-1' },
    { code: 'MATH 1A', title: 'Calculus', bankId: 'calc-1' },
    { code: 'PSYCH 1', title: 'General Psychology', bankId: 'psyc-1' },
  ],
  ucla: [
    { code: 'LIFESCI 7A', title: 'Cell and Molecular Biology', bankId: 'bio-1' },
    { code: 'CHEM 20A', title: 'Chemical Structure', bankId: 'chem-1' },
    { code: 'MATH 31A', title: 'Differential and Integral Calculus', bankId: 'calc-1' },
    { code: 'PSYCH 10', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  'stony-brook': [
    { code: 'BIO 202', title: 'Molecular and Cellular Biology', bankId: 'bio-1' },
    { code: 'CHE 131', title: 'General Chemistry IB', bankId: 'chem-1' },
    { code: 'MAT 131', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSY 103', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  buffalo: [
    { code: 'BIO 200', title: 'Evolutionary Biology', bankId: 'bio-1' },
    { code: 'CHE 101', title: 'General Chemistry', bankId: 'chem-1' },
    { code: 'MTH 141', title: 'College Calculus I', bankId: 'calc-1' },
    { code: 'PSY 101', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  'penn-state': [
    { code: 'BIOL 110', title: 'Biology: Basic Concepts and Biodiversity', bankId: 'bio-1' },
    { code: 'CHEM 110', title: 'Chemical Principles I', bankId: 'chem-1' },
    { code: 'MATH 140', title: 'Calculus with Analytic Geometry I', bankId: 'calc-1' },
    { code: 'PSYCH 100', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  pitt: [
    { code: 'BIOSC 0150', title: 'Foundations of Biology 1', bankId: 'bio-1' },
    { code: 'CHEM 0110', title: 'General Chemistry 1', bankId: 'chem-1' },
    { code: 'MATH 0220', title: 'Analytic Geometry and Calculus 1', bankId: 'calc-1' },
    { code: 'PSY 0010', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  uiuc: [
    { code: 'MCB 150', title: 'Molecular and Cellular Basis of Life', bankId: 'bio-1' },
    { code: 'CHEM 102', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 220', title: 'Calculus', bankId: 'calc-1' },
    { code: 'PSYC 100', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  uic: [
    { code: 'BIOS 110', title: 'Biology of Cells and Organisms', bankId: 'bio-1' },
    { code: 'CHEM 122', title: 'Matter and Energy', bankId: 'chem-1' },
    { code: 'MATH 180', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSCH 100', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  unc: [
    { code: 'BIOL 101', title: 'Principles of Biology', bankId: 'bio-1' },
    { code: 'CHEM 101', title: 'General Descriptive Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 231', title: 'Calculus of Functions of One Variable I', bankId: 'calc-1' },
    { code: 'PSYC 101', title: 'General Psychology', bankId: 'psyc-1' },
  ],
  'nc-state': [
    { code: 'BIO 183', title: 'Introductory Biology: Cellular and Molecular Biology', bankId: 'bio-1' },
    { code: 'CH 101', title: 'Chemistry: A Molecular Science', bankId: 'chem-1' },
    { code: 'MA 141', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSY 200', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  uw: [
    { code: 'BIOL 180', title: 'Introductory Biology', bankId: 'bio-1' },
    { code: 'CHEM 142', title: 'General Chemistry', bankId: 'chem-1' },
    { code: 'MATH 124', title: 'Calculus with Analytic Geometry I', bankId: 'calc-1' },
    { code: 'PSYCH 101', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  wsu: [
    { code: 'BIOL 107', title: 'Introductory Biology: Cell Biology and Genetics', bankId: 'bio-1' },
    { code: 'CHEM 105', title: 'Principles of Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 171', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYCH 105', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  uva: [
    { code: 'BIOL 2100', title: 'Introduction to Biology with Lab: Cell Biology and Genetics', bankId: 'bio-1' },
    { code: 'CHEM 1410', title: 'Introductory College Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 1310', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYC 1010', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  'virginia-tech': [
    { code: 'BIOL 1105', title: 'Principles of Biology', bankId: 'bio-1' },
    { code: 'CHEM 1035', title: 'General Chemistry', bankId: 'chem-1' },
    { code: 'MATH 1225', title: 'Calculus of a Single Variable', bankId: 'calc-1' },
    { code: 'PSYC 1004', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  'umass-amherst': [
    { code: 'BIOLOGY 151', title: 'Introductory Biology I', bankId: 'bio-1' },
    { code: 'CHEM 111', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 131', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYCH 100', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  'umass-boston': [
    { code: 'BIOL 111', title: 'General Biology I', bankId: 'bio-1' },
    { code: 'CHEM 115', title: 'Chemical Principles I', bankId: 'chem-1' },
    { code: 'MATH 140', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYCH 100', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  'cu-boulder': [
    { code: 'EBIO 1210', title: 'General Biology 1', bankId: 'bio-1' },
    { code: 'CHEM 1113', title: 'General Chemistry 1', bankId: 'chem-1' },
    { code: 'MATH 1300', title: 'Calculus 1', bankId: 'calc-1' },
    { code: 'PSYC 1001', title: 'General Psychology', bankId: 'psyc-1' },
  ],
  'colorado-state': [
    { code: 'LIFE 102', title: 'Attributes of Living Systems', bankId: 'bio-1' },
    { code: 'CHEM 111', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 160', title: 'Calculus for Physical Scientists I', bankId: 'calc-1' },
    { code: 'PSY 100', title: 'General Psychology', bankId: 'psyc-1' },
  ],
  uga: [
    { code: 'BIOL 1107', title: 'Principles of Biology I', bankId: 'bio-1' },
    { code: 'CHEM 1211', title: 'Freshman Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 2250', title: 'Calculus I for Science and Engineering', bankId: 'calc-1' },
    { code: 'PSYC 1101', title: 'Elementary Psychology', bankId: 'psyc-1' },
  ],
  'georgia-tech': [
    { code: 'BIOS 1107', title: 'Biological Principles', bankId: 'bio-1' },
    { code: 'CHEM 1211K', title: 'Chemical Principles I', bankId: 'chem-1' },
    { code: 'MATH 1551', title: 'Differential Calculus', bankId: 'calc-1' },
    { code: 'PSYC 1101', title: 'General Psychology', bankId: 'psyc-1' },
  ],
  brown: [
    { code: 'BIOL 0200', title: 'The Foundation of Living Systems', bankId: 'bio-1' },
    { code: 'CHEM 0330', title: 'Equilibrium, Rate, and Structure', bankId: 'chem-1' },
    { code: 'MATH 0090', title: 'Introductory Calculus, Part I', bankId: 'calc-1' },
    { code: 'CLPS 0010', title: 'Mind, Brain and Behavior', bankId: 'psyc-1' },
  ],
  columbia: [
    { code: 'BIOL UN2005', title: 'Introductory Biology I', bankId: 'bio-1' },
    { code: 'CHEM UN1403', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH UN1101', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYC UN1001', title: 'The Science of Psychology', bankId: 'psyc-1' },
  ],
  cornell: [
    { code: 'BIOMG 1350', title: 'Cell and Developmental Biology', bankId: 'bio-1' },
    { code: 'CHEM 2070', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 1110', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSYCH 1101', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  dartmouth: [
    { code: 'BIOL 11', title: 'The Science of Life', bankId: 'bio-1' },
    { code: 'CHEM 5', title: 'General Chemistry', bankId: 'chem-1' },
    { code: 'MATH 3', title: 'Introduction to Calculus', bankId: 'calc-1' },
    { code: 'PSYC 1', title: 'Introductory Psychology', bankId: 'psyc-1' },
  ],
  harvard: [
    { code: 'LIFESCI 1A', title: 'An Integrated Introduction to the Life Sciences', bankId: 'bio-1' },
    { code: 'CHEM 10', title: 'General Chemistry', bankId: 'chem-1' },
    { code: 'MATH 1A', title: 'Introduction to Calculus', bankId: 'calc-1' },
    { code: 'PSY 1', title: 'Introduction to Psychological Science', bankId: 'psyc-1' },
  ],
  penn: [
    { code: 'BIOL 1121', title: 'Introduction to Biology A', bankId: 'bio-1' },
    { code: 'CHEM 1012', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 1400', title: 'Calculus, Part I', bankId: 'calc-1' },
    { code: 'PSYC 0001', title: 'Introduction to Experimental Psychology', bankId: 'psyc-1' },
  ],
  princeton: [
    { code: 'MOL 214', title: 'Introduction to Cellular and Molecular Biology', bankId: 'bio-1' },
    { code: 'CHM 201', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MAT 103', title: 'Calculus I', bankId: 'calc-1' },
    { code: 'PSY 101', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
  yale: [
    { code: 'BIOL 101', title: 'Biochemistry and Biophysics', bankId: 'bio-1' },
    { code: 'CHEM 161', title: 'General Chemistry I', bankId: 'chem-1' },
    { code: 'MATH 112', title: 'Calculus of Functions of One Variable I', bankId: 'calc-1' },
    { code: 'PSYC 110', title: 'Introduction to Psychology', bankId: 'psyc-1' },
  ],
}

// Ids are namespaced by college because course codes collide across schools.
const studyCourses: Course[] = Object.entries(catalogByCollege).flatMap(([collegeId, seeds]) =>
  seeds.map((seed, i) => ({
    id: `${collegeId}-${seed.code.toLowerCase().replace(/\s+/g, '-')}`,
    collegeId,
    code: seed.code,
    title: seed.title,
    bankId: seed.bankId,
    sortOrder: i + 1,
  })),
)

export const courses: Course[] = [...studyCourses]

export function registerOfficialCourses(officialCourses: Array<Omit<Course, 'bankId'>>) {
  const existingKeys = new Set(
    courses.map(({ collegeId, code }) => `${collegeId}:${code.toLocaleLowerCase()}`),
  )

  for (const course of officialCourses) {
    const key = `${course.collegeId}:${course.code.toLocaleLowerCase()}`
    if (existingKeys.has(key)) continue
    courses.push({ ...course, bankId: null })
    existingKeys.add(key)
  }
}
