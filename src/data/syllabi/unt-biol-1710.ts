import type { Assessment, SyllabusProfile, SyllabusSection } from '../../types'

const syllabusId = 'unt-biol-1710-fall-2026-oyesanya-501'

const questionRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => `bio-1-${String(start + index).padStart(3, '0')}`)

const quiz1QuestionIds = questionRange(10, 19)
const quiz2QuestionIds = ['bio-1-001', ...questionRange(20, 28)]
const quiz3QuestionIds = ['bio-1-006', 'bio-1-009', ...questionRange(29, 36)]
const quiz4QuestionIds = ['bio-1-005', ...questionRange(37, 45)]
const quiz5QuestionIds = ['bio-1-008', ...questionRange(46, 54)]
const quiz6QuestionIds = questionRange(55, 64)
const quiz7QuestionIds = questionRange(65, 74)
const quiz8QuestionIds = questionRange(75, 84)

export const untBiol1710Syllabi: SyllabusProfile[] = [
  {
    id: syllabusId,
    courseId: 'unt-biol-1710',
    term: 'Fall 2026',
    instructor: 'Dr. Regina Oyesanya',
    section: '501',
    sourceUrl:
      'https://s3.amazonaws.com/mirror.facultyinfo.unt.edu/rao0107%2Fschteach%2FFall%202026%20Syllabus%20-%20Biology%20for%20Science%20Major%20I%20BIOL%201710-501-1.pdf',
    sourceTitle: 'BIOL 1710-501 Fall 2026 Course Syllabus',
    retrievedAt: '2026-08-23',
    status: 'current',
    sortOrder: 1,
  },
]

export const untBiol1710Sections: SyllabusSection[] = [
  {
    id: `${syllabusId}-module-1`,
    syllabusId,
    title: 'Module 1 · Foundations and cells',
    description: 'Lectures 01–07 · Chapters 1–4 and viruses',
    questionIds: [...quiz1QuestionIds, ...quiz2QuestionIds],
    sortOrder: 1,
  },
  {
    id: `${syllabusId}-module-2`,
    syllabusId,
    title: 'Module 2 · Cell energy and transport',
    description: 'Lectures 08–14 · Chapters 5–8',
    questionIds: ['bio-1-003', 'bio-1-007', ...quiz3QuestionIds, ...quiz4QuestionIds],
    sortOrder: 2,
  },
  {
    id: `${syllabusId}-module-3`,
    syllabusId,
    title: 'Module 3 · Cell cycle and inheritance',
    description: 'Lectures 15–21 · Chapters 9–12',
    questionIds: ['bio-1-002', ...quiz5QuestionIds, ...quiz6QuestionIds],
    sortOrder: 3,
  },
  {
    id: `${syllabusId}-module-4`,
    syllabusId,
    title: 'Module 4 · Molecular genetics and evolution',
    description: 'Lectures 22–25 · Chapters 13–15 and 21',
    questionIds: ['bio-1-004', ...quiz7QuestionIds, ...quiz8QuestionIds],
    sortOrder: 4,
  },
]

export const untBiol1710Assessments: Assessment[] = [
  {
    id: `${syllabusId}-quiz-1`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 1',
    coverageNote: 'Scheduled with Chapter 3: Carbon and molecular diversity of life',
    sectionIds: [],
    questionIds: quiz1QuestionIds,
    sortOrder: 1,
  },
  {
    id: `${syllabusId}-quiz-2`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 2',
    coverageNote: 'Scheduled with Chapter 4: The cell and viruses',
    sectionIds: [],
    questionIds: quiz2QuestionIds,
    sortOrder: 2,
  },
  {
    id: `${syllabusId}-quiz-3`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 3',
    coverageNote: 'Scheduled with Chapter 6: Metabolism',
    sectionIds: [],
    questionIds: quiz3QuestionIds,
    sortOrder: 3,
  },
  {
    id: `${syllabusId}-quiz-4`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 4',
    coverageNote: 'Scheduled with Chapter 8: Photosynthesis',
    sectionIds: [],
    questionIds: quiz4QuestionIds,
    sortOrder: 4,
  },
  {
    id: `${syllabusId}-quiz-5`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 5',
    coverageNote: 'Scheduled with Chapter 10: Meiosis and sexual reproduction',
    sectionIds: [],
    questionIds: quiz5QuestionIds,
    sortOrder: 5,
  },
  {
    id: `${syllabusId}-quiz-6`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 6',
    coverageNote: 'Scheduled with Chapter 12: Chromosomal basis of inheritance',
    sectionIds: [],
    questionIds: quiz6QuestionIds,
    sortOrder: 6,
  },
  {
    id: `${syllabusId}-quiz-7`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 7',
    coverageNote: 'Scheduled with Chapter 14: Gene expression',
    sectionIds: [],
    questionIds: quiz7QuestionIds,
    sortOrder: 7,
  },
  {
    id: `${syllabusId}-quiz-8`,
    source: 'official_syllabus',
    syllabusId,
    type: 'quiz',
    label: 'Quiz 8',
    coverageNote: 'Scheduled with Chapter 21: Evolution',
    sectionIds: [],
    questionIds: quiz8QuestionIds,
    sortOrder: 8,
  },
  ...untBiol1710Sections.map((section, index): Assessment => ({
    id: `${syllabusId}-exam-${index + 1}`,
    source: 'official_syllabus',
    syllabusId,
    type: 'exam',
    label: `Exam ${index + 1}`,
    coverageNote: section.description,
    sectionIds: [section.id],
    questionIds: [],
    sortOrder: 20 + index,
  })),
  {
    id: `${syllabusId}-final`,
    source: 'official_syllabus',
    syllabusId,
    type: 'final',
    label: 'Cumulative Final Exam',
    coverageNote: 'All chapters; date and final details are listed as TBD in the syllabus',
    sectionIds: untBiol1710Sections.map((section) => section.id),
    questionIds: [],
    sortOrder: 30,
  },
]
