import { describe, expect, it } from 'vitest'
import type { Assessment } from '../../types'
import { questions } from '../questions'
import {
  assessmentsForSyllabus,
  questionsForAssessment,
  resolveAssessmentQuestions,
  syllabiForCourse,
  validateSyllabusData,
} from '.'

describe('UNT BIOL 1710 syllabus mapping', () => {
  const [syllabus] = syllabiForCourse('unt-biol-1710')

  it('belongs only to the UNT BIOL 1710 course', () => {
    expect(syllabus).toMatchObject({
      term: 'Fall 2026',
      instructor: 'Dr. Regina Oyesanya',
      section: '501',
      status: 'current',
    })
    expect(syllabiForCourse('ut-austin-bio-311c')).toEqual([])
  })

  it('resolves only questions from the biology bank', () => {
    for (const assessment of assessmentsForSyllabus(syllabus.id)) {
      expect(questionsForAssessment(assessment.id).every((question) => question.bankId === 'bio-1')).toBe(true)
    }
  })

  it('reuses every quiz question in its owning exam', () => {
    const assessments = assessmentsForSyllabus(syllabus.id)
    const examByQuiz = [1, 1, 2, 2, 3, 3, 4, 4]

    examByQuiz.forEach((examNumber, index) => {
      const quiz = assessments.find(({ label }) => label === `Quiz ${index + 1}`)
      const exam = assessments.find(({ label }) => label === `Exam ${examNumber}`)
      const examQuestionIds = new Set(exam ? questionsForAssessment(exam.id).map(({ id }) => id) : [])

      expect(quiz).toBeDefined()
      expect(exam).toBeDefined()
      expect(quiz && questionsForAssessment(quiz.id).every(({ id }) => examQuestionIds.has(id))).toBe(true)
    })
  })

  it('provides ten questions for every quiz and at least ten for every exam', () => {
    const assessments = assessmentsForSyllabus(syllabus.id)

    for (const assessment of assessments.filter(({ type }) => type === 'quiz')) {
      expect(questionsForAssessment(assessment.id), assessment.label).toHaveLength(10)
    }

    for (const assessment of assessments.filter(({ type }) => type === 'exam')) {
      expect(questionsForAssessment(assessment.id).length, assessment.label).toBeGreaterThanOrEqual(10)
    }

    expect(
      Object.fromEntries(assessments.map(({ id, label }) => [label, questionsForAssessment(id).length])),
    ).toMatchObject({
      'Exam 1': 20,
      'Exam 2': 22,
      'Exam 3': 21,
      'Exam 4': 21,
      'Cumulative Final Exam': 84,
    })
  })

  it('builds the cumulative final from the deduplicated exam question pool', () => {
    const assessments = assessmentsForSyllabus(syllabus.id)
    const exams = assessments.filter(({ type }) => type === 'exam')
    const final = assessments.find(({ type }) => type === 'final')
    const examQuestionIds = new Set(
      exams.flatMap((assessment) => questionsForAssessment(assessment.id).map(({ id }) => id)),
    )

    expect(final).toBeDefined()
    expect(final && questionsForAssessment(final.id).map(({ id }) => id).sort()).toEqual(
      [...examQuestionIds].sort(),
    )
  })

  it('skips a missing question reference without crashing', () => {
    const assessment: Assessment = {
      id: 'missing-question-test',
      source: 'official_syllabus',
      syllabusId: syllabus.id,
      type: 'quiz',
      label: 'Missing question test',
      coverageNote: '',
      sectionIds: [],
      questionIds: ['bio-1-001', 'bio-1-does-not-exist'],
      sortOrder: 1,
    }

    expect(resolveAssessmentQuestions(assessment, [], questions).map((question) => question.id)).toEqual([
      'bio-1-001',
    ])
  })

  it('passes catalog validation', () => {
    expect(validateSyllabusData()).toEqual([])
  })
})