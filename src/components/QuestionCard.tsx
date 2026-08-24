import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, HelpCircle, XCircle } from 'lucide-react'
import type { QuestionWithChoices } from '../types'
import './QuestionCard.css'

interface QuestionCardProps {
  question: QuestionWithChoices
  onAnswered: (wasCorrect: boolean) => void
  onNext: () => void
  isLast: boolean
}

export function QuestionCard({ question, onAnswered, onNext, isLast }: QuestionCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const answered = selectedId !== null
  const selected = question.choices.find((c) => c.id === selectedId)
  const wasCorrect = selected?.isCorrect ?? false

  const handleSelect = useCallback(
    (choiceId: string, isCorrect: boolean) => {
      if (answered) return
      setSelectedId(choiceId)
      onAnswered(isCorrect)
    },
    [answered, onAnswered],
  )

  // Keyboard shortcut listener for A, B, C, D / 1, 2, 3, 4 and Enter
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (!answered) {
        const key = e.key.toUpperCase()
        const keys = ['A', 'B', 'C', 'D', 'E']
        const numKeys = ['1', '2', '3', '4', '5']

        let choiceIndex = keys.indexOf(key)
        if (choiceIndex === -1) choiceIndex = numKeys.indexOf(e.key)

        if (choiceIndex >= 0 && choiceIndex < question.choices.length) {
          const choice = question.choices[choiceIndex]
          handleSelect(choice.id, choice.isCorrect)
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answered, question.choices, onNext, handleSelect])

  function choiceClass(choiceId: string, isCorrect: boolean) {
    if (!answered) return 'choice'
    if (isCorrect) return 'choice choice--correct'
    if (choiceId === selectedId) return 'choice choice--wrong'
    return 'choice choice--muted'
  }

  return (
    <article className="card" aria-labelledby="question-stem">
      <div className="card__header">
        <span className="card__badge badge badge-neutral">
          <HelpCircle size={13} aria-hidden="true" />
          Multiple Choice
        </span>
        <span className="card__hint">Press A–D or 1–4 to answer</span>
      </div>

      <h2 id="question-stem" className="card__stem">
        {question.stem}
      </h2>

      <ul className="card__choices" role="list">
        {question.choices.map((choice, position) => (
          <li key={choice.id}>
            <button
              type="button"
              className={choiceClass(choice.id, choice.isCorrect)}
              onClick={() => handleSelect(choice.id, choice.isCorrect)}
              disabled={answered}
              aria-pressed={choice.id === selectedId}
            >
              <span className="choice__key" aria-hidden="true">
                {String.fromCharCode(65 + position)}
              </span>
              <span className="choice__body">{choice.body}</span>
              {answered && choice.isCorrect && (
                <CheckCircle2 className="choice__icon choice__icon--correct" size={20} aria-hidden="true" />
              )}
              {answered && !choice.isCorrect && choice.id === selectedId && (
                <XCircle className="choice__icon choice__icon--wrong" size={20} aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ul>

      {answered && (
        <div className={`card__feedback ${wasCorrect ? 'card__feedback--correct' : 'card__feedback--wrong'}`} role="status">
          <div className="card__verdict-row">
            <div className="card__verdict-icon">
              {wasCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
            </div>
            <div>
              <p className="verdict">
                {wasCorrect ? 'Correct! Well done.' : 'Incorrect.'}
              </p>
              <p className="card__explanation">{question.explanation}</p>
            </div>
          </div>

          <div className="card__action-row">
            <button type="button" className="btn-primary card__next-btn" onClick={onNext} autoFocus>
              <span>{isLast ? 'Complete Assessment' : 'Next Question'}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <span className="card__keyboard-shortcut">Press <kbd>Enter ↵</kbd></span>
          </div>
        </div>
      )}
    </article>
  )
}
