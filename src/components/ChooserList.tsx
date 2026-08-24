import { useDeferredValue, useMemo, useState } from 'react'
import { BookOpen, ChevronRight, Filter, Search, Sparkles, X } from 'lucide-react'
import './ChooserList.css'

interface ChooserItem {
  id: string
  label: string
  sublabel?: string
}

interface ChooserListProps {
  title: string
  items: ChooserItem[]
  onSelect: (id: string) => void
  searchPlaceholder?: string
}

const PAGE_SIZE = 50

export function ChooserList({ title, items, onSelect, searchPlaceholder }: ChooserListProps) {
  const [query, setQuery] = useState('')
  const [selectedPrefix, setSelectedPrefix] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Compute common subject prefixes for quick filtering
  const topPrefixes = useMemo(() => {
    if (!searchPlaceholder) return []
    const counts = new Map<string, number>()
    for (const item of items) {
      const match = item.label.match(/^([A-Z]{2,6})\b/)
      if (match) {
        const prefix = match[1]
        counts.set(prefix, (counts.get(prefix) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([prefix, count]) => ({ prefix, count }))
  }, [items, searchPlaceholder])

  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase())

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedPrefix !== 'all') {
        if (!item.label.startsWith(selectedPrefix)) return false
      }
      if (!deferredQuery) return true
      return `${item.label} ${item.sublabel ?? ''}`.toLocaleLowerCase().includes(deferredQuery)
    })
  }, [items, selectedPrefix, deferredQuery])

  const visibleItems = filteredItems.slice(0, visibleCount)

  return (
    <section className="chooser">
      <div className="chooser__header">
        <div className="chooser__title-group">
          <BookOpen className="chooser__header-icon" size={20} aria-hidden="true" />
          <h2 className="chooser__title">{title}</h2>
        </div>
        <span className="badge badge-neutral chooser__total-badge">
          {items.length} total
        </span>
      </div>

      {searchPlaceholder && (
        <div className="chooser__search">
          <div className="chooser__search-field">
            <Search className="chooser__search-icon" aria-hidden="true" size={18} />
            <input
              id="course-search"
              type="text"
              value={query}
              placeholder={searchPlaceholder}
              onChange={(event) => {
                setQuery(event.target.value)
                setVisibleCount(PAGE_SIZE)
              }}
              aria-label="Search courses"
            />
            {query && (
              <button
                type="button"
                className="chooser__clear"
                aria-label="Clear search"
                onClick={() => {
                  setQuery('')
                  setVisibleCount(PAGE_SIZE)
                }}
              >
                <X aria-hidden="true" size={15} />
              </button>
            )}
          </div>

          {/* Quick Subject Filter Chips */}
          {topPrefixes.length > 0 && (
            <div className="chooser__chips" role="tablist" aria-label="Filter courses by department">
              <button
                type="button"
                role="tab"
                aria-selected={selectedPrefix === 'all'}
                className={`chooser__chip ${selectedPrefix === 'all' ? 'chooser__chip--active' : ''}`}
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
                  className={`chooser__chip ${selectedPrefix === prefix ? 'chooser__chip--active' : ''}`}
                  onClick={() => {
                    setSelectedPrefix(selectedPrefix === prefix ? 'all' : prefix)
                    setVisibleCount(PAGE_SIZE)
                  }}
                >
                  {prefix} <span className="chooser__chip-count">({count})</span>
                </button>
              ))}
            </div>
          )}

          <div className="chooser__meta">
            <span className="chooser__count" aria-live="polite">
              Showing <strong>{Math.min(visibleItems.length, filteredItems.length)}</strong> of <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'course' : 'courses'}
            </span>
          </div>
        </div>
      )}

      <ul className="chooser__list">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <button type="button" className="chooser__item" onClick={() => onSelect(item.id)}>
              <div className="chooser__text">
                <span className="chooser__code-badge">{item.label}</span>
                {item.sublabel && <span className="chooser__sublabel">{item.sublabel}</span>}
              </div>
              <div className="chooser__action" aria-hidden="true">
                <ChevronRight size={18} />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {visibleItems.length === 0 && (
        <div className="chooser__empty">
          <Filter size={28} className="chooser__empty-icon" />
          <p className="chooser__empty-title">No matching courses found</p>
          <p className="chooser__empty-desc">
            {query
              ? `No courses match "${query}". Try searching by course number (e.g. 101, 200) or general topic.`
              : 'No courses found under the selected department filter.'}
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

      {visibleItems.length < filteredItems.length && (
        <button
          type="button"
          className="chooser__more"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          <Sparkles size={16} aria-hidden="true" />
          <span>Load {Math.min(PAGE_SIZE, filteredItems.length - visibleItems.length)} more courses</span>
        </button>
      )}
    </section>
  )
}
