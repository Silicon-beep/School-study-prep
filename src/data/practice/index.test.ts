import { describe, expect, it } from 'vitest'
import { courses } from '../catalog'
import {
  assessmentsForCourse,
  questionsForAssessment,
  syllabiForCourse,
  validateSyllabusData,
} from '../syllabi'

describe('general course practice', () => {
  it('provides bank-backed practice for every course without an official syllabus', () => {
    const fallbackCourses = courses.filter(
      (course) => course.bankId && syllabiForCourse(course.id).length === 0,
    )

    expect(fallbackCourses).toHaveLength(166)
    for (const course of fallbackCourses) {
      const assessments = assessmentsForCourse(course.id)
      expect(assessments.length, course.id).toBeGreaterThan(0)
      expect(assessments.every(({ source }) => source === 'general_practice'), course.id).toBe(true)
      expect(
        assessments.every((assessment) =>
          questionsForAssessment(assessment.id).every(({ bankId }) => bankId === course.bankId),
        ),
        course.id,
      ).toBe(true)
    }
  })

  it('does not attach unrelated practice to catalog-only courses', () => {
    for (const course of courses.filter(({ bankId }) => bankId === null)) {
      expect(assessmentsForCourse(course.id), course.id).toEqual([])
    }
  })

  it('keeps official syllabus courses on official assessments only', () => {
    const [syllabus] = syllabiForCourse('unt-biol-1710')
    const assessments = assessmentsForCourse('unt-biol-1710', syllabus.id)

    expect(assessments).not.toHaveLength(0)
    expect(assessments.every(({ source }) => source === 'official_syllabus')).toBe(true)
  })

  it.each(['unt-chem-1410', 'unt-math-1710', 'unt-psyc-1630'])(
    'provides three quizzes, an exam, and a final for %s',
    (courseId) => {
      const assessments = assessmentsForCourse(courseId)
      const quizzes = assessments.filter(({ type }) => type === 'quiz')
      const exams = assessments.filter(({ type }) => type === 'exam')
      const finals = assessments.filter(({ type }) => type === 'final')

      expect(quizzes.map(({ id }) => questionsForAssessment(id).length)).toEqual([10, 10, 10])
      expect(exams.map(({ id }) => questionsForAssessment(id).length)).toEqual([20])
      expect(finals.map(({ id }) => questionsForAssessment(id).length)).toEqual([30])
    },
  )

  it.each(['unt-phys-1710', 'unt-math-1680', 'unt-econ-1100', 'unt-math-1180', 'unt-comm-1010'])(
    'provides two quizzes, an exam, and a final for %s',
    (courseId) => {
      const assessments = assessmentsForCourse(courseId)
      const quizzes = assessments.filter(({ type }) => type === 'quiz')
      const exams = assessments.filter(({ type }) => type === 'exam')
      const finals = assessments.filter(({ type }) => type === 'final')

      expect(quizzes.map(({ id }) => questionsForAssessment(id).length)).toEqual([10, 10])
      expect(exams.map(({ id }) => questionsForAssessment(id).length)).toEqual([20])
      expect(finals.map(({ id }) => questionsForAssessment(id).length)).toEqual([20])
    },
  )

  it('provides a full topic-based Biology plan for non-syllabus courses', () => {
    const assessments = assessmentsForCourse('ut-austin-bio-311c')

    expect(assessments.filter(({ type }) => type === 'quiz').map(({ id }) => questionsForAssessment(id).length)).toEqual(
      Array(8).fill(10),
    )
    expect(assessments.filter(({ type }) => type === 'exam').map(({ id }) => questionsForAssessment(id).length)).toEqual(
      [20, 20, 20, 20],
    )
    expect(
      assessments.filter(({ type }) => type === 'final').map(({ id }) => questionsForAssessment(id).length),
    ).toEqual([84])
  })

  it('passes assessment data validation', () => {
    expect(validateSyllabusData()).toEqual([])
  })
})