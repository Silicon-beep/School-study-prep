import type { College, Course, QuestionWithChoices } from '../types'
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
