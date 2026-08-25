import type {
  College,
  CompletedAssessmentRecord,
  Course,
  QuestionWithChoices,
} from '../types'
import { colleges, courses } from './catalog'
import { questions } from './questions'

export { banks, colleges, collegeStateGroups, courses, stateNames } from './catalog'
export { questions } from './questions'
export {
  assessmentsForCourse,
  assessmentsForSyllabus,
  practiceAssessmentsForCourse,
  findAssessment,
  findSyllabus,
  questionsForAssessment,
  resolveAssessmentQuestions,
  syllabiForCourse,
  validateSyllabusData,
} from './syllabi'

export function findCollege(collegeId: string): College | undefined {
  return colleges.find((c) => c.id === collegeId)
}

export function findCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId)
}

export function coursesForCollege(collegeId: string): Course[] {
  return courses
    .filter((c) => c.collegeId === collegeId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function questionsForCourse(courseId: string): QuestionWithChoices[] {
  const course = findCourse(courseId)
  if (!course?.bankId) return []
  return questions.filter((q) => q.bankId === course.bankId && q.active)
}

const SCHEDULE_KEY_PREFIX = 'study.schedule.'
const HISTORY_KEY = 'study.history'

const memoryStore = new Map<string, string>()

function getStorageItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      const val = localStorage.getItem(key)
      if (val !== null) return val
    }
  } catch {
    // Fallback to memory
  }
  return memoryStore.get(key) ?? null
}

function setStorageItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem(key, value)
    }
  } catch {
    // Fallback to memory
  }
  memoryStore.set(key, value)
}

export function getEnrolledCourseIds(collegeId: string): string[] {
  try {
    const raw = getStorageItem(`${SCHEDULE_KEY_PREFIX}${collegeId}`)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveEnrolledCourseIds(collegeId: string, courseIds: string[]): void {
  try {
    setStorageItem(`${SCHEDULE_KEY_PREFIX}${collegeId}`, JSON.stringify(courseIds))
  } catch {
    // Ignore storage quota errors
  }
}

export function getCompletedAssessments(): Record<string, CompletedAssessmentRecord> {
  try {
    const raw = getStorageItem(HISTORY_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, CompletedAssessmentRecord>
  } catch {
    return {}
  }
}

export function recordAssessmentCompletion(
  assessmentId: string,
  courseId: string,
  score: number,
  total: number,
): void {
  try {
    const history = getCompletedAssessments()
    history[assessmentId] = {
      assessmentId,
      courseId,
      score,
      total,
      completedAt: new Date().toISOString(),
    }
    setStorageItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // Ignore storage quota errors
  }
}

export function mixedQuestionsForCourses(courseIds: string[], count = 20): QuestionWithChoices[] {
  const eligibleCourses = courseIds
    .map((id) => findCourse(id))
    .filter((c): c is Course => Boolean(c?.bankId))

  if (eligibleCourses.length === 0) return []

  const pool = eligibleCourses.flatMap((course) =>
    questions.filter((q) => q.bankId === course.bankId && q.active),
  )

  if (pool.length <= count) return pool

  const perCourseTarget = Math.max(1, Math.floor(count / eligibleCourses.length))
  const selected: QuestionWithChoices[] = []
  const seenIds = new Set<string>()

  for (const course of eligibleCourses) {
    const courseQuestions = pool.filter((q) => q.bankId === course.bankId)
    const take = courseQuestions.slice(0, perCourseTarget)
    for (const q of take) {
      if (!seenIds.has(q.id)) {
        seenIds.add(q.id)
        selected.push(q)
      }
    }
  }

  for (const q of pool) {
    if (selected.length >= count) break
    if (!seenIds.has(q.id)) {
      seenIds.add(q.id)
      selected.push(q)
    }
  }

  return selected
}
