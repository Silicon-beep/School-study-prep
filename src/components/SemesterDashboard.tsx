import { useMemo } from 'react'
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Zap,
} from 'lucide-react'
import type { Assessment, CompletedAssessmentRecord, Course } from '../types'
import './SemesterDashboard.css'

interface SemesterDashboardProps {
  collegeName: string
  enrolledCourses: Course[]
  onSelectCourse: (courseId: string) => void
  onStartMixedExam: () => void
  onAddMoreCourses: () => void
  onRemoveCourse: (courseId: string) => void
  history: Record<string, CompletedAssessmentRecord>
  getCourseAssessments: (courseId: string) => Assessment[]
}

export function SemesterDashboard({
  collegeName,
  enrolledCourses,
  onSelectCourse,
  onStartMixedExam,
  onAddMoreCourses,
  onRemoveCourse,
  history,
  getCourseAssessments,
}: SemesterDashboardProps) {
  const totalEnrolled = enrolledCourses.length
  const eligibleCourses = enrolledCourses.filter((c) => Boolean(c.bankId))

  const { courseStats, totalAssessmentsCount, completedCount, overallAccuracy } = useMemo(() => {
    const stats = enrolledCourses.map((course) => {
      const assessments = getCourseAssessments(course.id)
      const available = assessments.length
      const courseCompleted = assessments.filter((a) => history[a.id])
      const completed = courseCompleted.length

      let scoreSum = 0
      let possibleSum = 0
      for (const a of courseCompleted) {
        const rec = history[a.id]
        if (rec) {
          scoreSum += rec.score
          possibleSum += rec.total
        }
      }

      const accuracy = possibleSum > 0 ? Math.round((scoreSum / possibleSum) * 100) : null

      return {
        course,
        assessments,
        available,
        completed,
        accuracy,
        scoreSum,
        possibleSum,
      }
    })

    const assessmentsTotal = stats.reduce((acc, s) => acc + s.available, 0)
    const completedTotal = stats.reduce((acc, s) => acc + s.completed, 0)
    const totalScore = stats.reduce((acc, s) => acc + s.scoreSum, 0)
    const totalPossible = stats.reduce((acc, s) => acc + s.possibleSum, 0)
    const overall = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : null

    return {
      courseStats: stats,
      totalAssessmentsCount: assessmentsTotal,
      completedCount: completedTotal,
      overallAccuracy: overall,
    }
  }, [enrolledCourses, getCourseAssessments, history])

  return (
    <div className="semester-dashboard">
      {/* Dashboard Top Header */}
      <div className="dashboard-hero">
        <div className="dashboard-hero__top">
          <div className="dashboard-hero__text">
            <div className="dashboard-hero__badges">
              <span className="badge badge-primary">
                <GraduationCap size={13} aria-hidden="true" />
                {collegeName}
              </span>
              <span className="badge badge-neutral">
                {totalEnrolled} {totalEnrolled === 1 ? 'Course' : 'Courses'} Active
              </span>
            </div>
            <h1 className="dashboard-hero__title">My Semester Study Hub</h1>
            <p className="dashboard-hero__desc">
              Tailored quizzes, midterms, and syllabus milestones for your active semester courses.
            </p>
          </div>

          <div className="dashboard-hero__actions">
            <button type="button" className="btn-secondary dashboard-hero__add-btn" onClick={onAddMoreCourses}>
              <Plus size={16} aria-hidden="true" />
              <span>Add / Manage Courses</span>
            </button>
          </div>
        </div>

        {/* Semester Stats Ribbon */}
        <div className="dashboard-stats-grid">
          <div className="stat-card">
            <span className="stat-card__number">{totalEnrolled}</span>
            <span className="stat-card__label">Enrolled Courses</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__number">{completedCount} / {totalAssessmentsCount}</span>
            <span className="stat-card__label">Assessments Passed</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__number">
              {overallAccuracy !== null ? `${overallAccuracy}%` : '—'}
            </span>
            <span className="stat-card__label">Overall Accuracy</span>
          </div>
        </div>
      </div>

      {/* Multi-Course Mixed Exam Banner (if 2+ active course banks exist) */}
      {eligibleCourses.length >= 2 && (
        <section className="mixed-exam-banner" aria-labelledby="mixed-exam-title">
          <div className="mixed-exam-banner__content">
            <div className="mixed-exam-banner__icon">
              <Zap size={24} />
            </div>
            <div className="mixed-exam-banner__text">
              <div className="mixed-exam-banner__tag">
                <Sparkles size={12} />
                <span>Multi-Subject Review</span>
              </div>
              <h2 id="mixed-exam-title" className="mixed-exam-banner__title">
                Combined Semester Exam
              </h2>
              <p className="mixed-exam-banner__desc">
                Take a 20-question comprehensive exam drawing questions evenly across all your enrolled subjects ({eligibleCourses.map((c) => c.code).join(', ')}).
              </p>
            </div>
          </div>
          <button type="button" className="btn-primary mixed-exam-banner__btn" onClick={onStartMixedExam}>
            <Zap size={16} aria-hidden="true" />
            <span>Launch Mixed Exam</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      )}

      {/* Enrolled Courses Section */}
      <section className="enrolled-section" aria-labelledby="enrolled-title">
        <div className="enrolled-section__header">
          <div className="enrolled-section__heading">
            <BookOpen className="text-primary" size={20} aria-hidden="true" />
            <h2 id="enrolled-title">My Enrolled Courses</h2>
          </div>
          <button type="button" className="btn-secondary enrolled-section__edit-btn" onClick={onAddMoreCourses}>
            <Plus size={14} aria-hidden="true" />
            <span>Add Course</span>
          </button>
        </div>

        <div className="enrolled-grid">
          {courseStats.map(({ course, assessments, available, completed, accuracy }) => {
            const hasBank = Boolean(course.bankId)
            const isSyllabus = course.id === 'unt-biol-1710'

            return (
              <div key={course.id} className="course-hub-card">
                <div className="course-hub-card__header">
                  <div className="course-hub-card__top-row">
                    <span className="course-hub-card__code">{course.code}</span>
                    {isSyllabus ? (
                      <span className="badge badge-success">
                        <ShieldCheck size={12} aria-hidden="true" />
                        Verified Syllabus
                      </span>
                    ) : hasBank ? (
                      <span className="badge badge-primary">
                        <BookOpen size={12} aria-hidden="true" />
                        Quizzes Ready
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Catalog Listing</span>
                    )}
                  </div>
                  <h3 className="course-hub-card__title">{course.title}</h3>
                </div>

                {/* Progress & Content Summary */}
                <div className="course-hub-card__body">
                  {hasBank ? (
                    <div className="course-hub-card__stats">
                      <div className="course-hub-card__progress-line">
                        <span className="course-hub-card__progress-text">
                          <strong>{completed}</strong> of <strong>{available}</strong> assessments completed
                        </span>
                        {accuracy !== null && (
                          <span className="course-hub-card__accuracy-badge badge badge-primary">
                            {accuracy}% avg
                          </span>
                        )}
                      </div>

                      <div className="course-hub-card__progress-bar">
                        <div
                          className="course-hub-card__progress-fill"
                          style={{ width: `${available > 0 ? (completed / available) * 100 : 0}%` }}
                        />
                      </div>

                      <div className="course-hub-card__breakdown">
                        <span>
                          {assessments.filter((a) => a.type === 'quiz').length} Quizzes ·{' '}
                          {assessments.filter((a) => a.type === 'exam').length} Exams ·{' '}
                          {assessments.filter((a) => a.type === 'final').length} Final
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="course-hub-card__catalog-note">
                      <p>Full course catalog listing. Verified quiz banks for this course are in development.</p>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="course-hub-card__footer">
                  <button
                    type="button"
                    className="btn-primary course-hub-card__action-btn"
                    onClick={() => onSelectCourse(course.id)}
                  >
                    <span>{hasBank ? 'Open Study Hub' : 'View Course Info'}</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="course-hub-card__remove-btn"
                    onClick={() => onRemoveCourse(course.id)}
                    title={`Remove ${course.code} from schedule`}
                    aria-label={`Remove ${course.code} from schedule`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
