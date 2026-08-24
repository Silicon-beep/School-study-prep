export type QuestionType = 'mcq_single'

export interface College {
  id: string
  name: string
  state: string
  sortOrder: number
}

/**
 * A shared pool of questions for an equivalent course taught at many colleges —
 * UNT's BIOL 1710 and UT Austin's BIO 311C both point at the same bank.
 */
export interface QuestionBank {
  id: string
  name: string
}

/** Course codes are college-specific, so ids must be namespaced: `unt-biol-1710`. */
export interface Course {
  id: string
  collegeId: string
  code: string
  title: string
  bankId: string | null
  department?: string
  description?: string
  credits?: string
  sourceUrl?: string
  catalogYear?: string
  sortOrder: number
}

export type SyllabusStatus = 'current' | 'prior_term_preview'

export interface SyllabusProfile {
  id: string
  courseId: string
  term: string
  instructor: string
  section: string
  sourceUrl: string
  sourceTitle: string
  retrievedAt: string
  status: SyllabusStatus
  sortOrder: number
}

export interface SyllabusSection {
  id: string
  syllabusId: string
  title: string
  description: string
  questionIds: string[]
  sortOrder: number
}

export type AssessmentType = 'quiz' | 'exam' | 'final'

interface AssessmentBase {
  id: string
  type: AssessmentType
  label: string
  coverageNote: string
  sectionIds: string[]
  questionIds: string[]
  sortOrder: number
}

export interface OfficialAssessment extends AssessmentBase {
  source: 'official_syllabus'
  syllabusId: string
}

export interface PracticeAssessment extends AssessmentBase {
  source: 'general_practice'
  bankId: string
}

export type Assessment = OfficialAssessment | PracticeAssessment

export interface Choice {
  id: string
  questionId: string
  body: string
  isCorrect: boolean
  sortOrder: number
}

export interface Question {
  id: string
  bankId: string
  type: QuestionType
  stem: string
  explanation: string
  difficulty: number
  source: string | null
  active: boolean
}

/** A question joined with its choices — the shape the UI actually renders. */
export interface QuestionWithChoices extends Question {
  choices: Choice[]
}
