# Missing parts

This file lists the parts that the app does not have yet. The state is from 2026-10-25, branch `develop`.

## 1. Public REST API

This is the largest gap. REST means Representational State Transfer.

- The app has no public API for its records: agents, evaluators, runs, results, metrics, and more. `SPEC.md` section 8.7 lists the operations.
- The app has only these public routes:
  - `POST /api/observability/v1/observe`
  - `GET /api/observability/v2/call-logs`
  - `GET /api/files/<fileId>` (recordings and exports)
  - `GET /api/share/<token>/files/<fileId>` (recordings of a shared link)
- The app pages use Server Actions. The server functions in `src/server/<entity>/` already exist, so new API routes can call them.
- Use the API key helpers in `src/server/public-api/` (`withApiKey`, `paginate`, and the error responses).

## 2. Parts that are not complete

### Settings

- "Notifications" has no input fields for the "No Calls" period and the "Frequent Calls" limits (threshold, window, and cooldown).
- The "No Calls" period is fixed at 1 hour.

### Results

- "Download PDF" opens a print page. It does not make a PDF file.
- "Reports" and "Compare Results" do not work. The buttons show as disabled.
- "Select View" applies the agents of the saved view as a filter only. The Results page has no "Create New View".
- The public share page of a result shows only the score, the rubric tiles, the call stats, and the runs table.
- The "Expected Outcome" detail shows the prompt as read-only text. It has no "Re-Evaluate" and no "Save" button.

### Calls

- The export makes only a comma-separated values (CSV) file. It cannot make an Excel (XLSX) file.
- All provider tiles in the empty state show the same HTTP code sample. Only the subtitle changes.
- The time range picker has no calendar buttons and no copy and paste buttons.

### Overview dashboards and Runs Overview

- The plot dialog has no free-form filter rows. It has only the outcome filter (all, success only, failure only).
- The plot dialog has no "Metric Score" group and no custom colour button.
- The daily report holds text summaries of the plots, not chart pictures.
- The daily report has no limit on the number of dashboards. The limit must be 5.
- Runs Overview does not write `from` and `to` into the URL on the first open.

### Labs

- The Auto Improve panel has no "Run regression check", no "Re-optimise", and no "Stop".
- The organization switch "Background Metric Optimiser" does not exist.

### Insights

- No "Select View".
- No drag and drop order of the metric cards.

### Small defects

- The personality breadcrumb link loses the `?project` parameter.
- A result of "Run from file" shows "# Evaluators 0".
- A finished export row says "1 row exported". It must show "Completed" and a date.
- In the monitor dialog, the "select all" checkbox of a folder stays disabled until the folder is open.
- In development only, the Next.js dev indicator covers the sidebar link "Settings".

## 3. Not checked

- Real artificial intelligence (AI) answers. No `ANTHROPIC_API_KEY` was set, so every AI step used its mock.
- Real phone calls and real transcription. The mock call engine and the mock transcription did all the work.
- Two dev servers that work on the same project at the same time.
- An API key of one organization against the data of another organization.
- Call upload of MP3, MP4, and OGG files, and the 500 MB size limit.

## 4. Where to connect the real voice engine

- Outbound test calls: `src/server/call-engine/get-call-engine.ts`. The environment variable `CALL_ENGINE` selects the engine. Add the new engine next to `mock/` with the same `placeCall(input, signal)` interface. Runs, monitors, and connection test calls all use this function.
- Inbound and production calls: `POST /api/observability/v1/observe`. A recording without a transcript goes to `src/server/transcription/get-transcription-engine.ts`. The environment variable `TRANSCRIPTION_ENGINE` selects the engine.

## 5. Clean-up

- The worktree `C:/Users/Administrator/Desktop/earshot-worktrees/analytics` and its dev server on port 3400 still exist.
- The test databases `earshot_simulation` and `earshot_analytics` are still in the PostgreSQL container. The app uses only `earshot`.
- These branches are merged into `develop` and can be deleted: `feat/foundation`, `feat/catalog`, `feat/simulation`, `feat/analytics`, `fix/final-check`, `fix/project-files`, `docs/spec`.
- `main` has only the first commit. `develop` is not pushed.
