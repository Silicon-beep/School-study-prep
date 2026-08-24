import type {
  Assessment,
  QuestionWithChoices,
  SyllabusProfile,
  SyllabusSection,
} from '../../types'
import { courses } from '../catalog'
import { questions } from '../questions'
import { practiceAssessments } from '../practice'
import {
  untBiol1710Assessments,
  untBiol1710Sections,
  untBiol1710Syllabi,
} from './unt-biol-1710'

export const syllabi: SyllabusProfile[] = [...untBiol1710Syllabi]
export const syllabusSections: SyllabusSection[] = [...untBiol1710Sections]
export const assessments: Assessment[] = [...untBiol1710Assessments, ...practiceAssessments]

export function syllabiForCourse(courseId: string): SyllabusProfile[] {
  return syllabi
    .filter((syllabus) => syllabus.courseId === courseId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function findSyllabus(syllabusId: string): SyllabusProfile | undefined {
  return syllabi.find((syllabus) => syllabus.id === syllabusId)
}

export function assessmentsForSyllabus(syllabusId: string): Assessment[] {
  return assessments
    .filter(
      (assessment) =>
        assessment.source === 'official_syllabus' && assessment.syllabusId === syllabusId,
    )
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function findAssessment(assessmentId: string): Assessment | undefined {
  return assessments.find((assessment) => assessment.id === assessmentId)
}

export function practiceAssessmentsForCourse(courseId: string): Assessment[] {
  const course = courses.find((item) => item.id === courseId)
  if (!course?.bankId) return []
  return practiceAssessments
    .filter((assessment) => assessment.bankId === course.bankId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function assessmentsForCourse(courseId: string, syllabusId?: string): Assessment[] {
  const courseSyllabi = syllabiForCourse(courseId)
  if (courseSyllabi.length > 0) {
    return syllabusId ? assessmentsForSyllabus(syllabusId) : []
  }
  return practiceAssessmentsForCourse(courseId)
}

export function resolveAssessmentQuestions(
  assessment: Assessment,
  sections: SyllabusSection[],
  availableQuestions: QuestionWithChoices[],
): QuestionWithChoices[] {
  const sectionQuestionIds = assessment.sectionIds.flatMap(
    (sectionId) => sections.find((section) => section.id === sectionId)?.questionIds ?? [],
  )
  const includedIds = new Set([...sectionQuestionIds, ...assessment.questionIds])
  return availableQuestions.filter((question) => includedIds.has(question.id) && question.active)
}

export function questionsForAssessment(assessmentId: string): QuestionWithChoices[] {
  const assessment = findAssessment(assessmentId)
  if (!assessment) return []
  return resolveAssessmentQuestions(assessment, syllabusSections, questions)
}

export function validateSyllabusData(): string[] {
  const issues: string[] = []
  const syllabusIds = new Set<string>()
  const assessmentIds = new Set<string>()

  for (const syllabus of syllabi) {
    if (syllabusIds.has(syllabus.id)) issues.push(`Duplicate syllabus id: ${syllabus.id}`)
    syllabusIds.add(syllabus.id)

    const course = courses.find((item) => item.id === syllabus.courseId)
    if (!course) issues.push(`Unknown course for syllabus: ${syllabus.id}`)
  }

  for (const assessment of assessments) {
    if (assessmentIds.has(assessment.id)) issues.push(`Duplicate assessment id: ${assessment.id}`)
    assessmentIds.add(assessment.id)

    if (assessment.source === 'general_practice') {
      for (const questionId of new Set(assessment.questionIds)) {
        const question = questions.find((item) => item.id === questionId)
        if (!question) issues.push(`Missing question ${questionId} in ${assessment.id}`)
        else if (question.bankId !== assessment.bankId) {
          issues.push(`Wrong-bank question ${questionId} in ${assessment.id}`)
        }
      }
      if (questionsForAssessment(assessment.id).length === 0) {
        issues.push(`Empty practice assessment: ${assessment.id}`)
      }
      continue
    }

    const syllabus = findSyllabus(assessment.syllabusId)
    const course = syllabus ? courses.find((item) => item.id === syllabus.courseId) : undefined
    if (!syllabus) issues.push(`Unknown syllabus for assessment: ${assessment.id}`)

    const referencedIds = [
      ...assessment.questionIds,
      ...assessment.sectionIds.flatMap(
        (sectionId) => syllabusSections.find((section) => section.id === sectionId)?.questionIds ?? [],
      ),
    ]
    for (const questionId of new Set(referencedIds)) {
      const question = questions.find((item) => item.id === questionId)
      if (!question) issues.push(`Missing question ${questionId} in ${assessment.id}`)
      else if (course && question.bankId !== course.bankId) {
        issues.push(`Wrong-bank question ${questionId} in ${assessment.id}`)
      }
    }
  }

  return issues
}
