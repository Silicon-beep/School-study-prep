import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Award,
  BookOpen,
  BookOpenCheck,
  GraduationCap,
  RotateCcw,
  Search,
  Trophy,
} from 'lucide-react'
import { QuestionCard } from './components/QuestionCard'
import { ChooserList } from './components/ChooserList'
import { AssessmentChooser } from './components/AssessmentChooser'
import { HomePage } from './components/HomePage'
import { SelectField } from './components/ui/Select'
import {
  assessmentsForCourse,
  colleges,
  collegeStateGroups,
  coursesForCollege,
  findAssessment,
  findCollege,
  findCourse,
  findSyllabus,
  questionsForAssessment,
  syllabiForCourse,
} from './data'
import { loadOfficialCourses } from './data/official-courses'
import './App.css'

// Moves into the IndexedDB `meta` store in M3, once a database exists.
const COLLEGE_KEY = 'study.collegeId'

export default function App() {
  const [view, setView] = useState<'home' | 'study'>('home')
  const [collegeId, setCollegeId] = useState<string | null>(() => {
    const saved = localStorage.getItem(COLLEGE_KEY)
    return saved && findCollege(saved) ? saved : null
  })
  const [courseId, setCourseId] = useState<string | null>(null)
  const [syllabusId, setSyllabusId] = useState<string | null>(null)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [catalogState, setCatalogState] = useState<
    'idle' | 'loading' | 'ready' | 'unavailable' | 'error'
  >('idle')
  const [catalogVersion, setCatalogVersion] = useState(0)

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
  const course = courseId ? findCourse(courseId) : undefined
  const syllabus = syllabusId ? findSyllabus(syllabusId) : undefined
  const assessment = assessmentId ? findAssessment(assessmentId) : undefined
  const courseSyllabi = courseId ? syllabiForCourse(courseId) : []
  const courseAssessments = courseId ? assessmentsForCourse(courseId, syllabusId ?? undefined) : []
  const sessionQuestions = assessmentId ? questionsForAssessment(assessmentId) : []
  const total = sessionQuestions.length
  const question = sessionQuestions[index]
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0

  function resetSession() {
    setIndex(0)
    setCorrectCount(0)
    setFinished(false)
  }

  function chooseCollege(id: string) {
    localStorage.setItem(COLLEGE_KEY, id)
    // Reselecting the same college leaves the loader effect dormant, so keep its resolved state.
    if (id !== collegeId) setCatalogState('idle')
    setCollegeId(id)
    setCourseId(null)
    setSyllabusId(null)
    setAssessmentId(null)
    resetSession()
  }

  function startFromCollege(id: string) {
    chooseCollege(id)
    setView('study')
  }

  function chooseCourse(id: string) {
    setCourseId(id)
    const availableSyllabi = syllabiForCourse(id)
    setSyllabusId(availableSyllabi.length === 1 ? availableSyllabi[0].id : null)
    setAssessmentId(null)
    resetSession()
  }

  function chooseSyllabus(id: string) {
    setSyllabusId(id)
    setAssessmentId(null)
    resetSession()
  }

  function chooseAssessment(id: string) {
    setAssessmentId(id)
    resetSession()
  }

  function handleAnswered(wasCorrect: boolean) {
    if (wasCorrect) setCorrectCount((n) => n + 1)
  }

  function handleNext() {
    if (index + 1 >= total) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (view === 'home') {
    return <HomePage stateGroups={collegeStateGroups} onSelectCollege={startFromCollege} />
  }

  return (
    <div className="app">
      {/* Top Application Bar */}
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

          {/* Breadcrumb Context Path */}
          <nav className="app__breadcrumbs" aria-label="Breadcrumb navigation">
            <span className="app__crumb-sep" aria-hidden="true">/</span>
            {college ? (
              <button
                type="button"
                className="app__crumb app__crumb--btn"
                onClick={() => {
                  setCourseId(null)
                  setAssessmentId(null)
                  resetSession()
                }}
              >
                {college.name}
              </button>
            ) : (
              <span className="app__crumb">Choose University</span>
            )}

            {course && (
              <>
                <span className="app__crumb-sep" aria-hidden="true">/</span>
                <button
                  type="button"
                  className="app__crumb app__crumb--btn app__crumb--highlight"
                  onClick={() => {
                    setAssessmentId(null)
                    resetSession()
                  }}
                >
                  {course.code}
                </button>
              </>
            )}

            {assessment && (
              <>
                <span className="app__crumb-sep" aria-hidden="true">/</span>
                <span className="app__crumb app__crumb--active">{assessment.label}</span>
              </>
            )}
          </nav>
        </div>

        {/* Header Right / Progress */}
        <div className="app__header-right">
          {assessment && !finished && total > 0 ? (
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
                  setAssessmentId(null)
                  resetSession()
                }}
                title="Exit Assessment"
              >
                <span>Exit Quiz</span>
              </button>
            </>
          ) : courseId ? (
            <button
              type="button"
              className="btn-secondary app__header-action-btn"
              onClick={() => chooseCourse('')}
            >
              <Search size={14} aria-hidden="true" />
              <span>Change Course</span>
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

      {/* Interactive Progress Bar */}
      {assessment && !finished && total > 0 && (
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

      {/* Offering Selector (Only shown when multiple syllabi offerings exist) */}
      {syllabusId && courseSyllabi.length > 1 && !assessmentId && (
        <section className="selectors" aria-label="Course section selection">
          <SelectField
            label="Class Offering / Section"
            value={syllabusId}
            onValueChange={chooseSyllabus}
            options={courseSyllabi.map((item) => ({
              value: item.id,
              label: `${item.term} · Section ${item.section}`,
              hint: item.instructor,
            }))}
          />
        </section>
      )}

      <main className="app__main">
        {!collegeId ? (
          <ChooserList
            title="Select your college"
            items={colleges.map((c) => ({ id: c.id, label: c.name, sublabel: c.state }))}
            onSelect={chooseCollege}
          />
        ) : !courseId && (catalogState === 'idle' || catalogState === 'loading') ? (
          <div className="notice notice--loading" role="status">
            <span className="notice__spinner" aria-hidden="true" />
            <div>
              <strong>Loading course catalog...</strong>
              <p>Fetching official university course descriptions and available quizzes.</p>
            </div>
          </div>
        ) : !courseId && catalogState === 'error' ? (
          <div className="notice notice--error" role="alert">
            <strong>Unable to load catalog</strong>
            <p>The course catalog could not be loaded at this time. Please check your connection and try again.</p>
          </div>
        ) : !courseId ? (
          <>
            {catalogState === 'unavailable' && (
              <div className="notice" role="status">
                <BookOpen size={18} aria-hidden="true" />
                <div>
                  <strong>Core Courses Available</strong>
                  <p>Core study courses with quizzes are available. Full catalog import is coming soon.</p>
                </div>
              </div>
            )}
            <ChooserList
              key={`${collegeId}-${catalogVersion}`}
              title={`Courses at ${college?.name ?? 'University'}`}
              items={coursesForCollege(collegeId).map((c) => ({
                id: c.id,
                label: c.code,
                sublabel: c.title,
              }))}
              onSelect={chooseCourse}
              searchPlaceholder="Search by course code or title (e.g. BIO 101, MATH 151)..."
            />
          </>
        ) : courseSyllabi.length > 1 && !syllabusId ? (
          <ChooserList
            title="Select your class section"
            items={courseSyllabi.map((item) => ({
              id: item.id,
              label: `${item.term} · Section ${item.section}`,
              sublabel: item.instructor,
            }))}
            onSelect={chooseSyllabus}
          />
        ) : !assessmentId ? (
          <AssessmentChooser
            syllabus={syllabus}
            assessments={courseAssessments}
            questionCount={(id) => questionsForAssessment(id).length}
            onSelect={chooseAssessment}
          />
        ) : finished ? (
          <section className="summary" aria-labelledby="summary-title">
            <div className="summary__card">
              <div className={`summary__trophy-wrapper ${percentage >= 80 ? 'summary__trophy-wrapper--high' : percentage >= 60 ? 'summary__trophy-wrapper--mid' : 'summary__trophy-wrapper--low'}`}>
                {percentage >= 80 ? <Trophy size={40} /> : percentage >= 60 ? <Award size={40} /> : <GraduationCap size={40} />}
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

              <p className="summary__subtitle">
                You've completed <strong>{assessment?.label}</strong> for <strong>{course?.code}</strong>.
              </p>

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
                <button
                  type="button"
                  className="btn-secondary summary__btn"
                  onClick={() => {
                    setAssessmentId(null)
                    resetSession()
                  }}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Choose Another Assessment</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary summary__btn"
                  onClick={() => chooseCourse('')}
                >
                  <Search size={16} aria-hidden="true" />
                  <span>Browse Other Courses</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          // Remount per question so the card resets its own selection state.
          <QuestionCard
            key={question.id}
            question={question}
            onAnswered={handleAnswered}
            onNext={handleNext}
            isLast={index + 1 === total}
          />
        )}
      </main>
    </div>
  )
}
