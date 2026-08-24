import {
  ArrowRight,
  Atom,
  Award,
  Binary,
  BookOpen,
  BookOpenCheck,
  Brain,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Dna,
  Flame,
  FlaskConical,
  GraduationCap,
  Layers,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
  X,
} from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import type { CollegeStateGroup } from '../data/catalog'
import './HomePage.css'

interface HomePageProps {
  stateGroups: CollegeStateGroup[]
  onSelectCollege: (collegeId: string) => void
}

const IVY_LEAGUE_IDS = new Set([
  'brown',
  'columbia',
  'cornell',
  'dartmouth',
  'harvard',
  'penn',
  'princeton',
  'yale',
])

const POPULAR_COLLEGE_IDS = [
  { id: 'unt', name: 'UNT', badge: 'Syllabus' },
  { id: 'ut-austin', name: 'UT Austin', badge: '17k+ Courses' },
  { id: 'tamu', name: 'Texas A&M', badge: '5.6k+ Courses' },
  { id: 'harvard', name: 'Harvard', badge: 'Ivy League' },
  { id: 'uc-berkeley', name: 'UC Berkeley', badge: 'Top Public' },
  { id: 'penn', name: 'Penn', badge: '13k+ Courses' },
  { id: 'unc', name: 'UNC Chapel Hill', badge: '10k+ Courses' },
  { id: 'uiuc', name: 'UIUC', badge: '9.4k+ Courses' },
]

const SUBJECTS = [
  {
    name: 'Introductory Biology I',
    code: 'BIOL',
    icon: Dna,
    color: 'emerald',
    topics: 'Cell biology, genetics, cellular respiration, evolution & molecular genetics',
    sampleCourse: 'BIOL 1710 · BIO 101 · BIO 105',
  },
  {
    name: 'General Chemistry I',
    code: 'CHEM',
    icon: FlaskConical,
    color: 'blue',
    topics: 'Atomic structure, stoichiometry, chemical bonding, thermochemistry & kinetics',
    sampleCourse: 'CHEM 1410 · CH 301 · CHEM 101',
  },
  {
    name: 'Calculus I',
    code: 'MATH',
    icon: Calculator,
    color: 'violet',
    topics: 'Limits, continuity, differentiation techniques, optimization & definite integrals',
    sampleCourse: 'MATH 1710 · M 408C · MATH 115',
  },
  {
    name: 'General Psychology',
    code: 'PSYC',
    icon: Brain,
    color: 'amber',
    topics: 'Neuroscience, memory, conditioning, cognitive development & personality theories',
    sampleCourse: 'PSYC 1630 · PSY 301 · PSYC 100',
  },
  {
    name: 'Physics I (Mechanics)',
    code: 'PHYS',
    icon: Atom,
    color: 'cyan',
    topics: 'Newtonian mechanics, 2D kinematics, work-energy theorem, momentum & rotation',
    sampleCourse: 'PHYS 1710 · PHY 303K · PHYS 140',
  },
  {
    name: 'Introductory Statistics',
    code: 'STATS',
    icon: Binary,
    color: 'rose',
    topics: 'Probability rules, random variables, hypothesis testing, confidence intervals & regression',
    sampleCourse: 'MATH 1680 · SDS 301 · STAT 100',
  },
]

function getMonogram(name: string): string {
  const words = name
    .replace(/University|College|Institute of Technology|at /gi, '')
    .trim()
    .split(/\s+/)
  if (words.length === 1 && words[0].length <= 4) return words[0].toUpperCase()
  return words
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase()
}

export function HomePage({ stateGroups, onSelectCollege }: HomePageProps) {
  const collegeHeadingRef = useRef<HTMLHeadingElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ivy' | string>('all')

  // Interactive demo question in hero
  const [demoSelected, setDemoSelected] = useState<number | null>(null)

  const allColleges = useMemo(() => {
    return stateGroups.flatMap((group) => group.colleges)
  }, [stateGroups])

  const totalColleges = allColleges.length

  const filteredColleges = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return allColleges.filter((college) => {
      // Category filter
      if (selectedCategory === 'ivy' && !IVY_LEAGUE_IDS.has(college.id)) return false
      if (selectedCategory !== 'all' && selectedCategory !== 'ivy' && college.state !== selectedCategory) {
        return false
      }

      // Search query filter
      if (!query) return true
      const stateGroup = stateGroups.find((g) => g.code === college.state)
      const stateName = stateGroup?.name.toLowerCase() ?? ''
      return (
        college.name.toLowerCase().includes(query) ||
        college.state.toLowerCase().includes(query) ||
        stateName.includes(query) ||
        college.id.toLowerCase().includes(query)
      )
    })
  }, [allColleges, selectedCategory, searchQuery, stateGroups])

  function showColleges() {
    collegeHeadingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => searchInputRef.current?.focus(), 400)
  }

  function handleQuickPick(collegeId: string) {
    onSelectCollege(collegeId)
  }

  return (
    <div className="home-page">
      {/* Top Navbar */}
      <header className="home-nav" aria-label="Primary navigation">
        <div className="home-nav__container">
          <a className="home-nav__brand" href="#top" aria-label="Study home">
            <div className="home-nav__logo-wrapper">
              <BookOpenCheck aria-hidden="true" size={22} strokeWidth={2.5} />
            </div>
            <div className="home-nav__brand-col">
              <span className="home-nav__brand-title">Study</span>
              <span className="home-nav__brand-tagline">College Exam Prep</span>
            </div>
          </a>

          <div className="home-nav__links">
            <a href="#subjects" className="home-nav__link">
              Subjects
            </a>
            <a href="#how-it-works" className="home-nav__link">
              How It Works
            </a>
            <a href="#colleges" className="home-nav__link">
              Universities
            </a>
          </div>

          <button type="button" className="home-nav__cta btn-primary" onClick={showColleges}>
            <Search size={15} aria-hidden="true" />
            <span>Select University</span>
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero__content">
            <div className="home-hero__left">
              <div className="home-hero__badge-pill">
                <Sparkles size={14} className="home-hero__sparkle" aria-hidden="true" />
                <span>Over 110,000 official catalog courses indexed</span>
              </div>

              <h1 id="home-title" className="home-hero__title">
                Ace your college exams with <span className="home-hero__gradient">syllabus-driven</span> practice.
              </h1>

              <p className="home-hero__copy">
                Structured quizzes, midterm preparation, and cumulative final reviews aligned directly with your university courses and instructor syllabi.
              </p>

              <div className="home-hero__actions">
                <button type="button" className="btn-primary home-hero__primary-btn" onClick={showColleges}>
                  <span>Find Your College</span>
                  <ArrowRight aria-hidden="true" size={18} />
                </button>
                <a href="#subjects" className="btn-secondary home-hero__secondary-btn">
                  <span>Explore Subjects</span>
                </a>
              </div>

              {/* Quick Jump Bar */}
              <div className="home-hero__quick-picks">
                <div className="home-hero__quick-picks-label">
                  <Flame size={14} className="text-amber" aria-hidden="true" />
                  <span>Popular:</span>
                </div>
                <div className="home-hero__quick-picks-chips">
                  {POPULAR_COLLEGE_IDS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="quick-pick-chip"
                      onClick={() => handleQuickPick(item.id)}
                    >
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Preview Mockup Card */}
            <div className="home-hero__right" aria-hidden="true">
              <div className="hero-demo-card">
                <div className="hero-demo-card__header">
                  <div className="hero-demo-card__dots">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                  </div>
                  <div className="hero-demo-card__badge badge badge-primary">
                    <BookOpen size={12} />
                    <span>UNT BIOL 1710 · Quiz 1</span>
                  </div>
                </div>

                <div className="hero-demo-card__body">
                  <span className="hero-demo-card__subhead">Question 1 of 10 · Carbon Chemistry</span>
                  <h4 className="hero-demo-card__question">
                    How many covalent bonds can a single carbon atom typically form to complete its valence shell?
                  </h4>

                  <div className="hero-demo-card__choices">
                    {[
                      { text: 'Four covalent bonds', correct: true },
                      { text: 'Two covalent bonds', correct: false },
                      { text: 'Six covalent bonds', correct: false },
                      { text: 'One covalent bond', correct: false },
                    ].map((opt, idx) => {
                      const isSelected = demoSelected === idx
                      return (
                        <button
                          key={opt.text}
                          type="button"
                          className={`demo-choice ${
                            isSelected
                              ? opt.correct
                                ? 'demo-choice--correct'
                                : 'demo-choice--wrong'
                              : ''
                          }`}
                          onClick={() => setDemoSelected(idx)}
                        >
                          <span className="demo-choice__key">{String.fromCharCode(65 + idx)}</span>
                          <span className="demo-choice__text">{opt.text}</span>
                          {isSelected && opt.correct && (
                            <CheckCircle2 size={16} className="text-success" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {demoSelected !== null && (
                    <div className="demo-feedback">
                      <p>
                        <strong>{demoSelected === 0 ? '✓ Correct!' : '✗ Not quite.'}</strong> Carbon has 4 valence electrons and forms 4 covalent bonds to fill its octet.
                      </p>
                    </div>
                  )}
                </div>

                <div className="hero-demo-card__footer">
                  <div className="hero-demo-card__verified">
                    <ShieldCheck size={14} className="text-success" />
                    <span>Follows Fall 2026 Official Syllabus Schedule</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Ribbon */}
          <div className="home-stats-bar">
            <div className="home-stat-item">
              <span className="home-stat-item__value">38</span>
              <span className="home-stat-item__label">Top Universities</span>
            </div>
            <div className="home-stat-sep" />
            <div className="home-stat-item">
              <span className="home-stat-item__value">110k+</span>
              <span className="home-stat-item__label">Official Courses</span>
            </div>
            <div className="home-stat-sep" />
            <div className="home-stat-item">
              <span className="home-stat-item__value">6</span>
              <span className="home-stat-item__label">Core STEM Subjects</span>
            </div>
            <div className="home-stat-sep" />
            <div className="home-stat-item">
              <span className="home-stat-item__value">100%</span>
              <span className="home-stat-item__label">Free &amp; Ad-Free</span>
            </div>
          </div>
        </section>

        {/* Subjects Covered Section */}
        <section id="subjects" className="home-subjects-section" aria-labelledby="subjects-title">
          <div className="section-header">
            <span className="section-eyebrow">Curriculum &amp; Question Banks</span>
            <h2 id="subjects-title" className="section-title">
              Targeted practice for core college courses
            </h2>
            <p className="section-desc">
              Extensive question sets developed for high-enrollment freshman and sophomore STEM and social science requirements.
            </p>
          </div>

          <div className="home-subjects-grid">
            {SUBJECTS.map((sub) => {
              const Icon = sub.icon
              return (
                <div key={sub.code} className={`subject-card subject-card--${sub.color}`}>
                  <div className="subject-card__top">
                    <div className="subject-card__icon-wrap">
                      <Icon size={24} />
                    </div>
                    <span className="subject-card__code badge badge-neutral">{sub.code}</span>
                  </div>
                  <h3 className="subject-card__title">{sub.name}</h3>
                  <p className="subject-card__topics">{sub.topics}</p>
                  <div className="subject-card__footer">
                    <span className="subject-card__sample">
                      <GraduationCap size={13} aria-hidden="true" />
                      {sub.sampleCourse}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="home-how-section" aria-labelledby="how-title">
          <div className="section-header">
            <span className="section-eyebrow">Simple &amp; Focused</span>
            <h2 id="how-title" className="section-title">
              Built for how college students actually study
            </h2>
          </div>

          <div className="home-how-grid">
            <div className="how-step-card">
              <div className="how-step-card__number">1</div>
              <div className="how-step-card__icon-wrap">
                <MapPin size={22} />
              </div>
              <h3>Pick Your University &amp; Course</h3>
              <p>Choose from 38 major institutions or browse through 110,000+ course catalog listings.</p>
            </div>

            <div className="how-step-card">
              <div className="how-step-card__number">2</div>
              <div className="how-step-card__icon-wrap">
                <Layers size={22} />
              </div>
              <h3>Choose Quizzes or Midterms</h3>
              <p>Practice weekly chapter milestones, lecture review blocks, or full comprehensive finals.</p>
            </div>

            <div className="how-step-card">
              <div className="how-step-card__number">3</div>
              <div className="how-step-card__icon-wrap">
                <Zap size={22} />
              </div>
              <h3>Instant Explanations &amp; Feedback</h3>
              <p>Every problem includes thorough rationales so you learn the underlying reasoning immediately.</p>
            </div>
          </div>
        </section>

        {/* University Explorer Section */}
        <section id="colleges" className="home-colleges" aria-labelledby="college-heading">
          <div className="home-colleges__header">
            <div className="home-colleges__heading-text">
              <span className="section-eyebrow">University Directory</span>
              <h2 id="college-heading" ref={collegeHeadingRef} tabIndex={-1}>
                Choose your university to start
              </h2>
              <p className="home-colleges__subhead">
                Select your school to load its course directory, syllabus-aligned quizzes, and exams.
              </p>
            </div>
            <div className="home-colleges__stats">
              <span className="badge badge-primary">
                <GraduationCap size={14} aria-hidden="true" />
                {totalColleges} Universities Available
              </span>
            </div>
          </div>

          {/* Live Search and Filter Bar */}
          <div className="home-search-container">
            <div className="home-search-box">
              <Search className="home-search-box__icon" size={20} aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                className="home-search-box__input"
                placeholder="Search by university name, state, or abbreviation (e.g. UT Austin, Harvard, Texas, UNC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search universities"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="home-search-box__clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category / State Filter Pills */}
            <div className="home-filter-pills" role="tablist" aria-label="Filter universities by state">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                className={`filter-pill ${selectedCategory === 'all' ? 'filter-pill--active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All States ({totalColleges})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'ivy'}
                className={`filter-pill ${selectedCategory === 'ivy' ? 'filter-pill--active' : ''}`}
                onClick={() => setSelectedCategory('ivy')}
              >
                <Award size={13} aria-hidden="true" />
                Ivy League (8)
              </button>
              {stateGroups.map((group) => (
                <button
                  key={group.code}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === group.code}
                  className={`filter-pill ${selectedCategory === group.code ? 'filter-pill--active' : ''}`}
                  onClick={() => setSelectedCategory(group.code)}
                >
                  {group.name} ({group.colleges.length})
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter */}
          <div className="home-colleges__results-info" aria-live="polite">
            <span>
              Showing <strong>{filteredColleges.length}</strong> {filteredColleges.length === 1 ? 'university' : 'universities'}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {/* Colleges Card Grid */}
          {filteredColleges.length > 0 ? (
            <div className="home-colleges__grid">
              {filteredColleges.map((college) => {
                const monogram = getMonogram(college.name)
                const isIvy = IVY_LEAGUE_IDS.has(college.id)
                const hasSyllabus = college.id === 'unt'

                return (
                  <button
                    key={college.id}
                    type="button"
                    className="college-card"
                    onClick={() => onSelectCollege(college.id)}
                  >
                    <div className="college-card__avatar" aria-hidden="true">
                      {monogram}
                    </div>

                    <div className="college-card__info">
                      <div className="college-card__top">
                        <span className="college-card__state badge badge-neutral">
                          <MapPin size={11} aria-hidden="true" />
                          {college.state}
                        </span>
                        {isIvy && (
                          <span className="college-card__tag badge badge-warning">
                            Ivy League
                          </span>
                        )}
                        {hasSyllabus && (
                          <span className="college-card__tag badge badge-success">
                            Verified Syllabus
                          </span>
                        )}
                      </div>
                      <h3 className="college-card__name">{college.name}</h3>
                    </div>

                    <div className="college-card__action" aria-hidden="true">
                      <ChevronRight size={18} />
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="home-colleges__empty">
              <Search size={36} className="home-colleges__empty-icon" />
              <h3>No universities found</h3>
              <p>We couldn't find any schools matching "{searchQuery}". Try clearing your search or picking a different state filter.</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear search &amp; filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer__container">
          <div className="home-footer__left">
            <div className="home-footer__brand">
              <BookOpenCheck size={18} />
              <span>Study</span>
            </div>
            <p>Syllabus-aligned college course review and exam practice.</p>
          </div>
          <div className="home-footer__right">
            <span>38 Universities Indexed</span>
            <span>•</span>
            <span>Client-side Offline Ready</span>
          </div>
        </div>
      </footer>
    </div>
  )
}