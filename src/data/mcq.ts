import type { QuestionWithChoices } from '../types'

const CHOICE_SUFFIXES = 'abcdefgh'

/** Builder for the bank files — keeps each question readable instead of 15 lines of literal. */
export function mcq(
  bankId: string,
  id: string,
  stem: string,
  choices: [body: string, isCorrect: boolean][],
  explanation: string,
  difficulty = 1,
): QuestionWithChoices {
  return {
    id,
    bankId,
    type: 'mcq_single',
    stem,
    explanation,
    difficulty,
    source: null,
    active: true,
    choices: choices.map(([body, isCorrect], i) => ({
      id: `${id}-${CHOICE_SUFFIXES[i]}`,
      questionId: id,
      body,
      isCorrect,
      sortOrder: i + 1,
    })),
  }
}
