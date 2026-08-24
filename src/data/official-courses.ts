import type { Course } from '../types'
import { registerOfficialCourses } from './catalog'

interface OfficialCourseFile {
  generatedAt: string
  courses: Array<Omit<Course, 'bankId'>>
}

const loadedColleges = new Set<string>()

export async function loadOfficialCourses(collegeId: string): Promise<boolean> {
  if (loadedColleges.has(collegeId)) return true

  const basePath = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
  const response = await fetch(`${basePath}catalogs/${collegeId}.json`)
  if (response.status === 404) return false
  if (!response.ok) throw new Error(`Unable to load course catalog (${response.status})`)

  // A dev-server SPA fallback answers missing snapshots with HTML rather than 404.
  if (!response.headers.get('content-type')?.includes('json')) return false

  const data = await response.json() as OfficialCourseFile
  registerOfficialCourses(data.courses)
  loadedColleges.add(collegeId)
  return true
}