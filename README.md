# School Study Prep

A website to study, practice for, and ace your exams and quizzes.

Practice quizzes, midterm exams, and cumulative final reviews organized around real university
courses and, where available, official instructor syllabi.

## Features

- **38 universities** across 19 states, including all eight Ivy League schools.
- **110,000+ official catalog courses** imported directly from university course catalogs.
- **Syllabus-aligned assessments** — quizzes mapped to the chapters and lecture blocks of a real
  course offering (currently UNT BIOL 1710, Fall 2026).
- **General practice banks** for six core subjects: Biology, Chemistry, Calculus, Psychology,
  Physics, and Statistics.
- **Instant explanations** for every question, including why the distractors are wrong.
- **Keyboard-first quizzes** — answer with `A`–`D` or `1`–`4`, advance with `Enter`.
- Fast search and department filters for browsing large course catalogs.

## Data sources and honesty

Course listings are imported from official university catalogs and are labelled by source. Courses
that come from a catalog import but have no verified question set say so explicitly rather than
showing unrelated questions. Only a course with a verified syllabus is presented as
syllabus-aligned.

Catalog snapshots live in `public/catalogs/` and are loaded on demand per university, so the app
bundle stays small.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at https://silicon-beep.github.io/School-study-prep/#colleges.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest suite |
| `npm run lint` | Run ESLint |
| `npm run import:courseleaf` | Re-import official course catalogs |

## Tech stack

React, TypeScript, and Vite, with Radix UI primitives for accessible dropdowns and plain CSS for
styling. No backend — all data is static and served with the app.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which
runs the tests, builds the site, and publishes it to GitHub Pages.
