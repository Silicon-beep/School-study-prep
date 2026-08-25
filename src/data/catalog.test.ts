import { describe, expect, it } from 'vitest'
import { banks, colleges, collegeStateGroups, courses } from './catalog'
import { catalogSources } from './catalog-sources'
import {
  getCompletedAssessments,
  getEnrolledCourseIds,
  mixedQuestionsForCourses,
  recordAssessmentCompletion,
  saveEnrolledCourseIds,
} from './index'

const addedCollegeIds = colleges.slice(10).map(({ id }) => id).sort()
const ivyCollegeIds = [
  'brown',
  'columbia',
  'cornell',
  'dartmouth',
  'harvard',
  'penn',
  'princeton',
  'yale',
]

describe('college catalog', () => {
  it('contains thirty-eight unique colleges across nineteen states', () => {
    expect(colleges).toHaveLength(38)
    expect(new Set(colleges.map(({ id }) => id)).size).toBe(38)
    expect(new Set(colleges.map(({ state }) => state)).size).toBe(19)
  })

  it('provides the four core courses at every college', () => {
    const coreBankIds = ['bio-1', 'calc-1', 'chem-1', 'psyc-1']

    for (const college of colleges) {
      const collegeCourses = courses.filter(({ collegeId }) => collegeId === college.id)
      expect(collegeCourses.map(({ bankId }) => bankId).sort(), college.id).toEqual(
        expect.arrayContaining(coreBankIds),
      )
    }
  })

  it('adds expanded STEM and Gen-Ed courses at three Texas universities', () => {
    expect(courses.length).toBeGreaterThanOrEqual(167)

    for (const collegeId of ['unt', 'ut-austin', 'tamu']) {
      const bankIds = courses
        .filter((course) => course.collegeId === collegeId)
        .map(({ bankId }) => bankId)

      expect(bankIds, collegeId).toEqual(
        expect.arrayContaining(['physics-1', 'stats-1', 'econ-1', 'math-1180', 'comm-1']),
      )
    }

    expect(new Set(courses.flatMap(({ bankId }) => bankId ? [bankId] : []))).toEqual(
      new Set(banks.map(({ id }) => id)),
    )
  })

  it('generates a balanced mixed question set across multiple enrolled courses', () => {
    const untSchedule = ['unt-econ-1100', 'unt-math-1180', 'unt-comm-1010', 'unt-biol-1710']
    const mixed = mixedQuestionsForCourses(untSchedule, 20)

    expect(mixed).toHaveLength(20)
    const bankSet = new Set(mixed.map((q) => q.bankId))
    expect(bankSet).toContain('econ-1')
    expect(bankSet).toContain('math-1180')
    expect(bankSet).toContain('comm-1')
    expect(bankSet).toContain('bio-1')
  })

  it('persists and retrieves student schedule and assessment history', () => {
    saveEnrolledCourseIds('unt', ['unt-econ-1100', 'unt-comm-1010'])
    expect(getEnrolledCourseIds('unt')).toEqual(['unt-econ-1100', 'unt-comm-1010'])

    recordAssessmentCompletion('econ-1-practice-quiz-1', 'unt-econ-1100', 9, 10)
    const history = getCompletedAssessments()
    expect(history['econ-1-practice-quiz-1']).toMatchObject({
      assessmentId: 'econ-1-practice-quiz-1',
      courseId: 'unt-econ-1100',
      score: 9,
      total: 10,
    })
  })

  it('includes all eight Ivy League schools with four core courses each', () => {
    expect(
      colleges.filter(({ id }) => ivyCollegeIds.includes(id)).map(({ id }) => id).sort(),
    ).toEqual([...ivyCollegeIds].sort())

    for (const collegeId of ivyCollegeIds) {
      const collegeCourses = courses.filter((course) => course.collegeId === collegeId)
      expect(collegeCourses, collegeId).toHaveLength(4)
      expect(collegeCourses.map(({ bankId }) => bankId).sort(), collegeId).toEqual([
        'bio-1',
        'calc-1',
        'chem-1',
        'psyc-1',
      ])
    }
  })

  it('groups states and colleges alphabetically', () => {
    const stateNames = collegeStateGroups.map(({ name }) => name)
    expect(stateNames).toEqual([...stateNames].sort((a, b) => a.localeCompare(b)))

    for (const group of collegeStateGroups) {
      const collegeNames = group.colleges.map(({ name }) => name)
      expect(collegeNames, group.code).toEqual(
        [...collegeNames].sort((a, b) => a.localeCompare(b)),
      )
    }
  })

  it('records an official catalog source for every added college', () => {
    expect(catalogSources.map(({ collegeId }) => collegeId).sort()).toEqual(addedCollegeIds)
    expect(new Set(catalogSources.map(({ collegeId }) => collegeId)).size).toBe(catalogSources.length)
    expect(catalogSources.every(({ url }) => url.startsWith('https://'))).toBe(true)
  })

  it('uses unique college and course identifiers', () => {
    expect(new Set(colleges.map(({ id }) => id)).size).toBe(colleges.length)
    expect(new Set(courses.map(({ id }) => id)).size).toBe(courses.length)
  })
})