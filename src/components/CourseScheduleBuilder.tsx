import { useDeferredValue, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Filter,
  Layers,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import type { Course } from '../types'
import './CourseScheduleBuilder.css'

interface CourseScheduleBuilderProps {
  collegeName: string
  courses: Course[]
  selectedCourseIds: string[]
  onToggleCourse: (courseId: string) => void
  onOpenDashboard: () => void
  onCancel?: () => void
}

const PAGE_SIZE = 50

export function CourseScheduleBuilder({
  collegeName,
  courses,
  selectedCourseIds,
  onToggleCourse,
  onOpenDashboard,
  onCancel,
}: CourseScheduleBuilderProps) {
  const [query, setQuery] = useState('')
  const [selectedPrefix, setSelectedPrefix] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const selectedSet = useMemo(() => new Set(selectedCourseIds), [selectedCourseIds])

  const selectedCourses = useMemo(
    () => courses.filter((c) => selectedSet.has(c.id)),
    [courses, selectedSet],
  )

  // Compute common subject prefixes for quick filtering
  const topPrefixes = useMemo(() => {
    const counts = new Map<string, number>()
    for (const item of courses) {
      const match = item.code.match(/^([A-Z]{2,6})\b/)
      if (match) {
        const prefix = match[1]
        counts.set(prefix, (counts.get(prefix) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([prefix, count]) => ({ prefix, count }))
  }, [courses])

  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase())

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (selectedPrefix !== 'all') {
        if (!course.code.startsWith(selectedPrefix)) return false
      }
      if (!deferredQuery) return true
      return `${course.code} ${course.title}`.toLocaleLowerCase().includes(deferredQuery)
    })
  }, [courses, selectedPrefix, deferredQuery])

  const visibleCourses = filteredCourses.slice(0, visibleCount)

  // Popular starter pack courses if available in this college
  const starterCourses = useMemo(() => {
    return courses.filter((c) => Boolean(c.bankId)).slice(0, 6)
  }, [courses])

  function selectAllStarter() {
    for (const c of starterCourses) {
      if (!selectedSet.has(c.id)) {
        onToggleCourse(c.id)
      }
    }
  }

  return (
    <div className="schedule-builder">
      <div className="schedule-builder__hero">
        <div className="schedule-builder__header-text">
          <span className="badge badge-primary">
            <Layers size={13} aria-hidden="true" />
            Semester Course Selection
          </span>
          <h1 className="schedule-builder__title">Build Your Semester Schedule</h1>
          <p className="schedule-builder__desc">
            Select all the courses you are taking at <strong>{collegeName}</strong>. We will generate tailored quizzes, midterm exams, and cumulative practice for each course in your personal dashboard.
          </p>
        </div>

        {/* Selected Courses Tray / Summary */}
        <div className={`schedule-tray ${selectedCourses.length > 0 ? 'schedule-tray--active' : ''}`}>
          <div className="schedule-tray__header">
            <div className="schedule-tray__count">
              <span className="schedule-tray__number">{selectedCourses.length}</span>
              <span className="schedule-tray__label">
                {selectedCourses.length === 1 ? 'course' : 'courses'} selected
              </span>
            </div>

            <div className="schedule-tray__actions">
              {onCancel && (
                <button type="button" className="btn-secondary schedule-tray__cancel-btn" onClick={onCancel}>
                  Cancel
                </button>
              )}
              <button
                type="button"
                className="btn-primary schedule-tray__done-btn"
                onClick={onOpenDashboard}
                disabled={selectedCourses.length === 0}
              >
                <span>Open My Dashboard</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {selectedCourses.length > 0 && (
            <div className="schedule-tray__chips">
              {selectedCourses.map((c) => (
                <div key={c.id} className="selected-chip">
                  <span className="selected-chip__code">{c.code}</span>
                  <span className="selected-chip__title">{c.title}</span>
                  <button
                    type="button"
                    className="selected-chip__remove"
                    onClick={() => onToggleCourse(c.id)}
                    aria-label={`Remove ${c.code}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Starter Pack for Fast 1-Click Setup */}
      {starterCourses.length > 0 && selectedCourses.length === 0 && (
        <div className="starter-pack">
          <div className="starter-pack__header">
            <div className="starter-pack__title-row">
              <Sparkles size={16} className="text-primary" aria-hidden="true" />
              <h3>Popular Core Requirements</h3>
            </div>
            <button type="button" className="btn-secondary starter-pack__add-all" onClick={selectAllStarter}>
              <Plus size={14} aria-hidden="true" />
              <span>Add All Recommended ({starterCourses.length})</span>
            </button>
          </div>
          <p className="starter-pack__subtext">
            Common courses with complete interactive quiz banks and syllabus coverage:
          </p>
          <div className="starter-pack__grid">
            {starterCourses.map((c) => {
              const isSelected = selectedSet.has(c.id)
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`starter-card ${isSelected ? 'starter-card--selected' : ''}`}
                  onClick={() => onToggleCourse(c.id)}
                >
                  <div className="starter-card__top">
                    <span className="starter-card__code">{c.code}</span>
                    <span className={`starter-card__check ${isSelected ? 'starter-card__check--active' : ''}`}>
                      {isSelected ? <Check size={14} /> : <Plus size={14} />}
                    </span>
                  </div>
                  <span className="starter-card__title">{c.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Catalog Search & Filter Section */}
      <section className="catalog-browser">
        <div className="catalog-browser__search-row">
          <div className="catalog-browser__search-box">
            <Search className="catalog-browser__search-icon" size={18} aria-hidden="true" />
            <input
              type="text"
              className="catalog-browser__search-input"
              placeholder="Search by course code or title (e.g. ECON 1100, MATH 1180, COMM 1010, BIOL)..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setVisibleCount(PAGE_SIZE)
              }}
              aria-label="Search all courses"
            />
            {query && (
              <button
                type="button"
                className="catalog-browser__clear"
                onClick={() => {
                  setQuery('')
                  setVisibleCount(PAGE_SIZE)
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Department Filter Chips */}
        {topPrefixes.length > 0 && (
          <div className="catalog-browser__chips" role="tablist" aria-label="Filter by department">
            <button
              type="button"
              role="tab"
              aria-selected={selectedPrefix === 'all'}
              className={`filter-chip ${selectedPrefix === 'all' ? 'filter-chip--active' : ''}`}
              onClick={() => {
                setSelectedPrefix('all')
                setVisibleCount(PAGE_SIZE)
              }}
            >
              All Departments
            </button>
            {topPrefixes.map(({ prefix, count }) => (
              <button
                key={prefix}
                type="button"
                role="tab"
                aria-selected={selectedPrefix === prefix}
                className={`filter-chip ${selectedPrefix === prefix ? 'filter-chip--active' : ''}`}
                onClick={() => {
                  setSelectedPrefix(selectedPrefix === prefix ? 'all' : prefix)
                  setVisibleCount(PAGE_SIZE)
                }}
              >
                {prefix} <span className="filter-chip__count">({count})</span>
              </button>
            ))}
          </div>
        )}

        <div className="catalog-browser__meta">
          <span className="catalog-browser__count" aria-live="polite">
            Showing <strong>{Math.min(visibleCourses.length, filteredCourses.length)}</strong> of{' '}
            <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}
          </span>
        </div>

        {/* Course Cards Grid */}
        <div className="catalog-browser__list">
          {visibleCourses.map((course) => {
            const isSelected = selectedSet.has(course.id)
            const hasBank = Boolean(course.bankId)
            const isSyllabus = course.id === 'unt-biol-1710'

            return (
              <div
                key={course.id}
                className={`course-select-card ${isSelected ? 'course-select-card--selected' : ''}`}
                onClick={() => onToggleCourse(course.id)}
              >
                <div className="course-select-card__checkbox">
                  <div className={`custom-checkbox ${isSelected ? 'custom-checkbox--checked' : ''}`}>
                    {isSelected && <Check size={14} />}
                  </div>
                </div>

                <div className="course-select-card__info">
                  <div className="course-select-card__header-line">
                    <span className="course-select-card__code">{course.code}</span>
                    {isSyllabus && (
                      <span className="badge badge-success">
                        <CheckCircle2 size={11} aria-hidden="true" />
                        Verified Syllabus
                      </span>
                    )}
                    {hasBank && !isSyllabus && (
                      <span className="badge badge-primary">
                        <BookOpen size={11} aria-hidden="true" />
                        Quizzes &amp; Exams Ready
                      </span>
                    )}
                    {!hasBank && (
                      <span className="badge badge-neutral">Catalog Listing</span>
                    )}
                  </div>
                  <h3 className="course-select-card__title">{course.title}</h3>
                </div>

                <button
                  type="button"
                  className={`course-select-card__btn ${
                    isSelected ? 'course-select-card__btn--selected' : 'course-select-card__btn--add'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleCourse(course.id)
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? 'Remove' : 'Add'} ${course.code}`}
                >
                  {isSelected ? (
                    <>
                      <Check size={14} />
                      <span>Enrolled</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {visibleCourses.length === 0 && (
          <div className="catalog-browser__empty">
            <Filter size={32} className="catalog-browser__empty-icon" />
            <h3>No matching courses found</h3>
            <p>
              {query
                ? `No courses matching "${query}". Try searching by course number or department prefix (e.g. ECON, MATH, COMM).`
                : 'No courses found in this department.'}
            </p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setQuery('')
                setSelectedPrefix('all')
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {visibleCourses.length < filteredCourses.length && (
          <button
            type="button"
            className="catalog-browser__more-btn"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            <span>Load {Math.min(PAGE_SIZE, filteredCourses.length - visibleCourses.length)} more courses</span>
          </button>
        )}
      </section>
    </div>
  )
}
