import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  FileQuestion,
  GraduationCap,
  Info,
  ShieldCheck,
  User,
} from 'lucide-react'
import type { Assessment, SyllabusProfile } from '../types'
import './AssessmentChooser.css'

interface AssessmentChooserProps {
  syllabus?: SyllabusProfile
  assessments: Assessment[]
  questionCount: (assessmentId: string) => number
  onSelect: (assessmentId: string) => void
}

const groupMeta: Record<
  Assessment['type'],
  { label: string; icon: typeof FileQuestion; color: string }
> = {
  quiz: { label: 'Weekly Quizzes', icon: FileQuestion, color: 'quiz' },
  exam: { label: 'Midterm Exams', icon: GraduationCap, color: 'exam' },
  final: { label: 'Cumulative Final', icon: Award, color: 'final' },
}

export function AssessmentChooser({
  syllabus,
  assessments,
  questionCount,
  onSelect,
}: AssessmentChooserProps) {
  if (!syllabus && assessments.length === 0) {
    return (
      <section className="assessment-empty">
        <div className="assessment-empty__icon-wrapper">
          <Info size={32} />
        </div>
        <h2>Official Catalog Listing</h2>
        <p>
          This course is indexed directly from the university catalog for course discovery.
          Verified practice sets, quizzes, and exams for this specific offering are currently in development.
        </p>
      </section>
    )
  }

  return (
    <div className="assessment-page">
      {/* Syllabus / Practice Provenance Banner */}
      {syllabus ? (
        <section className="source-banner">
          <div className="source-banner__top">
            <div className="source-banner__status">
              <span className="badge badge-success">
                <ShieldCheck size={13} aria-hidden="true" />
                {syllabus.status === 'current' ? 'Verified Current Syllabus' : 'Prior-Term Syllabus Preview'}
              </span>
            </div>
            <a
              href={syllabus.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="source-banner__link"
            >
              <span>View Official PDF</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="source-banner__content">
            <h2 className="source-banner__term">{syllabus.term} Offering</h2>
            <div className="source-banner__meta-row">
              <span className="source-banner__meta-item">
                <User size={14} aria-hidden="true" />
                <strong>{syllabus.instructor}</strong>
              </span>
              <span className="source-banner__divider" aria-hidden="true">•</span>
              <span className="source-banner__meta-item">
                <Calendar size={14} aria-hidden="true" />
                Section {syllabus.section}
              </span>
            </div>
            <p className="source-banner__note">
              Practice problems and quiz milestones follow the official lecture schedule.
            </p>
          </div>
        </section>
      ) : (
        <section className="source-banner source-banner--practice">
          <div className="source-banner__top">
            <span className="badge badge-primary">
              <BookOpen size={13} aria-hidden="true" />
              General Course Practice
            </span>
          </div>
          <div className="source-banner__content">
            <h2 className="source-banner__term">Core Curriculum Review</h2>
            <p className="source-banner__note">
              Questions come from the shared subject bank covering key course concepts and problem types.
            </p>
          </div>
        </section>
      )}

      {/* Assessment Groups */}
      <section className="assessment-groups" aria-label="Available assessments">
        <div className="assessment-groups__header">
          <h2>Select an assessment to begin</h2>
          <span className="badge badge-neutral">
            {assessments.length} assessment{assessments.length === 1 ? '' : 's'} available
          </span>
        </div>

        {(['quiz', 'exam', 'final'] as const).map((type) => {
          const group = assessments.filter((assessment) => assessment.type === type)
          if (group.length === 0) return null

          const { label, icon: Icon, color } = groupMeta[type]

          return (
            <div className="assessment-group" key={type}>
              <div className="assessment-group__title-row">
                <div className={`assessment-group__icon-tag assessment-group__icon-tag--${color}`}>
                  <Icon size={16} aria-hidden="true" />
                </div>
                <h3>{label}</h3>
              </div>

              <div className="assessment-grid">
                {group.map((assessment) => {
                  const count = questionCount(assessment.id)
                  const isAvailable = count > 0

                  return (
                    <button
                      type="button"
                      className={`assessment-card assessment-card--${color}`}
                      key={assessment.id}
                      onClick={() => onSelect(assessment.id)}
                      disabled={!isAvailable}
                    >
                      <div className="assessment-card__header">
                        <span className="assessment-card__label">{assessment.label}</span>
                        <span className={`assessment-card__count ${isAvailable ? 'badge badge-primary' : 'badge badge-neutral'}`}>
                          {isAvailable ? `${count} questions` : 'Coming soon'}
                        </span>
                      </div>

                      <p className="assessment-card__coverage">{assessment.coverageNote}</p>

                      <div className="assessment-card__footer">
                        <span className="assessment-card__cta">
                          {isAvailable ? 'Start Practice' : 'Not yet available'}
                        </span>
                        {isAvailable && <ArrowRight size={15} className="assessment-card__arrow" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
