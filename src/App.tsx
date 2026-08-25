import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  GraduationCap,
  Layers,
  Plus,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import { QuestionCard } from './components/QuestionCard'
import { AssessmentChooser } from './components/AssessmentChooser'
import { CourseScheduleBuilder } from './components/CourseScheduleBuilder'
import { SemesterDashboard } from './components/SemesterDashboard'
import { HomePage } from './components/HomePage'
import { SelectField } from './components/ui/Select'
import {
  assessmentsForCourse,
  collegeStateGroups,
  coursesForCollege,
  findAssessment,
  findCollege,
  findCourse,
  findSyllabus,
  getCompletedAssessments,
  getEnrolledCourseIds,
  mixedQuestionsForCourses,
  questionsForAssessment,
  recordAssessmentCompletion,
  saveEnrolledCourseIds,
  syllabiForCourse,
} from './data'
import { loadOfficialCourses } from './data/official-courses'
import type { CompletedAssessmentRecord, Course, QuestionWithChoices } from './types'
import './App.css'

const COLLEGE_KEY = 'study.collegeId'

export default function App() {
  const [view, setView] = useState<'home' | 'schedule-builder' | 'dashboard' | 'course-study' | 'quiz' | 'mixed-quiz'>('home')

  const [collegeId, setCollegeId] = useState<string | null>(() => {
    const saved = localStorage.getItem(COLLEGE_KEY)
    return saved && findCollege(saved) ? saved : null
  })

  // Multi-course enrollment state for the current college
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const savedCol = localStorage.getItem(COLLEGE_KEY)
    return savedCol ? getEnrolledCourseIds(savedCol) : []
  })

  const [history, setHistory] = useState<Record<string, CompletedAssessmentRecord>>(() => getCompletedAssessments())

  // Single active course / assessment selection
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null)
  const [syllabusId, setSyllabusId] = useState<string | null>(null)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)

  // Mixed assessment state
  const [mixedQuestions, setMixedQuestions] = useState<QuestionWithChoices[]>([])

  // Quiz progression state
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  // Catalog loading state
  const [, setCatalogState] = useState<
    'idle' | 'loading' | 'ready' | 'unavailable' | 'error'
  >('idle')
  const [, setCatalogVersion] = useState(0)

  // Load catalog on college change
  useEffect(() => {
    if (!collegeId) return
    let cancelled = false
    loadOfficialCourses(collegeId)
      .then((available) => {
        if (cancelled) return
        setCatalogVersion((version) => version + 1)
        setCatalogState(available ? 'ready' : 'unavailable')
      })
      .catch(() => {
        if (!cancelled) setCatalogState('error')
      })
    return () => {
      cancelled = true
    }
  }, [collegeId])

  const college = collegeId ? findCollege(collegeId) : undefined
  const activeCourse = activeCourseId ? findCourse(activeCourseId) : undefined
  const syllabus = syllabusId ? findSyllabus(syllabusId) : undefined
  const assessment = assessmentId ? findAssessment(assessmentId) : undefined
  const courseSyllabi = activeCourseId ? syllabiForCourse(activeCourseId) : []
  const courseAssessments = activeCourseId ? assessmentsForCourse(activeCourseId, syllabusId ?? undefined) : []

  const allCollegeCourses = useMemo(() => {
    return collegeId ? coursesForCollege(collegeId) : []
  }, [collegeId])

  const enrolledCourses = useMemo(() => {
    return enrolledCourseIds
      .map((id) => findCourse(id))
      .filter((c): c is Course => c !== undefined)
  }, [enrolledCourseIds])

  // Current session questions
  const sessionQuestions = useMemo(() => {
    if (view === 'mixed-quiz') return mixedQuestions
    if (assessmentId) return questionsForAssessment(assessmentId)
    return []
  }, [view, mixedQuestions, assessmentId])

  const total = sessionQuestions.length
  const question = sessionQuestions[index]
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0

  function resetSession() {
    setIndex(0)
    setCorrectCount(0)
    setFinished(false)
  }

  function chooseCollege(id: string) {
    localStorage.setItem(COLLEKEY(id), id)
    localStorage.setItem(COLLEGE_KEY, id)
    if (id !== collegeId) setCatalogState('idle')
    setCollegeId(id)

    const savedCourses = getEnrolledCourseIds(id)
    setEnrolledCourseIds(savedCourses)
    setActiveCourseId(null)
    setSyllabusId(null)
    setAssessmentId(null)
    resetSession()

    if (savedCourses.length > 0) {
      setView('dashboard')
    } else {
      setView('schedule-builder')
    }
  }

  function COLLEKEY(id: string) {
    return `study.last_college.${id}`
  }

  function toggleEnrollCourse(courseId: string) {
    if (!collegeId) return
    setEnrolledCourseIds((current) => {
      const next = current.includes(courseId)
        ? current.filter((id) => id !== courseId)
        : [...current, courseId]
      saveEnrolledCourseIds(collegeId, next)
      return next
    })
  }

  function openCourseStudy(courseId: string) {
    setActiveCourseId(courseId)
    const availableSyllabi = syllabiForCourse(courseId)
    setSyllabusId(availableSyllabi.length === 1 ? availableSyllabi[0].id : null)
    setAssessmentId(null)
    resetSession()
    setView('course-study')
  }

  function chooseSyllabus(id: string) {
    setSyllabusId(id)
    setAssessmentId(null)
    resetSession()
  }

  function startAssessment(id: string) {
    setAssessmentId(id)
    resetSession()
    setView('quiz')
  }

  function startMixedExam() {
    const qList = mixedQuestionsForCourses(enrolledCourseIds, 20)
    setMixedQuestions(qList)
    setAssessmentId(null)
    setActiveCourseId(null)
    resetSession()
    setView('mixed-quiz')
  }

  function handleAnswered(wasCorrect: boolean) {
    if (wasCorrect) setCorrectCount((n) => n + 1)
  }

  function handleNext() {
    if (index + 1 >= total) {
      setFinished(true)
      if (assessmentId && activeCourseId) {
        recordAssessmentCompletion(assessmentId, activeCourseId, correctCount, total)
        setHistory(getCompletedAssessments())
      }
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (view === 'home') {
    return <HomePage stateGroups={collegeStateGroups} onSelectCollege={chooseCollege} />
  }

  return (
    <div className="app">
      {/* Global Top Navbar */}
      <header className="app__header">
        <div className="app__header-left">
          <button
            type="button"
            className="app__home-btn"
            onClick={() => setView('home')}
            aria-label="Return to Homepage"
            title="Return to Homepage"
          >
            <BookOpenCheck aria-hidden="true" size={20} strokeWidth={2.5} />
            <span className="app__logo-text">Study</span>
          </button>

          {/* Dynamic Breadcrumbs */}
          <nav className="app__breadcrumbs" aria-label="Breadcrumb navigation">
            <span className="app__crumb-sep" aria-hidden="true">/</span>
            {college ? (
              <button
                type="button"
                className="app__crumb app__crumb--btn"
                onClick={() => {
                  if (enrolledCourseIds.length > 0) setView('dashboard')
                  else setView('schedule-builder')
                }}
              >
                {college.name}
              </button>
            ) : (
              <span className="app__crumb">Choose University</span>
            )}

            {view === 'schedule-builder' && (
              <>
                <span className="app__crumb-sep" aria-hidden="true">/</span>
                <span className="app__crumb app__crumb--active">Course Selection</span>
              </>
            )}

            {view === 'dashboard' && (
              <>
                <span className="app__crumb-sep" aria-hidden="true">/</span>
                <span className="app__crumb app__crumb--active">Semester Dashboard</span>
              </>
            )}

            {view === 'mixed-quiz' && (
              <>
                <span className="app__crumb-sep" aria-hidden="true">/</span>
                <span className="app__crumb app__crumb--active">Combined Semester Exam</span>
              </>
            )}

            {(view === 'course-study' || view === 'quiz') && activeCourse && (
              <>
                <span className="app__crumb-sep" aria-hidden="true">/</span>
                <button
                  type="button"
                  className="app__crumb app__crumb--btn app__crumb--highlight"
                  onClick={() => openCourseStudy(activeCourse.id)}
                >
                  {activeCourse.code}
                </button>
              </>
            )}

            {view === 'quiz' && assessment && (
              <>
                <span className="app__crumb-sep" aria-hidden="true">/</span>
                <span className="app__crumb app__crumb--active">{assessment.label}</span>
              </>
            )}
          </nav>
        </div>

        {/* Header Right Actions & Counter */}
        <div className="app__header-right">
          {(view === 'quiz' || view === 'mixed-quiz') && !finished && total > 0 ? (
            <>
              <div className="app__progress-pill">
                <span className="app__progress-count">
                  {index + 1} of {total}
                </span>
                <span className="app__progress-pct">
                  {Math.round(((index + 1) / total) * 100)}%
                </span>
              </div>
              <button
                type="button"
                className="btn-secondary app__header-action-btn"
                onClick={() => {
                  resetSession()
                  if (view === 'quiz' && activeCourseId) setView('course-study')
                  else setView('dashboard')
                }}
                title="Exit Assessment"
              >
                <span>Exit Quiz</span>
              </button>
            </>
          ) : view === 'course-study' ? (
            <button
              type="button"
              className="btn-secondary app__header-action-btn"
              onClick={() => setView('dashboard')}
            >
              <Layers size={14} aria-hidden="true" />
              <span>My Semester Courses</span>
            </button>
          ) : view === 'dashboard' ? (
            <button
              type="button"
              className="btn-secondary app__header-action-btn"
              onClick={() => setView('schedule-builder')}
            >
              <Plus size={14} aria-hidden="true" />
              <span>Edit Schedule</span>
            </button>
          ) : collegeId ? (
            <button
              type="button"
              className="btn-secondary app__header-action-btn"
              onClick={() => setView('home')}
            >
              <GraduationCap size={14} aria-hidden="true" />
              <span>Change University</span>
            </button>
          ) : null}
        </div>
      </header>

      {/* Sticky Progress Bar for active quiz */}
      {(view === 'quiz' || view === 'mixed-quiz') && !finished && total > 0 && (
        <div
          className="app__progress-bar-track"
          role="progressbar"
          aria-label="Session progress"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          <div
            className="app__progress-bar-fill"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      )}

      {/* Main Content Router */}
      <main className="app__main">
        {/* VIEW: Course Schedule Builder */}
        {view === 'schedule-builder' && (
          <CourseScheduleBuilder
            collegeName={college?.name ?? 'University'}
            courses={allCollegeCourses}
            selectedCourseIds={enrolledCourseIds}
            onToggleCourse={toggleEnrollCourse}
            onOpenDashboard={() => setView('dashboard')}
            onCancel={enrolledCourseIds.length > 0 ? () => setView('dashboard') : undefined}
          />
        )}

        {/* VIEW: Semester Dashboard ("My Courses") */}
        {view === 'dashboard' && (
          <SemesterDashboard
            collegeName={college?.name ?? 'University'}
            enrolledCourses={enrolledCourses}
            onSelectCourse={openCourseStudy}
            onStartMixedExam={startMixedExam}
            onAddMoreCourses={() => setView('schedule-builder')}
            onRemoveCourse={toggleEnrollCourse}
            history={history}
            getCourseAssessments={(cId) => assessmentsForCourse(cId)}
          />
        )}

        {/* VIEW: Single Course Study Hub (AssessmentChooser) */}
        {view === 'course-study' && activeCourse && (
          <div className="course-study-view">
            <div className="course-study-view__header">
              <button
                type="button"
                className="btn-secondary course-study-view__back-btn"
                onClick={() => setView('dashboard')}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Semester Dashboard</span>
              </button>

              <div className="course-study-view__title-box">
                <span className="course-study-view__code-badge">{activeCourse.code}</span>
                <h1 className="course-study-view__title">{activeCourse.title}</h1>
              </div>
            </div>

            {/* Syllabus Section Selector if multiple offerings exist */}
            {courseSyllabi.length > 1 && (
              <section className="selectors" aria-label="Course section selection">
                <SelectField
                  label="Class Section Offering"
                  value={syllabusId ?? ''}
                  onValueChange={chooseSyllabus}
                  options={courseSyllabi.map((item) => ({
                    value: item.id,
                    label: `${item.term} · Section ${item.section}`,
                    hint: item.instructor,
                  }))}
                />
              </section>
            )}

            <AssessmentChooser
              syllabus={syllabus}
              assessments={courseAssessments}
              questionCount={(id) => questionsForAssessment(id).length}
              onSelect={startAssessment}
            />
          </div>
        )}

        {/* VIEW: Quiz / Mixed Exam Session */}
        {(view === 'quiz' || view === 'mixed-quiz') && (
          finished ? (
            <section className="summary" aria-labelledby="summary-title">
              <div className="summary__card">
                <div
                  className={`summary__trophy-wrapper ${
                    percentage >= 80
                      ? 'summary__trophy-wrapper--high'
                      : percentage >= 60
                      ? 'summary__trophy-wrapper--mid'
                      : 'summary__trophy-wrapper--low'
                  }`}
                >
                  {percentage >= 80 ? (
                    <Trophy size={40} />
                  ) : percentage >= 60 ? (
                    <Award size={40} />
                  ) : (
                    <GraduationCap size={40} />
                  )}
                </div>

                <h2 id="summary-title" className="summary__title">
                  {percentage === 100
                    ? 'Perfect Score!'
                    : percentage >= 80
                    ? 'Great Job!'
                    : percentage >= 60
                    ? 'Good Practice Session!'
                    : 'Keep Practicing!'}
                </h2>

                <div className="summary__subtitle">
                  {view === 'mixed-quiz' ? (
                    <p>You've completed the <strong>Combined Semester Exam</strong> across all your active courses.</p>
                  ) : (
                    <p>You've completed <strong>{assessment?.label}</strong> for <strong>{activeCourse?.code}</strong>.</p>
                  )}
                </div>

                <div className="summary__stats-grid">
                  <div className="summary__stat-box">
                    <span className="summary__stat-number">{correctCount} / {total}</span>
                    <span className="summary__stat-label">Correct Answers</span>
                  </div>
                  <div className="summary__stat-box">
                    <span className="summary__stat-number">{percentage}%</span>
                    <span className="summary__stat-label">Accuracy Rate</span>
                  </div>
                </div>

                <div className="summary__actions">
                  <button type="button" className="btn-primary summary__btn" onClick={resetSession}>
                    <RotateCcw size={18} aria-hidden="true" />
                    <span>Practice Again</span>
                  </button>

                  {view === 'quiz' && activeCourse && (
                    <button
                      type="button"
                      className="btn-secondary summary__btn"
                      onClick={() => setView('course-study')}
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                      <span>Back to {activeCourse.code} Quizzes</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn-secondary summary__btn"
                    onClick={() => setView('dashboard')}
                  >
                    <Layers size={16} aria-hidden="true" />
                    <span>Return to Semester Dashboard</span>
                  </button>
                </div>
              </div>
            </section>
          ) : (
            question ? (
              <QuestionCard
                key={question.id}
                question={question}
                onAnswered={handleAnswered}
                onNext={handleNext}
                isLast={index + 1 === total}
              />
            ) : (
              <div className="notice notice--error" role="alert">
                <strong>No questions available</strong>
                <p>No active questions found for this assessment.</p>
                <button type="button" className="btn-secondary" onClick={() => setView('dashboard')}>
                  Return to Dashboard
                </button>
              </div>
            )
          )
        )}
      </main>
    </div>
  )
}
