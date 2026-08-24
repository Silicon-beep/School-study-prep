import type { PracticeAssessment } from '../../types'

const range = (bankId: string, start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => `${bankId}-${String(start + index).padStart(3, '0')}`)

function plan(
  bankId: string,
  quizzes: Array<{ label: string; coverageNote: string; questionIds: string[] }>,
  additionalFinalQuestionIds: string[] = [],
): PracticeAssessment[] {
  const quizAssessments = quizzes.map((quiz, index): PracticeAssessment => ({
    id: `${bankId}-practice-quiz-${index + 1}`,
    source: 'general_practice',
    bankId,
    type: 'quiz',
    label: quiz.label,
    coverageNote: quiz.coverageNote,
    sectionIds: [],
    questionIds: quiz.questionIds,
    sortOrder: index + 1,
  }))
  const allIds = [...quizzes.flatMap(({ questionIds }) => questionIds), ...additionalFinalQuestionIds]

  if (quizzes.length <= 3) {
    return [
      ...quizAssessments,
      {
        id: `${bankId}-practice-exam-1`,
        source: 'general_practice',
        bankId,
        type: 'exam',
        label: 'Practice Exam',
        coverageNote: `${quizzes[0].coverageNote} and ${quizzes[1].coverageNote.toLowerCase()}`,
        sectionIds: [],
        questionIds: [...quizzes[0].questionIds, ...quizzes[1].questionIds],
        sortOrder: 20,
      },
      {
        id: `${bankId}-practice-final`,
        source: 'general_practice',
        bankId,
        type: 'final',
        label: 'Cumulative Practice Final',
        coverageNote: 'All topics in the general course practice bank',
        sectionIds: [],
        questionIds: allIds,
        sortOrder: 30,
      },
    ]
  }

  const examAssessments = [0, 1, 2, 3].map((index): PracticeAssessment => ({
    id: `${bankId}-practice-exam-${index + 1}`,
    source: 'general_practice',
    bankId,
    type: 'exam',
    label: `Practice Exam ${index + 1}`,
    coverageNote: `${quizzes[index * 2].coverageNote} and ${quizzes[index * 2 + 1].coverageNote.toLowerCase()}`,
    sectionIds: [],
    questionIds: [...quizzes[index * 2].questionIds, ...quizzes[index * 2 + 1].questionIds],
    sortOrder: 20 + index,
  }))

  return [
    ...quizAssessments,
    ...examAssessments,
    {
      id: `${bankId}-practice-final`,
      source: 'general_practice',
      bankId,
      type: 'final',
      label: 'Cumulative Practice Final',
      coverageNote: 'All topics in the general Biology I practice bank',
      sectionIds: [],
      questionIds: allIds,
      sortOrder: 30,
    },
  ]
}

const biologyQuizzes = [
  { label: 'Carbon and molecular diversity', coverageNote: 'Carbon chemistry and functional groups', questionIds: range('bio-1', 10, 19) },
  { label: 'Cells and viruses', coverageNote: 'Cell structures, organelles, and viruses', questionIds: ['bio-1-001', ...range('bio-1', 20, 28)] },
  { label: 'Metabolism', coverageNote: 'Energy, enzymes, and metabolic reactions', questionIds: ['bio-1-006', 'bio-1-009', ...range('bio-1', 29, 36)] },
  { label: 'Photosynthesis', coverageNote: 'Light reactions and the Calvin cycle', questionIds: ['bio-1-005', ...range('bio-1', 37, 45)] },
  { label: 'Meiosis and reproduction', coverageNote: 'Meiosis, gametes, and genetic variation', questionIds: ['bio-1-008', ...range('bio-1', 46, 54)] },
  { label: 'Chromosomal inheritance', coverageNote: 'Linkage, chromosome changes, and inheritance', questionIds: range('bio-1', 55, 64) },
  { label: 'Gene expression', coverageNote: 'Transcription, translation, and mutation', questionIds: range('bio-1', 65, 74) },
  { label: 'Evolution', coverageNote: 'Selection, drift, gene flow, and speciation', questionIds: range('bio-1', 75, 84) },
]

export const practiceAssessments: PracticeAssessment[] = [
  ...plan('bio-1', biologyQuizzes, ['bio-1-002', 'bio-1-003', 'bio-1-004', 'bio-1-007']),
  ...plan('chem-1', [
    { label: 'Matter and bonding', coverageNote: 'Atomic structure, bonding, and molecular properties', questionIds: ['chem-1-002', 'chem-1-003', 'chem-1-007', ...range('chem-1', 10, 16)] },
    { label: 'Moles and reactions', coverageNote: 'Moles, stoichiometry, reaction types, and redox', questionIds: ['chem-1-004', 'chem-1-005', 'chem-1-006', ...range('chem-1', 19, 23), 'chem-1-026', 'chem-1-027'] },
    { label: 'Gases, energy, and acids', coverageNote: 'Gases, thermochemistry, kinetics, equilibrium, and acids', questionIds: ['chem-1-001', 'chem-1-008', 'chem-1-009', 'chem-1-017', 'chem-1-018', ...range('chem-1', 24, 25), ...range('chem-1', 28, 30)] },
  ]),
  ...plan('calc-1', [
    { label: 'Limits and continuity', coverageNote: 'Limits, continuity, and derivative foundations', questionIds: ['calc-1-001', 'calc-1-002', 'calc-1-003', 'calc-1-006', ...range('calc-1', 10, 15)] },
    { label: 'Derivatives and applications', coverageNote: 'Derivative rules, rates, extrema, and concavity', questionIds: ['calc-1-005', 'calc-1-009', ...range('calc-1', 16, 23)] },
    { label: 'Integrals and accumulation', coverageNote: 'Antiderivatives, definite integrals, and the Fundamental Theorem', questionIds: ['calc-1-004', 'calc-1-007', 'calc-1-008', ...range('calc-1', 24, 30)] },
  ]),
  ...plan('psyc-1', [
    { label: 'Biology and research', coverageNote: 'Neuroscience, sleep, and research methods', questionIds: ['psyc-1-001', 'psyc-1-005', 'psyc-1-006', ...range('psyc-1', 10, 16)] },
    { label: 'Learning and memory', coverageNote: 'Conditioning, learning, memory, and cognition', questionIds: ['psyc-1-002', 'psyc-1-003', 'psyc-1-004', 'psyc-1-007', ...range('psyc-1', 18, 23)] },
    { label: 'Development and social behavior', coverageNote: 'Development, personality, and social psychology', questionIds: ['psyc-1-008', 'psyc-1-009', 'psyc-1-017', ...range('psyc-1', 24, 30)] },
  ]),
  ...plan('physics-1', [
    { label: 'Motion and forces', coverageNote: 'Kinematics, vectors, and Newton\'s laws', questionIds: range('physics-1', 1, 10) },
    { label: 'Energy and momentum', coverageNote: 'Work, energy, impulse, momentum, and circular motion', questionIds: range('physics-1', 11, 20) },
  ]),
  ...plan('stats-1', [
    { label: 'Data and probability', coverageNote: 'Distributions, descriptive statistics, and probability', questionIds: range('stats-1', 1, 10) },
    { label: 'Sampling and inference', coverageNote: 'Study design, confidence intervals, tests, and correlation', questionIds: range('stats-1', 11, 20) },
  ]),
]