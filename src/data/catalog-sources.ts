export interface CatalogSource {
  collegeId: string
  url: string
  checkedAt: string
  verification: 'catalog_page'
}

export const catalogSources: CatalogSource[] = [
  { collegeId: 'uc-berkeley', url: 'https://registrar.berkeley.edu/catalog', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'ucla', url: 'https://catalog.registrar.ucla.edu/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'stony-brook', url: 'https://catalog.stonybrook.edu/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'buffalo', url: 'https://catalogs.buffalo.edu/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'penn-state', url: 'https://bulletins.psu.edu/university-course-descriptions/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'pitt', url: 'https://catalog.upp.pitt.edu/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'uiuc', url: 'https://catalog.illinois.edu/courses-of-instruction/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'uic', url: 'https://catalog.uic.edu/ucat/course-descriptions/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'unc', url: 'https://catalog.unc.edu/courses/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'nc-state', url: 'https://catalog.ncsu.edu/course-descriptions/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'uw', url: 'https://www.washington.edu/students/crscat/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'wsu', url: 'https://catalog.wsu.edu/Course', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'uva', url: 'https://records.ureg.virginia.edu/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'virginia-tech', url: 'https://catalog.vt.edu/undergraduate/course-descriptions/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'umass-amherst', url: 'https://catalog.umass.edu/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'umass-boston', url: 'https://catalog.umb.edu/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'cu-boulder', url: 'https://catalog.colorado.edu/courses-a-z/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'colorado-state', url: 'https://catalog.colostate.edu/general-catalog/courses-az/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'uga', url: 'https://bulletin.uga.edu/CoursesHome', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'georgia-tech', url: 'https://catalog.gatech.edu/coursesaz/', checkedAt: '2026-08-23', verification: 'catalog_page' },
  { collegeId: 'brown', url: 'https://bulletin.brown.edu/courses/', checkedAt: '2026-08-24', verification: 'catalog_page' },
  { collegeId: 'columbia', url: 'https://bulletin.columbia.edu/columbia-college/departments-instruction/', checkedAt: '2026-08-24', verification: 'catalog_page' },
  { collegeId: 'cornell', url: 'https://courses.cornell.edu/courses/', checkedAt: '2026-08-24', verification: 'catalog_page' },
  { collegeId: 'dartmouth', url: 'https://dartmouth.smartcatalogiq.com/current/orc/departments-programs-undergraduate/', checkedAt: '2026-08-24', verification: 'catalog_page' },
  { collegeId: 'harvard', url: 'https://courses.my.harvard.edu/', checkedAt: '2026-08-24', verification: 'catalog_page' },
  { collegeId: 'penn', url: 'https://catalog.upenn.edu/courses/', checkedAt: '2026-08-24', verification: 'catalog_page' },
  { collegeId: 'princeton', url: 'https://registrar.princeton.edu/course-offerings', checkedAt: '2026-08-24', verification: 'catalog_page' },
  { collegeId: 'yale', url: 'https://catalog.yale.edu/ycps/subjects-of-instruction/', checkedAt: '2026-08-24', verification: 'catalog_page' },
]