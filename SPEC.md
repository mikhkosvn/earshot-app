# Functional specification of the app

**Audience:** the coding agent that builds the app.
**Scope:** every page, dialog, form, and backend call of the app. Horizontal autoscaling for parallel calls is out of scope. The owner builds it separately.

> **IMPORTANT — DO NOT BUILD THESE PARTS.** The owner excluded them on 2026-10-24 and 2026-10-25. This spec describes them only as a record.
>
> | Excluded part | Where the spec describes it |
> |---|---|
> | "Docs" link in the sidebar footer | 1.3.1 |
> | "Support" button and the support messenger | 1.3.1, 1.3.3 |
> | "Onboarding" checklist, its badge, and its panel | 1.3.5, global calls `/user/onboarding/` and `/user/organizations/{id}/onboarding-tasks/` |
> | "Buy Credits", the plan badge "PayG", the credit balance card, credit costs, and every payment flow. The app is free. | 1.3.4, 7.6, 7.16 |
> | The Assistant: the `/ai-assistant` pages, the "Ask Assistant" panel, and the "Agent Config" settings page | 1.2.3, 4, 7.8, 8.4, 10.11 |
> | Settings "Billing" and organization "Integrations" | 7.6, 7.9 |
> | The items in 9.0 "Out of scope by owner decision" | 9.0 |
>
> The target sidebar has the three groups "General", "Simulation", and "Observability" with these 13 links: Agents, Metrics, Labs, Rubric, Personality, Evaluators, Results, Runs Overview, Monitors, Calls, Alerts, Insights, Overview. The footer keeps "Settings" only.

## Contents

- [0. How to use this document](#0-how-to-use-this-document)
  - [0.1 Read order](#01-read-order)
  - [0.2 Evidence levels](#02-evidence-levels)
  - [0.3 Example data](#03-example-data)
  - [0.4 Glossary](#04-glossary)
  - [0.5 Record model](#05-record-model)
- [1. Application shell, navigation, and routes](#1-application-shell-navigation-and-routes)
  - [1.1 Shell layout](#11-shell-layout)
  - [1.2 Top bar](#12-top-bar)
  - [1.3 Left sidebar (main mode)](#13-left-sidebar-main-mode)
  - [1.4 Background-task panels](#14-background-task-panels)
  - [1.5 Toasts and global dialogs](#15-toasts-and-global-dialogs)
  - [1.6 Global data loaded on every page](#16-global-data-loaded-on-every-page)
  - [1.7 Route table](#17-route-table)
- [2. Agents](#2-agents)
  - [2.1 Agents list](#21-agents-list)
  - [2.2 Duplicate Agent dialog](#22-duplicate-agent-dialog)
  - [2.3 Delete Agent dialog](#23-delete-agent-dialog)
  - [2.4 Import agents from your provider dialog](#24-import-agents-from-your-provider-dialog)
  - [2.5 Create Agent wizard, step 1: Connection](#25-create-agent-wizard-step-1-connection)
  - [2.6 Create Agent wizard, step 2: Basic Info](#26-create-agent-wizard-step-2-basic-info)
  - [2.7 Create flow, Connection check, and the "Something went wrong" dialog](#27-create-flow-connection-check-and-the-something-went-wrong-dialog)
  - [2.8 Agent Settings page](#28-agent-settings-page)
  - [2.9 Version History panel](#29-version-history-panel)
  - [2.10 Test connections dialog](#210-test-connections-dialog)
  - [2.11 Reconfigure](#211-reconfigure)
  - [2.12 Agent JSON model](#212-agent-json-model)
  - [2.13 Backend call summary](#213-backend-call-summary)
- [3. Metrics, Labs, and Rubric](#3-metrics-labs-and-rubric)
  - [3.0 Shared terms](#30-shared-terms)
  - [3.1 Metric JSON model](#31-metric-json-model)
  - [3.2 Metrics list page](#32-metrics-list-page)
  - [3.3 Select View menu and Create New View dialog](#33-select-view-menu-and-create-new-view-dialog)
  - [3.4 Manage Metric agents dialog](#34-manage-metric-agents-dialog)
  - [3.5 Row menu: Sampling rate and Delete](#35-row-menu-sampling-rate-and-delete)
  - [3.6 Predefined Metrics dialog](#36-predefined-metrics-dialog)
  - [3.7 Generate Metrics dialog and async flow](#37-generate-metrics-dialog-and-async-flow)
  - [3.8 Create Metric page: Quick Mode](#38-create-metric-page-quick-mode)
  - [3.9 Create Metric page: Detail Mode](#39-create-metric-page-detail-mode)
  - [3.10 Sample-label review flow](#310-sample-label-review-flow)
  - [3.11 Edit Metric page and Change History](#311-edit-metric-page-and-change-history)
  - [3.12 Labs list](#312-labs-list)
  - [3.13 Labs metric editor](#313-labs-metric-editor)
  - [3.14 Rubric page](#314-rubric-page)
- [4. Assistant (in-product AI assistant)](#4-assistant-in-product-ai-assistant)
  - [4.1 Entry points](#41-entry-points)
  - [4.2 Assistant page, welcome screen](#42-assistant-page-welcome-screen)
  - [4.3 History sidebar](#43-history-sidebar)
  - [4.4 Message box](#44-message-box)
  - [4.5 Conversation page](#45-conversation-page)
  - [4.6 Question widget](#46-question-widget)
  - [4.7 "Ask Assistant" side panel](#47-ask-assistant-side-panel)
  - [4.8 Backend protocol](#48-backend-protocol)
  - [4.9 Settings: Agent Config (organization)](#49-settings-agent-config-organization)
  - [4.10 Settings: Agent Knowledge (project)](#410-settings-agent-knowledge-project)
  - [4.11 What the public docs say](#411-what-the-public-docs-say)
  - [4.12 Design notes for a rebuild](#412-design-notes-for-a-rebuild)
- [5. Simulation: Personalities, Evaluators, Test Profiles, and Runs](#5-simulation-personalities-evaluators-test-profiles-and-runs)
  - [5.0 Shared conventions](#50-shared-conventions)
  - [5.1 Personality list](#51-personality-list)
  - [5.2 Fork a Personality](#52-fork-a-personality)
  - [5.3 Create personality and Edit personality form](#53-create-personality-and-edit-personality-form)
  - [5.4 Personality JSON model](#54-personality-json-model)
  - [5.5 Delete a Personality](#55-delete-a-personality)
  - [5.6 Evaluators page](#56-evaluators-page)
  - [5.7 Folder sidebar and Folder dialogs](#57-folder-sidebar-and-folder-dialogs)
  - [5.8 Generate Evaluators dialog](#58-generate-evaluators-dialog)
  - [5.9 Scenario agent flow and "Review Generated Scenarios" panel](#59-scenario-agent-flow-and-review-generated-scenarios-panel)
  - [5.10 Create an Evaluator page](#510-create-an-evaluator-page)
  - [5.11 Edit Evaluator page](#511-edit-evaluator-page)
  - [5.12 Evaluator JSON model](#512-evaluator-json-model)
  - [5.13 Test Profiles dialog and Create Test Profile](#513-test-profiles-dialog-and-create-test-profile)
  - [5.14 "Run a test suite from a file" dialog](#514-run-a-test-suite-from-a-file-dialog)
  - [5.15 "Configure Run" dialog](#515-configure-run-dialog)
  - [5.16 Delete flows](#516-delete-flows)
  - [5.17 Run endpoints and Result fields (from the public API docs)](#517-run-endpoints-and-result-fields-from-the-public-api-docs)
- [6. Results, Runs Overview, Monitors, and Observability](#6-results-runs-overview-monitors-and-observability)
  - [6.1 Results page](#61-results-page)
  - [6.2 Runs Overview page](#62-runs-overview-page)
  - [6.3 Monitors page](#63-monitors-page)
  - [6.4 Calls page (observability call logs)](#64-calls-page-observability-call-logs)
  - [6.5 Alerts page](#65-alerts-page)
  - [6.6 Insights page](#66-insights-page)
  - [6.7 Overview dashboards](#67-overview-dashboards)
  - [6.8 Shared component: time range picker](#68-shared-component-time-range-picker)
- [7. Settings, Members, and Billing](#7-settings-members-and-billing)
  - [7.1 Settings shell](#71-settings-shell)
  - [7.2 Account Settings](#72-account-settings)
  - [7.3 Organization: General](#73-organization-general)
  - [7.4 Organization: API Key](#74-organization-api-key)
  - [7.5 Organization: Members](#75-organization-members)
  - [7.6 Organization: Billing](#76-organization-billing)
  - [7.7 Organization: Telephony](#77-organization-telephony)
  - [7.8 Organization: Agent Config](#78-organization-agent-config)
  - [7.9 Organization: Integrations](#79-organization-integrations)
  - [7.10 Project: General](#710-project-general)
  - [7.11 Project: Notifications (Integrations)](#711-project-notifications-integrations)
  - [7.12 Project: Provider API Keys](#712-project-provider-api-keys)
  - [7.13 Project: Webhook](#713-project-webhook)
  - [7.14 Project: Agent Knowledge](#714-project-agent-knowledge)
  - [7.15 About: Third-Party Notices](#715-about-third-party-notices)
  - [7.16 "Buy Credits" dialog](#716-buy-credits-dialog)
- [8. Backend map (observed dashboard API)](#8-backend-map-observed-dashboard-api)
  - [8.1 Hosts](#81-hosts)
  - [8.2 Conventions](#82-conventions)
  - [8.3 Async job pattern](#83-async-job-pattern)
  - [8.4 Chat stream (Assistant)](#84-chat-stream-assistant)
  - [8.5 Endpoint catalog](#85-endpoint-catalog)
  - [8.6 Enums (`GET /enums/`)](#86-enums-get-enums)
  - [8.7 Mapping to the public API](#87-mapping-to-the-public-api)
- [9. Not seen in the crawl, and the test plan for after the top-up](#9-not-seen-in-the-crawl-and-the-test-plan-for-after-the-top-up)
  - [9.0 Status after the live run of 2026-10-24](#90-status-after-the-live-run-of-2026-10-24)
  - [9.1 Why parts were not seen](#91-why-parts-were-not-seen)
  - [9.2 Test plan for after the top-up](#92-test-plan-for-after-the-top-up)
  - [9.3 Gaps by section](#93-gaps-by-section)
- [10. Live run on a reachable agent (2026-10-24)](#10-live-run-on-a-reachable-agent-2026-10-24)
  - [10.0 Context of the live run](#100-context-of-the-live-run)
  - [10.1 Agent creation and the connection test call](#101-agent-creation-and-the-connection-test-call)
  - [10.2 Manual Mode Evaluator creation](#102-manual-mode-evaluator-creation)
  - [10.3 Run start: "Configure Run" and "Run Status"](#103-run-start-configure-run-and-run-status)
  - [10.4 Result detail page](#104-result-detail-page)
  - [10.5 Run detail panel](#105-run-detail-panel)
  - [10.6 Monitor from a Run](#106-monitor-from-a-run)
  - [10.7 Calls with data](#107-calls-with-data)
  - [10.8 Labs with a review](#108-labs-with-a-review)
  - [10.9 Quick Mode Metric](#109-quick-mode-metric)
  - [10.10 Metric review with data](#1010-metric-review-with-data)
  - [10.11 Assistant with data](#1011-assistant-with-data)
  - [10.12 Insights](#1012-insights)
  - [10.13 Evaluator actions](#1013-evaluator-actions)
  - [10.14 "Run from file" dry run](#1014-run-from-file-dry-run)
  - [10.15 Pages that now have data](#1015-pages-that-now-have-data)
  - [10.16 Gaps closed by this run](#1016-gaps-closed-by-this-run)
- [11. Build plan: vertical slices](#11-build-plan-vertical-slices)
  - [11.1 Why the slices do not follow the sidebar tabs one to one](#111-why-the-slices-do-not-follow-the-sidebar-tabs-one-to-one)
  - [11.2 Shared contracts](#112-shared-contracts)
  - [11.3 Slices](#113-slices)
  - [11.4 Waves](#114-waves)
  - [11.5 Rules for builders who work at the same time](#115-rules-for-builders-who-work-at-the-same-time)
  - [11.6 Brief for one slice builder](#116-brief-for-one-slice-builder)

## 0. How to use this document

### 0.1 Read order

1. Read section 0 to learn the records and the terms.
2. Read section 1 for the shell, the navigation, and the route table.
3. Read sections 2 to 7 for the screens. Each screen has a route, controls, flows, backend calls, and states.
4. Read section 8 for the backend: hosts, conventions, the endpoint catalog, and the enums.
5. Read section 9 for the parts that are not confirmed, and for the parts that the owner put out of scope. Do not invent behavior for these parts. Use the public API reference instead.
6. Read section 10 for the screens that need data: the Result and Run detail pages, call logs, Labs with reviews, and Insights.

### 0.2 Evidence levels

A crawl is a recorded walk through every screen with a test account. It records the page, the accessibility tree, and every backend call with its request body and response body. Two crawls produced the examples in this spec.

| Mark | Meaning |
|---|---|
| no mark | A crawl showed it. A recorded screen or a captured request proves it. |
| "(inferred)" | The writer concluded it from other evidence. Check it before you depend on it. |
| "from the public API docs" | The public API reference says it. No crawl showed it. |

### 0.3 Example data

- Organization 7868 "example-org".
- Project 13875 "Automaton Project".
- One real agent: 22757 "Voice Regression — E2E Deploy Agent Sq" (provider VAPI, telephony inbound).
- First crawl (2026-10-23): the project had no results, no runs, and no call logs. Sections 1 to 8 show the empty states of the result and call screens.
- Live run (2026-10-24): a test agent called +1 555 010 0199, a Vapi agent of the owner. Section 10 shows the same screens with data.
- Both crawls created test records with names that start with `zz-spec-test`, plus some records that the platform created on its own. Both crawls deleted all of them at the end.

### 0.4 Glossary

| Term | Meaning |
|---|---|
| Organization | The account. It owns members, API keys, and projects. |
| Project | The workspace. All records below belong to one project. The URL carries it as `?project=<id>` or as a path prefix `/<id>/`. |
| Agent | The voice or chat agent under test. The backend calls it `aiagent`. It holds the provider, the connections, the description, knowledge files, mock tools, dynamic variables, and a webhook. |
| Main Agent | The customer's agent, in metric and evaluator prompts. |
| Testing Agent, Test Agent | The simulated caller that the app runs. |
| Evaluator | One test case. The backend calls it `scenario`. It holds instructions for the simulated caller, an expected outcome, metrics, a personality, and a test profile. |
| Folder | A named group of evaluators. |
| Test Profile | Key-value data for one evaluator. "Main agent variables" go to the agent under test. "Testing agent variables" go to the simulated caller. |
| Personality | The voice and the manner of the simulated caller: voice model, voice ID, language, speed, interruption level, background noise. |
| Metric | One scoring rule. It is a Large Language Model (LLM) judge or Python code. The type is Boolean, Rating, Enum, or Numeric. Predefined metrics come from the app. |
| Rubric | Project rule that combines metric scores into one success or failure verdict. |
| Lab | An editor that tunes one metric against reviewed calls. |
| Run | One simulated conversation of one evaluator. |
| Result | A group of runs that start together. |
| Monitor | A scheduled set of runs (backend name `cron-jobs`). |
| Call | A production call log that the platform imports or receives, then scores with metrics (observability). |
| Alert | A rule that fires when a metric fails or changes. |
| Insight | An analysis of metric failure modes over calls. |
| Dashboard, Plot | A project overview page made of chart widgets. |
| Assistant | The in-product AI assistant at `/ai-assistant`. It reads and changes project records with tools. Excluded: the app does not build it. |
| Credits | Excluded. The app is free. The spec keeps credit texts only as a record. |

### 0.5 Record model

The diagram shows ownership. An arrow points from the owner to the owned record.

```
Organization ──┬── Member (role: admin, ...)
               ├── API key
               ├── Billing account (credits, usage)
               ├── Subscription (pack: limits)
               ├── Organization MCP servers, skills (for Assistant)
               └── Project ──┬── Agent ──┬── Knowledge base file, connector
                             │           ├── Mock tool
                             │           ├── Dynamic variable
                             │           ├── Version history
                             │           └── Test Profile (one default per agent)
                             ├── Personality (custom or forked; global ones exist too)
                             ├── Folder ── Evaluator ── (Test Profile, Personality, Metrics)
                             ├── Metric ── (enabled per Agent) ── Pattern review
                             ├── Rubric configuration (on the project record)
                             ├── Result ── Run ── metric evaluations
                             ├── Monitor ── (Agent, Evaluators, schedule)
                             ├── Call log ── metric evaluations
                             ├── Alert ── (Metric)
                             ├── Dashboard ── Widget (Plot)
                             └── Assistant conversation ── Message ── stream events
```

Auto-created records seen in the crawl:

- A new agent gets a default test profile named "Default Test Profile - <agent name> (<agent id>)".
- A new agent gets every metric that has "Automatically add to new agents" on.
- AI generation of an evaluator creates a test profile for it.
- A new metric creates a pattern review record.
- "Fork" on a personality creates a copy at once, with the name "<name> - fork".

## 1. Application shell, navigation, and routes

This section describes the frame around every page: the top bar, the left sidebar, the floating panels, the toasts, the data that every page loads, and the route table.

Hosts seen in the capture:

| Host | Role |
|---|---|
| `https://app.example.com` | The dashboard (all routes in this section are paths on this host). |
| `https://backend.example.com` | The backend API. All backend paths in this section are paths on this host. |

### 1.1 Shell layout

The shell has four fixed regions and two floating layers.

| Order | Region | Position | Content |
|---|---|---|---|
| 1 | Top bar (`banner`) | Full width, top, about 48 px high | Organization switcher, "/", project switcher, "Ask Assistant", notifications bell, account menu |
| 2 | Left sidebar (`complementary`) | Left, full height, about 208 px wide | Navigation groups, footer links, plan and credits block, Onboarding checklist |
| 3 | Main area (`main`) | Right of the sidebar | The page. Light grey background. |
| 4 | Right dock (optional) | Right edge, below the top bar | The "Ask Assistant" panel. It pushes the main area to the left. It does not cover the main area. |
| 5 | Floating panels (optional) | Bottom right, above the main area | Background-task panels ("Metric Generation", "Review <metric>"), toasts, the Support messenger |
| 6 | Floating popover (optional) | Bottom left, next to the sidebar footer | The Onboarding panel |

The shell has two sidebar modes:

| Mode | Routes | Sidebar content |
|---|---|---|
| Main mode | All routes except `/settings` and `/settings/...` | Groups "General", "Simulation", "Observability", then the footer |
| Settings mode | `/settings` and `/settings/...` | "Home", "Settings", groups "ORGANIZATION", "PROJECT", "ABOUT". No credits block. No Onboarding item. See 1.3.6. |

The page title in the browser tab is "The app | Test AI Voice Agents with Simulated Personas" on the Agents page.

Every page also has an empty `alert` element at the end of the document (inferred: a route announcer for screen readers).

### 1.2 Top bar

The top bar is the same on every route. One exception: the "Ask Assistant" button is absent on `/ai-assistant` (the Assistant page itself).

Top bar controls, from left to right:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Organization name, for example "example-org" | Button with a building icon and an up/down chevron | Organization names | The current organization | None seen | Opens the organization switcher menu (1.2.1). |
| "/" | Static text | "/" | - | - | Separator. |
| Project chip and name, for example "13875" + "Automaton Project" | Button. The project ID shows in a grey chip. An up/down chevron follows the name. | Project names | The current project | None seen | Opens the project switcher menu (1.2.2). |
| "Ask Assistant" | Button with a sparkle icon. Purple outline. It becomes solid purple while the panel is open. | - | Closed | - | Opens or closes the "Ask Assistant" dock (1.2.3). Absent on `/ai-assistant`. |
| Bell | Icon button. Accessible name "Notifications" when nothing is unread, "Notifications (3 unread)" when 3 items are unread. | Red circle badge with the unread count, for example "3" | No badge when the count is 0 | - | Opens the notifications panel (1.2.4). |
| Email, avatar, chevron | Button "Account menu". It shows the account email (<user-email>), a round gradient avatar, and a down chevron. | - | - | - | Opens the account menu (1.2.5). |

#### 1.2.1 Organization switcher

1. Route: any route. The user clicks the organization name at the top left.
2. Purpose: show the organizations of the user and let the user change the current organization.
3. Layout: a dropdown menu under the button. Heading "Organizations", separator, search box, separator, one row for each organization. Each row has a building icon and the organization name. The current organization row has a grey highlight.

Controls:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Search organizations..." | Text box | Free text | Empty | None seen | Filters the rows (inferred). |
| Organization row, for example "example-org" | Menu item | One row for each organization | Current organization highlighted | - | Changes the current organization (inferred). |

Flows:

1. The user clicks the organization button. The menu opens. No backend call. The page loads the list on every page (see 1.6, call `GET /user/v2/organizations/`).

Backend calls: none at open. The list comes from `GET /user/v2/organizations/` (1.6).

Business rules observed:

- The subscription pack of the capture account has `"multiple_organizations": false` in `first_paid_seat_plan_offer.current_plan`. The account has one organization.

##### Not seen in the capture

- The behavior when the user picks a second organization. The account had one organization only.
- The behavior of the search box with input.
- A "Create organization" action. The menu showed none.

#### 1.2.2 Project switcher

1. Route: any route. The user clicks the project chip and name in the top bar.
2. Purpose: show the projects of the current organization, change the current project, and create, edit, or delete a project.
3. Layout: a dropdown menu under the button. Heading "Projects", separator, search box, separator, one row for each project, separator, "Create Project" and "Edit Project", separator, "Delete Project" in red.

Controls:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Search projects..." | Text box with a search icon | Free text | Empty | None seen | Filters the project rows (inferred). |
| Project row, for example "13875 Automaton Project" | Menu item. The ID shows in a grey chip before the name. | One row for each project | Current project highlighted | - | Makes the project current. The `project` value in the URL changes (inferred). |
| "Create Project" | Menu item with a "+" icon | - | - | See "Create new project" dialog | Opens the "Create new project" dialog. |
| "Edit Project" | Menu item with a pencil icon | - | - | Not seen | Opens an edit form for the current project (inferred). Not opened in the capture. |
| "Delete Project" | Menu item with a trash icon, red text | - | - | Not seen | Deletes the current project after a confirmation (inferred). Not opened in the capture. |

##### "Create new project" dialog

Layout: a modal dialog in the center of the page. Header with a "+" icon and the title "Create new project", and a "Close" (X) button. Body with one field. Footer with "Cancel" and "Create project".

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Project name" | Text box, placeholder "Enter project name" | Free text | Empty | None seen on the client | Holds the new project name. |
| "Cancel" | Button | - | - | - | Closes the dialog. No backend call. |
| "Create project" | Button, black | - | Enabled | Backend error `["Max projects limit reached"]` | Sends `POST /user/v1/projects/`. |
| "Close" | Icon button (X) | - | - | - | Closes the dialog. |

##### "Upgrade to Enterprise" dialog (project limit)

The dialog shows when `POST /user/v1/projects/` returns status 400 with the project limit error. The accessibility snapshot did not record this dialog. Only the screenshot shows it.

| Element | Text (verbatim) |
|---|---|
| Title | "Upgrade to Enterprise" |
| Body | "You've reached the limit for projects on your current plan. Upgrade to Enterprise to unlock:" |
| List (green check marks) | "Unlimited projects and resources", "Higher concurrency limits", "Advanced collaboration features", "Priority support", "Custom integrations" |
| Footer text | "Contact our sales team to learn more about Enterprise plans and pricing." |
| Buttons | "Maybe Later" (outline), "Contact Sales" (blue, with an external-link icon) |

Behavior:

- "Maybe Later" closes the dialog (inferred).
- "Contact Sales" opens an external sales page (inferred). The billing page uses `https://cal.com/kabrasidhant/30min` for its sales links. The target of "Contact Sales" was not captured.

Flows:

1. The user clicks the project button. The menu opens. No backend call.
2. The user clicks "Create Project". The "Create new project" dialog opens. No backend call.
3. The user types a name, for example "zz-spec-test".
4. The user clicks "Create project". The dashboard sends `POST /user/v1/projects/`.
5. If the backend returns 400 `["Max projects limit reached"]`, the "Upgrade to Enterprise" dialog opens. The project menu stays visible behind the dialog.
6. If the backend returns 201, the new project appears in the switcher (inferred, not seen).

Backend calls:

`POST /user/v1/projects/`

```json
// request
{"name":"zz-spec-test","organization_id":7868}
// response 400
["Max projects limit reached"]
```

Status codes seen: 400. The public API docs give 201 with a Project record on success.

`GET /user/v1/projects` (the project list, loaded on every page, see 1.6)

- Query: `organization_id=7868`, `ql={id,name,organization{id},members{id,role,is_email_notify_enabled,user{id,name,email}},created_at,updated_at,outbound_timeout,max_call_duration,min_call_duration,use_provider_transcript,notify_daily_report,daily_report_dashboard_ids}`

```json
[{"id":13875,"name":"Automaton Project","members":[],"organization":{"id":7868},
  "outbound_timeout":300,"max_call_duration":600,"min_call_duration":10,
  "use_provider_transcript":false,"notify_daily_report":true,
  "daily_report_dashboard_ids":[],"created_at":"2026-09-03T13:30:06.431103Z",
  "updated_at":"2026-09-03T13:30:06.431109Z"}]
```

Status codes seen: 200.

From the public API docs (not captured): `PATCH /user/v1/projects/{id}/` updates a project. `DELETE /user/v1/projects/{id}/` deletes a project and everything in it. The docs say: "The last remaining project in an organization cannot be deleted."

Business rules observed:

- The "Pay As You Go" plan has `"max_projects_limit": 1` (from `GET /subscriptions/subscriptions/`, field `first_paid_seat_plan_offer.current_plan`). The account had 1 project. So the backend refused a second project with "Max projects limit reached".
- The "Startup Plan" offer in the same response has `"max_projects_limit": 5`.

States:

| State | Text |
|---|---|
| Project limit error | Dialog "Upgrade to Enterprise" (see above). The raw backend text "Max projects limit reached" did not show in the screenshot. |

##### Not seen in the capture

- A successful project creation and the redirect after it.
- The "Edit Project" form and its backend call.
- The "Delete Project" confirmation, its text, and its backend call.
- Client-side validation for an empty project name.
- The behavior of "Contact Sales" and "Maybe Later".

#### 1.2.3 "Ask Assistant" dock (panel shell only)

1. Route: any route except `/ai-assistant`. The user clicks "Ask Assistant" in the top bar.
2. Purpose: open the Assistant chat next to the current page. The chat itself is described in the Assistant section.
3. Layout: a panel docked at the right edge, about 420 px wide, full height below the top bar. The main area becomes narrower. The panel has a header row, a body, and a composer at the bottom.

Header controls, from left to right:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "New chat" | Button with a sparkle icon and an up/down chevron | Conversation titles (inferred) | "New chat" | - | Shows the current conversation title. Opens a conversation picker (inferred). |
| "New conversation" | Icon button ("+") | - | - | - | Starts a new conversation (inferred). |
| "Open in Assistant" | Icon link (expand arrows) to `/ai-assistant` | - | - | - | Opens the full Assistant page. |
| "Close" | Icon button (X) | - | - | - | Closes the dock. |

Body (empty conversation): heading "Welcome to the Assistant", text "Ask me anything about your workspace", label "Try asking me to", and six suggestion buttons. The composer has the text box "Message Assistant" with the placeholder "Ask anything about your workspace, or type / for commands…", an "Add files" button, and a "Send" button (disabled while the text box is empty). The Assistant section describes these controls.

Flows:

1. The user clicks "Ask Assistant". The dock opens. No backend call was captured at open. The conversation list comes from the global call `GET /app/v2/product-chat/conversations/?limit=50` (1.6).

##### Not seen in the capture

- The conversation picker under "New chat".
- Whether the dock stays open after the user goes to another route.

#### 1.2.4 Notifications panel

1. Route: any route. The user clicks the bell icon in the top bar.
2. Purpose: list events from long background jobs and from the assistants, and let the user open each event.
3. Layout: a popover under the bell, about 380 px wide. Header row: "Notifications", a grey pill "3 new", and the "Mark all read" button with a double-check icon. Then one row with a muted bell icon and the browser notification prompt. Then the list of notifications, newest first.

Each notification row has a green dot, a bold title, a body text (cut at about 2 lines with "..."), and a relative time.

Controls:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Mark all read" | Text button with a double-check icon | - | Enabled when unread items exist (inferred) | - | Marks all items as read (inferred). Not clicked in the capture. |
| "Enable browser notifications to get alerted when long-running jobs finish — even with this tab closed." | Button (full-width row) | - | Shown | - | Asks the browser for notification permission (inferred). Not clicked. |
| Notification row, for example "Scenarios generated 1 scenario for 'zz-spec-test-agent' is ready. Open to review and accept. 29 minutes ago" | Button (full row) | One row for each notification | - | - | Opens the `deep_link` of the notification (inferred). |

Rows seen (verbatim):

| Title | Body | Time | `event_type` | `deep_link` |
|---|---|---|---|---|
| "Scenarios generated" | "1 scenario for 'zz-spec-test-agent' is ready. Open to review and accept." | "29 minutes ago" | `scenario_generation_complete` | `/test-case?reopenSheet=true&progressId=<uuid>` |
| "Scenario assistant needs your input" | "Will your agent always speak first at the start of a call? (Reply 'yes' if your agent sends the first message, or 'no' if our testing age..." | "32 minutes ago" | `scenario_agent_question` | `/test-case?reopenSheet=true` |
| "Assistant needs your input" | "No test results exist yet — would you..." | "42 minutes ago" | `agent_question` | `/ai-assistant/<conversation uuid>` |

The backend cuts the body text. The "..." is part of the `body` value.

Flows:

1. The page loads the unread count on every page with `GET /notifications/v1/notifications/unread_count/` (1.6). The bell shows the count as a red badge.
2. The user clicks the bell. The dashboard sends `GET /notifications/v1/notifications/`. The panel opens.
3. The user clicks a row. The dashboard opens the `deep_link` route (inferred).

Backend calls:

`GET /notifications/v1/notifications/`

- Query: `page=1`, `ql={id,title,body,severity,is_read,deep_link,created_at,event_type}`

```json
{"next":null,"previous":null,"results":[
  {"id":8970,"event_type":"scenario_generation_complete","title":"Scenarios generated",
   "body":"1 scenario for 'zz-spec-test-agent' is ready. Open to review and accept.",
   "deep_link":"/test-case?reopenSheet=true&progressId=09fef315-372a-41a9-9ee8-4948dcf6cd82",
   "severity":"success","is_read":false,"created_at":"2026-10-23T19:50:47.378303Z"},
  ...]}
```

Status codes seen: 200. The response has no `count` field.

`GET /notifications/v1/notifications/unread_count/`

```json
{"unread_count":0}
```

Status codes seen: 200.

States:

| State | Text or look |
|---|---|
| Unread items | Pill "3 new". Green dot on each unread row. Red badge on the bell. |
| No unread items | No badge on the bell. Accessible name "Notifications". |

Business rules observed:

- The `severity` of all three items was `success`. The meaning of the green dot (unread or severity) is not clear (inferred: unread).
- The deep link of a finished scenario generation reopens the generation sheet on the Evaluators page with `reopenSheet=true` and `progressId`.

##### Not seen in the capture

- The empty panel (no notifications).
- The result of "Mark all read" and its backend call.
- The result of a click on a row.
- Pagination of the list (page 2).
- Severities other than `success`.
- The browser permission prompt.

#### 1.2.5 Account menu

1. Route: any route. The user clicks the email and avatar at the top right.
2. Purpose: show the signed-in account, change the theme, and sign out.
3. Layout: a dropdown menu aligned to the right edge. The account email (<user-email>) in bold, the text "User Account" in grey, a separator, then two items.

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Theme" | Menu item with a palette icon and a right chevron | Submenu (values not captured) | - | - | Opens a theme submenu (inferred: light, dark, system). |
| "Sign out" | Menu item with an exit icon, red text | - | - | - | Ends the session and opens the sign-in page (inferred). |

Backend calls: none at open.

##### Not seen in the capture

- The "Theme" submenu and its values.
- The dark theme.
- The sign-out flow and the sign-in page.
- A link to the profile page. The menu has none. The profile ("Account Settings") is at `/settings`.

### 1.3 Left sidebar (main mode)

1. Route: all routes except `/settings` and `/settings/...`.
2. Purpose: give access to every main page of the current project and show the plan and the credit balance.
3. Layout, from top to bottom:
   1. Group heading "GENERAL" with a collapse button ("<") at the right.
   2. Links of the "General" group.
   3. Group heading "SIMULATION" and its links.
   4. Group heading "OBSERVABILITY" and its links.
   5. Empty space.
   6. Footer links: "Docs", "Settings", "Support".
   7. A separator line.
   8. The plan and credits card: "PayG" badge, credit balance, "Buy Credits".
   9. The "Onboarding" item with a progress badge.

The link of the current page has a grey background and bold text. Each link has a line icon at the left.

#### 1.3.1 Navigation links

> Build the three groups and the 14 links. In the footer, build "Settings" only. "Docs" and "Support" are excluded. The plan and credits card and the "Onboarding" item are excluded.

| Group | Label (verbatim) | Link target (as captured) | Page | Spec area |
|---|---|---|---|---|
| General | "Agents" | `/agents?project=13875` | Agents list | Agents |
| General | "Metrics" | `/metrics?project=13875` | Metrics list | Metrics |
| General | "Labs" | `/labs?project=13875` | Labs list | Labs |
| General | "Rubric" | `/rubric?project=13875` | Rubric | Rubric |
| General | "Assistant" | `/ai-assistant?project=13875` | Assistant | Assistant |
| Simulation | "Personality" | `/personality?project=13875` | Personality list | Personality |
| Simulation | "Evaluators" | `/test-case?project=13875&page=1` | Evaluators list | Evaluators |
| Simulation | "Results" | `/13875/results?page=1&view=results` | Results list | Results |
| Simulation | "Runs Overview" | `/runs-overview?project=13875` | Runs Overview | Runs Overview |
| Simulation | "Monitors" | `/cron-jobs?project=13875&page=1` | Monitors list | Monitors |
| Observability | "Calls" | `/13875/calls?page=1` | Calls list | Calls |
| Observability | "Alerts" | `/13875/alerts/review` | Alerts | Alerts |
| Observability | "Insights" | `/13875/insights` | Insights | Insights |
| Observability | "Overview" | `/13875/dashboards` | Dashboards | Dashboards |
| Footer | "Docs" | `https://docs.example.com/documentation/introduction` | External documentation. An arrow icon marks it as external. | - |
| Footer | "Settings" | `/settings` | Account Settings | Settings |
| Footer | "Support" | Button, no link | Support messenger (1.3.3) | - |

Business rule: every sidebar link carries the current project ID, as `?project=<id>` or as the path prefix `/<id>/` (see 1.7.1).

#### 1.3.2 Collapse button

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| (no label, "<" icon) | Icon button next to "GENERAL" | - | Expanded | - | Collapses the sidebar (inferred). Not clicked in the capture. |

#### 1.3.3 Support messenger — EXCLUDED, DO NOT BUILD

> The owner excluded this part on 2026-10-24. The text below is a record only. Do not build it.

1. Route: any route with the main sidebar. The user clicks "Support" in the sidebar footer.
2. Purpose: open a live chat with the app's support team.
3. Layout: a floating card at the bottom right, about 420 px wide. A "Close" (X) button at the top right, the app's logo, the greeting heading, and a "Start a conversation" button at the bottom. The "Support" item in the sidebar gets a grey highlight while the card is open.

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Hey automaton How can we help?" | Heading (level 1) | The first word after "Hey" is the user name in lower case (inferred: from the email) | - | - | Greeting. |
| "Start a conversation" | Button | - | - | - | Starts a support chat (inferred). Not clicked. |
| "Close" | Icon button (X) | - | - | - | Closes the card. |

Backend calls: none captured on the app's API host. The card looks like a third-party support messenger (inferred).

##### Not seen in the capture

- The chat after "Start a conversation".
- The vendor of the messenger and its script.

#### 1.3.4 Plan badge, credit balance, and "Buy Credits" — EXCLUDED, DO NOT BUILD

> The owner excluded this part on 2026-10-24. The text below is a record only. Do not build it.

The card at the bottom of the sidebar has three parts:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "PayG" | Link badge (light blue) with a ">" chevron | The plan short name. "PayG" means "Pay As You Go". | From the subscription | - | Opens `/settings/org/billing`. |
| "204.84 Credits" | Text. The number is bold. "Credits" is grey. | Decimal with 2 digits | From billing | - | Shows `total_balance` of the billing account (inferred: the value matches `total_balance` 204.84). |
| "Buy Credits" | Button with an up-arrow icon, full card width | - | Enabled | See dialog | Opens a credit purchase flow. With no payment method, it opens the "Add a payment method to continue" dialog. |

"Add a payment method to continue" dialog (`alertdialog`):

| Element | Text (verbatim) |
|---|---|
| Icon | Card icon in a square frame |
| Title | "Add a payment method to continue" |
| Body | "Add a payment method before comparing your first credit purchase with switching plans. You won't be charged during setup." |
| Buttons | "Cancel" (outline), "Add Payment Method" (black) |

Flows:

1. Every page loads the subscription and the billing account (1.6). No call is made at the click.
2. The user clicks "Buy Credits". The dialog opens, because the subscription has `"has_payment_method": false` (inferred).
3. "Cancel" closes the dialog (inferred).
4. "Add Payment Method" starts a payment provider flow (inferred). Not clicked.

Backend calls (global, see 1.6 for the full list):

`GET /subscriptions/subscriptions/` with `organization_id=7868` and `ql={-status}` (inferred: all fields except `status`)

```json
[{"id":3017,"organization":7868,"is_active":true,"is_trial":false,
  "pack":{"id":80,"name":"Pay As You Go","code":"payg","price":"30.00",
          "max_concurrent_runs_limit":10,"max_concurrent_chat_runs_limit":10,
          "data_retention_days":30,"one_time_credits":"300.00", ...},
  "has_payment_method":false,"is_stripe_managed":false,
  "first_paid_seat_plan_offer":{"current_plan":{"code":"payg","max_projects_limit":1, ...},
                                "switch_to_plan":{"code":"startupplan","name":"Startup Plan","price":500.0,"max_projects_limit":5, ...}, ...},
  "expire_at":"2099-01-01T00:00:00Z", ...}]
```

`GET /test_framework/billing/` with `organization_id=7868`

```json
[{"id":7845,"organization":7868,"balance":"0.00","extra_balance":"204.84","total_balance":204.84,
  "concurrency_status":{"total_active_call_runs":0,"total_call_runs_limit":10,
                        "total_active_chat_runs":0,"total_chat_runs_limit":10},
  "type":"self_serve", ...}]
```

`GET /test_framework/billing/7845/credits-usage/`

```json
{"billing_cycle":{"start_date":"2026-10-03T13:31:46.559099Z","end_date":"2026-11-03T13:31:46.559099Z"},
 "credits":{"pack_balance":0.0,"balance":0.0,"extra_balance":204.84,"total_balance":204.84,
            "used_by_simulation":0.0,"used_by_observability":0.0,"total_used_credits":0.0}}
```

Status codes seen: 200 for all three.

Business rules observed:

- The plan badge text comes from the pack code `payg` (inferred). The capture showed no other plan.
- The balance shows 2 decimals.

##### Not seen in the capture

- The credit purchase dialog for an account with a payment method.
- The payment method flow after "Add Payment Method".
- The badge text for other plans (for example "Startup Plan").
- A low-balance or zero-balance warning.

#### 1.3.5 Onboarding checklist — EXCLUDED, DO NOT BUILD

> The owner excluded this part on 2026-10-24. The text below is a record only. Do not build it.

1. Route: any route with the main sidebar. The user clicks "Onboarding" at the bottom of the sidebar.
2. Purpose: offer three ways to configure the first agent, evaluators, and runs.
3. Layout: the sidebar item "Onboarding" has a list icon at the left and a yellow progress ring with a number at the right. The click opens a floating panel to the right of the sidebar footer. The panel has a round "X" close button at its top-right corner and three cards. Each card has an icon, a title, a subtitle, and a down chevron (accordion).

Controls:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Onboarding" + number | Sidebar item with a progress ring badge | Number seen: "2", later "3" | - | - | Opens or closes the panel. |
| (X) | Round icon button | - | - | - | Closes the panel. |
| "Set up via UI" / "Click through forms and screens yourself" | Accordion card button | - | Collapsed | - | Expands the card (inferred). |
| "Set up via Assistant" / "Chat with our agent — it sets everything up for you" | Accordion card button | - | Collapsed | - | Expands the card (inferred). |
| "Set up from Claude Code" / "Install our MCP + skill, then run the onboarding" | Accordion card button | - | Collapsed | - | Expands the card (inferred). "MCP" means Model Context Protocol (MCP). |

Backend calls (global, see 1.6):

`GET /user/organizations/7868/onboarding-tasks/`

```json
[{"id":1,"name":"Create an Agent","description":"Set up your first agent to start collecting interaction data","code":"create_agent","flow_type":null,"completed":true},
 {"id":2,"name":"Generate Evaluators","description":"Define your evaluation criteria to measure call quality and outcomes","code":"generate_scenarios","flow_type":null,"completed":false},
 {"id":3,"name":"Run Scenarios","description":"Trigger scenarios to simulate real-world conversations and gather feedback","code":"run_scenarios","flow_type":null,"completed":true},
 {"id":4,"name":"Review Results","description":"Inspect scenario outcomes to improve accuracy and performance","code":"view_result","flow_type":null,"completed":false}]
```

`GET /user/onboarding/` with `organization=7868`

```json
{"organization":{"id":7868,"flow":"simulation","skip_onboarding":false,"tasks":[ ...same 4 tasks... ]},
 "user":{"status":"completed","path":"ui","variant":"simulation","current_step":"create-agent",
         "progress":{"steps":{}},"can_skip":false,"updated_at":"2026-09-03T13:33:30.426534Z"}}
```

Status codes seen: 200.

Business rules observed:

- The organization has 4 onboarding tasks with the codes `create_agent`, `generate_scenarios`, `run_scenarios`, and `view_result`.
- The badge number equals the count of completed tasks (inferred). At the first page load, 2 tasks were complete and the badge showed "2". After the crawl generated evaluators, the badge showed "3".
- The progress ring fills in proportion to the completed tasks out of 4 (inferred).

##### Not seen in the capture

- The content of each expanded card.
- The task list (names and check marks) in the panel. The panel showed only the three cards.
- The behavior when all tasks are complete, or when `skip_onboarding` is true.

#### 1.3.6 Sidebar in settings mode

On `/settings` and `/settings/...`, the sidebar changes. The Settings section of this spec describes each page.

| Group | Label (verbatim) | Link target |
|---|---|---|
| - | "Home" (back-arrow icon) | `/ai-assistant` |
| - | "Settings" | `/settings` |
| ORGANIZATION | "General" | `/settings/org/general` |
| ORGANIZATION | "API Key" | `/settings/org/api-key` |
| ORGANIZATION | "Members" | `/settings/org/members` |
| ORGANIZATION | "Billing" | `/settings/org/billing` |
| ORGANIZATION | "Telephony" | `/settings/org/telephony` |
| ORGANIZATION | "Agent Config" | `/settings/org/agent-config` |
| ORGANIZATION | "Integrations" | `/settings/org/integrations` |
| PROJECT | "General" | `/settings/project/general` |
| PROJECT | "Notifications" | `/settings/project/integrations` |
| PROJECT | "Provider API Keys" | `/settings/project/provider-api-keys` |
| PROJECT | "Webhook" | `/settings/project/webhook` |
| PROJECT | "Agent Knowledge" | `/settings/project/agent-knowledge` |
| ABOUT | "Third Party Notices" | `/settings/about/third-party-notices` |

Business rules observed:

- The settings sidebar has no plan card, no "Buy Credits", and no "Onboarding" item.
- The PROJECT link label is "Notifications", but its route is `/settings/project/integrations`.
- "Home" opens the Assistant page, not the Agents list.

### 1.4 Background-task panels

Background-task panels float at the bottom right of the page, above the main area. They stay visible when the user goes to another route inside the dashboard. In the capture, the "Metric Generation" panel stayed open from the Metrics page through the Create Metric, Labs, Rubric, and Assistant pages (captures 45 to 70). Several panels stack vertically. The newest panel shows at the bottom (inferred from the order in capture 57).

#### 1.4.1 "Metric Generation" panel

1. Route: any route. The panel opens when the user starts "Generate Metrics" on the Metrics page.
2. Purpose: show the progress and the result of artificial intelligence (AI) metric generation jobs, and let the user open the result.
3. Layout: a card about 320 px wide. Header: sparkle icon, title "Metric Generation", "Minimize panel" (down chevron), "Close panel" (X). Sub-header: "RECENT (1)" at the left and "Clear all" at the right. Then one row for each task: a green check icon, the task text "5 metrics", the time "just now", a "Remove task" (X) button, and a "View" button.

Controls:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Minimize panel" | Icon button (chevron) | - | Expanded | - | Collapses the panel to its header (inferred). |
| "Close panel" | Icon button (X) | - | - | - | Hides the panel. |
| "Clear all" | Text button | - | - | - | Removes all tasks from the list (inferred). |
| "Remove task" | Icon button (X) on a task row | - | - | - | Removes one task from the list (inferred). |
| "View" | Button on a task row | - | Shown when the task is complete | - | Opens the review dialog of the generated metrics (the Metrics section describes it). |

Task row text: "<N> metrics" (for example "5 metrics") and a relative time ("just now").

Flows:

1. On the Metrics page, the user starts "Generate Metrics". The dashboard sends `POST /test_framework/v1/metrics/generate_metrics/` with `{"agent_id":26242,"num_metrics":5}`. The response gives a `progress_id`.
2. The panel opens with one task row (inferred: with a spinner while the job runs).
3. The dashboard polls `GET /test_framework/v1/metrics/generate_metrics_progress/?progress_id=<id>&agent_id=<id>`. The capture shows 4 polls. The status went from `queued` to `completed`.
4. When the status is `completed`, the row shows the green check, "5 metrics", and "View".
5. The user clicks "View". The review dialog opens.
6. After the user saves the metrics, the task leaves the list. The panel shows "No recent generation tasks" (capture 47).

Backend calls (the Metrics section has the full detail):

```json
// GET /test_framework/v1/metrics/generate_metrics_progress/?progress_id=4cf1fe66-...&agent_id=26242
{"agent_id":26242,"status":"queued","current_step":"Generating 5 critical metrics...","metrics":[],"error":null}
// later poll
{"agent_id":26242,"status":"completed","current_step":"Metrics generation completed","metrics":[{"name":"new_appointment_booking","description":"...", ...}, ...],"error":null}
```

Status codes seen: 200.

States:

| State | Text |
|---|---|
| Task list | "RECENT (1)", row "5 metrics", "just now" |
| Empty | Sparkle icon and "No recent generation tasks" |
| Job running | `current_step` "Generating 5 critical metrics..." (inferred: shown in the row while the status is `queued`) |

Business rules observed:

- The task list lives in the browser. The panel did not appear in captures 71 and later (inferred: a full page load clears it).

##### Not seen in the capture

- The running state of a row (spinner, `current_step` text).
- A failed job (`error` not null).
- The minimized state.
- Panels for other job types, for example evaluator generation. Evaluator generation used a sheet on the Evaluators page instead.

#### 1.4.2 "Review <metric>" panel

1. Route: any route. The panel opens after the user creates a metric on the Create Metric page.
2. Purpose: invite the user to review sample labels for the new metric.
3. Layout: a card in the same stack as "Metric Generation". Header: sparkle icon, title "Review <metric name>" (for example "Review zz-spec-test-metric"), "Close panel" (X). Body: one full-width black button "Review sample labels".

Controls:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Close panel" | Icon button (X) | - | - | - | Hides the panel. |
| "Review sample labels" | Button, black, full width | - | Enabled | - | Opens the pattern review page `/create-metric/review/<pattern review id>?project=<id>` (capture 60 shows `/create-metric/review/923?project=13875`). |

Flows:

1. The user creates a metric. The dashboard sends `POST /test_framework/v2/metrics/` (status 201) and `POST /test_framework/v1/metrics/<metric id>/pattern-review/` (status 200). The Metrics section describes these calls.
2. The panel "Review zz-spec-test-metric" opens.
3. While the panel is open, other pages poll `GET /test_framework/v1/metrics/pattern-reviews/923/` with `ql={id,status,stage,round_index,error,metric{id,name},eval_set,optimizer}`. In captures 58, 59, and 62 this call returned 401 `{"detail":"Invalid token"}`.
4. The user clicks "Review sample labels". The pattern review page opens.

States seen on the pattern review page (capture 60): "zz-spec-test-metric is ready." and "There are not enough recent calls or runs to review it against yet. It will start scoring new calls as they come in." The Metrics section covers this page.

##### Not seen in the capture

- The panel body while the pattern review is still running.
- Why the poll returned 401 "Invalid token". The same session got 200 on other calls (inferred: a token problem in the capture tool, not a product rule).

### 1.5 Toasts and global dialogs

Every page has two toast regions:

| Region name (verbatim) | Content seen | Notes |
|---|---|---|
| "Notifications alt+T" | One error toast in captures 28 and 28a | The label says that Alt+T moves the focus to the toasts (inferred). |
| "Notifications (F8)" | Always an empty list | The label says that F8 moves the focus to the toasts (inferred). A second toast system (inferred). |

The one toast seen:

- Position: bottom right.
- Look: red background, white bold text, a white "!" icon at the left, and a round "Close toast" (X) button at the top-left corner.
- Text: the backend error message, verbatim. Example: "At least one configuration method must be provided: contact_number, sip_endpoint, email_id, assistant_provider (with required fields: websocket_url for self_hosted, assistant_id + api_key for vapi/retell/elevenlabs, contact_number for sms), transcript_provider set to livekit (with livekit_api_key and livekit_data), transcript_provider set to pipecat (with pipecat_api_key and pipecat_data), or transcript_provider set to retell (with retell_api_key)."
- The same message showed at the same time in a modal dialog "Something went wrong" with "Try again", "Create anyway", and "Close". The Agents section describes this dialog.

Business rules observed:

- An error toast shows the backend message without a change.
- The toast stays visible until the user closes it, or until a timeout (inferred). The timeout was not measured.

##### Not seen in the capture

- A success toast. No success toast appeared in any accessibility snapshot.
- A toast for the project limit error. The dashboard showed the "Upgrade to Enterprise" dialog instead.
- The toast timeout.

### 1.6 Global data loaded on every page

The first page load of each route sends the calls below, in addition to the page calls. The list comes from the first crawl page `01-agents`. The count column says on how many of the 20 crawled pages the call appeared.

| # | Method and path | Query parameters (`ql` verbatim) | Trimmed response | Pages | Used for |
|---|---|---|---|---|---|
| 1 | GET `/user/invites/my_invites/` | none | `[]` | 20 | Invitations sent to the user (inferred). |
| 2 | GET `/notifications/v1/notifications/unread_count/` | none | `{"unread_count":0}` | 20 | Bell badge. |
| 3 | GET `/user/onboarding/` | `organization=7868` | `{"organization":{"id":7868,"flow":"simulation","skip_onboarding":false,"tasks":[...]},"user":{"status":"completed","path":"ui","variant":"simulation",...}}` | 20 | Onboarding state. |
| 4 | GET `/test_framework/billing/status` | `organization_id=7868` | `{"balance":0.0,"organization":7868,"is_trial":false}` | 18 | Trial and balance flag (inferred). |
| 5 | GET `/user/invites/` | `invite_type=request`, `organization_id=7868`, `status=pending` | `[]` | 20 | Pending join requests for admins (inferred). |
| 6 | GET `/user/v1/projects` | `organization_id=7868`, `ql={id,name,organization{id},members{id,role,is_email_notify_enabled,user{id,name,email}},created_at,updated_at,outbound_timeout,max_call_duration,min_call_duration,use_provider_transcript,notify_daily_report,daily_report_dashboard_ids}` | `[{"id":13875,"name":"Automaton Project",...}]` | 20 | Project switcher. |
| 7 | GET `/subscriptions/subscriptions/` | `organization_id=7868`, `ql={-status}` | `[{"id":3017,"pack":{"code":"payg",...},"has_payment_method":false,...}]` | 20 | Plan badge, plan limits, "Buy Credits" behavior. |
| 8 | GET `/app/v2/product-chat/conversations/` | `limit=50` | `[]` | 20 | Assistant conversation list. |
| 9 | GET `/observability/v1/agent-improvement-sessions/` | `project=13875`, `ql={id,status,project,agent,conversation_id,created_at,metric_delta}` | `[]` | 20 | Agent improvement sessions (inferred: a background-task source). |
| 10 | GET `/user/v2/organizations/` | `page=1`, `page_size=30`, `ql={id,name,team_size,skip_onboarding,created_at,slack_invite_sent,max_concurrent_runs_limit,max_concurrent_chat_runs_limit,is_internal_view_only,members{role,user{id,name,email}},projects{id}}` | `{"count":1,"results":[{"id":7868,"name":"example-org","team_size":"<10","members":[{"user":{"id":9855,"name":"Automaton","email":"<user-email>"},"role":"admin"}],"projects":[{"id":13875}],...}]}` | 20 | Organization switcher, current role. |
| 11 | GET `/test_framework/v2/results/` | `page=1`, `page_size=1`, `project_id=13875`, `ql={id,name,agent,agent_name,agent_version,status,success_rate,run_as_text,run_type,scenarios,total_runs_count,completed_runs_count,created_at}` | `{"next":null,"previous":null,"results":[]}` | 18 | Checks if the project has a result (inferred). |
| 12 | GET `/user/organizations/7868/onboarding-tasks/` | none | `[{"id":1,"code":"create_agent","completed":true}, ...]` | 18 | Onboarding badge. |
| 13 | GET `/user/organizations/7868/` | `ql={id}` | `{"id":7868}` | 20 | Checks access to the organization (inferred). |
| 14 | GET `/app/v2/product-chat/conversations/pending-optimizer-count/` | none | `{"count":0}` | 18 | Count of pending optimizer items for Assistant (inferred). |
| 15 | GET `/observability/v1/first-insights/` | `project=13875` | `[]` | 18 | First Insights banner or prompt (inferred). |
| 16 | GET `/test_framework/billing/` | `organization_id=7868` | `[{"id":7845,"total_balance":204.84,"concurrency_status":{...},...}]` | 19 | Credit balance in the sidebar. |
| 17 | GET `/test_framework/billing/7845/credits-usage/` | none (empty query string) | `{"billing_cycle":{...},"credits":{"total_balance":204.84,...}}` | 19 | Credit balance and usage. |

All 17 calls returned status 200.

Rules:

- The organization ID (7868) comes from `GET /user/v2/organizations/`. The billing account ID (7845) comes from `GET /test_framework/billing/`. So call 17 must wait for call 16 (inferred).
- The project ID comes from the URL (1.7.1).
- Calls 4, 11, 12, and 15 did not run on `/settings` and `/settings/org/billing`. Calls 16 and 17 did not run on `/settings`. These pages use the settings sidebar, which has no credits card and no Onboarding item.
- Collection endpoints differ in shape. Some return a bare array (`/user/v1/projects`). Some return `{"count","next","previous","results"}` (`/user/v2/organizations/`). Some return `{"next","previous","results"}` with no `count` (`/test_framework/v2/results/`, `/notifications/v1/notifications/`).
- The `ql` parameter selects fields. Braces nest sub-fields. A minus sign excludes a field (inferred from `ql={-status}`).

### 1.7 Route table

#### 1.7.1 Project scoping rule

The current project shows in the URL in one of two ways:

| Form | Example | Used by |
|---|---|---|
| Query parameter `project=<projectId>` | `/agents?project=13875` | Agents, Metrics, Create Metric, Labs, Rubric, Personality, Evaluators, Runs Overview, Monitors |
| Path prefix `/<projectId>/` | `/13875/results?page=1&view=results` | Results, Calls, Alerts, Insights, Dashboards |

Rules observed:

1. The sidebar always writes the project ID into the link (1.3.1).
2. Some routes have no project in the URL: `/agents/<agentId>`, `/agents/new`, `/ai-assistant`, `/ai-assistant/<conversationId>`, `/labs/edit/<metricId>`, `/personality?language=en`, and all `/settings/...` routes. These pages still loaded project 13875 data. So the dashboard keeps the current project in client state when the URL has none (inferred).
3. `/ai-assistant?project=13875` became `/ai-assistant` after the load. The page removes the `project` parameter.
4. Breadcrumb links use bare paths without the project, for example "Metrics" → `/metrics`, "Evaluators" → `/test-case`, "Personalities" → `/personality`.
5. Backend calls take the project as `project_id=<id>` (most `test_framework` calls) or `project=<id>` (`observability` calls).

#### 1.7.2 Routes

Placeholders: `<pid>` = project ID, `<id>` = record ID, `<uuid>` = universally unique identifier (UUID) of a conversation or a job.

| Route pattern | Example seen | Page name | Spec area | Reached from |
|---|---|---|---|---|
| `/agents?project=<pid>&page=<n>&pageSize=<n>` | `/agents?project=13875&page=1&pageSize=30` | Agents list | Agents | Sidebar "Agents". The page adds `page=1&pageSize=30`. |
| `/agents/new?project=<pid>` | `/agents/new?project=13875` | Create an Agent | Agents | "Create Agent" button (link `/agents/new`) |
| `/agents/<id>` | `/agents/26242`, `/agents/22757` | Agent detail | Agents | Agent name in the Agents list |
| `/metrics?project=<pid>` | `/metrics?project=13875` | Metrics list | Metrics | Sidebar "Metrics", breadcrumb "Metrics" (`/metrics`) |
| `/metrics/edit/<id>?project=<pid>` | `/metrics/edit/272072?project=13875` | Edit metric | Metrics | Pencil icon in a Metrics row |
| `/create-metric?project=<pid>` | `/create-metric?project=13875` | Create Metric | Metrics | "Create Metric" (link `/create-metric`) |
| `/create-metric/review/<id>?project=<pid>` | `/create-metric/review/923?project=13875` | Review the metric (pattern review) | Metrics | "Review sample labels" in the review panel (1.4.2) |
| `/labs?project=<pid>` | `/labs?project=13875` | Labs list | Labs | Sidebar "Labs" |
| `/labs/edit/<id>` | `/labs/edit/272072` | Lab metric detail | Labs | A metric in the Labs list (inferred) |
| `/rubric?project=<pid>` | `/rubric?project=13875` | Rubric | Rubric | Sidebar "Rubric" |
| `/ai-assistant` | `/ai-assistant` | Assistant home | Assistant | Sidebar "Assistant", settings "Home", "Open in Assistant" |
| `/ai-assistant/<uuid>` | `/ai-assistant/60fcfa97-d396-434a-8048-e7ba80b8da17` | Assistant conversation | Assistant | Chat history, notification `deep_link` |
| `/personality?project=<pid>` | `/personality?project=13875` | Personality list | Personality | Sidebar "Personality" |
| `/personality?language=<code>` | `/personality?language=en` | Personality list, filtered by language | Personality | After a personality save or delete |
| `/personality/create?project=<pid>` | `/personality/create?project=13875` | Create Personality | Personality | "Create Personality" (link `/personality/create`) |
| `/personality/edit/<id>?project=<pid>` | `/personality/edit/9649?project=13875` | Edit Personality | Personality | Edit action in a Personality row (inferred) |
| `/test-case?project=<pid>&page=<n>&pageSize=<n>&folder=<name>` | `/test-case?project=13875&page=1&pageSize=30&folder=Regression+Suite` | Evaluators list (optional folder filter) | Evaluators | Sidebar "Evaluators", folder click |
| `/test-case?reopenSheet=true&progressId=<uuid>` | `/test-case?reopenSheet=true&progressId=09fef315-...` | Evaluators list with the generation sheet open | Evaluators | Notification `deep_link` |
| `/test-case/create?folder=<name>&project=<pid>` | `/test-case/create?folder=zz-spec-test-folder&project=13875` | Create Evaluator | Evaluators | Create action on the Evaluators page (inferred) |
| `/test-case/<id>?project=<pid>` | `/test-case/401833?project=13875` | Evaluator detail | Evaluators | Evaluator row (inferred) |
| `/<pid>/results?page=<n>&view=results\|runs&pageSize=<n>` | `/13875/results?page=1&view=runs&pageSize=30` | Results list (tab `results` or `runs`) | Results | Sidebar "Results" |
| `/runs-overview?project=<pid>&from=<time>&to=<time>[&view=new]` | `/runs-overview?project=13875&from=now-6h&to=now` | Runs Overview | Runs Overview | Sidebar "Runs Overview". The page adds `from=now-6h&to=now`. |
| `/cron-jobs?project=<pid>&page=<n>` | `/cron-jobs?project=13875&page=1` | Monitors list | Monitors | Sidebar "Monitors" |
| `/<pid>/calls?page=<n>&pageSize=<n>` | `/13875/calls?page=1&pageSize=30` | Calls list | Calls | Sidebar "Calls". The page adds `pageSize=30`. |
| `/<pid>/alerts/review?hours=<n>` | `/13875/alerts/review?hours=24`, `?hours=168` | Alerts | Alerts | Sidebar "Alerts". The page adds `hours=24`. The "7d" filter sets `hours=168`. |
| `/<pid>/insights` | `/13875/insights` | Insights | Insights | Sidebar "Insights" |
| `/<pid>/dashboards` | `/13875/dashboards` | Dashboards (redirect) | Dashboards | Sidebar "Overview" |
| `/<pid>/dashboards/<id>` | `/13875/dashboards/13682` | Dashboard | Dashboards | Redirect from `/<pid>/dashboards` |
| `/settings` | `/settings` | Account Settings | Settings | Sidebar "Settings" |
| `/settings/org/general` | same | Organization general | Settings | Settings sidebar |
| `/settings/org/api-key` | same | API Key | Settings | Settings sidebar |
| `/settings/org/members` | same | Members | Settings | Settings sidebar |
| `/settings/org/billing?page=<n>&pageSize=<n>` | `/settings/org/billing?page=1&pageSize=30` | Billing | Billing | Settings sidebar, "PayG" badge |
| `/settings/org/telephony` | same | Telephony | Settings | Settings sidebar |
| `/settings/org/agent-config` | same | Agent Config | Settings | Settings sidebar |
| `/settings/org/integrations` | same | Organization integrations | Settings | Settings sidebar |
| `/settings/project/general` | same | Project general | Settings | Settings sidebar |
| `/settings/project/integrations` | same | Notifications (project integrations) | Settings | Settings sidebar "Notifications" |
| `/settings/project/integrations/slack` | same | Slack integration | Settings | "Configure Slack Integration" |
| `/settings/project/integrations/discord` | same | Discord integration | Settings | "Configure Discord Integration" |
| `/settings/project/integrations/teams` | same | Microsoft Teams integration | Settings | "Configure Teams Integration" |
| `/settings/project/provider-api-keys` | same | Provider API Keys | Settings | Settings sidebar |
| `/settings/project/webhook` | same | Webhook | Settings | Settings sidebar |
| `/settings/project/agent-knowledge` | same | Agent Knowledge | Settings | Settings sidebar |
| `/settings/about/third-party-notices` | same | Third Party Notices | Settings | Settings sidebar |

Note: the section numbers of the spec areas are set in the table of contents. This table names each area only.

#### 1.7.3 Redirects and default query parameters

| Requested | Final URL | Rule |
|---|---|---|
| `/ai-assistant?project=13875` | `/ai-assistant` | The page removes `project`. |
| `/13875/results?page=1&view=results` | `/13875/results?page=1&view=results&pageSize=30` | The page adds `pageSize=30`. |
| `/13875/calls?page=1` | `/13875/calls?page=1&pageSize=30` | The page adds `pageSize=30`. |
| `/13875/alerts/review` | `/13875/alerts/review?hours=24` | The default time window is 24 hours. |
| `/13875/dashboards` | `/13875/dashboards/13682` | The page opens the first dashboard (inferred: the first or the default one). |
| `/runs-overview?project=13875` | `/runs-overview?project=13875&from=now-6h&to=now` | The default time range is the last 6 hours. |
| `/settings/org/billing` | `/settings/org/billing?page=1&pageSize=30` | The page adds pagination for its table. |
| `/agents?project=13875` | `/agents?project=13875&page=1&pageSize=30` | The page adds pagination (seen in all Agents captures). |

#### 1.7.4 External links seen

| Link | Where |
|---|---|
| `https://docs.example.com/documentation/introduction` | Sidebar "Docs" |
| `https://docs.example.com/documentation/key-concepts/...` and `https://docs.example.com/documentation/integrations/...` | "Learn more" links on pages, guide panels (each page section lists its own) |
| `https://cal.com/kabrasidhant/30min` | Billing page "Increase Concurrency" and "Speak to team" |
| `https://slack.com/oauth/v2/authorize?...` | Slack integration page |
| Signed file URL on an Amazon Simple Storage Service (S3) bucket | Knowledge base file download on the Agent detail page. It carries a temporary signature. Do not hard-code it. |

#### Not seen in the capture

- The root route `/` and the sign-in route.
- A 404 page for an unknown route.
- A route for one Result or one Run (the project had no results).
- A route for one Call (the project had no call logs).
- A route for one Monitor or one Alert detail.
- The behavior when the `project` value in the URL is a project the user cannot access.
- How the dashboard stores the current project when the URL has none (local storage, cookie, or server state).

## 2. Agents

An Agent is the configuration of the voice or chat bot that the user wants to test. It holds the bot description, the platform the bot runs on (the Provider), and the ways the app reaches the bot (the Connections). Evaluators, Runs, and Results all point to one Agent.

Terms used in this section:

| Term | Meaning |
|---|---|
| Provider | The platform where the user built the bot. The dashboard heading is "Where did you build your agent?". Stored in `provider.type`. |
| Connection | One channel that the app uses to reach the bot. The dashboard groups Connections under "Voice" and "Chat". |
| Settings panel | The collapsible panel that opens below the Connection grid when the user selects a Connection, for example "Telephony Settings". |
| Integration Settings | A collapsible panel with Provider-specific credentials and switches. |
| Connection check | The backend call `POST /test_framework/v2/aiagents/connections/check/` that validates the Connections. |

All backend calls go to the host `https://backend.example.com`. The dashboard sends a bearer token (`<redacted-jwt>`). Every path ends with a slash, except `/test_framework/v1/tools`.

---

### 2.1 Agents list

#### Route and access

- Route: `/agents?project=<project_id>&page=<n>&pageSize=<n>`. Example: `/agents?project=13875&page=1&pageSize=30`.
- Access: the sidebar link "Agents" in the "General" group. The link target is `/agents?project=<project_id>`.

#### Purpose

The page lists all Agents of the current project. The user opens, creates, imports, duplicates, and deletes Agents here.

#### Layout

1. Page title "Agents" and an intro paragraph with a "Learn more" link.
2. Toolbar row. The left side has the search box and the "Search" button. The right side has "Import from provider" (outline button) and "Create Agent" (dark primary button with a plus icon).
3. Table with 6 columns.
4. Pagination row below the table. The left side has 4 arrow buttons and page number buttons. The right side has "Rows per page:" and the row counter.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Intro text | Paragraph | "Agents are the configurations you set up in the app, describing the agent you want to test along with how it connects, so you can generate evaluators and run simulations against it." | – | – | Static text. |
| "Learn more" | Link | `https://docs.example.com/documentation/key-concepts/agents/overview` | – | – | Opens the documentation page. |
| "Search agents..." | Text box | Free text | Empty | Not seen | The user types a name or an ID (inferred from the public API `q` parameter). |
| "Search" | Button | – | – | – | Runs the search (inferred). The capture did not record a search call. |
| "Import from provider" | Button with cloud icon | – | – | – | Opens the "Import agents from your provider" dialog (section 2.4). |
| "Create Agent" | Link styled as button | Target `/agents/new` | – | – | Opens the Create Agent wizard (section 2.5). |
| "ID" column | Text plus icon button | Format `#<id>`, for example "#22757" | – | – | The icon button copies the ID (inferred from the copy icon). |
| "Name" column | Link | Agent name | – | – | Opens `/agents/<id>`. |
| "Provider" column | Logo plus text | Seen values: "VAPI", "Other (Webhook)" | – | – | "Other (Webhook)" shows for `provider.type` = `custom`. |
| "Connections" column | Chips with icons | Seen values: "Telephony (Inbound)", "VAPI Chat", "Email" | – | – | One chip for each configured Connection. |
| "Language" column | Text | Seen value: "English" | – | – | Language display name. |
| "Actions" column | 2 icon buttons | Copy icon (outline), trash icon (red fill) | – | – | Copy icon opens "Duplicate Agent". Trash icon opens "Delete Agent". |
| "Go to first page", "Go to previous page", "Go to next page", "Go to last page" | Icon buttons | – | Disabled when there is 1 page | – | Page navigation. |
| "Go to page 1" | Button | Page number | Current page is highlighted (dark fill) | – | Goes to that page. |
| "Rows per page:" | Combo box | Seen value: "30" | "30" | – | Changes the page size. The other options are not in the capture. |
| Row counter | Paragraph | "1-1 of 1 rows", "1-2 of 2 rows" | – | – | Shows the visible range and the total. |

#### Flows

1. The page loads. The dashboard calls `GET /test_framework/v2/aiagents/` with the list `ql` value (see Backend calls).
2. The dashboard also calls `GET /test_framework/v2/results/?page=1&page_size=1&...`. This call appears on every page of the capture (inferred: a global check, not an Agents feature).
3. The user selects a name link. The dashboard opens `/agents/<id>` (section 2.8).
4. The user deletes an Agent through the Delete Agent dialog. The dashboard calls `DELETE` and then calls the list `GET` again (2 times in the capture).

#### Backend calls

`GET /test_framework/v2/aiagents/` → 200

- Query parameters: `project_id=13875`, `exclude_kb_files=true`, `page=1`, `page_size=30`.
- `ql` value: `{id,name,language,description,email_id,telephony{phone_number,sip_uri,inbound},provider{type,chat_provider,chat_agent_details{type,config},credentials{api_key_configured,config}}}`
- The public API also documents `q` (search by name, a number also matches the ID) and `organization_id`.

```json
{
  "count": 1, "next": null, "previous": null,
  "results": [{
    "id": 22757,
    "name": "Voice Regression — E2E Deploy Agent Sq",
    "description": "Voice regression target managed by tests/voice-regression/provision.mjs.",
    "language": "en",
    "telephony": {"inbound": true, "phone_number": "+17027608786", "sip_uri": null},
    "provider": {
      "type": "vapi", "agent_id": "0550eaaa-...",
      "credentials": {"api_key_configured": true},
      "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false,
      "redact_fields": [], "chat_provider": "vapi", "chat_agent_details": {"type": "vapi"}
    },
    "email_id": null
  }]
}
```

#### States

- One page only: all 4 arrow buttons are disabled.
- Empty list: not seen.
- Loading state: not seen.

#### Business rules

- The list hides knowledge base files (`exclude_kb_files=true`).
- The Connections chips come from `telephony`, `provider.chat_provider`, and `email_id` (inferred from the 2 rows seen).

#### Not seen in the capture

- The search request and its result.
- The copy-ID feedback (toast or tooltip).
- The "Rows per page:" options.
- An empty list state and a loading state.
- Column sort.

---

### 2.2 Duplicate Agent dialog

#### Route and access

- Route: stays on `/agents?project=...`.
- Access: the copy icon in the "Actions" column of a row.

#### Purpose

The dialog asks the user to confirm a copy of the Agent.

#### Layout

1. Title "Duplicate Agent".
2. Text "Are you sure you want to duplicate this agent?".
3. Buttons "Cancel" and "Duplicate". A "Close" (X) button is at the top right.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Cancel" | Button | – | – | – | Closes the dialog. No call. |
| "Duplicate" | Button | – | Enabled | – | Copies the Agent (inferred). |
| "Close" | Icon button | – | – | – | Closes the dialog. |

#### Backend calls

The capture did not click "Duplicate". The public API documents this call (inferred to be the dashboard call):

- `POST /test_framework/v2/aiagents/{id}/duplicate/`
- Body: `{"copy_scenarios": true}`. The `copy_scenarios` field is optional.
- Response 201: the new Agent in the Agent model (section 2.12).

#### Not seen in the capture

- The duplicate request, the new row, and any toast.
- The name of the copy.

---

### 2.3 Delete Agent dialog

#### Route and access

- Route: stays on `/agents?project=...`.
- Access: the red trash icon in the "Actions" column of a row.

#### Purpose

The dialog deletes the Agent permanently. The user must type the Agent name to confirm.

#### Layout

1. Title "Delete Agent" and the warning text.
2. A bordered box with one checkbox.
3. The confirmation prompt and a text box.
4. Buttons "Cancel" and "Delete" (red).

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Warning | Paragraph | "This action cannot be undone. This will permanently delete the agent." | – | – | Static text. |
| "Also delete related call logs, scenario evaluators, results, and runs, and hide associated metric evaluations" | Checkbox | Checked, unchecked | Unchecked | – | Sets the `delete_related` query parameter. |
| "Please type zz-spec-test-agent to confirm." | Paragraph | The Agent name is in bold | – | – | The text uses the name of the selected Agent. |
| "Type here to confirm" | Text box | Free text | Empty | The text must equal the Agent name (inferred) | Enables "Delete" when the text matches (inferred). |
| "Cancel" | Button | – | – | – | Closes the dialog. |
| "Delete" | Button, red | – | Disabled | Disabled until the name matches | Sends the delete call. |

#### Flows

1. The user opens the dialog. "Delete" is disabled.
2. The user types the exact Agent name. "Delete" becomes enabled (inferred).
3. Optional: the user selects the checkbox.
4. The user selects "Delete". The dashboard calls `DELETE /test_framework/v2/aiagents/<id>/?delete_related=true`.
5. The dashboard closes the dialog and calls the list `GET` again.

#### Backend calls

`DELETE /test_framework/v2/aiagents/26242/?delete_related=true` → 204, empty body.

The cleanup used `delete_related=true`. The capture does not show the checkbox state at that moment. The checkbox was probably selected (inferred). The public API says: "If true (default), delete associated call logs, scenario evaluators, results and runs. If false, detach scenario evaluators and leave call logs, metric evaluations, results and runs as-is."

#### Not seen in the capture

- The value of `delete_related` when the checkbox is clear. It may be `false` (inferred).
- A success toast or an error state.

---

### 2.4 Import agents from your provider dialog

#### Route and access

- Route: stays on `/agents?project=...`.
- Access: the "Import from provider" button on the Agents list.

#### Purpose

The dialog lists the assistants on a cloud Provider account and imports the selected ones as Agents. It uses the Provider key that the project saved under Provider API Keys.

#### Layout

1. Title with a cloud icon: "Import agents from your provider". A close (X) button is at the right.
2. A segmented tab row with 5 Providers. Each tab has a logo, a name, and a small grey dot.
3. A search row: "Search assistants..." text box, "Select all", "Clear".
4. A list area. With no key, it shows a key icon, a message, and the "Add VAPI key" button.
5. A bordered row with the auto-fetch switch.
6. Footer buttons "Cancel" and "Import agents".

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Provider tabs | Toggle buttons | "VAPI", "Retell", "ElevenLabs", "Synthflow", "Bland AI" | "VAPI" pressed | – | Loads the assistants of that Provider. The grey dot probably shows the key status (inferred). |
| "Search assistants..." | Text box | Free text | Empty | – | Disabled when no key is saved. Filters the list (inferred). |
| "Select all" | Button | – | Disabled when no key | – | Selects all listed assistants (inferred). |
| "Clear" | Button | – | Disabled when no key | – | Clears the selection (inferred). |
| "Add VAPI key" | Link styled as button | Target `/settings/project/provider-api-keys` | – | – | Opens the Provider API Keys settings page. The label changes with the tab (inferred). |
| "Auto-fetch production calls for imported agents" | Switch | On, off | On | – | Help text: "New calls appear under Calls automatically." Sets auto-import of calls on the imported Agents (inferred). |
| "Cancel" | Button | – | – | – | Closes the dialog. |
| "Import agents" | Button | – | Disabled | Disabled until at least one assistant is selected (inferred) | Imports the selected assistants (inferred). |

#### Flows

1. The user opens the dialog. The dashboard calls `GET /user/v1/projects/<project_id>/`. The response has the key flags, for example `vapi_api_key_configured`.
2. The dashboard calls `GET /test_framework/v2/aiagents/provider-assistants/?project_id=13875&provider=vapi`.
3. If no key is saved, the call returns 400 with code `provider_key_missing`. The dialog shows the empty state.
4. The user selects another tab. The dashboard calls the same path with that `provider` value (inferred).
5. The user selects assistants and "Import agents". The capture did not reach this step.

#### Backend calls

`GET /user/v1/projects/13875/` → 200. Trimmed response, key flags only:

```json
{
  "id": 13875, "name": "Automaton Project",
  "vapi_api_key_configured": false, "vapi_public_key_configured": false,
  "retell_api_key_configured": false, "syntflow_api_key_configured": false,
  "elevenlabs_api_key_configured": false, "bland_api_key_configured": false,
  "livekit_api_key_configured": false, "pipecat_api_key_configured": false
}
```

Note: the field name `syntflow_api_key_configured` is spelled this way in the response.

`GET /test_framework/v2/aiagents/provider-assistants/?project_id=13875&provider=vapi` → 400

```json
{"detail": "No saved vapi API key for this project. Add one under Provider API Keys.", "code": "provider_key_missing"}
```

The public API documents the 200 response (not seen in the capture):

```json
{
  "provider": "vapi", "count": 1,
  "assistants": [{
    "id": "asst_...", "name": "...", "kind": "...", "channel": null, "updated_at": null,
    "already_imported": false, "imported_agent_id": null, "imported_agent_name": null
  }]
}
```

The public API documents the import call (inferred to be the dashboard call): `POST /test_framework/v2/aiagents/` with `provider.configure_from_provider: true` and `provider.agent_id`. If the call omits `provider.credentials.api_key`, the backend uses the saved project key. The response is 202 with `{"id": ..., "progress_id": "..."}`. The client polls `GET /test_framework/v2/aiagents/{id}/auto-fetch-progress/?progress_id=...`. The status is `in_progress`, `completed`, or `failed`. An assistant that the project already imported returns 409.

#### States

- No key: "No VAPI API key saved for this project" and "Save the key once under Provider API Keys and every assistant on the account can be imported from here."
- Disabled: the search box, "Select all", "Clear", and "Import agents".

#### Business rules

- `provider` accepts only `vapi`, `retell`, `elevenlabs`, `synthflow`, and `bland`.

#### Not seen in the capture

- The assistant list with a valid key, the "already imported" mark, and the selection.
- The import request, the progress display, and the result.
- The meaning of the grey dot.

---

### 2.5 Create Agent wizard, step 1: Connection

#### Route and access

- Route: `/agents/new`. The dashboard may add `?project=<project_id>` (seen: `/agents/new?project=13875`).
- Access: the "Create Agent" button on the Agents list.

#### Purpose

Step 1 records the Provider, the Connections, and the Integration Settings. Step 2 records the name, the language, and the description.

#### Layout

The wizard is one centered card on a grey page.

1. Card header: "Create an Agent", the subtitle "Create an agent to start testing your voice assistant", and a "?" icon button "Open guide" at the right.
2. Stepper: "1 Connection" and "2 Basic Info" with a line between them. A finished step shows a green check. The stepper is hidden when the import panel or the code-based panel shows.
3. "Where did you build your agent?" and the subtitle "Select the platform you use to build your conversational agent".
4. Provider grid. Each tile has an icon and a label. The selected tile has a dark border and a check badge at the top right. The collapsed grid shows 7 tiles in 1 row and "More options". The expanded grid shows 18 tiles in rows of 7 and "Less".
5. "For more info, go to this link". The link target changes with the Provider.
6. One of 3 Provider panels (see "Provider modes").
7. Footer: a full-width dark "Next" button. The import panel has "Configure Agent" in its place.

#### Provider grid

The grid has 18 Providers in this order:

| # | Tile label | Accessible name | `provider.type` | Mode in step 1 | "this link" target |
|---|---|---|---|---|---|
| 1 | Other | "Other" | `custom` (seen) | Manual | `.../integrations/custom-integration` |
| 2 | LiveKit | "LiveKit" | `livekit` (inferred) | Code-based | `.../integrations/livekit/testing` |
| 3 | Pipecat | "Pipecat" | `pipecat` (inferred) | Code-based | `.../integrations/pipecat/automated` |
| 4 | ElevenLabs | "ElevenLabs" | `elevenlabs` (inferred) | Import | `.../integrations/elevenlabs/testing` |
| 5 | Retell | "Retell" | `retell` (inferred) | Import | `.../integrations/retell/testing` |
| 6 | VAPI | "VAPI" | `vapi` (seen on agent 22757) | Import | `.../integrations/vapi/testing` |
| 7 | Webex | "Webex" | `cisco` (inferred) | Manual | Not captured |
| 8 | Bland AI | "Bland AI" | `bland` (inferred) | Import | `.../integrations/bland` |
| 9 | Synthflow | "Synthflow" | `synthflow` (inferred) | Import | No link shown |
| 10 | Kore.ai | "Kore.ai" | `koreai` (inferred) | Manual | Not captured |
| 11 | Genesys | "Genesys" | `genesys` (inferred) | Manual | Not captured |
| 12 | Gemini CX | "Gemini Enterprise CX" | `gemini_cx` (inferred) | Manual | Not captured |
| 13 | Amazon | "Amazon" | `amazon_connect` (inferred) | Manual | Not captured |
| 14 | Agentforce | "Agentforce" | `agentforce` (inferred) | Import | No link shown |
| 15 | Sierra | "Sierra" | `custom` with chat type `sierra` (inferred) | Manual | Not captured |
| 16 | Telnyx | "Telnyx" | `telnyx` (inferred) | Manual | Not captured |
| 17 | AssemblyAI | "AssemblyAI" | `assemblyai` (inferred) | Manual | Not captured |
| 18 | Agora | "Agora" | `agora` (inferred) | Manual | Not captured |

The link prefix is `https://docs.example.com/documentation`. "Other" is the default selection.

The `/enums/` call returns `AssistantProviderChoices`: `vapi`, `retell`, `elevenlabs`, `vocera`, `sms`, `whatsapp`, `self_hosted`, `agentforce`, `cisco`, `bland`, `livekit`, `pipecat`, `synthflow`, `agora`, `koreai`, `genesys`, `amazon_connect`, `telnyx`, `sierra`, `gemini_cx`, `assemblyai`.

#### Provider modes

The selected Provider decides which panel shows below the grid.

**Mode A: manual.** The panel shows the Connection grid ("Connections", "Tell us how to connect to your agent", an info icon). A Settings panel opens for each selected Connection. "Integration Settings" follows. The footer button is "Next". Providers: Other, Webex, Kore.ai, Genesys, Gemini CX, Amazon, Sierra, Telnyx, AssemblyAI, Agora.

**Mode B: import.** The panel title is "Import directly from <Provider>" with a cloud icon. The link "Set up manually instead" is at the right. The footer button is "Configure Agent". It is disabled until the required fields have values (inferred). Providers: ElevenLabs, Retell, VAPI, Bland AI, Synthflow, Agentforce.

**Mode C: code-based.** The panel title is "<Provider> is a code-based agent" with a code icon. Providers: LiveKit, Pipecat.

##### Mode B fields by Provider

| Provider | Field label (verbatim) | Control | Placeholder | Extra |
|---|---|---|---|---|
| ElevenLabs | "Assistant ID*" | Text box | "ElevenLabs agent ID" | – |
| ElevenLabs | "ElevenLabs API key*" | Password box with eye button | – | – |
| ElevenLabs | "API Region" | Combo box | – | Default "US (default)" |
| ElevenLabs | "Auto-fetch Production Calls" | Switch, on | – | "Automatically fetch calls from ElevenLabs API every 30 seconds for production monitoring." |
| Retell | "Assistant ID*" | Text box | "agent_xxx" | – |
| Retell | "Retell API key*" | Password box with eye button | – | – |
| Retell | "Auto-fetch Production Calls" | Switch, on | – | "Automatically fetch calls from Retell API every 30 seconds for production monitoring." |
| VAPI | "Assistant ID*" | Text box | "assistant id (e.g. 0f61aff1-…)" | – |
| VAPI | "VAPI API key*" | Password box with eye button | – | – |
| VAPI | "VAPI Public Key (optional)" | Password box with eye button | – | "Required for WebRTC testing. Not needed for phone or chat testing." |
| VAPI | "Auto-fetch Production Calls" | Switch, on | – | "Automatically fetch calls from VAPI API every 30 seconds for production monitoring." |
| Bland AI | "Assistant or Pathway ID*" | Text box | "Bland persona or pathway ID" | – |
| Bland AI | "Bland AI API key*" | Password box with eye button | – | – |
| Bland AI | "Auto-fetch Production Calls" | Switch, on | – | "Automatically fetch calls from Bland AI API every 30 seconds for production monitoring." |
| Synthflow | "Assistant ID*" | Text box | "Synthflow agent ID" | – |
| Synthflow | "Synthflow API key*" | Password box with eye button | – | No auto-fetch switch |
| Agentforce | "Agent ID*" | Text box | "Agentforce agent ID (0Xx…)" | – |
| Agentforce | "Agentforce Client Secret*" | Password box with eye button | – | – |
| Agentforce | "Agentforce Client ID*" | Text box | "Enter Agentforce Client ID" | – |
| Agentforce | "Agentforce Domain*" | Text box | "https://example.my.salesforce.com" | – |
| Agentforce | "Auto-fetch Production Calls" | Switch, on | – | "Automatically fetch calls from Agentforce API every 30 seconds for production monitoring." |

"Configure Agent" probably sends `POST /test_framework/v2/aiagents/` with `provider.configure_from_provider: true` (inferred from the public API). The capture did not send it.

##### Mode C panel (LiveKit and Pipecat)

| Element | Text (verbatim) | Behavior |
|---|---|---|
| Title | "Pipecat is a code-based agent" / "LiveKit is a code-based agent" | – |
| Link button (Pipecat only) | "Continue without connecting code" | Opens the manual mode (inferred). Not seen for LiveKit because LiveKit was still loading. |
| Paragraph | "Your agent's prompt, name, language and the channels it answers on all live in its code — Pipecat has no dashboard for us to import from. Connect your organization's GitHub or Bitbucket and the app reads what it needs to test and evaluate the agent." | The name changes with the Provider. |
| Group "Where is your agent's code?" | 2 toggle cards: "GitHub Not connected" (pressed by default), "Bitbucket Not connected" | Selects the code host. |
| "What you need to connect" | List: "An organization admin. You have to be an admin of this organization." and "GitHub app-install rights. On the organization that owns the repositories. Without them, GitHub asks an owner to approve instead." | Check-mark list. |
| Note | "GitHub also asks which repositories the app can see — you choose there." | – |
| Loading text (LiveKit capture) | "Checking your GitHub connection…" | Shows while the dashboard checks the GitHub connection. |
| Button | "Connect GitHub" | Starts the GitHub app install (inferred). |

#### Provider x Connection matrix

The table shows the Connection buttons in Mode A. "Default" means the Connection is pressed when the Provider is selected. A dash means that the button is absent.

| Provider | Voice: WebRTC | Voice: Telephony | Voice: SIP | Voice: Websocket | Chat: SMS | Chat: WhatsApp | Chat: Websocket | Chat: Email | Chat: Provider chat | Integration Settings panel |
|---|---|---|---|---|---|---|---|---|---|---|
| Other | – | Yes | Yes | Yes | Yes | Yes | Yes | Yes | – | Yes |
| Webex | – | Default | – | – | – | – | – | – | – | Yes |
| Kore.ai | – | Yes | Yes | – | Yes | Yes | – | Yes | "Kore.ai" | Not shown |
| Genesys | – | Default | – | – | – | – | – | Yes | – | Yes |
| Gemini CX | – | Default | – | – | – | – | – | – | – | Yes |
| Amazon | – | Yes | Yes | – | – | – | – | Yes | "Amazon Connect" | Not shown |
| Sierra | – | – | – | – | – | – | – | Yes | "Sierra" (default) | "Sierra Settings" instead |
| Telnyx | – | Yes | Yes | – | Yes | Yes | Yes | Yes | – | Yes |
| AssemblyAI | – | Default | – | – | – | – | – | – | – | Yes |
| Agora | Yes | – | – | – | – | – | – | Yes | – | Yes |
| VAPI (Agent Settings page, agent 22757) | Yes | Yes (selected) | Yes | – | Yes | Yes | – | Yes | "VAPI" (selected) | Yes |

Notes:

- Webex, Gemini CX, and AssemblyAI have no "Chat" group. Sierra has no "Voice" group.
- The ElevenLabs, Retell, Bland AI, Synthflow, Agentforce, LiveKit, and Pipecat Connection grids are not in the capture. They show after "Set up manually instead" or "Continue without connecting code" (inferred).

#### Connection types and the fields they reveal

These fields come from the Other Provider. Each Settings panel has an X button that removes the Connection and a chevron that collapses the panel (seen in the screenshots).

| Connection (group) | Settings panel title | Field label (verbatim) | Control | Placeholder or default | Help text (verbatim) | Payload field |
|---|---|---|---|---|---|---|
| Telephony (Voice) | "Telephony Settings" | "Phone Number" | Country button ("US" flag) and text box | "+1" | "Phone number your AI Agent receives calls on or makes calls from" | `telephony.phone_number` |
| Telephony (Voice) | "Telephony Settings" | "Inbound" | Switch | On | "If true, our agent will call you on above number." | `telephony.inbound` |
| SIP (Voice) | "SIP Configuration" | "SIP Endpoint" | Text box | "sip:user@example.com" | – | `telephony.sip_uri` (inferred) |
| SIP (Voice) | "SIP Configuration" | "SIP Originating Region" | Combo box | "Provider default" | – | `telephony.sip_originating_region`, API values `us-east`, `us-west`, `null` (inferred) |
| SIP (Voice) | "SIP Configuration" | "Username" under "SIP Authentication (Digest Auth)" | Text box | "SIP username" | – | `telephony.sip_auth.username` (inferred) |
| SIP (Voice) | "SIP Configuration" | "Password" | Password box with eye button | "SIP password" | – | `telephony.sip_auth.password` (inferred) |
| Websocket (Voice) | "WebSocket Configuration" | "WebSocket URL" | Text box | "wss://your-host/voice" | "Raw PCM 16kHz 16-bit mono WebSocket endpoint the app dials to run the call." | `telephony.websocket_url` (seen) |
| Websocket (Voice) | "WebSocket Configuration" | "Username" under "Basic Auth (Optional)" | Text box | "Basic auth username" | – | `telephony.websocket_auth.username` (seen) |
| Websocket (Voice) | "WebSocket Configuration" | "Password" | Password box with eye button | "Basic auth password" | – | `telephony.websocket_auth.password` (seen) |
| SMS (Chat) | "SMS Settings" | "Phone Number" | Country button and text box | "+1" | "Phone number your AI Agent receives calls on or makes calls from" | Not seen. Probably `chat_agent_details.type` = `sms` plus the number (inferred). |
| WhatsApp (Chat) | "WhatsApp Settings" | "Phone Number" | Country button and text box | "+1" | Same text as the "SMS" panel | Not seen. Probably `chat_agent_details.type` = `whatsapp` (inferred). |
| Websocket (Chat) | "Custom Chatbot Settings" | "WebSocket URL" | Text box | "wss://your-chatbot-endpoint.com" | "WebSocket endpoint for your custom chatbot." and the link "View chat testing docs" | `provider.chat_agent_details.config.url` (seen as an empty template) |
| Websocket (Chat) | "Custom Chatbot Settings" | "Websocket Secret" | Password box "Enter your websocket secret" with eye button | – | "This Secret will be sent in the X-VOCERA-SECRET header" and the link "Learn more" | `provider.chat_agent_details.config.websocket_secret` (seen as an empty template) |
| Websocket (Chat) | "Custom Chatbot Settings" | "WebSocket Headers" | Code editor (JSON) | – | "Optional headers sent on the connection. X-VOCERA-* are reserved." | `provider.chat_agent_details.config.headers` (inferred from the public API) |
| Email (Chat) | "Email Settings" | "Agent Email Address" | Text box | "agent@yourcompany.com" | "Email address your AI agent receives messages at" | `email_id` (seen) |

The "Learn more" link of the chat Websocket points to `https://docs.example.com/documentation/integrations/chat-testing#custom-websocket`.

Provider-specific Connections:

| Connection | Provider | Settings panel | Content (verbatim) |
|---|---|---|---|
| "VAPI" (Chat) | VAPI | "VAPI Chat Settings" | "VAPI Chat is configured automatically using your voice agent settings." |
| "Sierra" (Chat) | Sierra | "Sierra Settings" | "Agent Token*" (placeholder "Enter your Sierra agent token", help "Token identifying your Sierra agent. Found in your Sierra agent's API settings."), "Host" (placeholder "api.sierra.chat", help "Optional. Defaults to api.sierra.chat."), "API Key" (placeholder "Enter your Sierra API key", help "Optional bearer API key. Only needed if your Sierra organization enforces Headless API authentication.") |
| "Kore.ai" (Chat) | Kore.ai | Not captured | – |
| "Amazon Connect" (Chat) | Amazon | Not captured | – |
| "WebRTC" (Voice) | VAPI, Agora | Not captured as a separate panel | – |

#### Integration Settings by Provider

"Redact Sensitive Data" is a switch in most panels. Its help text is "Strip selected details from transcripts and recordings. 0.1 credits per minute." It is off by default. It maps to `provider.redact_fields` (inferred).

| Provider | Fields and switches (verbatim labels) | Notes |
|---|---|---|
| Other | "External Assistant ID" (placeholder "Enter External Assistant ID", help "Your external assistant or agent identifier. Used to link the app's runs to calls on your system."), "Send Post Conversation Metadata" switch, off (help "Your agent posts transcript, tool calls and call ID to the app after each call."), "Redact Sensitive Data" | Panel is expanded by default. The switch maps to `provider.send_post_conversation_metadata` (seen in the response). The ID maps to `provider.agent_id` (inferred). |
| Webex | Webex logo, an ordered list "1 Create the agent.", "2 Creating it takes you to Webex to sign in with an admin account.", "3 The app then matches runs to your Webex interactions by phone number.", "Auto-fetch Production Calls" switch, off (help "Pull calls from Webex every 30 seconds."), "Redact Sensitive Data" | After create, the dashboard sends the user to Webex to sign in (stated, not seen). |
| Genesys | "Genesys Client Secret*" (password box with eye button), "Genesys Client ID *", "Genesys Region *", "Redact Sensitive Data" | – |
| Gemini CX | Heading "Connect your Google agent" and 4 numbered steps. Fields: "Reader service account email *" (placeholder "app-reader@your-project.iam.gserviceaccount.com"), "Location *" (placeholder "us-central1 or global"), "GCP Project ID" (placeholder "Optional — taken from the service account email"), "CX Agent ID" (placeholder "Optional — the agent's id in CX Agent Studio"). Status "Not checked yet". Button "Test connection" (disabled). "Redact Sensitive Data" | See the steps below. |
| Telnyx | "Telnyx Assistant ID" (placeholder "Enter Telnyx Assistant ID", help "Your Telnyx AI Assistant ID. Used to link the app's runs to your Telnyx assistant."), "Telnyx API Key*" (password box with eye button), "Redact Sensitive Data" | – |
| AssemblyAI | "AssemblyAI Agent ID *" (placeholder "agent_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", help "The id of your stored AssemblyAI voice agent. Used to find the call and fetch its transcript and tool calls after each run."), "AssemblyAI API Key*" (password box with eye button), "Region" combo box, default "US (default)" (help "The AssemblyAI deployment your agent lives in. Agents, phone numbers and calls are separate per region; phone agents are US-hosted."), "Redact Sensitive Data" | – |
| Agora | "Session Endpoint URL *" (placeholder "https://your-host/app/v1/sessions", help "The app sends a POST request to this endpoint per run to mint the Agora channel + token. It must return agora_app_id, agora_channel, agora_token (and optional encryption fields)."), "Request Method" combo box, default "POST" (help "HTTP method the app uses to call the session endpoint. Defaults to POST."), "Client ID *" (help "Sent in the request body to the session endpoint."), "Secret*" (password box with eye button, help "Sent in the secret header when calling the session endpoint. Stored encrypted."), "Secret Header Name (Optional)" (placeholder "X-App-Secret", help "Header that carries the secret. Defaults to X-App-Secret."), "Redact Sensitive Data" | – |
| Kore.ai, Amazon | Not shown in the capture | No Connection was selected. |
| Sierra | No Integration Settings panel | "Sierra Settings" holds the fields. |

Gemini CX steps (verbatim):

1. "In your Google project, create a reader service account with the role Gemini Enterprise for Customer Experience Viewer." A code block shows `gcloud iam service-accounts create app-reader --project YOUR_PROJECT_ID` and `gcloud projects add-iam-policy-binding ... --role="roles/ces.viewer"`. Button "Copy create-reader command".
2. "Get this agent's app identity." A code line shows `Press "Get app identity" to create the address to grant.` Button "Get app identity".
3. "Let that identity act as the reader: grant it Service Account Token Creator on the reader." A code block shows `gcloud iam service-accounts add-iam-policy-binding ... --member="serviceAccount:APP_IDENTITY" --role="roles/iam.serviceAccountTokenCreator"`. Button "Copy grant-identity command".
4. "Enter the reader's email and region below, wait a minute for the grant to apply, then test the connection."

#### Step 1 controls (shared)

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Open guide" | Icon button (?) | – | – | – | Opens a guide (inferred). Content not captured. |
| Provider tiles | Toggle buttons | 18 Providers | "Other" | – | Selects one Provider. Changes the panel below. |
| "More options" / "Less" | Toggle link | – | Collapsed | – | Shows or hides the tiles after the first 7. |
| Connection buttons | Toggle buttons with icon and label | See the matrix | None pressed for Other | – | Adds or removes a Connection. Opens its Settings panel. |
| "Integration Settings" | Collapsible header | – | Expanded | – | Shows or hides the panel. |
| "Next" | Button, dark, full width | – | Enabled | Not seen | Goes to step 2. No backend call. |

#### Backend calls

- `GET /enums/` → 200. The response has `AssistantProviderChoices` and many other enum groups.
- No other step 1 call was seen.

#### Not seen in the capture

- Validation errors on "Next" or on "Configure Agent".
- The Connection grids of the import and code-based Providers after the switch to manual mode.
- The Kore.ai and Amazon Connect chat Settings panels.
- The country list of the phone number button.
- The options of "SIP Originating Region", "API Region", "Region", and "Request Method".
- The Gemini CX identity call and the "Test connection" call.
- The GitHub and Bitbucket connection flows.
- Whether the user can select 2 Connections in the same group. The VAPI agent shows 1 voice and 1 chat Connection at the same time.

---

### 2.6 Create Agent wizard, step 2: Basic Info

#### Route and access

- Route: `/agents/new?project=<project_id>`.
- Access: "Next" in step 1.

#### Purpose

Step 2 records the Agent name, the main language, and the description that the app uses to generate Evaluators.

#### Layout

1. Card header and stepper. "Connection" has a green check. "2 Basic Info" is active.
2. "Agent name*" text box.
3. "Language*" combo box with the help text.
4. "Description of your AI Agent*" text area with the help text and a "docs ↗" link.
5. A yellow warning box when the description is short.
6. Buttons "Back" and "Create".

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Agent name*" | Text box | Free text | Empty | Required (asterisk). Error text not seen. Public API: maximum 255 characters. | Sets `name`. |
| "Language*" | Combo box (list box) | See the language list below | "English" | Required | Help text "Main language for agent communication". Sets `language`. |
| "Description of your AI Agent*" | Text area | Free text | Empty | Required. Error text not seen. | Help text "Add your AI Agent's (Main Agent's) prompt or a detailed description. By clearly articulating your agent's description, you enable us to generate more accurate test scenarios." Sets `description`. |
| "docs ↗" | Link | `https://docs.example.com/documentation/key-concepts/agents/Agent_Setup_Guide` | – | – | Opens the setup guide. |
| Short-description warning | Warning box with a yellow triangle icon | "This description looks a bit short." and "Adding a detailed description (if possible your prompt) will help us generate better test cases and find issues." and the link "Agent Setup Guide" | Hidden | Shows for a short description. The length limit is not known. | Advice only. It does not block "Create". |
| "Back" | Button | – | – | – | Returns to step 1. |
| "Create" | Button | – | – | – | Starts the create flow (section 2.7). |

Language list (verbatim order). The code column comes from the public API enum. Only `en` is seen in a payload, so the other codes are inferred.

| Label | Code | Label | Code | Label | Code |
|---|---|---|---|---|---|
| Multilingual | `multi` | Finnish | `fi` | Marathi | `mr` |
| Afrikaans | `af` | French | `fr` | Norwegian | `no` |
| Arabic | `ar` | German | `de` | Polish | `pl` |
| Bengali | `bn` | Greek | `el` | Punjabi | `pa` |
| Bulgarian | `bg` | Gujarati | `gu` | Portuguese | `pt` |
| Chinese Simplified | `zh` | Hindi | `hi` | Romanian | `ro` |
| Czech | `cs` | Hebrew | `he` | Russian | `ru` |
| Danish | `da` | Hungarian | `hu` | Slovak | `sk` |
| Dutch | `nl` | Indonesian | `id` | Spanish | `es` |
| English | `en` | Italian | `it` | Swedish | `sv` |
| Estonian | `et` | Japanese | `ja` | Thai | `th` |
| Kannada | `kn` | Kazakh | `kk` | Turkish | `tr` |
| Korean | `ko` | Malay | `ms` | Tagalog | `tl` |
| Malayalam | `ml` | Tamil | `ta` | Telugu | `te` |
| Ukrainian | `uk` | Uzbek | `uz` | Vietnamese | `vi` |

The dashboard list order is: Multilingual, Afrikaans, Arabic, Bengali, Bulgarian, Chinese Simplified, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Gujarati, Hindi, Hebrew, Hungarian, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Malay, Malayalam, Marathi, Norwegian, Polish, Punjabi, Portuguese, Romanian, Russian, Slovak, Spanish, Swedish, Thai, Turkish, Tagalog, Tamil, Telugu, Ukrainian, Uzbek, Vietnamese. The list has 45 options.

#### Not seen in the capture

- The error messages for an empty name or an empty description.
- The character count that triggers the short-description warning.

---

### 2.7 Create flow, Connection check, and the "Something went wrong" dialog

#### Route and access

- Route: `/agents/new?project=<project_id>`. After success, the route changes to `/agents/<new_id>`.
- Access: "Create" in step 2.

#### Purpose

The dashboard validates the Connections before it creates the Agent. If the check fails, the user can go back or create the Agent anyway.

#### Flows

1. The user selects "Create".
2. The dashboard calls `POST /test_framework/v2/aiagents/connections/check/?project_id=<id>`. The body is `{"config": <full Agent payload>}`.
3. If the check returns 200, the dashboard calls `POST /test_framework/v2/aiagents/`. The body is the same Agent payload without the `config` wrapper.
4. If the create returns 201, the dashboard opens `/agents/<id>`. The page loads with the calls in section 2.8.
5. If the check returns 400, the dialog "Something went wrong" opens. It shows the first `non_field_errors` message in a red box.
6. The user selects "Try again". The dialog closes and the user can edit the form (inferred).
7. The user selects "Create anyway". The dashboard calls `POST /test_framework/v2/aiagents/` with the same payload (inferred from the call order). In the capture, this call also returned 400. A red error toast showed the same message.

#### "Something went wrong" dialog

| Element | Text or control (verbatim) | Behavior |
|---|---|---|
| Title | "Something went wrong" | – |
| Error box | The backend message, with a red circle icon | Red border and red text. |
| "Try again" | Button, outline | Closes the dialog (inferred). |
| "Create anyway" | Button, dark | Sends the create call without a passed check. |
| "Close" | Icon button (X) | Closes the dialog. |

Error toast: red, at the bottom right, with a "Close toast" button. It shows the same message.

The validation message (verbatim):

"At least one configuration method must be provided: contact_number, sip_endpoint, email_id, assistant_provider (with required fields: websocket_url for self_hosted, assistant_id + api_key for vapi/retell/elevenlabs, contact_number for sms), transcript_provider set to livekit (with livekit_api_key and livekit_data), transcript_provider set to pipecat (with pipecat_api_key and pipecat_data), or transcript_provider set to retell (with retell_api_key)."

#### Backend calls

`POST /test_framework/v2/aiagents/connections/check/?project_id=13875` → 400. Request with only a voice Websocket Connection:

```json
{"config": {
  "name": "zz-spec-test-agent",
  "description": "You are a receptionist for a dental clinic. ...",
  "language": "en",
  "telephony": {"websocket_url": "wss://example.invalid/voice", "websocket_auth": {"username": "", "password": ""}, "inbound": true},
  "provider": {"type": "custom", "agent_id": null,
    "chat_agent_details": {"type": "", "config": {"url": "", "websocket_secret": ""}},
    "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false},
  "email_id": null,
  "project": 13875
}}
```

Response 400:

```json
{"non_field_errors": ["At least one configuration method must be provided: contact_number, ..."]}
```

`POST /test_framework/v2/aiagents/` with the same payload (no `config` wrapper) → 400 with the same body.

`POST /test_framework/v2/aiagents/connections/check/?project_id=13875` → 200. Request with an Email Connection:

```json
{"config": {
  "name": "zz-spec-test-agent", "description": "...", "language": "en",
  "telephony": {"inbound": true},
  "provider": {"type": "custom", "agent_id": null,
    "chat_agent_details": {"type": "", "config": {"url": "", "websocket_secret": ""}},
    "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false},
  "email_id": "zz-spec-test-agent@example.invalid",
  "project": 13875
}}
```

Response 200:

```json
{"agent_id": null, "connections": [{
  "type": "email", "config_fingerprint": "fe688809645129e7",
  "configured": true, "configuration_complete": true, "testable": false,
  "blocked_reason": "Checked by an email evaluator: a reply can take minutes, so a short test would report a false failure.",
  "target": "zz-spec-test-agent@example.invalid",
  "docs_url": "https://docs.example.com/documentation/integrations/chat-testing",
  "credentials_note": null
}]}
```

`POST /test_framework/v2/aiagents/` → 201. Response:

```json
{
  "id": 26242, "name": "zz-spec-test-agent", "description": "...", "project": 13875, "language": "en",
  "telephony": {"inbound": true, "phone_number": null, "sip_uri": null},
  "provider": {"type": "custom", "send_post_conversation_metadata": false, "redact_fields": []},
  "agent_speaks_first": null, "knowledge_base_files": [], "enabled_personalities": [693],
  "webhook_url": "", "webhook_secret_configured": false,
  "mock_tools": [], "mock_tools_enabled": true, "mock_tools_provider": null,
  "dynamic_variables": [],
  "created_at": "2026-10-23T19:15:08.202265Z", "updated_at": "2026-10-23T19:15:08.202277Z",
  "email_id": "zz-spec-test-agent@example.invalid"
}
```

#### Business rules

- The Connection check and the create use the same validation. A voice Websocket alone (`telephony.websocket_url`) did not pass. The message names `contact_number`, `sip_endpoint`, `email_id`, and Provider credentials as valid methods.
- The dashboard always sends `telephony.inbound: true` for Other, also with no Telephony Connection.
- The dashboard sends an empty chat template `{"type": "", "config": {"url": "", "websocket_secret": ""}}` when no chat Websocket is set.
- A new Agent gets `enabled_personalities: [693]`. This is a project default Personality (inferred).
- A new Agent gets `mock_tools_enabled: true`.
- The backend creates version "v1" in the Version History (section 2.9).
- Each Connection in the check response has `testable`. An Email Connection is never testable by a test call. The reason is in `blocked_reason`.

#### Not seen in the capture

- A check response with `testable: true`, and any dialog that it opens during create.
- A check failure for a reason other than "no configuration method".
- The exact action of "Try again".

---

### 2.8 Agent Settings page

#### Route and access

- Route: `/agents/<id>`. Example: `/agents/22757`.
- Access: the name link in the Agents list, or the redirect after create.

#### Purpose

The page shows and edits every part of one Agent. Some sections save at once. The basic fields and the webhook save through "Save Changes".

#### Layout

1. Header card, full width:
   - Left: a back arrow button (link to `/agents`), the title "Agent Settings", the text "ID: #<id>" in monospace with a copy icon, a "|" divider, and an Agent switcher combo box with the current name.
   - Right: "Version History" (clock icon), "Test connections" (phone icon), "Reconfigure" (refresh icon, VAPI Agent only), and "Save Changes" (dark, disabled when there are no edits).
2. Left column card: "Agent name*", "Language*", "Description of your AI Agent*" (tall text area), and the short-description warning box.
3. Right column. It scrolls on its own. It holds 5 collapsible cards in this order:
   1. "Where did you build your agent?" (Provider and Connections). Expanded by default.
   2. "Agent's Knowledge" with the subtitle "Upload and manage knowledge base files". Collapsed by default.
   3. "Mock Tools" with the subtitle "Define mock input/output data for tool calls". Collapsed by default.
   4. "Dynamic Variables" with the subtitle "Define variables injected at call time for scenario generation". Collapsed by default.
   5. "Webhook" with the subtitle "Agent-level webhook URL and secret". Collapsed by default.

#### Header controls

| Label | Control type | Default | Behavior |
|---|---|---|---|
| Back arrow | Icon button link | – | Opens `/agents`. |
| "ID: #<id>" copy icon | Icon button | – | Copies the ID (inferred). |
| Agent switcher | Combo box | Current Agent name | Opens another Agent (inferred). The list was not captured. |
| "Version History" | Button | – | Opens the Version History panel (section 2.9). |
| "Test connections" | Button | – | Runs the Connection check (section 2.10). |
| "Reconfigure" | Button | – | Seen only on the VAPI Agent (section 2.11). |
| "Save Changes" | Button | Disabled | Enabled after an edit to a field that "Save Changes" owns (inferred). Sends one `PATCH` with the changed fields. |

#### Basics card

The fields are the same as wizard step 2: "Agent name*", "Language*", "Description of your AI Agent*", "docs ↗", and the short-description warning. The values come from `name`, `language`, and `description`. These fields save through "Save Changes" (inferred).

#### Provider and Connections card

- Header: "Where did you build your agent? Select the platform you use to build your conversational agent" with a chevron.
- The Provider grid shows icons without labels. The collapsed grid shows 5 tiles (Other, LiveKit, Pipecat, ElevenLabs, Retell) and "More options". The VAPI Agent page showed all 18 tiles and "Less".
- A link "<Provider> setup guide" shows at the right, for example "VAPI setup guide" and "Other setup guide".
- The Connections block, the Settings panels, and the Integration Settings are the same as wizard step 1 (section 2.5).

#### Integration Settings of the VAPI Agent (agent 22757)

| Label (verbatim) | Control | Value seen | Help text (verbatim) | Payload field |
|---|---|---|---|---|
| "VAPI Assistant ID" | Text box, placeholder "Enter VAPI Assistant ID" | "0550eaaa-47ce-4eb8-88ab-cb91809ddb1a" | "Your VAPI Assistant ID. Required for running WebRTC evaluations." | `provider.agent_id` |
| "VAPI Private API Key" | Status text "API Key Configured" and button "Update" | Configured | "Required for all VAPI operations — calls, chat, and testing." | `provider.credentials.api_key` (write-only), read as `credentials.api_key_configured` |
| "Auto-fetch Production Calls" | Switch | Off | "Pull calls from VAPI every 30 seconds." | `provider.auto_import_calls` (inferred) |
| "Auto-sync Prompts" | Switch | Off | "Refresh the prompt from VAPI every 5 minutes." | `provider.auto_sync_prompt` (inferred) |
| "Redact Sensitive Data" | Switch | Off | "Strip selected details from transcripts and recordings. 0.1 credits per minute." | `provider.redact_fields` (inferred) |

Other parts of the VAPI Agent card:

- "Telephony Settings": "Phone Number" with the "US" flag and the value "+1 702 760 8786". "Inbound" switch is on.
- "VAPI Chat Settings": "VAPI Chat is configured automatically using your voice agent settings."
- Selected Connections: "Telephony" and chat "VAPI".

The "Update" button probably replaces the stored key with a text box (inferred). The public API documents `provider.credentials.config.public_key` for VAPI. The Settings page did not show a public key field.

#### Agent's Knowledge section

Layout:

1. Paragraph: "Give the Test Agent context by uploading documents or connecting external sources like BigQuery or websites, so simulated conversations are grounded in your data." and the link "Learn more" (`https://docs.example.com/documentation/advanced/knowledge-base-connectors`).
2. A dashed drop zone with an upload icon, the button "Choose File", the text "Drag and drop files here, or click to select files", and "Supported formats: PDF, TXT, JSON, MD, CSV, XML".
3. "Uploaded Files" heading and the file list (when files exist).
4. "Connectors" heading, the button "Add Connector", and the connector list or the empty state.

| Label | Control type | Default | Validation and errors | Behavior |
|---|---|---|---|---|
| "Choose File" and the drop zone | File picker | – | Allowed formats: PDF, TXT, JSON, MD, CSV, XML. Error text not seen. | Reads the file, encodes it as Base64, and sends `PATCH` at once. |
| File name link | Link | – | – | Opens a signed download URL from Amazon Simple Storage Service (S3). The URL expires after 3600 seconds (`X-Amz-Expires=3600`). |
| File delete | Icon button | – | – | Removes the file (inferred). The call was not captured. |
| "Add Connector" | Button with plus | – | – | Opens the "Add Connector" dialog. |

Empty state for connectors: "No connectors configured" and "Add a connector to sync knowledge base from external sources".

Flow:

1. The user expands the section. The dashboard calls `GET /test_framework/v1/knowledge-base-connectors/?agent_id=<id>` and `GET /test_framework/v2/aiagents/<id>/?ql={id,knowledge_base_files}`.
2. The user selects a file. The dashboard calls `PATCH /test_framework/v2/aiagents/<id>/` with `knowledge_base_files`.
3. The dashboard calls the section `GET` calls again. The new file shows under "Uploaded Files".

`PATCH /test_framework/v2/aiagents/26242/` → 200. Request:

```json
{"knowledge_base_files": [{"file_name": "zz-spec-test-kb.txt", "content_base64": "Q2xpbmljIGhvdXJz..."}]}
```

The `PATCH` response showed `"knowledge_base_files": []`. The next `GET ?ql={id,knowledge_base_files}` returned the file:

```json
{"id": 26242, "knowledge_base_files": [{
  "id": 128023, "agent": 26242,
  "file_url": "https://...s3-accelerate.amazonaws.com/<hash>.txt?X-Amz-...",
  "file_name": "zz-spec-test-kb.txt", "file_type": "text/plain", "file_size": 120,
  "created_at": "2026-10-23T19:18:54.170331Z", "updated_at": "2026-10-23T19:18:54.170349Z"
}]}
```

`GET /test_framework/v1/knowledge-base-connectors/?agent_id=26242` → 200, `[]`.

Business rule (public API): `knowledge_base_files` is the full desired set. An existing file is kept by `{"id": ...}`. A file that the list omits is deleted. The dashboard sent only the new file because the Agent had no files (inferred). A rebuild must send the existing IDs too.

##### Add Connector dialog

| Label (verbatim) | Control type | Options or values | Default | Validation | Behavior |
|---|---|---|---|---|---|
| "Connector Name *" | Text box | Placeholder "e.g., Production Database" | Empty | Required | Name of the connector. |
| "Enable Sync" | Switch | On, off | On | – | Turns the automatic sync on or off. |
| "Sync Interval (days)" | Number spin box, under the label "Auto-sync data" | Integer | "1" | Not seen | Days between syncs. |
| "Connector Type *" | Combo box | "Google BigQuery", "Website Scraper" | "Google BigQuery" | Required | Changes the fields below. |
| "Service Account JSON *" (BigQuery) | Text area with eye button | Placeholder `{"type": "service_account", "project_id": "...", ...}` | Empty | Required | Help "Paste your Google Cloud service account JSON credentials". |
| "Query *" (BigQuery) | Text area | Placeholder ``SELECT doc_id, title, content, category, updated_at FROM `project.dataset.table` `` | Empty | Required | Help "SQL query to fetch knowledge base data from BigQuery". |
| "Cancel" | Button | – | – | – | Closes the dialog. |
| "Create Connector" | Button | – | – | Not seen | Creates the connector (inferred). |

Dialog subtitle: "Configure a new knowledge base connector to sync data from external sources."

#### Mock Tools section

Layout:

1. A bordered row: "Enable Mock Tools by Default" with the help "Automatically select all configured mock tools when configuring a run" and a switch (on).
2. Button "Add Tool" with a plus, aligned right.
3. The tool list, or the empty state with a wrench icon: "No mock tools configured" and "Add a tool to define mock input/output mappings".

Tool row: a chevron (expands the row, inferred), a wrench icon, the tool name (truncated), "(2 mappings)", a red badge "1 FAILURE", and 3 icon buttons: "Copy API URL", edit (pencil), and delete (red trash).

| Label | Control type | Default | Behavior |
|---|---|---|---|
| "Enable Mock Tools by Default" | Switch | On | Sets `mock_tools_enabled`. The save call was not captured. |
| "Add Tool" | Button | – | Opens "Add Mock Tool". |
| "Copy API URL" | Icon button | – | Copies `served_via.url` (inferred). |
| Edit | Icon button | – | Opens the tool dialog with values (inferred). |
| Delete | Icon button | – | Removes the tool (inferred). |

"Add Mock Tool" dialog (subtitle "Define a mock tool with input/output mappings for testing"):

| Label (verbatim) | Control type | Placeholder | Validation | Behavior |
|---|---|---|---|---|
| "Tool Name" | Text box | "e.g., tool_user_data" | Public API: letters, digits, underscores, and hyphens only, under 64 characters. Error text not seen. | Sets `name`. |
| "Description (Optional)" | Text area | "e.g., This tool retrieves user data from the database" | – | Sets `description`. |
| "Input/Output Mappings (JSON)" | Code editor | – | Must be valid JSON (inferred) | Sets `mock_data`. |
| Help text | Paragraph | "Each mapping should have an "input" and "output" object. Add an optional "response" with "status_code" (200-299 except 204/205, or 400-599), "headers" and "delay_seconds" (up to 300) to simulate a failing or slow tool." | – | – |
| "Cancel" | Button | – | – | Closes the dialog. |
| "Create Tool" | Button | – | – | Sends `PATCH` at once. "Save Changes" stays disabled. |

Mapping format (seen):

```json
[
  {"input": {"date": "2026-11-01"}, "output": {"slots": ["09:00", "10:30"]}},
  {"input": {"date": "2026-11-02"}, "output": {"error": "closed"},
   "response": {"status_code": 503, "delay_seconds": 2}}
]
```

| Mapping key | Required | Rule |
|---|---|---|
| `input` | Yes | Object. The tool arguments to match. |
| `output` | Yes | Object. The value that the mock returns. |
| `response.status_code` | No | 200 to 299 except 204 and 205, or 400 to 599. |
| `response.headers` | No | Object. Public API: applies to webhook-style tools only. |
| `response.delay_seconds` | No | Up to 300. The public API names this field `delay_ms`. The dashboard sends `delay_seconds`. |
| `match`, `state`, `then` | No | Public API only: strict match and state between calls. Not in the dashboard help. |

The "1 FAILURE" badge counts the mappings with an error `status_code` (inferred: 1 of 2 mappings has 503).

`PATCH /test_framework/v2/aiagents/26242/` → 200. Request:

```json
{"mock_tools": [{
  "name": "zz_spec_test_check_availability",
  "description": "Test mock tool for a specification.",
  "mock_data": [ {"input": {"date": "2026-11-01"}, "output": {"slots": ["09:00", "10:30"]}}, "..." ]
}]}
```

Response (the `mock_tools` part):

```json
{"mock_tools": [{
  "id": 245093, "name": "zz_spec_test_check_availability",
  "description": "Test mock tool for a specification.",
  "mock_data": ["..."],
  "served_via": {"type": "direct", "url": "https://backend.example.com/test_framework/v1/projects/13875/tool/zz_spec_test_check_availability_245093/"},
  "mcp_server": null, "subscriber_count": 1, "is_shared": false
}], "mock_tools_enabled": true, "mock_tools_provider": null}
```

Section calls when the user expands it:

- `GET /test_framework/v2/aiagents/<id>/?ql={id,mock_tools,mock_tools_enabled,mock_tools_provider}` → 200.
- `GET /test_framework/v1/tools?agent_id=<id>&page=1&page_size=50` → 200. It returned `{"count":0,...}` also after the create. Its purpose is not known.

Business rules:

- `mock_tools` is the full desired set (public API). An item with `id` or a matching `name` updates a tool. An item without both creates a tool. A tool that the list omits is deleted.
- `served_via.type` is `direct` (one URL for each tool) or `mcp` (served through a Model Context Protocol (MCP) endpoint with `mock_index`).
- `is_shared` is true when more than one Agent uses the tool. An edit then changes all of them.

#### Dynamic Variables section

Layout: the "Add Variables" button with a plus, then the list. Empty state with a braces icon: "No dynamic variables defined" and "Add variables to generate scenario-specific values at call time". A row shows a chevron, a braces icon, the variable name (for example "patientName"), an edit (pencil) button, and a delete (red trash) button.

"Add Dynamic Variables" dialog. Subtitle: "Define one or more dynamic variables. Each variable needs a name and a description."

| Label | Control type | Options or values (verbatim) | Default | Validation | Behavior |
|---|---|---|---|---|---|
| Mode tabs | Segmented buttons | "form", "json" (shown as "Form", "Json") | "form" | – | Switches the editor. The values stay in sync (inferred from the JSON mode content). |
| "Variable name, e.g. firstName" | Text box (form mode) | Free text | Empty | Required. Public API: maximum 255 characters. | Sets `name`. |
| Row delete | Icon button | – | Disabled with 1 row | – | Removes the row. |
| "Description — what value this variable holds and its expected format" | Text area (form mode) | Free text | Empty | Required | Sets `description`. |
| "Add another variable" | Button with plus | – | – | – | Adds a row. |
| JSON editor | Code editor (json mode) | An array of objects | – | Help: "Each entry must have a name and a description" | – |
| "Cancel" | Button | – | – | – | Closes the dialog. |
| "Save Variables" | Button | – | – | Not seen | Sends `PATCH` at once. |

JSON mode format:

```json
[
  {"name": "patientName", "description": "Full name of the caller, first and last name."}
]
```

`PATCH /test_framework/v2/aiagents/26242/` → 200. Request:

```json
{"dynamic_variables": [{"name": "patientName", "description": "Full name of the caller, first and last name."}]}
```

Response part: `"dynamic_variables": [{"id": 51473, "name": "patientName", "description": "Full name of the caller, first and last name."}]`.

Section call: `GET /test_framework/v2/aiagents/<id>/?ql={id,dynamic_variables}` → 200.

Business rules (public API):

- `dynamic_variables` is the full desired set, matched by `name`. A variable that the list omits is deleted. The backend ignores `id` on write.
- The backend returns the variables ordered by name.
- The public API also has separate endpoints: `GET` and `POST /test_framework/v1/aiagents/{agent_id}/dynamic-variables/`, and `PATCH` and `DELETE /test_framework/v1/aiagents/{agent_id}/dynamic-variable/{id}/`. The dashboard did not use them in the capture.

#### Webhook section

| Label (verbatim) | Control type | Placeholder or value | Help text (verbatim) | Behavior |
|---|---|---|---|---|
| "Webhook URL" | Text box | "https://yourserver.com/agent-hook" | "Overrides the project webhook URL for events from this agent" | Sets `webhook_url`. Saves through "Save Changes". |
| "Webhook Secret" (not configured) | Password box with eye button | Placeholder "my-secret" | "Sent as the X-WEBHOOK-SECRET header. Only used when Webhook URL is set." | Sets `webhook_secret`. |
| "Webhook Secret" (configured) | Status text "Webhook Secret Configured" and button "Update" | – | Same help text | "Update" shows the password box again (inferred). |

Flow:

1. The user types the URL and the secret. "Save Changes" becomes enabled (inferred).
2. The user selects "Save Changes". The dashboard calls `PATCH /test_framework/v2/aiagents/<id>/`.
3. The dashboard calls the section `GET` calls again. "Save Changes" becomes disabled. The secret box changes to "Webhook Secret Configured".

`PATCH /test_framework/v2/aiagents/26242/` → 200. Request:

```json
{"webhook_url": "https://example.invalid/zz-spec-test-hook", "webhook_secret": "zz-spec-test-secret"}
```

Response part: `"webhook_url": "https://example.invalid/zz-spec-test-hook", "webhook_secret_configured": true`.

Business rule: the backend never returns `webhook_secret`. The dashboard reads `webhook_secret_configured` only.

#### Save Changes behavior

| Section | Save trigger | Call |
|---|---|---|
| Basics (name, language, description) | "Save Changes" (inferred) | `PATCH` with the changed fields (inferred) |
| Provider, Connections, Integration Settings | "Save Changes" (inferred) | Not captured |
| Agent's Knowledge, file upload | Immediate | `PATCH {"knowledge_base_files": [...]}` |
| Mock Tools, "Create Tool" | Immediate | `PATCH {"mock_tools": [...]}` |
| Dynamic Variables, "Save Variables" | Immediate | `PATCH {"dynamic_variables": [...]}` |
| Webhook | "Save Changes" (seen) | `PATCH {"webhook_url": ..., "webhook_secret": ...}` |

Business rules:

- The `PATCH` body holds only the changed fields. The webhook save sent 2 fields only.
- After each `PATCH`, the dashboard calls `GET /test_framework/v2/aiagents/<id>/?ql={-knowledge_base_files}` and the open section calls again.
- "Save Changes" is disabled when no edit is pending.

#### Page backend calls

On page load:

| Call | Status | Purpose |
|---|---|---|
| `GET /enums/` | 200 | Enum lists, for example `AssistantProviderChoices`. |
| `GET /test_framework/v2/aiagents/<id>/?ql={-knowledge_base_files}` | 200 | The Agent without knowledge base files. `{-field}` excludes a field. |
| `GET /github/agent-scan/sdk-pr/?agent=<id>&mode=obs_pr` | 200, `{"exists":false}` | Checks for a GitHub pull request (inferred). No visible control when `exists` is false. |
| `GET /github/agent-scan/sdk-pr/?agent=<id>&mode=sdk_pr` | 200, `{"exists":false}` | Same check for another mode (inferred). |
| `GET /test_framework/v2/results/?page=1&page_size=1&...` | 200 | Global call seen on every page. |

On section expand:

| Section | Calls |
|---|---|
| Agent's Knowledge | `GET /test_framework/v1/knowledge-base-connectors/?agent_id=<id>`, `GET /test_framework/v2/aiagents/<id>/?ql={id,knowledge_base_files}` |
| Mock Tools | `GET /test_framework/v2/aiagents/<id>/?ql={id,mock_tools,mock_tools_enabled,mock_tools_provider}`, `GET /test_framework/v1/tools?agent_id=<id>&page=1&page_size=50` |
| Dynamic Variables | `GET /test_framework/v2/aiagents/<id>/?ql={id,dynamic_variables}` |
| Webhook | No separate call. The data comes from the page-load call. |

#### States

- Short description: the yellow warning box (see section 2.6).
- Empty sections: "No connectors configured", "No mock tools configured", "No dynamic variables defined", each with a second line (verbatim above).
- "Save Changes" disabled: no pending edit.
- Toasts after the immediate saves: not seen.

#### Not seen in the capture

- An edit to the name, language, description, Provider, or Connections, and its `PATCH` body.
- The Agent switcher list.
- The file delete call, the upload error for a wrong format, and the size limit.
- The "Create Connector" call and the "Website Scraper" fields.
- The mock tool edit, delete, and expand. The save call of "Enable Mock Tools by Default".
- The Dynamic Variable edit and delete.
- The "Update" action for the VAPI key and for the webhook secret.
- Any validation error from `PATCH`.
- A visible control for the GitHub pull request check.

---

### 2.9 Version History panel

#### Route and access

- Route: stays on `/agents/<id>`.
- Access: the "Version History" button in the Agent Settings header.

#### Purpose

The panel lists the saved versions of the Agent.

#### Layout

The panel slides in from the right side over a dark overlay.

1. Title "Version History" and a close (X) button.
2. A card "Change History" with the count at the right, for example "1 record".
3. One entry for each version: a green dot, a version badge ("v1"), a green "Current" badge, the user email, a "..." menu button, the date and time ("Oct 23, 2026 · 09:15 PM"), and the change text ("Initial version").

#### Controls

| Label | Control type | Behavior |
|---|---|---|
| "Close" | Icon button | Closes the panel. |
| "v1" | Button | Opens or selects that version (inferred). |
| "..." | Icon button | Opens a version menu (inferred). The menu was not captured. |

#### Backend calls

`GET /test_framework/v1/aiagents/26242/history/?page=1&page_size=14` → 200

```json
{"count": 1, "next": null, "previous": null, "results": [{
  "history_id": 7104149, "is_current": true, "is_runnable": false,
  "history_date": "2026-10-23T19:15:08.206257Z", "history_type": "+",
  "history_change_reason": null,
  "history_user": {"id": 9855, "name": "Automaton", "email": "<user-email>"},
  "version_id": "v1", "version_name": null,
  "id": 26242, "agent_name": "zz-spec-test-agent", "language": "en", "description": "...",
  "agent_speaks_first": null, "email_id": "zz-spec-test-agent@example.invalid",
  "webhook_url": "", "webhook_secret_configured": false, "webhook_secret_hint": "",
  "mock_tools_enabled": true, "pronunciation_words": [], "spelling_word_types": [],
  "telephony": {"inbound": true, "phone_number": null, "sip_uri": null},
  "provider": {"type": "custom", "send_post_conversation_metadata": false, "redact_fields": []},
  "mock_tools": [], "dynamic_variables": [], "knowledge_base_files": [], "knowledge_base_connectors": []
}]}
```

#### Business rules

- The page size is 14.
- `history_type` "+" shows as "Initial version" (inferred mapping).
- The date shows in the local time of the browser (inferred: 19:15 Coordinated Universal Time (UTC) shows as 09:15 PM).
- The capture opened the panel before the later `PATCH` calls. The panel showed 1 record only.

#### Not seen in the capture

- Entries for later edits, and their change text.
- The "..." menu actions, for example restore or rename (inferred).
- The meaning of `is_runnable`.
- Pagination in the panel.

---

### 2.10 Test connections dialog

#### Route and access

- Route: stays on `/agents/<id>`.
- Access: the "Test connections" button in the Agent Settings header.

#### Purpose

The dialog checks every Connection of the saved Agent. It offers a test call for each Connection that can take one.

#### Layout

1. Title "Connections look good — place a test call?" and a close (X) button.
2. Text "A test call reaches your agent to confirm it answers and speaks. Each connection is a separate call, so pick only the ones you want to check."
3. A green box with a check icon: "Ready on 1 connection." and "None of them can be verified by a test call."
4. Button "Done".

#### Flows

1. The user selects "Test connections".
2. The dashboard calls `POST /test_framework/v2/aiagents/connections/check/?project_id=<project_id>` with `{"agent_id": <id>}`.
3. The dialog shows the count of ready Connections.
4. If no Connection has `testable: true`, the dialog shows "None of them can be verified by a test call." and only "Done".

#### Backend calls

`POST /test_framework/v2/aiagents/connections/check/?project_id=13875` → 200

Request: `{"agent_id": 26242}`

```json
{"agent_id": 26242, "connections": [{
  "type": "email", "config_fingerprint": "fd334267387eb30b",
  "configured": true, "configuration_complete": true, "testable": false,
  "blocked_reason": "Checked by an email evaluator: a reply can take minutes, so a short test would report a false failure.",
  "target": "zz-spec-test-agent@example.invalid",
  "docs_url": "https://docs.example.com/documentation/integrations/chat-testing",
  "credentials_note": null
}]}
```

#### Business rules

- The same check endpoint takes `{"config": {...}}` in the wizard and `{"agent_id": ...}` on a saved Agent.
- `config_fingerprint` changes when the Agent configuration changes (inferred: the value differs between the 2 calls).

#### Not seen in the capture

- The list of testable Connections with check boxes, and the test call request.
- The dialog text when a Connection is not configured or incomplete.

---

### 2.11 Reconfigure

#### Route and access

- Route: `/agents/<id>`.
- Access: the "Reconfigure" button in the header. The capture shows it only on the VAPI Agent 22757. The Other Agent 26242 does not show it.

#### Purpose

The button probably fetches the Agent configuration from the Provider again (inferred). The public API documents `POST /test_framework/v2/aiagents/{id}/auto-fetch/` for Retell, VAPI, ElevenLabs, Synthflow, and Bland. That call fetches the system prompt, call settings, phone number, tools with mock data, dynamic variables, and knowledge base files. It returns 202 with `progress_id`. The client polls `GET /test_framework/v2/aiagents/{id}/auto-fetch-progress/?progress_id=...`.

#### Not seen in the capture

- The click result, any confirm dialog, the backend call, and the progress display.
- The exact rule that shows the button.

---

### 2.12 Agent JSON model

This is the read model of `GET /test_framework/v2/aiagents/{id}/`. The "Source" column says where the field was seen. "Capture" means a dashboard response. "API" means the public API reference only.

| Field | Type | Source | Notes |
|---|---|---|---|
| `id` | integer | Capture | Read-only. |
| `name` | string | Capture | Maximum 255 characters. |
| `description` | string | Capture | Required on create. |
| `project` | integer | Capture | Project ID. |
| `language` | string | Capture | One of 45 codes. Default `en`. |
| `telephony.inbound` | boolean | Capture | True: the Agent receives calls. |
| `telephony.phone_number` | string or null | Capture | International format, for example "+17027608786". |
| `telephony.sip_uri` | string or null | Capture | Session Initiation Protocol (SIP) address. |
| `telephony.sip_originating_region` | `us-east`, `us-west`, or null | API | – |
| `telephony.sip_auth` | object or null | API | `{username, password}`. |
| `telephony.websocket_url` | string or null | Capture (request) | Voice websocket endpoint. |
| `telephony.websocket_auth` | object or null | Capture (request) | `{username, password}`. |
| `telephony.outbound_numbers` | array of string | API | Numbers allowed for outbound calls. |
| `provider.type` | string | Capture | `vapi`, `retell`, `elevenlabs`, `agentforce`, `cisco`, `bland`, `livekit`, `pipecat`, `synthflow`, `agora`, `koreai`, `genesys`, `amazon_connect`, `telnyx`, `gemini_cx`, `assemblyai`, `custom`. |
| `provider.agent_id` | string or null | Capture | The assistant ID on the Provider. |
| `provider.credentials.api_key` | string | API | Write-only. |
| `provider.credentials.api_key_configured` | boolean | Capture | Read-only status. |
| `provider.credentials.config` | object | API | Provider-specific, for example VAPI `public_key`. |
| `provider.chat_agent_details.type` | string | Capture | `retell`, `bland`, `vapi`, `elevenlabs`, `livekit`, `agora`, `pipecat`, `sms`, `whatsapp`, `self_hosted`, `agentforce`, `amazon_connect`, `koreai`, `sierra`, or "" to clear. |
| `provider.chat_agent_details.config` | object | Capture | For example `{url, websocket_secret}`. |
| `provider.chat_provider` | string | Capture | Read-only. |
| `provider.auto_dial_outbound` | boolean or null | Capture | – |
| `provider.auto_import_calls` | boolean or null | Capture | Imports calls every 30 seconds. |
| `provider.auto_sync_prompt` | boolean or null | Capture | Syncs the prompt from the Provider. One direction only. |
| `provider.send_post_conversation_metadata` | boolean or null | Capture | Other (`custom`) only. |
| `provider.redact_fields` | array of string | Capture | Empty list: no redaction. Cost 0.1 credits per call minute when set. |
| `provider.configure_from_provider` | boolean | API | Write-only. Starts the import on create. |
| `agent_speaks_first` | boolean or null | Capture | Null: detect at run time. |
| `knowledge_base_files` | array | Capture | Read: `{id, agent, file_url, file_name, file_type, file_size, created_at, updated_at}`. Write: `{id}` or `{file_name, content_base64}`. |
| `enabled_personalities` | array of integer | Capture | Read-only. |
| `webhook_url` | string | Capture | Empty string when not set. |
| `webhook_secret` | string | Capture (request) | Write-only. |
| `webhook_secret_configured` | boolean | Capture | Read-only. |
| `mock_tools` | array | Capture | See the Mock Tools section. |
| `mock_tools_enabled` | boolean | Capture | Default true on a new Agent. |
| `mock_tools_provider` | string or null | Capture | Null until an auto-fetch. |
| `dynamic_variables` | array | Capture | `{id, name, description}`. |
| `email_id` | string or null | Capture | Email Connection address. Maximum 254 characters. |
| `predefined_metrics` | any | API | Write-only. |
| `created_at`, `updated_at` | date-time | Capture | Read-only. |

Fields that only the history endpoint returns: `history_id`, `is_current`, `is_runnable`, `history_date`, `history_type`, `history_change_reason`, `history_user`, `version_id`, `version_name`, `agent_name`, `webhook_secret_hint`, `pronunciation_words`, `spelling_word_types`, `knowledge_base_connectors`.

The `ql` query parameter selects fields:

- `{a,b,c{d}}` returns only the listed fields and sub-fields.
- `{-knowledge_base_files}` returns all fields except the listed one.

---

### 2.13 Backend call summary

| Method | Path | Seen status | Used by |
|---|---|---|---|
| GET | `/test_framework/v2/aiagents/?project_id=&ql=&exclude_kb_files=true&page=&page_size=` | 200 | Agents list |
| POST | `/test_framework/v2/aiagents/` | 201, 400 | Wizard "Create", "Create anyway" |
| GET | `/test_framework/v2/aiagents/{id}/?ql=...` | 200 | Agent Settings and its sections |
| PATCH | `/test_framework/v2/aiagents/{id}/` | 200 | Knowledge upload, Mock Tools, Dynamic Variables, "Save Changes" |
| DELETE | `/test_framework/v2/aiagents/{id}/?delete_related=true` | 204 | Delete Agent dialog |
| POST | `/test_framework/v2/aiagents/connections/check/?project_id=` | 200, 400 | Wizard "Create", "Test connections" |
| GET | `/test_framework/v2/aiagents/provider-assistants/?project_id=&provider=` | 400 | Import dialog |
| GET | `/test_framework/v1/aiagents/{id}/history/?page=&page_size=14` | 200 | Version History |
| GET | `/test_framework/v1/knowledge-base-connectors/?agent_id=` | 200 | Agent's Knowledge |
| GET | `/test_framework/v1/tools?agent_id=&page=1&page_size=50` | 200 | Mock Tools |
| GET | `/github/agent-scan/sdk-pr/?agent=&mode=obs_pr` and `mode=sdk_pr` | 200 | Agent Settings load |
| GET | `/user/v1/projects/{project_id}/` | 200 | Import dialog |
| GET | `/enums/` | 200 | Wizard and Agent Settings |
| POST | `/test_framework/v2/aiagents/{id}/duplicate/` | Not seen (API) | Duplicate Agent (inferred) |
| POST | `/test_framework/v2/aiagents/{id}/auto-fetch/` | Not seen (API) | Reconfigure (inferred) |
| GET | `/test_framework/v2/aiagents/{id}/auto-fetch-progress/?progress_id=` | Not seen (API) | Import and Reconfigure progress (inferred) |

Other public API calls for Agents, not seen in the dashboard capture: `PUT /test_framework/v2/aiagents/{id}/`, `POST /test_framework/v2/aiagents/{id}/upload_knowledge_base/`, `GET /test_framework/v2/aiagents/{id}/personalities/`, `POST /test_framework/v2/aiagents/{id}/enable_personalities/`, `POST /test_framework/v2/aiagents/{id}/disable_personalities/`, `POST /test_framework/v3/aiagents/`, and `POST /test_framework/v3/aiagents/{id}/auto-fetch/`.

## 3. Metrics, Labs, and Rubric

This section describes the screens that define, review, tune, and combine Metrics. A Metric scores one Call or one Run. The Rubric combines Metric scores into one success or failure result.

### 3.0 Shared terms

| Term | Meaning in this section |
|---|---|
| Main Agent | The voice agent under test. The dashboard says "Your AI agent is Main Agent and User is Test Agent". |
| Testing Agent | The simulated caller that the platform runs. Metric prompts call it "testing agent". |
| Custom Metric | A Metric that a user created. The API marks it with `user_defined: true`. |
| Predefined Metric | A copy of a platform catalog Metric. The API marks it with `user_defined: false` and a non-empty `vocera_defined_metric_code`. |
| Metric code | The 8-character catalog code of a Predefined Metric, for example `3b99402a`. The API field is `vocera_defined_metric_code` on a project Metric and `code` in the catalog. |
| Judge form | The "LLM Judge" form. A Large Language Model (LLM) reads the call and applies the Metric description. API value `type: "llm_judge"`. |
| Python form | The "Python" form. The platform runs user code. API value `type: "custom_code"`. |
| Evaluation Trigger | The rule that decides if a Metric runs on a call. Values "Always" or "Custom". |
| Pattern review | The automatic sample-label review that starts after a Metric is created. The dashboard calls it "Review sample labels". |

All API paths use the host `https://backend.example.com`. All dashboard routes use the host `https://app.example.com`. The project in the captures is `13875`.

### 3.1 Metric JSON model

#### Metric type mapping

The dashboard shows a "Metric Type" label. The API stores `eval_type`.

| Dashboard label | `eval_type` | Score shape (documented in the public API reference) | Extra form field |
|---|---|---|---|
| "Boolean" | `binary` | True or False. Legacy numeric form is 0 or 5. | "Add to rubric rule" switch |
| "Rating" | `continuous_qualitative` | Float 0 to 5. The Results page shows it as a percentage. | none |
| "Enum" | `enum` | One string from `enum_values` | "Enter the keys for the enum values*" list |
| "Numeric" | `numeric` | Integer or float | none |

Observed exception: the `POST /test_framework/v1/metrics/bulk_create/` response returned `"eval_type":"binary_workflow_adherence"` for a request with `"eval_type":"binary"`. The later list call returned `"eval_type":"binary"` for the same Metric (ID 272071). The list showed it as "Boolean".

The API `type` field has these values:

| `type` | Where seen | Meaning |
|---|---|---|
| `llm_judge` | Project Metrics | Judge form |
| `custom_code` | Project Metrics | Python form |
| `basic` | Predefined catalog only | Platform built-in function (inferred) |
| `custom_prompt` | Predefined catalog only | Platform built-in prompt (inferred) |

#### Metric fields

The table lists the fields of `GET /test_framework/v2/metrics/{id}/`. The "Seen value" column uses Metric 272072 (zz-spec-test-metric) unless stated.

| Field | Type | Seen value | Meaning |
|---|---|---|---|
| `id` | integer | `272072` | Metric ID |
| `slug` | string or null | `"zzspectestmetric_vb3"` | Unique snake_case key. Predefined copies can have `null`. |
| `project` | integer | `13875` | Owner project |
| `agent` | integer or null | `null` | Legacy single-agent scope (inferred) |
| `agents` | array of integer | `[22757,26242]` | Agents that run this Metric |
| `name` | string, max 255 | `"zz-spec-test-metric"` | Display name |
| `description` | string | Metric text | The judge prompt for the Judge form |
| `type` | enum | `"llm_judge"` | See mapping above |
| `eval_type` | enum | `"binary"` | See mapping above |
| `enum_values` | array of string | `[]` | Enum keys |
| `audio_enabled` | boolean | `false` | "Use voice recording" switch |
| `prompt` | string | `""` | Legacy prompt field |
| `evaluation_trigger` | enum `always`, `automatic`, `custom` | `"always"` | Evaluation Trigger. The dashboard offers "Always" and "Custom" only. |
| `trigger_type` | enum `llm_judge`, `custom_code` | `"llm_judge"` | Trigger form when `evaluation_trigger` is `custom` |
| `evaluation_trigger_prompt` | string | `""` | Trigger prompt (Judge trigger) |
| `evaluation_trigger_custom_code` | string | `""` | Trigger code (Python trigger). Code sets `_result` and `_explanation`. |
| `priority_assignment_prompt` | string | `""` | Not shown in the dashboard |
| `configuration` | object | `{}` | Per-Metric settings. Example: `{"infra_issues_timeout":10}` on Infrastructure Issues. |
| `display_order` | integer | `20` | Position in the list |
| `overall_score`, `total_score` | integer | `0`, `0` | Labs score "Overall Score : 0/0" |
| `knowledge_base_files`, `kb_file_ids` | array | `[]` | Knowledge base files |
| `observability_enabled` | boolean | `true` | "Observability" switch |
| `simulation_enabled` | boolean | `true` | "Simulation" switch |
| `sampling_enabled` | boolean | `false` | "Sampling Enabled" switch |
| `sample_rate` | number 0.0–1.0 or null | `null` | Per-Metric sampling rate. `null` uses the project rate. |
| `alert_enabled`, `alert_type`, `alert_filters`, `slack_workspace`, `slack_channel_id` | mixed | `true`, `"disabled"`, `{}`, `null`, `""` | Alert settings. The Alerts section describes them. |
| `significant_change_alert_status`, `significant_change_alert_direction`, `window_size`, `std_multiplier`, `ewma_alpha` | mixed | `"disabled"`, `""`, `50`, `2.0`, `0.1` | Significant-change alert settings |
| `function_name` | string or null | `null` | Built-in function of a Predefined Metric, for example `"get_latency"` |
| `custom_code` | string | `""` | Python form code |
| `vocera_defined_metric_code` | string | `""` | Metric code of a Predefined Metric |
| `reviews` | array | `[]` | Labs review rows |
| `metric_description_variables`, `evaluation_trigger_variables` | array | `[]` | Variables found in the texts |
| `metric_description_program`, `evaluation_trigger_program` | object | see 3.9 | Internal prompt program. Returned on create only. |
| `add_to_new_agents` | boolean | `true` | "Automatically add to new agents" |
| `pending_optimisation_proposal` | object or null | `null` | Labs proposal |
| `dependencies`, `dependents` | array | `[]` | "Uses results from" links |
| `dependency_warnings` | array | `[]` | Returned on create |
| `user_defined` | boolean | `true` | Group on the Metrics list |

Write-only fields (documented in the public API reference, not seen in a captured request): `add_to_rubric` (boolean, adds or removes a Rubric rule), `scenarios` (scenario IDs for "Apply to existing scenarios"), `llm_provider` and `relevance_llm_provider` (enum `openai`, `gemini`, `dspy-gepa-gemini-flash`, `deepseek-v4-flash`), `apply_to_all_agents`, `assistant_id`. The history record of Metric 272072 shows `"llm_provider":"deepseek-v4-flash"`.

Trimmed example:

```json
{
  "id": 272072, "slug": "zzspectestmetric_vb3", "project": 13875, "agents": [22757, 26242],
  "name": "zz-spec-test-metric",
  "description": "This metric passes if the main agent confirms the name and phone number ...",
  "type": "llm_judge", "eval_type": "binary", "enum_values": [], "audio_enabled": false,
  "evaluation_trigger": "always", "trigger_type": "llm_judge",
  "evaluation_trigger_prompt": "", "evaluation_trigger_custom_code": "",
  "configuration": {}, "display_order": 20,
  "observability_enabled": true, "simulation_enabled": true,
  "sampling_enabled": false, "sample_rate": null,
  "custom_code": "", "vocera_defined_metric_code": "",
  "add_to_new_agents": true, "dependencies": [], "dependents": [], "...": "..."
}
```

### 3.2 Metrics list page

#### Route and access

- Route: `/metrics?project=<projectId>`.
- The user opens it from the sidebar link "Metrics" in the "General" group. The breadcrumb link "Metrics" on the create and edit pages also opens it.

#### Purpose

The page lists every Metric of the project in two groups. The user turns each Metric on or off for Observability, Simulation, and Sampling, and opens all Metric tools from here.

#### Layout

1. Page header: title "Metrics" and the text "Define what to measure on every call from predefined checks to custom LLM-judge and Python metrics then reuse them across simulations and observability." with a link "Learn more" (to `https://docs.example.com/documentation/key-concepts/metrics/overview`).
2. Toolbar, left to right: selection counter "0 selected", "Delete", "Select View", "Generate Metrics", "Create Metric", "Predefined Metrics" (filled dark button), "Assign Agents", "Toggle Settings".
3. Table with a header row, then a group row "Custom Metrics" with a collapse chevron, then the Custom Metric rows, then a group row "Predefined Metrics" with a collapse chevron, then the Predefined Metric rows.
4. Floating panels at the bottom right: "Metric Generation" (see 3.7) and "Review <metric name>" (see 3.10).

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "0 selected" | text | Count of checked rows | "0 selected" | none | Shows the number of checked rows. |
| "Delete" | button with trash icon | none | disabled | Disabled when 0 rows are checked | Deletes the checked Metrics (inferred). Not run in the capture. |
| "Select View" | dropdown button | See 3.3 | "Select View" | none | Opens the "Select view" menu. |
| "Generate Metrics" | button with sparkle icon | none | enabled | none | Opens the "Generate Metrics" dialog (3.7). |
| "Create Metric" | link with plus icon | `/create-metric` | enabled | none | Opens the Create Metric page (3.8). |
| "Predefined Metrics" | button | none | enabled | none | Opens the "Predefined Metrics" dialog (3.6). |
| "Assign Agents" | button with people icon | none | disabled | Disabled when 0 rows are checked | Assigns agents to the checked Metrics (inferred). Dialog not captured. |
| "Toggle Settings" | button with gear icon | none | disabled | Disabled when 0 rows are checked | Changes switches on the checked Metrics (inferred). Dialog not captured. |
| Header checkbox | checkbox | checked, unchecked | unchecked | none | Checks all rows (inferred). |
| Group row chevron | icon button | expanded, collapsed | expanded | none | Collapses or expands the group (inferred from the chevron icon). |
| Row checkbox | checkbox | checked, unchecked | unchecked | none | Adds the row to the selection. |
| Row drag handle | 6-dot grip | none | none | none | Drags the row to a new position. See flow 3. |
| Row expand chevron | icon button | none | collapsed | none | Expands the row. Expanded content not captured. |
| "ID" | text in a bordered chip | Metric ID, for example "243607" | none | none | Read only. |
| "Name" | bold text | Metric name. Long names end in "…" | none | none | Read only. |
| "Metric Type" | grey text | "Boolean", "Rating", "Numeric", "Enum" (inferred for Enum) | none | none | Read only. See 3.1 mapping. |
| "Evaluation Trigger" | grey text | "Always" (accessibility text "always"), "Custom" (inferred) | none | none | Read only. |
| "Observability" | switch | on, off | from `observability_enabled` | Disabled for "Expected Outcome" | Turns the Metric on or off for Calls. |
| "Simulation" | switch | on, off | from `simulation_enabled` | none | Turns the Metric on or off for Runs. |
| "Sampling Enabled" | switch | on, off | from `sampling_enabled` | none | Turns sampling on or off. |
| "Action" pencil | icon link | `/metrics/edit/<id>?project=<projectId>` | enabled | Disabled (greyed button) for some Predefined Metrics | Opens the Edit Metric page (3.11). |
| "Action" robot icon | icon button | none | enabled | none | Opens "Manage Metric for <name>" (3.4). |
| "Action" three dots | icon button | menu | none | none | Opens the row menu (3.5). |

Captured switch states and edit link states (project 13875):

| ID | Name | Group | Metric Type | Observability | Simulation | Sampling Enabled | Edit pencil |
|---|---|---|---|---|---|---|---|
| 243607 | Persona Integrity | Custom | Boolean | off | on | off | enabled |
| 243608 | No Fabricated Availability | Custom | Boolean | off | on | off | enabled |
| 243609 | Confirmation Before Mutation | Custom | Boolean | off | on | off | enabled |
| 272071 | new_appointment_booking | Custom | Boolean | on | on | off | enabled |
| 272072 | zz-spec-test-metric | Custom | Boolean | on | on | off | enabled |
| 240898 | AI interrupting user | Predefined | Numeric | on | on | off | enabled |
| 240899 | Average Pitch (in Hz) | Predefined | Numeric | on | on | off | disabled |
| 240900 | Expected Outcome | Predefined | Rating | disabled, off | on | off | disabled |
| 240901 | Infrastructure Issues | Predefined | Boolean | on | on | off | enabled |
| 240902 | Interruption Score | Predefined | Rating | on | on | off | disabled |
| 240903 | Latency (in ms) | Predefined | Numeric | on | on | off | enabled |
| 240904 | Stop Time after User Interruption (ms) | Predefined | Numeric | on | on | off | enabled |
| 240905 | Talk Ratio | Predefined | Numeric | on | on | off | enabled |
| 240906 | Tool Call Success | Predefined | Boolean | on | off | off | enabled |
| 240907 | Transcription Accuracy | Predefined | Rating | off | on | off | disabled |
| 240908 | Unnecessary Repetition Score | Predefined | Rating | on | on | off | disabled |
| 272059 | Mock tool call accuracy | Predefined | Rating | off | on | off | enabled |

#### Flows

1. Load the page.
   1. The page calls `GET /test_framework/v2/metrics/` with the list field selection (see Backend calls).
   2. The page calls `GET /test_framework/v1/views/?project_id=<projectId>`.
   3. The page shell also calls `GET /test_framework/v2/aiagents/` and `GET /test_framework/v2/results/?page=1&page_size=1`.
2. Turn a switch on or off. The page saves the field on the Metric (inferred: `PATCH /test_framework/v2/metrics/{id}/` with `observability_enabled`, `simulation_enabled`, or `sampling_enabled`). No switch change was captured.
3. Drag a row by its grip. The live region announces "Draggable item 243607 was dropped over droppable area 243607". The capture dropped the row on itself, so no order change and no API call occurred. The documented reorder call is `PATCH /test_framework/v2/metrics/reorder/` with body `{"metric_ids":[...]}` in the new order (documented in the public API reference).
4. Click the pencil. The browser opens `/metrics/edit/<id>?project=<projectId>`.
5. Check one or more rows. "Delete", "Assign Agents", and "Toggle Settings" become enabled (inferred).

#### Backend calls

`GET /test_framework/v2/metrics/?project_id=13875&ql={id,project,name,description,function_name,type,eval_type,observability_enabled,simulation_enabled,sampling_enabled,sample_rate,evaluation_trigger,vocera_defined_metric_code,configuration,add_to_new_agents,dependencies,dependents}` returned 200. The response is a plain array with no pagination.

```json
[
  {"id":240901,"project":13875,"name":"Infrastructure Issues",
   "description":"Return false when the main agent does not speak for x seconds. Default value is 10 seconds, which can be edited",
   "function_name":"get_infrastructure_issues","type":"custom_code","eval_type":"binary",
   "observability_enabled":true,"simulation_enabled":true,"sampling_enabled":false,"sample_rate":null,
   "evaluation_trigger":"always","vocera_defined_metric_code":"b3f8872x",
   "configuration":{"infra_issues_timeout":10},"add_to_new_agents":true,
   "dependencies":[],"dependents":[],"user_defined":false},
  "..."
]
```

`GET /test_framework/v1/views/?project_id=13875` returned 200:

```json
{"count":0,"next":null,"previous":null,"results":[]}
```

Documented list filters (documented in the public API reference): `agent_id`, `project_id`, `assistant_id`, `agents` (comma-separated IDs), `slug`, `filters` (JSON), `include_scores`.

#### States

- Disabled bulk buttons: "Delete", "Assign Agents", and "Toggle Settings" show greyed text while "0 selected" shows.
- Disabled edit: the pencil is a greyed, disabled button for 240899, 240900, 240902, 240907, and 240908.
- Disabled switch: the "Observability" switch of "Expected Outcome" is greyed and disabled.
- Empty state: not seen. The project always had Predefined Metrics.
- Loading state: not seen.

#### Business rules

- The `user_defined` flag decides the group. `true` puts the row under "Custom Metrics". `false` puts the row under "Predefined Metrics" (inferred from all 17 rows).
- Rows in each group follow `display_order` (inferred).
- A newly created Custom Metric gets the next `display_order` (19, then 20 in the captures).
- The "Expected Outcome" Metric reads the expected outcome of the Evaluator. It cannot run on Calls, so its "Observability" switch is disabled (inferred from the Metric description).
- The Metrics with a disabled pencil are the same Metrics that the Labs list leaves out (see 3.12).

#### Not seen in the capture

- The content of an expanded row.
- The dialogs of "Assign Agents" and "Toggle Settings", and the bulk "Delete" confirmation.
- The API call of a switch change and of a real reorder.
- Any toast after a switch change.
- An Enum Metric or a "Custom" trigger in the list.

### 3.3 Select View menu and Create New View dialog

#### Route and access

- Route: same page, `/metrics?project=<projectId>`.
- The user clicks "Select View" in the toolbar. The menu "Select view" opens. The user clicks "Create New View" to open the dialog.

#### Purpose

A view is a saved agent filter. The dialog says "A view once applied stays across results and calls page."

#### Layout

Menu "Select view": a search box, a separator, the item "None", a separator, the item "Create New View".

Dialog "Create New View":

1. Title "Create New View" and the text "Create a new view by selecting agents and, optionally, their versions. A view once applied stays across results and calls page."
2. "View Name *" text box.
3. "Select Agents" searchable list with one checkbox per agent. Each option shows the agent ID chip and the agent name.
4. Footer buttons "Cancel" and "Create". A close button "Close" (X icon) is at the top right.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Search Views..." | text box | free text | empty | none | Filters the view list (inferred). |
| "None" | menu item | none | none | none | Clears the active view (inferred). |
| "Create New View" | menu item | none | none | none | Opens the dialog. |
| "View Name *" | text box, placeholder "Enter view name" | free text | empty | Required. "Create" stays disabled while it is empty (inferred). | Names the view. |
| "Select Agents" | searchable multi-select list, search placeholder "Search agents..." | "22757 Voice Regression — E2E Deploy Agent Sq", "26242 zz-spec-test-agent" | none checked | none | Picks the agents of the view. |
| "Cancel" | button | none | enabled | none | Closes the dialog. |
| "Create" | button | none | disabled | none | Saves the view (inferred). |

#### Flows

1. Click "Select View". The menu opens. No API call.
2. Click "Create New View". The dialog calls `GET /test_framework/v2/aiagents/short_list/?project_id=13875&ql={id,agent_name,language,agent_gives_first_message}`.
3. Type a name and check agents. Click "Create". The save call was not captured.

#### Backend calls

`GET /test_framework/v2/aiagents/short_list/?project_id=13875&ql={id,agent_name,language,agent_gives_first_message}` returned 200:

```json
[{"id":22757,"agent_name":"Voice Regression — E2E Deploy Agent Sq","language":"en","agent_gives_first_message":null},
 {"id":26242,"agent_name":"zz-spec-test-agent","language":"en","agent_gives_first_message":null}]
```

#### States

- The project had no views. The menu showed "None" and "Create New View" only.
- "Create" is disabled in the empty dialog.

#### Not seen in the capture

- The create-view request and response.
- The agent-version picker that the dialog text mentions.
- A list of existing views, and how a selected view changes the Metrics list.

### 3.4 Manage Metric agents dialog

#### Route and access

- Route: same page.
- The user clicks the robot icon in the "Action" column of a row.

#### Purpose

The dialog sets the agents that run one Metric.

#### Layout

1. Title "Manage Metric for <metric name>", for example "Manage Metric for Persona Integrity", and the text "Select which agents this metric should be enabled for".
2. Buttons "Select All" and "Deselect All".
3. Checkbox "Automatically add to new agents".
4. A bordered list with one checkbox per agent.
5. Footer buttons "Cancel" and "Save Changes" (dark). Close button (X) at the top right.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Select All" | button | none | enabled | none | Checks every agent. |
| "Deselect All" | button | none | enabled | none | Clears every agent. |
| "Automatically add to new agents" | checkbox | checked, unchecked | from `add_to_new_agents` (checked in capture) | none | New agents get this Metric. |
| Agent checkbox | checkbox per agent | agent names | checked when the agent ID is in `agents` | none | Adds or removes the agent. |
| "Cancel" | button | none | enabled | none | Closes without a save. |
| "Save Changes" | button | none | enabled | none | Saves the agents (inferred: `PATCH /test_framework/v2/metrics/{id}/` with `agents` and `add_to_new_agents`). |

#### Flows

1. Click the robot icon. The dialog calls `GET /test_framework/v2/aiagents/short_list/` and `GET /test_framework/v2/metrics/{id}/`.
2. Change the checkboxes. Click "Save Changes". The save call was not captured.

#### Backend calls

`GET /test_framework/v2/metrics/243607/` returned 200 (trimmed):

```json
{"id":243607,"slug":null,"project":13875,"agent":null,"agents":[22757,26242],
 "name":"Persona Integrity","type":"llm_judge","eval_type":"binary",
 "observability_enabled":false,"simulation_enabled":true,"add_to_new_agents":true,"...":"..."}
```

#### Not seen in the capture

- The save request, its response, and any toast.

### 3.5 Row menu: Sampling rate and Delete

#### Route and access

- Route: same page.
- The user clicks the three-dot icon in the "Action" column.

#### Purpose

The menu holds the per-Metric sampling rate and the delete action.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Sampling rate" | menu item with percent icon | none | disabled when "Sampling Enabled" is off | none | Opens the per-Metric rate editor. Documented value: 0–100, or empty to use the project rate. The API stores a fraction 0.0–1.0 in `sample_rate`. |
| "Delete" | red menu item with trash icon | none | enabled | none | Deletes the Metric. |

#### Flows

1. Click "Delete". The page calls `DELETE /test_framework/v1/metrics/{id}/`.
2. The page reloads the list with `GET /test_framework/v2/metrics/` (same `ql` as 3.2). The row is gone.

#### Backend calls

| Call | Status | Response |
|---|---|---|
| `DELETE /test_framework/v1/metrics/272071/` | 204 | empty |
| `DELETE /test_framework/v1/metrics/272072/` | 204 | empty |

#### Business rules

- "Sampling rate" is enabled only when sampling is on for that Metric (documented in the public API reference, and the item was disabled with the switch off).
- Sampling applies to Calls only, not to Runs (documented in the public API reference).

#### Not seen in the capture

- Toasts after delete. Note: a confirm dialog exists. The crawler read its text during the run, but the crawl records do not hold it: "Are you sure you want to delete? This action cannot be undone. This will permanently delete the selected item." with "Cancel" and "Delete".
- A delete toast.
- The "Sampling rate" editor.

### 3.6 Predefined Metrics dialog

#### Route and access

- Route: same page.
- The user clicks "Predefined Metrics" in the toolbar.

#### Purpose

The user picks catalog Metrics and copies them into the project.

#### Layout

1. Title "Predefined Metrics" and the text "Select from our predefined metrics to get started quickly." Close button (X) at the top right.
2. Search box "Search metrics by name, description, or code...".
3. Tabs "All", "Accuracy", "Conversation Quality", "Customer Experience", "Speech Quality". "All" is selected.
4. "Select All" checkbox.
5. A scroll list of cards. Each card shows the name, an optional tag chip, the description, the Metric code in a chip, a "Copy code" icon button, and a checkbox at the top right.
6. Sub-category headings split the cards: "Interruption", "Repetition", "Silence", "Termination", "Latency".
7. A separator labelled "Already added metrics". The cards below it are the catalog Metrics that the project already holds.
8. Footer: "0 metrics selected" and the button "Create Metrics".

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Search | text box | free text | empty | none | Filters cards by name, description, or code. |
| Category tabs | tab list | "All", "Accuracy", "Conversation Quality", "Customer Experience", "Speech Quality" | "All" | none | Filters cards by `category`. |
| "Select All" | checkbox | checked, unchecked | unchecked | none | Checks every card (inferred: only the cards above the separator). |
| Card checkbox | checkbox | checked, unchecked | unchecked | none | Adds the card to the selection. |
| "Copy code" | icon button | none | enabled | none | Copies the Metric code. |
| Tag chip | label | "Need to be configured", "Beta" | none | none | "Need to be configured" marks a Metric that needs agent settings first. |
| "Create Metrics" | button | none | disabled | Disabled at "0 metrics selected" | Copies the selected catalog Metrics into the project. |

#### Predefined catalog as shown

The "Category" and "Documented result and cost" columns come from the public API reference (the dialog does not show them). The other columns are verbatim from the dialog.

Cards above the separator (not yet in the project):

| Name | Tag | Code | Description (verbatim) | Category | Documented result and cost |
|---|---|---|---|---|---|
| CSAT | none | 59ff561e | "Gives a score for customer satisfaction and tells the reason for dissatisfaction." | Customer Experience | Score 0–100, 0.2 credits per call |
| Dropoff Node | Need to be configured | 2d066f4d | "This metric evaluates the dropoff node for observability calls" | Customer Experience | Enum of configured stages, 0.2 credits per call. Needs `dropoff_nodes` on the agent. |
| Gibberish Detection | none | 205d809f | "This metric checks for gibberish in your AI agent's speech. NOTE: This only works on stereo recordings. It costs 0.1 credits per minute of the conversation." | Speech Quality | True or False |
| Hallucination | Need to be configured | adf58c69 | "." | Accuracy | True or False, 0.6 credits per call. Needs knowledge base files. |
| Letterwise Pronunciation Detection | Need to be configured | 8d7cf828 | "This metric checks if certain things by the main agent are spoken letter by letter when communication. For example, when confirming phone number, is the main agent speaking the phone number letter by letter." | Speech Quality | True or False, 0.2 credits per call. Needs `spelling_word_types`. |
| Pronunciation Check | Need to be configured | a966f9f9 | "This metric evaluates a voice AI agent’s pronunciation by comparing its spoken output against a predefined list of words along with their expected phonemes." | Speech Quality | Score 0–100, 0.2 credits per call. Needs `pronunciation_words`. |
| Relevancy | none | 0b618add | "This metric checks if the responses of your AI agent are relevant or something absurd" | Accuracy | True or False, 0.2 credits per call |
| Response Consistency | none | 96a89a19 | "This metric checks if the responses of your AI Agent are consistent across the duration of a call" | Accuracy | True or False, 0.2 credits per call |
| Sentiment | none | 80cac969 | "Your goal is to determine whether the human's overall sentiment towards the AI agent during the conversation was \"happy\", \"angry\", \"neutral\", or \"disappointed\". Please follow these guidelines: ..." (long text cut) | Customer Experience | Enum, 0.2 credits per call |
| Speaking Rate | none | b378e6a9 | "This metric detects any abrupt change in speaking rate by your AI agent. NOTE: Only english language is currently supported" | Speech Quality | True or False, 0.2 credits per call |
| Topic of Call | Need to be configured | 1f9cedf0 | "This metric assigns a topic for observability calls" | Customer Experience | Enum of configured topics, 0.2 credits per call. Needs `topic_nodes`. |
| Voice Change Detection | Beta | 8872418d | "This metric detects change in the voice of your AI agent at any point in the conversation" | Speech Quality | True or False, 0.2 credits per call |
| Voice Tone + Clarity | none | c500d5e9 | "This metric checks for clarity in your AI Agent's voice and any discrepancy in the tone. It gives a score on a scale of 5." | Speech Quality | Score, 0.2 credits per call |
| Voicemail Detection | Beta | ad6156d8 | "This metric checks if the call reached a voicemail system." | Accuracy | True or False, 0.2 credits per call |
| Words Per Minute (WPM) | none | a9118e4b | "Monitors speech speed of AI Agent (Main Agent) to ensure natural and understandable delivery." | Speech Quality | Numeric, 0 credits |
| Humanness | none | 59d383f4 | "Rates how human the Main Agent voice sounds from 1 to 5." | Speech Quality | Score 1–5, 0.3 credits per minute |
| User interrupting AI (sub-heading "Interruption") | none | e17fb774 | "Tells if the user (testing agent) interrupted AI (main agent) during the interaction. NOTE: This only works on stereo recordings for observability." | Conversation Quality | Count, 0 credits |
| Unnecessary Repetition Count (sub-heading "Repetition") | none | 08a24e76 | "This metric counts the number of times your AI Agent repeated itself unnecessarily" | Conversation Quality | Count, 0.2 credits per call |
| Detect Silence in Conversation (sub-heading "Silence") | none | 0b0ffb44 | "This metric detects periods of silence in a conversation and returns false if neither agent speaks for more than x seconds. The default value of x is 10 seconds, but it can be adjusted as needed. NOTE: This differs from the “Silence by Main Agent” metric, which only monitors silence from the main agent. This metric considers silence from both agents." | Conversation Quality | True or False, 0 credits. Setting `silence_duration`. |
| Appropriate Call Termination by Main Agent (sub-heading "Termination") | none | b253d627 | "This metric checks if the Conversation was ended early by the main agent. It primarily focuses on 1. Whether main agent ended the call 2. Was user's concern resolved completely when call ended" | Conversation Quality | True or False. The catalog API returned `"cost":0.1`. |
| Appropriate Call Termination by Testing Agent (User) | none | 3b84ddf8 | "Check if the call was ended early by the user abruptly indicating poor user experience or unresolved issues. This metric is True if it wasn't early termination and false if there is early termination" | Conversation Quality | True or False. The catalog API returned `"cost":0.1`. |

Cards below "Already added metrics":

| Name | Code | Description (verbatim) | Category | Documented result and cost |
|---|---|---|---|---|
| Average Pitch (in Hz) | 944867cb | "Returns the average pitch of the AI Agent (Main agent) during the call in Hz" | Speech Quality (API confirmed) | Numeric, 0 credits |
| Expected Outcome | b3b77859 | "This metric tells whether your AI Agent did what it was supposed to do in the conversation. It is evaluated against the expected outcome prompt set in evaluators." | Accuracy | Pass, Review Required, or Failed. 0 credits. |
| Interruption Score | b8f38223 | "This metric measures how often your AI agent interrupts the user during a conversation. A higher score indicates smoother, more respectful interactions with minimal interruptions." | Conversation Quality | Score 0–5, 0 credits |
| Mock tool call accuracy | 88f35cef | "Provides a score on whether right mock tools with the right inputs were called in the conversation." | not documented | not documented |
| Talk Ratio | 5d1409b9 | "This is the ratio of time duration the AI Agent (Main agent) is speaking compared to the duration the User (Test Agent) is speaking" | Speech Quality | Numeric 0.0–1.0, 0 credits |
| Tool Call Success | 3b99402a | "This is a python code based metric. It checks if any tool call result returns \"Error\" in the response string. Please reach out to us if you need a modified version of this code." | Accuracy | True or False, 0 credits |
| Transcription Accuracy | f30e1ab9 | "Detects the accuracy of transcription. Useful for finding issues in transcript. For simulation, it is free. For observability, it is a bit expensive, costing 1 credit per min" | Accuracy | Score 0–100 |
| AI interrupting user (sub-heading "Interruption") | ec29cab5 | "Tells if the AI (main agent) interrupted user (testing agent) during the interaction. NOTE: This only works on stereo recordings for observability." | Conversation Quality (API confirmed, sub-category "Interruption") | Count, 0 credits |
| Stop Time after User Interruption (ms) | 6c0e635a | "This metric measures how long your AI agent takes to stop speaking after an interruption from user / testing agent. Time is in ms." | Conversation Quality | Numeric in milliseconds, 0 credits |
| Latency (in ms) (sub-heading "Latency") | cfb51b2c | "Tells the average response latency for AI agent in ms." | Conversation Quality | Numeric in milliseconds, 0 credits |
| Unnecessary Repetition Score (sub-heading "Repetition") | cefde6d8 | "This metric measures how often your AI agent repeats information unnecessarily. A higher score reflects clearer, more concise responses with minimal repetition." | Conversation Quality | Score 0–5, 0.2 credits per call |
| Infrastructure Issues (sub-heading "Silence") | b3f8872x | "Return false when the main agent does not speak for x seconds. Default value is 10 seconds, which can be edited" | Conversation Quality | True or False, 0 credits. Setting `infra_issues_timeout`. |

#### Flows

1. Click "Predefined Metrics". The dialog calls these three APIs:
   1. `GET /test_framework/v1/scenarios/?project_id=13875&page_size=1&ql={id}`.
   2. `GET /test_framework/v2/metrics/?project_id=13875&ql={id,name,type,description,function_name,eval_type,enum_values,vocera_defined_metric_code,overall_score,total_score}`.
   3. `GET /test_framework/v1/predefined-metrics/`.
2. The dialog compares each catalog `code` with the project `vocera_defined_metric_code` values. A match puts the card below "Already added metrics" (inferred).
3. Check cards. The footer count changes. "Create Metrics" becomes enabled (inferred).
4. Click "Create Metrics". The documented call is `POST /test_framework/v1/predefined-metrics/copy/` with `project_id` and `predefined_metric_ids` or `metric_codes` (documented in the public API reference, not captured).

#### Backend calls

`GET /test_framework/v1/predefined-metrics/` returned 200 (trimmed):

```json
[
  {"id":9,"name":"AI interrupting user","description":"Tells if the AI (main agent) interrupted user ...",
   "code":"ec29cab5","slug":"ai_interrupting_user","type":"basic","eval_type":"numeric",
   "audio_enabled":false,"prompt":"","function_name":"get_main_agent_interruption","enum_values":[],
   "custom_code":"","simulation_enabled":true,"observability_enabled":true,"configuration":{},
   "cost":0.0,"evaluation_trigger":"always","evaluation_trigger_prompt":"",
   "category":"Conversation Quality","sub_category":"Interruption","organization":null},
  {"id":289,"name":"Appropriate Call Termination by Main Agent","code":"b253d627",
   "type":"custom_prompt","eval_type":"binary","cost":0.1,
   "category":"Conversation Quality","sub_category":"Termination","...":"..."},
  "..."
]
```

`GET /test_framework/v1/scenarios/?project_id=13875&page_size=1&ql={id}` returned 200:

```json
{"count":8,"next":"https://backend.example.com/test_framework/v1/scenarios/?page=2&page_size=1&project_id=13875&ql=%7Bid%7D","previous":null,"results":[{"id":340454,"is_simulating":false}]}
```

Documented copy request (documented in the public API reference):

```json
{"project_id":13875,"metric_codes":["59ff561e"],"scenarios":[340447]}
```

The response is an array of the new project Metrics. `scenarios` is optional, with a maximum of 1000 IDs.

#### Business rules

- A catalog Metric cannot be created through `POST /test_framework/v2/metrics/`. It must be copied (documented in the public API reference).
- The project copy keeps the catalog `code` in `vocera_defined_metric_code` and gets `user_defined: false`.
- The project copy can get a different `type` from the catalog. Catalog "AI interrupting user" is `basic`. The project copy 240898 is `custom_code`.
- A copied Predefined Metric gets a Rubric rule (documented in the public API reference: "all default predefined metrics are added to the rubric automatically"). The capture agrees: "Mock tool call accuracy" (272059) appeared with a rule "= 5" (see 3.14).

#### Not seen in the capture

- The copy request and its toast.
- The content of each category tab.
- The configuration screens for the "Need to be configured" Metrics.

### 3.7 Generate Metrics dialog and async flow

#### Route and access

- Route: same page.
- The user clicks "Generate Metrics" in the toolbar.

#### Purpose

The platform drafts 5 Metrics from an agent description. The user reviews the drafts and saves the chosen ones.

#### Layout

Dialog "Generate Metrics":

1. Title "Generate Metrics" and the text "Select an agent to generate 5 metrics automatically using AI."
2. "Select Agent" combobox.
3. Buttons "Cancel" and "Generate". Close button (X) at the top right.

Panel "Metric Generation" (bottom right, floating):

1. Header with a sparkle icon, the title "Metric Generation", "Minimize panel" (chevron), and "Close panel" (X).
2. A "Recent (1)" label and a "Clear all" link.
3. One task row: green check icon, "5 metrics", "just now", a "Remove task" (X) button, and a "View" button.
4. Empty text: "No recent generation tasks".

Dialog "Generated Project Metrics":

1. Title "Generated Project Metrics" and the text "Select the metrics you want to save for your project."
2. Row "Select metrics to save:" with a "Select All" checkbox at the right.
3. A scroll list of cards. Each card shows the draft name (snake_case), the full description with line breaks, and a checkbox.
4. Full-width button "Save Selected Metrics (<n>)".

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Select Agent" | combobox | project agents | first agent ("Voice Regression — E2E Deploy Agent Sq") | none seen | Picks the source agent. |
| "Cancel" | button | none | enabled | none | Closes the dialog. |
| "Generate" | button | none | enabled | Documented: the agent description needs 100 characters or more. | Starts generation. |
| "Minimize panel" | icon button | none | enabled | none | Collapses the panel (inferred). |
| "Close panel" | icon button | none | enabled | none | Hides the panel. |
| "Clear all" | link | none | enabled | none | Removes all finished tasks (inferred). |
| "Remove task" | icon button | none | enabled | none | Removes one task (inferred). |
| "View" | button | none | enabled when the task finished | none | Opens "Generated Project Metrics". |
| "Select All" | checkbox | checked, unchecked | unchecked | none | Checks every draft. |
| Draft checkbox | checkbox | checked, unchecked | unchecked | none | Selects one draft. |
| "Save Selected Metrics (<n>)" | button | n = selected count | disabled, "Save Selected Metrics (0)" | Disabled when n is 0 | Saves the selected drafts. |

#### Flows

1. Click "Generate Metrics". The dialog opens with the first agent.
2. Pick the agent (the capture picked "zz-spec-test-agent", ID 26242). Click "Generate".
3. The page calls `POST /test_framework/v1/metrics/generate_metrics/` with `{"agent_id":26242,"num_metrics":5}`. The response holds a `progress_id`.
4. The dialog closes. The "Metric Generation" panel shows the task.
5. The page polls `GET /test_framework/v1/metrics/generate_metrics_progress/?progress_id=<uuid>&agent_id=<agentId>`. The capture shows 3 polls with `"status":"queued"` and 1 poll with `"status":"completed"`.
6. The task row shows "5 metrics" with a green check. The user clicks "View".
7. The "Generated Project Metrics" dialog lists the drafts from the `metrics` array of the progress response.
8. The user checks drafts and clicks "Save Selected Metrics (<n>)". The page calls `POST /test_framework/v1/metrics/bulk_create/`.
9. The panel shows "No recent generation tasks". The list does not show the new row at once. The new row appears on the next list load (screenshot 58).

#### Backend calls

`POST /test_framework/v1/metrics/generate_metrics/` returned 200:

```json
// request
{"agent_id":26242,"num_metrics":5}
// response
{"progress_id":"4cf1fe66-620c-43d2-9036-2e7eac14c4dc"}
```

`GET /test_framework/v1/metrics/generate_metrics_progress/?progress_id=4cf1fe66-...&agent_id=26242` returned 200:

```json
{"agent_id":26242,"status":"queued","current_step":"Generating 5 critical metrics...","metrics":[],"error":null}
```

```json
{"agent_id":26242,"status":"completed","current_step":"Metrics generation completed",
 "metrics":[
   {"name":"new_appointment_booking",
    "description":"This metric measures whether the main agent successfully books a new appointment when the testing agent requests one.\n\nSuccess criteria (True):\n1. ...\n\nFailure criteria (False):\n1. ...",
    "agent":26242,"eval_type":"binary","scenarios":[]},
   "..."
 ],"error":null}
```

The 5 draft names in the capture: `new_appointment_booking`, `identity_verification_before_moving_appointment`, `appointment_move_completion`, `identity_verification_before_canceling_appointment`, `appointment_cancellation_completion`.

`POST /test_framework/v1/metrics/bulk_create/` returned 201:

```json
// request: one object per selected draft
[{"name":"new_appointment_booking","description":"This metric measures whether ...","project":"13875","eval_type":"binary"}]
// response (trimmed)
[{"id":272071,"slug":null,"project":13875,"agents":[22749,22750,22757,26242],
  "name":"new_appointment_booking","type":"llm_judge","eval_type":"binary_workflow_adherence",
  "observability_enabled":true,"simulation_enabled":true,"display_order":19,
  "evaluation_trigger":"always","trigger_type":"llm_judge","add_to_new_agents":true,"...":"..."}]
```

#### Business rules

- Generation does not save Metrics. Only `bulk_create` saves them (documented in the public API reference and seen).
- `num_metrics` is 5 in the dashboard. The API allows 1 to 100 (documented in the public API reference).
- All drafts in the capture had `eval_type: "binary"`.
- `bulk_create` sent `project` as a string ("13875"). The server accepted it.
- A saved draft becomes a Judge-form Metric with `observability_enabled: true`, `simulation_enabled: true`, and `evaluation_trigger: "always"`.
- A saved draft gets every project agent ID in `agents`, not only the source agent. The response held 4 agent IDs, 22749 and 22750 among them, which did not appear in the agent list of the page.

#### States

- Panel empty state: "No recent generation tasks".
- Task done state: green check icon, "5 metrics", "just now".
- Save button disabled state: "Save Selected Metrics (0)".

#### Not seen in the capture

- A failed generation (`status` other than `queued` or `completed`, or a non-null `error`).
- The "running" progress state, if it exists.
- The poll interval.
- An agent with a description under 100 characters, and its error text.
- A toast after save.

### 3.8 Create Metric page: Quick Mode

#### Route and access

- Route: `/create-metric?project=<projectId>`.
- The user clicks "Create Metric" on the Metrics list. Quick Mode is the default view.

#### Purpose

The user describes a Metric in plain words. The platform builds and saves the Metric.

#### Layout

1. Breadcrumb "Metrics" > "Create a Metric".
2. Header card: title "Create Metrics", subtitle "Your AI agent is Main Agent and User is Test Agent", and a mode switch "Quick Mode" (selected, dark) and "Detail Mode".
3. Quick Mode card:
   1. Heading "Quick Mode" and the text "Describe what to measure and we'll build and save the metric for you (usually 1–2 min). Switch to Detail Mode to configure everything yourself. Sample review is estimated to be ready in about 3–5 min from starting creation."
   2. "Agents *" multi-select with agent chips. Each chip has a remove icon. The field has a clear-all (X) icon and a chevron.
   3. Help text "The metric is enabled on every agent you pick. It's drafted from the first one's context."
   4. Large text area.
   5. Footer: link button "Skip to Detailed Form" and button "Generate Metric".
4. Right column: guide panel "GUIDE - CREATE A METRIC" (see 3.9 guide panel).
5. "Metric Generation" floating panel at the bottom right.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Quick Mode" | toggle button | selected, not selected | selected | none | Shows the Quick Mode card. |
| "Detail Mode" | toggle button | selected, not selected | not selected | none | Shows the full form (3.9). |
| "Agents *" | multi-select with chips | project agents | first agent | Required | The Metric runs on every picked agent. The first agent gives the context. |
| Description area | text area, placeholder "Example: Check whether the agent confirms the caller's appointment date and time before ending the call. Fail the call if it hangs up without a confirmation..." | free text | empty | none seen | The plain-language request. |
| "Skip to Detailed Form" | link button | none | enabled | none | Switches to Detail Mode (inferred). |
| "Generate Metric" | button with sparkle icon | none | disabled | Disabled while the text area is empty (inferred) | Starts the build. |

#### Flows

1. Open the page. The page calls `GET /test_framework/v2/aiagents/` and `GET /test_framework/v2/aiagents/short_list/`.
2. Type a description. Click "Generate Metric". The build call was not captured.
3. Documented behavior (documented in the public API reference): Quick Mode always builds a Python-form Metric. The build shows in the bottom-right panel. When it finishes, the panel shows "Metric created" with a link. The build takes about 1–2 minutes.

#### Not seen in the capture

- The Quick Mode build request, the progress call, the panel states, and the result.
- Any error text.

### 3.9 Create Metric page: Detail Mode

#### Route and access

- Route: `/create-metric?project=<projectId>`.
- The user clicks "Detail Mode" or "Skip to Detailed Form" on the Create Metric page.

#### Purpose

The user configures every field of a new Metric and saves it.

#### Layout

1. Breadcrumb and header card (same as 3.8). "Detail Mode" is selected.
2. Form card:
   1. Form switch "LLM Judge" (balance icon) and "Python" (code icon).
   2. Row: "Name*" and "Slug*".
   3. "Metric Type *" with an info icon, then a select.
   4. Type-specific block (see "Extra fields per Metric Type").
   5. Judge form only: "Use voice recording" card with a switch.
   6. Judge form: "Description*" block. Python form: "Custom Code (Python Only)*" block.
   7. Variable bar, transcript source note, and hint row.
   8. "Uses results from" block.
   9. "Evaluation Trigger *" block.
   10. "Apply to existing scenarios" card.
   11. "Apply to agents" collapsible card.
   12. "Automatically add to new agents" checkbox.
3. Full-width button "Create Metric".
4. Right column: guide panel "GUIDE - CREATE A METRIC".
5. Floating panels at the bottom right: "Metric Generation" and, after create, "Review <metric name>".

#### Controls: identity and type

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "LLM Judge" | toggle button | selected, not selected | selected | none | Shows the Judge form. Sets `type: "llm_judge"`. |
| "Python" | toggle button | selected, not selected | not selected | none | Shows the Python form. Sets `type: "custom_code"`. Hides "Use voice recording" and "Description*". |
| "Name*" | text box | free text, max 255 (documented) | empty | Required | Sets `name`. |
| "Slug*" | text box | snake_case text | empty | Required. Must be unique (documented). | Sets `slug`. The capture value "zzspectestmetric_vb3" looks generated from the name with a random suffix (inferred). |
| "Metric Type *" | select, placeholder "Select metric type" | "Boolean", "Rating", "Enum", "Numeric" | "Select metric type" | Required | Sets `eval_type`. Shows the extra fields of the type. |
| Info icon next to "Metric Type *" | icon | none | none | none | Shows help (inferred). Text not captured. |

#### Extra fields per Metric Type

| Metric Type | Extra controls (verbatim) | Behavior |
|---|---|---|
| "Boolean" | Card "Add to rubric rule" with a switch and the state text "No" | When on, the save adds a Rubric rule (documented: `add_to_rubric: true`, operator equals, value true). The switch is off by default. |
| "Rating" | none | none |
| "Enum" | Label "Enter the keys for the enum values*", help "You can enter values one by one or paste JSON array", button "JSON View" (code icon), button "+ Add" | "+ Add" adds one key row (inferred). "JSON View" switches to a JSON array editor (inferred). Sets `enum_values`. Required. |
| "Numeric" | none | none |

#### Controls: Judge form body

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Use voice recording" | switch in a card | on, off | off | none | Sets `audio_enabled`. Card text: "Lets the LLM judge hear tone, pace, silence, and other signals the transcript can't capture. Costs 0.3 credits per minute of audio (with the standard LLM-judge cost as the minimum) — see audio evaluation." The link "audio evaluation" opens `https://docs.example.com/documentation/key-concepts/metrics/llm-judge-metric#audio-evaluation`. |
| "Description*" | text area | free text | empty | Required | Sets `description`. Help: "These are the metrics our LLM judges will use to evaluate your call. Be as verbose as possible." Placeholder: "This metric evaluates whether the Main Agent initiates the conversation with a greeting. Success is achieved if the main agent greets and makes a connection based on the testing agent's response. Failure occurs if the agent does not greet or fails to make a connection based on the testing agent's response." |
| "Improve" | button with sparkle icon, purple outline | none | Hidden while "Description*" is empty. Shown when it has text. | Disabled after a create (screenshot 57) | Starts the "Build with AI" refine chat (documented, see "Improve" below). |

#### Controls: Python form body

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Custom Code (Python Only)*" | code editor with line numbers and an expand icon | Python source | empty, cursor at row 1 | Required | Sets `custom_code`. Help: "Write your custom evaluation logic in Python. The code will be executed in a Python environment." |
| Expand icon | icon button | none | none | none | Opens the editor in a larger view (inferred). |
| "Improve" | button | none | Seen on the Edit page of a Python Metric | none | Same as the Judge form. |
| "Learn more" | link | `https://docs.example.com/documentation/key-concepts/metrics/python-code` | none | none | Opens the docs. |

Python code contract (documented in the public API reference): the code is a script body. It reads the global dictionary `data`. It sets `_result` (the score) and `_explanation` (a string). The captured "Tool Call Success" code defines a function and ends with `_result, _explanation = all_function_calls_success(data["transcript_json"])`.

#### Variable bar

The variable bar is below the Description (Judge form) and below the code editor (Python form). It also appears below the trigger prompt. Each chip copies its text when clicked ("Click to copy" in the dialog).

| Element | Judge form (verbatim) | Python form (verbatim) |
|---|---|---|
| Link | "Available Variables" to `https://docs.example.com/documentation/key-concepts/metrics/llm-judge-available-variables` | "Available Variables" to `https://docs.example.com/documentation/key-concepts/metrics/python-metric` |
| Chips | `{{transcript}}`, `{{transcript_json}}`, `{{date}}`, `{{call_end_reason}}`, `{{agent.description}}` | `data["transcript"]`, `data["transcript_json"]`, `data["call_end_reason"]`, `data["test_profile"]` |
| More | "View More" (plus icon) opens the "Available Variables" dialog | "View More". Dialog content not captured. |
| Source note | "`{{transcript}}` currently resolves to the app's transcript for this project." | "`data["transcript"]` currently resolves to the app's transcript for this project." |
| Source help | Info button "About transcript sources" and link "Change in project settings" to `/settings/project/general` | Same |
| Hint | "Hint: Use `{{test_profile["field_name"]}}` e.g. `{{test_profile["Name"]}}` or `{{test_profile["Existing conditions"]}}`" | "Hint: Use `data["test_profile"]["field_name"]` e.g. `data["test_profile"]["Name"]` or `data["test_profile"]["Existing conditions"]`" |
| Role note | "Your AI Agent is Main Agent and User is Test Agent. Learn more" | not shown |

The source note follows the project field `use_provider_transcript` (inferred: the project had `false` and the note said "App transcript").

#### Available Variables dialog (Judge form)

Title "Available Variables". Each row shows the variable code, a description, and "Click to copy". A "Learn more" link and a "Close" button are at the bottom.

| Variable | Description (verbatim) |
|---|---|
| `{{transcript}}` | "Full conversation transcript as a string. Resolves to the app's transcript, or the provider transcript if that project setting is on" |
| `{{transcript_json}}` | "Transcript as a structured list" |
| `{{date}}` | "Date of the call in the format YYYY-MM-DD" |
| `{{call_end_reason}}` | "Call end reason as a string" |
| `{{agent.description}}` | "Description of the agent" |
| `{{agent.name}}` | "Name of the agent" |
| `{{agent.language}}` | "Agent's language code (e.g., en, es, fr)" |
| `{{agent.inbound}}` | "Whether agent handles inbound calls (true/false)" |
| `{{agent.contact_number}}` | "Agent's phone number" |
| `{{timestamp}}` | "Call's timestamp in ISO 8601 format" |
| `{{app_transcript_json}}` | "App transcript (Simulation only)" |
| `{{metadata}}` | "Additional metadata as a dictionary" |
| `{{metadata["key"]}}` | "Access specific metadata values using keys" |
| `{{dynamic_variables}}` | "Dynamic variables as a dictionary" |
| `{{test_profile}}` | "Test profile as a dictionary" |
| `{{call_duration}}` | "Call duration in seconds as an integer" |
| `{{provider_call_data}}` | "Provider call data as a dictionary" |
| `{{evaluator.instructions}}` | "Evaluator's instructions text (Simulation only)" |
| `{{evaluator.conditional_action_instructions}}` | "Evaluator's conditional action instructions; only populated for Conditional Actions evaluators (Simulation only)" |

Other documented variables (documented in the public API reference, not in the dialog):

- `{{logs}}`: provider execution logs as text.
- `{{provider_call_id}}`: provider call ID, Simulation only.
- `{{metrics.<slug>.score}}`, `{{metrics.<slug>.enum}}`, `{{metrics.<slug>.value}}`, `{{metrics.<slug>.explanation}}`, and `{{metrics["Metric Name"].score}}`: results of a Metric in "Uses results from".
- Nested access works with dots or brackets, for example `{{provider_call_data.artifact.messages}}`. The captured Custom Metric 243608 uses this form.

Python `data` keys (documented in the public API reference, not seen in the dashboard): `transcript`, `transcript_json`, `call_duration`, `call_end_reason`, `voice_recording`, `agent_description`, `date`, `timestamp`, `metadata`, `recording_data`, `logs`, `metrics`, `topic` (Observability only), `"Average Latency (in ms)"`, `latency_data`, `dynamic_variables` (Observability only), `call_log_id` (Observability only), `tags`, `provider_call_id`, `provider_call_data`, `app_transcript_json`, `test_profile`, `run_id`, `expected_outcome`, `expected_outcome_explanation` (the last eight are Simulation only). A result of another Metric is `data["<Metric Name>"]`.

#### Controls: "Uses results from"

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Add a metric" | searchable multi-select dropdown | "(Select All)", then one option per project Metric as "<id> <name>", for example "240898 AI interrupting user". A "Close" option is at the end. | none | Documented: no cycles, at most 10 prerequisites, chains of 5 levels at most | Sets `dependencies`. The picked Metrics run first. |

Help text, Judge form: "These metrics run first and their results are added to the prompt. Insert a reference to use a result at a specific place."

Help text, Python form: "These metrics run first; copy a key to read their results from the data dictionary."

The picker listed 16 Metrics in the capture, from 240898 to 272071. It includes Predefined and Custom Metrics.

#### Controls: Evaluation Trigger

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Evaluation Trigger *" | select | "Always", "Custom" | "Always" | Required | Sets `evaluation_trigger` to `always` or `custom`. |
| "Generate" | button with sparkle icon, purple outline | none | Hidden while the Description is empty. Shown when it has text. | none | Drafts a trigger prompt (inferred: `POST /test_framework/v2/metrics/generate_evaluation_trigger/`, documented, not captured). |
| "LLM Judge" (trigger) | toggle button | selected, not selected | selected | Shown only for "Custom" | Sets `trigger_type: "llm_judge"`. |
| "Python" (trigger) | toggle button | selected, not selected | not selected | Shown only for "Custom" | Sets `trigger_type: "custom_code"`. Form not captured. |
| "Evaluation Trigger Prompt*" | text area | free text | empty | Required for a "Custom" Judge trigger | Sets `evaluation_trigger_prompt`. Help: "Specify the custom prompt that determines when this metric should be evaluated". Placeholder: "Return true if the testing agent is trying to book an appointment and False otherwise." A Judge-form variable bar and hint row follow it, in both Metric forms. |

Python trigger contract (documented in the public API reference): the code reads `data` and sets `_result` (`True` runs the Metric, `False` skips it) and `_explanation`. It is stored in `evaluation_trigger_custom_code`.

#### Controls: scope and save

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Apply to existing scenarios" | switch in a card | on, off | on (captures 49 to 54) | none | Card text: "This will run the metric on all calls from your existing scenarios. Recommended when adding a new quality metric — ensures historical data is evaluated consistently." When on, the scenario list shows. |
| "Select All Scenarios" | checkbox | checked, unchecked | unchecked, "0 selected" | none | Checks every Evaluator in the list. |
| "Search scenarios" | text box | free text | empty | none | Filters the Evaluator list. |
| Scenario checkbox | checkbox per Evaluator | Evaluator names, for example "TCH appointment booking evaluator" | unchecked | none | Sets the write-only `scenarios` field (inferred from the documented field). |
| "Apply to agents" | collapsible card header | "<n> of <m> agents selected" | collapsed, "2 of 2 agents selected" | none | Opens the agent list. |
| Agent list help | text | "Choose which agents this metric is evaluated for. All agents in the project are selected by default." | none | none | none |
| "Select All", "Deselect All" | buttons | none | enabled | none | Check or clear all agents. |
| Agent checkbox | checkbox per agent | agent names | all checked | none | Sets `agents`. |
| "Automatically add to new agents" | checkbox | checked, unchecked | unchecked on the create form | none | Sets `add_to_new_agents` (inferred). See the business rule below. |
| "Create Metric" | full-width button | none | disabled | Disabled until the required fields are valid (inferred). Enabled in capture 55 with Name, Slug, Metric Type, and Description filled. | Saves the Metric. |

#### Guide panel

The right column holds "GUIDE - CREATE A METRIC" with a close button "Close guide". It shows:

1. Heading "Best Practices" and "Best practices for writing effective LLM evaluation prompts and setting up tests." with a "docs" link.
2. An embedded video titled "Building Good Metrics" (7:25).
3. "1. Define Roles Clearly": "Your prompt should reference your AI Agent as Main Agent and the other party as Testing Agent." Example box: "Ex: This metric passes if the main agent asks for date of birth from the testing agent".
4. "2. Explicitly Define Success Criteria": "Your metric text should mention what classifies as success or failure explicitly." Example box: "This metric fails if the Main Agent is unable to book an appointment for the testing agent".
5. "3. Add Trigger": "If you need the metric to only run in certain cases, add a prompt based trigger." Example: "Metric prompt - This metric fails if the Main Agent is unable to book an appointment for the testing agent" and "Trigger - Only when the testing agent is looking to book an appointment".
6. "4. Utilize Variables": "Reference the available variables in your prompt to provide specific, structured data to the LLM judge. Click the buttons in the main form to copy them."

#### "Improve" button

The captures show the button but not the click. The documented flow (documented in the public API reference) is:

1. The user writes a first description or first code.
2. The user clicks "Improve" and picks an agent.
3. A builder chat asks questions or shows a refined definition.
4. The builder shows a diff. The user clicks "Use this metric" to copy the result into the form.
5. The user clicks "Create" or "Update" to save.

A detailed build needs 10 or more Calls or Runs. With fewer, it runs as a quick build. A detailed build takes 5–12 minutes.

#### Flows

1. Click "Detail Mode". The page calls these two APIs:
   1. `GET /test_framework/v2/metrics/?project_id=13875&ql={id,name,slug,type,vocera_defined_metric_code,simulation_enabled,observability_enabled}` for the "Uses results from" picker.
   2. `GET /test_framework/v1/scenarios/?project_id=13875&page_size=100&ql={id,name}` for the scenario list.
2. Pick "LLM Judge" or "Python". No API call.
3. Type "Name*" and "Slug*". Pick "Metric Type *". No API call.
4. Type the description or the code. The "Improve" and "Generate" buttons appear.
5. Optional: pick dependency Metrics, a "Custom" trigger, scenarios, and agents.
6. Click "Create Metric". The page calls `POST /test_framework/v2/metrics/`.
7. After the 201 response, the page calls these two APIs:
   1. `GET /test_framework/v2/metrics/` (picker field selection) to refresh the picker.
   2. `POST /test_framework/v1/metrics/{id}/pattern-review/` with `{}` to start the sample review.
8. The page stays on `/create-metric`. The "Metric Type" select returns to "Select metric type". "Name*", "Slug*", and "Description*" keep their values. "Create Metric" becomes disabled.
9. The floating panel "Review <metric name>" appears with the button "Review sample labels". The page polls `GET /test_framework/v1/metrics/pattern-reviews/{reviewId}/` (see 3.10).

#### Backend calls

`POST /test_framework/v2/metrics/` returned 201:

```json
// request
{"type":"llm_judge","name":"zz-spec-test-metric","slug":"zzspectestmetric_vb3",
 "description":"This metric passes if the main agent confirms the name and phone number of the testing agent before it changes a booking. It fails otherwise. Test metric for a specification.",
 "eval_type":"binary","prompt_enabled":false,"audio_enabled":false,
 "evaluation_trigger":"always","evaluation_trigger_prompt":"","trigger_type":"llm_judge",
 "custom_code":"","agents":[22757,26242],"project":13875}
// response (trimmed)
{"id":272072,"slug":"zzspectestmetric_vb3","project":13875,"agents":[22757,26242],
 "name":"zz-spec-test-metric","type":"llm_judge","eval_type":"binary",
 "observability_enabled":true,"simulation_enabled":true,"display_order":20,
 "metric_description_program":{"generate":{"lm":null,"demos":[],"train":[],"traces":[],
   "signature":{"fields":[],"instructions":"This metric passes if ..."}}},
 "evaluation_trigger_program":{"generate":{"...":"...","signature":{"fields":[
   {"prefix":"Transcript Json:","description":"Conversation transcript"},
   {"prefix":"Call End Reason:","description":"Conversation cut reason"},
   {"prefix":"Explanation:","description":"List of concise relevant explanatory points about the decision with timestamps in MM:SS format"},
   {"prefix":"Is Relevant:","description":"True if the metric is relevant to the conversation, false otherwise"}],
   "instructions":""}}},
 "add_to_new_agents":true,"dependency_warnings":[],"...":"..."}
```

`GET /test_framework/v1/scenarios/?project_id=13875&page_size=100&ql={id,name}` returned 200:

```json
{"count":8,"next":null,"previous":null,"results":[{"id":340454,"name":"TCH appointment data update evaluator","is_simulating":false},"..."]}
```

Documented create body variants (documented in the public API reference):

```json
{"project":1376,"name":"Call resolution outcome","description":"Classify how the call ended ...",
 "type":"llm_judge","eval_type":"enum","enum_values":["resolved","transferred","dropped"],"observability_enabled":true}
```

```json
{"name":"Agent greeted the customer","description":"Check if the agent greeted the customer ...",
 "project":42,"type":"llm_judge","eval_type":"binary","evaluation_trigger":"always","add_to_rubric":true}
```

A 400 response is an object of field names to error string arrays, `{"<field_name>":["..."]}` (documented in the public API reference).

#### States

- Empty form: "Create Metric" disabled. "Improve" and the trigger "Generate" are hidden.
- Filled form: "Create Metric" enabled (dark).
- After create: "Create Metric" disabled, "Improve" disabled, "Review <name>" panel shown.
- Python form: "Use voice recording" and "Description*" are hidden. "Custom Code (Python Only)*" shows.

#### Business rules

- The request omitted `add_to_new_agents`, while the checkbox was unchecked. The server returned `add_to_new_agents: true`. A rebuild must send the checkbox value explicitly, or the server default (true) applies (inferred).
- The request omitted `observability_enabled` and `simulation_enabled`. The server set both to `true`.
- The request sent `prompt_enabled: false`. This field does not appear in the response or in the documented schema.
- The request omitted `scenarios` because "Apply to existing scenarios" was off in that capture.
- The request omitted `add_to_rubric` because the switch was off.
- The voice recording cost is 0.3 credits per minute of audio. The standard judge cost is the minimum charge.
- A dependency with no result makes the dependent Metric unscored. The documented label is "Input not scored".

#### Not seen in the capture

- Validation error texts (empty name, duplicate slug, empty Enum keys, invalid code).
- The Enum key editor after "+ Add" and the "JSON View" editor.
- The Python trigger editor.
- A dependency after selection, and the reference insertion in the text.
- The "About transcript sources" text and the "Metric Type" info text.
- The "Improve" chat and the trigger "Generate" call.
- A create request with `scenarios`, `audio_enabled: true`, `enum_values`, `dependencies`, or `add_to_rubric`.
- A create toast.

### 3.10 Sample-label review flow

#### Route and access

- Route: `/create-metric/review/<reviewId>?project=<projectId>`, for example `/create-metric/review/923?project=13875`.
- The user clicks "Review sample labels" in the floating panel "Review <metric name>". The panel shows on every page after a create (Metrics list, Edit Metric, Labs, Rubric).

#### Purpose

The platform labels sample Calls and Runs with the new Metric. The user reviews the labels to correct the Metric.

#### Layout

1. Floating panel: sparkle icon, title "Review <metric name>", close (X), full-width dark button "Review sample labels".
2. Review page: breadcrumb "Metrics" > "Review the metric", then one card.
3. Card in the insufficient-history state: "<metric name> is ready." and "There are not enough recent calls or runs to review it against yet. It will start scoring new calls as they come in." Buttons "Done" (dark) and "Open the metric".

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Review sample labels" | button | none | enabled | none | Opens the review page. |
| Panel close | icon button | none | enabled | none | Hides the panel (inferred). |
| "Done" | button | none | enabled | none | Leaves the review (inferred: back to the Metrics list). |
| "Open the metric" | button | none | enabled | none | Opens the Metric (inferred: `/metrics/edit/<id>`). |

#### Flows

1. "Create Metric" succeeds. The page calls `POST /test_framework/v1/metrics/{id}/pattern-review/` with `{}`. The response gives `review_id` and `progress_id`, with `status: "pending"` and `stage: "sampling"`.
2. The page polls `GET /test_framework/v1/metrics/pattern-reviews/{reviewId}/?ql={id,status,stage,round_index,error,metric{id,name},eval_set,optimizer}`. The capture saw `status: "running"` with `stage: "sampling"`, then `status: "ready"` with `stage: ""`.
3. The poll continues on other pages. One poll on the Metrics list, the Edit page, and the Rubric page returned 401 `{"detail":"Invalid token"}`. The next poll returned 200.
4. The user clicks "Review sample labels". The review page calls `GET /test_framework/v1/metrics/pattern-reviews/{reviewId}/` with the full field selection.
5. The response has `insufficient_history: true` and `counts.total_count: 0`. The page shows the insufficient-history card.

#### Backend calls

`POST /test_framework/v1/metrics/272072/pattern-review/` returned 200:

```json
// request
{}
// response
{"review_id":923,"progress_id":"f5f70b53-4389-4620-b161-fdd9294a8e38",
 "review":{"id":923,"project_id":13875,"status":"pending","stage":"sampling","round_index":0,
  "insufficient_history":false,"error":"","progress_id":"f5f70b53-...",
  "metric":{"id":272072,"name":"zz-spec-test-metric","slug":"zzspectestmetric_vb3","description":"...",
   "custom_code":"","type":"llm_judge","eval_type":"binary","enum_values":[],"evaluation_trigger":"always"},
  "counts":{},"patterns":[],"corrections":{},"last_rebuild":null,
  "eval_set":{"corrections":0,"confirmations":0,"test_set_ids":[]},"optimizer":null,
  "created_at":"2026-10-23T19:30:58.111312Z","updated_at":"2026-10-23T19:30:58.117079Z"}}
```

`GET /test_framework/v1/metrics/pattern-reviews/923/?ql={id,project_id,status,stage,round_index,insufficient_history,error,progress_id,metric{id,name,slug,description,custom_code,type,eval_type,enum_values,evaluation_trigger},counts,patterns,corrections,last_rebuild,eval_set,optimizer,created_at,updated_at}` returned 200:

```json
{"id":923,"project_id":13875,"status":"ready","stage":"","round_index":0,"insufficient_history":true,
 "error":"","progress_id":"f5f70b53-...","metric":{"id":272072,"name":"zz-spec-test-metric","...":"..."},
 "counts":{"total_count":0},"patterns":[],"corrections":{},"last_rebuild":null,
 "eval_set":{"corrections":0,"confirmations":0,"test_set_ids":[]},"optimizer":null,
 "created_at":"2026-10-23T19:30:58.111312Z","updated_at":"2026-10-23T19:30:59.479414Z"}
```

Observed `status` values: `pending`, `running`, `ready`. Observed `stage` values: `sampling`, empty.

#### Business rules

- The review starts automatically after each Judge-form create.
- The Quick Mode text says that the review is ready in about 3–5 minutes. The capture project had no Calls or Runs, so the review was ready in about 1 second with `insufficient_history: true`.

#### Not seen in the capture

- The review page with sample labels, `patterns`, and `corrections`.
- The label correction controls and their API calls.
- Any `error` value.
- The `optimizer` object.
- The review after a bulk create or a Predefined Metric copy. No review started in those flows.

### 3.11 Edit Metric page and Change History

#### Route and access

- Route: `/metrics/edit/<metricId>?project=<projectId>`.
- The user clicks the pencil in the "Action" column of the Metrics list.

#### Purpose

The user changes a saved Metric and compares saved versions.

#### Layout

1. Breadcrumb "Metrics" > "Edit Metric".
2. Left column:
   1. Header card "Edit Metric" with "Your AI agent is Main Agent and User is Test Agent".
   2. Form card with the same fields as the Detail Mode form (3.9), filled from the Metric.
   3. Full-width button "Update Metric".
3. Right column:
   1. Card "Change History" with "<n> records" or "1 record".
   2. Card "Compare Versions", shown when 2 or more records exist (inferred from the 1-record capture).

Fields on the Edit page that differ from the create form:

- No "Quick Mode" or "Detail Mode" switch.
- No "Apply to existing scenarios" card and no "Apply to agents" card.
- No "Add to rubric rule" card, even for a "Boolean" Metric.
- "Automatically add to new agents" checkbox shows the saved value (checked in both captures).
- The Python Metric "Tool Call Success" shows no "Uses results from" block. The Judge Metric 272072 shows it.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Form fields | as 3.9 | as 3.9 | saved values | as 3.9 | Edit the Metric. |
| "Update Metric" | full-width button | none | disabled | Disabled while nothing changed (inferred) | Saves the changes (inferred: `PATCH /test_framework/v2/metrics/{id}/`). |
| Version chip, for example "v2" | button | version IDs | none | none | Selects the version (inferred). |
| "Current" | green tag | none | on the newest version | none | Marks the live version. |
| Version "..." | icon button | menu | none | none | Opens version actions. Menu not captured. |
| "From…" | select | versions | "From…" | none | First version to compare. |
| "To…" | select | versions | "To…" | none | Second version to compare. |
| "Compare" | button | none | disabled | Disabled until both versions are picked | Shows the difference. Result not captured. |

Each history entry shows the version chip, the "Current" tag on the newest entry, the user name ("Automaton"), the date as "Sep 3, 2026 · 03:30 PM", and "Initial version" on v1. The empty compare state text is "Select two versions and click Compare."

#### Flows

1. Open the page. The page calls these APIs:
   1. `GET /test_framework/v2/metrics/{id}/`.
   2. `GET /test_framework/v2/aiagents/short_list/?project_id=<projectId>&ql={id,agent_name,language,agent_gives_first_message}`.
   3. `GET /test_framework/v1/metrics/{id}/history/?page=1&page_size=14`.
   4. For a Judge Metric: `GET /test_framework/v2/metrics/?project_id=<projectId>&ql={id,name,slug,type,vocera_defined_metric_code,simulation_enabled,observability_enabled}` for the dependency picker.
2. Change a field. "Update Metric" becomes enabled (inferred).
3. Click "Update Metric". Not captured.
4. Pick two versions and click "Compare". Not captured.

#### Backend calls

`GET /test_framework/v1/metrics/240906/history/?page=1&page_size=14` returned 200 (trimmed):

```json
{"count":2,"next":null,"previous":null,"results":[
  {"history_id":5759283,"history_date":"2026-09-03T13:30:06.604608Z","history_type":"~",
   "history_change_reason":null,
   "history_user":{"id":9855,"name":"Automaton","email":"<user-email>"},
   "version_id":"v2","version_name":null,"agents_snapshot":[],
   "id":240906,"name":"Tool Call Success","type":"custom_code","eval_type":"binary",
   "custom_code":"def all_function_calls_success(transcript_json): ...","...":"..."},
  "..."]}
```

`history_type` values seen: `+` (created, v1 of Metric 272072) and `~` (changed, v2 of Metric 240906). A history record holds a full copy of the Metric fields, plus `llm_provider` and `relevance_llm_provider`.

#### Not seen in the capture

- The update request, its response, and any toast.
- The version "..." menu (for example restore or rename), and the compare result.
- History pagination beyond 14 records.
- The Edit page of a Predefined Metric with a disabled pencil.

### 3.12 Labs list

#### Route and access

- Route: `/labs?project=<projectId>`.
- The user opens it from the sidebar link "Labs" in the "General" group.

#### Purpose

The page says "Optimization Labs let you iteratively refine a metric's definition against real results, tuning its description and triggers until it scores conversations the way you intend." A "Learn more" link opens `https://docs.example.com/documentation/guides/creating-good-metric#step-5-optimization-labs`.

#### Layout

1. Title "Labs" and the description with "Learn more".
2. Table with columns "ID", "Metric Name", "Type", "Description", "Overall score". Each row is a bordered card row.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "ID" | bold text | Metric ID | none | none | Read only. |
| "Metric Name" | bold text | Metric name | none | none | Read only. |
| "Type" | grey text | "Boolean", "Numeric", "Rating", "Enum" | none | none | Shows the Metric Type label. |
| "Description" | text | Metric description, cut to about 250 characters with "..." | none | none | Read only. |
| "Overall score" | text | "<overall_score>/<total_score>", for example "0/0" | none | none | Read only. |
| Row | clickable row (inferred) | none | none | none | Opens `/labs/edit/<metricId>`. |

Rows in the capture: 240898, 240901, 240903, 240904, 240905, 240906, 243607, 243608, 243609.

#### Backend calls

`GET /test_framework/v2/metrics/?project_id=13875&include_scores=true&ql={id,name,type,description,function_name,eval_type,enum_values,vocera_defined_metric_code,overall_score,total_score}` returned 200 (trimmed):

```json
[{"id":240898,"name":"AI interrupting user","description":"Tells if the AI (main agent) ...",
  "function_name":"get_main_agent_interruption","type":"custom_code","eval_type":"numeric",
  "enum_values":[],"vocera_defined_metric_code":"ec29cab5","overall_score":0,"total_score":0,
  "user_defined":false},"..."]
```

#### Business rules

- The Labs list leaves out 240899, 240900, 240902, 240907, and 240908. The API returned them. The page filters them out (inferred). These are the same Metrics with a disabled pencil on the Metrics list.

#### Not seen in the capture

- An empty Labs list.
- A row with a score other than "0/0".
- The rule that filters rows.

### 3.13 Labs metric editor

#### Route and access

- Route: `/labs/edit/<metricId>`, for example `/labs/edit/272072`. The capture URL had no `project` parameter.
- The user clicks a row on the Labs list (inferred).

#### Purpose

The user edits the Metric definition, runs it against reviewed Calls and Runs, and sees the agreement score.

#### Layout

1. Header row: back arrow button, Metric name heading (for example "zz-spec-test-metric"), the type label below it ("Boolean"), a red warning chip, and the buttons "Auto Improve", "Save", and "Run" (dark).
2. Tabs "LLM Judge" and "Python".
3. Judge tab panel: variable bar (with `{{agent.name}}` as a sixth chip), a text area, and a "Variables used:" row.
4. "Evaluation Trigger" block with the text "Choose when this metric should be evaluated" and a select.
5. Heading "Overall Score : <overall>/<total>" at the right.
6. Review table.
7. Right column: "Change History" card (same as 3.11).

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Back arrow | icon button | none | enabled | none | Returns to the Labs list (inferred). |
| Warning chip | text | "You need at least 1 review to auto improve" | shown with 0 reviews | none | Explains the disabled "Auto Improve". |
| "Auto Improve" | button with wand icon | none | disabled | Needs 1 review or more | Proposes a better definition (inferred). |
| "Save" | button with disk icon | none | disabled | Disabled while nothing changed (inferred) | Saves the definition (inferred: `PATCH /test_framework/v2/metrics/{id}/`). |
| "Run" | button with play icon | none | enabled | none | Runs the Metric against the reviewed rows (inferred: `POST /test_framework/v2/metrics/{id}/run_reviews/` then `GET /test_framework/v2/metrics/run_reviews_progress/`, documented). |
| "LLM Judge" tab | tab | selected, not selected | selected for a Judge Metric | none | Shows the description editor. |
| "Python" tab | tab | selected, not selected | not selected | none | Shows the code editor (inferred). Not captured. |
| Description editor | text area, placeholder "Enter LLM Judge description..." | free text | saved description | none | Edits `description`. |
| "Variables used:" | chips | for example `{{transcript_json}}`, `{{call_end_reason}}` | computed | none | Lists the variables that the judge reads. The capture listed these two although the text named none (inferred: default inputs). |
| "Evaluation Trigger" | select | "Always", "Custom" (inferred from 3.9) | "Always" | none | Edits `evaluation_trigger`. |
| Review table header checkbox | checkbox | none | unchecked | none | Selects all review rows (inferred). |

Review table columns: checkbox, "ID", "Recording", "Expected Value", "Actual Value", "Explanation", "Notes".

#### Flows

1. Open the editor. The page calls these APIs:
   1. `GET /test_framework/v2/aiagents/`.
   2. `GET /test_framework/v2/metrics/{id}/`.
   3. `GET /test_framework/v1/metrics/{id}/history/?page=1&page_size=14`.
2. Edit the text. "Save" becomes enabled (inferred).
3. Click "Run". Not captured.
4. With 1 review or more, click "Auto Improve". Not captured.

Documented run options (documented in the public API reference): the run call can override `llm_provider`, `evaluation_trigger`, `evaluation_trigger_prompt`, `trigger_type`, `evaluation_trigger_custom_code`, `description`, `type`, `custom_code`, and `prompt`. `skip_save: true` runs without a save of results.

#### States

- Empty review table: header row only, no empty-state text.
- "Overall Score : 0/0" with no reviews.
- "Auto Improve" disabled with the warning chip.

#### Not seen in the capture

- Review rows, the "Recording" player, and the "Notes" editor.
- How a user adds a review row (Expected Value).
- The "Run" and "Auto Improve" calls and their progress states.
- The "Python" tab.

### 3.14 Rubric page

#### Route and access

- Route: `/rubric?project=<projectId>`.
- The user opens it from the sidebar link "Rubric" in the "General" group.

#### Purpose

The page says "Define the conditions that decide whether a conversation is marked a success or failure." A "Learn more" link opens `https://docs.example.com/documentation/key-concepts/metrics/rubric`.

#### Layout

1. Header card: list icon, title "Rubric", the description with "Learn more", and the button "Save Changes" at the right.
2. Blue info bar: "How rules are evaluated", a chip "ALL", "conditions must pass for a success", a divider, and "Conditions set to None are skipped".
3. Card "Conditions" with a count chip "<n> active" (for example "12 active").
4. One condition block per rule. Each block has three labelled fields "METRIC", "OPERATOR", "VALUE" and a trash button.
5. An "AND" chip between consecutive blocks.
6. A dashed button "Add condition" at the end.

#### Controls

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Save Changes" | button | none | disabled | Disabled while nothing changed (inferred) | Saves `rubric_config` (inferred: `PATCH /user/v1/projects/{projectId}/`). |
| "METRIC" | searchable select (opens a search box and a "Suggestions" list) | every project Metric by name | the rule Metric | none | Sets `metric_id`. |
| "OPERATOR" for a "Boolean" Metric | select | "=", "≠" | "=" | none | Sets `op` to `eq` or `neq`. |
| "OPERATOR" for a "Rating" or "Numeric" Metric | select | ">", "≥", "<", "≤", "=" | the rule operator | none | Sets `op` to `gt`, `gte`, `lt`, `lte`, or `eq`. |
| "VALUE" for a "Boolean" Metric | select | "True", "False", "None" | "True" | none | Sets `value` to `true` or `false`. "None" skips the rule. |
| "VALUE" for a "Rating" or "Numeric" Metric | number box, placeholder "Enter value..." | number, decimals allowed (for example "2.5") | the rule value | none | Sets `value`. |
| Trash button | icon button | none | enabled | none | Removes the rule. |
| "Add condition" | button | none | enabled | none | Adds an empty rule block (inferred). |

The "METRIC" list in the capture held 17 Metrics, from "AI interrupting user" to "zz-spec-test-metric".

Captured rules (12 active):

| Metric | Operator | Value |
|---|---|---|
| Expected Outcome | = | True |
| Infrastructure Issues | = | True |
| Interruption Score | ≥ | 1 |
| Latency (in ms) | ≤ | 10000 |
| Stop Time after User Interruption (ms) | ≤ | 10000 |
| Tool Call Success | = | True |
| Transcription Accuracy | ≥ | 1 |
| Unnecessary Repetition Score | ≥ | 2.5 |
| Persona Integrity | = | True |
| No Fabricated Availability | = | True |
| Confirmation Before Mutation | = | True |
| Mock tool call accuracy | = | 5 |

#### Flows

1. Open the page. The page calls these APIs:
   1. `GET /test_framework/v2/metrics/?project_id=13875&ql={id,name,type,description,function_name,eval_type,enum_values,vocera_defined_metric_code,overall_score,total_score}`.
   2. `GET /user/v1/projects/13875/`.
2. The page builds one block per entry in `rubric_config.rules`.
3. Change a field, add a block, or remove a block. "Save Changes" becomes enabled (inferred).
4. Click "Save Changes". Not captured.

#### Backend calls

`GET /user/v1/projects/13875/` returned 200. The `rubric_config` part (crawl step `38-agents-import-from-provider`, trimmed to 3 of 12 rules):

```json
"rubric_config": {
  "rules": [
    {"metric_id":240900,"conditions":{"operator":"and","conditions":[{"op":"eq","field":"score","value":5}]}},
    {"metric_id":240901,"conditions":{"operator":"and","conditions":[{"op":"eq","field":"score","value":true}]}},
    {"metric_id":240908,"conditions":{"operator":"and","conditions":[{"op":"gte","field":"score","value":2.5}]}},
    "..."
  ],
  "evaluation_logic": "and"
}
```

Full rule list in the capture: 240900 `eq 5`, 240901 `eq true`, 240902 `gte 1`, 240903 `lte 10000`, 240904 `lte 10000`, 240906 `eq true`, 240907 `gte 1`, 240908 `gte 2.5`, 243607 `eq true`, 243608 `eq true`, 243609 `eq true`, 272059 `eq 5`.

Documented rule shapes (documented in the public API reference):

| Metric kind | `field` | `op` values | `value` |
|---|---|---|---|
| Numeric or score Metric (Rating scores use 0–5) | `"score"` | `gt`, `gte`, `lt`, `lte`, `eq` | number |
| Boolean Metric, or `evaluate_expected_outcome` | `"score"` | `eq`, `neq` | `true` or `false`. Legacy `5` (pass) and `0` (fail) are still accepted. |
| Enum Metric | `"enum"` | `eq`, `neq`, `in` | string, or a list of strings for `in`. Must match `enum_values`. |

#### Business rules

- All rules must pass for a success. `evaluation_logic` must be `"and"`. The info bar says "ALL conditions must pass for a success".
- A rule set to "None" is skipped. A rule whose Metric has no value on a call is skipped. If every rule is skipped, the result is success (documented in the public API reference).
- A Metric without a rule does not change success or failure (documented in the public API reference).
- The page shows the legacy value `5` of "Expected Outcome" as "True", because that Metric counts as Boolean in the Rubric. The page shows the value `5` of "Mock tool call accuracy" (a "Rating" Metric) as the number "5".
- The rule count went from "11 active" (first pass) to "12 active". The new rule was for "Mock tool call accuracy", a Predefined Metric that the project received between the two captures. This agrees with the documented rule that Predefined Metrics get a Rubric rule automatically.
- The project PATCH must send the full merged `rubric_config`. A partial value deletes the missing rules (documented in the public API reference). `{}` clears the Rubric.
- A Metric delete (272071, 272072) did not show a Rubric change in the captures, because those Metrics had no rule.

#### States

- "Save Changes" disabled with no change.
- Empty Rubric (no rules): not seen.

#### Not seen in the capture

- The save request and its toast.
- An Enum Metric rule and the `in` operator in the dashboard.
- Validation of a rule with no Metric or no value.
- The "Add condition" result.
- What happens to a rule when its Metric is deleted.

## 4. Assistant (in-product AI assistant)

> **Out of scope.** The app does not build the Assistant. This section describes it only as a record.

The Assistant is a chat assistant inside the app. The user writes a request in plain English. The assistant reads and changes workspace data through tools, and it streams its answer back. The public docs mark the feature as "Beta".

Terms used in this section:

| Term | Meaning |
|---|---|
| Conversation | One chat thread. The backend stores it. It has an ID and a name. The sidebar calls it a "chat" or a "thread". |
| Message | One user turn that the dashboard posts to a Conversation. Each Message starts one assistant response stream. |
| Stream | The Server-Sent Events (SSE) response that carries the assistant answer for one Message. |
| Tool call | One action of the assistant, for example "List quality metrics". The dashboard shows each Tool call as a row with a duration. |
| Skill | A named set of instructions that the assistant loads for a task, for example `results-report`. |
| Question widget | A structured form that the assistant shows when it needs answers from the user. |
| Report | A shareable PDF that the assistant makes from test Results. |
| Agent runtime | The separate service at `https://assistant.example.com` that runs the assistant and serves the Stream. |

Note: in this section, "Agent" with a capital A is the voice Agent under test. "Assistant" and "the assistant" are the chat assistant.

### 4.1 Entry points

| Entry point | Where | Result |
|---|---|---|
| Left navigation link "Assistant" | Group "General", below "Rubric" | Opens `/ai-assistant?project=<project-id>`. The dashboard then shows the URL `/ai-assistant`. |
| Header button "Ask Assistant" | Top header, left of the bell, on most pages | Opens the "Ask Assistant" side panel (see 4.7). The button is not in the header on `/ai-assistant` pages. |
| Settings navigation link "Home" | Top of the settings sidebar | Opens `/ai-assistant`. So the assistant page is the "Home" target from settings. |
| Notification "Assistant needs your input" | Bell menu | Opens `/ai-assistant/<conversation-id>` (see 4.8.10). |
| Deep link | Browser | `/ai-assistant/<conversation-id>` opens one Conversation. |

### 4.2 Assistant page, welcome screen

1. Route: `/ai-assistant`. The user reaches it from the left navigation link "Assistant", or with "New chat".
2. Purpose: start a new Conversation. The screen offers six suggestion cards and a message box.

#### Layout

The page has three columns, from left to right:

1. The main dashboard navigation (shared with all pages). The link "Assistant" shows as selected.
2. The history sidebar, about 250 pixels wide (see 4.3).
3. The chat area. It contains, from top to bottom:
   1. Heading "Welcome to the Assistant" (level 2), centered.
   2. Subtitle "Ask me anything about your workspace".
   3. Label "Try asking me to". The screen shows it in upper case: "TRY ASKING ME TO".
   4. A grid of six suggestion cards, two columns and three rows.
   5. Hint "Click a suggestion or type your own question below".
   6. The message box, fixed at the bottom of the chat area (see 4.4).

Each suggestion card has an icon tile on the left, a bold title, and a grey description below it. The grid cuts a long description to one line with "…". The card border is light grey. The card background is white.

#### Suggestion cards

| Order | Icon (from screenshot) | Title | Badge | Description (verbatim, full text from the accessibility tree) | Text that the card puts in the message box |
|---|---|---|---|---|---|
| 1 | Document with chart | "Make a report" | "New" (blue) | "A shareable PDF of your test results" | Not captured. |
| 2 | Robot | "Create a new agent" | none | "Set up an AI agent for your workflow" | Not captured. |
| 3 | Gauge | "Generate 5 scenarios for my agent" | none | "Create test scenarios tailored to your agent" | Not captured. |
| 4 | Pulse line | "Run an evaluation" | none | "Test and validate your agent's performance" | Not captured. |
| 5 | Bar chart | "Show me metrics" | none | "View performance analytics and insights" | "Show me the metrics in my current project. Group them by which agent they're attached to, and highlight the ones that have recent low pass rates or haven't been run lately." |
| 6 | Lightning bolt | "Analyze recent call logs" | none | "Review conversation history and patterns" | Not captured. |

A click on a card puts the card prompt text into the message box. The click does not send the text. The dashboard makes no API call. The "Send" button becomes enabled. Evidence: capture 66.

The first message of the test Conversation was "Use the results-report skill to make a report of all my agents' test results from this week. Ask me only what you need (agents, dates, what to focus on), then build it." The crawler clicked the Reports tab suggestion "Weekly results for all agents". That click sent this text at once, with no edit step. So a Reports suggestion sends its prompt directly, and a welcome card only fills the message box. The crawler saw this behavior but did not record it.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Make a report New A shareable PDF of your test results" | Card button | – | – | – | Puts the card prompt into the message box (inferred from card 5). |
| "Create a new agent Set up an AI agent for your workflow" | Card button | – | – | – | Same as above (inferred). |
| "Generate 5 scenarios for my agent Create test scenarios tailored to your agent" | Card button | – | – | – | Same as above (inferred). |
| "Run an evaluation Test and validate your agent's performance" | Card button | – | – | – | Same as above (inferred). |
| "Show me metrics View performance analytics and insights" | Card button | – | – | – | Puts the text in the table above into the message box. |
| "Analyze recent call logs Review conversation history and patterns" | Card button | – | – | – | Same as above (inferred). |
| Message box and its buttons | See 4.4 | | | | |

#### Flows

1. The user opens `/ai-assistant?project=13875`.
   - The dashboard calls `GET /app/v2/product-chat/reports/?limit=50`.
   - The dashboard calls `GET /test_framework/v2/results/?page=1&page_size=1&ql={id,name,agent,agent_name,agent_version,status,success_rate,run_as_text,run_type,scenarios,total_runs_count,completed_runs_count,created_at}&project_id=13875`. The purpose of this call is not shown. It may check if the project has any Result for the "Make a report" flow (inferred).
   - The global calls also run: `GET /app/v2/product-chat/conversations/?limit=50`, `GET /app/v2/product-chat/conversations/pending-optimizer-count/`, and `GET /observability/v1/agent-improvement-sessions/...` (see 4.8.9).
2. The user clicks a card. No backend call.
3. The user sends the text. See 4.4 and 4.8.4.

#### Backend calls

`GET https://backend.example.com/app/v2/product-chat/reports/?limit=50` → 200

```json
[]
```

`GET https://backend.example.com/test_framework/v2/results/?page=1&page_size=1&ql={...}&project_id=13875` → 200

```json
{"next":null,"previous":null,"results":[]}
```

#### States

| State | What the screen shows |
|---|---|
| No Conversation selected | The welcome screen. The history list shows a "Today" group with one row "New chat". This row is the unsaved new Conversation. The backend has no record for it yet. |
| After a Conversation delete | The dashboard returns to the welcome screen at `/ai-assistant` (capture 142). |

#### Not seen in the capture

- The prompt text of cards 1, 2, 3, 4, and 6.
- A loading state of the welcome screen.
- An error state of the welcome screen.

### 4.3 History sidebar

1. Route: part of `/ai-assistant` and `/ai-assistant/<conversation-id>`.
2. Purpose: start a new Conversation, open an old Conversation, and open Reports.

#### Layout

From top to bottom:

1. Button "New chat" with a pencil icon. A "Hide sidebar" icon button sits at the top right corner of the sidebar.
2. Tab list "History", vertical, with two tabs:
   - "Chats" (speech-bubble icon). Selected by default.
   - "Reports" (document icon) with a blue "New" badge. Its accessible name is "Reports New".
3. A thin divider.
4. The tab panel.

Chats tab panel:

- A date group label, for example "Today".
- One row for each Conversation. The row shows the Conversation name, cut with "…". The selected row has a light grey background.
- On hover or selection, the row shows a "…" button "Thread actions".
- A Conversation that waits for an answer shows a red dot instead of the "…" button. Its accessible status text is "Waiting for your answer".

Reports tab panel (empty state):

- Bold line "Make your first report".
- Text "The agent turns test results into a report you can share as a PDF."
- Three link-style buttons, each with a right arrow:
  1. "Weekly results for all agents"
  2. "Compare this week with last week"
  3. "Why calls failed yesterday"

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "New chat" | Button | – | – | – | Opens the welcome screen at `/ai-assistant` (inferred from the welcome state). No backend call until the first send. |
| "Hide sidebar" | Toggle icon button | expanded / collapsed | expanded (`[expanded]` in the accessibility tree) | – | Hides the history sidebar. The collapsed state was not captured. |
| "Chats" | Tab | – | selected | – | Shows the Conversation list. |
| "Reports New" | Tab | – | not selected | – | Shows the Report list. Calls `GET /app/v2/product-chat/reports/?limit=50`. |
| Conversation row | Button | Conversation name | – | – | Opens `/ai-assistant/<conversation-id>`. |
| "Thread actions" | Icon button "…" | Opens a menu | – | – | Shows the menu "Thread actions". |
| "Delete" | Menu item, red, with a trash icon | – | – | – | Deletes the Conversation. Calls `DELETE /app/v1/product-chat/sessions/<conversation-id>/`. |
| "Weekly results for all agents" | Button | – | – | – | Sends this Message at once: "Use the results-report skill to make a report of all my agents' test results from this week. Ask me only what you need (agents, dates, what to focus on), then build it." It creates a new Conversation and opens `/ai-assistant/<conversation-id>`. |
| "Compare this week with last week" | Button | – | – | – | Same as above (inferred). |
| "Why calls failed yesterday" | Button | – | – | – | Same as above (inferred). |

#### Flows

Delete a Conversation:

1. The user hovers the Conversation row. The user clicks "Thread actions".
2. The menu "Thread actions" opens with one item, "Delete".
3. The user clicks "Delete".
4. The dashboard calls `DELETE https://backend.example.com/app/v1/product-chat/sessions/60fcfa97-d396-434a-8048-e7ba80b8da17/` → 200, body `{"status":"deleted"}`.
5. The row disappears. The dashboard shows the welcome screen at `/ai-assistant`.

Note: the delete path uses `v1` and the word `sessions`. The other Conversation calls use `v2` and `conversations`. The same ID works for both.

Open the Reports tab:

1. The user clicks "Reports New".
2. The dashboard calls `GET /app/v2/product-chat/reports/?limit=50` → 200 `[]`. The capture shows this call two times.
3. The panel shows the empty state.

#### States

| State | Text |
|---|---|
| Reports, empty | "Make your first report" / "The agent turns test results into a report you can share as a PDF." |
| Conversation waits for an answer | Red dot on the row. Status "Waiting for your answer". The left navigation link "Assistant" shows a red count badge "1". |

#### Not seen in the capture

- A confirm dialog before "Delete". The capture shows no dialog between the click and the `DELETE` call.
- A toast after "Delete".
- Rename, pin, or share items in "Thread actions". The menu shows "Delete" only.
- A Report list with data. The shape of one Report object.
- Date groups other than "Today".
- The collapsed sidebar.
- Search in the history.

### 4.4 Message box

1. Route: the bottom of `/ai-assistant`, of `/ai-assistant/<conversation-id>`, and of the "Ask Assistant" side panel.
2. Purpose: write a Message, attach files, and send.

#### Layout

A rounded box with a light border. From top to bottom:

1. A multi-line text box.
2. A bottom row with a round "+" button on the left and a round send button (arrow up) on the right. The send button is grey when it is disabled.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Message Assistant" | Multi-line text box | Placeholder: "Ask anything about your workspace, or type / for commands…" | empty | – | "/" as the first character loads the slash command list. |
| "Add files (TXT,MD,CSV,JSON,YAML,YML,XML,PDF,XLSX,PNG,JPG,JPEG,GIF,WEBP) • Max 5 files • 2MB each" | Icon button "+" | File types: TXT, MD, CSV, JSON, YAML, YML, XML, PDF, XLSX, PNG, JPG, JPEG, GIF, WEBP | no files | "Max 5 files", "2MB each" (from the button label). The error text for a broken rule was not captured. | Opens a file picker (inferred). |
| "Send (Enter) · New line (Shift+Enter)" | Icon button, arrow up | – | disabled | Disabled when the text box is empty. | Sends the Message. Enter also sends. Shift+Enter adds a new line. |

#### Slash commands

1. The user types "/" in the empty text box.
2. The dashboard calls `GET https://backend.example.com/app/v1/product-chat/commands/` → 200.

```json
{"commands":[],"cached_at":null}
```

3. The list is empty, so no menu opens. The "Send" button becomes enabled because the text box is not empty.

The shape of one command object was not captured. The field `cached_at` suggests that the backend caches the list (inferred).

#### Send rules

- The "Send" button is disabled when the text box is empty. It is enabled when the text box has text, also for "/" only.
- Enter sends. Shift+Enter makes a new line. Source: the button label.
- After a send, the dashboard clears the text box. The "Send" button becomes disabled again (captures 71 and 72).
- While a Question widget is open, the message box is not on the screen (captures 68 to 70).
- The first send in a new chat creates the Conversation first. See 4.8.4.

#### Not seen in the capture

- The file picker and the attachment chips.
- The error texts for a file type, a file size, or a file count that is not allowed.
- The upload call for an attachment. The `messages` request body in the capture has no attachment field.
- A slash command menu with items.
- A "Stop" button during a Stream. The public docs say that a "Stop" button exists (see 4.11).

### 4.5 Conversation page

1. Route: `/ai-assistant/<conversation-id>`. The conversation ID has the form `60fcfa97-d396-434a-8048-e7ba80b8da17`. The user reaches it after the first send, from a history row, or from a notification.
2. Purpose: show one Conversation with its user Messages, the assistant thinking, the Tool calls, and the answers.

#### Layout

The chat area has these regions, from top to bottom:

1. Header bar:
   - Left: the Conversation name, cut with "…", for example "Use the results-report skill to make a report…".
   - Right: button "Share" with a share icon.
2. Message list. It scrolls. Each turn has:
   1. The user Message: a grey rounded bubble, right-aligned, plain text.
   2. The thinking block: a button "Thought for X.Xs" with a sparkle icon and a down chevron.
   3. Tool-call rows, one row for each Tool call or group (see below).
   4. The assistant text, left-aligned, no bubble, rendered from Markdown.
   5. A row of three icon buttons below the assistant text. They have no accessible name. The icons look like copy, flag, and download. Their functions were not tested (inferred: copy text, give feedback, download).
3. Floating round button "Scroll to bottom" with a down arrow. It shows when the list is not at the bottom.
4. The message box (see 4.4), or the Question widget (see 4.6) when a question is open.

#### Tool-call rows

| Element | Look | Example (verbatim) |
|---|---|---|
| Single tool row | Wrench icon, bold display name, grey monospace chip with the duration | "List AI voice agents" + "0.39s" |
| Skill start row | Same look as a tool row | "Record Skill Start: results-report" + "0.34s" |
| Grouped row | Chevron, display name, chip "×3", chip with the total duration | "List test results" + "×3" + "1.2s" |
| Group expanded | Indented children. Each child has a small label "#1", "#2", "#3" above it and its own duration | "#1" "List test results" "0.41s", "#2" "List test results" "0.39s", "#3" "List test results" "0.38s" |
| Tool output expanded | A chevron points down. Below the row, a bordered box with a scroll bar shows the raw tool output in monospace text | The output of "List AI voice agents" is a JSON string with escaped quotes: `"{\"count\":2,\"next\":null,\"previous\":null,\"results\":[{\"id\":22757,\"name\":\"Voice Regression — E2E Deploy Agent Sq\", ...` The text ends with "…". |

Rules seen:

- Consecutive calls of the same tool show as one grouped row with "×N". Three calls of "List test results" became one row "×3".
- The grouped row shows a total time "1.2s". The three child times are 0.41, 0.39, and 0.38 seconds.
- A single row shows the time with two decimals, for example `duration_ms` 523 shows as "0.52s".
- A click on a row toggles the output box (capture 69).
- The output box shows the `output_preview` value from the Stream. The runtime cuts a long preview and ends it with "…" (inferred from the "…" at the end of the text).

#### Thinking block

- Label: "Thought for 0.0s" or "Thought for 1.3s". One decimal.
- The block is collapsed by default. A click expands it (inferred from the chevron). The expanded state was not captured.
- The block shows the `thinking_delta` text of the Stream (inferred).
- "Thought for 0.0s" showed for a turn whose Stream had a `thinking_delta` event. So the timer source is not clear.

#### Assistant text

- The text is Markdown. The capture shows paragraphs, **bold** (`**zz-spec-test-agent**`), and *emphasis* (`*scenarios*`).
- The dashboard builds the text from `text_delta` events while the Stream runs. At the end it uses `assistant_complete.full_content` (inferred).

#### Header "Share"

- A click on "Share" was captured (capture 73). The screenshot shows the button with a focus border only. No dialog appears in the accessibility tree. No API call was recorded.
- The Conversation object has the fields `is_owner`, `is_shared`, and `owner` (see 4.8.3). So sharing with other members probably exists (inferred).

#### Waiting state

When the assistant waits for answers in a Question widget:

- The history row shows a red dot and the status "Waiting for your answer".
- The left navigation link "Assistant" shows a red badge "1".
- The bell in the header shows a new notification (see 4.8.10).

After the user sends the answers, all three markers go away (captures 71 and 72).

#### Flows

Send a follow-up Message in an existing Conversation (capture 72):

1. The user types "List the metrics attached to agent zz-spec-test-agent. Read only. Do not create or run anything."
2. The user presses Enter.
3. The dashboard calls `POST /app/v2/product-chat/conversations/<conversation-id>/messages/` → 201. The response has `message_id`, `stream_url`, and `stream_token`.
4. The dashboard opens the Stream at `https://assistant.example.com/agent/v1/stream/<message_id>?token=<stream_token>`.
5. The dashboard shows the user bubble, then the thinking block, the tool row "List quality metrics 0.52s", and the answer text, while events arrive.
6. The Stream ends with `done`. The "Send" button is disabled until the user types again.

#### Not seen in the capture

- The Share dialog, its options, and its API calls.
- The expanded thinking block.
- The functions of the three icon buttons under each answer.
- A failed tool row (`is_error: true`).
- A Stream error, a network loss, or a reconnect.
- A Report card or a PDF download link in a Conversation.
- The write confirmation that the public docs describe (see 4.11).
- The page load of an old Conversation from history. The call that loads past Messages was not captured.

### 4.6 Question widget

1. Route: inside `/ai-assistant/<conversation-id>`.
2. Purpose: collect one or more structured answers from the user. The assistant then continues.

#### Layout

The widget replaces the message box at the bottom of the chat area. From top to bottom:

1. A header line: "Question 1 of 2", then progress dots. The current dot is filled. The other dots are hollow.
2. Header buttons: "Back" (from question 2), "Skip", "Skip all" (question 1 only), and "Exit".
3. A card with:
   1. The question text.
   2. The options. Each option is a full-width row with a number in a circle, for example "1 Yes" and "2 No". The selected or focused option has a dark border and a filled number circle.
   3. A text box with the placeholder "Or type your own answer…".
   4. A button "Send answer".

#### Questions in the capture

| Question | Text (verbatim) | Options (verbatim) | Header buttons |
|---|---|---|---|
| 1 of 2 | "No test results exist yet — would you like to test one of your agents from scratch (generate evaluators and run simulated calls) instead, then report on those results?" | "1 Yes", "2 No" | "Skip", "Skip all", "Exit" |
| 2 of 2 | "If yes, which agent should I test?" | "1 Voice Regression — E2E Deploy Agent Sq", "2 zz-spec-test-agent" | "Back", "Skip", "Exit" |

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Option row, for example "1 Yes" | Button | The options of the question | none selected | – | Selects the option. On question 1, a click on "2 No" moved the widget to question 2. |
| "Or type your own answer…" | Text box | Free text | empty | – | Gives a free-text answer instead of an option. |
| "Send answer" | Button | – | disabled | Disabled when no option is selected and the text box is empty. | On the last question, sends all answers as one Message. |
| "Back" | Button | – | – | – | Returns to the previous question. Seen on question 2 only. |
| "Skip" | Button | – | – | – | Skips the current question (inferred). |
| "Skip all" | Button | – | – | – | Skips all remaining questions (inferred). Seen on question 1 only. |
| "Exit" | Button | – | – | – | Closes the widget without answers (inferred). |

The numbers on the options suggest keyboard keys 1, 2, … for a selection (inferred).

#### Flow: answer and send

1. The assistant ends its turn with a question set. The widget shows "Question 1 of 2".
2. The user clicks "2 No". The widget shows "Question 2 of 2".
3. The user types "Neither. Do not run anything. Stop here." in "Or type your own answer…".
4. The user clicks "Send answer".
5. The dashboard calls `POST /app/v2/product-chat/conversations/<conversation-id>/messages/` with one Message that holds all answers:

```json
{
  "message": "No test results exist yet — would you like to test one of your agents from scratch (generate evaluators and run simulated calls) instead, then report on those results? — No\nIf yes, which agent should I test? — Neither. Do not run anything. Stop here.",
  "project_id": 13875
}
```

6. The response is 201 with `message_id`, `stream_url`, and `stream_token`.
7. The dashboard opens the Stream. The widget closes. The message box comes back.
8. The user bubble shows the questions and answers as one text.

Answer format rule (observed): one line for each question. Each line is `<question text> — <answer>`. The separator is a space, an em dash, and a space. A newline `\n` joins the lines. The answer is the option label without its number, or the free text.

#### Not seen in the capture

- The Stream event that carries the question set. The Stream for the first Message was not recorded, and the websocket capture files `66b-assistant-websocket.json` and `68b-assistant-websocket.json` are empty (`[]`).
- The answer text for a skipped question.
- The result of "Skip all" and "Exit".
- A question with multiple selection.

### 4.7 "Ask Assistant" side panel

1. Route: any page that shows the header button "Ask Assistant", for example `/agents?project=13875&page=1&pageSize=30`. The panel does not change the URL.
2. Purpose: use the assistant next to the current page.

#### Layout

The header button "Ask Assistant" is purple with a sparkle icon. It sits left of the bell. A click opens a panel on the right side of the window, about 420 pixels wide. The page content stays visible on the left.

From top to bottom:

1. Panel header:
   - Left: sparkle icon, text "New chat", and an up-down chevron. The chevron suggests a Conversation picker (inferred).
   - Right: "+" button "New conversation", an expand icon link "Open in Assistant" (to `/ai-assistant`), and an "X" button "Close".
2. Heading "Welcome to the Assistant" and the subtitle "Ask me anything about your workspace".
3. Label "TRY ASKING ME TO".
4. The six suggestion cards in one column. Here the descriptions show in full.
5. The message box (see 4.4). It has no "Click a suggestion or type your own question below" hint.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Ask Assistant" | Header button | – | – | – | Opens the side panel. |
| "New chat" | Button with chevron | – | "New chat" | – | Probably lists Conversations to switch (inferred). |
| "New conversation" | Icon button "+" | – | – | – | Starts a new Conversation in the panel (inferred). |
| "Open in Assistant" | Icon link | `/ai-assistant` | – | – | Opens the full assistant page. |
| "Close" | Icon button "X" | – | – | – | Closes the panel. |
| Six suggestion cards | Card buttons | Same as 4.2 | – | – | Same as 4.2 (inferred). |
| Message box | See 4.4 | | | | |

#### Backend calls

No call was recorded when the panel opened.

#### Not seen in the capture

- A Conversation inside the panel.
- If "Open in Assistant" keeps the current Conversation.
- The content of the "New chat" picker.
- The `page_context` value that the panel may send. The Conversation object has a `page_context` field, empty (`{}`) in the capture. The panel may fill it with the current page (inferred).

### 4.8 Backend protocol

#### 4.8.1 Hosts

| Host | Role |
|---|---|
| `https://backend.example.com` | Product API. It stores Conversations, Messages, Reports, skills, and servers. It creates the Stream token. |
| `https://assistant.example.com` | Agent runtime. It serves the Stream for each Message. |

The dashboard sends the normal dashboard session credentials to the product API. The Stream call carries the Stream token in the `token` query parameter instead.

#### 4.8.2 Endpoint list

| Method | Path | Status seen | Purpose |
|---|---|---|---|
| GET | `/app/v2/product-chat/conversations/?limit=50` | 200 | List Conversations for the history. Called on every page. |
| POST | `/app/v2/product-chat/conversations/` | 201 | Create a Conversation. |
| GET | `/app/v2/product-chat/conversations/<id>/status/` | 200 | Read the active Message and the workflow state. |
| GET | `/app/v2/product-chat/conversations/<id>/stream-token/` | 409 | Get a token to join a Stream that runs now. |
| POST | `/app/v2/product-chat/conversations/<id>/messages/` | 201 | Send a Message. Returns the Stream URL and token. |
| GET | `https://assistant.example.com/agent/v1/stream/<message_id>?token=<jwt>` | 200 | The Server-Sent Events (SSE) Stream. |
| GET | `/app/v2/product-chat/conversations/pending-optimizer-count/` | 200 | Count of pending optimizer items. Called on every page. |
| GET | `/app/v2/product-chat/reports/?limit=50` | 200 | List Reports. |
| GET | `/app/v2/product-chat/org-skills/` | 200 | List organization custom skills. |
| GET | `/app/v2/product-chat/org-mcp-servers/` | 200 | List organization Model Context Protocol (MCP) servers. |
| GET | `/app/v1/product-chat/commands/` | 200 | List slash commands. |
| GET | `/app/v2/product-chat/project-knowledge/instructions/?project_id=<id>` | 200 | Read the project knowledge instructions. |
| DELETE | `/app/v1/product-chat/sessions/<id>/` | 200 | Delete a Conversation. |
| GET | `/observability/v1/agent-improvement-sessions/?project=<id>&ql=...` | 200 | List "Improve Agent" sessions. Called on every page. |
| GET | `/github/connection/` | 200 | Read the GitHub connection state. Called when a Conversation opens. Purpose not shown. |

The public API reference does not document the `/app/v2/product-chat/...` paths. An unauthenticated call to `/app/v2/product-chat/conversations/` returns 403 `{"detail":"Authentication credentials were not provided."}` (source: the public API reference).

#### 4.8.3 Conversations

Create:

`POST https://backend.example.com/app/v2/product-chat/conversations/` → 201

```json
{"name":"Use the results-report skill to make a report","project_id":13875}
```

```json
{
  "id": "60fcfa97-d396-434a-8048-e7ba80b8da17",
  "name": "Use the results-report skill to make a report",
  "source": "web",
  "updated_at": "2026-10-23T19:37:53.039736Z",
  "mode": "general",
  "workflow_id": "",
  "workflow_variant": "",
  "improvement_session_id": null,
  "improvement_session_project_id": null,
  "page_context": {},
  "active_status": null,
  "optimizer_question_pending": false,
  "optimizer_review_pending": false,
  "optimizer_run_active": false,
  "owner": {"id": 9855, "name": "Automaton", "email": "<user-email>"},
  "is_owner": true,
  "is_shared": false,
  "organization": 7868,
  "organization_name": "example-org"
}
```

Name rule: the dashboard makes the name from the first Message. The Message started with "Use the results-report skill to make a report of …". The name is "Use the results-report skill to make a report", 45 characters. The next word would make it 48 characters. So the rule is probably "cut at 50 characters, at a word boundary" (inferred).

Field notes:

| Field | Observed value | Note |
|---|---|---|
| `source` | `"web"` | Other sources may exist, for example Slack (inferred). |
| `mode` | `"general"` | Other modes may exist for "Improve Agent" sessions (inferred). |
| `workflow_id`, `workflow_variant` | `""` | A Conversation can run a named workflow (inferred). |
| `improvement_session_id`, `improvement_session_project_id` | `null` | Links a Conversation to an "Improve Agent" session (see 4.8.9). |
| `active_status` | `null` | Status of a running Message (inferred). |
| `optimizer_question_pending`, `optimizer_review_pending`, `optimizer_run_active` | `false` | Flags for optimizer workflows. |
| `is_owner`, `is_shared`, `owner` | `true`, `false`, the user | Sharing data. |

List:

`GET https://backend.example.com/app/v2/product-chat/conversations/?limit=50` → 200 `[]`. The list was empty in the first pass. The item shape was not captured. It is probably the same as the create response (inferred).

Status:

`GET https://backend.example.com/app/v2/product-chat/conversations/<id>/status/` → 200

```json
{
  "conversation_id": "60fcfa97-d396-434a-8048-e7ba80b8da17",
  "active_message": null,
  "workflow_id": "",
  "workflow_variant": "",
  "workflow_state": {},
  "page_context": {}
}
```

Stream token:

`GET https://backend.example.com/app/v2/product-chat/conversations/<id>/stream-token/` → 409

```json
{"detail":"No response is currently streaming in this conversation.","code":"no_active_stream"}
```

The success response was not captured. The dashboard probably uses this call to join a Stream that is still running after a page reload (inferred).

Delete:

`DELETE https://backend.example.com/app/v1/product-chat/sessions/<id>/` → 200

```json
{"status":"deleted"}
```

#### 4.8.4 Send a Message

`POST https://backend.example.com/app/v2/product-chat/conversations/<id>/messages/` → 201

```json
{"message":"List the metrics attached to agent zz-spec-test-agent. Read only. Do not create or run anything.","project_id":13875}
```

```json
{
  "message_id": "3793a3ec-1f1b-4f03-abc3-c068a72d9ef3",
  "stream_url": "https://assistant.example.com/agent/v1/stream/3793a3ec-1f1b-4f03-abc3-c068a72d9ef3",
  "stream_token": "<redacted-jwt>"
}
```

Call order for the first Message of a new chat (capture 68, in the recorded order):

1. `GET /app/v2/product-chat/reports/?limit=50` → 200 `[]` (two times).
2. `GET /github/connection/` → 200 `{"connected":false}`.
3. `GET /app/v2/product-chat/org-skills/` → 200 `[]`.
4. `GET /app/v2/product-chat/org-mcp-servers/` → 200 `[]`.
5. `POST /app/v2/product-chat/conversations/` → 201. The body has `name` and `project_id`.
6. The URL changes to `/ai-assistant/<new-id>`.
7. `GET /app/v2/product-chat/conversations/<new-id>/stream-token/` → 409 `no_active_stream`.
8. `GET /app/v2/product-chat/conversations/<new-id>/status/` → 200.
9. `POST /app/v2/product-chat/conversations/<new-id>/messages/` → 201.
10. `GET https://assistant.example.com/agent/v1/stream/<message_id>?token=<stream_token>`. This Stream was not recorded for the first Message.

Call order for a later Message (captures 71 and 72):

1. `POST /app/v2/product-chat/conversations/<id>/messages/` → 201.
2. `GET https://assistant.example.com/agent/v1/stream/<message_id>?token=<stream_token>` → 200, content type event stream.

Every Message body carries `project_id`. So the assistant works in the selected project.

#### 4.8.5 The Stream

Request: `GET https://assistant.example.com/agent/v1/stream/<message_id>?token=<jwt>`. The browser opens it as an `EventSource` (capture type `eventsource`). An `EventSource` cannot send custom headers, so the token goes in the query string (inferred).

Wire format: standard Server-Sent Events (SSE). The first line is `retry: 3000`. Each event has three lines, `id:`, `event:`, and `data:`, and an empty line after it. The `data:` value is one JSON object.

- `retry: 3000` tells the browser to wait 3,000 milliseconds before a reconnect.
- `id:` is an integer. It starts at 0 and increases. Some numbers are missing. In the Stream of capture 71, IDs 1 and 11 are missing. In the Stream of capture 72, IDs 1, 6, 9, 33, and 36 are missing. The missing IDs are probably events that the runtime does not send to the browser (inferred). A reconnect can send `Last-Event-ID` to resume (inferred).

Event types seen:

| Event | `data` payload | Meaning |
|---|---|---|
| `status` | `{}` | A status change. It came first (ID 0) and again before `assistant_complete`. The payload was always empty in the capture. |
| `thinking_delta` | `{"content":"<text>"}` | A piece of the assistant thinking. Append it to the thinking block. |
| `text_delta` | `{"content":"<text>"}` | A piece of the visible answer. Append it to the answer text. |
| `text_replace` | `{"content":"<text>"}` | Replace the visible answer text of the current segment with `content`. The capture shows `""`, which clears it. |
| `tool_use_start` | `{"name","raw_name","input","tool_use_id","display_name"}` | A Tool call starts. Add a tool row. |
| `tool_use_complete` | `{"tool_use_id","name","raw_name","output_preview","is_error","duration_ms"}` | A Tool call ends. Add the duration and the output to the row with the same `tool_use_id`. |
| `assistant_complete` | `{"full_content":"<markdown>"}` | The final answer text for the turn. |
| `done` | `{}` | The Stream ends. Close the connection. |

Example `tool_use_start`:

```json
{
  "name": "metrics_list",
  "raw_name": "mcp__app__metrics_list",
  "input": {"agent_id": 26242},
  "tool_use_id": "call_82f659b553e84fa89f5c2853",
  "display_name": "List quality metrics"
}
```

Example `tool_use_complete`:

```json
{
  "tool_use_id": "call_82f659b553e84fa89f5c2853",
  "name": "metrics_list",
  "raw_name": "mcp__app__metrics_list",
  "output_preview": "\"[]\\n\\n[mcp_call_id: call_9d3e066cedbc4f5e]\"",
  "is_error": false,
  "duration_ms": 523
}
```

The `output_preview` is a JSON-encoded string. The tool result `[]` is followed by a trailer `[mcp_call_id: <id>]`. The trailer is a trace ID from the app's Model Context Protocol (MCP) server (inferred).

Full Stream with no tool (capture 71, answer to the Question widget):

```text
retry: 3000

id: 0
event: status
data: {}

id: 2
event: thinking_delta
data: {"content":"User declined. Just acknowledge and stop."}

id: 3
event: text_delta
data: {"content":"Under"}

id: 4
event: text_delta
data: {"content":"stood — nothing run, nothing created. The summary"}

...

id: 8
event: text_delta
data: {"content":" report then."}

id: 9
event: status
data: {}

id: 10
event: assistant_complete
data: {"full_content":"Understood — nothing run, nothing created. The summary stands as-is: this project has no test results yet for either agent, so there was nothing to report. Whenever you do have results, I can build the weekly report then."}

id: 12
event: done
data: {}
```

Stream with one tool (capture 72), events in order:

| ID | Event | Data (trimmed) |
|---|---|---|
| 0 | `status` | `{}` |
| 2–5 | `text_delta` | "Metrics", " attach to scenarios, not agents, but metrics_list", "(agent_id) returns metrics accessible to that agent", ". Call it." |
| 7 | `tool_use_start` | `metrics_list`, input `{"agent_id":26242}`, display "List quality metrics" |
| 8 | `tool_use_complete` | `duration_ms` 523, `is_error` false |
| 10 | `thinking_delta` | "Metrics attach to scenarios, not agents, but metrics_list(agent_id) returns metrics accessible to that agent. Call it." |
| 11 | `text_replace` | `""` |
| 12–22 | `thinking_delta` | "Empty. Note metrics attach to scenarios — maybe check" … ", and agent-level list is empty. Keep short." |
| 23–31 | `text_delta` | "\n\nThere" … " was created or run — this was read-only." |
| 32 | `status` | `{}` |
| 34 | `thinking_delta` | The same text as ID 10 again |
| 35 | `assistant_complete` | `full_content`: "There are no metrics associated with **zz-spec-test-agent** (id 26242) — the metric list for it is empty.\n\nOne thing worth knowing: …" |
| 37 | `done` | `{}` |

Client rendering rules (observed in the data, the effect on the screen is inferred where marked):

1. Text that the model writes before a Tool call first arrives as `text_delta`. After the Tool call, the runtime sends the same text as `thinking_delta` and then `text_replace` with `""`. So the client moves this text from the answer into the thinking block. The final screen shows only the post-tool text as the answer.
2. `assistant_complete.full_content` holds only the final answer. It does not hold the pre-tool text. It does not start with the `"\n\n"` of the first post-tool `text_delta`.
3. Tool rows show in the order of `tool_use_start`. The client matches `tool_use_complete` by `tool_use_id`.
4. Consecutive Tool calls with the same `display_name` form one group row "×N" (inferred from the screen. The grouped Stream was not recorded).
5. The thinking block label "Thought for X.Xs" uses one decimal. The source of the time was not identified.

Encoding note: the crawl record shows "â€”" where the screen shows "—". This is a capture decoding fault. The Stream is UTF-8. Treat "â€”" as "—".

#### 4.8.6 Stream token claims

The token value is redacted in all capture files. Before redaction, the capture showed these claims in the decoded JSON Web Token (JWT) payload:

| Claim | Value |
|---|---|
| `iss` | `"app-backend"` |
| `aud` | `"assistant-runtime"` |
| `message_id` | The `message_id` of the Message |
| `conversation_id` | The Conversation ID |
| `user_id` | The user ID |
| `organization_id` | The organization ID |
| `iat`, `exp` | Issue time and expiry time. In both captured tokens, `exp` minus `iat` was 900 seconds (15 minutes). |

The token header was `{"alg":"HS256","typ":"JWT"}`. So the backend and the agent runtime share one secret key (inferred). The token is valid for one Message only (inferred from the `message_id` claim).

#### 4.8.7 Tool names

- `raw_name` has the form `mcp__<server>__<tool>`. For the app's tools the server part is `app`, for example `mcp__app__metrics_list`.
- `name` is the tool part only, for example `metrics_list`.
- So the assistant calls the tools of the app's Model Context Protocol (MCP) server. The public server is `https://api.example.com/mcp` (source: the public API reference).
- `display_name` is a readable label. The runtime sends it.

Tool display names seen:

| Display name (verbatim) | `raw_name` | Evidence |
|---|---|---|
| "List quality metrics" | `mcp__app__metrics_list` | Stream, capture 72 |
| "List AI voice agents" | Not captured. Probably `mcp__app__aiagents_list` (inferred). | Screen. The output is the Agent list JSON. |
| "List test results" | Not captured. Probably a results list tool (inferred). | Screen |
| "Record Skill Start: results-report" | Not captured | Screen. A built-in tool that records the start of a Skill (inferred). |

The public API reference says that 248 of 297 operations have an `x-mcp-tool-name`, for example `aiagents_list`. It says that 185 operations have `x-mcp-expose: true`. The hosted Model Context Protocol (MCP) server probably has one tool for each exposed operation (inferred in the public API reference).

#### 4.8.8 Reports, skills, servers, commands

| Call | Response seen |
|---|---|
| `GET /app/v2/product-chat/reports/?limit=50` | 200 `[]` |
| `GET /app/v2/product-chat/org-skills/` | 200 `[]` |
| `GET /app/v2/product-chat/org-mcp-servers/` | 200 `[]` |
| `GET /app/v1/product-chat/commands/` | 200 `{"commands":[],"cached_at":null}` |

All lists were empty. The item shapes were not captured.

#### 4.8.9 Global calls on every page

The first-pass capture shows these calls on most of the 20 main pages, also on pages without the assistant. The conversation list call appears 21 times and the count call 18 times:

`GET /app/v2/product-chat/conversations/?limit=50` → 200 `[]`

`GET /app/v2/product-chat/conversations/pending-optimizer-count/` → 200

```json
{"count":0}
```

`GET /observability/v1/agent-improvement-sessions/?project=13875&ql={id,status,project,agent,conversation_id,created_at,metric_delta}` → 200 `[]`

The `ql` value is URL-encoded in the request: `%7Bid%2Cstatus%2Cproject%2Cagent%2Cconversation_id%2Ccreated_at%2Cmetric_delta%7D`.

The public API reference describes agent improvement sessions as "Improve Agent" sessions. The quote: "It validates a VAPI / ElevenLabs provider key and opens Claude Agent SDK runs in product chat." Each session has a `conversation_id`. Its `status` is one of `pending`, `running`, `succeeded`, `failed`, `no_improvement`, `cancelled`. Its `stage` is one of `setup`, `scenario_generation`, `reproduce`, `force`, `baseline_run`, `propose`, `apply`, `verify_run`, `finalize`. Its `stage_status` is one of `running`, `waiting`, `waiting_input`, `done`, `failed`. It also has `pending_question` and `question_answers`.

So the dashboard probably polls these lists to show badges and progress for background assistant work (inferred). The red badge "1" on the navigation link "Assistant" probably comes from one of these calls (inferred). The call that fed the badge in capture 68 was not recorded.

#### 4.8.10 Notification for a question

When the assistant asks a question, the backend creates a notification (capture 126):

```json
{
  "id": 8967,
  "event_type": "agent_question",
  "title": "Assistant needs your input",
  "body": "No test results exist yet — would you...",
  "deep_link": "/ai-assistant/60fcfa97-d396-434a-8048-e7ba80b8da17",
  "severity": "success",
  "is_read": false,
  "created_at": "2026-10-23T19:38:12.746690Z"
}
```

The body is the question text, cut with "...". The deep link opens the Conversation.

#### Not seen in the capture

- The Stream of the first Message, so the event that carries the Question widget data and the event of the `results-report` skill.
- A `tool_use_complete` with `is_error: true`.
- A Stream error event, a reconnect, and a `Last-Event-ID` resume.
- The success response of `stream-token`.
- The call that loads the Messages of an old Conversation.
- Any Report object, PDF file, or Report endpoint other than the list.
- Attachment upload.
- A rename of a Conversation.
- The Share calls.

### 4.9 Settings: Agent Config (organization)

> **Out of scope.** The app does not build the Assistant. This section describes it only as a record.

1. Route: `/settings/org/agent-config`. The user reaches it from Settings, group "ORGANIZATION", link "Agent Config".
2. Purpose: connect remote Model Context Protocol (MCP) servers and custom skills for the assistant of the whole organization.

#### Layout

1. Header card:
   - Heading "Agent Config" (level 1).
   - Text "Remote HTTP or SSE servers the agent can call. Each active server's tools become available in chat; credentials are stored write-only."
   - Right: black button "+ Add MCP Server".
   - Two tab-style buttons: "MCP Servers" (selected, with a server icon) and "Custom Skills" (sparkle icon).
2. Content card (empty state):
   - Server icon tile.
   - Bold text "No MCP servers connected".
   - Text "Register a remote MCP server and the agent gains its tools — connect your own services over HTTP or SSE."
   - White button "+ Add MCP Server".

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Add MCP Server" (header) | Button | – | – | – | Opens a form to register a server (inferred). |
| "MCP Servers" | Tab button | – | selected | – | Shows the server list. |
| "Custom Skills" | Tab button | – | not selected | – | Shows the skill list (inferred). Not clicked in the capture. |
| "Add MCP Server" (empty state) | Button | – | – | – | Same as the header button (inferred). |

#### Backend calls

`GET https://backend.example.com/app/v2/product-chat/org-mcp-servers/` → 200 `[]`

#### Business rules

- Transport: HTTP or Server-Sent Events (SSE). Source: the page text.
- Only active servers give tools to the chat. Source: "Each active server's tools become available in chat".
- Credentials are write-only. The API never returns them. Source: "credentials are stored write-only".
- The public docs say that custom skills are scoped to the organization. Every member can see the active list. A skill source is a single file, a GitHub repository URL, or an uploaded archive (`.zip` or `.tar.gz`). The actions are enable, disable, delete, and re-sync a GitHub source.

#### Not seen in the capture

- The "Add MCP Server" form, its fields, and its create call.
- The "Custom Skills" tab content and its calls.
- A server row or a skill row.
- The tool name prefix for an organization server. It is probably `mcp__<server-name>__<tool>` (inferred from `mcp__app__...`).

### 4.10 Settings: Agent Knowledge (project)

1. Route: `/settings/project/agent-knowledge`. The user reaches it from Settings, group "PROJECT", link "Agent Knowledge".
2. Purpose: store project rules that every improvement run must obey before it proposes a change.

#### Layout

1. Header card:
   - Heading "Agent knowledge" (level 1).
   - Text "What every improvement run in this project must know before it proposes a change — wording you have to keep, an escalation path, a tone. Saved as a new version each time, so you can read back what changed."
   - Right: button "Version history" (clock icon) and button "Save instructions" (grey when disabled).
2. Editor card:
   - Tabs "Write" (selected) and "Preview".
   - A large monospace text area. It can be resized from the bottom right corner.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Write" | Tab | – | selected | – | Shows the text area. |
| "Preview" | Tab | – | – | – | Shows the rendered Markdown (inferred). |
| Instructions | Text area | Placeholder: "One rule per line. For example:\n\n- Never remove or shorten the recording disclaimer.\n- Offer a human agent after two failed attempts.\n- Keep the greeting under fifteen words." | empty | – | Holds the rules. |
| "Save instructions" | Button | – | disabled | Disabled when the text is the same as the saved text (inferred from the empty state). | Saves a new version (from the page text). |
| "Version history" | Button | – | – | – | Shows old versions (inferred). |

#### Backend calls

`GET https://backend.example.com/app/v2/product-chat/project-knowledge/instructions/?project_id=13875` → 200

```json
{"content":"","exists":false}
```

#### Business rules

- Each save makes a new version. Source: "Saved as a new version each time".
- The rules apply to "every improvement run in this project". These runs are the "Improve Agent" sessions that run in product chat (see 4.8.9) (inferred).

#### Not seen in the capture

- The save call and its body.
- The "Version history" view and its call.
- The "Preview" tab.
- If the normal chat also reads these instructions.

### 4.11 What the public docs say

Source: the public API reference, docs page `https://docs.example.com/documentation/guides/assistant`, and the Model Context Protocol (MCP) server pages.

| Topic | Docs statement | Agreement with the capture |
|---|---|---|
| Status | "Assistant" is in Beta. It calls the app's APIs and skills for the user. | Agrees. |
| Location | Left sidebar, under "General". URL `/ai-assistant`. | Agrees. |
| Capabilities | Create or update agents, generate scenarios, design and preview metrics, start test runs, explore agents, scenarios, metrics, calls, and results. | Agrees with the six cards. |
| Write confirmation | Before any write, the assistant shows the exact tool name and parameters, for example `scenarios_create` with `agent_id: 42`. The user replies "yes" or "no". An update shows a diff of each field (`old value → new value`). | Not seen. The capture had read-only requests. |
| Suggestion cards | "Four quick-action suggestion cards". | The capture shows six cards. The docs are older. |
| Clarifying questions | Inline. | Agrees with the Question widget. |
| History | Left pane. A trash icon deletes a session. | The capture shows "Thread actions" > "Delete". |
| Stop | A "Stop" button. After a stop, the user message and the partial response stay. | Not seen. |
| Attachments | 5 files for each message, 2 MB for each file. Formats `.txt`, `.md`, `.csv`, `.json`, `.yaml`, `.yml`, `.xml`. PDF, image, and audio files are not supported. | The capture allows more types: PDF, XLSX, PNG, JPG, JPEG, GIF, WEBP. The docs are older. |
| Context | About the last 40,000 characters of chat history go into each request. | Not checkable. |
| Idle | A session idles out after 10 minutes with no activity. A new session starts on the next message. The history stays. | Not checkable. |
| Limits | No delete operations (agents, scenarios, metrics, call logs, cron jobs, projects, test profiles). No dashboard or widget create, update, or delete. | Not checked. |
| Custom skills | Organization scope. Sources: single file, GitHub repository URL, `.zip` or `.tar.gz` archive. Actions: enable, disable, delete, re-sync. | The "Custom Skills" tab exists. Content not seen. |
| Known issue | If the user expands "Additional Configuration" when the assistant generates evaluators, the evaluators get no `end_call` tool, and runs stall. | Not checked. |
| Public server | `https://api.example.com/mcp` (United States, default), `https://api.in.example.com/mcp` (India), `https://api.eu.example.com/mcp` (European Union). HTTP transport. Authentication with Open Authorization (OAuth) bearer token or `X-API-KEY`. | The assistant tools use the server name `app`. |
| Public skills | `npx skills add example/app-skills --all`. | The skill `results-report` shows in the chat. It may come from this set (inferred). |
| Improve Agent | The `agent-improvement-sessions` create call "opens Claude Agent SDK runs in product chat". | The `mcp__<server>__<tool>` names match the Claude Agent Software Development Kit (SDK) naming (inferred). |

### 4.12 Design notes for a rebuild

This subsection describes what a rebuild must do. Items marked "(inferred)" come from the protocol shape, not from a direct observation.

#### Services

1. Keep two services. The product API stores Conversations, Messages, events, Reports, skills, and servers. The Agent runtime runs the model loop and serves the Stream.
2. On each Message, the product API stores the Message, creates a `message_id`, and signs a short-lived JSON Web Token (JWT). Use the claims `iss` = `app-backend`, `aud` = `assistant-runtime`, `message_id`, `conversation_id`, `user_id`, `organization_id`.
3. The product API returns `message_id`, `stream_url`, and `stream_token` with status 201.
4. The Agent runtime checks the token signature, the audience, and that `message_id` in the token equals the path value. (inferred)
5. The Agent runtime keeps the events of each Message with increasing integer IDs. It replays them after a reconnect with `Last-Event-ID`. (inferred)
6. The product API exposes `stream-token` to let a reloaded page join a running Stream. Return 409 with `{"detail":"No response is currently streaming in this conversation.","code":"no_active_stream"}` when no Stream runs.

#### Agent loop (inferred)

1. Build the model input from the system prompt, the loaded Skills, the project knowledge, and about the last 40,000 characters of history.
2. Call the Large Language Model (LLM) with the tool list.
3. Stream thinking as `thinking_delta` and text as `text_delta`.
4. When the model calls a tool, send `tool_use_start`. Run the tool. Send `tool_use_complete` with `duration_ms`, `is_error`, and a cut `output_preview`.
5. After a tool call, send the text written before the call as `thinking_delta`. Then send `text_replace` with `""`.
6. Repeat from step 2 until the model stops.
7. Send `status`, then `assistant_complete` with the final Markdown, then `done`.
8. Store the final answer and the tool trace with the Message, so the history can render it again.

#### Tools (inferred)

| Tool group | What it does | Naming |
|---|---|---|
| Product tools | Wrap the product API: list and create Agents, Evaluators (scenarios), Metrics, Results, Calls, and Runs. Use the public operations with `x-mcp-expose: true`. | `mcp__app__<operation>`, for example `mcp__app__metrics_list` |
| Organization servers | Tools of each active server from "Agent Config". Send the write-only credentials from the server side only. | `mcp__<server>__<tool>` |
| Skill start | Records which Skill the assistant uses. Display name "Record Skill Start: <skill-name>". | Not captured |
| Question tool | Ends the turn with a question set. Each question has text and options. The dashboard shows the Question widget. The backend sets a waiting state and creates a notification with `event_type` `agent_question`. | Not captured |
| Report tool | Builds a Report from Results and renders it to PDF. Stores it so `GET /app/v2/product-chat/reports/` lists it. | Not captured |
| Write confirmation | Before a write tool runs, show the tool name and parameters, and wait for "yes" or "no" (from the docs). | – |

Give each tool a readable `display_name`. Examples: "List quality metrics", "List AI voice agents", "List test results".

Append a trace trailer `[mcp_call_id: <id>]` to each tool result, as in the capture. This step is optional.

#### Skills (inferred)

1. Ship built-in Skills, for example `results-report`.
2. Load organization Skills from "Agent Config" > "Custom Skills": a single file, a GitHub repository, or a `.zip` or `.tar.gz` archive.
3. Give the model the Skill list. Load a Skill body when the model starts it.

#### Dashboard client

1. Create the Conversation on the first send only. Name it from the first 50 characters of the Message, cut at a word boundary (inferred).
2. Send `project_id` with each create and each Message.
3. Open the Stream with an `EventSource` and the token in the query string.
4. Render events with the rules in 4.8.5.
5. Group consecutive tool rows with the same display name as "×N".
6. Send Question widget answers as one Message, one line for each question, `<question> — <answer>`, joined with `\n`.
7. Show the waiting markers: the red dot on the history row, the status "Waiting for your answer", and the red badge on "Assistant".
8. Poll `conversations/?limit=50`, `pending-optimizer-count/`, and `agent-improvement-sessions/` on every page (observed). Use them for the history and the badges (inferred).
9. Delete with `DELETE /app/v1/product-chat/sessions/<id>/`. Return `{"status":"deleted"}`.

#### Limits to enforce

| Limit | Value | Source |
|---|---|---|
| Attachments for each Message | 5 | Button label |
| Size for each attachment | 2 MB | Button label |
| Attachment types | TXT, MD, CSV, JSON, YAML, YML, XML, PDF, XLSX, PNG, JPG, JPEG, GIF, WEBP | Button label |
| History in context | About 40,000 characters | Public docs |
| Idle timeout | 10 minutes | Public docs |
| Stream reconnect wait | 3,000 milliseconds | `retry: 3000` |
| No delete tools | Agents, scenarios, metrics, call logs, cron jobs, projects, test profiles | Public docs |

## 5. Simulation: Personalities, Evaluators, Test Profiles, and Runs

This section describes the Simulation pages of the dashboard. A Personality is the simulated caller. An Evaluator is one test conversation that a Personality runs against an Agent. A Test Profile holds the data that the simulated caller and the Agent use. A Run is one execution of one Evaluator. A Result groups the Runs of one start action.

Terms used in this section:

| Term | Meaning |
|---|---|
| Evaluator | One test case. The API names it a "scenario" (paths `/scenarios/`, field `scenarios`). |
| Personality | The simulated caller: voice, language, speed, interruption level, background noise. |
| Test Profile | Key-value data for one test. It has "main agent variables" and "testing agent variables". |
| Test Agent | The simulated caller that the platform operates. The dashboard uses this name. |
| Main Agent | The Agent under test. |
| Folder | A named group of Evaluators. The API identifies a Folder by its `path`. |
| Scenario agent | The background job that turns a user prompt into Evaluator instructions. |

### 5.0 Shared conventions

- API host in the capture: `https://backend.example.com`. This section writes paths without the host.
- Every request carries the dashboard session token as a bearer token (`<redacted-jwt>`).
- Most list calls take `project_id=<project id>`. The capture uses project `13875` and organization `7868`.
- Many GET calls take a `ql` parameter. The `ql` value is a field-selection list in braces, for example `ql={id,name}`. Nested selection uses inner braces, for example `telephony{phone_number,sip_uri}`.
- Dates in tables show as `MM/DD, HH:mm`. When the record has an author, the dashboard adds the author name in parentheses, for example "10/23, 21:50 (Automaton)".
- Toasts show at the bottom right of the screen with a check icon and a close "x" button.
- Several pages call `GET /enums/` on load. The response holds every choice list. The lists that this section uses are `GenderChoices`, `InterruptionLevelChoices`, `LanguageChoices`, `VoiceModelChoices`, `VoiceProviderChoices`, `ScenarioToolChoices`, `ScenarioTypeChoices`, `CallServiceProviderChoices`, `RunStatusChoices`, and `ExecutionModeChoices`.
- Several pages call `GET /test_framework/v2/results/?page=1&page_size=1&ql={id,name,agent,agent_name,agent_version,status,success_rate,run_as_text,run_type,scenarios,total_runs_count,completed_runs_count,created_at}&project_id=<id>`. The capture returned `{"next":null,"previous":null,"results":[]}`. The purpose is not visible (inferred: the sidebar or onboarding checks for a first Result).

---

### 5.1 Personality list

#### Route and access

- Route: `/personality?project=<project id>`. After a save or a delete, the dashboard returns to `/personality?language=en`.
- Access: sidebar group "SIMULATION", item "Personality".

#### Purpose

The page lists the predefined and custom Personalities for the project. The user enables or disables each Personality for the project, forks a predefined one, or opens a custom one for edit.

#### Layout

1. Page header: title "Personality". Description: "Define the simulated caller personas your evaluators role-play, controlling tone, mood, and behavior to test how your agent handles different kinds of callers." Link "Learn more" to `https://docs.example.com/documentation/key-concepts/evaluators/personality`.
2. Toolbar row, left to right: "Search" box, Gender filter, Type filter, Language filter. On the right: "Disable All", "Enable All", "Create Personality".
3. Card grid with three columns at desktop width. Each card is one Personality.

#### Card layout

| Card part | Content | Source field |
|---|---|---|
| Title | Personality name. For a forked Personality, the title adds " - fork", for example "Normal Male - fork". | `name`, `forked_from` |
| Star icon | A yellow star shows next to the title of starred Personalities. | `is_starred` |
| "Fork" button | Shows on predefined cards only. | `organization` is `null` |
| Edit link | A pencil icon after the title. It links to `/personality/edit/<id>?project=<project id>`. It shows on custom cards only. | `organization` is not `null` |
| Enable switch | On the right of the title row. Checked means enabled for the project. | `enabled` |
| Description | One paragraph. Custom cards in the capture have an empty paragraph. | `description` |
| "ID: <n>" | Personality ID. | `id` |
| "Speaking Speed: <value>" | Values seen: "Normal" (`speed` 1.0), "Slow" (`speed` 0.8), "N/A" (`speed` null). | `speed` |
| "Interruption: <value>" | Values seen: "High", "Medium", "Low", "Off", "N/A" (null). | `interruption_level` |
| "Background Noise: <value>" | "disabled" when the value is `null` or `"off"`. "enabled" for a preset key (for example `"office"`) or a URL. | `background_noise` |
| "Accent: <value>" | For example "American", "Canadian", "Chinese", "Indian", "Spanish". Custom cards show lowercase "american". | `accent` |
| "Fork" row | A line with a fork icon and the text "Fork". It shows on custom cards that come from a fork. | `forked_from` |
| Gender chip | "Male", "Female", or "Neutral". | `gender` |
| Microphone button | Round black button on the right of the details. Purpose not captured (inferred: plays a voice sample). | `voice_id` |
| Copy button | Round outline button under the microphone button. It shows on custom cards only. Purpose not captured. | none |

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Search" | Text box | Free text | Empty | None seen | Filters the cards by text (inferred: by name). No API call seen. |
| Gender filter | Select | "All Genders", "Male", "Female", "Neutral" | "All Genders" | None | Filters cards by `gender` (inferred: on the client). |
| Type filter | Select | "All Types", "Custom", "Predefined" | "All Types" | None | "Custom" shows Personalities with an `organization`. "Predefined" shows the platform Personalities (inferred). |
| Language filter | Select | "All", "Multilingual", "Afrikaans", "Arabic", "Bengali", "Bulgarian", "Chinese Simplified", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", "French", "German", "Greek", "Gujarati", "Hindi", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Kannada", "Kazakh", "Korean", "Malay", "Malayalam", "Marathi", "Norwegian", "Polish", "Punjabi", "Portuguese", "Romanian", "Russian", "Slovak", "Spanish", "Swedish", "Thai", "Turkish", "Tagalog", "Tamil", "Telugu", "Ukrainian", "Uzbek", "Vietnamese" | "English" | None | Reloads the list with `language=<code>`. "All" sends `language=all`. Codes come from `LanguageChoices` (for example English `en`, Multilingual `multi`). |
| "Disable All" | Button with icon | none | Enabled | None | Disables all Personalities in the current language (inferred). Not clicked in the capture. |
| "Enable All" | Button, filled black | none | Enabled | None | Enables all Personalities in the current language (inferred). Not clicked in the capture. |
| "Create Personality" | Link button, filled black | none | Enabled | None | Opens `/personality/create`. |
| "Fork" | Button on a predefined card | none | Enabled | None | Creates a copy at once. See 5.2. |
| Enable switch | Switch on each card | On, Off | From `enabled` | None | Changes the enabled state for the project. The call was not captured. |
| Pencil icon | Link on a custom card | none | none | None | Opens the Edit personality page. |

#### Flows

1. The user opens the page. The dashboard calls `GET /enums/`, `GET /test_framework/v2/aiagents/short_list/`, the Results probe (see 5.0), and `GET /user/v1/projects/<id>/personalities/?language=en&ql=...`.
2. The user changes the Language filter to "All". The dashboard calls the same list with `language=all`.
3. The user clicks "Fork" on a card. See 5.2.
4. The user clicks "Create Personality". The dashboard opens the create form. See 5.3.

#### Card order

The capture shows this order (inferred rule): starred predefined Personalities first, by name. Then other predefined Personalities, by name. Then custom Personalities, newest first.

#### Backend calls

`GET /user/v1/projects/{project_id}/personalities/`

- Query: `language=en` (or `all`, or another code). `ql={id,name,description,language,accent,gender,enabled,call_service_provider,is_starred,organization,forked_from,background_noise,interruption_level,speed,provider_agent_id}`.
- Status: 200. The response is a plain array (no pagination).

```json
[
  {"id":4253,"forked_from":null,"organization":null,"name":"Interruptive (High)",
   "description":"An assertive speaker who interrupts frequently.","language":"en",
   "accent":"American","gender":"male","enabled":false,"call_service_provider":"patronus",
   "background_noise":null,"interruption_level":"high","speed":1.0,
   "provider_agent_id":"fc13243f-...","is_starred":true,"voice_id":"vocera_voice_id"},
  {"id":9650,"forked_from":null,"organization":7868,"name":"zz-spec-test-personality",
   "description":"","language":"en","accent":"american","gender":"female","enabled":true,
   "call_service_provider":"patronus","background_noise":"off","interruption_level":"off",
   "speed":1.0,"provider_agent_id":"","is_starred":false},
  "..."
]
```

`GET /test_framework/v2/aiagents/short_list/?project_id=<id>&ql={id,agent_name,language,agent_gives_first_message}`

- Status: 200.

```json
[{"id":22757,"agent_name":"Voice Regression — E2E Deploy Agent Sq","language":"en","agent_gives_first_message":null},
 {"id":26242,"agent_name":"zz-spec-test-agent","language":"en","agent_gives_first_message":null}]
```

Enable and disable calls, from the public API docs (not seen in the capture):

| Method | Path | Body |
|---|---|---|
| POST | `/user/v1/projects/{id}/enable_personalities/` | `{"personalities": [1,2,3] or "all", "language": "en"}` |
| POST | `/user/v1/projects/{id}/disable_personalities/` | `{"personalities": [1,2,3] or "all", "language": "en"}` |

#### States

- Toast after create: "Personality created successfully".
- Toast after edit: "Personality updated successfully".
- Disabled card: the switch shows grey and off.
- Empty state and loading state: not seen.

#### Business rules observed

- Predefined Personalities have `organization: null` and `is_starred` true or false. Custom Personalities have the organization ID.
- Predefined cards show "Fork" and no edit link. Custom cards show an edit link and no "Fork" button.
- All Personalities in the capture have `call_service_provider: "patronus"`.
- Predefined list items return `voice_id: "vocera_voice_id"` (a placeholder value), even when `ql` does not ask for it.

#### Not seen in the capture

- The API call of the enable switch, "Enable All", and "Disable All".
- The purpose of the microphone button and of the copy button on custom cards.
- Empty, loading, and error states.
- Whether the Search box filters on the client or on the server.

---

### 5.2 Fork a Personality

#### Route and access

- Route: stays on `/personality`.
- Access: the "Fork" button on a predefined card.

#### Purpose

Fork makes a custom copy of a predefined Personality in the project. The copy keeps every setting of the source.

#### Flows

1. The user clicks "Fork" on the card "Normal Male" (ID 693).
2. The dashboard calls `POST /test_framework/v1/personalities/693/fork/` at once. No dialog opens.
3. The dashboard reloads the list with `GET /user/v1/projects/<id>/personalities/?language=en&ql=...`.
4. The new card shows the title "Normal Male - fork", ID 9649, an edit link, a "Fork" row, and the enable switch on.

#### Backend calls

`POST /test_framework/v1/personalities/{id}/fork/`

- Status: 200.
- Request body:

```json
{"project_id":13875}
```

- Response (trimmed):

```json
{"id":9649,"forked_from":693,"organization":7868,"project":13875,"name":"Normal Male",
 "prompt":"You are a middle aged American male. ...","language":"en","accent":"American",
 "call_service_provider":"patronus","background_noise":"off","voice_model":"eleven_turbo_v2_5",
 "voice_id":"QTo0g2djh2iZ0bu7jGWt","interruption_level":null,"speed":null,
 "generation_config":null,"network_simulation":null,
 "message_plan":{"idle_timeout_seconds":10,"idle_message_max_spoken_count":3},
 "start_speaking_plan":2.5,"stop_speaking_plan":{"num_words":1,"backoff_seconds":6},
 "background_sound_volume":null,"voice_volume":null,"effective_voice_volume":1.0,
 "patronus_settings":{"transcriber":{"fallbackPlan":{"transcribers":[{"model":"scribe_v2_realtime","language":"en","provider":"11labs"}]}},
   "dial_in_support":true,"use_provider_recording":true,"calling_from_random_number_supported":true},
 "provider_agent_id":"","end_call_enabled":true}
```

#### Business rules observed

- The fork keeps the source `name`. The dashboard adds " - fork" to the card title only.
- The fork returns the full prompt and voice settings. The list call hides them on predefined Personalities.
- The fork has `provider_agent_id: ""`. After the first save, the server fills `provider_agent_id` (seen after the PATCH in 5.3).
- The new fork is enabled.

#### Not seen in the capture

- A toast after fork.
- The capture shows the Type filter on "Custom" after the fork. The capture does not show whether the dashboard sets this filter by itself.

---

### 5.3 Create personality and Edit personality form

#### Route and access

- Create route: `/personality/create?project=<id>`. Access: "Create Personality" on the list.
- Edit route: `/personality/edit/<personality id>?project=<id>`. Access: the pencil icon on a custom card.
- Breadcrumb: "Personalities" (link to `/personality`, or `/personality?language=en` on edit) > "Create personality" or "Edit personality".

#### Purpose

The form defines a custom simulated caller: identity, voice, conversation pace, background noise, and advanced timing.

#### Layout

One centered column of cards, top to bottom:

1. Header card. Create: title "Create personality", text "Configure how the Test Agent should behave and respond to users by defining a custom personality." Edit: title is the Personality name, text "Configure how the Test Agent should behave and respond to users." Both have "Learn more" to `https://docs.example.com/documentation/advanced/creating-custom-personalities`. Edit adds a "Delete" button.
2. "Identity" section: "What this personality is called and how it should behave."
3. "Voice" section: "The model, voice and delivery used to speak." Two columns: Voice Model, Voice ID. Then Volume.
4. "Conversation" section: "How the agent paces itself and which language it speaks." Two columns: Interruption Level, Language. Then Speed.
5. "Environment" section: "Ambient sound layered under the call."
6. "Advanced settings" collapsible section with a chevron. It is closed on create. It is open on edit.
7. Sticky footer: status text on the left, "Cancel" and the submit button on the right. Create shows "Fill in the required fields to continue." and "Create personality". Edit shows "All changes saved." and "Save changes".

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Personality Name*" | Text box | Free text | Empty | Required (red asterisk) | Sends `name`. |
| "Personality Prompt*" | Multi-line text box, resizable | Free text. Help: "Detailed instructions defining how the AI agent should behave, respond, and handle conversations" | Empty | Required | Sends `prompt`. |
| "Voice Model *" | Select with info icon | "Eleven Multilingual V2", "Eleven Turbo V2 5", "Eleven Flash V2 5", "Eleven V3 Conversational", "Cartesia Sonic 3.5" | "Select voice model" | Required | Sends `voice_model`: `eleven_multilingual_v2`, `eleven_turbo_v2_5`, `eleven_flash_v2_5`, `eleven_v3_conversational`, `sonic-3.5`. |
| "Voice ID *" | Text box before a model is chosen. Searchable select after a model is chosen. | Placeholder "Enter Voice ID". After model: "Type or select a voice ID". 21 options, see the voice table below. | Empty | Required | Sends `voice_id`. Each option has a "Play preview" button. |
| "Clone a voice" | Button next to the Voice ID label | none | Shows when a model is chosen (seen on edit) | None | Opens the "Clone a voice" dialog. |
| "Volume" | Slider with number box and "x" suffix. Help "0.01x to 2.00x". | 0.01 to 2.00 | "1.00" | Range 0.01 to 2.00 | Help: "How loudly the testing agent speaks. Works on every voice provider; values below 1 simulate a caller who is hard to hear." Maps to `voice_volume` (inferred). The create request with 1.00 does not send it. |
| "Interruption Level" | Select | "Off", "Low", "Medium", "High" | "Off" | None | Sends `interruption_level`: `off`, `low`, `medium`, `high`. |
| "Language *" | Select | Same list as the Language filter in 5.1, without "All" (inferred) | "Select Language" | Required | Sends `language` code. |
| "Speed" | Slider with number box and "x" suffix. Help "0.80x to 1.20x". | 0.80 to 1.20 | "1.00" | Range 0.80 to 1.20 | Sends `speed`. |
| "Background Noise" | Select | "None", "Dog Barking", "Baby Crying", "Keyboard Typing", "Coughing", "Background Printer", "Quiet Room Tone", "Air Conditioner", "Construction Site", "Busy Street Traffic", "Airport Boarding", "Inside Moving Car", "Inside Moving Train", "Public Park", "Rain and Thunder", "Windy Day", "Restaurant Ambience", "Shopping Mall", "Stadium Crowd", "Standard Hiss", "Static Radio Noise", "Fan Buzz", "Low Ship Humming", "Two People Talking", "Train Station", "Custom URL" | "None" | None seen | "None" sends `background_noise: "off"`. "Custom URL" accepts a direct audio file URL (from the public API docs). |
| "Advanced settings" | Collapsible header button | Open, closed | Closed on create, open on edit | None | Shows the advanced region. |
| "Packet Loss" | Slider with number box and "%" suffix. Help "0% to 100%". | 0 to 100 | "0" | Range 0 to 100 | Group "Network simulation": "Degrade the connection to see how the agent copes." Maps to `network_simulation.packet_loss` (inferred from the public API docs). |
| Background sound volume | Read-only message | "Choose a background noise in Environment to set its volume levels." | Shows when Background Noise is "None" | None | Group "Background sound volume": "How loud the ambient track sits under the call." Volume controls show when a noise is chosen (inferred). Maps to `background_sound_volume` `{base, reduced}` (from the public API docs). |
| "Idle Timeout (seconds)" | Number box with info icon | Placeholder "e.g. 10" | Empty on create, "10" on edit | None seen | Group "Idle message plan": "When the agent speaks up after silence." Sends `message_plan.idle_timeout_seconds`. |
| "Max Idle Prompts" | Number box with info icon | Placeholder "e.g. 3" | Empty on create, "3" on edit | None seen | Sends `message_plan.idle_message_max_spoken_count`. |
| "Start Wait Seconds" | Number box with info icon | Placeholder "e.g. 0.7" | Empty on create, "2.5" on edit | None seen | Group "Speaking plan": "How the agent takes and yields its turn." Sends `start_speaking_plan`. |
| "Num Words" | Number box with info icon | Placeholder "e.g. 3" | Empty on create, "1" on edit | None seen | Sends `stop_speaking_plan.num_words`. |
| "Voice Seconds" | Number box with info icon | Placeholder "e.g. 0.3" | Empty | None seen | Sends `stop_speaking_plan.voice_seconds` (inferred from the public API docs). |
| "Backoff Seconds" | Number box with info icon | Placeholder "e.g. 0" | Empty on create, "6" on edit | None seen | Sends `stop_speaking_plan.backoff_seconds`. |
| Advanced notice | Info text | "Invalid or incompatible combinations may cause unexpected bot behaviour. The server will reset affected fields to their default values." | Always shown in the region | none | none |
| "Cancel" | Button | none | Enabled | none | Returns to the list (inferred). |
| "Create personality" | Button, filled black | none | Enabled in the screenshot | Status text "Fill in the required fields to continue." | Sends POST. Returns to the list with a toast. |
| "Save changes" | Button | none | Enabled | Status text "All changes saved." when nothing changed | Sends PATCH. Returns to the list with a toast. |
| "Delete" | Button in the edit header | none | Enabled | No confirm dialog captured | Sends DELETE. See 5.5. |

Voice ID options seen after "Eleven Turbo V2 5" was chosen. Each row shows the name, the voice ID in a monospace font, and a "Play preview" button. The list has a "Search voices..." box.

| # | Option text | Voice ID |
|---|---|---|
| 1 | Bella - Professional, Bright, Warm | hpp4J3VqNfWAUOO0d1Us |
| 2 | Roger - Laid-Back, Casual, Resonant | CwhRBWXzGAHq8TQ4Fs17 |
| 3 | Sarah - Mature, Reassuring, Confident | EXAVITQu4vr4xnSDxMaL |
| 4 | Laura - Enthusiast, Quirky Attitude | FGY2WhTYpPnrIDTdsKH5 |
| 5 | Charlie - Deep, Confident, Energetic | IKne3meq5aSn9XLyUdCD |
| 6 | George - Warm, Captivating Storyteller | JBFqnCBsd6RMkjVDRZzb |
| 7 | Callum - Husky Trickster | N2lVS1w4EtoT3dr4eOWO |
| 8 | River - Relaxed, Neutral, Informative | SAz9YHcvj6GT2YYXdXww |
| 9 | Harry - Fierce Warrior | SOYHLrjzK2X1ezoPC6cr |
| 10 | Liam - Energetic, Social Media Creator | TX3LPaxmHKxFdv7VOQHJ |
| 11 | Alice - Clear, Engaging Educator | Xb7hH8MSUJpSbSDYk0k2 |
| 12 | Matilda - Knowledgable, Professional | XrExE9yKIg1WjnnlVkGX |
| 13 | Will - Relaxed Optimist | bIHbv24MWmeRgasZH58o |
| 14 | Jessica - Playful, Bright, Warm | cgSgspJ2msm6clMCkdW9 |
| 15 | Eric - Smooth, Trustworthy | cjVigY5qzO86Huf0OWal |
| 16 | Chris - Charming, Down-to-Earth | iP95p4xoKVk53GoZ742B |
| 17 | Brian - Deep, Resonant and Comforting | nPczCjzI2devNBz1zQrb |
| 18 | Daniel - Steady Broadcaster | onwK4e9ZLuTAKqWW03F9 |
| 19 | Lily - Velvety Actress | pFZP5JQG7iQjIQuC4Bku |
| 20 | Adam - Dominant, Firm | pNInz6obpgDQGcFmaJgB |
| 21 | Bill - Wise, Mature, Balanced | pqHfZKP75CvOlQylNhV4 |

The capture shows no API call for this list. The public API docs list `GET /test_framework/v1/personalities/elevenlabs_voices/?language=en` and `GET /test_framework/v1/personalities/cartesia_voices/?language=en` as the voice catalogs.

#### "Clone a voice" dialog

| Part | Content (verbatim) |
|---|---|
| Title | "Clone a voice" |
| Text | "Upload a clean recording of one speaker, at least a few seconds long. The longer and cleaner the sample, the closer the clone. The new voice ID is filled in here once cloning finishes." |
| "Audio sample" | Drop zone: "Drag and drop, or choose an audio file". Help: "wav, mp3, m4a, ogg, webm, flac. Up to 25MB." |
| "Voice name" | Text box, placeholder "e.g. Frustrated caller". Help: "Shown in your provider account, so name it something you will recognise later." |
| Buttons | "Cancel", "Clone voice" (disabled until a file and a name are present, inferred), "Close" (x) |

The clone was not submitted. The public API docs list `POST /test_framework/v1/personalities/clone_voice/` for this action.

#### Flows

Create:

1. The user opens `/personality/create`. The dashboard calls `GET /enums/` and the Results probe.
2. The user types the name and the prompt.
3. The user picks a Voice Model. The Voice ID field changes to a searchable select.
4. The user picks a voice, for example "Bella" (`hpp4J3VqNfWAUOO0d1Us`).
5. The user picks a Language.
6. The user clicks "Create personality". The dashboard calls `POST /test_framework/v1/personalities/`.
7. The dashboard opens `/personality?language=en`. It calls the agent short list and the Personality list. The toast "Personality created successfully" shows.

Edit:

1. The user clicks the pencil icon. The dashboard calls `GET /test_framework/v1/personalities/<id>/`.
2. The form loads all values. The Advanced settings section is open.
3. The user changes the name and clicks "Save changes".
4. The dashboard calls `PATCH /test_framework/v1/personalities/<id>/` with the full form.
5. The dashboard opens `/personality?language=en`. The toast "Personality updated successfully" shows.

#### Backend calls

`POST /test_framework/v1/personalities/`

- Status: 201.
- Request body:

```json
{"name":"zz-spec-test-personality",
 "prompt":"You are a calm caller in your forties. You speak in short sentences. Test personality for a specification.",
 "background_noise":"off","voice_id":"hpp4J3VqNfWAUOO0d1Us","organization":7868,"language":"en",
 "voice_model":"eleven_turbo_v2_5","forked_from":null,"interruption_level":"off","speed":1,
 "background_sound_volume":null,"project":13875}
```

- Response (trimmed):

```json
{"id":9650,"forked_from":null,"organization":7868,"project":13875,"name":"zz-spec-test-personality",
 "prompt":"You are a calm caller ...","language":"en","accent":"american","call_service_provider":"patronus",
 "background_noise":"off","voice_model":"eleven_turbo_v2_5","voice_id":"hpp4J3VqNfWAUOO0d1Us",
 "interruption_level":"off","speed":1.0,"generation_config":null,"network_simulation":null,
 "message_plan":{"idle_timeout_seconds":10,"idle_message_max_spoken_count":3},
 "start_speaking_plan":2.5,"stop_speaking_plan":{"num_words":1,"backoff_seconds":6},
 "background_sound_volume":null,"voice_volume":null,"effective_voice_volume":1.0,
 "patronus_settings":{"dial_in_support":true,"calling_from_random_number_supported":true,"use_provider_recording":true,
   "transcriber":{"fallbackPlan":{"transcribers":[{"provider":"11labs","model":"scribe_v2_realtime","language":"en"}]}}},
 "provider_agent_id":"","end_call_enabled":true}
```

`GET /test_framework/v1/personalities/{id}/`

- Status: 200. The response has the same shape as the POST response.

`PATCH /test_framework/v1/personalities/{id}/`

- Status: 200.
- Request body (trimmed). The dashboard sends the whole form, not only the changed field:

```json
{"name":"zz-spec-test-personality-fork","prompt":"You are a middle aged American male. ...",
 "background_noise":"off","voice_id":"QTo0g2djh2iZ0bu7jGWt","organization":7868,"language":"en",
 "voice_model":"eleven_turbo_v2_5","forked_from":693,"interruption_level":"off","speed":1,
 "start_speaking_plan":2.5,"message_plan":{"idle_timeout_seconds":10,"idle_message_max_spoken_count":3},
 "stop_speaking_plan":{"num_words":1,"backoff_seconds":6},"background_sound_volume":null,"project":13875}
```

- Response: the full Personality. `accent` becomes `"american"` and `provider_agent_id` gets a value (`"eaac5621-..."`).

#### States

- Create footer text: "Fill in the required fields to continue."
- Edit footer text: "All changes saved."
- Toasts: "Personality created successfully", "Personality updated successfully".
- Field-level error messages: not seen.

#### Business rules observed

- The server adds defaults on create when the advanced fields are empty: `message_plan` `{10, 3}`, `start_speaking_plan` 2.5, `stop_speaking_plan` `{num_words 1, backoff_seconds 6}`, `effective_voice_volume` 1.0, `end_call_enabled` true.
- The server sets `call_service_provider` to `"patronus"` and adds `patronus_settings` with an 11labs `scribe_v2_realtime` fallback transcriber in the Personality language.
- The server derives `accent` from the voice. The user cannot set it (public API docs).
- The edit form sends `interruption_level: "off"` and `speed: 1` even when the source had `null`.
- The public API docs state: `start_speaking_plan` and `stop_speaking_plan` are ignored when `interruption_level` is in the same request, because the preset wins. The form sends all three together.

#### Not seen in the capture

- The full start of the Background Noise list. The capture text starts at "Dog Barking". "None" is the default value. Other options before "Dog Barking" may exist.
- Field validation messages. The submit button was not seen in a disabled state.
- The Background sound volume controls after a noise is chosen.
- The voice list API call, the "Play preview" audio, and the clone submit.
- Cartesia voices and the Cartesia emotion and volume settings (`generation_config`).

---

### 5.4 Personality JSON model

The model below combines the fork, create, get, and patch responses.

| Field | Type | Example | Meaning |
|---|---|---|---|
| `id` | integer | 9650 | Personality ID. |
| `forked_from` | integer or null | 693 | Source Personality of a fork. |
| `organization` | integer or null | 7868 | `null` for predefined Personalities. |
| `project` | integer | 13875 | Owner project. |
| `name` | string | "zz-spec-test-personality" | Name. |
| `prompt` | string | "You are a calm caller ..." | Caller behavior prompt. |
| `description` | string | "" | List only. Empty for custom Personalities in the capture. |
| `language` | string | "en" | Code from `LanguageChoices`. |
| `accent` | string | "american" | Read-only label from the voice. |
| `gender` | string | "female" | List only. `male`, `female`, `neutral`. |
| `enabled` | boolean | true | List only. Enabled for the project. |
| `is_starred` | boolean | true | List only. Star on the card. |
| `call_service_provider` | string | "patronus" | `CallServiceProviderChoices`: `vapi`, `patronus`. |
| `background_noise` | string or null | "off" | `"off"`, a preset key such as `"office"`, or an audio URL. |
| `voice_model` | string | "eleven_turbo_v2_5" | `VoiceModelChoices`. |
| `voice_id` | string | "hpp4J3VqNfWAUOO0d1Us" | Provider voice ID. |
| `interruption_level` | string or null | "off" | `off`, `low`, `medium`, `high`. |
| `speed` | number or null | 1.0 | 0.8 to 1.2. |
| `generation_config` | object or null | null | Cartesia only: `{volume 0.5-2.0, emotion}` (public API docs). |
| `network_simulation` | object or null | null | `{packet_loss, jitter, latency}`, each 0 to 100 (public API docs). |
| `message_plan` | object | `{"idle_timeout_seconds":10,"idle_message_max_spoken_count":3}` | Idle message plan. |
| `start_speaking_plan` | number | 2.5 | Wait seconds before the caller speaks. |
| `stop_speaking_plan` | object | `{"num_words":1,"backoff_seconds":6.0}` | Also `voice_seconds`. |
| `background_sound_volume` | object or null | null | `{base, reduced}`, each 0.0 to 1.0 (public API docs). |
| `voice_volume` | string or null | null | 0.01 to 2.0 (public API docs). |
| `effective_voice_volume` | number | 1.0 | Read-only result volume. |
| `patronus_settings` | object | see below | Platform call settings. |
| `patronus_settings.transcriber.fallbackPlan.transcribers[]` | array | `[{"provider":"11labs","model":"scribe_v2_realtime","language":"en"}]` | Fallback speech transcriber. |
| `patronus_settings.dial_in_support` | boolean | true | none |
| `patronus_settings.use_provider_recording` | boolean | true | none |
| `patronus_settings.calling_from_random_number_supported` | boolean | true | none |
| `provider_agent_id` | string | "" | Empty after fork or create. Filled after an update. |
| `end_call_enabled` | boolean | true | The caller may end the call. |
| `provider` | string | "11labs" | Write field in the public API docs: `11labs` or `cartesia`. Not seen in captured requests. |

---

### 5.5 Delete a Personality

#### Route and access

- Access: the "Delete" button in the header of the Edit personality page.

#### Flows

1. The user opens the Edit personality page of a custom Personality.
2. The user clicks "Delete".
3. The dashboard calls `DELETE /test_framework/v1/personalities/<id>/`. Status 204, empty body.
4. The dashboard opens `/personality?language=en`. It reloads the agent short list and the Personality list. The card is gone.

#### Not seen in the capture

- A confirm dialog and its text. The capture shows no dialog step.
- A toast after delete.
- Delete of a predefined Personality. Predefined cards have no edit link.

---

### 5.6 Evaluators page

#### Route and access

- Route: `/test-case?project=<id>&page=1`. After folder navigation the URL adds `&pageSize=30&folder=<folder path>`.
- Access: sidebar group "SIMULATION", item "Evaluators".

#### Purpose

The page lists the Evaluators of one Folder. The user creates, generates, filters, selects, runs, exports, and deletes Evaluators. The user also manages Folders and Test Profiles from this page.

#### Layout

1. Folder sidebar on the left of the main area, with a drag handle to resize it. See 5.7.
2. Page description: "Evaluators are test scenarios that simulate real conversations against your agent, each paired with a persona and the metrics it should pass." Link "Learn more" to `https://docs.example.com/documentation/key-concepts/evaluators/overview`.
3. Toolbar row 1: "Select View" menu, "Search scenarios..." box with a black search button, "Test Profiles", "Filters", "Add an Evaluator", "Run from file", "Generate Evaluators" (filled black).
4. Toolbar row 2: "Export (n)", "Actions", "Improve Scenarios", "Run" (filled black when active), "Delete" (red when active).
5. Table of Evaluators.
6. Pagination bar: first, previous, page number, next, last. "Rows per page:" select. Row count text, for example "1-1 of 1 rows".
7. Optional right panel: "Improve Scenarios" or "Review Generated Scenarios". The main area becomes narrower when a panel is open.

#### Toolbar controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Select View" | Menu button | "Search Views..." box, "None", "Create New View" | "Select View" | none | Lists saved views from `GET /test_framework/v1/views/`. The capture has no saved view. "Create New View" was not opened. |
| "Search scenarios..." | Text box with search button | Free text | Empty | none | Searches Evaluators (inferred: by name or ID). Not used in the capture. |
| "Test Profiles" | Button | none | Enabled | none | Opens the Test Profiles dialog. See 5.13. |
| "Filters" | Button | none | Enabled | none | Opens the Filters dialog. |
| "Add an Evaluator" | Link button | none | Enabled | none | Opens `/test-case/create?folder=<current folder>`. See 5.10. |
| "Run from file" | Button | none | Enabled | none | Opens the "Run a test suite from a file" dialog. See 5.14. |
| "Generate Evaluators" | Button, filled black | none | Enabled | none | Opens the Generate Evaluators dialog. See 5.8. While a generation job runs, the label is "Generate Evaluators (1)". |
| "Export (n)" | Button | n is the count of selected rows | "Export (0)", disabled | Disabled with no selection | Exports the selected Evaluators. Not clicked. |
| "Actions" | Menu button | "Create monitor", "Add Tags", "Modify Scenarios", "Duplicate", "Move to Folder" | Disabled | Disabled with no selection | Opens the Actions menu. No item was clicked. |
| "Improve Scenarios" | Button | none | Enabled | Disabled while a generation job runs | Opens the "Improve Scenarios" panel. |
| "Run" | Button | none | Disabled | Disabled with no selection | Opens the "Configure Run" dialog. See 5.15. |
| "Delete" | Button, red | none | Disabled | Disabled with no selection | Deletes the selected Evaluators. See 5.16. |

#### Table columns

| Column | Content example | Sortable | Notes |
|---|---|---|---|
| (expand) | Chevron button | No | Header button expands or collapses all rows (inferred). |
| ID | Checkbox and "401833" | Yes ("Sort by ID, descending") | Header has a select-all checkbox with a small chevron menu. |
| Name | "Returning patient moves dental appointment after date correction" | Yes ("Sort by Name, ascending") | Truncated with an ellipsis. |
| Personality | "Normal Male" | Yes | `personality_name`. |
| Agent | Chip "zz-spec-test-agent" with an arrow icon | Yes | Link "Go to agent: <name>" to `/agents/<id>`. |
| Phone Number | "No number" in italics | No | `phone_number`. |
| Test Profile | "test_profile_agent_26242_1792785047258" | Yes | `test_profile_data.name`. |
| Language | "English" | Yes | `scenario_language` as a language name. |
| Metrics | "17" | No | Count of `metrics`. |
| Tags | empty | No | `tags`. |
| Created At | "10/23, 21:50 (Automaton)" | Yes ("Sort by Created At, descending") | none |
| Updated At | "10/23, 21:50 (Automaton)" | Yes | none |
| Actions | "1", play icon, pencil icon, "..." icon | No | The pencil links to `/test-case/<id>?project=<id>`. The play icon starts a Run (inferred). The "1" and the "..." menu were not opened. |

Each column header has a grip icon (inferred: drag to reorder columns).

#### Filters dialog

| Part | Content (verbatim) | Behavior |
|---|---|---|
| Title | "Filters" with "Close" | none |
| Tabs | "Tags" (selected), "Personality", "Agents", "Metrics" | Each tab filters by one dimension. |
| Search box | Combobox, open | Filters the suggestion list (inferred). |
| Logic select | "OR" | Joins the chosen values (inferred: "AND" is the other option). |
| "Suggestions" list | Options with checkboxes: "booking", "callback", "junk call", "sales call" | Source: `GET /test_framework/v1/scenarios/tags/?project_id=<id>` returns `["booking","callback","junk call","sales call"]`. |
| Buttons | "Cancel", "Apply" (disabled until a change) | Apply filters the table (inferred). |

#### "Improve Scenarios" panel

| Part | Content (verbatim) | Behavior |
|---|---|---|
| Header | "Improve Scenarios", subtitle "Assistant · filtered evaluators (up to 50)" | none |
| Header buttons | "New conversation" (+), a link to `/ai-assistant` (arrow icon), "Close Improve Scenarios" (x) | The link opens the full Assistant page. |
| Scope row | Chip "Filtered", text "Evaluators in scope", select "50" | Sets how many filtered Evaluators the agent loads. Other options not captured. |
| Empty chat | Heading "Improve these evaluators", text "filtered evaluators (up to 50) are loaded and ready to edit.", label "Try asking me to" | none |
| Suggestion buttons | "Review these evaluators" / "Find gaps, overlaps and weak spots". "Make these evaluators stricter" / "Tighten instructions and outcomes". "Add a DTMF verification step" / "Have each scenario exercise keypad input". "Fix the expected outcomes" / "Make outcomes concrete and checkable". | Fills or sends the prompt (inferred). |
| Message box | Placeholder "Describe how to improve these evaluators…" | none |
| Attach button | "Add files (TXT,MD,CSV,JSON,YAML,YML,XML,PDF,XLSX,PNG,JPG,JPEG,GIF,WEBP) • Max 5 files • 2MB each" | none |
| Send button | "Send (Enter) · New line (Shift+Enter)", disabled with empty text | none |

#### Flows

1. The user opens the page. The dashboard calls, in order: `GET /enums/`, `GET /test_framework/v1/views/?project_id=<id>`, the Results probe, `GET /test_framework/v1/scenarios/has_infrastructure_suite/?project_id=<id>`, `GET /test_framework/v2/aiagents/integration_summary/?project_id=<id>`, `GET /test_framework/v1/scenarios/folders/?project_id=<id>`, and the Evaluator list of the first Folder.
2. The user clicks a Folder. The dashboard reloads the list with `folder_path=<path>`.
3. The user selects a row checkbox. "Export (1)", "Actions", "Run", and "Delete" become active. In the capture, the dashboard then called the agent detail, the Metric list, and the phone number list (see Backend calls).
4. The user clicks "Actions". The Actions menu opens.

#### Backend calls

`GET /test_framework/v1/scenarios/`

- Query: `project_id=<id>&folder_path=<path>&page=1&page_size=30&ql={id,name,personality_name,agent,agent_name,phone_number,scenario_language,metric_names,metrics,tags,created_by,created_at,last_updated_by,updated_at,scenario_type,test_profile_data,first_message}`.
- Status: 200.

```json
{"count":1,"next":null,"previous":null,"results":[
 {"id":401833,"name":"Returning patient moves dental appointment after date correction",
  "personality_name":"Normal Male","agent_name":"zz-spec-test-agent","scenario_language":"en",
  "scenario_type":"instruction","tags":[],"agent":26242,
  "metrics":[240898,240899,"..."],"metric_names":["AI interrupting user","Average Pitch (in Hz)","..."],
  "first_message":"",
  "test_profile_data":{"id":62345,"name":"test_profile_agent_26242_1792785047258","agent":26242,
    "information":{"main_agent_variables":{"patientName":"Sarah Mitchell"},"testing_agent_variables":{"...":"..."}}},
  "created_at":"2026-10-23T19:50:47.131413Z","updated_at":"2026-10-23T19:50:47.131432Z",
  "created_by":9855,"last_updated_by":9855,"is_simulating":false}]}
```

`GET /test_framework/v1/views/?project_id=<id>` returns `{"count":0,"next":null,"previous":null,"results":[]}`.

`GET /test_framework/v1/scenarios/has_infrastructure_suite/?project_id=<id>` returns `{"has_infrastructure_suite":false}`.

`GET /test_framework/v2/aiagents/integration_summary/?project_id=<id>` returns `{"providers":["vapi"],"repo_backed":false}`.

`GET /test_framework/v1/scenarios/tags/?project_id=<id>` returns an array of tag strings.

Calls seen after a row selection (step 3):

- `GET /test_framework/v2/aiagents/26242/?ql={id,name,email_id,mock_tools,mock_tools_enabled,telephony{phone_number,sip_uri,inbound,websocket_url},provider{type,agent_id,chat_provider,auto_dial_outbound,chat_agent_details{type,config},credentials{config}}}`. Response (trimmed):

```json
{"id":26242,"name":"zz-spec-test-agent","telephony":{"inbound":true,"phone_number":null,"sip_uri":null},
 "provider":{"type":"custom","send_post_conversation_metadata":false,"redact_fields":[]},
 "mock_tools":[{"id":245093,"name":"zz_spec_test_check_availability","mock_data":["..."]}],
 "mock_tools_enabled":true,"email_id":"zz-spec-test-agent@example.invalid"}
```

- `GET /test_framework/v1/metrics/basic_list/?project_id=<id>&ql={id,name,eval_type,enum_values,observability_enabled,simulation_enabled,function_name,vocera_defined_metric_code}`.
- `GET /test_framework/v1/phone-numbers/?organization_id=7868&call_service_provider=patronus`. Each item has `id`, `number`, `phone_number_id`, `call_service_provider`, `name`, `provider` ("builtin"), `sms_enabled`, `metadata`, `queue_length`.

#### States

- Empty Folder: an icon, "No evaluators found", "This folder is empty. You can start by adding evaluators or generating scenarios.", "Available actions:", then two buttons "Add an Evaluator" and "Generate Scenarios".
- No selection: "Export (0)", "Actions", "Run", and "Delete" show greyed out.
- Generation job active: "Generate Evaluators (1)", and "Improve Scenarios" is disabled.
- Toast after generated Evaluators are kept: "1 scenario kept successfully".
- Toast after Folder create: "Folder created successfully".

#### Business rules observed

- Page size is 30 by default.
- The default Folder on load is "Regression Suite".
- A row selection loads the agent connection data, Metrics, and phone numbers before the user opens "Run" (inferred: to prepare the Configure Run dialog).

#### Not seen in the capture

- Any Actions menu item result: "Create monitor", "Add Tags", "Modify Scenarios", "Duplicate", "Move to Folder".
- Export output format.
- "Create New View" dialog.
- Search results, sort results, and column reorder.
- The Filters "Personality", "Agents", and "Metrics" tabs, and Apply.
- A message sent in the "Improve Scenarios" panel.
- The row "..." menu and the "1" value in the Actions column.

---

### 5.7 Folder sidebar and Folder dialogs

#### Route and access

- Same page as 5.6. The sidebar sits between the main navigation and the table.

#### Purpose

The sidebar lists Folders. The user selects, searches, creates, duplicates, renames, and deletes Folders.

#### Layout

1. Header "FOLDERS" with a "+" button on the right.
2. "Search folders..." box.
3. Folder list. Row 1 is "Regression Suite" with a shield icon and a "Duplicate folder" button. Row 2 is "All Evaluators". Then each Folder with a folder icon and a "⋮" menu button.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "+" | Icon button | none | Enabled | none | Opens the "Create Folder" dialog. |
| "Search folders..." | Text box | Free text | Empty | none | Filters the Folder list (inferred). |
| "Regression Suite" | List row | none | Selected on load | none | Shows its Evaluators. |
| "Duplicate folder" | Icon button on "Regression Suite" | none | Enabled | none | Not clicked. |
| "All Evaluators" | List row | none | none | none | Shows Evaluators of all Folders (inferred). |
| "⋮" | Menu button on a Folder row | "New subfolder", "Rename", "Duplicate", "Delete" | none | none | Opens the Folder menu. |
| "Folder Name" | Text box in "Create Folder" | Placeholder "Folder name" | Empty | "Create" stays disabled while the box is empty | none |
| "Cancel" | Button in "Create Folder" | none | Enabled | none | Closes the dialog. |
| "Create" | Button in "Create Folder" | none | Disabled | none | Sends `create_folder`. |

#### Flows

Create a Folder:

1. The user clicks "+". The "Create Folder" dialog opens.
2. The user types "zz-spec-test-folder" and clicks "Create".
3. The dashboard calls `POST /test_framework/v1/scenarios/create_folder/`.
4. The dashboard reloads `GET /test_framework/v1/scenarios/folders/`. The new Folder shows at the end of the list. The toast "Folder created successfully" shows.

Delete a Folder:

1. The user opens a Folder and clicks its "⋮" button.
2. The user clicks "Delete".
3. The dashboard calls `POST /test_framework/v1/scenarios/delete_folder/`. Status 204.
4. The dashboard reloads the Folder list and opens "Regression Suite" (`folder=Regression+Suite`).

#### Backend calls

`GET /test_framework/v1/scenarios/folders/?project_id=<id>`

- Status: 200. Plain array.

```json
[{"name":"Regression Suite","path":"Regression Suite","is_infrastructure_suite":false,"is_deletable":false,
  "is_renamable":false,"is_regression_suite":true,"created_at":"2026-09-10T10:17:04.700103Z","updated_at":"..."},
 {"name":"default","path":"default","is_infrastructure_suite":false,"is_deletable":false,"is_renamable":true,
  "is_regression_suite":false,"created_at":"...","updated_at":"..."},
 {"name":"voice_regression","path":"voice_regression","is_deletable":true,"is_renamable":true,"...":"..."}]
```

`POST /test_framework/v1/scenarios/create_folder/`

- Status: 201.
- Request: `{"name":"zz-spec-test-folder","project_id":13875}`
- Response: `{"name":"zz-spec-test-folder","path":"zz-spec-test-folder","is_infrastructure_suite":false,"is_deletable":true,"is_renamable":true,"is_regression_suite":false,"created_at":"2026-10-23T19:48:09.660961Z","updated_at":"..."}`

`POST /test_framework/v1/scenarios/delete_folder/`

- Status: 204, empty body.
- Request: `{"path":"zz-spec-test-folder","project_id":13875}`

From the public API docs (not seen in the capture): `POST /test_framework/v1/scenarios/rename_folder/` and `POST /test_framework/v1/scenarios/move_folder/`. The docs describe Folder paths as dot-separated, for example "Sales.Inbound".

#### Business rules observed

- Every project has "Regression Suite" (`is_regression_suite` true, not deletable, not renamable) and "default" (not deletable, renamable).
- "Regression Suite" shows a "Duplicate folder" button instead of a "⋮" menu.
- The `path` of a top-level Folder equals its name.

#### Not seen in the capture

- The delete confirm dialog and its text. The capture shows the menu and then the result, with no dialog step.
- A toast after Folder delete.
- "New subfolder", "Rename", "Duplicate", and "Duplicate folder" results.
- The "⋮" menu content for "default" (not deletable).

---

### 5.8 Generate Evaluators dialog

#### Route and access

- Modal dialog on the Evaluators page.
- Access: "Generate Evaluators" in the toolbar, or "Generate Scenarios" in the empty state (inferred).

#### Purpose

The dialog collects the inputs for automatic Evaluator generation from the Agent description.

#### Layout

One scrollable column. A sticky "Generate" button sits at the bottom. The fields are listed in the controls table in screen order.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Agent" | Select with robot icon | Agents of the project | "Select agent" | Required. Help: "Note - We leverage the description of the Main Agent for generating. It is important that you provide good detailed description. *" | Loads the agent detail and knowledge base files. |
| "Folder" | Select with folder icon | Folders of the project | Current Folder ("Regression Suite" on load) | Required. Help: "Select the folder to save the evaluator *" | Sends `folder_path`. |
| "Number of Scenarios*" | Number box with info icon | Integer | "1" | Required | Sends `num_scenarios`. |
| "Scenario Type" | Radio group | "Workflow", "Red Teaming" | "Workflow" | Help: "Select the type of scenario to generate" | Sends `scenario_type` (`"workflow"` seen). |
| "Evaluator Format" | Radio group | "Prompt-based", "Conditional actions" | "Prompt-based" | Help: "Choose a flexible prompt or a deterministic condition/action flow" | Sends `simulation_type` (`"instruction"` for "Prompt-based"). "Conditional actions" maps to `conditional_actions` (inferred from `ScenarioTypeChoices`). |
| "Extra Instructions" | Multi-line text box | Placeholder: "Generate scenarios where the user is trying to fake his identity / OR / Generate scenarios where the user is trying to cancel an appointment" | Empty | Help: "Additional instructions for the LLM while generating scenarios." | Becomes the first `user_message` of the scenario agent and `extra_instructions` of the generation job. |
| "Attach generation context (Optional)" | File drop zone with upload icon | "Up to 10 files and 50 MB total. Formats: PDF, TXT, JSON, CSV, XML, MD" | Empty | Limits as stated | Sends `knowledge_base` (inferred). The capture sent `[]`. |
| "Tags" | Tag input | Placeholder "Create tags..." | Empty | Help: "Press Enter to add a tag" | Sends `tags`. |
| "Additional Configuration" | Collapsible button | none | Closed | none | Shows the fields below. |
| "Enter Manually" | Button | none | Shown when the section is open | none | Unlocks the disabled fields below (inferred). |
| "Test Profile" | Select, disabled | "Auto-generate" | "Auto-generate" | Help: "Test profile is the information you expect Test Agent to know. Example the name, date of birth etc." | Generation creates a Test Profile when the value is "Auto-generate". |
| "Phone Numbers" | Button, disabled | "Select phone numbers" | none | Help: "Our Agent will call your agent using these numbers" | List source: `GET /test_framework/v1/phone-numbers/inbound/`. |
| "Personalities" | Button, disabled | "AI will select automatically" | none | Help: "Select the personalities that the AI will use." | Sends `personalities: []` for automatic choice. |
| "First Message" | Text box, disabled | Placeholder "AI will generate automatically" | Empty | Help: "Enter the first message to be sent." | Sends `first_message: "auto"`. |
| "Tools" | Six switches | "Send DTMF", "Receive DTMF", "End Call", "End Call Only on Transfer", "Send SMS", "Call Hold" | All off | Help: "Select which tools to enable for this evaluator" | Sends `tool_ids: ["auto"]` when the user changes nothing. Descriptions are the same as in 5.11. |
| "Generate" | Button, full width, filled black | none | Enabled | none | Starts the scenario agent. See 5.9. |
| Close (x) | Icon button | none | none | none | Closes the dialog. |

#### Flows

1. The user opens the dialog. The dashboard calls `GET /test_framework/v1/scenarios/folders/`, `GET /test_framework/v1/scenarios/tags/`, `GET /user/v1/projects/<id>/`, `GET /test_framework/v1/phone-numbers/inbound/?call_service_provider=patronus&organization_id=7868`, and `GET /user/v1/projects/<id>/personalities/?ql=...`.
2. The user picks the Agent "zz-spec-test-agent". The dashboard calls `GET /test_framework/v2/aiagents/26242/?ql={id,knowledge_base_files}`, `GET /test_framework/v2/aiagents/26242/`, and `GET /user/v1/projects/<id>/personalities/?language=en&ql=...`.
3. The user picks the Folder "zz-spec-test-folder", types the Extra Instructions, and clicks "Generate".
4. The dialog closes. The scenario agent flow starts. See 5.9.

#### Backend calls

`GET /test_framework/v1/phone-numbers/inbound/?call_service_provider=patronus&organization_id=<org id>`

```json
[{"id":356,"number":"+13682101298","phone_number_id":"+13682101298","common":true,"call_service_provider":"patronus"},
 {"id":2,"number":"+18647326888","phone_number_id":"43e1785c-...","common":true,"call_service_provider":"patronus"},"..."]
```

`GET /user/v1/projects/{id}/` returns the project settings. Fields used in this section: `max_call_duration` (600), `min_call_duration` (10), `outbound_timeout` (300), `end_call_enabled` (true), `generate_scenario_auto_assign_numbers_enabled` (false), `max_messages_chat_runs_limit` (300).

`GET /test_framework/v2/aiagents/{id}/` returns the Agent. Fields used here: `description`, `language`, `telephony`, `provider`, `knowledge_base_files[]` (`file_name`, `file_type`, `file_size`, signed `file_url`), `enabled_personalities` (`[693]`), `mock_tools[]`, `mock_tools_enabled`.

#### Business rules observed

- The organization setting `conditional_actions_generation_enabled` is false in the capture (from `GET /user/organizations/<id>/`). The "Conditional actions" option still shows.
- The Agent description is the main input for generation.

#### Not seen in the capture

- "Red Teaming" and "Conditional actions" generation.
- "Enter Manually" behavior and the manual Test Profile, phone number, and Personality pickers.
- File upload in the attach zone.
- The tooltip text of the "Number of Scenarios" info icon.
- A maximum value for "Number of Scenarios".

---

### 5.9 Scenario agent flow and "Review Generated Scenarios" panel

#### Route and access

- Right-side panel on the Evaluators page. It opens after "Generate" in 5.8.

#### Purpose

The scenario agent may ask clarifying questions. It then writes one instruction per Evaluator. A background job then creates the Evaluators. The panel lets the user answer, watch progress, review, and keep the Evaluators.

#### Layout

1. Header: sparkle icon, title "Review Generated Scenarios", subtitle "Keep scenarios or continue editing". Buttons "Minimize to panel" and "Close".
2. Tabs: "Active Chat" (selected), "History".
3. Chip "1 scenario" with a close "x". During generation the chip reads "0/1 scenario".
4. Chat thread. User messages are grey bubbles on the right. Assistant messages are plain text on the left with a "Copy message" button.
5. Bottom area. It changes with the state:
   - Question state: "QUESTION 1 OF 1" with a progress line, "Skip" button, the question text, a text box "Type your answer...", and a round send button.
   - Generation state: progress bar "0 of 1 scenarios", text "Generating scenarios...", text box placeholder "Generating scenarios, please wait...", send disabled.
   - Done state: accordion "Generated Scenarios (1)" in the thread. Footer: "1 scenario ready to save", button "Save 1 scenario", text "Save them first, then use Improve Scenarios from the Evaluators page to edit them with the Assistant."

#### Generated Evaluator card

| Part | Content |
|---|---|
| Collapsed row | Name "Returning patient moves dental appointment after date correction" and chip "ID: 401833". |
| "Instructions" | The full `instructions` text. |
| "Expected Outcome" | The full `expected_outcome_prompt` text. |
| Footer line | "Personality · Normal Male", "Language · en", "Test profile · test_profile_agent_26242_1792785047258", "Tools Enabled", then "End Call". |

#### Flows

1. The dashboard calls `POST /test_framework/v1/scenarios/scenario-agent/` with the Extra Instructions as `user_message`. The response gives `progress_id` and `session_id`.
2. The dashboard polls `GET /test_framework/v1/scenarios/scenario-agent-progress/?progress_id=<id>&project_id=<id>`. The status is `in_progress`.
3. The status becomes `needs_clarification`. The result holds the question "Will your agent always speak first at the start of a call? (Reply 'yes' if your agent sends the first message, or 'no' if our testing agent should start the conversation)".
4. The dashboard calls `PATCH /test_framework/v1/scenario-improvement-sessions/<session_id>/?project_id=<id>` to store the conversation.
5. The panel shows "Question 1 of 1". The user types "yes" and sends it.
6. The dashboard calls `POST /test_framework/v1/scenarios/scenario-agent/` again with the answer, the full `conversation_history`, and `session_id`.
7. The dashboard polls the progress endpoint until `status` is `completed`. The result holds `extra_instructions_list` (one item per Evaluator).
8. The dashboard calls `PATCH .../scenario-improvement-sessions/<session_id>/` again. It appends an assistant message in the form `INSTRUCTION_COMPARISON|||1. <instruction>|||<base instruction>`.
9. The dashboard calls `POST /test_framework/v1/scenarios/generate-bg/`. The response gives a new `progress_id`.
10. The dashboard polls `GET /test_framework/v1/scenarios/generate-progress?progress_id=<id>&project_id=<id>`. Note: this path has no trailing slash. `current_step` goes from absent to "Starting generation...", then "Generating scenarios...", then "Generation complete".
11. When `completed_scenarios` equals `total_scenarios`, the panel shows "Generated Scenarios (1)". The dashboard reloads the Folder list and the Evaluator list.
12. The user expands the row to read the Evaluator.
13. The user clicks "Save 1 scenario". The panel closes. The toast "1 scenario kept successfully" shows. The dashboard reloads views, Folders, and Evaluators.

The capture recorded about 12 progress polls for step 7 and about 30 polls for step 10. The poll interval is not measurable from the capture.

#### Backend calls

`POST /test_framework/v1/scenarios/scenario-agent/` (first message)

- Status: 200.

```json
{"project_id":13875,"user_message":"Generate one scenario where the caller wants to move an appointment.",
 "num_scenarios":1,"conversation_history":[],"knowledge_base":[],"agent_id":26242}
```

- Response: `{"progress_id":"d05c27c4-...","session_id":3443}`

`POST /test_framework/v1/scenarios/scenario-agent/` (answer)

```json
{"project_id":13875,"user_message":"yes","num_scenarios":1,
 "conversation_history":[
   {"role":"user","content":"Generate one scenario where the caller wants to move an appointment.","timestamp":"2026-10-23T19:48:26.191299+00:00"},
   {"role":"assistant","content":"Will your agent always speak first at the start of a call? ...","timestamp":"..."},
   {"role":"user","content":"yes","timestamp":"2026-10-23T19:49:20.218Z"}],
 "knowledge_base":[],"session_id":3443,"agent_id":26242}
```

`GET /test_framework/v1/scenarios/scenario-agent-progress/`

- Query: `progress_id`, `project_id`. Status: 200.
- In progress: `{"session_id":3443,"mode":"clarify","status":"in_progress","result":null,"error":null,"progress_id":"..."}`
- Needs clarification (trimmed):

```json
{"session_id":3443,"mode":"clarify","status":"needs_clarification",
 "result":{"success":true,"session_id":3443,"message":"Will your agent always speak first ...","cancelled":false,
   "needs_clarification":true,"clarification_questions":[{"question":"Will your agent always speak first ..."}],
   "base_extra_instructions":null,"conversation_history":["..."]},
 "error":null,"progress_id":"..."}
```

- Completed (trimmed):

```json
{"session_id":3443,"mode":"clarify","status":"completed",
 "result":{"success":true,"message":"Generated one scenario with a caller wanting to reschedule their appointment.",
   "needs_clarification":false,"clarification_questions":null,
   "base_extra_instructions":"Generate one scenario where the caller wants to move an appointment.",
   "extra_instructions_list":["The testing agent calls to reschedule an existing dental appointment. ... Use the Normal Male personality."]},
 "error":null,"progress_id":"..."}
```

`PATCH /test_framework/v1/scenario-improvement-sessions/{id}/?project_id=<id>`

- Status: 200.
- Request: `{"conversation_history":[ ...all messages... ]}`
- Response (trimmed):

```json
{"id":3443,"title":"Generate one scenario where the caller wants to mo...","project":13875,"scenario_ids":[],
 "conversation_history":["..."],"status":"in_progress","created_at":"2026-10-23T19:48:25.698988Z",
 "updated_at":"2026-10-23T19:48:28.612695Z","created_by":9855}
```

- After the second PATCH, `status` is `"completed"`.

`POST /test_framework/v1/scenarios/generate-bg/`

- Status: 200.

```json
{"agent_id":26242,"num_scenarios":1,"extra_instructions":"Generate one scenario where the caller wants to move an appointment.",
 "tags":[],"scenario_type":"workflow","simulation_type":"instruction","generate_expected_outcomes":true,
 "folder_path":"zz-spec-test-folder","personalities":[],"first_message":"auto","tool_ids":["auto"],
 "session_id":3443,"extra_instructions_list":["The testing agent calls to reschedule ..."]}
```

- Response: `{"progress_id":"09fef315-...","session_id":3443}`

`GET /test_framework/v1/scenarios/generate-progress`

- Query: `progress_id`, `project_id`. Status: 200.
- In progress: `{"agent_id":26242,"completed_scenarios":0,"failed_scenarios":0,"total_scenarios":1,"scenarios_list":[],"errors":[],"session_id":3443,"initiator_user_id":9855,"origin_source":"ui","current_step":"Generating scenarios..."}`
- Done (trimmed). `scenarios_list[]` items have the full Evaluator shape of 5.12:

```json
{"agent_id":26242,"completed_scenarios":1,"failed_scenarios":0,"total_scenarios":1,
 "scenarios_list":[{"id":401833,"name":"Returning patient moves dental appointment after date correction",
   "personality":693,"personality_name":"Normal Male","tool_ids":["VAPI_TOOL_END_CALL"],
   "test_profile":62345,"folder_path":"zz-spec-test-folder","metrics":[240898,"..."],"...":"..."}],
 "errors":[],"session_id":3443,"initiator_user_id":9855,"origin_source":"ui",
 "current_step":"Generation complete","status":"completed","session_updated":true}
```

#### States

- Toast after Save: "1 scenario kept successfully".
- "Skip" skips the question (inferred).
- Error state of a failed generation: not seen.

#### Business rules observed

- The generation job creates the Evaluator in the Folder before the user clicks "Save". The capture shows no API call for "Save".
- Generation creates a new Test Profile per Evaluator when the Test Profile is "Auto-generate". Example: ID 62345, name "test_profile_agent_26242_1792785047258". It has `main_agent_variables` `{"patientName":"Sarah Mitchell"}` and six `testing_agent_variables`.
- Generation chose the Personality "Normal Male" (693), the only enabled Personality of the Agent.
- Generation enabled the End Call tool only (`["VAPI_TOOL_END_CALL"]`).
- Generation attached 17 Metrics (inferred: all Metrics enabled for the Agent).
- Generation added `generated_mock_tool_entries` from the Agent mock tool data.
- Instructions and Expected Outcome use `{{test_profile.<key>}}` variables.

#### Not seen in the capture

- The "History" tab content.
- "Minimize to panel" behavior.
- A generation with more than one Evaluator or with errors (`failed_scenarios` above 0).
- What "Close" does to an unsaved generation (discard or keep).

---

### 5.10 Create an Evaluator page

#### Route and access

- Route: `/test-case/create?folder=<folder path>&project=<id>`.
- Access: "Add an Evaluator" on the Evaluators page.
- Breadcrumb: "Evaluators" > "Create an Evaluator". A "Docs" link opens `https://docs.example.com/documentation/key-concepts/evaluators/overview`.
- A segmented control on the top right selects the mode: "AI Mode" (default), "Manual Mode", "Transcript Mode".

#### Purpose

The page creates one or more Evaluators in three ways: from a short description, from a step form, or from a past conversation transcript.

#### "AI Mode"

Layout: a centered hero and a composer at the bottom.

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Badge | Text | "AI evaluator builder" | none | none | none |
| Heading | Text | "What should this evaluator test?" | none | none | Sub-text: "Describe a real conversation or failure mode. The app will turn it into test scenarios you can review and refine here." |
| Suggestion cards | Buttons with arrow icons | "Caller disputes a charge", "Caller demands a human", "Caller reschedules twice" | none | none | Fills the description (inferred). |
| Agent | Select | Agents | First Agent ("Voice Regression — E2E Deploy Agent Sq") | none | none |
| Folder | Select | Folders | Folder from the URL | none | none |
| "Number of scenarios" | Select | "1 scenario" (others not captured) | "1 scenario" | none | none |
| "Scenario type" | Select | "Workflow" (others not captured) | "Workflow" | none | none |
| "More" | Button with chevron | none | none | none | Shows more options. Not opened. |
| "Evaluator description" | Multi-line text box | Placeholder "Describe the scenario, the persona, and anything the agent must get right..." | Empty | none | Enter key starts generation. |
| Status line | Text | "Ready to generate · Enter to generate" | none | none | none |
| "Generate" | Button | none | Disabled | Disabled with empty description | Starts generation (inferred: the same scenario agent flow as 5.9). |

Calls on load: `GET /test_framework/v2/aiagents/short_list/`, the Results probe, `GET /user/v1/projects/<id>/personalities/?ql=...`, `GET /test_framework/v1/scenarios/folders/`, and `GET /user/v1/projects/<id>/personalities/?language=en&ql=...`.

#### Manual Mode

Layout: a stepper with "1 Scenario Input", "2 Basics", "3 Criteria" (disabled), "4 Configuration" (disabled). The form card sits below. The footer has "Back" (disabled on step 1) and "Next".

Step 1 "Scenario Input":

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Agent" | Select | Agents | First Agent | Required. Help: "Select the agent to test with this evaluator *" | Loads the Agent and its default Test Profile. |
| "Scenario Input Type *" | Select | "Instruction" (others not captured) | "Instruction" | Required | Sets `scenario_type` (inferred: `instruction` or `conditional_actions`). |
| "Test Profile" | Select with ID chip | Test Profiles of the Agent | The Agent default, for example "37004 Default Test Profile - Voice Regression — E2E Deploy Agent Sq (22757)" | Help: "Test profile is the information you expect Test Agent to know. Example the name, date of birth etc." | Sets `test_profile`. |
| "First Message" | Text box | Free text | "Hello" in the capture | Help: "Enter the first message to be said by Test Agent. If empty, Test Agent will wait to receive a message" | Sets `first_message`. |
| "Instructions *" | Multi-line text box | Placeholder: "<scenario> - You are calling a customer support agent to return an order. - Begin by being slightly unsure about your exact order name. - When asked about your name and order id, at first give incorrect order id. - Correct it after agent denies request. - Be ready to provide other information when requested. </scenario>" | Empty | Required | Sets `instructions`. |
| "Generate" | Button with sparkle icon | none | Enabled | none | Writes instructions with the model (inferred). Not clicked. |
| "Available Variables" | Link and chips | "{{test_profile}}", "{{test_profile.city}}", "{{test_profile.date_of_birth}}", "{{test_profile.email_address}}", "View More" | none | none | The link opens `https://docs.example.com/documentation/key-concepts/evaluators/test-profile#template-syntax`. A chip inserts the variable (inferred). The chips come from the keys of the chosen Test Profile. |
| Hint | Text and chips | "Hint: Use" "{{test_profile[\"field_name\"]}}" "e.g." "{{test_profile[\"Name\"]}}" "or" "{{test_profile[\"Existing conditions\"]}}" | none | none | Shows the bracket form for keys with spaces. |
| Help | Text | "Refer to the Test Agent in first person like "You are". Do not provide exact steps like when AI Agent says "xyz", do this. Keep all information separate in information block." Link "Learn more" to `https://docs.example.com/documentation/guides/prompting#scenarios-prompt` | none | none | none |

Calls on load of Manual Mode: `GET /enums/`, `GET /test_framework/v1/metrics/basic_list/?project_id=<id>&ql={id,name,eval_type,enum_values,observability_enabled,simulation_enabled,function_name,vocera_defined_metric_code,agents,project}`, `GET /test_framework/v1/phone-numbers/inbound/...`, `GET /user/v1/projects/<id>/`, `GET /test_framework/v1/test-profiles/?project_id=<id>&page=1&page_size=200&ql={id,name}&search=Default+Test+Profile&agent_id=22757`, `GET /test_framework/v2/aiagents/22757/`, `GET /test_framework/v1/test-profiles/37004/?project_id=<id>&ql={id,name,agent,project}`, and the same path with `ql={id,name,agent,agent_name,information,project}`.

Steps 2 to 4 hold the same fields as the Edit Evaluator page (inferred). See 5.11.

#### Transcript Mode

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Heading | Text | "From Transcript" | none | none | Sub-text: "Replay a past call as an evaluator. Paste or type the back-and-forth between your agent and the caller." |
| "Agent" | Select | Agents | First Agent | Required. Help: "The agent this evaluator will test *" | none |
| "Folder" | Select | Folders | Folder from the URL | Required. Help: "Select the folder to save the evaluator *" | none |
| "Name (optional)" | Text box | Placeholder "e.g. Billing reschedule replay" | Empty | none | none |
| "Conversation" | Section | Counter "0 messages · Agent on left, caller on right" | none | none | none |
| "Chat" / "JSON" | Toggle | "Chat", "JSON" | "Chat" | none | "JSON" shows a raw editor (inferred). |
| "Main Agent" row | Message row | Time box "Start time in seconds (optional)" (placeholder "time", suffix "s"), "swap", "delete", text box "What did the agent say?" | One empty row | none | "swap" changes the speaker (inferred). |
| "Caller" row | Message row | Same controls, text box "What did the caller say?" | One empty row | none | none |
| "Add message" | Button | none | none | none | Adds a row. |
| "Load example" | Button | none | none | none | Fills a sample conversation (inferred). |
| "Create Evaluator" | Button | none | none | none | Not clicked. The public API docs list `POST /test_framework/v1/scenarios/create-from-transcript-bg/` and `GET /test_framework/v1/scenarios/create-from-transcript-progress/` for this action. |

Call on load: `GET /test_framework/v1/scenarios/folders/?project_id=<id>`.

#### Not seen in the capture

- Any create request in all three modes. The capture created Evaluators only through 5.8 and 5.9.
- The "More" options, the "Number of scenarios" and "Scenario type" option lists in "AI Mode".
- The other "Scenario Input Type" options.
- Manual Mode steps 2 to 4.
- Whether "Hello" in "First Message" is a default value or a leftover value.

---

### 5.11 Edit Evaluator page

#### Route and access

- Route: `/test-case/<evaluator id>?project=<id>`.
- Access: the pencil icon in the Actions column of the Evaluators table.
- Breadcrumb: "Evaluators" (link `/test-case`) > "Edit Evaluator".

#### Purpose

The page shows and edits every field of one Evaluator. It also shows the version history.

#### Layout

1. Header card: "Edit Evaluator", text "Update your evaluator settings." with a "docs" link.
2. Stepper: "1 Basics", "2 Evaluation Criteria", "3 Configuration". All three sections show on one scrollable page (inferred: the stepper jumps to a section).
3. Section "Basics", section "Evaluation Criteria", section "Configuration".
4. Sticky footer bar: "Cancel" and "Update Evaluator".
5. Right column: "Change History" card, then "Compare Versions" card.

#### Controls: Basics

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Agent" | Select | Agents | "zz-spec-test-agent" | Required. Help: "Select the agent to test with this evaluator *" | `agent` |
| "AI Evaluator Name*" | Text box | Free text | Evaluator name | Required | `name` |
| "Folder" | Select | Folders | "zz-spec-test-folder" | Required. Help: "Select the folder to save the evaluator *" | `folder_path` |
| "Tags" | Tag input | Placeholder "Create tags..." | Empty | Help: "Press Enter to add a tag" | `tags` |
| "Test Profile" | Select with ID chip | Test Profiles | "62345 test_profile_agent_26242_1792785047258" | Help: "Test profile is the information you expect Test Agent to know. Example the name, date of birth etc." | `test_profile` |
| "First Message" | Text box | Free text | Empty | Help: "Enter the first message to be said by the Test Agent. If empty, testing agent will wait to receive a message" | `first_message` |
| "Instructions*" | Multi-line text box, resizable | Same placeholder as Manual Mode | The `instructions` text | Required. Help: "This is the instructions that the AI evaluator will use. More detailed instructions will result in a more accurate evaluation" | `instructions` |
| "Improve" | Button, purple outline, sparkle icon | none | Enabled | none | Rewrites the instructions (inferred). The public API docs list `POST /test_framework/v1/scenarios/improve_instructions/` and `GET .../instructions-progress/`. Not clicked. |
| "Available Variables" | Link and chips | "{{test_profile}}", "{{test_profile.current_appointment_date}}", "View More" | none | none | Chips come from the Test Profile keys. |
| Hint | Chips | "{{test_profile[\"field_name\"]}}", "{{test_profile[\"Name\"]}}", "{{test_profile[\"Existing conditions\"]}}" | none | none | none |
| Help | Text | "Refer to Test Agent in first person like "You are". Do not provide exact steps like when AI Agent says "xyz", do this. Keep all information separate in information block." Link "Learn more" to `https://docs.example.com/documentation/guides/prompting` | none | none | none |
| "Personality*" | Select with ID chip | Personalities | "693 Normal Male (English)" | Required. Help: "Tone of the conversation for the Test Agent." | `personality` |
| "Language" | Select with code chip | Languages | "en English" | Help: "Select the language of the conversation" | `scenario_language` |

#### Controls: Evaluation Criteria

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Expected Outcome Prompt" | Multi-line text box, resizable | Placeholder: "- The Main Agent asks for Name and Date of Birth - The Main Agent attempts to get correct date of birth again - After successful verification, the Main agent informs testing agent that return request is accepted." | The `expected_outcome_prompt` text | Help: "Enter the expected outcome prompt." | `expected_outcome_prompt` |
| "Improve" | Button | none | Enabled | none | Rewrites the outcome (inferred). Not clicked. |
| "Available Variables" | Link and chips | "{{test_profile}}", "{{metadata}}", "{{metadata[\"key\"]}}", "{{provider_call_details}}", "View More" | none | none | none |
| Hint | Chips | Same three bracket chips as Basics | none | none | none |
| Help | Text | "AI agent is "Main Agent" and User is "Testing Agent"." Link "Learn more" to `https://docs.example.com/documentation/guides/prompting#expected-output` | none | none | none |
| "Metrics" | Multi-select with chips, clear "x", and chevron | Metrics of the project | Chips "AI interrupting user", "Average Pitch (in Hz)", "Expected Outcome", "+ 14 more" | Help: "Select metrics to evaluate the conversation" | `metrics` (IDs) |
| "Expected Mock Tools" | List with "Add Entry" button | Row "zz_spec_test_check_availability" with expand chevron, edit (pencil), delete (trash) | One row from generation | Help: "Tool calls expected from the agent during this evaluator run." | `generated_mock_tool_entries` (inferred) |

#### Controls: Configuration

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Phone Number" | Select | "None" and project phone numbers | "None" | none | `phone_number` |
| "Send DTMF" | Switch | On, Off | Off | Help: "Allows Test Agent to send DTMF tones during the call. Use this when you want to test scenarios where the agent needs to send button presses." | Adds `VAPI_TOOL_DTMF` to `tool_ids`. |
| "Receive DTMF" | Switch | On, Off | Off | Help: "Allows Test Agent to receive DTMF tones from the call. Use this when you want to test scenarios where the agent needs to accept button presses from the user." | Adds `RECEIVE_DTMF`. |
| "End Call" | Switch | On, Off | On (for this Evaluator) | Help: "Allows Test Agent to end the call at any point during the conversation. Use this when you want the evaluator to have control over call termination." | Adds `VAPI_TOOL_END_CALL`. |
| "End Call Only on Transfer" | Switch | On, Off | Off | Help: "Allows Test Agent to end the call only when a transfer occurs. This tool can only be used when a transfer happens during the conversation." | Adds `VAPI_TOOL_END_CALL_ONLY_ON_TRANSFER`. |
| "Send SMS" | Switch | On, Off | Off | Help: "Allows Test Agent to send SMS messages during the call. Use this when you want to test scenarios involving SMS functionality." | Adds `SEND_SMS_TOOL_CALL`. |
| "Call Hold" | Switch | On, Off | Off | Help: "Allows Test Agent to hold the call (pause speaking) at any point during the conversation. Use this when you want to test scenarios where the agent expects the caller to wait silently." | Adds `CALL_HOLD`. |
| "Max Call Duration (seconds)" | Number box | Placeholder "Leave empty to use project default" | Empty | Help: "Optional: Override project's max call duration (10-3600 seconds)" | `max_duration`. Range 10 to 3600. |
| "Cancel" | Button | none | Enabled | none | Returns to the list (inferred). |
| "Update Evaluator" | Button, filled | none | Disabled | Disabled until a field changes | Saves the Evaluator. Not clicked. The public API docs list `PATCH /test_framework/v1/scenarios/{id}/`. |

The tool values come from `ScenarioToolChoices` in `GET /enums/`: `dtmf` = `VAPI_TOOL_DTMF`, `receive_dtmf` = `RECEIVE_DTMF`, `end_call` = `VAPI_TOOL_END_CALL`, `end_call_only_on_transfer` = `VAPI_TOOL_END_CALL_ONLY_ON_TRANSFER`, `send_sms_tool_call` = `SEND_SMS_TOOL_CALL`, `call_hold` = `CALL_HOLD`.

#### Change History and Compare Versions

| Part | Content (verbatim) | Behavior |
|---|---|---|
| Header | "Change History", count "2 records" | none |
| Version row | Chip "v2", green chip "Current", text "API", date "Oct 23, 2026 · 09:50 PM", "..." menu | The green dot marks the current version. |
| Version row | Chip "v1", text "API", date "Oct 23, 2026 · 09:50 PM", note "Initial version", "..." menu | none |
| "Compare Versions" | Selects "From…" and "To…" with an arrow, button "Compare" (disabled) | Text: "Select two versions and click Compare." |

#### Flows

1. The user clicks the pencil icon of row 401833.
2. The dashboard calls `GET /test_framework/v2/scenarios/401833/history/?page=1&page_size=14`, `GET /test_framework/v1/scenarios/401833/?project_id=<id>`, `GET /test_framework/v1/scenarios/401833/condition-audio/`, the Test Profile lookups, and the reference lists (see below).
3. The form shows all values. "Update Evaluator" stays disabled.

#### Backend calls

Calls on page load (from the capture of this page and the next capture):

- `GET /test_framework/v2/scenarios/{id}/history/?page=1&page_size=14`
- `GET /test_framework/v1/scenarios/{id}/?project_id=<id>`
- `GET /test_framework/v1/scenarios/{id}/condition-audio/` returns `[]`.
- `GET /test_framework/v1/scenarios/tags/?project_id=<id>`
- `GET /enums/`
- `GET /test_framework/v2/aiagents/short_list/?project_id=<id>&ql={id,agent_name,language,agent_gives_first_message}`
- `GET /test_framework/v1/scenarios/folders/?project_id=<id>`
- `GET /test_framework/v1/metrics/basic_list/?project_id=<id>&ql={id,name,eval_type,enum_values,observability_enabled,simulation_enabled,function_name,vocera_defined_metric_code,agents,project}`
- `GET /test_framework/v1/phone-numbers/inbound/?call_service_provider=patronus&organization_id=<org id>`
- `GET /test_framework/v1/phone-numbers/?organization_id=<org id>&call_service_provider=patronus`
- `GET /test_framework/v2/aiagents/{agent id}/?ql={id,mock_tools,mock_tools_enabled,mock_tools_provider}`
- `GET /test_framework/v1/test-profiles/?project_id=<id>&page=1&page_size=200&ql={id,name}&search=Default+Test+Profile&agent_id=<agent id>` returns `{"count":1,"results":[{"id":62342,"name":"Default Test Profile - zz-spec-test-agent (26242)"}]}`
- `GET /user/v1/projects/{id}/`
- `GET /test_framework/v1/test-profiles/{id}/?project_id=<id>&ql={id,name,agent,agent_name,information,project}`
- `GET /test_framework/v1/test-profiles/{id}/?project_id=<id>&ql={id,name,agent,project}`
- `GET /test_framework/v2/aiagents/{agent id}/`
- `GET /user/v1/projects/{id}/personalities/?language=en&ql=...`

`GET /test_framework/v2/scenarios/{id}/history/` response (trimmed):

```json
{"count":2,"next":null,"previous":null,"results":[
 {"history_id":1136272,"history_date":"2026-10-23T19:50:47.274492Z","history_type":"~","history_change_reason":null,
  "history_user":null,"version_id":"v2","version_name":null,
  "metrics_snapshot":[240898,"..."],"id":401833,"name":"Returning patient moves ...","agent":26242,"personality":693,
  "tags":[],"tool_ids":["VAPI_TOOL_END_CALL"],"first_message":"","instructions":"<scenario>...</scenario>",
  "expected_outcome_prompt":"...","scenario_language":"en","scenario_type":"instruction","max_duration":null,
  "phone_number":null,"inbound_phone_number":null,"test_profile":62345,"folder":45479,
  "generated_mock_tool_entries":["..."]},
 {"history_id":1136271,"history_type":"+","version_id":"v1","metrics_snapshot":[],"test_profile":null,"...":"..."}]}
```

#### Business rules observed

- `history_type` `"+"` marks the create. `"~"` marks an update.
- Version v1 had no Metrics and no Test Profile. Version v2 added both. The generation job wrote both versions at the same second.
- The history rows show "API" as the source when `history_user` is null (inferred).
- The page looks up the Agent default Test Profile by name search "Default Test Profile" and `agent_id`.

#### Not seen in the capture

- An update request and its toast.
- "Improve" results for Instructions and Expected Outcome.
- The "View More" variable list.
- "Add Entry", edit, and delete of Expected Mock Tools.
- The version "..." menu and the Compare result.
- The Phone Number option list.

---

### 5.12 Evaluator JSON model

Source: `GET /test_framework/v1/scenarios/401833/?project_id=13875` (status 200).

```json
{"id":401833,"name":"Returning patient moves dental appointment after date correction",
 "agent":26242,"project":13875,"personality":693,"personality_name":"Normal Male","agent_name":"zz-spec-test-agent",
 "tags":[],"tool_ids":["VAPI_TOOL_END_CALL"],
 "metric_names":["AI interrupting user","Average Pitch (in Hz)","Expected Outcome","..."],
 "outbound_phone_number_data":null,"first_message":"","inbound_phone_number":null,"inbound_phone_number_data":null,
 "instructions":"<scenario>\nYou are a returning dental patient.\n\nFollow these steps in the conversation when required: \nState you want to move your existing dental appointment when asked how you can be helped.\nState {{test_profile.incorrect_appointment_date}} when asked for your current appointment date.\n...\n</scenario>",
 "condition_audio":{},"simulation_description":"","information_fields":{},
 "expected_outcome_prompt":"The main agent should confirm {{test_profile.patientName}} before changing the booking.\n...",
 "scenario_language":"en","scenario_type":"instruction","suite_type":"undefined","is_predefined":false,
 "test_profile":62345,
 "test_profile_data":{"id":62345,"project":13875,"agent":26242,"agent_name":"zz-spec-test-agent",
   "name":"test_profile_agent_26242_1792785047258",
   "information":{"main_agent_variables":{"patientName":"Sarah Mitchell"},
     "testing_agent_variables":{"patientName":"Sarah Mitchell","phone_number":"555-014-2233","selected_slot":"09:00",
       "new_appointment_date":"2026-11-01","current_appointment_date":"2026-10-25","incorrect_appointment_date":"2026-10-20"}},
   "created_by":null,"last_updated_by":null,"created_at":"2026-10-23T19:50:47.259295Z","updated_at":"..."},
 "dynamic_variable_values":{},
 "generated_mock_tool_entries":[{"tool_id":245093,"new_entry":{"input":{"date":"2026-11-01"},"output":{"slots":["09:00","10:30"]}},
   "tool_name":"zz_spec_test_check_availability"}],
 "folder_path":"zz-spec-test-folder","max_duration":null,
 "metrics":[240898,240899,240900,"..."],"is_simulating":false,
 "call_service_provider":"patronus","call_service_provider_inbound":"patronus","call_service_provider_outbound":"patronus"}
```

| Field | Type | Meaning |
|---|---|---|
| `id` | integer | Evaluator ID. |
| `name` | string | Evaluator name. |
| `agent`, `agent_name` | integer, string | Agent under test. |
| `project` | integer | Project. |
| `personality`, `personality_name` | integer, string | Simulated caller. |
| `tags` | array of string | Tags. |
| `tool_ids` | array of string | Enabled caller tools from `ScenarioToolChoices`. |
| `metrics`, `metric_names` | array of integer, array of string | Metrics to evaluate. |
| `first_message` | string | First caller message. Empty means the caller waits. |
| `instructions` | string | Caller script. Often wrapped in `<scenario>` tags. Supports `{{test_profile.<key>}}`. |
| `expected_outcome_prompt` | string | Success criteria. Supports `{{test_profile}}`, `{{metadata}}`, `{{provider_call_details}}`. |
| `scenario_language` | string | Language code. |
| `scenario_type` | string | `instruction` or `conditional_actions` (`ScenarioTypeChoices`). |
| `suite_type` | string | `undefined` or `infrastructure` (`SuiteTypeChoices`). |
| `is_predefined` | boolean | Platform Evaluator flag. |
| `test_profile`, `test_profile_data` | integer, object | Linked Test Profile. |
| `phone_number`, `inbound_phone_number` | integer or null | Phone number links. History shows `phone_number`. |
| `outbound_phone_number_data`, `inbound_phone_number_data` | object or null | Expanded phone number data. |
| `condition_audio` | object | Audio for conditions. Separate list at `/condition-audio/`. |
| `simulation_description`, `information_fields` | string, object | Empty in the capture. |
| `dynamic_variable_values` | object | Empty in the capture. |
| `generated_mock_tool_entries` | array | Expected mock tool calls: `tool_id`, `tool_name`, `new_entry {input, output}`. |
| `folder_path` | string | Folder path. History rows show `folder` as an ID (45479). |
| `max_duration` | integer or null | Call duration override in seconds. |
| `is_simulating` | boolean | A Run is active (inferred). |
| `call_service_provider`, `call_service_provider_inbound`, `call_service_provider_outbound` | string | `"patronus"` in the capture. |

---

### 5.13 Test Profiles dialog and Create Test Profile

#### Route and access

- Modal dialog on the Evaluators page.
- Access: "Test Profiles" button in the toolbar.

#### Purpose

The dialog lists all Test Profiles of the project. The user creates, edits, duplicates, and deletes Test Profiles.

#### Test Profiles dialog layout and controls

| Part | Content (verbatim) | Behavior |
|---|---|---|
| Title | "Test Profiles" with close "x" | none |
| Search | "Search by ID or name..." | Filters the rows (inferred). |
| "Create" | Button, filled black, "+" icon | Opens "Create Test Profile". |
| Column (expand) | Chevron per row | Shows the variables (inferred). Not opened. |
| "ID" | Number in a chip, for example "62347" | none |
| "Name" | Test Profile name | none |
| "Agent" | Chip with arrow, link "Go to agent: <name>" to `/agents/<id>` | none |
| "Scenarios" | Count chip or "-" | Count of linked Evaluators. |
| "Created" | "10/23, 21:55 (Automaton)" or "10/23, 21:15" | none |
| "Updated" | Date or "-" | none |
| "Actions" | Pencil (edit), copy (duplicate), red trash (delete) | Delete calls DELETE. Edit and duplicate were not clicked. |
| Footer | "1–8 of 8", "Prev", "1 / 1", "Next" | Prev and Next are disabled on a single page. |

#### Create Test Profile controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Name" | Text box | Placeholder "e.g. Delayed order — David" | Empty | none seen | `name` |
| "Agent*" | Select | Agents | "Select agent" | Required | `agent` |
| "Main agent variables" | Section with swap icon | Sub-text "Sent to the agent under test, over the wire" | none | none | `information.main_agent_variables` |
| "Table" / "JSON" | Toggle per section | "Table", "JSON" | "Table" | none | "JSON" shows a JSON editor (inferred). |
| "Key" / "Value" | Text box pair | Free text | One empty pair | none | One variable. |
| "Remove variable" | Trash icon | none | none | none | Removes the pair. |
| "Add variable" | Button with "+" | none | none | none | Adds a pair. |
| "Testing agent variables" | Section with person icon | Sub-text "Persona & context used by the simulated caller" | none | none | `information.testing_agent_variables` |
| Counter | Text | "0 variables defined" | "0 variables defined" | none | Counts filled variables. |
| "Cancel" | Button | none | Enabled | none | Closes the dialog. |
| "Create profile" | Button | none | Disabled | Disabled until required fields are present (inferred: Agent) | Sends POST. |

#### Flows

Create:

1. The user clicks "Test Profiles". The dashboard calls `GET /test_framework/v1/test-profiles/?project_id=<id>&page=1&page_size=200&ql={id,name,agent,agent_name,information,created_at,created_by,last_updated_by,updated_at,scenarios}`.
2. The user clicks "Create". The dashboard calls `GET /test_framework/v2/aiagents/short_list/`.
3. The user types the name, picks the Agent, and adds one variable to each section.
4. The user clicks "Create profile". The dashboard calls `POST /test_framework/v1/test-profiles/`.
5. The create dialog closes. The list reloads. The new row is first.

Delete:

1. The user clicks the red trash icon of a row.
2. The dashboard calls `DELETE /test_framework/v1/test-profiles/<id>` (no trailing slash). Status 204.
3. The list reloads.

#### Backend calls

`GET /test_framework/v1/test-profiles/`

- Query: `project_id`, `page=1`, `page_size=200`, `ql={id,name,agent,agent_name,information,created_at,created_by,last_updated_by,updated_at,scenarios}`. Other forms seen: `page_size=50&ql={id,name}` (Configure Run), and `search=Default+Test+Profile&agent_id=<id>` (Evaluator form).
- Status: 200.

```json
{"count":8,"next":null,"previous":null,"results":[
 {"id":62342,"agent":26242,"agent_name":"zz-spec-test-agent","name":"Default Test Profile - zz-spec-test-agent (26242)",
  "information":{"city":"Springfield","zip_code":"62704","full_name":"Sarah Mitchell","first_name":"Sarah",
    "last_name":"Mitchell","patient_id":"PT-88421","phone_number":"555-014-2233","date_of_birth":"1988-06-15",
    "email_address":"sarah.mitchell@example.com","street_address":"482 Oakwood Drive"},
  "created_by":null,"last_updated_by":null,"created_at":"2026-10-23T19:15:12.501247Z","updated_at":"...","scenarios":[]},
 {"id":37003,"agent":22757,"name":"VR 5 journey — Maria Smith (+12345678905)",
  "information":{"main_agent_variables":{},"testing_agent_variables":{"phone":"+12345678905","first_name":"Maria","...":"..."}},
  "scenarios":[{"id":340453,"name":"TCH multi-intent journey evaluator"}],"...":"..."}]}
```

`POST /test_framework/v1/test-profiles/`

- Status: 201.
- Request:

```json
{"name":"zz-spec-test-profile",
 "information":{"main_agent_variables":{"caller_id":"+15550001111"},"testing_agent_variables":{"patientName":"Jane Test"}},
 "project":13875,"agent":26242}
```

- Response:

```json
{"id":62347,"project":13875,"agent":26242,"agent_name":"zz-spec-test-agent","name":"zz-spec-test-profile",
 "information":{"main_agent_variables":{"caller_id":"+15550001111"},"testing_agent_variables":{"patientName":"Jane Test"}},
 "created_by":9855,"last_updated_by":9855,"created_at":"2026-10-23T19:55:34.597857Z","updated_at":"2026-10-23T19:55:34.597872Z"}
```

`DELETE /test_framework/v1/test-profiles/{id}`

- Status: 204, empty body.

#### Business rules observed

- Each Agent gets a default Test Profile when the Agent is created. Name pattern: "Default Test Profile - <agent name> (<agent id>)". Example: 62342, created at 21:15, the same time as Agent 26242. Its `created_by` is null.
- The default Test Profile uses a flat `information` object with sample persona data (name, address, date of birth, email, phone).
- New Test Profiles use the two-part `information` object: `main_agent_variables` and `testing_agent_variables`.
- Evaluator generation creates Test Profiles named "test_profile_agent_<agent id>_<timestamp>". See 5.9.
- The default Test Profile is deletable. The capture deleted 62342.
- The public API docs state that `main_agent_variables` keys with an `X-` prefix become custom Session Initiation Protocol (SIP) headers on Session Initiation Protocol (SIP) Runs.

#### States

- Empty list, loading, and error states: not seen.
- Toast after create or delete: not seen in the screenshots.

#### Not seen in the capture

- A delete confirm dialog. The capture shows no dialog step.
- Edit and duplicate of a Test Profile.
- The JSON view of the variable editors.
- The expanded row content.
- Validation errors in the create dialog.

---

### 5.14 "Run a test suite from a file" dialog

#### Route and access

- Modal dialog on the Evaluators page.
- Access: "Run from file" in the toolbar.

#### Purpose

The dialog runs test cases from a JSON spec file without saved Evaluators. The file describes what to test. The dialog picks the Agent and the channel.

#### Layout

1. Title "Run a test suite from a file" with a file icon and "Close".
2. Two columns: "Agent", "Channel". Help below: "The file describes what to test. These pick what it runs against."
3. Section "Test suite file" with tabs "Upload file" and "Paste JSON".
4. Drop zone.
5. Footer: status text, "Check spec", "Run".

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Agent" | Select | Agents from the short list | "Select an agent" | Required (inferred) | Sends `agent_id` (inferred). |
| "Channel" | Select | "Voice (phone call)" seen. The public API docs list `voice`, `text`, `elevenlabs`, `livekit_v2`, `pipecat_v2`, `chirp`. | "Voice (phone call)" | none | Sends `channel` (inferred). |
| "Upload file" | Tab | none | Selected | none | Shows the drop zone. |
| "Paste JSON" | Tab | none | none | none | Shows a JSON text box (inferred). Not opened. |
| Drop zone | File input | "Drop a .json spec here, or click to choose one Up to 1 MB" | Empty | Up to 1 megabyte, `.json` | none |
| Status text | Text | "Add a spec file to get started." | Shown with no file | none | none |
| "Check spec" | Button | none | Disabled | Disabled with no spec | Validates the spec (inferred: `POST /test_framework/v2/scenarios/validate_scenarios_json/`). |
| "Run" | Button, filled | none | Disabled | Disabled with no spec | Starts the Runs (inferred: `POST /test_framework/v2/scenarios/run_scenarios_json/`). |

#### Backend calls

- On open: `GET /test_framework/v2/aiagents/short_list/?project_id=<id>&ql={id,agent_name,language,agent_gives_first_message}`. Status 200.

From the public API docs (not seen in the capture):

| Method | Path | Purpose | Main body fields |
|---|---|---|---|
| POST | `/test_framework/v2/scenarios/validate_scenarios_json/` | Validates a spec. Returns `{dry_run, valid, plan}` with case count and estimated cost. Creates nothing. | `spec` or `file`, `agent_id`, `channel`, `frequency`, `concurrency_limit`, `calls_per_second`, `mock_tool_names` |
| POST | `/test_framework/v2/scenarios/run_scenarios_json/` | Runs the spec. `dry_run=true` validates only. | Same as above, plus `name`, `agent_number`, `outbound_phone_number`, `mode` |
| GET | `/test_framework/v2/scenarios/json_schema/` | Returns the spec schema. | none |

#### Business rules from the public API docs

- The docs report every spec problem at once, keyed by location, for example `scenarios[3].metrics[1]`.
- Metrics in the spec must exist and be enabled for the target Agent.
- The platform removes spec test cases once no Run needs them.

#### Not seen in the capture

- A file upload, the "Paste JSON" tab, "Check spec" output, and a Run.
- The full "Channel" option list in the dashboard.
- Error messages for an invalid spec.

---

### 5.15 "Configure Run" dialog

#### Route and access

- Modal dialog on the Evaluators page.
- Access: select one or more rows, then click "Run" in the toolbar. The row play icon may also open it (inferred).

#### Purpose

The dialog sets the options of a Run batch for the selected Evaluators. The capture opened the dialog but did NOT start a Run.

#### Layout

1. Title "Configure Run" with a gear icon and "Close configure run".
2. Fields in one column, listed in the controls table.
3. "Connections" area with two groups: "VOICE" and "CHAT". Each connection is a tile with an icon.
4. A bordered box for the chosen connection: "Agent Email", "Mock Tools", then the collapsible "Show 5 more fields".
5. Sticky footer: link "Max concurrent: 10" with an arrow icon, button "Run" with a play icon.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Agent" | Select with robot icon | Agents | Agent of the selected Evaluators ("zz-spec-test-agent") | Required. Help: "Note - We leverage the description of the agent for generating. It is important you provide good detailed description. *" | none |
| "Label" | Text box | Free text | Empty | Help: "Add helpful text for your reference later" | Result `name` (inferred). |
| "Number of Times to Run" | Number box | Integer | "1" | Help: "Provide number of times each evaluator will run." | `frequency` (inferred). |
| Metric warning | Expandable button, amber | "1 metric won't be evaluated on this run" | Closed | none | Opens a list. Item: "Tool Call Success", "Its Simulation toggle is turned off", "Fix: Metrics page → turn on the Simulation toggle", button "Fix". |
| "Connections" | Tile group | VOICE: "Telephony", "SIP", "Websocket". CHAT: "Email", "SMS", "WhatsApp". | "Email" selected (check badge) | Help: "Pick a configured connection to run with. Greyed out connections are not set up on this agent." | Disabled tiles are the connections the Agent does not have. |
| "Agent Email" | Text box | Placeholder "agent@company.com" | "zz-spec-test-agent@example.invalid" | Help: "Email address of the agent under test. Pre-filled from agent settings." | `agent_email` (inferred). Shows for the Email connection. |
| "Mock Tools" | Multi-select with chips, clear "x", chevron | Agent mock tools | Chip "zz_spec_test_check_availability" | Help: "Select mock tools to activate for this run" | `mock_tool_names` (inferred). |
| "Show 5 more fields" | Collapsible button | none | Closed | none | Shows the five fields below. |
| "Randomize" | Switch | On, Off | Off | Help: "If true, we will make calls from different phone numbers." | `mode: "different_numbers"` when on (inferred). |
| "Personalities" | Multi-select button | "Select Personalities" | Empty | Help: "Select the personalities for the AI evaluator" | `personality_ids` (inferred). Source: Personalities with `language=all`. |
| "Test Profiles" | Multi-select button | "Select Test Profiles" | Empty | Help: "Select the test profiles for the evaluation" | `test_profile_ids` (inferred). |
| "Concurrent Runs Limit" | Number box | Placeholder "Default value is Organization limit" | "10" | Help: "Limit how many tests run at the same time." | `concurrency_limit` (inferred). |
| "Calls Per Second" | Number box | Placeholder "No limit" | Empty | Help: "How many calls start each second, from 0.1 to 4 (e.g. 0.5 starts one call every 2 seconds). Leave empty for no limit." | `calls_per_second`. Range 0.1 to 4. |
| "Max concurrent: 10" | Link | none | none | none | Opens `/settings/org/general`. |
| "Run" | Button, filled black | none | Enabled | none | Starts the Runs. Not clicked. |

#### Flows

1. The user selects row 401833 and clicks "Run".
2. The dashboard calls `GET /test_framework/v1/metrics/basic_list/?project_id=<id>&ql={id,name,eval_type,enum_values,observability_enabled,simulation_enabled,function_name,vocera_defined_metric_code,agents,project}` and `GET /test_framework/v1/aiagents/26242/history/?page=1&page_size=51&ql={history_id,version_id,version_name,is_current,is_runnable}`.
3. The user clicks the Metric warning. The list opens. No call.
4. The user clicks "Show 5 more fields". The dashboard calls `GET /user/v1/projects/<id>/personalities/?language=all&ql=...` and `GET /test_framework/v1/test-profiles/?project_id=<id>&page=1&page_size=50&ql={id,name}`.
5. The user clicks "Max concurrent: 10". The dashboard opens `/settings/org/general` and calls `GET /user/organizations/7868/`. The page shows "Parallel Call Limit" 10 and "Parallel Chat Limit" 10.
6. The capture stops here. No Run was started.

#### Backend calls

`GET /test_framework/v1/aiagents/{id}/history/`

- Query: `page=1`, `page_size=51`, `ql={history_id,version_id,version_name,is_current,is_runnable}`.
- Status: 200. The response returns more fields than `ql` asks for.

```json
{"count":5,"next":null,"previous":null,"results":[
 {"history_id":7104163,"is_current":true,"is_runnable":false,"history_date":"2026-10-23T19:18:54.267213Z",
  "history_type":"~","version_id":"v5","version_name":null,"id":26242,"agent_name":"zz-spec-test-agent","...":"..."},
 "..."]}
```

`GET /user/organizations/{id}/` (trimmed):

```json
{"id":7868,"name":"example-org","max_concurrent_runs_limit":10,"max_concurrent_chat_runs_limit":10,
 "max_call_duration":600,"outbound_timeout":300,"conditional_actions_generation_enabled":false,"...":"..."}
```

#### Business rules observed

- The dashboard enables only the connection tiles that the Agent has. The test Agent has an email address and a custom provider with no phone number, so only "Email" is enabled.
- The dialog pre-selects every mock tool of the Agent.
- "Concurrent Runs Limit" defaults to the organization `max_concurrent_runs_limit` (10).
- The Metric warning lists Metrics on the Evaluator that will not run. The reason shown is a Metric with its Simulation toggle off.
- The Agent version history loads with the dialog (inferred: for a version picker when a version `is_runnable`). No version picker shows in the capture.

#### Not seen in the capture

- The Run request, its response, and any toast. The Run was NOT started.
- The fields of the "Telephony", "SIP", "Websocket", "SMS", and "WhatsApp" connections.
- The "Fix" button result.
- The Personalities and Test Profiles pickers in the open state.
- A version picker for runnable Agent versions.
- Credit checks before a Run.

---

### 5.16 Delete flows

| Object | Trigger | Call | Status | Body | After |
|---|---|---|---|---|---|
| Evaluator | Select rows, click "Delete" in the toolbar | `POST /test_framework/v1/scenarios/delete_scenarios/?folder_path=<folder path>` | 200 | `{"project_id":13875,"scenarios":[401833]}` | Response body is empty. The dashboard reloads Folders and the Evaluator list twice. |
| Folder | Folder "⋮" menu, "Delete" | `POST /test_framework/v1/scenarios/delete_folder/` | 204 | `{"path":"zz-spec-test-folder","project_id":13875}` | The dashboard reloads Folders and `has_infrastructure_suite`, then opens "Regression Suite". |
| Test Profile | Red trash icon in the Test Profiles dialog | `DELETE /test_framework/v1/test-profiles/<id>` | 204 | none | The list reloads. |
| Personality | "Delete" on the Edit personality page | `DELETE /test_framework/v1/personalities/<id>/` | 204 | none | The dashboard opens `/personality?language=en`. |

#### Confirm dialogs

The crawl records do not hold these dialogs. The crawler read their text during the run. All four delete flows show a confirm dialog with "Cancel" and "Delete" buttons.

| Delete flow | Confirm text (verbatim) |
|---|---|
| Evaluator (toolbar "Delete") | "Are you sure you want to delete? This action cannot be undone. This will permanently delete the selected item." |
| Folder (folder menu "Delete") | "Delete folder "zz-spec-test-folder"? This action cannot be undone. This will permanently delete the folder and all scenarios inside it." |
| Test Profile (row menu "Delete") | "Are you sure you want to delete? This action cannot be undone. This will permanently delete the selected item." |
| Personality (edit page "Delete") | "Are you sure you want to delete? This action cannot be undone. This will permanently delete the selected item." |

#### Not seen in the capture

- Toasts after delete.
- Delete of a Folder that still holds Evaluators.
- Single delete from the row "..." menu. The public API docs also list `DELETE /test_framework/v1/scenarios/{id}/`.

---

### 5.17 Run endpoints and Result fields (from the public API docs)

The capture did not start a Run. This part comes from the public API docs. The dashboard path for each connection tile is inferred.

#### One endpoint per connection type

| Connection | Dashboard tile (inferred) | Endpoint | Notes from the public API docs |
|---|---|---|---|
| Phone call | "Telephony" | `POST /test_framework/v2/scenarios/run_scenarios/` | Needs `telephony.phone_number` on the Agent. |
| Session Initiation Protocol (SIP) | "SIP" | `POST /test_framework/v2/scenarios/run_scenarios_sip/` | Needs `telephony.sip_uri`. Optional `sip_endpoint` override. |
| Text, Short Message Service (SMS), chat | "SMS", "WhatsApp" | `POST /test_framework/v2/scenarios/run_scenarios_text/` | Needs a chat connection, or `websocket_url`. Optional `websocket_headers`. |
| Email | "Email" | `POST /test_framework/v2/scenarios/run_scenarios_email/` | Needs `email_id` on the Agent, or `agent_email`. `scenarios` and `frequency` (1 to 100) are required. |
| WebSocket per Evaluator | "Websocket" | `POST /test_framework/v2/scenarios/run_scenarios_with_websockets/` | `scenarios` is a list of `{scenario, websocket_url}`. `frequency` is required. |
| Raw audio WebSocket | none seen | `POST /test_framework/v2/scenarios/run_scenarios_chirp/` | none |
| Vapi Web Real-Time Communication (WebRTC) | none seen | `POST /test_framework/v2/scenarios/run_scenarios_vapi_webrtc/` | none |
| Retell Web Real-Time Communication (WebRTC) | none seen | `POST /test_framework/v2/scenarios/run_scenarios_retell_webrtc/` | none |
| ElevenLabs | none seen | `POST /test_framework/v2/scenarios/run_scenarios_elevenlabs/` | none |
| LiveKit | none seen | `POST /test_framework/v2/scenarios/run_scenarios_livekit_v2/` | none |
| Pipecat | none seen | `POST /test_framework/v2/scenarios/run_scenarios_pipecat/`, `.../run_scenarios_pipecat_v2/` | none |
| Agora | none seen | `POST /test_framework/v2/scenarios/run_scenarios_agora/` | none |
| JSON spec | "Run from file" | `POST /test_framework/v2/scenarios/run_scenarios_json/` | See 5.14. |

Each endpoint also has a `/test_framework/v1/scenarios/...` form with the same name.

#### Main request fields (voice endpoint)

| Field | Type | Meaning |
|---|---|---|
| `agent_id` | integer | Agent under test. |
| `scenarios` | array of integer | Evaluator IDs. Use this, or `tags`, or `folder_path`. |
| `tags` | array of string | Select Evaluators by tag. |
| `folder_path` | string | Dot-separated Folder path. Needs `project_id`. |
| `project_id` | integer | Project. |
| `frequency` | integer, minimum 1, default 1 | Times each Evaluator runs. Repeats run the whole list in order (A, B, A, B). |
| `name` | string | Result label. |
| `personality_ids` | array of integer | Personality overrides. They must be enabled for the project. |
| `test_profile_ids` | array of integer | Test Profile overrides. |
| `mode` | `same_number` or `different_numbers` | Same or different caller numbers. |
| `outbound_phone_number`, `agent_number` | string | Phone number overrides. |
| `concurrency_limit` | integer, minimum 1 | Parallel Run cap. |
| `calls_per_second` | number, 0.1 to 4 | Call start rate. |
| `mock_tool_names` | array of string | Mock tools to activate. Omit to mock all. Empty list mocks none. |
| `agent_version_id` | string | Run against a stored Agent version. |

Run count rule (public API docs): total calls = number of Evaluators × `frequency` × max(1, number of `personality_ids`) × max(1, number of `test_profile_ids`).

#### Response: the Result

The start call returns the Result itself. Poll `GET /test_framework/v1/results/{id}/` (or `/test_framework/v2/results/{id}/`) until `status` is `completed`, `failed`, `timeout`, or `cancelled`.

```json
{"id":167,"agent":1,"status":"pending","success_rate":0,"run_as_text":false,
 "runs":[{"id":274,"scenario":1,"number":null,"inbound_number":"+11234567890",
   "outbound_dial_window_opens_at":null,"outbound_dial_window_seconds":null,"outbound_dial_window_closes_at":null}],
 "created_at":"2025-02-25T21:00:01.990052Z"}
```

Result fields (public API docs, model `Result`):

| Field | Meaning |
|---|---|
| `id`, `name` | Result ID and label. |
| `agent`, `agent_name`, `agent_inbound` | Agent data. |
| `status` | `running`, `completed`, `failed`, `pending`, `in_progress`, `evaluating`, `in_queue`, `timeout`, `cancelled`, `scaling_up`. Default `pending`. |
| `success_rate` | Percent of Runs that passed, 0 to 100. |
| `run_as_text` | Text mode flag. |
| `is_cronjob`, `created_via`, `created_by`, `api_key` | Origin of the Result. `created_via` values: user, api, mcp, cli, sdk, schedule, agent. |
| `runs` | Run summaries. |
| `met_expected_outcome_count`, `total_expected_outcome_count` | Expected outcome counts. |
| `total_runs_count`, `completed_runs_count`, `success_runs_count`, `failed_runs_count` | Run counts. |
| `scenarios` | `[{id, name}]` of the Evaluators in the Result. |
| `run_type` | Execution type. |
| `agent_version` | Agent version summary or null. |
| `created_at`, `updated_at` | Timestamps. |

Run fields in the start response:

| Field | Meaning |
|---|---|
| `runs[].id` | Run ID. |
| `runs[].status` | Same values as the Result `status`. |
| `runs[].scenario`, `runs[].scenario_name` | Evaluator. |
| `runs[].number` | Outbound Agents: the number the Agent must call. |
| `runs[].inbound_number` | Inbound Agents: the number that calls the Agent. |
| `runs[].test_profile_data` | Test Profile of the Run. |
| `runs[].outbound_dial_window_opens_at`, `_seconds`, `_closes_at` | Outbound dial window. A dial after the close time gives `status: timeout`. Default window 300 seconds. |

Business rules from the public API docs:

- A Result stays non-terminal until every Run ends. It becomes `completed` if any Run completed, even when other Runs failed.
- For a recurring Run, the docs direct the caller to a scheduled job (`POST /test_framework/v1/cron_jobs/`), not to a loop of this endpoint.

## 6. Results, Runs Overview, Monitors, and Observability

This section covers the pages that show the output of simulations and of production calls. The sidebar group "Simulation" holds Results, Runs Overview, and Monitors. The sidebar group "Observability" holds Calls, Alerts, Insights, and Overview.

Shared conventions for this section:

| Item | Value |
|---|---|
| Example project ID | `13875` ("Automaton Project") |
| Dashboard host | `https://app.example.com` |
| Backend host used by the dashboard | `https://backend.example.com` |
| Public API host (docs only) | `https://api.example.com` |
| Field selection | Many list calls send a `ql` query parameter. It names the fields that each row carries, for example `ql={id,name}`. A leading minus removes a field, for example `ql={-transcript}`. |
| Project scope | Most calls send `project_id=<project>`. The Insights calls send `project=<project>`. |
| Browser timezone in the capture | `Europe/Paris` (Coordinated Universal Time (UTC) +02:00) |
| Data in the capture | The project had no results, no runs, and no production calls. Every chart and table showed its empty state. |

Sidebar links (from the sidebar accessibility tree):

| Sidebar item | Group | Link target |
|---|---|---|
| Results | Simulation | `/13875/results?page=1&view=results` |
| Runs Overview | Simulation | `/runs-overview?project=13875` |
| Monitors | Simulation | `/cron-jobs?project=13875&page=1` |
| Calls | Observability | `/13875/calls?page=1` |
| Alerts | Observability | `/13875/alerts/review` |
| Insights | Observability | `/13875/insights` |
| Overview | Observability | `/13875/dashboards` |

Probe call: almost every page in this section sends `GET /test_framework/v2/results/?page=1&page_size=1&ql={...}&project_id=13875`. The page uses only the first row. The dashboard uses this call to know if the project has any Result (inferred). Section 6.1 gives the full call.

### 6.1 Results page

#### Route and entry

- Route: `/<project>/results?page=<n>&view=<results|runs>&pageSize=<n>`.
- Example: `/13875/results?page=1&view=results&pageSize=30`.
- Entry: sidebar item "Results". The sidebar link has no `pageSize`. The page adds `pageSize=30` to the URL.

#### Purpose

The page lists the Results of Evaluator runs. A Result is one batch of Runs. A Run is one simulated call or chat. The "Runs" toggle lists the single Runs with one column for each Metric.

Page text (verbatim): "Browse the results of your evaluator runs, drill into individual call transcripts and metric scores, and compare runs to see how your agent is performing." The "Learn more" link opens `https://docs.example.com/documentation/guides/dashboards`.

#### Layout

1. Header: title "Results", description paragraph, "Learn more" link.
2. Toolbar, left to right: "Select View" dropdown, "Results" and "Runs" segmented toggle, "Filters", "Export All", "Reports", "Compare Results", "Reevaluate Metrics", red delete icon button.
3. Table with a checkbox column (Results view only).
4. Pagination bar: "Previous", "Next", "Rows per page:" select.

In the Runs view, the toolbar shows only "Select View", the toggle, and "Filters".

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Select View" | Dropdown button | Saved views from `GET /test_framework/v1/views/`. The capture had 0 views. | "Select View" | None seen | Applies a saved view (inferred). The open state was not captured. |
| "Results" | Toggle button | "Results", "Runs" | "Results" | None | Sets `view=results` in the URL. Shows the Results table. |
| "Runs" | Toggle button | "Results", "Runs" | Off | None | Sets `view=runs` in the URL. Sends `GET /test_framework/v2/runs/`. |
| "Filters" | Button that opens a popover | See "Filters popover" | No filters | None | Opens the Filters popover. |
| "Export All" | Button | None | Enabled | None | Exports the Results (inferred). Not clicked in the capture. |
| "Reports" | Button | None | Disabled (screenshot only) | None | Not in the accessibility tree. Visible as a greyed button in the screenshot. |
| "Compare Results" | Button | None | Disabled (screenshot only) | None | Not in the accessibility tree. Visible as a greyed button in the screenshot. Needs selected rows (inferred). |
| "Reevaluate Metrics" | Button | None | Disabled | None | Becomes enabled when the user selects rows (inferred). |
| Delete icon (no label) | Icon button, red | None | Disabled | None | Deletes the selected Results (inferred). |
| Header checkbox | Checkbox | Checked, unchecked | Unchecked | None | Selects all rows on the page (inferred). |
| "Previous page" | Button "Previous" | None | Disabled on page 1 | None | Goes to the previous page. |
| "Next page" | Button "Next" | None | Disabled when `next` is null | None | Goes to the next page. |
| "Rows per page:" | Select | Only "30" seen | "30" | None | Sets `page_size` and `pageSize`. |

#### Results view table columns

| # | Column header (verbatim) | Source field (from the `ql` value) |
|---|---|---|
| 1 | (checkbox) | none |
| 2 | "ID" | `id` |
| 3 | "Label" | `name` |
| 4 | "# Evaluators" | `scenarios` (count, inferred) |
| 5 | "Runs" | `total_runs_count`, `completed_runs_count` (inferred) |
| 6 | "Agent" | `agent`, `agent_name`, `agent_version` |
| 7 | "Type" | `run_type`, `run_as_text` (inferred) |
| 8 | "Status" | `status` |
| 9 | "Score" | `success_rate` |
| 10 | "Created At" | `created_at` |
| 11 | (no header) | Row actions (inferred) |

#### Runs view table columns

The Runs view has a fixed set of columns and then one column for each Metric of the project. Each header is a sort button (inferred from the button role). The screenshot shows a drag grip on each header, so the user can reorder the columns (inferred).

| # | Column header (verbatim) | Source field |
|---|---|---|
| 1 | (empty) | none |
| 2 | "ID" | `id` |
| 3 | "Result ID" | `result_id` |
| 4 | "Evaluator Name" | `scenario_name` |
| 5 | "Run Start Time" | `timestamp`, `executed_at`, `metadata.call_started_at` (inferred) |
| 6 | "Duration" | `duration` |
| 7 | "Evaluation" | `evaluation_status`, `success` (inferred) |
| 8 | "Personality" | `personality_name` |
| 9 | "Agent" | `agent_name` |
| 10 | "Call Ended Reason" | `metadata.ended_reason` |
| 11 | "Ringing Duration" | `metadata.ringing_duration` |
| 12 | "Feedback" | `feedback` |
| 13 and later | One header for each Metric, for example "AI interrupting user", "Latency (in ms)", "Expected Outcome", "zz-spec-test-metric" | `metrics` |

The Metric columns in the capture, in order: "AI interrupting user", "Average Pitch (in Hz)", "Expected Outcome", "Infrastructure Issues", "Interruption Score", "Latency (in ms)", "Stop Time after User Interruption (ms)", "Talk Ratio", "Transcription Accuracy", "Unnecessary Repetition Score", "Persona Integrity", "No Fabricated Availability", "Confirmation Before Mutation", "Mock tool call accuracy", "new_appointment_booking", "zz-spec-test-metric". The list comes from `GET /test_framework/v1/metrics/basic_list/`.

#### Filters popover

| Element | Text (verbatim) | Behavior |
|---|---|---|
| Heading | "Filters" | none |
| Close button | "Close" (icon "×") | Closes the popover. |
| Empty text | "No filters yet." | Shows when no filter row exists. |
| Button | "Add filter" | Adds a filter row (inferred). The row form was not captured. |
| Button | "Clear" | Removes all filter rows (inferred). |
| Button | "Apply" | Applies the filters to the table (inferred). |

When the popover opens, the page loads the Evaluator tags and the Evaluator names. The filter fields probably use these lists (inferred).

#### Flows

1. The user opens Results. The page sends `GET /test_framework/v2/results/?page=1&page_size=30&ql=...`, `GET /test_framework/v1/metrics/basic_list/`, and `GET /test_framework/v1/views/`.
2. The user clicks "Runs". The URL changes to `view=runs`. The page sends `GET /test_framework/v2/runs/?project_id=13875&page=1&page_size=30&ql=...`.
3. The user clicks "Filters". The page sends `GET /test_framework/v1/scenarios/tags/` and `GET /test_framework/v1/scenarios/?ql={id,name}`.
4. The user clicks "Results" again. The URL changes to `view=results`.

#### Backend calls

| # | Method and path | Important query parameters | Status seen |
|---|---|---|---|
| 1 | `GET /test_framework/v2/results/` | `page=1`, `page_size=30` (or `1` for the probe), `project_id=13875`, `ql={id,name,agent,agent_name,agent_version,status,success_rate,run_as_text,run_type,scenarios,total_runs_count,completed_runs_count,created_at}` | 200 |
| 2 | `GET /test_framework/v2/runs/` | `project_id=13875`, `page=1`, `page_size=30`, `ql={id,result_id,scenario,scenario_name,personality,personality_name,agent,agent_name,agent_version,duration,status,evaluation_status,expected_outcome{score},success,timestamp,executed_at,metadata{ended_reason,ringing_duration,call_started_at},outbound_number,inbound_number,metrics,error_message,test_profile_name,run_type,feedback}` | 200 |
| 3 | `GET /test_framework/v1/metrics/basic_list/` | `project_id=13875`, `ql={id,name,eval_type,enum_values,observability_enabled,simulation_enabled,function_name,vocera_defined_metric_code}` | 200 |
| 4 | `GET /test_framework/v1/views/` | `project_id=13875` | 200 |
| 5 | `GET /test_framework/v1/scenarios/tags/` | `project_id=13875` | 200 |
| 6 | `GET /test_framework/v1/scenarios/` | `project_id=13875`, `ql={id,name}` | 200 |

Response of call 1 and call 2 in the capture. The envelope has no `count` field:

```json
{"next": null, "previous": null, "results": []}
```

Response of call 3 (trimmed):

```json
[
  {"id": 240898, "name": "AI interrupting user", "eval_type": "numeric", "enum_values": [],
   "observability_enabled": true, "simulation_enabled": true,
   "function_name": "get_main_agent_interruption", "vocera_defined_metric_code": "ec29cab5"},
  "..."
]
```

Response of call 4:

```json
{"count": 0, "next": null, "previous": null, "results": []}
```

Response of call 5:

```json
["booking", "callback", "junk call", "sales call"]
```

Response of call 6 (trimmed):

```json
{"count": 9, "next": null, "previous": null,
 "results": [{"id": 401833, "name": "Returning patient moves dental appointment after date correction", "is_simulating": false}, "..."]}
```

#### Result object (from the public API docs)

The capture had no Result rows. This model comes from the public API docs, model `Result`. The list endpoint `GET /test_framework/v2/results/` returns it.

| Field | Type | Notes (from the public API docs) |
|---|---|---|
| `id` | integer | Read-only. |
| `name` | string, max 255 | The "Label" column. |
| `agent` | integer | ID of the tested Agent. |
| `agent_name` | string | Read-only. |
| `agent_inbound` | boolean | True for inbound Agents. |
| `status` | string | One of `running`, `completed`, `failed`, `pending`, `in_progress`, `evaluating`, `in_queue`, `timeout`, `cancelled`, `scaling_up`. Default `pending`. |
| `success_rate` | number | Percentage of Runs that passed, 0 to 100. |
| `run_as_text` | boolean | True for text mode. |
| `is_cronjob` | string | True when a Monitor created the Result. |
| `created_via` | string or null | `user`, `api`, `mcp`, `cli`, `sdk`, `schedule`, or `agent`. |
| `created_by` | object or null | The user who started the Result. |
| `api_key` | object or null | `{id, name, created_by}` of the API key that started the Result. |
| `runs` | object | Run summaries. |
| `met_expected_outcome_count`, `total_expected_outcome_count` | string | Expected outcome counts. |
| `total_runs_count`, `completed_runs_count`, `success_runs_count`, `failed_runs_count` | string | Run counts. |
| `scenarios` | object | List of `{id, name}` of the Evaluators in the Result. |
| `run_type` | string or null | Run execution type. |
| `agent_version` | object or null | The Agent version that the Result ran against. |
| `created_at`, `updated_at` | date-time | Read-only. |

Status rule (quoted from the public API docs): "a result marked `failed` indicates infrastructure failures (e.g. connection errors, websocket handshake failures), not metric evaluation failures."

#### Run object (from the public API docs)

The capture had no Run rows. This model comes from the public API docs, model `Run`. The public API docs list no `GET /test_framework/v2/runs/` list endpoint. They list `GET /test_framework/v2/runs/{id}/` and `GET /test_framework/v2/runs/bulk/`.

| Field | Type | Notes (from the public API docs) |
|---|---|---|
| `id` | integer | Read-only. |
| `provider_call_id` | string | Call ID from the voice provider. |
| `scenario`, `scenario_name`, `scenario_type` | integer, string, string | The Evaluator. `scenario_name` defaults to `Scenario Deleted`. |
| `personality`, `personality_name` | integer, string | The Personality. |
| `agent`, `agent_name`, `agent_version` | integer, string, object | The Agent. |
| `result_id`, `result_name` | integer, string | The parent Result. |
| `expected_outcome_prompt` | string | The expected outcome text. |
| `expected_outcome` | object | `{score, explanation, outcome_alignments}`. |
| `evaluation` | object | `{metrics: [...]}`, one entry for each Metric. |
| `rubric` | array or null | Rubric rule results. |
| `transcript` | string | Full text transcript. |
| `transcript_object` | array | Transcript turns with role, content, start time, and end time. |
| `duration` | string | `MM:SS`. |
| `voice_recording_url` | string | Recording URL. |
| `status` | string | Same values as the Result `status`. |
| `evaluation_status` | string | `success`, `failure`, `reviewed_success`, `reviewed_failure`. |
| `metadata` | object | Holds `ended_reason`, `ringing_duration`, `call_started_at` (from the `ql` value). |
| `success` | boolean | False if the call did not connect or a check failed. |
| `is_reviewed` | boolean | Review flag. |
| `feedback` | string | User feedback. |
| `timestamp`, `executed_at` | date-time | Start times. |
| `outbound_number`, `inbound_number` | string | Phone numbers. |
| `critical_categories` | array | Critical evaluation categories. |
| `error_message` | string | Connection error text. |
| `run_type` | string or null | Run execution type. |
| `outbound_dial_window_opens_at`, `outbound_dial_window_closes_at`, `outbound_dial_window_seconds` | string | Outbound dial window. |

#### Result detail (from the public API docs)

The capture did not open a Result detail page because no Result existed. The route of the detail page is not known. A rebuild needs these data from `GET /test_framework/v2/results/{id}/` (model `ResultDetailV2`, from the public API docs):

| Field | Use on a detail page (inferred) |
|---|---|
| `runs` | A dictionary keyed by Run ID string, for example `{"86368": {...}}`. The list endpoint returns an array instead. |
| `overall_evaluation` | `success_rate`, `metric_summary` (keyed by Metric ID), `worst_performing_metrics`, `numeric_metrics`, `enum_metrics`, `extra_metrics`. |
| `total_duration` | Total duration, `MM:SS`. |
| `connected_runs`, `not_connected_runs` | Run IDs with and without transcript data. |
| `failed_infrastructure_runs`, `failed_workflow_runs`, `successful_calls` | Run ID lists for the failure breakdown. |
| `critical_categories`, `metrics`, `runs_by_tags`, `latency_data` | Breakdown data. |
| `failed_reasons` | `{issues: [{rank, run_ids, description, affected_count}], total_failed_runs}`. |
| `ai_summary` | `{what_happened, why_it_happened, how_to_fix, generated_from_runs_count, generated_at}`. |
| `ai_summary_status` | `completed`, `skipped_no_failures`, or `pending`. |
| `next_steps` | Array of `{title, description}`. |
| `path_coverage` | `{coverage_pct, total_paths, covered_paths, uncovered_paths, generated_at}`. |
| `performance_metrics` | One entry for each rubric rule. |
| `run_settings` | Snapshot of the run overrides. |

Trimmed detail example (from the public API docs):

```json
{
  "id": "integer", "name": "string", "agent": "integer", "status": "string",
  "success_rate": "float", "run_as_text": "boolean", "is_cronjob": "boolean",
  "runs": {
    "run_id": {
      "id": "integer", "scenario": "integer", "success": "boolean",
      "expected_outcome": {"score": 100, "explanation": ["..."], "outcome_alignments": ["..."]},
      "evaluation": {"metrics": [{"id": "integer", "name": "string", "type": "binary | continuous_qualitative | numeric | enum", "score": "number", "explanation": "string | array"}]},
      "duration": "string (MM:SS format)", "status": "string"
    }
  },
  "overall_evaluation": {"success_rate": "number", "metric_summary": {"...": "..."}},
  "total_duration": "string (MM:SS format)", "total_runs_count": "integer"
}
```

Other Result actions in the public API docs (paths only): `POST /test_framework/v2/results/{id}/rerun/`, `POST /test_framework/v2/results/{id}/evaluate_metrics/`, `POST /test_framework/v1/results/bulk_evaluate_metrics/`, `POST /test_framework/v1/results/bulk_delete/`, `POST /test_framework/v2/results/{id}/delete_runs/`, `POST /test_framework/v2/results/{id}/end_calls/`, `POST /test_framework/v2/results/{id}/create_shareable_link_token/`, `GET /test_framework/v2/results/reports/`. The "Reevaluate Metrics", delete, and "Reports" buttons probably use these paths (inferred).

#### States

| State | What shows |
|---|---|
| Empty (Results view) | The table header with an empty body. No empty-state text. "Previous" and "Next" are disabled. |
| Empty (Runs view) | The table header with an empty body and a `status` region with no text. |
| Filters with no rows | "No filters yet." |
| Disabled | "Reevaluate Metrics", delete icon, "Reports", "Compare Results" with no selection. |

#### Business rules

- The URL holds the view (`view`), the page (`page`), and the page size (`pageSize`).
- The Runs view adds one column for each Metric of the project, in Metric order.
- The default page size is 30.

#### Not seen in the capture

- Any Result row or Run row. The project had no Results.
- The Result detail page and its route.
- The Run detail page (transcript, recording, Metric scores).
- The "Select View" menu and the save-view flow.
- The filter row form after "Add filter".
- The "Export All" output and its backend call.
- The behavior of "Reports", "Compare Results", "Reevaluate Metrics", and delete.
- The other "Rows per page:" options.

### 6.2 Runs Overview page

#### Route and entry

- Route: `/runs-overview?project=<project>&from=<from>&to=<to>`.
- Example: `/runs-overview?project=13875&from=now-6h&to=now`.
- Entry: sidebar item "Runs Overview". The page adds `from=now-6h&to=now` to the URL.
- The "Try Dashboards" button adds `view=new` to the URL. This opens the dashboard view of Runs (see "Try Dashboards view").

#### Purpose

The page shows summary numbers and trend charts for simulation Runs in a time range. It is the "classic view". The "Try Dashboards" button opens a widget dashboard on the same data.

#### Layout

1. Toolbar, left: title "Runs overview", "Select dashboard" dropdown, "Try Dashboards" button (black, with an arrow).
2. Toolbar, right: "Metrics" button, "Line" and "Bar" chart type toggle, period select "Day", time range button "Last 6 hours", "Filters" button, "Save dashboard" button.
3. Four stat cards in one row: "Success rate", "Number of calls", "Talk ratio", "Average latency". Each card has a value and a "vs previous period" line.
4. Section "Trends overview" with two charts side by side: "Success rate over time" (with an "Expand chart" button) and "Latency over time".
5. Section "Metrics over time".
6. Section "Top failed scenarios".

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Select dashboard" | Dropdown menu | Saved dashboards. Empty state item: "No saved dashboards" (disabled). | "Select dashboard" | None | Loads a saved configuration (inferred). |
| "Try Dashboards" | Button | None | Enabled | None | Adds `view=new` to the URL. Shows the dashboard view. |
| "Metrics" | Button that opens a dialog | Dialog "Metric visibility" | All visible (inferred) | None | Opens "Metric visibility". With no data, the dialog shows "No metrics available". |
| "Chart type" | Radio group | "Line", "Bar" | "Bar" | None | Sets `chart_type` on the overview call. |
| Period select | Combobox | Only "Day" seen. The enum `AggregationPeriodChoices` has "Hour", "Day", "Week". | "Day" | None | Sets `period` on the overview call. |
| Time range | Button that opens a popover | See 6.8 | "Last 6 hours" | See 6.8 | Sets `from` and `to` in the URL. |
| "Filters" | Button that opens a dialog | Dialog "Filter options" | No filters | None | See "Filter options dialog". |
| "Save dashboard" | Button that opens a dialog | Dialog "Save dashboard" | Enabled | None | See "Save dashboard dialog". |
| "Expand chart" | Icon button | None | Enabled | None | Opens the chart in a larger view (inferred). |

#### Stat cards and charts

| Element | Text in the capture (verbatim) | Source field |
|---|---|---|
| Card "Success rate" | "0.0%", "0% vs previous period" | `success_rate`, `success_rate_change` |
| Card "Number of calls" | "0", "0% vs previous period" | `total_calls`, `total_calls_change` |
| Card "Talk ratio" | "0.00", "0% vs previous period" | `avg_talk_ratio`, `avg_talk_ratio_change` |
| Card "Average latency" | "0.00ms", "0% vs previous period" | `avg_latency`, `avg_latency_change` |
| Chart "Success rate over time" | Axis "Oct 23", values 0 to 4 | `success_rate_summary` |
| Chart "Latency over time" | "No data available" | `latency_metric` |
| Section "Metrics over time" | "No data available" | `metric_summary` |
| Section "Top failed scenarios" | "No data available" | `top_scenarios_failed` |

#### Filter options dialog

- Title: "Filter options". A "Clear all" button sits in the title row.
- Left column heading: "Select your filter". It holds a tab list.
- Tabs (verbatim, in order): "Agents", "Tags", "Personality", "Scenarios", "Folders", "Monitors", "Run source", "Run type", "IDs". "Agents" is selected by default.
- Right column: a "Search..." text box and the options of the selected tab.
- The "Agents" tab shows a radio group with one radio for each Agent, for example "Voice Regression — E2E Deploy Agent Sq" and "zz-spec-test-agent".
- Bottom of the left column: "Apply filters" button. It is disabled until the user picks a value (inferred).

When the dialog opens, the page loads tags, Agents, Monitors, and Personalities.

#### Save dashboard dialog

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Dashboard name" | Text box | Placeholder "Weekly regression review" | Empty | "Save" stays disabled while the name is empty (inferred) | Name of the saved dashboard. |
| "Filters included" | Read-only text | "No filters applied. This dashboard saves the date range only." | That text | None | Lists the active filters. |
| "Date range" | Combobox | Only "Last 7 days" seen | "Last 7 days" | None | Date range to save. |
| "Include metric visibility" | Switch | On, off | On | None | Helper: "Remembers which metrics are hidden on this dashboard." |
| "Cancel" | Button | None | Enabled | None | Closes the dialog. |
| "Save" | Button | None | Disabled | None | Saves a configuration of type `runs_overview` (inferred). Not clicked. |

#### Try Dashboards view

- Route: `/runs-overview?project=13875&from=now-6h&to=now&view=new`.
- Toolbar: "Select dashboard" combobox with the value "Runs Overview", "Classic view" button, "Add Plot" button, "All agents" combobox, "Metadata" button, "Last 7 days" button, and refresh icon buttons.
- The view uses the same dashboard component as the Overview dashboards in 6.7. The data source is `runs`, not `call_logs`.
- "Classic view" returns to the classic Runs Overview (inferred).
- The stat row shows "Success Ratio 0% —", "Number of Runs 0 —", "Total Run Minutes 00:00 —", "Median Latency 0ms —".

Default widgets of the Runs dashboard (14 widgets, from `GET /dashboards/widgets/?dashboard_id=16300` and the data calls):

| Widget ID | Title (verbatim) | `field` | `chart_type` | Aggregation | Footer label (verbatim, from the screenshot) |
|---|---|---|---|---|---|
| 108633 | Overview Stats | `stat` | `stat` | none | none |
| 108634 | "Success rate over time" | `success` | `bar` | `avg`, `day` | "Success", "Count" |
| 108635 | "Latency over time" | `metric_evaluations.value` (Metric 240903) | `line` | none | "Latency (in ms)" |
| 108636 | "Expected Outcome" | `metric_evaluations.value` (Metric 240900) | `bar` | `avg`, `day` | "Expected Outcome", "Percentage" |
| 108637 | "AI interrupting user" | `metric_evaluations.value` (Metric 240898) | `bar` | `avg`, `day` | "AI interrupting user", "Avg" |
| 108638 | "Average Pitch (in Hz)" | `metric_evaluations.value` (Metric 240899) | `bar` | `avg`, `day` | "Average Pitch (in Hz)", "Avg" |
| 108639 | "Infrastructure Issues" | `metric_evaluations.value` (Metric 240901) | `bar` | `avg`, `day` | "Infrastructure Issues", "Percentage" |
| 108640 | "Top failed scenarios" | `scenario.name` | `pie` | none | "Scenario" |
| 108641 | "Interruption Score" | `metric_evaluations.value` (Metric 240902) | `bar` | `avg`, `day` | "Interruption Score", "Percentage" |
| 108642 | "Stop Time after User Interruption (ms)" | `metric_evaluations.value` (Metric 240904) | `bar` | `avg`, `day` | "...", "Avg" |
| 108643 | "Talk Ratio" | `metric_evaluations.value` (Metric 240905) | `bar` | `avg`, `day` | "Talk Ratio", "Avg" |
| 108644 | "Transcription Accuracy" | `metric_evaluations.value` (Metric 240907) | `bar` | `avg`, `day` | "Transcription Accuracy", "Percentage" |
| 108645 | "Unnecessary Repetition Score" | `metric_evaluations.value` (Metric 240908) | `bar` | `avg`, `day` | "Unnecessary Repetition Score", "Percentage" |
| 108646 | "Persona Integrity" | `metric_evaluations.value` (Metric 243607) | `bar` | `avg`, `day` | "Persona Integrity", "Percentage" |

#### Flows

1. The user opens Runs Overview. The page sends `GET /enums/`, `GET /test_framework/v1/metrics/basic_list/`, `GET /test_framework/v1/configurations/?configuration_type=runs_overview`, `GET /user/v1/projects/13875/personalities/`, and `GET /test_framework/v1/aiagents/runs_overview_project/`. The capture shows three identical overview calls on one load.
2. The user opens "Select dashboard". The menu shows the configurations. With none, it shows "No saved dashboards".
3. The user clicks "Metrics". The dialog "Metric visibility" opens. No call.
4. The user clicks "Last 6 hours". The time range popover opens. No call.
5. The user clicks "Filters". The page sends `GET /test_framework/v1/scenarios/tags/`, `GET /test_framework/v2/aiagents/short_list/`, `GET /schedules/v1/cron-jobs/`, and `GET /user/v1/projects/13875/personalities/`.
6. The user clicks "Save dashboard". The dialog opens. No call. The save was not done.
7. The user clicks "Try Dashboards". The page sends `GET /dashboards/dashboards/?project_id=13875&source=runs`, `GET /dashboards/widgets/?dashboard_id=16300&page_size=40`, and one `GET /dashboards/widgets/{id}/data/` for each widget.

#### Backend calls

| # | Method and path | Important query parameters | Status seen |
|---|---|---|---|
| 1 | `GET /test_framework/v1/aiagents/runs_overview_project/` | `project_id=13875`, `from=2026-10-23T15:06:52.332+02:00`, `to=2026-10-23T21:06:52.332+02:00`, `chart_type=bar`, `period=day` | 200 |
| 2 | `GET /test_framework/v1/configurations/` | `project_id=13875`, `configuration_type=runs_overview` | 200 |
| 3 | `GET /enums/` | none | 200 |
| 4 | `GET /dashboards/dashboards/` | `project_id=13875`, `source=runs` | 200 |
| 5 | `GET /dashboards/widgets/` | `dashboard_id=16300`, `page_size=40` | 200 |
| 6 | `GET /dashboards/widgets/{id}/data/` | `timezone=Europe/Paris` | 200 |
| 7 | `GET /schedules/v1/cron-jobs/` | `project_id=13875`, `ql={id,name,agent,scenario_ids,scenarios_data{id,name},crontab_expression,timezone,frequency,execution_mode,personalities,concurrency_limit,is_active,created_at,run_settings}` | 200 |
| 8 | `GET /test_framework/v2/aiagents/short_list/` | `project_id=13875`, `ql={id,agent_name,language,agent_gives_first_message}` | 200 |

The `from` and `to` values are absolute timestamps with the browser offset. The page converts `now-6h` and `now` before the call.

Response of call 1 (complete, empty project):

```json
{
  "metric_summary": {}, "success_rate": 0, "total_calls": 0,
  "prev_success_rate": 0, "prev_total_calls": 0,
  "success_rate_change": 0, "total_calls_change": 0,
  "avg_latency": 0, "prev_avg_latency": 0, "avg_latency_change": 0,
  "avg_talk_ratio": 0, "prev_avg_talk_ratio": 0, "avg_talk_ratio_change": 0,
  "success_rate_summary": [{"time_interval": "2026-10-23T00:00:00", "total_calls": 0, "successful_calls": 0, "success_rate": 0.0}],
  "total_calls_summary": [], "top_scenarios_failed": [],
  "talk_ratio_metric": {}, "latency_metric": {}
}
```

Response of call 2:

```json
{"count": 0, "next": null, "previous": null, "results": []}
```

Response of call 4:

```json
{"count": 1, "next": null, "previous": null, "results": [{
  "id": 16300, "name": "Runs Overview", "project": 13875, "source": "runs", "is_default": true,
  "filters": {"operator": "and", "conditions": [
    {"op": "gte", "field": "timestamp", "value": "now-7d"},
    {"op": "lte", "field": "timestamp", "value": "now"}]},
  "widget_count": 14,
  "created_at": "2026-10-23T20:00:43.972710Z", "updated_at": "2026-10-23T20:00:43.972726Z"}]}
```

Response of call 5 (trimmed to one widget):

```json
{"count": 14, "next": null, "previous": null, "results": [{
  "id": 108646, "dashboard": 16300, "name": "Persona Integrity",
  "filters": {"operator": "and", "conditions": [{"operator": "same_row", "conditions": [
    {"op": "eq", "field": "metric_evaluations.metric.id", "value": 243607},
    {"op": "neq", "field": "metric_evaluations.value", "value": null}]}]},
  "effective_filters": {"...": "dashboard filters AND widget filters"},
  "chart_type": "bar", "data_type": "", "field": "metric_evaluations.value",
  "metric": 243607, "metric_name": "Persona Integrity", "time_period": "day",
  "aggregation_function": "avg", "group_by": {},
  "metadata": {"layout": {"h": 7, "w": 3, "x": 3, "y": 23}, "metric_name": "Persona Integrity", "sort_position": 13, "display_aggregation": "percentage"},
  "created_at": "2026-10-23T20:00:43.993435Z", "updated_at": "2026-10-23T20:00:43.993438Z"}, "..."]}
```

Response of call 6 for the stat widget:

```json
{"widget_id": 108633, "field_name": "stat", "chart_type": "stat",
 "data": [
   {"label": "Success Ratio", "value": "0%", "change": null, "format": "number"},
   {"label": "Number of Runs", "value": 0, "change": null, "format": "number"},
   {"label": "Total Run Minutes", "value": "00:00", "change": null, "format": "duration"},
   {"label": "Median Latency", "value": 0, "change": null, "format": "number"}],
 "aggregation_function": null, "time_period": null, "group_by": null, "can_group_by": false,
 "metadata": {"display_name": "Overview Stats", "data_type": "dynamic", "filter_value": null}}
```

Response of call 6 for a Metric widget:

```json
{"widget_id": 108636, "field_name": "metric_evaluations.value", "chart_type": "bar", "data": [],
 "aggregation_function": "avg", "time_period": "day", "group_by": null, "can_group_by": true,
 "metadata": {"display_name": "Metric Evaluation", "data_type": "numeric", "filter_value": 240900}}
```

#### States

| State | Text (verbatim) |
|---|---|
| Empty chart | "No data available" |
| Empty dashboard menu | "No saved dashboards" (disabled item) |
| Empty Metric visibility dialog | "No metrics available" |
| Save dialog with no filters | "No filters applied. This dashboard saves the date range only." |
| Disabled | "Save" with an empty name. "Apply filters" with no selection. |

#### Business rules

- The stat cards compare the current range with the previous range of the same length ("vs previous period"). The response carries the `prev_*` and `*_change` fields.
- The first click on "Try Dashboards" creates a default dashboard "Runs Overview" with `source: "runs"` and 14 widgets. The `created_at` value of that dashboard matches the time of the click (inferred). The capture shows no create call. The server probably creates the dashboard during the list call (inferred).
- The default Runs dashboard filter is `timestamp >= now-7d` and `timestamp <= now`.

#### Not seen in the capture

- Any chart with data. The project had no Runs.
- The content of the tabs "Tags", "Personality", "Scenarios", "Folders", "Monitors", "Run source", "Run type", "IDs".
- The save call of "Save dashboard" and the shape of a saved configuration.
- The open state of the period select and its options.
- The "Expand chart" view.
- The "Line" chart type.

### 6.3 Monitors page

#### Route and entry

- Route: `/cron-jobs?project=<project>&page=<n>`.
- Example: `/cron-jobs?project=13875&page=1`.
- Entry: sidebar item "Monitors".
- A Monitor is a scheduled synthetic test. The backend calls it a cron job.

#### Purpose

The page lists Monitors and creates them. A Monitor runs selected Evaluators against an Agent on a schedule.

Header text (verbatim): "Recurring probe calls to your live agent. No production data required." Second line: "Notifications for these runs go to Slack / email." The "Configure" link opens `/settings/project/integrations`. The "Learn more" link opens `https://docs.example.com/documentation/guides/cronjob`.

#### Layout (empty state)

1. Header: title "Synthetic Monitors", two text lines, "Create monitor" button at top right (black, "+" icon).
2. Empty card: icon, heading "No monitors yet", text "Watch your live agent with scheduled synthetic calls. Monitors run your scenarios on a schedule and alert you the moment something breaks."
3. Three preset cards in one row. The middle card ("Quality check") has a dark border.
4. Card footer: "Need a specific cadence?" and the link button "Advanced setup →".

#### Preset cards

| Small caption (verbatim) | Title (verbatim) | Description (verbatim) | Estimate with 8 Evaluators (first pass) | Estimate with 9 Evaluators (step capture) |
|---|---|---|---|---|
| "EVERY HOUR" | "Heartbeat" | "One quick call: does it answer, is it fast, is it coherent?" | "168 calls / week · 24/day" | "168 calls / week · 24/day" |
| "DAILY AT 6:00 AM" | "Quality check" | "Your critical scenarios, every morning, before call volume starts." | "56 calls / week" | "63 calls / week" |
| "WEEKLY" | "Deep sweep" | "Full regression across personas, accents, and edge cases." | "8 calls / week" | "9 calls / week" |

Estimate rules (inferred from the two captures):

- "Heartbeat" = 1 call × 24 runs per day × 7 days = 168 calls per week. The estimate does not change with the Evaluator count.
- "Quality check" = number of Evaluators in the project × 7 runs per week.
- "Deep sweep" = number of Evaluators in the project × 1 run per week.
- The Evaluator count comes from `GET /test_framework/v1/scenarios/?page_size=1&ql={id}`, field `count`.

#### Create monitor dialog

Entry: "Create monitor" button, "Advanced setup" link, or a preset card (inferred for the cards). The capture opened the dialog from "Create monitor" and from "Advanced setup". Both showed the same default form.

Layout:

1. Title "Create monitor", subtitle "Recurring probe calls to your live agent. No production data required.", close button "×".
2. Left column, card "WHAT TO TEST": Monitor name, Agent, Execution mode, Scenarios, Personality override.
3. Left column, card "CONNECTION OVERRIDES": a collapsible "Call settings" row. It shows only after the user selects an Agent and only for Voice mode in the capture.
4. Left column, card "WHEN IT RUNS": Schedule buttons, next run text, Timezone.
5. Left column, card "RUN SIZE & LIMITS": Repeat each scenario, Concurrency limit, Calls per second, notification text.
6. Right column, card "THIS MONITOR": cost summary panel.
7. Footer: full-width black button "Create monitor".

Controls:

| Label | Control type | Options or values (verbatim) | Default | Validation and errors (verbatim) | Behavior |
|---|---|---|---|---|---|
| "Monitor name *" with badge "AUTO" | Text box, placeholder "Enter a name for your monitor" | Free text | Empty, then generated | Required (asterisk) | Helper: "Generated from the agent and cadence. Edit if you like." Generated values seen: "zz-spec-test-agent - Daily quality check", "zz-spec-test-agent - Custom schedule". When the user types a name, the "AUTO" badge and the helper text go away. |
| "Agent" / "Select the agent to run tests with *" | Combobox with a robot icon | Agents from `GET /test_framework/v2/aiagents/short_list/` | "Select agent" | Required | Selecting an Agent sends `GET /test_framework/v2/aiagents/{id}/` and `GET /test_framework/v1/scenarios/folders/`. |
| "Execution mode *" | Combobox | See "Execution modes" | "Voice" | Required | Sets `execution_mode`. Text mode hides "CONNECTION OVERRIDES". |
| "Scenarios *" | Button that opens a tree picker | Folders and Evaluators | "Select scenarios from folders" | Required | Helper: "Pick scenarios across one or more folders. Click a folder to select all its scenarios." Picked Evaluators show as chips, for example "Returning patient mo…". |
| "Personality override (optional)" | Multi-select dropdown | Personalities from `GET /user/v1/projects/{project}/personalities/?language=all` | "Select Personalities" | None | Helper: "Select personalities to override individual evaluator personalities." Sets `personalities` (inferred, the field was not in the captured body). |
| "Call settings" | Collapsible row | Not opened | Closed | None | Holds connection overrides for `run_settings` (inferred). |
| "Schedule *" | Button group (single choice) | "Every hour", "Daily · 6:00 AM", "Weekdays · 6:00 AM", "Weekly · Sun 2:00 AM", "Custom..." | "Daily · 6:00 AM" | Required | Sets `crontab_expression`. Shows "Next run: <date>" below the buttons. "Custom..." opens the cron editor. |
| "Timezone" | Combobox | Timezone names, for example "Europe/Paris" | Browser timezone, "Europe/Paris" (inferred) | None | Sets `timezone`. |
| "Repeat each scenario" | Number spin button | Integer | "1" | Range 1 to 100 (from the public API docs, field `frequency`) | Helper before selection: "How many times each scenario runs within one run". Helper after selection: "1 scenario × 1 = 1 calls per run". Sets `frequency`. |
| "Concurrency limit" | Number spin button, placeholder "No limit" | Integer | Empty | Minimum 1 (from the public API docs) | Helper: "Max parallel conversations within one run". Sets `concurrency_limit`. Empty sends `null`. |
| "Calls per second" | Number spin button, placeholder "No limit" | 0.1 to 4 | Empty | Range 0.1 to 4 | Helper: "How many calls start each second, from 0.1 to 4 (e.g. 0.5 starts one call every 2 seconds). Leave empty for no limit." Sets `run_settings.calls_per_second` (from the public API docs). Empty sends `run_settings: {}`. |
| Notification text | Text with link | "Failure notifications go to this project's Slack, Discord and email integrations." Link "Manage notifications" | none | none | The link opens `/settings/project/integrations`. |
| "Create monitor" | Button | None | Enabled | Server errors, see "Validation errors" | Sends `POST /schedules/v1/cron-jobs/`. |
| Close "×" | Icon button | None | Enabled | None | Closes the dialog. |

#### Execution modes

The combobox list was not opened in the capture. The options come from the enum `ExecutionModeChoices` in `GET /enums/`, in this order:

| Label | Value sent as `execution_mode` |
|---|---|
| Voice | `voice` |
| Text | `text` |
| SIP (Session Initiation Protocol (SIP)) | `sip` |
| VAPI WebRTC (Web Real-Time Communication (WebRTC) through Vapi) | `vapi_webrtc` |
| Retell WebRTC (Web Real-Time Communication (WebRTC) through Retell) | `retell_webrtc` |
| ElevenLabs | `elevenlabs` |
| Ello | `ello` |
| LiveKit | `livekit_v2` |
| Pipecat | `pipecat_v2` |
| Agora | `agora` |

Accepted `run_settings` keys for each mode (from the public API docs):

| Mode | Keys |
|---|---|
| `voice` | `mode`, `outbound_phone_number`, `agent_number` |
| `text` | `websocket_url`, `outbound_phone_number`, `agent_number` |
| `sip` | `sip_endpoint` |
| `vapi_webrtc` | `vapi_assistant_id` |
| `retell_webrtc` | `retell_agent_id` |
| `elevenlabs` | `elevenlabs_agent_id`, `elevenlabs_data` |
| `livekit_v2` | `livekit_data` |
| `pipecat_v2` | `pipecat_data` |
| Every mode | `calls_per_second` |

#### Schedule presets

| Button (verbatim) | Cron expression | Runs per week in the summary panel | Next run text seen |
|---|---|---|---|
| "Every hour" | `0 * * * *` (inferred) | 168 (inferred) | Not seen |
| "Daily · 6:00 AM" | `0 6 * * *` (inferred) | 7 | "Next run: Sat, Oct 24, 2026, 06:00:00 (UTC+02:00)" |
| "Weekdays · 6:00 AM" | `0 6 * * 1-5` (inferred) | 5 (inferred) | Not seen |
| "Weekly · Sun 2:00 AM" | `0 2 * * 0` (seen in the request body) | 1 | "Next run: Sun, Oct 25, 2026, 02:00:00 (UTC+02:00)" |
| "Custom..." | User value | Computed from the expression (inferred) | Not seen |

#### Custom cron editor

The editor shows when the user clicks "Custom...". In the capture, it opened with the expression `0 2 * * 0`. The editor starts from the current schedule (inferred).

| Label | Control type | Placeholder | Value in the capture | Hint text (verbatim) |
|---|---|---|---|---|
| "Cron Expression:" | Read-only code display | none | `0 2 * * 0` | none |
| "Switch to Manual Input" | Button | none | none | Changes the editor to one text input (inferred). |
| "Quick Schedule" | Combobox | "Quick Schedule" | none | Options not captured. |
| Description | Text | none | "at the start of the hour, at hour 2, every day, every month, on Sunday" | Human-readable form of the expression. |
| "Minute" | Text box | "*" | "0" | "e.g. *, */5, 0-59, 30" |
| "Hour" | Text box | "*" | "2" | "e.g. *, */2, 0-23, 14" |
| "Day of Month" | Text box | "*" | "*" | "e.g. *, 1-31, 15,L: Last day of month" |
| "Month" | Text box | "*" | "*" | "e.g. *, 1-12, 6" |
| "Day of Week" | Text box | "*" | "0" | "e.g. *, 0-6 (0 = Sunday)" |
| "Need Help?" | Collapsible heading | none | Closed | Content not captured. |

#### Scenario picker

The picker is a popover under the "Scenarios" field.

| Element | Text (verbatim) | Behavior |
|---|---|---|
| Search box | "Search in opened folders..." | Filters the Evaluators of the open folders. |
| "Clear" | "× Clear" | Shows after a selection. Removes all selections (inferred). |
| Folder row | Chevron, checkbox, folder icon, folder name. Folders in the capture: "default", "Regression Suite", "voice_regression", "zz-spec-test-folder", "Unfoldered". | The chevron opens the folder and sends `GET /test_framework/v1/scenarios/?folder_path=<path>&page_size=500&ql={id,name}`. The folder checkbox is disabled until the folder is open. Then it selects all Evaluators of the folder. |
| Folder count | "0/1", "1/1" | Selected Evaluators out of all Evaluators in the folder. |
| Evaluator row | Checkbox, name, "#<id>", for example "Returning patient moves dental appointment after date correction #401833" | Selects one Evaluator. |
| Footer | "0 selected", "1 selected" | Count of selected Evaluators. |
| "Done" | Button | Closes the picker. |

#### Cost summary panel ("THIS MONITOR")

| Row (verbatim) | Value with no selection | Value with 1 Evaluator, Daily | Value with 1 Evaluator, Weekly |
|---|---|---|---|
| "Scenarios" | 0 | 1 | 1 |
| "× repeats" | 1 | 1 | 1 |
| "Calls per run" | 0 | 1 | 1 |
| "Runs per week" | 7 | 7 | 1 |
| Total | "0 calls / week" | "7 calls / week" | "1 call / week" |
| Footer | "while this monitor is active" | same | same |

Rule: calls per run = scenarios × repeats. Calls per week = calls per run × runs per week. The total uses "call" for 1 and "calls" for other values.

#### Flows

1. The user opens Monitors. The page sends `GET /schedules/v1/cron-jobs/?project_id=13875&ql=...` and `GET /test_framework/v1/scenarios/?project_id=13875&page_size=1&ql={id}`.
2. With an empty Monitor list, the page shows the empty state and the three preset cards.
3. The user clicks "Create monitor" or "Advanced setup". The dialog opens. The page sends `GET /enums/`, `GET /test_framework/v2/aiagents/short_list/`, and `GET /user/v1/projects/13875/personalities/?language=all&ql=...`.
4. The user selects the Agent "zz-spec-test-agent". The page sends `GET /test_framework/v2/aiagents/26242/?ql=...` and `GET /test_framework/v1/scenarios/folders/?project_id=13875`. The name fills in as "zz-spec-test-agent - Daily quality check".
5. The user opens the scenario picker and opens "zz-spec-test-folder". The page sends `GET /test_framework/v1/scenarios/?folder_path=zz-spec-test-folder&page_size=500&ql={id,name}`.
6. The user selects the Evaluator 401833 and clicks "Done". The summary panel shows "7 calls / week".
7. The user clicks "Custom...". The cron editor opens. The name changes to "zz-spec-test-agent - Custom schedule".
8. The user types the name "zz-spec-test-monitor" and clicks "Weekly · Sun 2:00 AM".
9. The user clicks "Create monitor". The page sends `POST /schedules/v1/cron-jobs/?project_id=13875`. The server returns 400 (contact number error).
10. The user changes "Execution mode" to "Text" and clicks "Create monitor" again. The server returns 400 (assistant provider error).
11. No Monitor was created.

#### Backend calls

| # | Method and path | Important query parameters | Status seen |
|---|---|---|---|
| 1 | `GET /schedules/v1/cron-jobs/` | `project_id=13875`, `ql={id,name,agent,scenario_ids,scenarios_data{id,name},crontab_expression,timezone,frequency,execution_mode,personalities,concurrency_limit,is_active,created_at,run_settings}` | 200 |
| 2 | `GET /test_framework/v1/scenarios/` | `project_id=13875`, `page_size=1`, `ql={id}` | 200 |
| 3 | `GET /test_framework/v2/aiagents/{id}/` | `ql={id,name,email_id,mock_tools,mock_tools_enabled,telephony{phone_number,sip_uri,inbound,websocket_url},provider{type,agent_id,chat_provider,auto_dial_outbound,chat_agent_details{type,config},credentials{config}}}` | 200 |
| 4 | `GET /test_framework/v1/scenarios/folders/` | `project_id=13875` | 200 |
| 5 | `GET /test_framework/v1/scenarios/` | `project_id=13875`, `folder_path=<path>`, `page_size=500`, `ql={id,name}` | 200 |
| 6 | `POST /schedules/v1/cron-jobs/` | `project_id=13875` | 400 (both attempts) |

Response of call 1 (empty project). It is a plain array, not a page envelope:

```json
[]
```

Response of call 2:

```json
{"count": 9, "next": "https://backend.example.com/test_framework/v1/scenarios/?page=2&page_size=1&project_id=13875&ql=%7Bid%7D", "previous": null,
 "results": [{"id": 401833, "is_simulating": false}]}
```

Response of call 3 (trimmed):

```json
{"id": 26242, "name": "zz-spec-test-agent",
 "telephony": {"inbound": true, "phone_number": null, "sip_uri": null},
 "provider": {"type": "custom", "send_post_conversation_metadata": false, "redact_fields": []},
 "mock_tools": ["..."], "mock_tools_enabled": true,
 "email_id": "zz-spec-test-agent@example.invalid"}
```

Response of call 4 (trimmed):

```json
[{"name": "Regression Suite", "path": "Regression Suite", "is_infrastructure_suite": false,
  "is_deletable": false, "is_renamable": false, "is_regression_suite": true,
  "created_at": "2026-09-10T10:17:04.700103Z", "updated_at": "2026-09-10T10:17:04.700106Z"},
 {"name": "zz-spec-test-folder", "path": "zz-spec-test-folder", "is_deletable": true, "is_renamable": true, "...": "..."}]
```

Response of call 5:

```json
{"count": 1, "next": null, "previous": null,
 "results": [{"id": 401833, "name": "Returning patient moves dental appointment after date correction", "is_simulating": false}]}
```

Request body of call 6, first attempt (Voice):

```json
{"agent": "26242", "scenarios": [401833], "crontab_expression": "0 2 * * 0",
 "timezone": "Europe/Paris", "frequency": 1, "name": "zz-spec-test-monitor",
 "execution_mode": "voice", "concurrency_limit": null, "run_settings": {}}
```

The body sends `agent` as a string. The body has no `personalities` key when the user selects no Personality.

#### Validation errors

| Attempt | `execution_mode` | Status | Response body (verbatim) |
|---|---|---|---|
| 1 | `voice` | 400 | `{"non_field_errors":["Agent must have a contact number configured to run voice calls. Please configure the contact number in agent settings."]}` |
| 2 | `text` | 400 | `{"assistant_provider":["Agent does not have an assistant provider configured for text mode."]}` |

The test Agent had `telephony.phone_number: null` and `provider.type: "custom"` with no chat provider. The dialog stayed open after each error. The screenshots show no visible error text. The capture does not show how the dialog displays these errors.

#### Monitor object (from the public API docs)

Model `CronJob`. The list call reads a subset of these fields through `ql`.

| Field | Type | Notes (from the public API docs) |
|---|---|---|
| `id` | integer | Read-only. |
| `agent` | integer | Agent ID. |
| `name` | string, max 255 | Monitor name. |
| `crontab_expression` | string, max 255 | Required. Example `0 9 * * 1-5`. |
| `timezone` | string | Example `America/Los_Angeles`. The create body uses a fixed list of timezone names. Default is the project timezone. |
| `scenarios` | array of integer | Write-only. Evaluator IDs. |
| `scenario_ids` | array of integer | Read-only. |
| `scenarios_data` | array of `{id, name}` | Read-only. |
| `personalities` | array of integer | Personality overrides. |
| `tags` | array of string | Alternative to `scenarios`. Needs `agent`. |
| `frequency` | integer, 1 to 100 | Repeat count for each Evaluator. |
| `concurrency_limit` | integer or null, minimum 1 | Write-only. Null means no cap. |
| `run_settings` | object or null | Connection overrides. See "Execution modes". |
| `execution_mode` | string | See "Execution modes". Default `voice`. |
| `notify_on` | string | `never`, `success`, `failure`, `both`. |
| `is_active` | boolean | Active flag. |
| `created_by`, `created_via`, `created_at`, `updated_at` | read-only | Audit fields. |

Other Monitor calls in the public API docs: `GET /schedules/v1/cron-jobs/{id}/`, `PATCH /schedules/v1/cron-jobs/{id}/`, `DELETE /schedules/v1/cron-jobs/{id}/`.

#### States

| State | Text (verbatim) |
|---|---|
| Empty list | "No monitors yet" and "Watch your live agent with scheduled synthetic calls. Monitors run your scenarios on a schedule and alert you the moment something breaks." |
| Picker, nothing selected | "0 selected" |
| Summary, nothing selected | "0 calls / week" |
| Disabled | Folder checkboxes before the folder opens. |

#### Business rules

- The server rejects a Voice Monitor if the Agent has no contact number.
- The server rejects a Text Monitor if the Agent has no assistant provider for text mode.
- "Calls per second" accepts 0.1 to 4. Empty means no limit.
- "Repeat each scenario" maps to `frequency`. The public API docs give the range 1 to 100.
- The generated name has the form "<Agent name> - <cadence label>". Labels seen: "Daily quality check", "Custom schedule".

#### Not seen in the capture

- A Monitor row in the list, and the list layout with data. No Monitor was created.
- Edit, pause, delete, and history of a Monitor.
- The open list of "Execution mode" and the form changes for SIP, WebRTC, ElevenLabs, LiveKit, Pipecat, Ello, and Agora.
- The content of "Call settings" under "CONNECTION OVERRIDES".
- The Personality override list in the open state.
- The "Quick Schedule" options and the "Need Help?" content.
- The generated names for "Every hour", "Weekdays · 6:00 AM", and "Weekly · Sun 2:00 AM".
- The behavior of a click on a preset card.
- How the dialog shows a server validation error.
- A field-level client validation message.

### 6.4 Calls page (observability call logs)

#### Route and entry

- Route: `/<project>/calls?page=<n>&pageSize=<n>`.
- Example: `/13875/calls?page=1&pageSize=30`.
- Entry: sidebar item "Calls".

#### Purpose

The page lists production Calls that the user sends to the app. With no Calls, the page shows how to connect a voice provider or to upload a recording.

#### Layout (empty state)

1. Banner: phone icon, heading "No call logs yet", text "Upload a recording or connect a provider to start monitoring calls.", buttons "Add Call" (black) and "Docs" (external link icon).
2. Card "Connect a provider": eight provider tiles in one row, each with a logo and a label.
3. Card "Send call data": subtitle "<Provider> integration example", "Setup guide" link at the right.
4. Code panel: language select (Custom tab only), "Copy code" button, code block.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Add Call" | Button | None | Enabled | None | Opens the "Create call" dialog. |
| "Docs" | Button | None | Enabled | None | Opens the documentation (inferred). |
| Provider tiles | Toggle button group (single choice) | "Retell", "VAPI", "ElevenLabs", "Bland AI", "Synthflow", "LiveKit", "Pipecat", "Custom" | "Custom" (pressed, check badge) | None | Changes the "Send call data" card. No backend call. |
| Language select | Combobox | Only "Python" seen | "Python" | None | Shows on the Custom tab. The Pipecat tab shows the static text "Python". |
| "Copy code" | Button | None | Enabled | None | Copies the code block (inferred). |
| "Setup guide" | Link | Custom: `https://docs.example.com/api-reference/observability/send-calls`. Pipecat: `https://docs.example.com/documentation/integrations/pipecat/tracing` | none | None | Opens the guide. |

#### Code snippets (verbatim)

Custom tab, subtitle "Custom API integration example":

```python
import requests

# Send call data to the observability API
url = 'https://api.example.com/observability/v1/observe/'
headers = {
    'X-API-KEY': '<your_api_key>',
    'Content-Type': 'application/json'
}
data = {
    'agent': '<agent_id_in_app>',
    'voice_recording_url': '<url_to_call_recording>',
    'transcript_type': 'custom',
    'transcript_json': [
        {
            'role': 'user',
            'content': 'Hello, I want to book an appointment.',
            'start_time': 0.5,
            'end_time': 2.3
        },
        {
            'role': 'assistant',
            'content': 'Sure, what time works for you?',
            'start_time': 2.5,
            'end_time': 4.1
        }
    ],
    'call_id': '<unique_call_identifier>',
    'call_ended_reason': '<reason_for_call_end>'
}
response = requests.post(url, headers=headers, json=data)
```

Pipecat tab, subtitle "Pipecat integration example":

```python
# Install the Pipecat integration
pip install "app-sdk[pipecat]>=1.6.6,<2"

# Create one tracer inside each call handler
tracer = PipecatTracer(
    api_key=os.getenv("APP_API_KEY"),
    agent_id=AGENT_ID,
)

# Wrap and run the production pipeline
task = tracer.observe_and_create_task(
    pipeline,
    context,
    runner_args=runner_args,
    transport=transport,
)
```

The accessibility tree gives the code on one line. The line breaks above follow the screenshot for the Custom tab and are inferred for the Pipecat tab.

#### Create call dialog

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Title | Heading | "Create call" | none | none | none |
| "Agent" / "Select the agent to add the calls *" | Combobox with a robot icon | Agents from `GET /test_framework/v2/aiagents/short_list/` | "Select agent" | Required | Sets the Agent of the new Calls. |
| Upload zone | Drag-and-drop area with an upload icon | Text "Drag & Drop or Choose files to upload (Optional)" and "Max 5 files, 500MB total. Formats: MP3, MP4, WAV, OGG" | Empty | Maximum 5 files, 500 megabytes (MB) in total, only the formats in the dialog text "Formats: MP3, MP4, WAV, OGG" | Adds recording files. |
| "Cancel" | Button | None | Enabled | None | Closes the dialog. |
| "Create" | Button | None | Enabled | Not tested | Creates the Calls. Not clicked. |
| Close "×" | Icon button | None | Enabled | None | Closes the dialog. |

#### Flows

1. The user opens Calls. The page sends `GET /test_framework/v1/views/`, `GET /test_framework/v1/metrics/basic_list/`, `GET /test_framework/v2/aiagents/?...&exclude_kb_files=true`, `GET /observability/v2/call-logs/?page_size=1&ql={id}`, and `GET /observability/v2/call-logs/?page=1&page_size=30&filters_v2=...`.
2. Both call-log calls return no rows. The page shows the empty state (inferred: the `page_size=1` call decides the empty state).
3. The user clicks "Pipecat". The card changes to the Pipecat example. No call.
4. The user clicks "Custom". The card changes back. No call.
5. The user clicks "Add Call". The page sends `GET /test_framework/v2/aiagents/short_list/`. The dialog opens.

#### Backend calls

| # | Method and path | Important query parameters | Status seen |
|---|---|---|---|
| 1 | `GET /observability/v2/call-logs/` | `page_size=1`, `ql={id}`, `project_id=13875` | 200 |
| 2 | `GET /observability/v2/call-logs/` | `project_id=13875`, `page=1`, `page_size=30`, `filters_v2={"operator":"and","conditions":[{"field":"timestamp","op":"gte","value":"2026-09-23T19:07:24.457Z"}]}`, `ql={-transcript,-transcript_object,-evaluation}` | 200 |
| 3 | `GET /test_framework/v2/aiagents/` | `project_id=13875`, `ql={id,name,language,telephony,provider,description}`, `exclude_kb_files=true` | 200 |
| 4 | `GET /test_framework/v2/aiagents/short_list/` | `project_id=13875`, `ql={id,agent_name,language,agent_gives_first_message}` | 200 |
| 5 | `GET /test_framework/v1/views/` | `project_id=13875` | 200 |

The default time filter of call 2 is the last 30 days. The capture time was 2026-10-23, and the filter starts at 2026-09-23.

Response of call 1 and call 2:

```json
{"next": null, "previous": null, "results": []}
```

Response of call 3 (trimmed):

```json
{"count": 1, "next": null, "previous": null, "results": [{
  "id": 22757, "name": "Voice Regression — E2E Deploy Agent Sq", "language": "en",
  "telephony": {"inbound": true, "phone_number": "+1...", "sip_uri": null},
  "provider": {"type": "vapi", "agent_id": "...", "credentials": {"api_key_configured": true},
               "auto_import_calls": false, "chat_provider": "vapi", "...": "..."}}]}
```

#### Call object (from the public API docs)

Model `CallLogList`, returned by `GET /observability/v2/call-logs/`.

| Field | Type | Notes (from the public API docs) |
|---|---|---|
| `id` | integer | Read-only. |
| `call_id` | string, max 100 | Required. Provider call identifier. |
| `agent`, `agent_name` | integer or null, string | The Agent. |
| `timestamp` | date-time | When the call occurred. |
| `duration` | string | `MM:SS`. |
| `success` | boolean or null | Call success. |
| `is_reviewed` | boolean | Review flag. |
| `status` | string | `success`, `failure`, `reviewed_success`, `reviewed_failure`. |
| `feedback` | string | User feedback. |
| `metrics` | array | Metric scores. |
| `call_ended_reason` | string, max 100 | For example `customer-ended-call`. |
| `customer_number` | string, max 100 | Customer phone number or identifier. |
| `dropoff_point`, `topic` | string, max 1000 | Classified values. |
| `error_message` | string or null | Error text. |
| `trace_id`, `is_log_present` | string, boolean | Tracing data. |
| `transcript`, `transcript_object`, `evaluation` | string | Left out of the list unless `ql` names them. |
| `created_at`, `updated_at` | date-time | Read-only. |

List rules (from the public API docs):

- With no time range, the list returns the last 30 days.
- A time range wider than 33 days returns 400.
- `filters_v2` takes the same JSON filter as a Dashboard. Operators: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `contains`, `startswith`, `in`, `isnull`.
- `include_count=true` adds `count` and `count_capped`. The count stops at 10000.

The ingestion endpoint in the Custom snippet is `POST /observability/v1/observe/` (public API host).

#### States

| State | Text (verbatim) |
|---|---|
| Empty | "No call logs yet" and "Upload a recording or connect a provider to start monitoring calls." |
| Upload zone | "Drag & Drop or Choose files to upload (Optional)" |

#### Business rules

- The upload accepts at most 5 files and 500 megabytes (MB) in total.
- The upload accepts only the formats in the dialog text "Formats: MP3, MP4, WAV, OGG".
- The default list window is the last 30 days.

#### Not seen in the capture

- The Calls table with data, its columns, and the Call detail page.
- The code snippets for "Retell", "VAPI", "ElevenLabs", "Bland AI", "Synthflow", and "LiveKit".
- The other options of the language select.
- The "Create" submit call of the "Create call" dialog and its errors.
- The file upload behavior and the error text for too many files or a wrong format.

### 6.5 Alerts page

#### Route and entry

- Route: `/<project>/alerts/review?hours=<n>`.
- Example: `/13875/alerts/review?hours=24`.
- Entry: sidebar item "Alerts". The sidebar link has no `hours`. The page adds `hours=24`.

#### Purpose

The page shows which Alerts fired in a time window. It also lists all configured Alerts and creates new ones. An Alert watches one Metric on production Calls.

Page text (verbatim): "See which alerts fired, when, and why. Configure new ones below."

#### Layout

1. Header row: title "Alerts" and description at the left. At the right: window toggle "24h", "3d", "7d", button "Refresh", button "+ New alert" (black).
2. Three stat cards: "TOTAL FIRES", "UNIQUE ALERTS FIRED", "TOP FIRING ALERT".
3. Two panels side by side: "Activity" chart (with "Updated <time>" at the right) and "Alerts that fired" list (with "<n> alerts" at the right).
4. Card "All configured alerts" with the subtitle "Configure alert types, Slack channels, and filters inline."
5. Slack notice row: bell icon, "Connect Slack to receive metric alerts.", link button "Connect Slack →".
6. Filter row: "Search metrics..." text box, "Project Metrics" select, "All Types" select.
7. Table of configured Alerts.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "24h" / "3d" / "7d" | Segmented buttons | "24h", "3d", "7d" | "24h" | None | Sets `hours` in the URL: 24, 72 (inferred), or 168. Reloads the review data. |
| "Refresh" | Button | None | Enabled | None | Reloads the review data (inferred). |
| "New alert" | Button | None | Enabled | None | Opens the "New alert" dialog. |
| "Connect Slack" | Link | Target `/settings/project/integrations` | none | None | Opens the project integrations settings. |
| "Search metrics..." | Text box | Free text | Empty | None | Filters the table by Metric name (inferred). |
| "Project Metrics" | Select | Only "Project Metrics" seen | "Project Metrics" | None | Filters by Metric scope (inferred). |
| "All Types" | Select | Only "All Types" seen | "All Types" | None | Filters by Metric evaluation type (inferred). |

#### Configured alerts table

| # | Column (verbatim) | Cell content seen for Alert 3639 | Control |
|---|---|---|---|
| 1 | "ID" | "#3639" | Text |
| 2 | "Alert Name" | "zz-spec-test-metric · Failure" | Button. Opens the Alert (inferred). |
| 3 | "Enabled" | On | Switch. Changes `enabled` (inferred: `PATCH /observability/v1/alerts/{id}/`). |
| 4 | "Last 24h" | "0 fires" (green pill) | Text from `trigger_summary`. |
| 5 | "Type" | "Boolean" | Text. The evaluation type of the Metric (`source_object_eval_type` = `binary`). |
| 6 | "Alert Type" | "Failure Alert" (red line icon) | Combobox. Changes the Alert type inline (inferred). |
| 7 | "Filter" | "Configure Filter" | Button. Opens a filter editor (inferred). Not opened. |
| 8 | "Slack Channel" | "Configure Slack" | Button, disabled with no Slack workspace. |
| 9 | "Alert Direction" | "Both" (warning triangle icon) | Combobox, disabled for a Failure Alert. |
| 10 | "Actions" | Gear icon button (disabled), red trash icon button | The trash button deletes the Alert. |

#### New alert dialog

Before the user selects a Metric, the dialog shows only "Metric" and "Slack workspace (optional)". After the user selects a Metric, the dialog adds "Name" and "Alert type".

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Metric" | Combobox | Metrics from `GET /test_framework/v2/metrics/`. Each option shows the name and the evaluation type, for example "zz-spec-test-metric" with "binary". | "Select a metric" | Required. "Create alert" is disabled until a Metric is selected. | Sets `source_id`. Fills "Name". |
| "Name" | Text box, placeholder is the Metric name | Free text | "<Metric name> · <Alert type label>", for example "zz-spec-test-metric · Failure" | None seen | Helper: "Used as the alert title in Slack and the alerts table." |
| "Alert type" | Combobox | Only "Failure" seen | "Failure" | None | Helper for Failure: "Fires immediately on each failing evaluation." Sets `source.sub_type`. |
| "Slack workspace (optional)" | Combobox | Only "No Slack delivery" seen | "No Slack delivery" | None | Sets `notifications`. |
| "Cancel" | Button | None | Enabled | None | Closes the dialog. |
| "Create alert" | Button | None | Disabled until a Metric is selected | None | Sends `POST /observability/v1/alerts/`. |
| "Close" | Icon button "×" | None | Enabled | None | Closes the dialog. |

Alert types (from the public API docs, not seen in the dialog list):

| Type | `source.sub_type` | `threshold` content |
|---|---|---|
| Failure | `normal` | `{}`. It fires on each failing evaluation. |
| Trend | `significant_change` | `{std_multiplier, ewma_alpha, direction}`. The source adds `window_size`. A `preset` of `conservative`, `balanced`, or `aggressive` can fill these values. |
| Threshold (numeric Metrics only) | `threshold` | `{operator (gt, lt, outside), value, min_breaches}`. The source adds `window_size`. |
| New failure mode | `insight_new_mode` | `{}`. The source can add `min_calls`. |
| Failure mode spike | `insight_uptick` | `{min_count, multiplier}`. The source adds `window_hours` and `baseline_hours`. |

Trend presets (from the public API docs): Conservative = window 100, standard deviation multiplier 3.0, Exponentially Weighted Moving Average (EWMA) alpha 0.10. Balanced = 50, 2.0, 0.30. Aggressive = 25, 1.5, 0.50.

Alert direction values (enum `SignificantChangeAlertDirectionChoices` in `GET /enums/`): "Both (Increase and Decrease)" = `""`, "Increase Only" = `increase`, "Decrease Only" = `decrease`.

#### Flows

1. The user opens Alerts. The page sends `GET /test_framework/v2/aiagents/short_list/`, `GET /test_framework/v2/metrics/`, `GET /observability/v1/alerts/review/?hours=24`, `GET /observability/v1/alerts/review/?hours=48`, `GET /slack/slack-workspaces/`, `GET /observability/v1/alerts/trigger_summary/?hours=24`, and `GET /observability/v1/alerts/`.
2. The user clicks "7d". The URL changes to `hours=168`. The page sends `GET /observability/v1/alerts/review/?hours=168` and `GET /observability/v1/alerts/review/?hours=336`. The second call is the previous window of the same length (inferred).
3. The user clicks "New alert". The page sends `GET /slack/slack-workspaces/` and `GET /test_framework/v2/metrics/`. The dialog opens.
4. The user selects the Metric "zz-spec-test-metric". The dialog fills "Name" with "zz-spec-test-metric · Failure" and "Alert type" with "Failure".
5. The user clicks "Create alert". The page sends `POST /observability/v1/alerts/?project_id=13875`. The server returns 201.
6. The page reloads the review data and the Alert list. The new row "#3639" shows in the table.
7. The user clicks the red trash button of the row. The page sends `DELETE /observability/v1/alerts/3639/?project_id=13875`. The server returns 204.
8. The page reloads the Alert list. The table shows "No alerts found".

#### Backend calls

| # | Method and path | Important query parameters | Status seen |
|---|---|---|---|
| 1 | `GET /observability/v1/alerts/review/` | `project_id=13875`, `hours=24` (also 48, 168, 336), `page=1`, `page_size=50` | 200 |
| 2 | `GET /observability/v1/alerts/trigger_summary/` | `project_id=13875`, `hours=24` | 200 |
| 3 | `GET /observability/v1/alerts/` | `project_id=13875` | 200 |
| 4 | `GET /slack/slack-workspaces/` | `project_id=13875` | 200 |
| 5 | `GET /test_framework/v2/metrics/` | `project_id=13875`, `ql={id,name,type,description,function_name,eval_type,enum_values,vocera_defined_metric_code,overall_score,total_score}` | 200 |
| 6 | `POST /observability/v1/alerts/` | `project_id=13875` | 201 |
| 7 | `DELETE /observability/v1/alerts/{id}/` | `project_id=13875` | 204 |

Response of call 1 with no fires (24 hours, trimmed):

```json
{"summary": {"total_fires": 0, "unique_alerts": 0, "top_alert": null},
 "timeline": [{"bucket_start": "2026-10-22T20:09:17.273980+00:00", "count": 0}, "..."],
 "timeline_top_alerts": [], "timeline_other_counts": [0, 0, "..."],
 "alerts": [],
 "pagination": {"page": 1, "page_size": 50, "total_alerts": 0, "has_next": false}}
```

The timeline has 24 hourly buckets for `hours=24`. The public API docs give 3-hour buckets for 3 days and 6-hour buckets for 7 days. The docs cap `hours` at 168. With no configured Alert, the capture shows `"timeline": []`.

Response of call 2 with no fires:

```json
{}
```

The public API docs give the shape `{"<alert_id>": <fire_count>}`.

Request body of call 6:

```json
{"name": "zz-spec-test-metric · Failure", "enabled": true, "project": 13875,
 "source_type": "metric", "source_id": 272072,
 "source": {"sub_type": "normal", "filters": {}},
 "threshold": {}, "notifications": {}}
```

Response of call 6 (status 201):

```json
{"id": 3639, "name": "zz-spec-test-metric · Failure", "enabled": true, "project": 13875,
 "source_type": "metric", "source_id": 272072,
 "source": {"sub_type": "normal", "filters": {}}, "threshold": {}, "notifications": {}}
```

Response of call 3 after the create:

```json
[{"id": 3639, "name": "zz-spec-test-metric · Failure", "enabled": true, "project": 13875,
  "source_type": "metric", "source_id": 272072,
  "source_object_name": "zz-spec-test-metric", "source_object_eval_type": "binary",
  "source": {"filters": {}, "sub_type": "normal"}, "threshold": {}, "notifications": {},
  "trigger_count": 0, "last_triggered_at": null, "last_triggered_at_formatted": "Never",
  "created_at": "2026-10-23T20:09:17.002856Z", "updated_at": "2026-10-23T20:09:17.002870Z"}]
```

Response of call 7: status 204, empty body.

Notification routing (from the public API docs): `{"slack": {"workspace_id": ..., "channel_id": ...}}` posts to one workspace and channel. An empty object sends to every project workspace. An empty object with no project workspace makes the Alert silent. A silent Alert still records fires.

Other Alert calls in the public API docs: `GET /observability/v1/alerts/{id}/`, `PATCH /observability/v1/alerts/{id}/`, `GET /observability/v1/alerts/{id}/review_detail/`.

#### States

| State | Text (verbatim) |
|---|---|
| No fires | "No alerts fired in this window. All quiet." and "0 alerts" |
| No top alert | "—" in "TOP FIRING ALERT" |
| No configured Alert | Table row "No alerts found" |
| No Slack | "Connect Slack to receive metric alerts." "Configure Slack" disabled. |
| Activity timestamp | "Updated 10:09:16 PM" (local time of the last load) |
| Disabled | "Create alert" with no Metric. "Alert Direction" for a Failure Alert. Gear icon in "Actions". |

#### Business rules

- The default Alert name is "<Metric name> · <Alert type label>".
- A Failure Alert sends `source.sub_type: "normal"` and an empty `threshold`.
- The Alert delete confirm step. The crawl script confirmed any dialog that opened, so a dialog may exist. Its text was not recorded.
- With no Slack workspace, the Alert has empty `notifications`.

#### Not seen in the capture

- An Alert that fired, the "Alerts that fired" list with rows, and the Activity chart with data.
- The "3d" window.
- The list of "Alert type" options and the forms for Trend, Threshold, New failure mode, and Failure mode spike.
- The "Configure Filter" editor.
- The "Configure Slack" dialog and the Slack workspace options.
- The edit flow (gear icon) and the inline change of "Alert Type" and "Enabled".
- The options of "Project Metrics" and "All Types".
- The Alert delete confirm step. The crawl script confirmed any dialog that opened, so a dialog may exist. Its text was not recorded.

### 6.6 Insights page

#### Route and entry

- Route: `/<project>/insights`.
- Example: `/13875/insights`.
- Entry: sidebar item "Insights".

#### Purpose

The page groups failing production Calls of each enabled Metric into recurring failure modes. The user enables Insights one Metric at a time.

Page text (verbatim): "Groups the calls that fail each enabled metric into recurring failure modes, updated as new calls come in. Only the metrics enabled here are analysed, up to each metric's daily failure limit, at 0.4 credits each." The "Learn more" link opens `https://docs.example.com/documentation/key-concepts/metrics/overview`.

#### Layout

1. Header: title "Insights", description, "Learn more" link.
2. Toolbar: "Select View" dropdown at the left. At the right: "+ Enable insights" button, "All agents" combobox, date range button "Oct 22, 22:02:37 to Oct 23, 22:02:37".
3. Empty card: "No metrics have insights enabled yet.", "Pick a metric and tell us what a passing call looks like. We'll investigate the calls that don't meet it and group them into recurring failure modes.", button "+ Enable insights for a metric" (black).

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Select View" | Dropdown | Saved views from `GET /test_framework/v1/views/` | "Select View" | None | Applies a saved view (inferred). |
| "Enable insights" | Button | None | Enabled | None | Opens the dialog "Enable insights for a metric". |
| "All agents" | Combobox | Agents from `GET /test_framework/v2/aiagents/short_list/` | "All agents" | None | Filters by Agent (inferred). |
| Date range | Button | Start and end date-time | Last 24 hours, for example "Oct 22, 21:08:09 to Oct 23, 21:08:09" | None | Sets `date_from` and `date_to`. The picker was not opened. |
| "Enable insights for a metric" | Button | None | Enabled | None | Opens the same dialog. |

#### Enable insights for a metric dialog

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Title | Heading with a light bulb icon | "Enable insights for a metric" | none | none | none |
| "Metric" | Combobox | Metrics from `metric-config` (inferred) | "Select a metric…" | Required. "Enable insights" is disabled until a Metric is selected. | Selects the Metric. |
| "A call passes when" | Read-only text box | "score" | "score" | None | The field of the pass condition. |
| "Passing threshold operator" | Combobox | Only "≥" seen | "≥" | None | The operator of the pass condition. |
| "Passing threshold value" | Text box | Number | "4" | None | The value of the pass condition. |
| "Failures to consider each day" | Combobox | Only "All failures" seen | "All failures" | None | Daily failure limit. Info text: "Every failure will be analysed at 0.4 credits each. No daily limit." |
| "Cancel" | Button | None | Enabled | None | Closes the dialog. |
| "Enable insights" | Button | None | Disabled | None | Saves the Metric configuration (inferred). Not clicked. |
| "Close" | Icon button "×" | None | Enabled | None | Closes the dialog. |

The default pass condition differs by Metric. The `metric-config` response gives `default_pass_conditions` for each Metric. The dialog default "≥ 4" matches the default of `continuous_qualitative` Metrics, for example "Interruption Score" (inferred).

#### Flows

1. The user opens Insights. The page sends the calls in the table below.
2. The page shows the empty state because no Metric has `insight_enabled: true`.
3. The user clicks "Enable insights" or "Enable insights for a metric". The dialog opens. No call.
4. The user closes the dialog. No Insight was enabled.

#### Backend calls

| # | Method and path | Important query parameters | Status seen |
|---|---|---|---|
| 1 | `GET /observability/v1/metric-failure-mode-insights/metric-config/` | `project=13875` | 200 |
| 2 | `GET /observability/v1/metric-failure-mode-insights/` | `project=13875`, `latest_only=1` | 200 |
| 3 | `GET /observability/v1/metric-failure-mode-insights/failure-rates/` | `project=13875`, `date_from=2026-10-22T19:08:09.226Z`, `date_to=2026-10-23T19:08:09.226Z` | 200 |
| 4 | `GET /observability/v1/metric-failure-mode-insights/categories/` | `project=13875`, `date_from`, `date_to` | 200 |
| 5 | `GET /observability/v1/metric-failure-mode-insights/pricing/` | `project=13875` | 200 |
| 6 | `GET /observability/v1/deep-research-insights/` | `project=13875` | 200 |
| 7 | `GET /observability/v1/deep-research-insights/pricing/` | `project=13875` | 200 |
| 8 | `GET /test_framework/v1/views/` | `project_id=13875` | 200 |
| 9 | `GET /test_framework/v2/aiagents/short_list/` | `project_id=13875`, `ql={id,agent_name,language,agent_gives_first_message}` | 200 |

Calls 2, 3, 4, and 6 returned `[]`.

Response of call 1 (trimmed):

```json
{"metrics": [
  {"metric": 240898, "metric_name": "AI interrupting user", "eval_type": "numeric",
   "type": "custom_code", "function_name": "get_main_agent_interruption", "enum_values": [],
   "user_defined": false, "evaluation_trigger": "always", "display_order": 1,
   "insight_enabled": false, "pass_conditions": null,
   "default_pass_conditions": {"operator": "and", "conditions": [{"field": "score", "op": "gte", "value": 1}]},
   "triage_failure_limit": 100},
  {"metric": 240902, "metric_name": "Interruption Score", "eval_type": "continuous_qualitative",
   "insight_enabled": false, "pass_conditions": null,
   "default_pass_conditions": {"operator": "and", "conditions": [{"field": "score", "op": "gte", "value": 4}]},
   "triage_failure_limit": 100, "...": "..."},
  "..."]}
```

Default pass conditions seen: numeric Metrics use `score gte 1`. Binary Metrics use `score eq true`. Continuous qualitative Metrics use `score gte 4`.

Response of call 5 (metric failure-mode insights pricing):

```json
{"insight_generation_cost": 10.0, "metric_triage_cost": 0.4,
 "triage_daily_cap_per_metric": 100, "triage_daily_budget_per_metric": 10.0}
```

Response of call 7 (deep research insights pricing):

```json
{"deep_research_cost": 20.0, "deep_research_enabled": false}
```

#### Insight objects (from the public API docs)

Model `MetricFailureModeInsight`:

| Field | Type | Notes (from the public API docs) |
|---|---|---|
| `id`, `project` | integer | Read-only. |
| `metric`, `predefined_metric`, `metric_name` | integer or null, integer or null, string | The Metric. |
| `is_triage` | boolean | True when Insights are on for the Metric and the pass criteria exist. The page shows a card only when this is true. |
| `window_start`, `window_end` | date-time | Analysis window. |
| `num_calls_analyzed`, `total_failures_in_window` | integer | Counts. |
| `status` | string | `pending`, `running`, `succeeded`, `failed`, `skipped_no_failures`. |
| `headline`, `overall_status_emoji` | string | Card header. |
| `failure_modes` | any | The failure modes. |
| `error_message`, `duration_seconds` | string, number | Run data. |

Model `DeepResearchInsight`: `id`, `project`, `window_start`, `window_end`, `num_calls_analyzed`, `status` (`pending`, `running`, `succeeded`, `failed`, `skipped_not_enough_data`), `focus`, `focus_fallback`, `failure_modes`, `error_message`, `duration_seconds`, `created_at`, `updated_at`.

Other Insight calls in the public API docs: `POST /observability/v1/metric-failure-mode-insights/generate/`, `POST /observability/v1/metric-failure-mode-insights/bulk_generate/`, `POST /observability/v1/metric-failure-mode-insights/{id}/generate-scenario/`, `POST /observability/v1/metric-failure-mode-insights/{id}/fix-metric/`, `POST /observability/v1/metric-failure-mode-insights/{id}/reproduce/`, `GET /observability/v1/metric-failure-mode-insights/categories/{category_slug}/calls/`, `POST /observability/v1/deep-research-insights/generate/`, `POST /observability/v1/deep-research-insights/dismiss_mode/`.

#### States

| State | Text (verbatim) |
|---|---|
| No enabled Metric | "No metrics have insights enabled yet." and "Pick a metric and tell us what a passing call looks like. We'll investigate the calls that don't meet it and group them into recurring failure modes." |
| Dialog cost text | "Every failure will be analysed at 0.4 credits each. No daily limit." |
| Disabled | "Enable insights" in the dialog with no Metric. |

#### Business rules

- Each analysed failure costs 0.4 credits (`metric_triage_cost`).
- The default daily cap is 100 failures for each Metric (`triage_daily_cap_per_metric`, `triage_failure_limit`). The daily budget is 10.0 credits for each Metric.
- One insight generation costs 10.0 credits (`insight_generation_cost`).
- One Deep Research audit costs 20.0 credits (`deep_research_cost`). Deep Research was off for the project.
- The default date range is the last 24 hours.

#### Not seen in the capture

- An Insight card, a failure mode, and the trend chart. No Metric had Insights enabled.
- The save call of "Enable insights" and its request body.
- The other operator options and the other "Failures to consider each day" options.
- The Deep Research section of the page.
- The date range picker in the open state.
- The "Select View" menu.

### 6.7 Overview dashboards

#### Route and entry

- Route: `/<project>/dashboards/<dashboard_id>`.
- Example: `/13875/dashboards/13682`.
- Entry: sidebar item "Overview". The sidebar link is `/13875/dashboards`. The page redirects to the first dashboard, here `/13875/dashboards/13682`.

#### Purpose

A Dashboard is a grid of Plots over production Calls. The user adds, edits, duplicates, and deletes Plots, then saves the changes in one batch.

#### Layout

1. Toolbar, left: "Select dashboard" combobox ("Overview"), "+ Add Plot" button (black).
2. Toolbar, right: "In Daily Report" switch with an info icon, "All agents" combobox, "Metadata" button (tag icon), time range button "Last 7 days", refresh icon button.
3. Unsaved-changes bar (only with pending changes): yellow band with a dot, "Unsaved changes (1 plot)", buttons "Discard" and "Save Changes" (orange).
4. Stat row: four cells "Success Ratio", "Number of Calls", "Total Call Minutes", "Median Latency", with a "⋮" menu at the right end.
5. Plot grid, four Plots for each row. Each Plot has a header (drag grip, chart icon, title, "Expand <title>" button, refresh button, "⋮" menu button), a chart area, and a footer (field label at the left, aggregation label at the right).

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Select dashboard" | Combobox | Dashboards of source `call_logs`. Only "Overview" seen. | "Overview" | None | Opens another Dashboard (inferred: route change). |
| "Add Plot" | Button | None | Enabled | None | Opens the dialog "Create Plot". |
| "In Daily Report" | Switch with an info icon | On, off | Off | None | Adds the Dashboard to the daily report (inferred). Not toggled. |
| Agent filter | Combobox | "All agents" and the Agents of the project | "All agents" | None | Filters every Plot by Agent (inferred). |
| "Metadata" | Button that opens a popover | See "Metadata filter popover" | No filter | None | Filters every Plot by Call metadata. |
| Time range | Button that opens a popover | See 6.8 | "Last 7 days" | See 6.8 | Sets the Dashboard time range. |
| Refresh icon | Icon button | None | Enabled | None | Reloads all Plot data (inferred). |
| "Discard" | Button | None | Shows with pending changes | None | Drops the pending changes (inferred). Not clicked. |
| "Save Changes" | Button, orange | None | Shows with pending changes | None | Sends `POST /dashboards/dashboards/{id}/bulk_widgets/`. |
| "Expand <title>" | Icon button | None | Enabled | None | Opens a larger view of the Plot (inferred). |
| Plot refresh | Icon button | None | Enabled | None | Reloads the data of one Plot (inferred). |
| Plot "⋮" | Menu button | "Edit Plot", "Duplicate Plot", "Refresh Data", "Delete Plot" | Closed | None | See "Plot menu". |

#### Default Plots of the Overview dashboard

The Overview dashboard (ID 13682, source `call_logs`, `is_default: false`) had 7 Plots.

| Widget ID | Title (verbatim) | `field` | `chart_type` | Aggregation | Footer (verbatim) |
|---|---|---|---|---|---|
| 89808 | Overview Stats (stat row) | `stat` | `stat` | none | none |
| 89809 | "Success Rate" | `success` | `bar` | `avg`, `hour` | "Success", "Count" |
| 89812 | "Latency Over Time (ms)" | `metric_evaluations.value` (display name "Latency (ms)") | `bar` | `avg`, `hour` | "Latency (in ms)", "Avg" |
| 89810 | "Call Ended Reasons" | `call_ended_reason` | `pie` | none | "Call End Reason" |
| 89811 | "Total Duration (mins)" | `duration` | `bar` | `avg`, `hour` | "Call Duration", "Avg" |
| 89813 | "Infrastructure Issues" | `metric_evaluations.value` (Metric 240901) | `pie` | none | "Infrastructure Issues" |
| 89814 | "Interruption Score" | `metric_evaluations.value` (Metric 240902) | `bar`, metadata `display_type: "line"` | `avg`, `hour` | "Interruption Score", "Avg" |

The stat row data: "Success Ratio" "0%", "Number of Calls" 0, "Total Call Minutes" "00:00", "Median Latency" "0 ms". Each value has a "—" change line.

#### Metadata filter popover

| Element | Text (verbatim) | Behavior |
|---|---|---|
| Title | "Filter by metadata" | none |
| Help text | "Scopes every widget to calls whose metadata matches. Click Apply, then Save the dashboard to persist." | none |
| Key text box | Placeholder "Metadata key (e.g. caller_id)" | Metadata key. |
| Value text box | Placeholder "Equals value…" | Metadata value. The match is "equals". |
| "Remove metadata filter" | Icon button "×" | Removes the row. |
| "Add metadata filter" | Button "+ Add metadata filter" | Adds a row. |
| "Apply" | Button | Disabled until a key and a value exist (inferred). Applies the filter. The user must then save the Dashboard. |

#### Create Plot dialog

| Element | Text or options (verbatim) | Default | Behavior |
|---|---|---|---|
| Title | "Create Plot" | none | none |
| Subtitle | "Add a new chart plot to your dashboard" | none | none |
| "Quick Add" list | "Overview Stats" / "KPI header with calls, duration, success rate, latency". "Success Rate" / "Success/failure bar chart". "Latency Over Time (ms)" / "Track latency trends over time (ms)". | none | Each row has an icon and a "+" at the right. A click adds the preset Plot (seen for "Success Rate"). The list comes from `GET /dashboards/dashboards/predefined_widgets/`. |
| Divider | "or build your own" | none | none |
| "Data Field" | Combobox. Options: "Duration (mins)", "Success", "Is Reviewed", "Call Ended Reason", "Drop-off Point", "Topic", "Metric", "Custom Metadata" | "Select a field to visualize" | Starts a custom Plot form. The later form fields were not captured. |
| "Cancel" | Button | Enabled | Closes the dialog. |
| "Create Plot" | Button | Disabled until a field is selected | Adds the Plot to the pending changes (inferred from the "New" badge). |
| "Close" | Icon button "×" | Enabled | Closes the dialog. |

When the user adds a Plot, the page sends `POST /dashboards/widgets/preview_data/`. The new Plot shows a green "New" badge next to its title and has only the "⋮" menu in its header. The unsaved-changes bar shows "Unsaved changes(1 plot)" (accessibility text) or "Unsaved changes (1 plot)" (screenshot).

#### Plot menu

| Menu item (verbatim) | Behavior |
|---|---|
| "Edit Plot" | Opens the Plot form (inferred). Not clicked. |
| "Duplicate Plot" | Adds a copy of the Plot to the pending changes (inferred). Not clicked. |
| "Refresh Data" | Sends `GET /dashboards/widgets/{id}/data/`. |
| (separator) | none |
| "Delete Plot" (red) | Opens the confirm dialog "Delete Plot". |

Confirm dialog "Delete Plot":

- Text (verbatim): "Are you sure you want to delete "Success Rate"? This change will be applied when you save."
- Buttons: "Cancel", "Mark for Deletion" (red).
- "Mark for Deletion" adds the delete to the pending changes. The server call happens at "Save Changes".

#### Flows

1. The user clicks "Overview" in the sidebar. The page sends `GET /dashboards/dashboards/?project_id=13875&page_size=1`. It redirects to `/13875/dashboards/13682`.
2. The page sends `GET /dashboards/dashboards/?project_id=13875&source=call_logs`, `GET /dashboards/widgets/?dashboard_id=13682&page_size=40`, `GET /test_framework/v2/aiagents/short_list/`, and one `GET /dashboards/widgets/{id}/data/?timezone=Europe/Paris` for each Plot.
3. The user clicks "Metadata". The popover opens. No call.
4. The user clicks "Last 7 days". The time range popover opens. No call.
5. The user clicks "Add Plot". The page sends `GET /test_framework/v2/metrics/` and `GET /dashboards/dashboards/predefined_widgets/?source=call_logs`. The dialog opens.
6. The user clicks the Quick Add item "Success Rate". The page sends `POST /dashboards/widgets/preview_data/`. The dialog closes. The new Plot shows with the "New" badge. The unsaved-changes bar shows.
7. The user clicks "Save Changes". The page sends `POST /dashboards/dashboards/13682/bulk_widgets/` with one `create` item. The server returns the new widget ID 108647.
8. The page reloads the widget list and the data of each Plot. The bar goes away. The new Plot has no "New" badge.
9. The user opens the "⋮" menu of the new Plot and clicks "Refresh Data". The page sends `GET /dashboards/widgets/108647/data/`.
10. The user clicks "Delete Plot", then "Mark for Deletion", then "Save Changes". The page sends `POST /dashboards/dashboards/13682/bulk_widgets/` with `"delete": [108647]`.
11. The page reloads the widgets. One data call for 108647 still goes out and returns 404.

#### Backend calls

| # | Method and path | Important query parameters | Status seen |
|---|---|---|---|
| 1 | `GET /dashboards/dashboards/` | `project_id=13875`, `page_size=1` or `source=call_logs` | 200 |
| 2 | `GET /dashboards/widgets/` | `dashboard_id=13682`, `page_size=40` | 200 |
| 3 | `GET /dashboards/widgets/{id}/data/` | `timezone=Europe/Paris` | 200, and 404 for a deleted widget |
| 4 | `GET /dashboards/dashboards/predefined_widgets/` | `project_id=13875`, `source=call_logs` | 200 |
| 5 | `POST /dashboards/widgets/preview_data/` | `timezone=Europe/Paris` | 200 |
| 6 | `POST /dashboards/dashboards/{id}/bulk_widgets/` | none | 200 |
| 7 | `GET /test_framework/v2/metrics/` | `project_id=13875`, `ql={id,name,type,description,function_name,eval_type,enum_values,vocera_defined_metric_code,overall_score,total_score}` | 200 |

Response of call 1:

```json
{"count": 1, "next": null, "previous": null, "results": [{
  "id": 13682, "name": "Overview", "project": 13875, "source": "call_logs", "is_default": false,
  "filters": {"operator": "and", "conditions": [
    {"op": "gte", "field": "timestamp", "value": "now-7d"},
    {"op": "lte", "field": "timestamp", "value": "now"}]},
  "widget_count": 7,
  "created_at": "2026-09-03T13:30:06.642474Z", "updated_at": "2026-09-03T13:30:06.642480Z"}]}
```

Response of call 2 (trimmed to one widget):

```json
{"count": 7, "next": null, "previous": null, "results": [{
  "id": 89814, "dashboard": 13682, "name": "Interruption Score",
  "filters": {"operator": "and", "conditions": [{"operator": "same_row", "conditions": [
    {"op": "eq", "field": "metric_evaluations.metric.id", "value": 240902},
    {"op": "neq", "field": "metric_evaluations.value", "value": null}]}]},
  "effective_filters": {"...": "dashboard filters AND widget filters"},
  "chart_type": "bar", "data_type": "", "field": "metric_evaluations.value",
  "metric": 240902, "metric_name": "Interruption Score",
  "time_period": "hour", "aggregation_function": "avg", "group_by": {},
  "metadata": {"metric_name": "Interruption Score", "display_type": "line", "sort_position": 6, "line_data_mode": "aggregated"},
  "created_at": "2026-09-03T13:30:06.647527Z", "updated_at": "2026-09-03T13:30:06.647529Z"}, "..."]}
```

Response of call 3 for a pie Plot:

```json
{"widget_id": 89810, "field_name": "call_ended_reason", "chart_type": "pie", "data": [],
 "aggregation_function": null, "time_period": null, "group_by": null, "can_group_by": true,
 "metadata": {"display_name": "Call End Reason", "data_type": "string", "filter_value": null}}
```

Response of call 3 for a deleted widget (status 404):

```json
{"detail": "No Widget matches the given query."}
```

Response of call 4:

```json
[{"name": "Overview Stats", "field": "", "chart_type": "stat",
  "description": "KPI header with calls, duration, success rate, latency", "icon": "Activity"},
 {"name": "Success Rate", "field": "success", "chart_type": "bar", "time_period": "hour",
  "aggregation_function": "avg", "description": "Success/failure bar chart", "icon": "BarChart",
  "metadata": {"display_aggregation": "count", "is_binary_count_mode": true}},
 {"name": "Latency Over Time (ms)", "field": "metric_evaluations.value", "chart_type": "bar",
  "time_period": "hour", "aggregation_function": "avg",
  "description": "Track latency trends over time (ms)", "icon": "TrendingUp", "metric": 240903}]
```

Request body of call 5:

```json
{"dashboard": 13682, "field": "success", "chart_type": "bar",
 "dashboard_filters": {"operator": "and", "conditions": [
   {"field": "timestamp", "op": "gte", "value": "now-7d"},
   {"field": "timestamp", "op": "lte", "value": "now"}]},
 "time_period": "hour", "aggregation_function": "avg"}
```

Response of call 5:

```json
{"widget_id": null, "field_name": "success", "chart_type": "bar", "data": [],
 "aggregation_function": "avg", "time_period": "hour", "group_by": null, "can_group_by": true,
 "metadata": {"display_name": "Success", "data_type": "boolean", "filter_value": null}}
```

Request body of call 6, create:

```json
{"create": [{"name": "Success Rate", "field": "success", "chart_type": "bar",
             "time_period": "hour", "aggregation_function": "avg",
             "filters": {"operator": "and", "conditions": [{"field": "success", "op": "neq", "value": null}]},
             "group_by": null,
             "metadata": {"display_aggregation": "count", "is_binary_count_mode": true, "sort_position": 7}}],
 "update": [], "delete": []}
```

Response of call 6, create (trimmed):

```json
{"created": [{"id": 108647, "dashboard": 13682, "name": "Success Rate",
              "filters": {"operator": "and", "conditions": [{"op": "neq", "field": "success", "value": null}]},
              "effective_filters": {"...": "..."}, "chart_type": "bar", "data_type": "", "field": "success",
              "metric": null, "metric_name": null, "time_period": "hour", "aggregation_function": "avg",
              "group_by": null, "metadata": {"sort_position": 7, "display_aggregation": "count", "is_binary_count_mode": true},
              "created_at": "2026-10-23T20:11:26.016334Z", "updated_at": "2026-10-23T20:11:26.016348Z"}],
 "updated": [], "deleted": []}
```

Request body and response of call 6, delete:

```json
{"create": [], "update": [], "delete": [108647]}
```

```json
{"created": [], "updated": [], "deleted": [108647]}
```

#### Dashboard and Plot objects (from the public API docs)

Model `Dashboard`: `id`, `name` (max 255), `project`, `source` (`call_logs` or `runs`, fixed after create), `is_default` (read-only), `filters` (JSON filter), `widgets` (read-only), `widget_count`, `created_at`, `updated_at`.

Model `Widget` (a Plot):

| Field | Type | Notes (from the public API docs) |
|---|---|---|
| `id`, `dashboard` | integer | IDs. |
| `name` | string or null | Plot title. |
| `filters` | object or null | Plot filter. |
| `effective_filters` | object | Read-only. Dashboard filter merged with the Plot filter. |
| `chart_type` | string | Required. `line`, `bar`, `pie`, `stat`. |
| `data_type` | string or null | `numeric`, `boolean`, `string`, `datetime`, `dynamic`. |
| `field` | string | The plotted field. Empty for `stat`. |
| `metric`, `metric_name` | integer or null, string | Required when `field` is `metric_evaluations.value`. |
| `time_period` | string or null | `hour`, `day`, `week`, `month`. For bar charts. |
| `aggregation_function` | string or null | `count`, `sum`, `avg`, `min`, `max`, `p50`, `p95`, `p99`. For bar charts. |
| `group_by` | object or null | `{"type": "field", "field": "agent.id"}` or `{"type": "bucket", "interval": 3600000}`. |
| `metadata` | object or null | Front-end data. Keys seen: `layout {h, w, x, y}`, `sort_position`, `display_aggregation`, `is_binary_count_mode`, `display_type`, `line_data_mode`, `metric_name`. |

Plot data shapes for `data` (from the public API docs): line `[{id, timestamp, value}]`, bar `[{time_interval, value, sample_count}]`, pie `[{label, value, percentage}]`.

Filter grammar (from the public API docs): a condition is `{field, op, value}`. A group is `{operator, conditions}`. Operators: `and`, `or`, `same_row`. Comparison ops: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `contains`, `startswith`, `endswith`, `in`, `isnull`, `regex`.

Other Dashboard calls in the public API docs: `POST /dashboards/dashboards/`, `PATCH /dashboards/dashboards/{id}/`, `DELETE /dashboards/dashboards/{id}/`, `POST /dashboards/dashboards/{id}/duplicate/`, `POST /dashboards/widgets/bulk_data/`.

#### States

| State | Text (verbatim) |
|---|---|
| Empty Plot | "No data available" |
| Pending changes | "Unsaved changes (1 plot)" with "Discard" and "Save Changes" |
| New Plot | Green badge "New" |
| Delete confirm | "Are you sure you want to delete "Success Rate"? This change will be applied when you save." |
| Disabled | "Create Plot" with no field. "Apply" in the Metadata popover with no values. |

#### Business rules

- Plot changes (add, edit, duplicate, delete) stay local until "Save Changes". One `bulk_widgets` call sends all changes.
- A new Plot gets `metadata.sort_position` = the next position (7 after 7 Plots, positions 0 to 6 inferred).
- The Quick Add "Success Rate" Plot adds the filter `success neq null`.
- Every data call sends the browser timezone as `timezone`.
- The default Dashboard filter is `timestamp >= now-7d` and `timestamp <= now`.

#### Not seen in the capture

- Any Plot with data.
- The custom Plot form after the user selects a "Data Field".
- "Edit Plot" and "Duplicate Plot".
- "Discard".
- The "In Daily Report" toggle call.
- The "Select dashboard" list with more than one Dashboard, and the create, rename, and delete flows for a Dashboard.
- The applied Metadata filter and its save.
- The "Expand" view of a Plot.
- The drag-and-drop reorder of Plots and the call that saves `metadata.layout`.
- The "⋮" menu of the stat row.

### 6.8 Shared component: time range picker

The Runs Overview page and the Dashboards use the same time range popover.

#### Layout

1. Left part, heading "Absolute time range": timezone offset text "+02:00", "From" text box with a calendar button, "To" text box with a calendar button, two more icon buttons, "Apply time range" button.
2. Right part: "Search quick ranges" text box and a list of quick range buttons.

#### Controls

| Label | Control type | Options or values (verbatim) | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "From" | Text box | Placeholder "YYYY-MM-DD HH:mm:ss or now-6h" | "now-6h" on Runs Overview, "now-7d" on a Dashboard | Not captured | Start of the range. Accepts an absolute time or a relative expression. |
| "To" | Text box | Placeholder "YYYY-MM-DD HH:mm:ss or now" | "now" | Not captured | End of the range. |
| Calendar buttons | Icon buttons | none | none | none | Open a date picker (inferred). |
| "Apply time range" | Button | none | Enabled | none | Applies the range. |
| "Search quick ranges" | Text box | Free text | Empty | none | Filters the quick range list (inferred). |
| Quick ranges (Runs Overview) | Buttons | "Last 5 minutes", "Last 15 minutes", "Last 30 minutes", "Last 1 hour", "Last 3 hours", "Last 6 hours", "Last 12 hours", "Last 24 hours", "Last 2 days", "Last 7 days", "Last 30 days" | "Last 6 hours" | none | Sets the range. |
| Quick ranges (Dashboard) | Buttons | The 11 ranges above, then "Today - 24 hours", "Today - 12 hours", "Today - 6 hours", "Today - 3 hours", "Today - 1 hour", "Today - 30 minutes", "Today - 15 minutes", "Today - 5 minutes", "Today - 2 days", "Today - 7 days", "Today - 30 days" | "Last 7 days" | none | Sets the range. |

#### Business rules

- On Runs Overview, the URL keeps the relative form, for example `from=now-6h&to=now`. The overview call sends absolute timestamps.
- On a Dashboard, the Dashboard `filters` keep the relative form `now-7d` and `now`.

#### Not seen in the capture

- An applied custom range and its URL form.
- The validation message for a bad "From" or "To" value.
- The meaning of the "Today - <n>" ranges.
- The purpose of the two unlabeled icon buttons after "To".

## 7. Settings, Members, and Billing

This section describes the settings area of the dashboard. It covers the account page, 7 organization pages, 5 project pages, 1 "About" page, and the "Buy Credits" dialog.

Conventions in this section:

- Backend host: `https://backend.example.com`. All paths below are relative to this host.
- The crawl account: organization 7868 "example-org", project 13875 "Automaton Project", billing record 7845, subscription 3017. The email of the account is `<user-email>`.
- No settings call in the capture used the `ql` field-selection parameter.
- The capture opened every page and dialog. It saved no change. It created no API key, no invite, no phone number, no Model Context Protocol (MCP) server, and no schedule.
- When a write call is not in the capture, the spec names the documented call and marks it "from the public API docs", or marks it "(inferred)".

### 7.1 Settings shell

**Route:** every route that starts with `/settings`.

**How the user reaches it:**

1. Click "Settings" in the footer of the main sidebar.
2. Or open the account menu in the header and pick the settings entry (inferred, see section 1).

**Purpose:** the settings shell replaces the main sidebar with a settings sidebar. The header stays the same as in the rest of the dashboard.

**Layout:**

1. Header (same as the app shell): organization switcher, "/", project switcher ("13875 Automaton Project"), "Ask Assistant", "Notifications", "Account menu".
2. Left settings sidebar.
3. Main area. Each page puts its content in white cards on a light grey background.

**Settings sidebar items (in order):**

| Group heading | Label | Route |
|---|---|---|
| (none) | "Home" (back-arrow icon) | `/ai-assistant` |
| (none) | "Settings" | `/settings` |
| "ORGANIZATION" | "General" | `/settings/org/general` |
| "ORGANIZATION" | "API Key" | `/settings/org/api-key` |
| "ORGANIZATION" | "Members" | `/settings/org/members` |
| "ORGANIZATION" | "Billing" | `/settings/org/billing` |
| "ORGANIZATION" | "Telephony" | `/settings/org/telephony` |
| "ORGANIZATION" | "Agent Config" | `/settings/org/agent-config` |
| "ORGANIZATION" | "Integrations" | `/settings/org/integrations` |
| "PROJECT" | "General" | `/settings/project/general` |
| "PROJECT" | "Notifications" | `/settings/project/integrations` |
| "PROJECT" | "Provider API Keys" | `/settings/project/provider-api-keys` |
| "PROJECT" | "Webhook" | `/settings/project/webhook` |
| "PROJECT" | "Agent Knowledge" | `/settings/project/agent-knowledge` |
| "ABOUT" | "Third Party Notices" | `/settings/about/third-party-notices` |

**Business rules:**

- The sidebar label "Notifications" opens the route `/settings/project/integrations`. Keep this mismatch, because the page holds both integrations and notification toggles.
- The sidebar highlights the active item with a grey background.
- The "PROJECT" pages act on the project that the header project switcher shows.
- Each settings page has a "Save Changes" button at the top right of its header card. On most pages the button stays disabled until the user changes a value (inferred from the disabled state with no edits). The "Provider API Keys" page shows the button enabled with no edits.
- Every settings page has an empty `alert` region at the end of the page. The app uses it for screen-reader announcements (inferred).

#### Not seen in the capture

- The result of a "Save Changes" click on any page. No success toast and no error text appear in the capture.
- The settings pages for a user with the "Member" role or a view-only role.

### 7.2 Account Settings

**Route:** `/settings`

**How the user reaches it:** click "Settings" in the main sidebar, or click "Settings" in the settings sidebar.

**Purpose:** the page shows the profile of the signed-in user and the Multi-Factor Authentication (MFA) status.

**Layout:**

1. Header card: "Account Settings", "Manage your account details and preferences".
2. Left card (profile): round avatar with a blue-to-magenta gradient, the email, then 3 label-value pairs.
3. Right card: "Two-Factor Authentication", "Add an extra layer of security to your account", then an inner box "MFA Status" / "Current protection level for your account" with a status badge, then the "Enable MFA" button.

**Controls and fields:**

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| Avatar | Image | Gradient circle | - | - | Read-only. |
| Email | Text | `<user-email>` | - | - | Read-only. |
| "Role" | Text and badge | "Admin" | - | - | Read-only. The badge and the value both show the organization role. |
| "Member Since" | Text | "September 3, 2026" | - | - | Read-only. Date format: month name, day, year. |
| "Last Sign In" | Text | "October 23, 2026 at 9:01 PM" | - | - | Read-only. Date and 12-hour time. |
| "MFA Status" | Badge | "Disabled" (red, with a warning icon) | "Disabled" | - | Shows the Multi-Factor Authentication (MFA) state of the user. |
| "Enable MFA" | Button (black) | - | - | - | Starts the Multi-Factor Authentication (MFA) enrolment (inferred). The capture did not click it. |

**Backend calls:** the capture recorded no page-specific call. The page reads the user from the session and the organization record (inferred).

**States:** no loading, empty, or error state appears in the capture.

#### Not seen in the capture

- The Multi-Factor Authentication (MFA) enrolment flow (quick response (QR) code, code entry, recovery codes).
- The "Enabled" state of the badge.
- A way to edit the name or the avatar. The page shows none.

### 7.3 Organization: General

**Route:** `/settings/org/general`

**How the user reaches it:** settings sidebar, "ORGANIZATION" → "General".

**Purpose:** the page edits the organization name, the concurrency limits, and organization-wide switches. It also lists the projects of the organization.

**Layout (top to bottom, one card per block):**

1. Header card: "Organization Settings", "Manage your organization details and preferences", "Save Changes" button (disabled).
2. "Organization Name" card.
3. Limits card: "Parallel Call Limit", "Parallel Chat Limit".
4. One card per switch: "Allow Duplicate Call IDs", "Require 2FA for All Users", "Allow Join Requests", "Background Metric Optimiser", "Low Credits Email Notifications".
5. "Monitor Low Balance Notification Frequency" card.
6. "Projects" card with one row per project.

**Controls:**

| Label | Control type | Options or values | Default (observed) | Validation and errors | Behavior and backend field |
|---|---|---|---|---|---|
| "Organization Name" | Text box, placeholder "Enter organization name" | Free text | "example-org" | Max 255 characters (from the public API docs) | Field `name`. |
| "Parallel Call Limit" | Number box | Integer | "10" | Not seen | Help: "Specifies the maximum number of simultaneous calls the system can handle". Field `max_concurrent_runs_limit` (inferred from the label and the value). The plan caps it (see 7.6). |
| "Parallel Chat Limit" | Number box | Integer | "10" | Not seen | Help: "Specifies the maximum number of simultaneous chat runs the system can handle". Field `max_concurrent_chat_runs_limit` (inferred). |
| "Allow Duplicate Call IDs" | Switch | On / Off | On | - | Help: "Enabling this allows uploading calls with same call id in observability". Field `allow_duplicate_call_ids`. |
| "Require 2FA for All Users" | Switch | On / Off | Off | - | Help: "Enforce two-factor authentication for all users in this organization". Field `is_2fa_required`. |
| "Allow Join Requests" | Switch | On / Off | On | - | Help: "Allow users to request to join this organization". Field `allow_join_requests`. From the public API docs: users with a matching email domain can find the organization and send a join request. |
| "Background Metric Optimiser" | Switch | On / Off | On | - | Help: "Every hour, metrics whose Lab gained corrected samples are optimised automatically. Questions arrive in the Assistant chat; improved prompts are proposed for review in the Lab." Field `auto_metric_optimisation_enabled`. |
| "Low Credits Email Notifications" | Switch | On / Off | Off | - | Help: "Receive email alerts when credit balance falls below threshold". Field `notify_low_credits`. |
| "Monitor Low Balance Notification Frequency" | Select | "Disabled" seen. The `/enums/` call lists `CronjobLowBalanceMuteDaysChoices`: "Disabled" = `"0"`, "3 Days" = `"3"`, "7 Days" = `"7"`, "14 Days" = `"14"` (inferred as the options). | "Disabled" | - | Help: "Set how often to receive low balance emails when monitors run". Field `cronjob_low_balance_mute_days`. |
| "Save Changes" | Button | - | Disabled | - | Saves the changed fields. |

**Low-credit thresholds (from the public API docs):** when "Low Credits Notifications" is on, the docs show a "Credit Threshold Amount" input (default 1,000) and "Additional Alert Thresholds" chips (up to 10, each with an "x"). The capture showed the switch off, so these inputs did not appear.

**"Projects" card:** one row per project. Each row shows the project name ("Automaton Project"), "Project ID: 13875", and "Created: 9/3/2026" at the right. The rows are read-only in the capture.

**Flows:**

1. Open the page. The app calls `GET /user/organizations/7868/`.
2. Change a field. The "Save Changes" button becomes enabled (inferred).
3. Click "Save Changes". The app sends `PATCH /user/organizations/7868/` with the changed fields (from the public API docs, credit-alerts page). Not captured.

**Backend calls:**

`GET /user/organizations/{organization_id}/` → 200. The settings pages "General", "Members", "Billing", and "Telephony" all call it.

```json
{
  "id": 7868, "name": "example-org", "team_size": "<10",
  "max_concurrent_runs_limit": 10, "max_concurrent_chat_runs_limit": 10,
  "auto_metric_optimisation_enabled": true, "notify_low_credits": false,
  "low_credits_threshold": "1000.00", "low_credits_additional_thresholds": [],
  "cronjob_low_balance_mute_days": "0", "allow_duplicate_call_ids": true,
  "allow_join_requests": true, "is_2fa_required": false,
  "members": [{"id": 107291, "user": {"id": 9855, "name": "Automaton", "email": "<user-email>"},
               "role": "admin", "is_email_notify_enabled": true, "...": "..."}],
  "projects": [{"id": 13875, "name": "Automaton Project", "members": [], "created_at": "2026-09-03T13:30:06.431103Z"}],
  "...": "..."
}
```

`PATCH /user/organizations/{organization_id}/` (from the public API docs). Example body: `{"notify_low_credits": true, "low_credits_threshold": 500, "low_credits_additional_thresholds": [2000, 1000]}`.

#### Organization record: every field with its observed value

| Field | Observed value | Notes |
|---|---|---|
| `id` | 7868 | |
| `name` | "example-org" | "Organization Name" |
| `team_size` | "<10" | Enum `1`, `<10`, `10-100`, `100-500`, `500+` (from the public API docs) |
| `discovery_source` | null | |
| `outbound_timeout` | 300 | Organization default. The project has its own value. |
| `max_agents_limit` | -1 | -1 means no limit (from the public API docs). Read-only. |
| `max_members_limit` | -1 | Read-only |
| `max_concurrent_runs_limit` | 10 | "Parallel Call Limit" |
| `max_concurrent_chat_runs_limit` | 10 | "Parallel Chat Limit" |
| `max_call_duration` | 600 | |
| `evaluate_relevant_metrics_enabled` | true | |
| `end_call_enabled` | true | |
| `generate_scenario_auto_assign_numbers_enabled` | false | |
| `show_custom_dashboards` | true | Read-only |
| `notify_daily_report` | true | |
| `notify_cron_failure` | true | |
| `notify_cron_success` | false | |
| `notify_no_calls` | false | |
| `notify_result_webhook` | true | |
| `notify_cronjob_webhook` | true | |
| `notify_call_log_webhook` | true | |
| `forward_vapi_webhook` | true | |
| `forward_retell_webhook` | true | |
| `is_send_emails_enabled` | false | |
| `notify_frequent_calls_for_number` | false | |
| `frequent_calls_threshold` | 5 | |
| `frequent_calls_time_period` | 900 | Seconds (inferred) |
| `frequent_calls_cooldown` | 1200 | Seconds (inferred) |
| `notify_metric_significant_shift` | false | |
| `auto_metric_optimisation_enabled` | true | "Background Metric Optimiser" |
| `notify_low_credits` | false | "Low Credits Email Notifications" |
| `low_credits_threshold` | "1000.00" | Decimal string |
| `low_credits_additional_thresholds` | [] | Up to 10 integers (from the public API docs) |
| `cronjob_low_balance_mute_days` | "0" | "Monitor Low Balance Notification Frequency" |
| `limit_to_exclusive_numbers` | false | See 7.7 |
| `allow_duplicate_call_ids` | true | |
| `allow_join_requests` | true | |
| `conditional_actions_generation_enabled` | false | |
| `vapi_api_key_configured` | false | Organization-level key flag |
| `vapi_public_key_configured` | false | |
| `retell_api_key_configured` | false | |
| `syntflow_api_key_configured` | false | The API spells it "syntflow". |
| `members` | 1 item | `id`, `user {id, name, email}`, `role`, `is_email_notify_enabled`, `created_at`, `updated_at` |
| `projects` | 1 item | `id`, `name`, `members`, `created_at`, `updated_at` |
| `is_internal_view_only` | false | |
| `created_at` | "2026-09-03T13:30:06.426970Z" | |
| `updated_at` | "2026-10-23T19:50:48.554059Z" | |
| `timezone` | "US/Pacific" | |
| `is_2fa_required` | false | "Require 2FA for All Users" |
| `skip_onboarding` | false | |
| `onboarding_flow` | "simulation" | Enum `simulation`, `observability` |
| `user_onboarding` | `{"status":"completed","path":"ui","variant":"simulation","current_step":"create-agent","can_skip":false}` | |
| `phone_number_verified` | true | |
| `slack_invite_sent` | false | |
| `auto_refill` | false | "Enable Auto-Refill" on the "Billing" page |
| `auto_refill_threshold` | "0.00" | |
| `auto_refill_amount` | "0.00" | |
| `auto_refill_max_cap` | null | null means no cap per billing cycle (from the public API docs) |

#### Not seen in the capture

- The save request and its response. No toast text.
- The threshold inputs that appear when "Low Credits Email Notifications" is on.
- Validation messages for the number boxes, for example a value above the plan cap.
- An action on a "Projects" row (open, rename, delete).

### 7.4 Organization: API Key

**Route:** `/settings/org/api-key`

**How the user reaches it:** settings sidebar, "ORGANIZATION" → "API Key".

**Purpose:** the page lists the API keys of the organization in masked form. The user can create or delete a key.

**Layout:**

1. Header card: "API Keys", "View your organization API keys", "Create" button (black, "+" icon) at the right.
2. Info line: "Your API keys are shown below. Visit [the documentation] to learn how to use them with different providers." The link opens `https://docs.example.com/documentation/guides/observability/custom`.
3. One card per key, in creation order. Each card has a label line, then a disabled text box with a key icon, then a red trash button.

**Controls:**

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Create" | Button | - | Enabled | - | Opens the "Create API Key" dialog (7.4.1). |
| Key label | Text | The key `name`. If the name is empty, the label is "Private Key". | - | - | Observed labels: "Private Key" (name `""`), "e2e_key". |
| Key value | Text box, disabled | First 6 characters of the key, then 58 asterisks | - | - | The backend sends the masked value. The page never shows the full key after creation (inferred). |
| "Delete API Key" | Icon button (red trash) | - | - | - | Deletes the key (inferred). The capture did not click it. The delete call and any confirm dialog are not seen. |

**Backend calls:**

`GET /user/api/v1/user-api-key/?organization_id=7868` → 200. The response is a plain array, with no page envelope.

```json
[
  {"id": 14747, "name": "", "organization": 7868, "organization_name": "example-org",
   "project": null, "key": "ab12cd**********************************************************",
   "created_at": "2026-09-03T13:30:06.715395Z"},
  {"id": 14969, "name": "e2e_key", "project": null, "key": "ef34gh***...", "...": "..."}
]
```

The key prefixes above are placeholders. `project: null` means an organization-level key.

**Business rules:**

- The organization had 2 keys. The first key (`name` empty) appeared at organization creation (2026-09-03T13:30:06Z, same second as the organization). So the backend auto-creates 1 unnamed organization key for a new organization (inferred).
- From the public API docs: only the "Admin" role can open this page. Rotation advice: organization keys every 90 days, project keys every 180 days.

#### 7.4.1 "Create API Key" dialog

**How the user reaches it:** click "Create" on the "API Keys" page.

**Layout:** modal dialog with a dark overlay. Title "Create API Key". Sub-title "Enter a name for your new API key." Close "X" at the top right. 2 fields. "Create API Key" button at the bottom right.

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "API Key Name" | Text box, placeholder "API Key Name" | Free text | Empty, focused | Not seen | Field `name`. |
| "API Key Level" | Select | "Organization Level" seen. "Project Level" from the public API docs. | "Organization Level" | - | For "Project Level", the docs say that the user selects 1 project. Field `project` (null for organization level). |
| "Create API Key" | Button (grey when disabled) | - | Disabled | Stays disabled while the name is empty (inferred). | Sends the create call. |
| "Close" | Icon button "X" | - | - | - | Closes the dialog. No call. |

**Flow (from the public API docs, not executed in the capture):**

1. Type a name.
2. Optional: pick "Project Level", then pick a project.
3. Click "Create API Key". The app sends `POST /user/api/v1/user-api-key/` with `{"name": "zz-spec-test-key", "project": null}`.
4. The backend returns 201 with a `UserAPIKey` body (`id`, `name`, `organization_name`, `project`, `project_name`, `key`, `created_at`).
5. The docs say "copy the key". The dialog probably shows the full key once (inferred).

#### Not seen in the capture

- The create call, the full-key display, and the copy control.
- The "Project Level" option and the project picker.
- The delete call (`DELETE` on the key, inferred) and its confirm dialog.

### 7.5 Organization: Members

**Route:** `/settings/org/members`

**How the user reaches it:** settings sidebar, "ORGANIZATION" → "Members".

**Purpose:** the page lists the people in the organization, their organization role, and the projects that each person can open.

**Layout:**

1. Page heading "Team members". Sub-title: "Who is in your organization, which projects they can open, and who gets each project's email alerts."
2. "Invite Member" button (black, person-plus icon) at the right.
3. "People" card. Header: "People" with a count badge "1", a "Filter by project" select, and a "Search people" box.
4. Table with columns "Person", "Org role", "Projects".

**Controls:**

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Invite Member" | Button | - | Enabled | - | On the Pay As You Go (PayG) plan with no payment method, it opens the "Add a payment method to continue" dialog (7.5.1). |
| "Filter by project" | Select with folder icon | "All projects" seen. One option per project (inferred). | "All projects" | - | Filters the table by project access (inferred). |
| "Search people" | Search box | Free text | Empty | - | Filters the rows by name or email (inferred). |
| Person cell | Avatar with initial, name, badge | "A", "Automaton", "You" | - | - | "You" marks the signed-in user. |
| "Org role" cell | Badge | "Admin" | - | - | The `/enums/` call lists `RoleChoices`: "Admin" `admin`, "Member" `member`, "View Only" `view_only`, "Internal View Only" `internal_view`, "Labs" `labs`, "Labs View Only" `labs_view_only`, "Insights View Only" `insights_view`. The role editor is not seen. |
| Projects cell | Button with chevron, accessible name "Show projects for `<user-email>`" | "All projects" | - | - | Opens the project list of that member (inferred). |

**Backend calls:** `GET /user/organizations/7868/` → 200 (same body as 7.3). The page builds the table from `members[]`.

**Business rules:**

- From the public API docs: an "Admin" opens all projects. A "Member" opens only the projects that an admin assigns. A "Viewer" has read-only access.
- The member record has `is_email_notify_enabled`. The sub-title says that the page controls "who gets each project's email alerts". So the project access row probably holds an email-alert switch (inferred).
- The `/enums/` call also lists `InviteStatusChoices` ("Pending", "Accepted", "Rejected") and `InviteTypeChoices` ("Admin Invite" `invite`, "User Request" `request`).

#### 7.5.1 "Add a payment method to continue" dialog (from "Invite Member")

**Layout:** alert dialog. Title: "Add a payment method to continue". Text: "Add a payment method before choosing how to cover your first paid teammate. You won't be charged during setup." Buttons: "Cancel", "Add Payment Method" (black).

| Label | Control type | Behavior |
|---|---|---|
| "Cancel" | Button | Closes the dialog. |
| "Add Payment Method" | Button | Starts the payment method setup on an external payment page (inferred). Not clicked. |

**Business rule:** on the Pay As You Go (PayG) plan, the first user is free. A second member is a paid seat. So the app asks for a payment method before it shows the invite form. The PayG seat price in the plan offer is `price: 30.0` US dollars (USD) per month. The public API docs confirm "$30 per user per month".

**Backend calls:** none recorded when the dialog opened.

#### Not seen in the capture

- The invite form itself (email, role, projects). It needs a payment method on this plan.
- The role editor, the remove-member action, and pending invites.
- Join requests from users with a matching email domain.

### 7.6 Organization: Billing

**Route:** `/settings/org/billing`. The app adds `?page=1&pageSize=30` for the usage table.

**How the user reaches it:** settings sidebar, "ORGANIZATION" → "Billing". The "PayG" badge in the main sidebar footer probably links here too (inferred).

**Purpose:** the page shows the plan, the credit balance, the usage in the current cycle, the concurrency use, the seats, the next bill, the credit prices, and the usage history.

**Layout:** two columns, then a full-width tab area.

Left column, top to bottom:

1. Plan card. "CURRENT PLAN" label, heading "Pay As You Go", green badge "Active". At the right: "Manage Billing" button and the link-style button "Switch to Startup Plan monthly · $500/mo".
2. Same card, "ADDITIONAL CREDITS" block: "Enable Auto-Refill" row with a switch, then a yellow warning box.
3. Same card, "CREDITS AVAILABLE" block with an eye icon ("View credit breakdown"), the balance "204.84 Credits", the "Add Credits" button, and a purple progress bar.
4. "Usage this cycle" card with the cycle dates and 4 counters.
5. "Concurrency" card and "Users" card, side by side.

Right column, top to bottom:

1. "Next Bill" card.
2. "Scale Up" / "Enterprise Tier" card (black background).
3. "Credits Usage Breakdown" card.
4. Blue info strip "1 Credit = $0.05 USD".

Full width, below both columns:

1. Tab bar: "Usage History" (selected), "Usage by Metric", "Billing History", "Usage Report". Date-range button at the right.
2. "Usage History" panel: "Usage Graph" card with a period select, then the usage table, then pagination.

**Controls and displays:**

| Label | Control type | Options or values | Default (observed) | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Pay As You Go" + "Active" | Heading and badge | Plan name and status | "Pay As You Go", "Active" | - | From the subscription. |
| "Manage Billing" | Button (outline, receipt icon) | - | Enabled | - | Opens the payment portal (inferred). Not clicked. |
| "Switch to Startup Plan monthly · $500/mo" | Link-style button | Text from the plan offer | - | - | Starts the plan switch (inferred). Not clicked. |
| "Enable Auto-Refill" | Switch | On / Off | Off | - | Help: "Automatically purchase credits when running low". Field `auto_refill` on the organization. |
| Auto-refill warning | Yellow box with a warning icon | "Auto-refill is off. Add credits manually to avoid interruptions during active runs." | Shown | - | Shown while auto-refill is off. |
| "View credit breakdown" | Icon button (eye) | - | - | - | Shows the split between plan credits and additional credits (inferred from the public API docs, which describe 2 balances). Not clicked. |
| "204.84" "Credits" | Large number | Balance | 204.84 | - | Available credits. |
| "Add Credits" | Button (black, "+" icon) | - | Enabled | - | Opens the credit purchase flow. With no payment method, it probably opens the same dialog as "Buy Credits" (7.16) (inferred). |
| Progress bar | Bar | - | Purple, full | - | Probably the remaining balance against the cycle grant (inferred). |
| "Usage this cycle" | Card with date chip | "Oct 3, 2026 - Nov 3, 2026" | - | - | Cycle of 1 month. |
| "Testing Credits Used" | Counter | Number | "0" | - | |
| "Calls Credits Used" | Counter | Number | "0" | - | |
| "# of Calls Observed" | Counter | Number | "0" | - | |
| "# of Simulations" | Counter | Number | "0" | - | |
| "Concurrency" | Card | "Call Runs 0/10", "Chat Runs 0/10" | - | - | Current use over the limit. The limits come from `max_concurrent_runs_limit` and `max_concurrent_chat_runs_limit`. |
| "Increase Concurrency" | Link button (arrow icon) | Opens `https://cal.com/kabrasidhant/30min` | - | - | Text above: "Approaching concurrency limit?" |
| "Users" | Card | "Active Members 1", "Total Users 1" | - | - | Note: "* All users share the same credit balance". |
| "Add Users" | Button (outline, "+") | - | - | - | Not clicked. Probably the same payment-method gate as "Invite Member" (inferred). |
| "Next Bill" | Card | "Billed monthly · plan never expires", "$0.00", line "Pay As You Go base (first user free) $0" | - | - | |
| "Enterprise Tier" | Card | List: "Custom Concurrency", "Custom Users", "Dedicated Support (Slack, Teams)", "Compliance: HIPAA / GDPR / SOC 2", "Scaling Services: Red Teaming, Load Testing" | - | - | Static sales card. |
| "Speak to team" | Link button (white) | Opens `https://cal.com/kabrasidhant/30min` | - | - | |
| "Credits Usage Breakdown" | Card | "Voice Simulation" "5 Credits" "per Minute". "Text Simulation" "0.5 Credit" "per Reply". "Conversation Analysis" "Starts at 0.1 Credits" "per Call" (expandable, chevron). Note: "*0.02 credits for transcript-based observability." | - | - | "Conversation Analysis" is a button that expands a detail list (inferred). Not clicked. |
| "1 Credit = $0.05 USD" | Info strip | - | - | - | Static. |
| Tabs | Tab bar | "Usage History", "Usage by Metric", "Billing History", "Usage Report" | "Usage History" | - | Only "Usage History" was open in the capture. |
| Date range | Button with calendar icon | "Oct 16, 22:13:34 to Oct 23, 22:13:34" | Last 7 days, ending now | - | The request filters use the whole days in the browser time zone (`00:00:00.000+02:00` to `23:59:59.999+02:00`). |
| "Usage Graph" period | Select | "Daily" seen. Probably also hour, week, month (`WidgetTimePeriodChoices`, inferred). | "Daily" | - | Sets `time_period` on the chart call. |
| Usage graph | Line chart | X axis: 1 tick per day ("Oct 16" to "Oct 23"). Y axis: 0 to 4. Legend: "Calls" (grey), "Simulations" (blue), "Total Usage" (green). | Flat line at 0 | - | |
| Usage table | Table | Columns "Timestamp", "Type", "Description", "Amount" | Empty | - | Empty text: "No usage history available". |
| "Previous" / "Next" | Buttons | - | Disabled | - | Pagination. |
| "Rows per page:" | Select | "30" seen | "30" | - | Sets `page_size`. |

**Flows:**

1. Open the page. The app sends 4 calls: the organization record, the usage history, the usage chart, and the plan switch offer.
2. Change the date range. The app repeats the history call and the chart call with new `filters` (inferred).
3. Change "Daily". The app repeats the chart call with a new `time_period` (inferred).
4. Set "Enable Auto-Refill" to on. The app probably shows threshold and amount inputs and saves `auto_refill`, `auto_refill_threshold`, `auto_refill_amount`, `auto_refill_max_cap` on the organization (inferred). Not captured.

**Backend calls:**

`GET /user/organizations/7868/` → 200. Same body as 7.3.

`GET /test_framework/billing/usage-history/?page=1&organization_id=7868&page_size=30&filters=<json>` → 200.

```json
// filters (URL-encoded in the request)
{"operator":"and","conditions":[
  {"field":"created_at","op":"gte","value":"2026-10-16T00:00:00.000+02:00"},
  {"field":"created_at","op":"lte","value":"2026-10-23T23:59:59.999+02:00"}]}
// response
{"next": null, "previous": null, "results": []}
```

The page envelope has no `count` field.

`GET /test_framework/billing/7845/usage-chart/?time_period=day&split_by_type=true&filters=<same json>` → 200. The path uses the billing record ID (7845), not the organization ID.

```json
{"field_name": "amount", "chart_type": "bar", "data": [], "aggregation_function": "sum",
 "time_period": "day",
 "metadata": {"display_name": "Amount", "data_type": "numeric", "filter_value": null, "split_by_type": true}}
```

`GET /subscriptions/subscriptions/3017/plan-switch-offer/?organization_id=7868&pack_code=` → 200. The path uses the subscription ID (3017). `pack_code` was empty.

```json
{"offer": {
  "current_plan": {"code": "payg", "name": "Pay As You Go", "price": 30.0, "currency": "USD",
                   "interval": "month", "balance": "0.00", "max_projects_limit": 1, "...": "..."},
  "switch_to_plan": {"code": "startupplan", "name": "Startup Plan", "price": 500.0,
                     "balance": "10000.00", "...": "..."},
  "currency": "USD", "charged_amount": 500.0, "payg_plan": null}}
```

Documented billing calls that the page may use (from the public API docs):

| Method and path | Purpose |
|---|---|
| `GET /test_framework/billing/info/?organization_id=` | `credits_remaining`, `credits_used`, `initial_balance`, `balance_expiry`, `subscription_status` (with `pack` caps). `credits_used` can lag usage by up to 30 minutes. |
| `GET /test_framework/billing/payment-history/?organization_id=` | Payment list. Probably the "Billing History" tab (inferred). |
| `GET /test_framework/billing/unit-usage-report/?organization_id=&start_date=&end_date=&format=json\|csv` | Usage and credits per billable unit, 1 column per calendar month, at most 12 months. Probably the "Usage Report" tab (inferred). `format=csv` downloads a Comma-Separated Values (CSV) file. |

#### Plan (pack) fields: every field with its observed value

The plan switch offer returns 2 plan objects. The table lists both.

| Field | `current_plan` (Pay As You Go) | `switch_to_plan` (Startup Plan) |
|---|---|---|
| `code` | "payg" | "startupplan" |
| `name` | "Pay As You Go" | "Startup Plan" |
| `description` | "" | "" |
| `price` | 30.0 | 500.0 |
| `currency` | "USD" | "USD" |
| `interval` | "month" | "month" |
| `balance` | "0.00" | "10000.00" |
| `free_members_count` | 1 | 10 |
| `max_members_limit` | -1 | 10 |
| `max_projects_limit` | 1 | 5 |
| `max_agents_limit` | -1 | -1 |
| `max_concurrent_runs_limit` | 10 | 50 |
| `max_concurrent_chat_runs_limit` | 10 | 50 |
| `data_retention_days` | 30 | 90 |
| `premium_slack_support` | false | true |
| `custom_api_integrations` | false | false |
| `dedicated_support_engineer` | false | false |
| `sla_hours` | 0 | 12 |
| `custom_feature_requests` | false | false |
| `simulate_scenarios` | false | true |
| `downloadable_reports` | false | true |
| `slack_alerts` | false | true |
| `custom_sso` | false | false |
| `dedicated_cloud_instance` | false | false |
| `multiple_organizations` | false | false |
| `hippa_compliance` | false | false |
| `custom_features` | [] | [] |
| `features` | [] | [] |

Offer-level fields: `currency` "USD", `charged_amount` 500.0, `payg_plan` null.

Notes on the fields:

- -1 means no limit (from the public API docs).
- `sla_hours` is the Service Level Agreement (SLA) response time in hours (inferred).
- `custom_sso` is the Single Sign-On (SSO) feature flag (inferred).
- `hippa_compliance` keeps the spelling of the API. Do not correct it in the API contract.
- `balance` on a plan is the credit grant of the plan per cycle (inferred: Startup Plan 10,000 credits × $0.05 = $500, which equals the price).

**Business rules:**

- Pay As You Go (PayG) allows 1 project, 30 days of data retention, and 10 parallel call runs and 10 parallel chat runs.
- `price` 30.0 on PayG is the price of each paid seat. The first user is free, so "Next Bill" shows "$0.00" with "Pay As You Go base (first user free) $0".
- The switch button text comes from the offer: plan name, interval, and price ("Switch to Startup Plan monthly · $500/mo").
- Credit prices (static on the page): voice simulation 5 credits per minute, text simulation 0.5 credit per reply, conversation analysis from 0.1 credits per call, transcript-based observability 0.02 credits. 1 credit = $0.05 US dollars (USD).
- From the public API docs: a one-time top-up is $10 to $10,000 and needs the "Admin" role. Auto-refill has a minimum threshold of $1 and a minimum refill of $10. Plan credits are used before additional credits. Additional credits do not expire.
- The `/enums/` call lists `TransactionTypeChoices` for the "Type" column (inferred): "Main Transaction" `main`, "Metric" `metric`, "Metric Triage" `triage`, "Transcript Generation" `transcript_generation`, "Expected Outcome" `expected_outcome`, "Undefined" `undefined`, "Refund" `refund`, "Redaction" `redaction`, "Reserved" `reserved`, "Released" `released`, "Deep Research Generation" `deep_research_generation`, "Insight Generation" `insight_generation`.
- The `/enums/` call also lists `PaymentTypeChoices` ("Auto Pay", "One-Time Payment", "Self-Serve Credits", "Self-Serve Member Seat", "Subscription", "Subscription Member Seat") and `PackIntervalChoices` ("Monthly" `month`, "Quarterly" `quarter`, "Yearly" `year`).

**States:**

- Empty usage table: "No usage history available".
- Pagination buttons disabled when `next` and `previous` are null.
- Auto-refill off: the yellow warning box.

#### Not seen in the capture

- The source call of the balance "204.84". No captured call on this page returns it. It probably comes from `GET /test_framework/billing/info/` at app start (inferred).
- The tabs "Usage by Metric", "Billing History", and "Usage Report".
- The date-range picker, the "Daily" options, and a chart with data.
- The "Manage Billing" portal, the plan switch flow, the auto-refill inputs, and the credit breakdown popover.
- A usage table row. The account had no usage in the range.

### 7.7 Organization: Telephony

**Route:** `/settings/org/telephony`

**How the user reaches it:** settings sidebar, "ORGANIZATION" → "Telephony".

**Purpose:** the page holds the Bring Your Own Telephony (BYOT) policy and the inventory of imported carrier phone numbers.

**Layout:**

1. Breadcrumb: "Settings" (link to `/settings`) › "Telephony" (current).
2. Header card: "Bring your own Telephony", "Control the global policy for external carrier numbers and manage the organization's telephony inventory.", "Save Changes" (disabled).
3. "Global BYOT Activation" card with 1 switch.
4. "BYOT Inventory and Import" card with the "Import New External Number" form.
5. "Inventory" card with a table.

**Controls:**

| Label | Control type | Options or values | Default | Validation and errors | Behavior |
|---|---|---|---|---|---|
| "Restrict Number Selection to Personal Imports" | Switch | On / Off | Off | - | Help: "If ON, users will ONLY see phone numbers they personally imported for inbound/outbound setup." Probably field `limit_to_exclusive_numbers` (value false) (inferred). Saved with "Save Changes". |
| "Provider" | Select | "Twilio" seen. The `/enums/` call lists `PhoneNumberProviderChoices`: "Built-in", "Twilio", "Telnyx", "Plivo" (inferred as the options). | "Twilio" | - | The credential fields below depend on the provider (inferred). |
| "Phone Number" | Country picker + text box | Country button "US" (flag), prefix "+1", placeholder "12345678" | US, +1 | Not seen | |
| "Twilio Account SID" | Text box, placeholder "Enter your Twilio Account SID" | Free text | Empty | Not seen | The Twilio Account Security Identifier (SID). |
| "Twilio Auth Token" | Password box with eye toggle, placeholder "Enter your Twilio Auth Token" | Free text | Empty, hidden | Not seen | The eye button shows or hides the token. |
| "Name" | Text box, placeholder "Enter a name for this number" | Free text | Empty | Not seen | |
| "Enable SMS Messaging" | Switch | On / Off | Off | - | Help: "Enable SMS messaging for this phone number". Short Message Service (SMS) support for the number. |
| "Import Number" | Button | - | Disabled | Stays disabled until the required fields have values (inferred). | Imports the number. Help text above the form: "This links the number to your user ID for ownership tracking." |
| "Inventory" | Table | Columns "ID", "Phone Number", "Name", "Provider", "Actions" | Empty | - | Empty text: "No phone numbers imported yet". |

**Backend calls:**

- `GET /user/organizations/7868/` → 200 (same body as 7.3).
- `GET /test_framework/v1/phone-numbers/providers/list?organization_id=7868` → 200, body `[]`. This path has no trailing slash.

#### Not seen in the capture

- The import call and its validation errors. The capture used no real carrier account.
- The credential fields for "Telnyx", "Plivo", and "Built-in".
- A table row and the row actions.

### 7.8 Organization: Agent Config

> **Out of scope.** The app does not build the Assistant. This section describes it only as a record.

**Route:** `/settings/org/agent-config`

**How the user reaches it:** settings sidebar, "ORGANIZATION" → "Agent Config".

**Purpose:** the page registers remote Model Context Protocol (MCP) servers and custom skills for the Assistant chat. This section describes the page only. The Assistant section of this spec covers the chat.

**Layout:**

1. Header card: "Agent Config". Text: "Remote HTTP or SSE servers the agent can call. Each active server's tools become available in chat; credentials are stored write-only." "Add MCP Server" button (black, "+") at the right.
2. 2 tab-style buttons in the header card: "MCP Servers" (selected, with a server icon) and "Custom Skills" (sparkle icon).
3. Content card. Empty state: server icon, "No MCP servers connected", text "Register a remote MCP server and the agent gains its tools — connect your own services over HTTP or SSE.", and an outline "Add MCP Server" button.

**Controls:**

| Label | Control type | Behavior |
|---|---|---|
| "Add MCP Server" (header) | Button | Opens the form that adds a Model Context Protocol (MCP) server (inferred). Not clicked. |
| "MCP Servers" | Tab button | Shows the Model Context Protocol (MCP) server list. Selected by default. |
| "Custom Skills" | Tab button | Shows the custom skill list. Not clicked. |
| "Add MCP Server" (empty state) | Button | Same as the header button (inferred). |

**Backend calls:** `GET /app/v2/product-chat/org-mcp-servers/` → 200, body `[]`. The call has no organization parameter. The backend takes the organization from the session (inferred).

**Business rules:**

- A server uses HTTP or Server-Sent Events (SSE) transport.
- The tools of each active server become available in the Assistant chat.
- The backend stores server credentials write-only. The page never shows them again.
- From the public API docs: custom skills belong to the organization, and every member sees the active list. A skill source is 1 file, a GitHub repository URL, or an uploaded `.zip` or `.tar.gz` archive. The actions on a skill are enable, disable, delete, and re-sync from GitHub.

#### Not seen in the capture

- The "Add MCP Server" form and its fields.
- The "Custom Skills" tab, its list call, and its upload form.

### 7.9 Organization: Integrations

**Route:** `/settings/org/integrations`

**How the user reaches it:** settings sidebar, "ORGANIZATION" → "Integrations".

**Purpose:** the page connects code hosts. Then agents can read repositories and open pull requests with code fixes. The connections apply to every project of the organization.

**Layout:**

1. Heading "Integrations". Text: "Connect organization-wide tools your agents and workspace can use. These apply across every project in your organization."
2. "GitHub" card.
3. "Bitbucket" card with a grey info box at the bottom.

**Controls:**

| Label | Control type | Options or values | Default | Behavior |
|---|---|---|---|---|
| "GitHub" status | Badge | "Not connected" | "Not connected" | From `connected` in the GitHub call. |
| GitHub text | Text | "Let agents check out your repositories and open pull requests with code fixes. Connect through GitHub's native App install — no tokens to paste or store." | - | - |
| "Connect GitHub" | Button (black, external-link icon) | - | Enabled | Opens the GitHub App install page (inferred). Not clicked. |
| "Bitbucket" status | Badge | "Not connected" | "Not connected" | From `connected` in the Bitbucket call. |
| Bitbucket text | Text | "Let agents check out the repositories you choose and open pull requests with code fixes. Connect by signing in with Bitbucket. There are no app passwords or tokens to paste." | - | - |
| "Connect Bitbucket" | Button (black, external-link icon) | - | Enabled | Opens the Bitbucket sign-in page (inferred). Not clicked. |
| Bitbucket note | Info box | "The app acts as the Bitbucket account you sign in with, and pull requests it opens show that account as the author. Consider signing in with a dedicated service account." | - | Static. |

**Backend calls:**

- `GET /github/connection/` → 200, body `{"connected": false}`.
- `GET /bitbucket/connection/` → 200, body `{"connected": false}`.

#### Not seen in the capture

- The connect flows, the connected state, the repository picker, and a disconnect action.

### 7.10 Project: General

**Route:** `/settings/project/general`

**How the user reaches it:** settings sidebar, "PROJECT" → "General".

**Purpose:** the page edits the project name, the time zone, the call and run limits, the evaluation options, Deep Research, and the metric optimiser schedules.

**Layout:**

1. Header card: "General Settings", "Configure general project settings", "Save Changes" (disabled).
2. Main card with 4 groups, each with a small grey caps heading: "PROJECT", "CALL & RUN LIMITS", "EVALUATION", "INSIGHTS". The groups use 2 columns for text and number boxes.
3. "Auto-optimise Metrics" card with an "Add schedule" button and a schedule list.

**Controls:**

| Group | Label | Control type | Options or values | Default (observed) | Validation and errors | Behavior and backend field |
|---|---|---|---|---|---|---|
| "PROJECT" | "Project Name" | Text box | Free text | "Automaton Project" | Not seen | `name` |
| "PROJECT" | "Timezone" | Select | 84 time zone names from `TimezoneChoices` in `/enums/`, for example "US/Pacific", "Europe/London", "UTC" | "US/Pacific" | - | `timezone`. Help: "Send reports in the selected timezone at 5:00 PM". |
| "CALL & RUN LIMITS" | "Outbound Dial Window" | Number box | Seconds | "300" | Not seen | `outbound_timeout`. Help: "How long the app waits for your agent to dial the provisioned outbound number after a run is triggered (seconds)." |
| "CALL & RUN LIMITS" | "Max Call Duration" | Number box | Seconds | "600" | Not seen | `max_call_duration`. Help: "Sets the maximum duration of a call in seconds". |
| "CALL & RUN LIMITS" | "Min Call Duration" | Number box | Seconds | "10" | Not seen | `min_call_duration`. Help: "If call duration (in seconds) is below this minimum duration, metrics won't be computed". |
| "CALL & RUN LIMITS" | "Max Messages Chat Runs Limit" | Number box | Integer | "300" | Not seen | `max_messages_chat_runs_limit`. Help: "Sets the maximum number of messages in a chat run". |
| "EVALUATION" | "Metric Sampling Rate (%)" | Number box | 0 to 100, decimals allowed | "100" | Range 0-100 (from the help text) | `sample_rate`. The page shows `sample_rate` × 100. The API stores 1.0 for 100% (inferred from the values). Help: "Percentage of calls to evaluate (0-100). For example, 50 means 50% of calls, 0.1 means 0.1% of calls". |
| "EVALUATION" | "End call for evaluators" | Switch | On / Off | On | - | `end_call_enabled`. Help: "Enable or disable the end call for evaluators". |
| "EVALUATION" | End-call warning | Yellow box | "Warning: This setting will apply to all evaluators . To override for a specific evaluator, go to Evaluator → Edit → Configuration → End Call Tools." | Shown | - | Static. The path text is bold. |
| "EVALUATION" | "Use Provider Transcript" | Switch | On / Off | Off | - | `use_provider_transcript`. Help: "Use the transcript provided by the voice provider instead of generating one". |
| "EVALUATION" | "Reconcile Provider Transcripts" | Switch | On / Off | Off | - | `reconcile_transcripts`. Help: "For observability calls that arrive with both a recording and a provider transcript, the app transcribes the recording and, for dual-channel audio, publishes its own transcript before metrics run. Mono audio keeps the provider transcript. Billed at 0.5 credits per minute of audio when a app transcript is published." |
| "INSIGHTS" | "Deep Research" | Switch | On / Off | Off | - | `deep_research_enabled`. Help: "Audit recent calls for failure modes beyond your metrics. Adds a Deep Research section on Insights with a weekly report and on-demand runs." |
| "Auto-optimise Metrics" | "Add schedule" | Button (black, "+") | - | Enabled | - | Opens a schedule form (inferred). Not clicked. Card text: "Schedule the Metric Lab optimiser to run on a recurring cron. Newly-annotated test sets feed back into your metric prompts automatically." |
| "Auto-optimise Metrics" | Schedule list | List | - | Empty | - | Empty text: "No schedules yet. Click Add schedule to create one." ("Add schedule" is bold.) |

**Flows:**

1. Open the page. The app sends `GET /enums/`, `GET /user/v1/projects/13875/`, and `GET /schedules/v1/metric-optimiser-cron-jobs/?project_id=13875`.
2. Change a field. "Save Changes" becomes enabled (inferred).
3. Click "Save Changes". The app sends `PATCH /user/v1/projects/13875/` with the changed fields (from the public API docs). Not captured.
4. Click "Add schedule". The app opens a form and creates a metric optimiser cron job (inferred). Not captured.

**Backend calls:**

`GET /enums/` → 200. One object with all enums of the product. This page uses `TimezoneChoices`. Example: `{"TimezoneChoices": {"US/Pacific": "US/Pacific", "UTC": "UTC", "...": "..."}, "...": "..."}`.

`GET /user/v1/projects/{id}/` → 200. The full body is in the field table below. The pages "General", "Notifications", "Provider API Keys", and "Webhook" all call it.

`GET /schedules/v1/metric-optimiser-cron-jobs/?project_id=13875` → 200, body `[]`.

`PATCH /user/v1/projects/{id}/` (from the public API docs). Example body: `{"name": "Automaton Project", "timezone": "US/Pacific", "sample_rate": 0.5}`. Response 200 with the full project.

**Business rules:**

- Daily reports go out at 5:00 PM in the project time zone.
- Calls shorter than "Min Call Duration" get no metric results.
- "End call for evaluators" applies to all evaluators. An evaluator can override it in its own configuration.
- Reconciliation costs 0.5 credits per minute of audio. It applies only to dual-channel audio. Mono audio keeps the provider transcript.
- From the public API docs: the global Deep Research kill switch can still disable the feature when the project switch is on. A metric with a pending optimiser proposal carries `pending_optimisation_proposal` with `cron_job_id` and `cron_job_name`.

#### Project record: every field with its observed value

Source: `GET /user/v1/projects/13875/` in the crawl steps `38-agents-import-from-provider` and `122-settings-07-project-general`. The two bodies are equal, except 2 points. The earlier capture (38) has no `skip_call_log_webhook_no_content` field. The `organization.updated_at` values differ.

| Field | Observed value | Settings page and control |
|---|---|---|
| `id` | 13875 | - |
| `name` | "Automaton Project" | General: "Project Name" |
| `members` | [] | Members page (project access) |
| `organization` | `{id: 7868, name: "example-org", members: [1 item], created_at, updated_at}` | - |
| `outbound_timeout` | 300 | General: "Outbound Dial Window" |
| `max_call_duration` | 600 | General: "Max Call Duration" |
| `min_call_duration` | 10 | General: "Min Call Duration" |
| `sample_rate` | 1.0 | General: "Metric Sampling Rate (%)" shows 100 |
| `max_messages_chat_runs_limit` | 300 | General: "Max Messages Chat Runs Limit" |
| `webhook_url` | "" | Webhook: "Webhook URL" |
| `webhook_secret_configured` | false | Webhook: "Webhook Secret" (the secret is write-only) |
| `evaluate_relevant_metrics_enabled` | true | Not on a settings page |
| `end_call_enabled` | true | General: "End call for evaluators" |
| `generate_scenario_auto_assign_numbers_enabled` | false | Not on a settings page |
| `enable_client_side_testing` | true | Not on a settings page |
| `use_provider_transcript` | false | General: "Use Provider Transcript" |
| `reconcile_transcripts` | false | General: "Reconcile Provider Transcripts" |
| `should_show_powered_by` | true | Not on a settings page |
| `deep_research_enabled` | false | General: "Deep Research" |
| `notify_results_completion` | false | Notifications: "Results Completion" |
| `notify_daily_report` | true | Notifications: "Daily Report" |
| `notify_daily_report_no_calls` | false | Notifications: "Daily Report (No Calls)" |
| `daily_report_ai_summary_enabled` | false | Notifications: "AI Summary in Daily Report" |
| `notify_cron_failure` | true | Notifications: "Monitor Failures" (inferred) |
| `notify_cron_success` | false | Notifications: "Monitor Success" (inferred) |
| `notify_no_calls` | false | Notifications: "No Calls Alert" |
| `no_calls_notify_time_period` | {} | Notifications: "No Calls Alert" settings (not seen) |
| `notify_daily_report_webhook` | false | Webhook: "Daily Report Notifications" |
| `notify_pre_run_webhook` | false | Webhook: "Pre-run Webhook" |
| `daily_report_dashboard_ids` | [] | Notifications: "Dashboard Snapshots in Report" |
| `notify_result_webhook_failed` | false | Webhook: Result "Failed Notifications" |
| `notify_result_webhook_success` | false | Webhook: Result "Success Notifications" |
| `notify_result_webhook_error` | false | Webhook: Result "Error Notifications" |
| `notify_cronjob_webhook_failed` | false | Webhook: Monitor "Failed Notifications" |
| `notify_cronjob_webhook_success` | false | Webhook: Monitor "Success Notifications" |
| `notify_cronjob_webhook_error` | false | Webhook: Monitor "Error Notifications" |
| `notify_call_log_webhook_failed` | false | Webhook: Call Log "Failed Notifications" |
| `notify_call_log_webhook_success` | false | Webhook: Call Log "Success Notifications" |
| `call_log_webhook_redact_fields` | [] | Webhook: "Redact Sensitive Data" |
| `skip_call_log_webhook_no_content` | false | Webhook: "Skip Calls Without Content" |
| `notify_frequent_calls_for_number` | false | Notifications: "Frequent Calls for Number" |
| `frequent_calls_threshold` | 5 | Notifications: "Frequent Calls for Number" settings (not seen) |
| `frequent_calls_time_period` | 900 | Same (seconds, inferred) |
| `frequent_calls_cooldown` | 1200 | Same (seconds, inferred) |
| `forward_vapi_webhook` | true | Webhook: "Forward VAPI Webhooks" |
| `forward_retell_webhook` | true | Webhook: "Forward Retell Webhooks" |
| `is_send_emails_enabled` | false | Notifications: "Enable Notifications" (email card) (inferred) |
| `rubric_config` | `{"rules": [12 rules], "evaluation_logic": "and"}`. Example rule: `{"metric_id": 240900, "conditions": {"operator": "and", "conditions": [{"op": "eq", "field": "score", "value": 5}]}}` | Rubric page (Metrics section of this spec) |
| `timezone` | "US/Pacific" | General: "Timezone" |
| `vapi_api_key_configured` | false | Provider API Keys: "VAPI Private API Key" |
| `vapi_public_key_configured` | false | No control on the settings pages |
| `retell_api_key_configured` | false | Provider API Keys: "Retell API Key" |
| `syntflow_api_key_configured` | false | Provider API Keys: "Syntflow API Key" |
| `elevenlabs_api_key_configured` | false | Provider API Keys: "ElevenLabs API Key" |
| `bland_api_key_configured` | false | Provider API Keys: "Bland API Key" |
| `livekit_api_key_configured` | false | Provider API Keys: "LiveKit API Key" |
| `pipecat_api_key_configured` | false | Provider API Keys: "Pipecat API Key" |
| `is_deleted` | false | - |
| `created_at` | "2026-09-03T13:30:06.431103Z" | - |
| `updated_at` | "2026-09-03T13:30:06.431109Z" | - |

Write-only project fields (from the public API docs): `webhook_secret`, `vapi_api_key`, `retell_api_key`, `syntflow_api_key`, `elevenlabs_api_key`, `bland_api_key`, `livekit_api_key`, `pipecat_api_key`, `organization_id`. The API never returns them. It returns the matching `*_configured` boolean.

Rubric rule (from the public API docs): `evaluation_logic` must be `"and"`. A score rule uses `field` `"score"` with `gt`, `gte`, `lt`, `lte`, or `eq`. A binary rule uses `"score"` with `eq` or `neq` and `true` or `false`. An enum rule uses `"enum"` with `eq`, `neq`, or `in`. The docs warn: read the project first, merge the rules, then send the full `rubric_config`. A partial value deletes the missing rules.

#### Not seen in the capture

- The save call, the success toast, and the validation messages (for example a sampling rate above 100).
- The "Add schedule" form, the cron job fields, and a schedule row.
- The "Timezone" select in the open state.

### 7.11 Project: Notifications (Integrations)

**Route:** `/settings/project/integrations`. The sidebar label is "Notifications".

**How the user reaches it:** settings sidebar, "PROJECT" → "Notifications".

**Purpose:** the page connects chat tools (Slack, Discord, Microsoft Teams) and email to the project. It also holds the notification switches for simulations and observability.

**Layout:**

1. Header card: "Notifications", "Connect your tools and configure notification preferences", "Save Changes" (disabled).
2. Grid of 4 integration cards (3 per row): "Slack", "Discord", "Microsoft Teams", "Email Notifications".
3. Yellow warning strip: "Please enable relevant integration to receive these notifications."
4. "Simulation Alerts" card with 3 switches.
5. "Observability Alerts" card with switches and a dashboard picker.
6. Blue info strip with the "Authorize Now" link.

**Integration cards:**

| Card | Text | Button | Target |
|---|---|---|---|
| "Slack" (logo) | "Connect Slack workspaces to receive notifications and updates" | "Configure Slack Integration" (black, external-link icon) | Link to `/settings/project/integrations/slack` |
| "Discord" (logo) | "Connect your Discord server to receive notifications and collaborate with your team" | "Configure Discord Integration" | Link to `/settings/project/integrations/discord` |
| "Microsoft Teams" (logo) | "Send alerts and the daily report to Microsoft Teams channels" | "Configure Teams Integration" | Link to `/settings/project/integrations/teams` |
| "Email Notifications" (envelope icon) | "Manage your email notification preferences for your organization" | "Enable Notifications" (black, sliders icon) | Enables email delivery, probably `is_send_emails_enabled` (inferred). Not clicked. |

**Notification switches:**

All switches below were disabled in the capture, because no integration was active. The warning strip explains this.

| Group | Label | Help text (verbatim) | Default (observed) | Backend field |
|---|---|---|---|---|
| "Simulation Alerts" | "Monitor Failures" | "Get notified when a monitor run fails" | On | `notify_cron_failure` (inferred) |
| "Simulation Alerts" | "Monitor Success" | "Get notified when a monitor run completes successfully" | Off | `notify_cron_success` (inferred) |
| "Simulation Alerts" | "Results Completion" | "Get notified when evaluation results are completed" | Off | `notify_results_completion` |
| "Observability Alerts" | "Daily Report" | "Receive daily summary reports of system activity" | On | `notify_daily_report` |
| "Observability Alerts" | "Dashboard Snapshots in Report" (nested under "Daily Report") | "Selected dashboards (max 5) will be included as visual snapshots in the daily report PDF" | "Select dashboards" (disabled multi-select) | `daily_report_dashboard_ids` |
| "Observability Alerts" | "Daily Report (No Calls)" | "Receive a daily report when no calls were received" | Off | `notify_daily_report_no_calls` |
| "Observability Alerts" | "AI Summary in Daily Report" | "Extend the daily data report in slack and email with AI Insights." | Off | `daily_report_ai_summary_enabled` |
| "Observability Alerts" | "No Calls Alert" | "Get notified when there are no calls received during specified time periods" | Off | `notify_no_calls` with `no_calls_notify_time_period` |
| "Observability Alerts" | "Frequent Calls for Number" | "Get notified when a specific number receives frequent calls" | Off | `notify_frequent_calls_for_number` with `frequent_calls_threshold`, `frequent_calls_time_period`, `frequent_calls_cooldown` |

Other controls:

| Label | Control type | Behavior |
|---|---|---|
| "View Report" | Button (outline, document icon), next to "Daily Report" | Opens a preview of the daily report (inferred). Not clicked. |
| "Select dashboards" | Multi-select | Options come from `GET /dashboards/dashboards/?project_id=13875&source=call_logs`. The one option was "Overview" (inferred). Maximum 5. |
| "Authorize Now" | Link button (external-link icon) | Opens the Slack Open Authorization (OAuth) page `https://slack.com/oauth/v2/authorize?client_id=<slack-client-id>&scope=channels:read,chat:write,files:write,groups:read&user_scope=`. Text before it: "To receive plot diagrams, please reauthorize the workspace in the integrations settings." |

**Backend calls:**

| Call | Status | Response (trimmed) |
|---|---|---|
| `GET /dashboards/dashboards/?project_id=13875&source=call_logs` (sent 2 times) | 200 | `{"count": 1, "next": null, "previous": null, "results": [{"id": 13682, "name": "Overview", "source": "call_logs", "widget_count": 8, "...": "..."}]}` |
| `GET /slack/slack-workspaces/?project_id=13875` | 200 | `[]` |
| `GET /discord/servers/?project_id=13875` | 200 | `[]` |
| `GET /user/v1/projects/13875/` | 200 | Project body (7.10) |

The save call is `PATCH /user/v1/projects/13875/` with the changed `notify_*` fields (from the public API docs). Not captured.

**Business rules:**

- The switches stay disabled until the project has at least 1 active integration (Slack, Discord, Teams, or email) (inferred from the warning strip and the disabled state).
- The daily report holds at most 5 dashboard snapshots, as images in a PDF.
- From the public API docs: `no_calls_notify_time_period` holds `time_zone`, `time_periods` (each with `start_time`, `end_time`, `time_frame` in minutes), `exception_numbers`, and `agents` to exclude. The AI summary replaces the data dump with an Artificial Intelligence (AI) "Top Issues" section in Slack and email.
- The Slack re-authorization asks for the `files:write` scope, so that the bot can post plot images (inferred).

#### Not seen in the capture

- The sub-pages `/settings/project/integrations/slack`, `/discord`, and `/teams`.
- The enabled state of the switches, and the forms for "No Calls Alert" and "Frequent Calls for Number".
- The "View Report" preview and the "Enable Notifications" flow.

### 7.12 Project: Provider API Keys

**Route:** `/settings/project/provider-api-keys`

**How the user reaches it:** settings sidebar, "PROJECT" → "Provider API Keys".

**Purpose:** the page stores the API keys of the voice providers for the project. The app uses them to import agents, fetch call data, and run tests (from the public API docs).

**Layout:**

1. Header card: "API Settings", "Configure API keys for your project", "Save Changes" (black, enabled).
2. "Provider API Keys" card with 7 rows. Each row has a label, a password box, and an eye button at the right.

**Controls:**

| Label (verbatim) | Control type | Default | Write field (from the public API docs) | Read flag (observed value) |
|---|---|---|---|---|
| "VAPI Private API Key" | Password box + eye toggle | Empty | `vapi_api_key` | `vapi_api_key_configured` false |
| "Retell API Key" | Password box + eye toggle | Empty | `retell_api_key` | `retell_api_key_configured` false |
| "Syntflow API Key" | Password box + eye toggle | Empty | `syntflow_api_key` | `syntflow_api_key_configured` false |
| "ElevenLabs API Key" | Password box + eye toggle | Empty | `elevenlabs_api_key` | `elevenlabs_api_key_configured` false |
| "Bland API Key" | Password box + eye toggle | Empty | `bland_api_key` | `bland_api_key_configured` false |
| "LiveKit API Key" | Password box + eye toggle | Empty | `livekit_api_key` | `livekit_api_key_configured` false |
| "Pipecat API Key" | Password box + eye toggle | Empty | `pipecat_api_key` | `pipecat_api_key_configured` false |
| "Save Changes" | Button | Enabled | - | - |

**Backend calls:** `GET /user/v1/projects/13875/` → 200 (body in 7.10). The save call is `PATCH /user/v1/projects/13875/` with only the keys that the user typed, for example `{"retell_api_key": "<secret>"}` (from the public API docs, inferred that blank boxes are not sent).

**Business rules:**

- The keys are write-only. The page cannot show a saved key. It can only know that a key exists from the `*_configured` flag. How the page shows a configured key (for example a mask) is not seen.
- The UI and the API spell Synthflow as "Syntflow". Keep the field name `syntflow_api_key` for API compatibility.
- From the public API docs: the Vapi key serves all Vapi operations (calls, chat, testing). The Pipecat key is a Pipecat or Daily.co key.
- The agent import from a provider needs these keys. In the crawl step `38-agents-import-from-provider`, `GET /test_framework/v2/aiagents/provider-assistants/?project_id=13875&provider=vapi` returned 400 while the project had no Vapi key (the Agents section of this spec covers this call).

#### Not seen in the capture

- The save call, the success toast, and the display of a configured key.
- A key validation error.

### 7.13 Project: Webhook

**Route:** `/settings/project/webhook`

**How the user reaches it:** settings sidebar, "PROJECT" → "Webhook".

**Purpose:** the page sets 1 webhook endpoint for the project and selects which events the app sends to it. It also controls the forwarding of Vapi and Retell webhooks.

**Layout:**

1. Header card: "Webhook Settings", "Configure webhook endpoints for your project. Learn more" (link to `https://docs.example.com/documentation/advanced/webhook-format`), "Save Changes" (disabled).
2. Main card: "Webhook URL", "Webhook Secret", a divider, then "Webhook Notifications" with 6 sub-groups.
3. Each event row has a label, a help line, a switch, and (on most rows) a "Test" button with a spinner-style icon at the right.

**Controls:**

| Group | Label | Control type | Help text (verbatim) | Default (observed) | Backend field |
|---|---|---|---|---|---|
| - | "Webhook URL" | Text box | "The URL where webhook notifications will be sent" | Empty | `webhook_url` ("") |
| - | "Webhook Secret" | Password box + eye toggle | "Secret key for webhook authentication. Sent in the X-WEBHOOK-SECRET header." | Empty | `webhook_secret` (write-only), `webhook_secret_configured` false |
| "Result Notifications" | "Success Notifications" | Switch + "Test" | "Send webhook notifications upon successful result (for simulations) completion" | Off | `notify_result_webhook_success` |
| "Result Notifications" | "Failed Notifications" | Switch + "Test" | "Send webhook notifications upon failed result (for simulations) completion" | Off | `notify_result_webhook_failed` |
| "Result Notifications" | "Error Notifications" | Switch + "Test" | "Send webhook notifications when all runs in a result have errors (e.g. call setup failures)" | Off | `notify_result_webhook_error` |
| "Pre-run Notifications" | "Pre-run Webhook" | Switch + "Test" | "Send a webhook at the start of a run, before any calls dispatch, to configure your external test sandbox (seed data, feature flags). The run waits for your endpoint to respond." | Off | `notify_pre_run_webhook` |
| "Monitor Notifications" | "Success Notifications" | Switch + "Test" | "Send webhook notifications when a monitor run completes successfully" | Off | `notify_cronjob_webhook_success` |
| "Monitor Notifications" | "Failed Notifications" | Switch + "Test" | "Send webhook notifications when a monitor run fails" | Off | `notify_cronjob_webhook_failed` |
| "Monitor Notifications" | "Error Notifications" | Switch + "Test" | "Send webhook notifications when all runs in a monitor result have errors (e.g. call setup failures)" | Off | `notify_cronjob_webhook_error` |
| "Call Log Evaluation Notifications" | "Success Notifications" | Switch + "Test" | "Send webhook notifications when a call log evaluation completes successfully" | Off | `notify_call_log_webhook_success` |
| "Call Log Evaluation Notifications" | "Failed Notifications" | Switch + "Test" | "Send webhook notifications when a call log evaluation fails" | Off | `notify_call_log_webhook_failed` |
| "Call Log Evaluation Notifications" | "Skip Calls Without Content" | Switch (no "Test") | "Don't send webhook notifications for calls with no conversation, such as busy or unanswered calls" | Off | `skip_call_log_webhook_no_content` |
| "Call Log Evaluation Notifications" | "Redact Sensitive Data" | Switch (no "Test") | "Strip selected details from call log webhook payloads, including metadata and dynamic variables. Stored call logs are not changed." | Off | `call_log_webhook_redact_fields` ([]) |
| "Project Notifications" | "Daily Report Notifications" | Switch + "Test" | "Send webhook notifications for project daily reports" | Off | `notify_daily_report_webhook` |
| "Webhook Forwarding" | "Forward VAPI Webhooks" | Switch | "Forward webhook notifications from VAPI to your webhook URL" | On | `forward_vapi_webhook` |
| "Webhook Forwarding" | "Forward Retell Webhooks" | Switch | "Forward webhook notifications from Retell to your webhook URL" | On | `forward_retell_webhook` |

Field mapping note: the backend uses `result` for simulation results, `cronjob` for monitors, and `call_log` for observed calls. The mapping of each switch to its field is inferred from the label order and the field names. All values were false, so the values do not prove the mapping.

**"Test" buttons:** all 9 "Test" buttons were disabled in the capture. The webhook URL was empty, so the test needs a URL (inferred). The `/enums/` call lists `WebhookMockEventChoices`, which match the test buttons (inferred): `result.pre_trigger`, `result.success`, `result.failure`, `result.error`, `cronjob.success`, `cronjob.failure`, `cronjob.error`, `call_log.success`, `call_log.failure`, `call_log_reevaluated.success`, `call_log_reevaluated.failure`, `daily.report`.

**"Redact Sensitive Data":** when on, the page probably shows a picker of the fields to remove (inferred from "Strip selected details" and the array type of `call_log_webhook_redact_fields`). The public API docs list these redaction values for agents and call logs: `person_name`, `age`, `phone_number`, `email_address`, `date`, `time`, `location`, `origin`, `gender_sexuality`, `physical_attribute`, `occupation`, `username`, `password`, `ip_address`, `url`, `filename`, `event`, `vehicle_id`, `dob`, `healthcare_number`, `medical_professional`, `credit_card`, `account_number`, `bank_account`, `money`, `ssn`, `passport_number`, `driver_license`, `numerical_pii`. Whether the webhook picker uses the same list is not seen. The webhook list mentions metadata and dynamic variables, so it may differ.

**Backend calls:** `GET /user/v1/projects/13875/` → 200 (body in 7.10). The save call is `PATCH /user/v1/projects/13875/` with `webhook_url`, `webhook_secret`, and the changed flags (from the public API docs). Not captured. The test call is not captured.

#### Webhook payload formats (from the public API docs)

Common rules:

- Every request has the header `X-WEBHOOK-SECRET` with the configured secret. The docs name no signature algorithm.
- The `/enums/` call lists `WebhookEventChoices`: "Result Completed" `result.completed`, "Result Pre Trigger" `result.pre_trigger`, "Call Log Completed" `call_log.completed`, "Call Log Reevaluated" `call_log.reevaluated`, "Vapi Webhook" `vapi.webhook`, "Retell Webhook" `retell.webhook`, "Elevenlabs Webhook" `elevenlabs.webhook`, "Daily Report" `daily.report`.
- Monitor (cron job) results use `result.completed` with `is_cronjob: true`.
- A binary metric in a payload has `eval_type: "binary"` and `passed`. Other metrics have `type` (`continuous_qualitative`, `numeric`, `enum`) and `score`.
- No replay and no delivery log.

Pre-run, `result.pre_trigger`:

- The app sends it once at the start of a run, before any call. The run waits for the response. Timeout 30 seconds. Up to 3 retries.
- Header `X-IDEMPOTENCY-KEY: result_pre_trigger:<result_id>`.

```json
{"event_type": "result.pre_trigger",
 "data": {"result_id": 101, "label": "zz-spec-test-run", "agent_id": "1",
          "timestamp": "2025-07-31T11:13:42Z",
          "runs": {"5001": {"id": 5001, "scenario": {"id": 1, "name": "..."},
                            "test_profile": {"id": 2, "name": "...", "information": {"main_agent_variables": {"allow_cancellation": true}}},
                            "personality": {"id": 3, "name": "..."},
                            "phone_number": "+1...", "outbound_phone_number": null}}}}
```

Result completed, `result.completed` (simulations and monitors):

```json
{"event_type": "result.completed",
 "data": {"id": 101, "name": "...", "agent": 1, "status": "completed",
          "met_expected_outcome_count": 1, "total_expected_outcome_count": 1, "success_rate": 100,
          "run_as_text": false, "is_cronjob": false, "created_at": "...",
          "runs": {"5001": {"id": 5001,
                            "scenario": {"id": 1, "name": "...", "personality_name": "...", "expected_outcome_prompt": "..."},
                            "expected_outcome": {}, "success": true,
                            "evaluation": {"metrics": [{"id": 9, "name": "...", "eval_type": "binary", "passed": true,
                                                         "explanation": ["..."], "vocera_defined_metric_code": "..."}]},
                            "transcript_object": [{"role": "Testing Agent", "time": "00:02", "content": "...", "start_time": 0, "end_time": 2}],
                            "voice_recording": "https://...", "timestamp": "...", "executed_at": "...", "error_message": ""}}}}
```

Call log completed, `call_log.completed` (observability):

```json
{"event_type": "call_log.completed",
 "data": {"id": 77, "call_id": "...", "agent": 1, "agent_id": "1", "duration": "01:10",
          "voice_recording_url": "https://...", "status": "success", "success": true,
          "is_reviewed": false, "feedback": "", "critical_categories": [],
          "evaluation": {"metrics": ["..."]},
          "transcript": "[0:00] Testing Agent: ...\n[0:01] Main Agent: ...",
          "transcript_object": [{"role": "Main Agent", "time": "0:00", "content": "..."}],
          "call_ended_reason": "...", "dropoff_point": "...", "topic": "{}", "customer_number": "+1...",
          "user_generated_transcript": null, "metadata": {}, "dynamic_variables": {},
          "timestamp": "...", "created_at": "...", "updated_at": "..."}}
```

Forwarded provider payloads keep the shape and event name of the provider. Vapi: `{"message": {"type": "end-of-call-report", "call": {...}, "artifact": {...}, "costBreakdown": {...}, "...": "..."}}`. Retell: `{"event": "call_analyzed", "call": {...}, "data": {...}}`.

Documentation errors to know (from the public API docs): the "Cronjob Success" and "Cronjob Failed" examples appear swapped. The call log failure example shows `success: true`. The `time` format is `"0:00"` in call log payloads and `"00:02"` in result payloads.

#### Not seen in the capture

- The save call, the test call, and their toasts.
- The enabled state of the "Test" buttons.
- The redaction field picker.
- The payload of the daily report webhook and of the call log re-evaluation webhook. The public docs give no field list for them.

### 7.14 Project: Agent Knowledge

**Route:** `/settings/project/agent-knowledge`

**How the user reaches it:** settings sidebar, "PROJECT" → "Agent Knowledge".

**Purpose:** the page stores project rules that every improvement run must obey before it proposes a change. Each save creates a new version.

**Layout:**

1. Header card: "Agent knowledge". Text: "What every improvement run in this project must know before it proposes a change — wording you have to keep, an escalation path, a tone. Saved as a new version each time, so you can read back what changed." Buttons: "Version history" (outline, clock icon), "Save instructions" (disabled).
2. Editor card with tabs "Write" (selected) and "Preview", then a large monospace text area that the user can resize.

| Label | Control type | Default | Behavior |
|---|---|---|---|
| "Write" / "Preview" | Tabs | "Write" | "Preview" renders the text as Markdown (inferred). |
| Text area | Multi-line text, placeholder "One rule per line. For example:\n\n- Never remove or shorten the recording disclaimer.\n- Offer a human agent after two failed attempts.\n- Keep the greeting under fifteen words." | Empty | One rule per line. |
| "Save instructions" | Button | Disabled | Saves a new version. Enabled after an edit (inferred). |
| "Version history" | Button | Enabled | Shows earlier versions (inferred). Not clicked. |

**Backend calls:** `GET /app/v2/product-chat/project-knowledge/instructions/?project_id=13875` → 200, body `{"content": "", "exists": false}`. The save call and the version list call are not captured.

#### Not seen in the capture

- The save call, the "Preview" tab, and the "Version history" panel.

### 7.15 About: Third-Party Notices

Route `/settings/about/third-party-notices`, heading "Third-Party Notices", sub-title "Open source packages and their licenses used in this project": a static list of the open-source packages that the product uses, each with a copyright line and "License" and "Source" buttons. A rebuild lists its own packages here. No backend call. 

### 7.16 "Buy Credits" dialog

**Route:** no route change. The dialog opens over the current page. The capture opened it on `/agents?project=13875&page=1&pageSize=30`.

**How the user reaches it:** click "Buy Credits" in the main sidebar footer. The footer shows a "PayG" badge with a chevron, the balance "204.84 Credits", and the outline button "Buy Credits" (up-arrow icon).

**Purpose:** the dialog starts the credit purchase. With no payment method on file, it asks for a payment method first.

**Layout:** alert dialog with a card icon. Title: "Add a payment method to continue". Text: "Add a payment method before comparing your first credit purchase with switching plans. You won't be charged during setup." Buttons: "Cancel", "Add Payment Method" (black).

| Label | Control type | Behavior |
|---|---|---|
| "Cancel" | Button | Closes the dialog. |
| "Add Payment Method" | Button | Starts the payment method setup (inferred). Not clicked. |

**Backend calls:** none recorded when the dialog opened.

**Business rules:**

- The dialog has the same title and buttons as the "Invite Member" gate (7.5.1). Only the body text differs. Build 1 dialog component with a context-specific body text (inferred).
- After the payment method exists, the purchase screen compares a credit purchase with a plan switch (from the dialog text). The plan switch offer call (7.6) probably feeds it (inferred).
- From the public API docs: a one-time top-up is $10 to $10,000 and needs the "Admin" role.

#### Not seen in the capture

- The purchase screen, the amount input, the plan comparison, and the payment step.
- The behavior when a payment method exists.

## 8. Backend map (observed dashboard API)

This section lists every backend call that the dashboard made during the crawl. It gives the hosts, the shared conventions, the background job pattern, the endpoint catalog, the full enum list, and the matching public API operations.

Sources and method:

| Item | Value |
|---|---|
| Captured calls | 796 calls from the two crawls |
| Endpoints | 119 method and path pairs after normalization |
| Path normalization | Each numeric path segment and each Universally Unique Identifier (UUID) segment becomes `{id}`. The trailing slash stays as the dashboard sent it. |

Rules for the counts:

- The first pass of the first crawl recorded each main page once. A call counts once when the same method, URL, and status occur again in the same pass.
- A screen name such as `28-agent-created` is the name of one crawl step. `pages/01-agents` and `crawl1.json:01-agents` are steps of the first pass.
- The crawl stores each response body with a length limit. The limits seen are 2500, 4000, 6000, and 30000 characters. A body at the limit is not complete JSON. The examples below say so when they use a cut body.
- The examples are trimmed for this document. A list keeps 1 or 2 items. A long string ends with "...". A cut object ends with a `"..."` key that gives the number of removed keys.
- The account email is replaced with `<user-email>`, and other member emails with `<member-email>`. Tokens are replaced with `<redacted-jwt>`. The server masks API keys, and the first 6 characters of each key are masked too.

### 8.1 Hosts

| Host | Role | Evidence |
|---|---|---|
| `https://app.example.com` | The dashboard web application. The routes are in section 1. | Every `url:` line of the captures names this host. The crawl records record only backend calls. |
| `https://backend.example.com` | The dashboard API. | 792 of the 796 captured calls go to this host. |
| `https://assistant.example.com` | The response stream of the Assistant (the in-product assistant). | 4 captured calls: `GET /agent/v1/stream/{id}?token=<redacted-jwt>`. The URL comes from the `stream_url` field of the message create response. |
| `https://api.example.com` | The public API. | A client sends the API key in the `X-API-KEY` header (the public API reference, "Authentication" table: "`X-API-KEY: <key>`"). The public API reference also lists `Authorization: Bearer <token>` for Open Authorization (OAuth) tokens and for dashboard session tokens. |

Notes:

- The capture did not record request headers. This section does not describe how the dashboard authenticates.
- The public API reference ("Dashboard backend host") reports that `backend.example.com` and `api.example.com` return the same `401` body for the agent list. It concludes that the two hosts serve the same paths (inferred in the public API reference).
- The stream call carries a `token` query parameter. The value comes from the `stream_token` field of the message create response.

### 8.2 Conventions

#### 8.2.1 Pagination

The dashboard API returns lists in three shapes.

| Shape | Body | Endpoints seen |
|---|---|---|
| Counted page | `{"count", "next", "previous", "results"}` | `/dashboards/dashboards/`, `/dashboards/widgets/`, `/test_framework/v1/aiagents/{id}/history/`, `/test_framework/v1/configurations/`, `/test_framework/v1/metrics/{id}/history/`, `/test_framework/v1/scenarios/`, `/test_framework/v1/test-profiles/`, `/test_framework/v1/tools`, `/test_framework/v1/views/`, `/test_framework/v2/aiagents/`, `/test_framework/v2/scenarios/{id}/history/`, `/user/v2/organizations/` |
| Page without a count | `{"next", "previous", "results"}` | `/test_framework/v2/results/`, `/test_framework/v2/runs/`, `/observability/v2/call-logs/`, `/notifications/v1/notifications/`, `/test_framework/billing/usage-history/` |
| Plain list | a JSON array | for example `/test_framework/v2/aiagents/short_list/`, `/test_framework/v2/metrics/`, `/test_framework/v1/metrics/basic_list/`, `/test_framework/v1/scenarios/folders/`, `/user/v1/projects/{id}/personalities/`, `/observability/v1/alerts/`, `/schedules/v1/cron-jobs/`, `/app/v2/product-chat/conversations/` |

Rules:

- The page parameters are `page` and `page_size`. The capture shows `page=1` only. The `page_size` values seen are `1`, `14`, `30`, `40`, `50`, `51`, `100`, `200`, and `500`.
- The dashboard sends `page_size=1` to `/test_framework/v2/results/` and to `/observability/v2/call-logs/`. It probably checks if any record exists (inferred).
- Two product chat lists use `limit=50` and no page: `/app/v2/product-chat/conversations/` and `/app/v2/product-chat/reports/`.
- The plain-list endpoints return the full list in one response (inferred: the capture shows no page parameter on them).

#### 8.2.2 Field selection (`ql`)

Many `GET` calls carry a `ql` query parameter. It selects the fields of each returned record. The catalog in 8.5 lists every `ql` value verbatim.

| Form | Meaning | Example from the capture |
|---|---|---|
| `{a,b,c}` | Return only these fields. | `{id}` on `GET /user/organizations/{id}/` |
| `{a,b{c,d}}` | Return field `b` as an object with only fields `c` and `d`. Nesting can go deeper. | `{id,name,language,description,email_id,telephony{phone_number,sip_uri,inbound},provider{type,chat_provider,chat_agent_details{type,config},credentials{api_key_configured,config}}}` on `GET /test_framework/v2/aiagents/` |
| `{-a}` | Return all fields except `a`. | `{-knowledge_base_files}` on `GET /test_framework/v2/aiagents/{id}/` |
| `{-a,-b}` | Exclude several fields. | `{-transcript,-transcript_object,-evaluation}` on `GET /observability/v2/call-logs/` |
| `{*}` | Return the whole record shape. | Not seen in the capture. The public API reference ("Field selection") documents it. |

Counts in the capture: 192 calls use a flat field list, 58 calls use a nested list, and 27 calls use the exclusion form. The public API reference says that an unknown field name returns `400`. The capture does not show this case.

Filter parameters seen:

| Parameter | Endpoint | Value format seen |
|---|---|---|
| `filters_v2` | `GET /observability/v2/call-logs/` | `{"operator":"and","conditions":[{"field":"timestamp","op":"gte","value":"2026-09-23T19:07:24.457Z"}]}` |
| `filters` | `GET /test_framework/billing/usage-history/`, `GET /test_framework/billing/{id}/usage-chart/` | `{"operator":"and","conditions":[{"field":"created_at","op":"gte","value":"2026-10-16T00:00:00.000+02:00"},{"field":"created_at","op":"lte","value":"2026-10-23T23:59:59.999+02:00"}]}` |
| `from`, `to`, `period`, `chart_type` | `GET /test_framework/v1/aiagents/runs_overview_project/` | International Organization for Standardization (ISO) 8601 date-time with offset, `day`, `bar` |
| `date_from`, `date_to` | Insight endpoints under `/observability/v1/metric-failure-mode-insights/` | International Organization for Standardization (ISO) 8601 date-time in Coordinated Universal Time (UTC) |
| `hours` | `GET /observability/v1/alerts/review/`, `GET /observability/v1/alerts/trigger_summary/` | `24`, `48`, `168`, `336` |
| `folder_path` | `GET /test_framework/v1/scenarios/`, `POST /test_framework/v1/scenarios/delete_scenarios/` | `zz-spec-test-folder`, `Regression+Suite` |
| `search` | `GET /test_framework/v1/test-profiles/` | `Default+Test+Profile` |

The capture tool decoded each URL before it stored it. A `+` in a stored value can be a literal plus or an encoded space. In `Regression+Suite` and `Default+Test+Profile`, the `+` is probably a space (inferred). In the `filters` dates, the first crawl pass shows `%2B`, so the `+` is a literal plus.

#### 8.2.3 Project and organization scope

The dashboard names the tenant in four different ways. A rebuild must accept each name on the endpoint that uses it.

| Name | Where | Endpoints |
|---|---|---|
| `project_id` (query) | Most project data | 36 endpoints, for example `/test_framework/v2/aiagents/`, `/test_framework/v1/scenarios/`, `/test_framework/v2/metrics/`, `/test_framework/v2/results/`, `/observability/v2/call-logs/`, `/observability/v1/alerts/`, `/schedules/v1/cron-jobs/`, `/dashboards/dashboards/`, `/slack/slack-workspaces/`, `/discord/servers/` |
| `project` (query) | Insight and improvement endpoints | `/observability/v1/agent-improvement-sessions/`, `/observability/v1/deep-research-insights/` and `pricing/`, `/observability/v1/first-insights/`, `/observability/v1/metric-failure-mode-insights/` and its `categories/`, `failure-rates/`, `metric-config/`, `pricing/` |
| `organization_id` (query) | Organization data | `/test_framework/billing/`, `/test_framework/billing/status`, `/test_framework/billing/usage-history/`, `/subscriptions/subscriptions/`, `/subscriptions/subscriptions/{id}/plan-switch-offer/`, `/test_framework/v1/phone-numbers/`, `/test_framework/v1/phone-numbers/inbound/`, `/test_framework/v1/phone-numbers/providers/list`, `/user/api/v1/user-api-key/`, `/user/invites/`, `/user/v1/projects` |
| `organization` (query) | Onboarding | `/user/onboarding/` |
| Path | Records under a project or an organization | `/user/v1/projects/{id}/`, `/user/v1/projects/{id}/personalities/`, `/user/organizations/{id}/`, `/test_framework/billing/{id}/usage-chart/` |

In request bodies:

| Body key | Endpoints |
|---|---|
| `project` | `POST /test_framework/v2/aiagents/`, `POST /test_framework/v2/metrics/`, `POST /test_framework/v1/personalities/`, `PATCH /test_framework/v1/personalities/{id}/`, `POST /test_framework/v1/test-profiles/`, `POST /observability/v1/alerts/` |
| `project_id` | `POST /app/v2/product-chat/conversations/`, `POST /app/v2/product-chat/conversations/{id}/messages/`, `POST /test_framework/v1/personalities/{id}/fork/`, `POST /test_framework/v1/scenarios/create_folder/`, `POST /test_framework/v1/scenarios/delete_folder/`, `POST /test_framework/v1/scenarios/delete_scenarios/`, `POST /test_framework/v1/scenarios/scenario-agent/` |
| `organization_id` | `POST /user/v1/projects/` |
| `organization` | `POST /test_framework/v1/personalities/`, `PATCH /test_framework/v1/personalities/{id}/` |

Other scope keys: `agent_id` (query) on `/test_framework/v1/test-profiles/`, `/test_framework/v1/tools`, `/test_framework/v1/knowledge-base-connectors/`, and `/test_framework/v1/metrics/generate_metrics_progress/`. `agent` (query) on `/github/agent-scan/sdk-pr/`.

#### 8.2.4 Error bodies

| Shape | Example (verbatim) | Call |
|---|---|---|
| `non_field_errors` list | `{"non_field_errors":["Agent must have a contact number configured to run voice calls. Please configure the contact number in agent settings."]}` | `POST /schedules/v1/cron-jobs/` -> `400` (`115-monitor-created`) |
| Field map | `{"assistant_provider":["Agent does not have an assistant provider configured for text mode."]}` | `POST /schedules/v1/cron-jobs/` -> `400` (`115b-monitor-created-text`) |
| Plain list of strings | `["Max projects limit reached"]` | `POST /user/v1/projects/` -> `400` (`23-create-project-result`) |
| `{"detail"}` | `{"detail":"No Widget matches the given query."}` | `GET /dashboards/widgets/{id}/data/` -> `404` (`141-cleanup-widget`) |
| `{"detail"}` | `{"detail":"Invalid token"}` | `GET /test_framework/v1/metrics/pattern-reviews/{id}/` -> `401` (`58-metric-review-sample-labels`, `59-metric-edit-created`, `62-rubric`) |
| `{"detail","code"}` | `{"detail":"No saved vapi API key for this project. Add one under Provider API Keys.","code":"provider_key_missing"}` | `GET /test_framework/v2/aiagents/provider-assistants/?provider=vapi` -> `400` (`38-agents-import-from-provider`) |
| `{"detail","code"}` | `{"detail":"No response is currently streaming in this conversation.","code":"no_active_stream"}` | `GET /app/v2/product-chat/conversations/{id}/stream-token/` -> `409` (`68-assistant-chat-report-question`) |

The `POST /test_framework/v2/aiagents/` and `POST /test_framework/v2/aiagents/connections/check/` calls in `28-agent-created` returned this `400` body: `{"non_field_errors":["At least one configuration method must be provided: contact_number, sip_endpoint, email_id, assistant_provider (with required fields: websocket_url for self_hosted, assistant_id + api_key for vapi/retell/elevenlabs, contact_number for sms), transcript_provider set to livekit (with livekit_api_key and livekit_data), transcript_provider set to pipecat (with pipecat_api_key and pipecat_data), or transcript_provider set to retell (with retell_api_key)."]}`.

In `59-metric-edit-created` and `62-rubric`, a `200` response to the same pattern review URL follows each `401` response. The dashboard probably refreshes its session and sends the request again (inferred).

#### 8.2.5 Status codes

| Code | Count | Where seen |
|---|---|---|
| `200` | 762 | All reads. Also some writes: `PATCH` updates, `POST /test_framework/v1/personalities/{id}/fork/`, `POST /test_framework/v1/scenarios/delete_scenarios/`, `POST /dashboards/dashboards/{id}/bulk_widgets/`, `POST /dashboards/widgets/preview_data/`, the job start calls, and `DELETE /app/v1/product-chat/sessions/{id}/` (body `{"status":"deleted"}`). |
| `201` | 11 | Create calls: agents, metrics (`v2` create and `bulk_create`), personalities, test profiles, alerts, evaluator folders (`create_folder`), product chat conversations and messages |
| `204` | 10 | `DELETE` of agents, metrics, personalities, test profiles, alerts. Also `POST /test_framework/v1/scenarios/delete_folder/`. No body. |
| `400` | 6 | Validation errors (see 8.2.4) |
| `401` | 3 | `{"detail":"Invalid token"}` on the pattern review poll |
| `404` | 1 | Data of a deleted plot (widget) |
| `409` | 1 | Stream token request when no answer streams |
| `0` | 2 | The capture saw the stream request but did not record a response (`RESPONSE: type=eventsource`). This is not an HTTP status. |

### 8.3 Async job pattern

Some actions start a background job. The start call returns a `progress_id`. The dashboard then sends a progress request again and again until the job reaches an end state. The capture does not record the time between two progress requests.

| Job | Start call | Start response | Progress call | Values seen |
|---|---|---|---|---|
| Generate metrics | `POST /test_framework/v1/metrics/generate_metrics/` with `{"agent_id":26242,"num_metrics":5}` | `{"progress_id":"<uuid>"}` | `GET /test_framework/v1/metrics/generate_metrics_progress/?progress_id=<uuid>&agent_id=26242` | `status`: `queued`, then `completed`. `current_step`: "Generating 5 critical metrics...", then "Metrics generation completed". `metrics` is empty until `completed`. `error` is `null`. |
| Metric pattern review (Lab) | `POST /test_framework/v1/metrics/{id}/pattern-review/` with `{}` | `{"review_id":923,"progress_id":"<uuid>","review":{"status":"pending","stage":"sampling",...}}` | `GET /test_framework/v1/metrics/pattern-reviews/{review_id}/?ql={id,status,stage,round_index,error,metric{id,name},eval_set,optimizer}` | `status`: `pending`, `running`, `ready`. `stage`: `sampling`, then `""`. `insufficient_history`: `true` in `60-metric-pattern-review`. |
| Evaluator assistant (scenario agent) | `POST /test_framework/v1/scenarios/scenario-agent/` with `project_id`, `agent_id`, `user_message`, `num_scenarios`, `conversation_history`, `knowledge_base` | `{"progress_id":"<uuid>","session_id":3443}` | `GET /test_framework/v1/scenarios/scenario-agent-progress/?progress_id=<uuid>&project_id=13875` | `mode`: `clarify`. `status`: `in_progress`, `needs_clarification`, `completed`. |
| Generate evaluators | `POST /test_framework/v1/scenarios/generate-bg/` with `agent_id`, `num_scenarios`, `extra_instructions`, `tags`, `scenario_type`, `simulation_type`, `generate_expected_outcomes`, `folder_path`, `personalities`, and more | `{"progress_id":"<uuid>","session_id":3443}` | `GET /test_framework/v1/scenarios/generate-progress?progress_id=<uuid>&project_id=13875` (no trailing slash) | No `status` key until the end. Then `status`: `completed`. `current_step`: no key, then "Starting generation...", "Generating scenarios...", "Generation complete". Counters: `completed_scenarios`, `failed_scenarios`, `total_scenarios`. `scenarios_list` holds the new evaluators at the end. `session_updated`: `true` at the end. |

The clarification flow of the evaluator assistant:

1. The dashboard sends `POST /test_framework/v1/scenarios/scenario-agent/` with the user text.
2. The dashboard polls `scenario-agent-progress` until `status` is `needs_clarification`.
3. The progress body holds `result.message` and `result.clarification_questions`. Example: "Will your agent always speak first at the start of a call? (Reply 'yes' if your agent sends the first message, or 'no' if our testing agent should start the conversation)".
4. The dashboard saves the conversation with `PATCH /test_framework/v1/scenario-improvement-sessions/{session_id}/?project_id=13875`. The body is `{"conversation_history":[...]}`. The response holds `"status":"in_progress"`.
5. The user answers. The dashboard sends `POST /test_framework/v1/scenarios/scenario-agent/` again with the full `conversation_history` and the answer in `user_message` (`"yes"`).
6. The dashboard polls until `status` is `completed`. `result.needs_clarification` is `false`. `result.message` is "Generated one scenario with a caller wanting to reschedule their appointment."
7. The dashboard saves the full conversation again with `PATCH /test_framework/v1/scenario-improvement-sessions/{session_id}/`.
8. The dashboard sends `POST /test_framework/v1/scenarios/generate-bg/`. The body holds `"session_id":3443`, `"first_message":"auto"`, `"tool_ids":["auto"]`, and `extra_instructions_list` with the generated instructions.
9. The dashboard polls `generate-progress` until `status` is `completed`.

These steps come from `90-evaluators-generated` (steps 1 to 4) and `91-evaluators-generated-review` (steps 5 to 9).

The public API reference ("Background jobs") names the same start-and-poll pattern on `v2` paths, and a `v3` form that waits in one request. The dashboard used only the `v1` paths above.

### 8.4 Chat stream (Assistant)

> **Out of scope.** The app does not build the Assistant. This section describes it only as a record.

Section 4 describes the Assistant screens and flows. The endpoints are:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/app/v2/product-chat/conversations/?limit=50` | Conversation list |
| `GET` | `/app/v2/product-chat/conversations/pending-optimizer-count/` | Counter (seen in the first crawl pass only) |
| `POST` | `/app/v2/product-chat/conversations/` | Create a conversation. Body `{"name","project_id"}`. Status `201`. |
| `POST` | `/app/v2/product-chat/conversations/{id}/messages/` | Send a message. Body `{"message","project_id"}`. Response `{"message_id","stream_url","stream_token"}`. Status `201`. |
| `GET` | `https://assistant.example.com/agent/v1/stream/{message_id}?token=<stream_token>` | Answer stream. Server-Sent Events (SSE) text. |
| `GET` | `/app/v2/product-chat/conversations/{id}/status/` | Active message and workflow state |
| `GET` | `/app/v2/product-chat/conversations/{id}/stream-token/` | New stream token. `409` `no_active_stream` when no answer streams. |
| `DELETE` | `/app/v1/product-chat/sessions/{id}/` | Delete a conversation. Response `{"status":"deleted"}` with `200`. |
| `GET` | `/app/v1/product-chat/commands/` | Slash command list. Response `{"commands":[],"cached_at":null}`. |
| `GET` | `/app/v2/product-chat/reports/?limit=50` | Report list |
| `GET` | `/app/v2/product-chat/org-skills/` | Organization skills |
| `GET` | `/app/v2/product-chat/org-mcp-servers/` | Organization Model Context Protocol (MCP) servers |
| `GET` | `/app/v2/product-chat/project-knowledge/instructions/?project_id=13875` | Project instructions. Response `{"content":"","exists":false}`. |

Server-Sent Events (SSE) event names in the captured streams: `status`, `thinking_delta`, `text_delta`, `text_replace`, `tool_use_start`, `tool_use_complete`, `assistant_complete`, `done`. The stream starts with `retry: 3000`. Each event has an `id:` line. The capture decoded the stream text as Windows code page 1252, so the crawl records show "â€”" for "—".

### 8.5 Endpoint catalog

The catalog groups the endpoints by service prefix. Each group starts with a summary table. "Calls" is the number of captured calls.

#### User, organizations, projects, API keys — `/user`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/user/api/v1/user-api-key/` | 200 (1) | 1 |
| GET | `/user/invites/` | 200 (21) | 21 |
| GET | `/user/invites/my_invites/` | 200 (20) | 20 |
| GET | `/user/onboarding/` | 200 (20) | 20 |
| GET | `/user/organizations/{id}/` | 200 (26) | 26 |
| GET | `/user/organizations/{id}/onboarding-tasks/` | 200 (19) | 19 |
| GET | `/user/v1/projects` | 200 (20) | 20 |
| POST | `/user/v1/projects/` | 400 (1) | 1 |
| GET | `/user/v1/projects/{id}/` | 200 (11) | 11 |
| GET | `/user/v1/projects/{id}/personalities/` | 200 (17) | 17 |
| GET | `/user/v2/organizations/` | 200 (20) | 20 |

##### GET `/user/api/v1/user-api-key/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `122-settings-01-org-api-key`
- Query parameters:
  - `organization_id`: `7868`
- Response example, status `200` (from `122-settings-01-org-api-key`):

  ```json
  [{"id": 14747, "name": "", "organization": 7868, "organization_name": "example-org", "project": null, "key": "****************************************************************", "created_at": "2026-09-03T13:30:06.715395Z"}, {"id": 14969, "name": "e2e_key", "organization": 7868, "organization_name": "example-org", "project": null, "key": "****************************************************************", "created_at": "2026-09-07T06:48:12.935639Z"}]
  ```

##### GET `/user/invites/`

- Host: `backend.example.com`
- Statuses seen: `200` (21)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `invite_type`: `request`
  - `organization_id`: `7868`
  - `status`: `pending`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  []
  ```

##### GET `/user/invites/my_invites/`

- Host: `backend.example.com`
- Statuses seen: `200` (20)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters: none
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  []
  ```

##### GET `/user/onboarding/`

- Host: `backend.example.com`
- Statuses seen: `200` (20)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `organization`: `7868`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  {"organization": {"id": 7868, "flow": "simulation", "skip_onboarding": false, "tasks": [{"id": 1, "name": "Create an Agent", "description": "Set up your first agent to start collecting interaction data", "code": "create_agent", "flow_type": null, "completed": true}, {"id": 2, "name": "Generate Evaluators", "description": "Define your evaluation criteria to measure call quality and outcomes", "code": "generate_scenarios", "flow_type": null, "completed": false}, "... (2 more items)"]}, "user": {"status": "completed", "path": "ui", "variant": "simulation", "current_step": "create-agent", "progress": {"steps": {}}, "can_skip": false, "updated_at": "2026-09-03T13:33:30.426534Z"}}
  ```

##### GET `/user/organizations/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (26)
- Screens: `100-evaluators-run-dialog-concurrency`, `122-settings-00-org-general`, `122-settings-02-org-members`, `122-settings-03-org-billing`, `122-settings-04-org-telephony`, `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `ql` values (verbatim):
    - `{id}`
- Response example, status `200` (from `100-evaluators-run-dialog-concurrency`):

  ```json
  {"id": 7868, "name": "example-org", "team_size": "<10", "discovery_source": null, "outbound_timeout": 300, "max_agents_limit": -1, "max_members_limit": -1, "max_concurrent_runs_limit": 10, "max_concurrent_chat_runs_limit": 10, "max_call_duration": 600, "evaluate_relevant_metrics_enabled": true, "end_call_enabled": true, "...": "(46 more keys)"}
  ```

##### GET `/user/organizations/{id}/onboarding-tasks/`

- Host: `backend.example.com`
- Statuses seen: `200` (19)
- Screens: `crawl1.json` pages `01-agents`, `02-agent-detail`, `03-agent-new`, `04-metrics`, `05-metric-edit`, `06-create-metric`, `07-labs`, `08-rubric`, `09-assistant`, `10-personality`, `11-evaluators`, `12-results`, `13-runs-overview`, `14-monitors`, `15-calls`, `16-alerts`, `17-insights`, `18-overview-dashboards`
- Query parameters: none
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  [{"id": 1, "name": "Create an Agent", "description": "Set up your first agent to start collecting interaction data", "code": "create_agent", "flow_type": null, "completed": true}, {"id": 2, "name": "Generate Evaluators", "description": "Define your evaluation criteria to measure call quality and outcomes", "code": "generate_scenarios", "flow_type": null, "completed": false}, "... (2 more items)"]
  ```

##### GET `/user/v1/projects`

- Host: `backend.example.com`
- Statuses seen: `200` (20)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `organization_id`: `7868`
  - `ql` values (verbatim):
    - `{id,name,organization{id},members{id,role,is_email_notify_enabled,user{id,name,email}},created_at,updated_at,outbound_timeout,max_call_duration,min_call_duration,use_provider_transcript,notify_daily_report,daily_report_dashboard_ids}`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  [{"id": 13875, "name": "Automaton Project", "members": [], "organization": {"id": 7868}, "outbound_timeout": 300, "max_call_duration": 600, "min_call_duration": 10, "use_provider_transcript": false, "notify_daily_report": true, "daily_report_dashboard_ids": [], "created_at": "2026-09-03T13:30:06.431103Z", "updated_at": "2026-09-03T13:30:06.431109Z"}]
  ```

##### POST `/user/v1/projects/`

- Host: `backend.example.com`
- Statuses seen: `400` (1)
- Screens: `23-create-project-result`
- Query parameters: none
- Request example (from `23-create-project-result`):

  ```json
  {"name": "zz-spec-test", "organization_id": 7868}
  ```
- Response example, status `400` (from `23-create-project-result`):

  ```json
  ["Max projects limit reached"]
  ```

##### GET `/user/v1/projects/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (11)
- Screens: `103-evaluator-create-manual`, `104-test-profile-create`, `122-settings-07-project-general`, `122-settings-08-project-integrations`, `122-settings-09-project-provider-api-keys`, `122-settings-10-project-webhook`, `38-agents-import-from-provider`, `62-rubric`, `85-evaluators-generate-dialog`, `89-evaluators-generate-additional-config`, `pages/08-rubric`
- Query parameters: none
- Response example, status `200` (from `103-evaluator-create-manual`):

  ```json
  {"id": 13875, "name": "Automaton Project", "members": [], "organization": {"id": 7868, "name": "example-org", "members": [{"id": 107291, "user": {"id": 9855, "name": "Automaton", "email": "<user-email>"}, "role": "admin", "is_email_notify_enabled": true, "created_at": "2026-09-03T13:30:06.707467Z", "updated_at": "2026-09-03T13:30:06.707476Z"}], "created_at": "2026-09-03T13:30:06.426970Z", "updated_at": "2026-10-23T19:50:48.554059Z"}, "outbound_timeout": 300, "max_call_duration": 600, "min_call_duration": 10, "sample_rate": 1.0, "max_messages_chat_runs_limit": 300, "webhook_url": "", "webhook_secret_configured": false, "evaluate_relevant_metrics_enabled": true, "...": "(48 more keys)"}
  ```

##### GET `/user/v1/projects/{id}/personalities/`

- Host: `backend.example.com`
- Statuses seen: `200` (17)
- Screens: `102-evaluator-create`, `104-test-profile-create`, `107-runs-overview-04-filters`, `108-monitors-01-create-monitor`, `113-monitor-select-scenarios`, `147-cleanup-personality-9649`, `147-cleanup-personality-9650`, `76-personality-fork`, `77b-personality-edit-saved`, `78-personality-created`, `85-evaluators-generate-dialog`, `89-evaluators-generate-additional-config`, `98-evaluators-run-dialog-more-fields`, `pages/10-personality`, `pages/13-runs-overview`
- Query parameters:
  - `ql` values (verbatim):
    - `{id,name,description,language,accent,gender,enabled,call_service_provider,is_starred,organization,forked_from,background_noise,interruption_level,speed,provider_agent_id}`
  - `language`: `en`, `all`
- Response example, status `200` (from `102-evaluator-create`):

  ```json
  [{"id": 4253, "forked_from": null, "organization": null, "name": "Interruptive (High)", "description": "An assertive speaker who interrupts frequently.", "language": "en", "accent": "American", "gender": "male", "enabled": false, "call_service_provider": "patronus", "background_noise": null, "interruption_level": "high", "...": "(4 more keys)"}, {"id": 4256, "forked_from": null, "organization": null, "name": "Normal (Bg Noise)", "description": "Normal (Bg Noise)", "language": "en", "accent": "American", "gender": "male", "enabled": true, "call_service_provider": "patronus", "background_noise": "https://assets.example.com/background-noise/...", "interruption_level": "off", "...": "(4 more keys)"}, "... (20 more items)"]
  ```

##### GET `/user/v2/organizations/`

- Host: `backend.example.com`
- Statuses seen: `200` (20)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `page`: `1`
  - `page_size`: `30`
  - `ql` values (verbatim):
    - `{id,name,team_size,skip_onboarding,created_at,slack_invite_sent,max_concurrent_runs_limit,max_concurrent_chat_runs_limit,is_internal_view_only,members{role,user{id,name,email}},projects{id}}`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  {"count": 1, "next": null, "previous": null, "results": [{"id": 7868, "name": "example-org", "team_size": "<10", "max_concurrent_runs_limit": 10, "max_concurrent_chat_runs_limit": 10, "members": [{"user": "{...}", "role": "admin"}], "projects": [{"id": 13875}], "is_internal_view_only": false, "created_at": "2026-09-03T13:30:06.426970Z", "skip_onboarding": false, "slack_invite_sent": false}]}
  ```

#### Test framework (agents, evaluators, metrics, results, personalities, test profiles, billing) — `/test_framework`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/test_framework/billing/` | 200 (19) | 19 |
| GET | `/test_framework/billing/status` | 200 (18) | 18 |
| GET | `/test_framework/billing/usage-history/` | 200 (2) | 2 |
| GET | `/test_framework/billing/{id}/credits-usage/` | 200 (19) | 19 |
| GET | `/test_framework/billing/{id}/usage-chart/` | 200 (2) | 2 |
| GET | `/test_framework/v1/aiagents/runs_overview_project/` | 200 (4) | 4 |
| GET | `/test_framework/v1/aiagents/{id}/history/` | 200 (2) | 2 |
| GET | `/test_framework/v1/configurations/` | 200 (1) | 1 |
| GET | `/test_framework/v1/knowledge-base-connectors/` | 200 (1) | 1 |
| GET | `/test_framework/v1/metrics/basic_list/` | 200 (7) | 7 |
| POST | `/test_framework/v1/metrics/bulk_create/` | 201 (1) | 1 |
| POST | `/test_framework/v1/metrics/generate_metrics/` | 200 (1) | 1 |
| GET | `/test_framework/v1/metrics/generate_metrics_progress/` | 200 (4) | 4 |
| GET | `/test_framework/v1/metrics/pattern-reviews/{id}/` | 200 (5), 401 (3) | 8 |
| DELETE | `/test_framework/v1/metrics/{id}/` | 204 (2) | 2 |
| GET | `/test_framework/v1/metrics/{id}/history/` | 200 (3) | 3 |
| POST | `/test_framework/v1/metrics/{id}/pattern-review/` | 200 (1) | 1 |
| POST | `/test_framework/v1/personalities/` | 201 (1) | 1 |
| GET | `/test_framework/v1/personalities/{id}/` | 200 (1) | 1 |
| PATCH | `/test_framework/v1/personalities/{id}/` | 200 (1) | 1 |
| DELETE | `/test_framework/v1/personalities/{id}/` | 204 (2) | 2 |
| POST | `/test_framework/v1/personalities/{id}/fork/` | 200 (1) | 1 |
| GET | `/test_framework/v1/phone-numbers/` | 200 (2) | 2 |
| GET | `/test_framework/v1/phone-numbers/inbound/` | 200 (4) | 4 |
| GET | `/test_framework/v1/phone-numbers/providers/list` | 200 (1) | 1 |
| GET | `/test_framework/v1/predefined-metrics/` | 200 (1) | 1 |
| PATCH | `/test_framework/v1/scenario-improvement-sessions/{id}/` | 200 (2) | 2 |
| GET | `/test_framework/v1/scenarios/` | 200 (18) | 18 |
| POST | `/test_framework/v1/scenarios/create_folder/` | 201 (1) | 1 |
| POST | `/test_framework/v1/scenarios/delete_folder/` | 204 (1) | 1 |
| POST | `/test_framework/v1/scenarios/delete_scenarios/` | 200 (1) | 1 |
| GET | `/test_framework/v1/scenarios/folders/` | 200 (13) | 13 |
| POST | `/test_framework/v1/scenarios/generate-bg/` | 200 (1) | 1 |
| GET | `/test_framework/v1/scenarios/generate-progress` | 200 (35) | 35 |
| GET | `/test_framework/v1/scenarios/has_infrastructure_suite/` | 200 (3) | 3 |
| GET | `/test_framework/v1/scenarios/scenario-agent-progress/` | 200 (14) | 14 |
| POST | `/test_framework/v1/scenarios/scenario-agent/` | 200 (2) | 2 |
| GET | `/test_framework/v1/scenarios/tags/` | 200 (6) | 6 |
| GET | `/test_framework/v1/scenarios/{id}/` | 200 (2) | 2 |
| GET | `/test_framework/v1/scenarios/{id}/condition-audio/` | 200 (2) | 2 |
| GET | `/test_framework/v1/test-profiles/` | 200 (10) | 10 |
| POST | `/test_framework/v1/test-profiles/` | 201 (1) | 1 |
| DELETE | `/test_framework/v1/test-profiles/{id}` | 204 (3) | 3 |
| GET | `/test_framework/v1/test-profiles/{id}/` | 200 (6) | 6 |
| GET | `/test_framework/v1/tools` | 200 (4) | 4 |
| GET | `/test_framework/v1/views/` | 200 (8) | 8 |
| GET | `/test_framework/v2/aiagents/` | 200 (9) | 9 |
| POST | `/test_framework/v2/aiagents/` | 201 (1), 400 (1) | 2 |
| POST | `/test_framework/v2/aiagents/connections/check/` | 200 (2), 400 (1) | 3 |
| GET | `/test_framework/v2/aiagents/integration_summary/` | 200 (2) | 2 |
| GET | `/test_framework/v2/aiagents/provider-assistants/` | 400 (1) | 1 |
| GET | `/test_framework/v2/aiagents/short_list/` | 200 (22) | 22 |
| GET | `/test_framework/v2/aiagents/{id}/` | 200 (29) | 29 |
| PATCH | `/test_framework/v2/aiagents/{id}/` | 200 (4) | 4 |
| DELETE | `/test_framework/v2/aiagents/{id}/` | 204 (1) | 1 |
| GET | `/test_framework/v2/metrics/` | 200 (17) | 17 |
| POST | `/test_framework/v2/metrics/` | 201 (1) | 1 |
| GET | `/test_framework/v2/metrics/{id}/` | 200 (4) | 4 |
| GET | `/test_framework/v2/results/` | 200 (28) | 28 |
| GET | `/test_framework/v2/runs/` | 200 (1) | 1 |
| GET | `/test_framework/v2/scenarios/{id}/history/` | 200 (2) | 2 |

##### GET `/test_framework/billing/`

- Host: `backend.example.com`
- Statuses seen: `200` (19)
- Screens: `crawl1.json` pages `01-agents`, `02-agent-detail`, `03-agent-new`, `04-metrics`, `05-metric-edit`, `06-create-metric`, `07-labs`, `08-rubric`, `09-assistant`, `10-personality`, `11-evaluators`, `12-results`, `13-runs-overview`, `14-monitors`, `15-calls`, `16-alerts`, `17-insights`, `18-overview-dashboards`, `20-billing`
- Query parameters:
  - `organization_id`: `7868`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  [{"id": 7845, "organization": 7868, "balance": "0.00", "extra_balance": "204.84", "total_balance": 204.84, "text_runs_count": 0, "non_text_runs_minutes": "00:00", "call_logs_count": 0, "runs_count": 0, "concurrency_status": {"total_active_call_runs": 0, "total_call_runs_limit": 10, "total_active_chat_runs": 0, "total_chat_runs_limit": 10}, "runs_balance": 0, "call_logs_balance": 0, "...": "(9 more keys)"}]
  ```

##### GET `/test_framework/billing/status`

- Host: `backend.example.com`
- Statuses seen: `200` (18)
- Screens: `crawl1.json` pages `01-agents`, `02-agent-detail`, `03-agent-new`, `04-metrics`, `05-metric-edit`, `06-create-metric`, `07-labs`, `08-rubric`, `09-assistant`, `10-personality`, `11-evaluators`, `12-results`, `13-runs-overview`, `14-monitors`, `15-calls`, `16-alerts`, `17-insights`, `18-overview-dashboards`
- Query parameters:
  - `organization_id`: `7868`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  {"balance": 0.0, "organization": 7868, "is_trial": false}
  ```

##### GET `/test_framework/billing/usage-history/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `122-settings-03-org-billing`, `pages/20-billing`
- Query parameters:
  - `page`: `1`
  - `organization_id`: `7868`
  - `page_size`: `30`
  - `filters`: `{"operator":"and","conditions":[{"field":"created_at","op":"gte","value":"2026-10-16T00:00:00.000+02:00"},{"field":"created_at","op":"lte","value":"2026-10-23T23:59:59.999+02:00"}]}`
- Response example, status `200` (from `122-settings-03-org-billing`):

  ```json
  {"next": null, "previous": null, "results": []}
  ```

##### GET `/test_framework/billing/{id}/credits-usage/`

- Host: `backend.example.com`
- Statuses seen: `200` (19)
- Screens: `crawl1.json` pages `01-agents`, `02-agent-detail`, `03-agent-new`, `04-metrics`, `05-metric-edit`, `06-create-metric`, `07-labs`, `08-rubric`, `09-assistant`, `10-personality`, `11-evaluators`, `12-results`, `13-runs-overview`, `14-monitors`, `15-calls`, `16-alerts`, `17-insights`, `18-overview-dashboards`, `20-billing`
- Query parameters: none
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  {"billing_cycle": {"start_date": "2026-10-03T13:31:46.559099Z", "end_date": "2026-11-03T13:31:46.559099Z"}, "credits": {"pack_balance": 0.0, "balance": 0.0, "extra_balance": 204.84, "total_balance": 204.84, "used_by_simulation": 0.0, "used_by_observability": 0.0, "total_used_credits": 0.0}}
  ```

##### GET `/test_framework/billing/{id}/usage-chart/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `122-settings-03-org-billing`, `pages/20-billing`
- Query parameters:
  - `time_period`: `day`
  - `split_by_type`: `true`
  - `filters`: `{"operator":"and","conditions":[{"field":"created_at","op":"gte","value":"2026-10-16T00:00:00.000+02:00"},{"field":"created_at","op":"lte","value":"2026-10-23T23:59:59.999+02:00"}]}`
- Response example, status `200` (from `122-settings-03-org-billing`):

  ```json
  {"field_name": "amount", "chart_type": "bar", "data": [], "aggregation_function": "sum", "time_period": "day", "metadata": {"display_name": "Amount", "data_type": "numeric", "filter_value": null, "split_by_type": true}}
  ```

##### GET `/test_framework/v1/aiagents/runs_overview_project/`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `107-runs-overview-06-try-dashboards`, `pages/13-runs-overview`
- Query parameters:
  - `project_id`: `13875`
  - `from`: `2026-10-23T16:00:42.856+02:00`, `2026-10-23T15:06:52.332+02:00`, `2026-10-23T15:06:52.851+02:00`, `2026-10-23T15:06:52.845+02:00`
  - `to`: `2026-10-23T22:00:42.856+02:00`, `2026-10-23T21:06:52.332+02:00`, `2026-10-23T21:06:52.851+02:00`, `2026-10-23T21:06:52.845+02:00`
  - `chart_type`: `bar`
  - `period`: `day`
- Response example, status `200` (from `107-runs-overview-06-try-dashboards`):

  ```json
  {"metric_summary": {}, "success_rate": 0, "total_calls": 0, "prev_success_rate": 0, "prev_total_calls": 0, "success_rate_change": 0, "total_calls_change": 0, "avg_latency": 0, "prev_avg_latency": 0, "avg_latency_change": 0, "avg_talk_ratio": 0, "prev_avg_talk_ratio": 0, "...": "(6 more keys)"}
  ```

##### GET `/test_framework/v1/aiagents/{id}/history/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `30-agent-version-history`, `97-evaluators-run-dialog`
- Query parameters:
  - `page`: `1`
  - `page_size`: `14`, `51`
  - `ql` values (verbatim):
    - `{history_id,version_id,version_name,is_current,is_runnable}`
- Response example, status `200` (from `30-agent-version-history`):

  ```json
  {"count": 1, "next": null, "previous": null, "results": [{"history_id": 7104149, "is_current": true, "is_runnable": false, "history_date": "2026-10-23T19:15:08.206257Z", "history_type": "+", "history_change_reason": null, "history_user": {"id": 9855, "name": "Automaton", "email": "<user-email>"}, "version_id": "v1", "version_name": null, "id": 26242, "agent_name": "zz-spec-test-agent", "language": "en", "...": "(15 more keys)"}]}
  ```

##### GET `/test_framework/v1/configurations/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/13-runs-overview`
- Query parameters:
  - `project_id`: `13875`
  - `configuration_type`: `runs_overview`
- Response example, status `200` (from `pages/13-runs-overview`):

  ```json
  {"count": 0, "next": null, "previous": null, "results": []}
  ```

##### GET `/test_framework/v1/knowledge-base-connectors/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `29-agent-detail-all-sections-open`
- Query parameters:
  - `agent_id`: `26242`
- Response example, status `200` (from `29-agent-detail-all-sections-open`):

  ```json
  []
  ```

##### GET `/test_framework/v1/metrics/basic_list/`

- Host: `backend.example.com`
- Statuses seen: `200` (7)
- Screens: `103-evaluator-create-manual`, `104-test-profile-create`, `96-evaluators-actions-menu`, `97-evaluators-run-dialog`, `pages/12-results`, `pages/13-runs-overview`, `pages/15-calls`
- Query parameters:
  - `project_id`: `13875`
  - `ql` values (verbatim):
    - `{id,name,eval_type,enum_values,observability_enabled,simulation_enabled,function_name,vocera_defined_metric_code,agents,project}`
    - `{id,name,eval_type,enum_values,observability_enabled,simulation_enabled,function_name,vocera_defined_metric_code}`
- Response example, status `200` (from `103-evaluator-create-manual`):

  ```json
  [{"id": 240898, "name": "AI interrupting user", "eval_type": "numeric", "enum_values": [], "observability_enabled": true, "simulation_enabled": true, "function_name": "get_main_agent_interruption", "vocera_defined_metric_code": "ec29cab5", "agents": [22749, 22750, 22757, "... (1 more items)"], "project": 13875}, {"id": 240899, "name": "Average Pitch (in Hz)", "eval_type": "numeric", "enum_values": [], "observability_enabled": true, "simulation_enabled": true, "function_name": "get_average_pitch", "vocera_defined_metric_code": "944867cb", "agents": [22749, 22750, 22757, "... (1 more items)"], "project": 13875}, "... (15 more items)"]
  ```

##### POST `/test_framework/v1/metrics/bulk_create/`

- Host: `backend.example.com`
- Statuses seen: `201` (1)
- Screens: `47-metrics-generated-saved`
- Query parameters: none
- Request example (from `47-metrics-generated-saved`):

  ```json
  [{"name": "new_appointment_booking", "description": "This metric measures whether the main agent successfully books a new appointm...", "project": "13875", "eval_type": "binary"}]
  ```
- Response example, status `201` (from `47-metrics-generated-saved`):

  ```json
  [{"id": 272071, "slug": null, "project": 13875, "agent": null, "agents": [22749, 22750, 22757, "... (1 more items)"], "name": "new_appointment_booking", "description": "This metric measures whether the main agent successfully books a new appointm...", "type": "llm_judge", "eval_type": "binary_workflow_adherence", "audio_enabled": false, "observability_enabled": true, "simulation_enabled": true, "...": "(33 more keys)"}]
  ```

##### POST `/test_framework/v1/metrics/generate_metrics/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `45-metrics-generated`
- Query parameters: none
- Request example (from `45-metrics-generated`):

  ```json
  {"agent_id": 26242, "num_metrics": 5}
  ```
- Response example, status `200` (from `45-metrics-generated`):

  ```json
  {"progress_id": "4cf1fe66-620c-43d2-9036-2e7eac14c4dc"}
  ```

##### GET `/test_framework/v1/metrics/generate_metrics_progress/`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `45-metrics-generated`
- Query parameters:
  - `progress_id`: `4cf1fe66-620c-43d2-9036-2e7eac14c4dc`
  - `agent_id`: `26242`
- Response example, status `200` (from `45-metrics-generated`):

  ```json
  {"agent_id": 26242, "status": "queued", "current_step": "Generating 5 critical metrics...", "metrics": [], "error": null}
  ```

##### GET `/test_framework/v1/metrics/pattern-reviews/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (5), `401` (3)
- Screens: `57-create-metric-created`, `58-metric-review-sample-labels`, `59-metric-edit-created`, `60-metric-pattern-review`, `62-rubric`
- Query parameters:
  - `ql` values (verbatim):
    - `{id,status,stage,round_index,error,metric{id,name},eval_set,optimizer}`
    - `{id,project_id,status,stage,round_index,insufficient_history,error,progress_id,metric{id,name,slug,description,custom_code,type,eval_type,enum_values,evaluation_trigger},counts,patterns,corrections,last_rebuild,eval_set,optimizer,created_at,updated_at}`
- Response example, status `200` (from `57-create-metric-created`):

  ```json
  {"id": 923, "status": "running", "stage": "sampling", "round_index": 0, "error": "", "metric": {"id": 272072, "name": "zz-spec-test-metric"}, "eval_set": {"corrections": 0, "confirmations": 0, "test_set_ids": []}, "optimizer": null}
  ```
- Response example, status `401` (from `58-metric-review-sample-labels`):

  ```json
  {"detail": "Invalid token"}
  ```

##### DELETE `/test_framework/v1/metrics/{id}/`

- Host: `backend.example.com`
- Statuses seen: `204` (2)
- Screens: `146-cleanup-metric-272071`, `146-cleanup-metric-272072`
- Query parameters: none
- Response: no body (`204`).

##### GET `/test_framework/v1/metrics/{id}/history/`

- Host: `backend.example.com`
- Statuses seen: `200` (3)
- Screens: `59-metric-edit-created`, `61-labs-metric-detail`, `pages/05-metric-edit`
- Query parameters:
  - `page`: `1`
  - `page_size`: `14`
- Response example, status `200` (from `59-metric-edit-created`):

  ```json
  {"count": 1, "next": null, "previous": null, "results": [{"history_id": 5829066, "history_date": "2026-10-23T19:30:58.079223Z", "history_type": "+", "history_change_reason": null, "history_user": {"id": 9855, "name": "Automaton", "email": "<user-email>"}, "version_id": "v1", "version_name": null, "agents_snapshot": [22757, 26242], "id": 272072, "slug": "zzspectestmetric_vb3", "project": 13875, "agent": null, "...": "(35 more keys)"}]}
  ```

##### POST `/test_framework/v1/metrics/{id}/pattern-review/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `57-create-metric-created`
- Query parameters: none
- Request example (from `57-create-metric-created`):

  ```json
  {}
  ```
- Response example, status `200` (from `57-create-metric-created`):

  ```json
  {"review_id": 923, "progress_id": "f5f70b53-4389-4620-b161-fdd9294a8e38", "review": {"id": 923, "project_id": 13875, "status": "pending", "stage": "sampling", "round_index": 0, "insufficient_history": false, "error": "", "progress_id": "f5f70b53-4389-4620-b161-fdd9294a8e38", "metric": {"id": 272072, "name": "zz-spec-test-metric", "slug": "zzspectestmetric_vb3", "description": "This metric passes if the main agent confirms the name and phone number of th...", "custom_code": "", "type": "llm_judge", "eval_type": "binary", "enum_values": [], "evaluation_trigger": "always"}, "counts": {}, "patterns": [], "corrections": {}, "...": "(5 more keys)"}}
  ```

##### POST `/test_framework/v1/personalities/`

- Host: `backend.example.com`
- Statuses seen: `201` (1)
- Screens: `78-personality-created`
- Query parameters: none
- Request example (from `78-personality-created`):

  ```json
  {"name": "zz-spec-test-personality", "prompt": "You are a calm caller in your forties. You speak in short sentences. Test per...", "background_noise": "off", "voice_id": "hpp4J3VqNfWAUOO0d1Us", "organization": 7868, "language": "en", "voice_model": "eleven_turbo_v2_5", "forked_from": null, "interruption_level": "off", "speed": 1, "background_sound_volume": null, "project": 13875}
  ```
- Response example, status `201` (from `78-personality-created`):

  ```json
  {"id": 9650, "forked_from": null, "organization": 7868, "project": 13875, "name": "zz-spec-test-personality", "prompt": "You are a calm caller in your forties. You speak in short sentences. Test per...", "language": "en", "accent": "american", "call_service_provider": "patronus", "background_noise": "off", "voice_model": "eleven_turbo_v2_5", "voice_id": "hpp4J3VqNfWAUOO0d1Us", "...": "(13 more keys)"}
  ```

##### GET `/test_framework/v1/personalities/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `77b-personality-edit-saved`
- Query parameters: none
- Response example, status `200` (from `77b-personality-edit-saved`):

  ```json
  {"id": 9649, "forked_from": 693, "organization": 7868, "project": 13875, "name": "zz-spec-test-personality-fork", "prompt": "You are a middle aged American male. You live a very simple and normal life. ...", "language": "en", "accent": "american", "call_service_provider": "patronus", "background_noise": "off", "voice_model": "eleven_turbo_v2_5", "voice_id": "QTo0g2djh2iZ0bu7jGWt", "...": "(13 more keys)"}
  ```

##### PATCH `/test_framework/v1/personalities/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `77b-personality-edit-saved`
- Query parameters: none
- Request example (from `77b-personality-edit-saved`):

  ```json
  {"name": "zz-spec-test-personality-fork", "prompt": "You are a middle aged American male. You live a very simple and normal life. ...", "background_noise": "off", "voice_id": "QTo0g2djh2iZ0bu7jGWt", "organization": 7868, "language": "en", "voice_model": "eleven_turbo_v2_5", "forked_from": 693, "interruption_level": "off", "speed": 1, "start_speaking_plan": 2.5, "message_plan": {"idle_timeout_seconds": 10, "idle_message_max_spoken_count": 3}, "...": "(3 more keys)"}
  ```
- Response example, status `200` (from `77b-personality-edit-saved`):

  ```json
  {"id": 9649, "forked_from": 693, "organization": 7868, "project": 13875, "name": "zz-spec-test-personality-fork", "prompt": "You are a middle aged American male. You live a very simple and normal life. ...", "language": "en", "accent": "american", "call_service_provider": "patronus", "background_noise": "off", "voice_model": "eleven_turbo_v2_5", "voice_id": "QTo0g2djh2iZ0bu7jGWt", "...": "(12 more keys)"}
  ```

##### DELETE `/test_framework/v1/personalities/{id}/`

- Host: `backend.example.com`
- Statuses seen: `204` (2)
- Screens: `147-cleanup-personality-9649`, `147-cleanup-personality-9650`
- Query parameters: none
- Response: no body (`204`).

##### POST `/test_framework/v1/personalities/{id}/fork/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `76-personality-fork`
- Query parameters: none
- Request example (from `76-personality-fork`):

  ```json
  {"project_id": 13875}
  ```
- Response example, status `200` (from `76-personality-fork`):

  ```json
  {"id": 9649, "forked_from": 693, "organization": 7868, "project": 13875, "name": "Normal Male", "prompt": "You are a middle aged American male. You live a very simple and normal life. ...", "language": "en", "accent": "American", "call_service_provider": "patronus", "background_noise": "off", "voice_model": "eleven_turbo_v2_5", "voice_id": "QTo0g2djh2iZ0bu7jGWt", "...": "(13 more keys)"}
  ```

##### GET `/test_framework/v1/phone-numbers/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `104-test-profile-create`, `96-evaluators-actions-menu`
- Query parameters:
  - `organization_id`: `7868`
  - `call_service_provider`: `patronus`
- Response example, status `200` (from `104-test-profile-create`):

  ```text
  [{"id":356,"scenario_id":null,"scenario_name":null,"number":"+13682101298","phone_number_id":"+13682101298","call_service_provider":"patronus","name":"canada twilio","provider":"builtin","sms_enabled":false,"metadata":{"use_websocket_flow":true},"created_at":"2026-04-29T09:30:41Z","updated_at":"2026- ... (the body is not complete JSON in the capture: it stops after 30000 characters)
  ```

##### GET `/test_framework/v1/phone-numbers/inbound/`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `103-evaluator-create-manual`, `104-test-profile-create`, `85-evaluators-generate-dialog`, `89-evaluators-generate-additional-config`
- Query parameters:
  - `call_service_provider`: `patronus`
  - `organization_id`: `7868`
- Response example, status `200` (from `103-evaluator-create-manual`):

  ```text
  [{"id":356,"number":"+13682101298","phone_number_id":"+13682101298","common":true,"call_service_provider":"patronus"},{"id":2,"number":"+18647326888","phone_number_id":"43e1785c-c339-4913-8729-bca3e41bcccb","common":true,"call_service_provider":"patronus"},{"id":4,"number":"+18646683516","phone_numb ... (the body is not complete JSON in the capture: it stops after 30000 characters)
  ```

##### GET `/test_framework/v1/phone-numbers/providers/list`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `122-settings-04-org-telephony`
- Query parameters:
  - `organization_id`: `7868`
- Response example, status `200` (from `122-settings-04-org-telephony`):

  ```json
  []
  ```

##### GET `/test_framework/v1/predefined-metrics/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `42-metrics-predefined-dialog`
- Query parameters: none
- Response example, status `200` (from `42-metrics-predefined-dialog`):

  ```json
  [{"id": 9, "name": "AI interrupting user", "description": "Tells if the AI (main agent) interrupted user (testing agent) during the inte...", "code": "ec29cab5", "slug": "ai_interrupting_user", "type": "basic", "eval_type": "numeric", "audio_enabled": false, "prompt": "", "function_name": "get_main_agent_interruption", "enum_values": [], "custom_code": "", "...": "(9 more keys)"}, {"id": 289, "name": "Appropriate Call Termination by Main Agent", "description": "This metric checks if the Conversation was ended early by the main agent. It ...", "code": "b253d627", "slug": "appropriate_call_termination_by_main_agent", "type": "custom_prompt", "eval_type": "binary", "audio_enabled": false, "prompt": "", "function_name": "get_not_early_end_call_metric", "enum_values": [], "custom_code": "", "...": "(9 more keys)"}, "... (31 more items)"]
  ```

##### PATCH `/test_framework/v1/scenario-improvement-sessions/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `90-evaluators-generated`, `91-evaluators-generated-review`
- Query parameters:
  - `project_id`: `13875`
- Request example (from `90-evaluators-generated`):

  ```json
  {"conversation_history": [{"role": "user", "content": "Generate one scenario where the caller wants to move an appointment.", "timestamp": "2026-10-23T19:48:26.191299+00:00"}, {"role": "assistant", "content": "Will your agent always speak first at the start of a call? (Reply 'yes' if yo...", "timestamp": "2026-10-23T19:48:26.191299+00:00"}]}
  ```
- Response example, status `200` (from `90-evaluators-generated`):

  ```json
  {"id": 3443, "title": "Generate one scenario where the caller wants to mo...", "project": 13875, "scenario_ids": [], "conversation_history": [{"role": "user", "content": "Generate one scenario where the caller wants to move an appointment.", "timestamp": "2026-10-23T19:48:26.191299+00:00"}, {"role": "assistant", "content": "Will your agent always speak first at the start of a call? (Reply 'yes' if yo...", "timestamp": "2026-10-23T19:48:26.191299+00:00"}], "status": "in_progress", "created_at": "2026-10-23T19:48:25.698988Z", "updated_at": "2026-10-23T19:48:28.612695Z", "created_by": 9855}
  ```

##### GET `/test_framework/v1/scenarios/`

- Host: `backend.example.com`
- Statuses seen: `200` (18)
- Screens: `104-test-profile-create`, `106-results-02-filters`, `113-monitor-select-scenarios`, `113b-monitor-folder-click`, `143-cleanup-evaluator`, `144-cleanup-folder`, `42-metrics-predefined-dialog`, `49-create-metric-detail-mode`, `92-evaluators-generated-done`, `94-evaluators-generated-saved`, `95-evaluators-folder-view`, `pages/11-evaluators`, `pages/14-monitors`
- Query parameters:
  - `project_id`: `13875`
  - `folder_path`: `zz-spec-test-folder`, `Regression+Suite`
  - `page`: `1`
  - `page_size`: `30`, `1`, `500`, `100`
  - `ql` values (verbatim):
    - `{id,name,personality_name,agent,agent_name,phone_number,scenario_language,metric_names,metrics,tags,created_by,created_at,last_updated_by,updated_at,scenario_type,test_profile_data,first_message}`
    - `{id,name}`
    - `{id}`
- Response example, status `200` (from `104-test-profile-create`):

  ```json
  {"count": 1, "next": null, "previous": null, "results": [{"id": 401833, "name": "Returning patient moves dental appointment after date correction", "personality_name": "Normal Male", "agent_name": "zz-spec-test-agent", "scenario_language": "en", "scenario_type": "instruction", "tags": [], "agent": 26242, "metrics": [240898, 240899, 240900, "... (14 more items)"], "metric_names": ["AI interrupting user", "Average Pitch (in Hz)", "Expected Outcome", "... (14 more items)"], "first_message": "", "test_profile_data": {"id": 62345, "project": 13875, "agent": 26242, "agent_name": "zz-spec-test-agent", "name": "test_profile_agent_26242_1792785047258", "information": {"main_agent_variables": "{...}", "testing_agent_variables": "{...}"}, "created_by": null, "last_updated_by": null, "created_at": "2026-10-23T19:50:47.259295Z", "updated_at": "2026-10-23T19:50:47.259310Z"}, "...": "(5 more keys)"}]}
  ```

##### POST `/test_framework/v1/scenarios/create_folder/`

- Host: `backend.example.com`
- Statuses seen: `201` (1)
- Screens: `88b-evaluators-folder-created`
- Query parameters: none
- Request example (from `88b-evaluators-folder-created`):

  ```json
  {"name": "zz-spec-test-folder", "project_id": 13875}
  ```
- Response example, status `201` (from `88b-evaluators-folder-created`):

  ```json
  {"name": "zz-spec-test-folder", "path": "zz-spec-test-folder", "is_infrastructure_suite": false, "is_deletable": true, "is_renamable": true, "is_regression_suite": false, "created_at": "2026-10-23T19:48:09.660961Z", "updated_at": "2026-10-23T19:48:09.660975Z"}
  ```

##### POST `/test_framework/v1/scenarios/delete_folder/`

- Host: `backend.example.com`
- Statuses seen: `204` (1)
- Screens: `144-cleanup-folder`
- Query parameters: none
- Request example (from `144-cleanup-folder`):

  ```json
  {"path": "zz-spec-test-folder", "project_id": 13875}
  ```
- Response: no body (`204`).

##### POST `/test_framework/v1/scenarios/delete_scenarios/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `143-cleanup-evaluator`
- Query parameters:
  - `folder_path`: `zz-spec-test-folder`
- Request example (from `143-cleanup-evaluator`):

  ```json
  {"project_id": 13875, "scenarios": [401833]}
  ```

##### GET `/test_framework/v1/scenarios/folders/`

- Host: `backend.example.com`
- Statuses seen: `200` (13)
- Screens: `102-evaluator-create`, `103-evaluator-create-transcript`, `104-test-profile-create`, `113-monitor-select-scenarios`, `143-cleanup-evaluator`, `144-cleanup-folder`, `85-evaluators-generate-dialog`, `88b-evaluators-folder-created`, `89-evaluators-generate-additional-config`, `92-evaluators-generated-done`, `94-evaluators-generated-saved`, `pages/11-evaluators`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `102-evaluator-create`):

  ```json
  [{"name": "Regression Suite", "path": "Regression Suite", "is_infrastructure_suite": false, "is_deletable": false, "is_renamable": false, "is_regression_suite": true, "created_at": "2026-09-10T10:17:04.700103Z", "updated_at": "2026-09-10T10:17:04.700106Z"}, {"name": "default", "path": "default", "is_infrastructure_suite": false, "is_deletable": false, "is_renamable": true, "is_regression_suite": false, "created_at": "2026-09-03T13:30:06.638046Z", "updated_at": "2026-09-03T13:30:06.638051Z"}, "... (2 more items)"]
  ```

##### POST `/test_framework/v1/scenarios/generate-bg/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `91-evaluators-generated-review`
- Query parameters: none
- Request example (from `91-evaluators-generated-review`):

  ```json
  {"agent_id": 26242, "num_scenarios": 1, "extra_instructions": "Generate one scenario where the caller wants to move an appointment.", "tags": [], "scenario_type": "workflow", "simulation_type": "instruction", "generate_expected_outcomes": true, "folder_path": "zz-spec-test-folder", "personalities": [], "first_message": "auto", "tool_ids": ["auto"], "session_id": 3443, "...": "(1 more keys)"}
  ```
- Response example, status `200` (from `91-evaluators-generated-review`):

  ```json
  {"progress_id": "09fef315-372a-41a9-9ee8-4948dcf6cd82", "session_id": 3443}
  ```

##### GET `/test_framework/v1/scenarios/generate-progress`

- Host: `backend.example.com`
- Statuses seen: `200` (35)
- Screens: `91-evaluators-generated-review`, `92-evaluators-generated-done`
- Query parameters:
  - `progress_id`: `09fef315-372a-41a9-9ee8-4948dcf6cd82`
  - `project_id`: `13875`
- Response example, status `200` (from `91-evaluators-generated-review`):

  ```json
  {"agent_id": 26242, "completed_scenarios": 0, "failed_scenarios": 0, "total_scenarios": 1, "scenarios_list": [], "errors": [], "session_id": 3443, "initiator_user_id": 9855, "origin_source": "ui"}
  ```

##### GET `/test_framework/v1/scenarios/has_infrastructure_suite/`

- Host: `backend.example.com`
- Statuses seen: `200` (3)
- Screens: `104-test-profile-create`, `144-cleanup-folder`, `pages/11-evaluators`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `104-test-profile-create`):

  ```json
  {"has_infrastructure_suite": false}
  ```

##### GET `/test_framework/v1/scenarios/scenario-agent-progress/`

- Host: `backend.example.com`
- Statuses seen: `200` (14)
- Screens: `90-evaluators-generated`, `91-evaluators-generated-review`
- Query parameters:
  - `progress_id`: `d05c27c4-ebb4-4e83-86fb-32e97f45d11d`, `67e58f0b-4395-46ec-8636-67e31864f2bb`
  - `project_id`: `13875`
- Response example, status `200` (from `90-evaluators-generated`):

  ```json
  {"session_id": 3443, "mode": "clarify", "status": "in_progress", "result": null, "error": null, "progress_id": "d05c27c4-ebb4-4e83-86fb-32e97f45d11d"}
  ```

##### POST `/test_framework/v1/scenarios/scenario-agent/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `90-evaluators-generated`, `91-evaluators-generated-review`
- Query parameters: none
- Request example (from `90-evaluators-generated`):

  ```json
  {"project_id": 13875, "user_message": "Generate one scenario where the caller wants to move an appointment.", "num_scenarios": 1, "conversation_history": [], "knowledge_base": [], "agent_id": 26242}
  ```
- Response example, status `200` (from `90-evaluators-generated`):

  ```json
  {"progress_id": "d05c27c4-ebb4-4e83-86fb-32e97f45d11d", "session_id": 3443}
  ```

##### GET `/test_framework/v1/scenarios/tags/`

- Host: `backend.example.com`
- Statuses seen: `200` (6)
- Screens: `104-test-profile-create`, `106-results-02-filters`, `107-runs-overview-04-filters`, `83-evaluators-filters`, `85-evaluators-generate-dialog`, `89-evaluators-generate-additional-config`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `104-test-profile-create`):

  ```json
  ["booking", "callback", "junk call", "... (1 more items)"]
  ```

##### GET `/test_framework/v1/scenarios/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `101b-evaluator-detail-api`, `104-test-profile-create`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `101b-evaluator-detail-api`):

  ```json
  {"id": 401833, "name": "Returning patient moves dental appointment after date correction", "agent": 26242, "project": 13875, "personality": 693, "personality_name": "Normal Male", "agent_name": "zz-spec-test-agent", "tags": [], "tool_ids": ["VAPI_TOOL_END_CALL"], "metric_names": ["AI interrupting user", "Average Pitch (in Hz)", "Expected Outcome", "... (14 more items)"], "outbound_phone_number_data": null, "first_message": "", "...": "(22 more keys)"}
  ```

##### GET `/test_framework/v1/scenarios/{id}/condition-audio/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `101b-evaluator-detail-api`, `104-test-profile-create`
- Query parameters: none
- Response example, status `200` (from `101b-evaluator-detail-api`):

  ```json
  []
  ```

##### GET `/test_framework/v1/test-profiles/`

- Host: `backend.example.com`
- Statuses seen: `200` (10)
- Screens: `101b-evaluator-detail-api`, `103-evaluator-create-manual`, `104-test-profile-create`, `105-test-profile-created`, `145-cleanup-test-profile-62342`, `145-cleanup-test-profile-62345`, `145-cleanup-test-profile-62347`, `82-evaluators-test-profiles`, `98-evaluators-run-dialog-more-fields`
- Query parameters:
  - `project_id`: `13875`
  - `page`: `1`
  - `page_size`: `200`, `50`
  - `ql` values (verbatim):
    - `{id,name}`
    - `{id,name,agent,agent_name,information,created_at,created_by,last_updated_by,updated_at,scenarios}`
  - `search`: `Default+Test+Profile`
  - `agent_id`: `26242`, `22757`
- Response example, status `200` (from `101b-evaluator-detail-api`):

  ```json
  {"count": 1, "next": null, "previous": null, "results": [{"id": 62342, "name": "Default Test Profile - zz-spec-test-agent (26242)"}]}
  ```

##### POST `/test_framework/v1/test-profiles/`

- Host: `backend.example.com`
- Statuses seen: `201` (1)
- Screens: `105-test-profile-created`
- Query parameters: none
- Request example (from `105-test-profile-created`):

  ```json
  {"name": "zz-spec-test-profile", "information": {"main_agent_variables": {"caller_id": "+15550001111"}, "testing_agent_variables": {"patientName": "Jane Test"}}, "project": 13875, "agent": 26242}
  ```
- Response example, status `201` (from `105-test-profile-created`):

  ```json
  {"id": 62347, "project": 13875, "agent": 26242, "agent_name": "zz-spec-test-agent", "name": "zz-spec-test-profile", "information": {"main_agent_variables": {"caller_id": "+15550001111"}, "testing_agent_variables": {"patientName": "Jane Test"}}, "created_by": 9855, "last_updated_by": 9855, "created_at": "2026-10-23T19:55:34.597857Z", "updated_at": "2026-10-23T19:55:34.597872Z"}
  ```

##### DELETE `/test_framework/v1/test-profiles/{id}`

- Host: `backend.example.com`
- Statuses seen: `204` (3)
- Screens: `145-cleanup-test-profile-62342`, `145-cleanup-test-profile-62345`, `145-cleanup-test-profile-62347`
- Query parameters: none
- Response: no body (`204`).

##### GET `/test_framework/v1/test-profiles/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (6)
- Screens: `101b-evaluator-detail-api`, `103-evaluator-create-manual`, `104-test-profile-create`
- Query parameters:
  - `project_id`: `13875`
  - `ql` values (verbatim):
    - `{id,name,agent,agent_name,information,project}`
    - `{id,name,agent,project}`
- Response example, status `200` (from `101b-evaluator-detail-api`):

  ```json
  {"id": 62345, "project": 13875, "agent": 26242, "agent_name": "zz-spec-test-agent", "name": "test_profile_agent_26242_1792785047258", "information": {"main_agent_variables": {"patientName": "Sarah Mitchell"}, "testing_agent_variables": {"patientName": "Sarah Mitchell", "phone_number": "555-014-2233", "selected_slot": "09:00", "new_appointment_date": "2026-11-01", "current_appointment_date": "2026-10-25", "incorrect_appointment_date": "2026-10-20"}}}
  ```

##### GET `/test_framework/v1/tools`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `29-agent-detail-all-sections-open`, `33c-agent-mock-tool-created`, `34c-agent-dynamic-variables-saved`, `36-agent-kb-file-uploaded`
- Query parameters:
  - `agent_id`: `26242`
  - `page`: `1`
  - `page_size`: `50`
- Response example, status `200` (from `29-agent-detail-all-sections-open`):

  ```json
  {"count": 0, "next": null, "previous": null, "results": []}
  ```

##### GET `/test_framework/v1/views/`

- Host: `backend.example.com`
- Statuses seen: `200` (8)
- Screens: `104-test-profile-create`, `58-metric-review-sample-labels`, `94-evaluators-generated-saved`, `pages/04-metrics`, `pages/11-evaluators`, `pages/12-results`, `pages/15-calls`, `pages/17-insights`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `104-test-profile-create`):

  ```json
  {"count": 0, "next": null, "previous": null, "results": []}
  ```

##### GET `/test_framework/v2/aiagents/`

- Host: `backend.example.com`
- Statuses seen: `200` (9)
- Screens: `148-cleanup-agent`, `58-metric-review-sample-labels`, `61-labs-metric-detail`, `pages/01-agents`, `pages/04-metrics`, `pages/06-create-metric`, `pages/07-labs`, `pages/15-calls`
- Query parameters:
  - `project_id`: `13875`
  - `ql` values (verbatim):
    - `{id,name,language,description,email_id,telephony{phone_number,sip_uri,inbound},provider{type,chat_provider,chat_agent_details{type,config},credentials{api_key_configured,config}}}`
    - `{id,name,language,telephony,provider,description}`
  - `exclude_kb_files`: `true`
  - `page`: `1`
  - `page_size`: `30`
- Response example, status `200` (from `148-cleanup-agent`):

  ```json
  {"count": 1, "next": null, "previous": null, "results": [{"id": 22757, "name": "Voice Regression — E2E Deploy Agent Sq", "description": "Voice regression target managed by tests/voice-regression/provision.mjs.", "language": "en", "telephony": {"inbound": true, "phone_number": "+17027608786", "sip_uri": null}, "provider": {"type": "vapi", "agent_id": "0550eaaa-47ce-4eb8-88ab-cb91809ddb1a", "credentials": {"api_key_configured": true}, "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false, "redact_fields": [], "chat_provider": "vapi", "chat_agent_details": {"type": "vapi"}}, "email_id": null}]}
  ```

##### POST `/test_framework/v2/aiagents/`

- Host: `backend.example.com`
- Statuses seen: `201` (1), `400` (1)
- Screens: `28-agent-created`, `28b-agent-created`
- Query parameters: none
- Request example (from `28b-agent-created`):

  ```json
  {"name": "zz-spec-test-agent", "description": "You are a receptionist for a dental clinic. You book, move, and cancel appoin...", "language": "en", "telephony": {"inbound": true}, "provider": {"type": "custom", "agent_id": null, "chat_agent_details": {"type": "", "config": {"url": "", "websocket_secret": ""}}, "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false}, "email_id": "zz-spec-test-agent@example.invalid", "project": 13875}
  ```
- Response example, status `201` (from `28b-agent-created`):

  ```json
  {"id": 26242, "name": "zz-spec-test-agent", "description": "You are a receptionist for a dental clinic. You book, move, and cancel appoin...", "project": 13875, "language": "en", "telephony": {"inbound": true, "phone_number": null, "sip_uri": null}, "provider": {"type": "custom", "send_post_conversation_metadata": false, "redact_fields": []}, "agent_speaks_first": null, "knowledge_base_files": [], "enabled_personalities": [693], "webhook_url": "", "webhook_secret_configured": false, "...": "(7 more keys)"}
  ```
- Response example, status `400` (from `28-agent-created`):

  ```json
  {"non_field_errors": ["At least one configuration method must be provided: contact_number, sip_endpoint, email_id, assistant_provider (with required fields: websocket_url for self_hosted, assistant_id + api_key for vapi/retell/elevenlabs, contact_number for sms), transcript_provider set to livekit (with livekit_api_key and livekit_data), transcript_provider set to pipecat (with pipecat_api_key and pipecat_data), or transcript_provider set to retell (with retell_api_key)."]}
  ```

##### POST `/test_framework/v2/aiagents/connections/check/`

- Host: `backend.example.com`
- Statuses seen: `200` (2), `400` (1)
- Screens: `28-agent-created`, `28b-agent-created`, `37-agent-test-connections`
- Query parameters:
  - `project_id`: `13875`
- Request example (from `28b-agent-created`):

  ```json
  {"config": {"name": "zz-spec-test-agent", "description": "You are a receptionist for a dental clinic. You book, move, and cancel appoin...", "language": "en", "telephony": {"inbound": true}, "provider": {"type": "custom", "agent_id": null, "chat_agent_details": {"type": "", "config": {"url": "", "websocket_secret": ""}}, "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false}, "email_id": "zz-spec-test-agent@example.invalid", "project": 13875}}
  ```
- Response example, status `200` (from `28b-agent-created`):

  ```json
  {"agent_id": null, "connections": [{"type": "email", "config_fingerprint": "fe688809645129e7", "configured": true, "configuration_complete": true, "testable": false, "blocked_reason": "Checked by an email evaluator: a reply can take minutes, so a short test woul...", "target": "zz-spec-test-agent@example.invalid", "docs_url": "https://docs.example.com/documentation/integrations/chat-testing", "credentials_note": null}]}
  ```
- Response example, status `400` (from `28-agent-created`):

  ```json
  {"non_field_errors": ["At least one configuration method must be provided: contact_number, sip_endpoint, email_id, assistant_provider (with required fields: websocket_url for self_hosted, assistant_id + api_key for vapi/retell/elevenlabs, contact_number for sms), transcript_provider set to livekit (with livekit_api_key and livekit_data), transcript_provider set to pipecat (with pipecat_api_key and pipecat_data), or transcript_provider set to retell (with retell_api_key)."]}
  ```

##### GET `/test_framework/v2/aiagents/integration_summary/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `104-test-profile-create`, `pages/11-evaluators`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `104-test-profile-create`):

  ```json
  {"providers": ["vapi"], "repo_backed": false}
  ```

##### GET `/test_framework/v2/aiagents/provider-assistants/`

- Host: `backend.example.com`
- Statuses seen: `400` (1)
- Screens: `38-agents-import-from-provider`
- Query parameters:
  - `project_id`: `13875`
  - `provider`: `vapi`
- Response example, status `400` (from `38-agents-import-from-provider`):

  ```json
  {"detail": "No saved vapi API key for this project. Add one under Provider API Keys.", "code": "provider_key_missing"}
  ```

##### GET `/test_framework/v2/aiagents/short_list/`

- Host: `backend.example.com`
- Statuses seen: `200` (22)
- Screens: `102-evaluator-create`, `104-test-profile-create`, `107-runs-overview-04-filters`, `108-monitors-01-create-monitor`, `109-calls-01-add-call`, `113-monitor-select-scenarios`, `116-alert-new-filled`, `147-cleanup-personality-9649`, `147-cleanup-personality-9650`, `43-metrics-row-action-a`, `44-metrics-create-view-dialog`, `59-metric-edit-created`, `77b-personality-edit-saved`, `78-personality-created`, `84-evaluators-run-from-file`, `pages/05-metric-edit`, `pages/06-create-metric`, `pages/10-personality`, `pages/16-alerts`, `pages/17-insights`, `pages/18-overview-dashboards`
- Query parameters:
  - `project_id`: `13875`
  - `ql` values (verbatim):
    - `{id,agent_name,language,agent_gives_first_message}`
- Response example, status `200` (from `102-evaluator-create`):

  ```json
  [{"id": 22757, "agent_name": "Voice Regression — E2E Deploy Agent Sq", "language": "en", "agent_gives_first_message": null}, {"id": 26242, "agent_name": "zz-spec-test-agent", "language": "en", "agent_gives_first_message": true}]
  ```

##### GET `/test_framework/v2/aiagents/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (29)
- Screens: `103-evaluator-create-manual`, `104-test-profile-create`, `113-monitor-select-scenarios`, `143-cleanup-evaluator`, `28b-agent-created`, `29-agent-detail-all-sections-open`, `33c-agent-mock-tool-created`, `34c-agent-dynamic-variables-saved`, `35-agent-save-changes-webhook`, `36-agent-kb-file-uploaded`, `89-evaluators-generate-additional-config`, `96-evaluators-actions-menu`, `pages/02-agent-detail`
- Query parameters:
  - `ql` values (verbatim):
    - `{id,mock_tools,mock_tools_enabled,mock_tools_provider}`
    - `{id,name,email_id,mock_tools,mock_tools_enabled,telephony{phone_number,sip_uri,inbound,websocket_url},provider{type,agent_id,chat_provider,auto_dial_outbound,chat_agent_details{type,config},credentials{config}}}`
    - `{-knowledge_base_files}`
    - `{id,knowledge_base_files}`
    - `{id,dynamic_variables}`
- Response example, status `200` (from `103-evaluator-create-manual`):

  ```json
  {"id": 22757, "name": "Voice Regression — E2E Deploy Agent Sq", "description": "Voice regression target managed by tests/voice-regression/provision.mjs.", "project": 13875, "language": "en", "telephony": {"inbound": true, "phone_number": "+17027608786", "sip_uri": null}, "provider": {"type": "vapi", "agent_id": "0550eaaa-47ce-4eb8-88ab-cb91809ddb1a", "credentials": {"api_key_configured": true}, "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false, "redact_fields": [], "chat_provider": "vapi", "chat_agent_details": {"type": "vapi"}}, "agent_speaks_first": null, "knowledge_base_files": [], "enabled_personalities": [693], "webhook_url": "", "webhook_secret_configured": false, "...": "(7 more keys)"}
  ```

##### PATCH `/test_framework/v2/aiagents/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `33c-agent-mock-tool-created`, `34c-agent-dynamic-variables-saved`, `35-agent-save-changes-webhook`, `36-agent-kb-file-uploaded`
- Query parameters: none
- Request example (from `33c-agent-mock-tool-created`):

  ```json
  {"mock_tools": [{"name": "zz_spec_test_check_availability", "description": "Test mock tool for a specification.", "mock_data": [{"input": "{...}", "output": "{...}"}, {"input": "{...}", "output": "{...}", "response": "{...}"}]}]}
  ```
- Response example, status `200` (from `33c-agent-mock-tool-created`):

  ```json
  {"id": 26242, "name": "zz-spec-test-agent", "description": "You are a receptionist for a dental clinic. You book, move, and cancel appoin...", "project": 13875, "language": "en", "telephony": {"inbound": true, "phone_number": null, "sip_uri": null}, "provider": {"type": "custom", "send_post_conversation_metadata": false, "redact_fields": []}, "agent_speaks_first": null, "knowledge_base_files": [], "enabled_personalities": [693], "webhook_url": "", "webhook_secret_configured": false, "...": "(7 more keys)"}
  ```

##### DELETE `/test_framework/v2/aiagents/{id}/`

- Host: `backend.example.com`
- Statuses seen: `204` (1)
- Screens: `148-cleanup-agent`
- Query parameters:
  - `delete_related`: `true`
- Response: no body (`204`).

##### GET `/test_framework/v2/metrics/`

- Host: `backend.example.com`
- Statuses seen: `200` (17)
- Screens: `110-alerts-01-new-alert`, `112-dashboards-01-add-plot`, `116-alert-new-filled`, `146-cleanup-metric-272071`, `146-cleanup-metric-272072`, `42-metrics-predefined-dialog`, `45-metrics-generated`, `49-create-metric-detail-mode`, `57-create-metric-created`, `58-metric-review-sample-labels`, `59-metric-edit-created`, `62-rubric`, `pages/04-metrics`, `pages/07-labs`, `pages/08-rubric`, `pages/16-alerts`
- Query parameters:
  - `project_id`: `13875`
  - `ql` values (verbatim):
    - `{id,name,type,description,function_name,eval_type,enum_values,vocera_defined_metric_code,overall_score,total_score}`
    - `{id,project,name,description,function_name,type,eval_type,observability_enabled,simulation_enabled,sampling_enabled,sample_rate,evaluation_trigger,vocera_defined_metric_code,configuration,add_to_new_agents,dependencies,dependents}`
    - `{id,name,slug,type,vocera_defined_metric_code,simulation_enabled,observability_enabled}`
  - `include_scores`: `true`
- Response example, status `200` (from `110-alerts-01-new-alert`):

  ```json
  [{"id": 240898, "name": "AI interrupting user", "description": "Tells if the AI (main agent) interrupted user (testing agent) during the inte...", "function_name": "get_main_agent_interruption", "type": "custom_code", "eval_type": "numeric", "enum_values": [], "vocera_defined_metric_code": "ec29cab5", "overall_score": 0, "total_score": 0, "user_defined": false}, {"id": 240899, "name": "Average Pitch (in Hz)", "description": "Returns the average pitch of the AI Agent (Main agent) during the call in Hz", "function_name": "get_average_pitch", "type": "llm_judge", "eval_type": "numeric", "enum_values": [], "vocera_defined_metric_code": "944867cb", "overall_score": 0, "total_score": 0, "user_defined": false}, "... (15 more items)"]
  ```

##### POST `/test_framework/v2/metrics/`

- Host: `backend.example.com`
- Statuses seen: `201` (1)
- Screens: `57-create-metric-created`
- Query parameters: none
- Request example (from `57-create-metric-created`):

  ```json
  {"type": "llm_judge", "name": "zz-spec-test-metric", "slug": "zzspectestmetric_vb3", "description": "This metric passes if the main agent confirms the name and phone number of th...", "eval_type": "binary", "prompt_enabled": false, "audio_enabled": false, "evaluation_trigger": "always", "evaluation_trigger_prompt": "", "trigger_type": "llm_judge", "custom_code": "", "agents": [22757, 26242], "...": "(1 more keys)"}
  ```
- Response example, status `201` (from `57-create-metric-created`):

  ```json
  {"id": 272072, "slug": "zzspectestmetric_vb3", "project": 13875, "agent": null, "agents": [22757, 26242], "name": "zz-spec-test-metric", "description": "This metric passes if the main agent confirms the name and phone number of th...", "type": "llm_judge", "eval_type": "binary", "audio_enabled": false, "observability_enabled": true, "simulation_enabled": true, "...": "(34 more keys)"}
  ```

##### GET `/test_framework/v2/metrics/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `43-metrics-row-action-a`, `59-metric-edit-created`, `61-labs-metric-detail`, `pages/05-metric-edit`
- Query parameters: none
- Response example, status `200` (from `43-metrics-row-action-a`):

  ```json
  {"id": 243607, "slug": null, "project": 13875, "agent": null, "agents": [22757, 26242], "name": "Persona Integrity", "description": "Score TRUE if the agent maintained a single consistent persona for the entire...", "type": "llm_judge", "eval_type": "binary", "enum_values": [], "audio_enabled": false, "prompt": "", "...": "(34 more keys)"}
  ```

##### GET `/test_framework/v2/results/`

- Host: `backend.example.com`
- Statuses seen: `200` (28)
- Screens: `102-evaluator-create`, `104-test-profile-create`, `113-monitor-select-scenarios`, `116-alert-new-filled`, `58-metric-review-sample-labels`, `59-metric-edit-created`, `62-rubric`, `75-personality-create`, `pages/01-agents`, `pages/02-agent-detail`, `pages/03-agent-new`, `pages/04-metrics`, `pages/05-metric-edit`, `pages/06-create-metric`, `pages/07-labs`, `pages/08-rubric`, `pages/09-assistant`, `pages/10-personality`, `pages/11-evaluators`, `pages/12-results`, `pages/13-runs-overview`, `pages/14-monitors`, `pages/15-calls`, `pages/16-alerts`, `pages/17-insights`, `pages/18-overview-dashboards`
- Query parameters:
  - `page`: `1`
  - `page_size`: `1`, `30`
  - `ql` values (verbatim):
    - `{id,name,agent,agent_name,agent_version,status,success_rate,run_as_text,run_type,scenarios,total_runs_count,completed_runs_count,created_at}`
  - `project_id`: `13875`
- Response example, status `200` (from `102-evaluator-create`):

  ```json
  {"next": null, "previous": null, "results": []}
  ```

##### GET `/test_framework/v2/runs/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `106-results-01-runs`
- Query parameters:
  - `project_id`: `13875`
  - `page`: `1`
  - `page_size`: `30`
  - `ql` values (verbatim):
    - `{id,result_id,scenario,scenario_name,personality,personality_name,agent,agent_name,agent_version,duration,status,evaluation_status,expected_outcome{score},success,timestamp,executed_at,metadata{ended_reason,ringing_duration,call_started_at},outbound_number,inbound_number,metrics,error_message,test_profile_name,run_type,feedback}`
- Response example, status `200` (from `106-results-01-runs`):

  ```json
  {"next": null, "previous": null, "results": []}
  ```

##### GET `/test_framework/v2/scenarios/{id}/history/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `101b-evaluator-detail-api`, `104-test-profile-create`
- Query parameters:
  - `page`: `1`
  - `page_size`: `14`
- Response example, status `200` (from `101b-evaluator-detail-api`):

  ```json
  {"count": 2, "next": null, "previous": null, "results": [{"history_id": 1136272, "history_date": "2026-10-23T19:50:47.274492Z", "history_type": "~", "history_change_reason": null, "history_user": null, "version_id": "v2", "version_name": null, "metrics_snapshot": [240898, 240899, 240900, "... (14 more items)"], "id": 401833, "name": "Returning patient moves dental appointment after date correction", "project": 13875, "agent": 26242, "...": "(19 more keys)"}, {"history_id": 1136271, "history_date": "2026-10-23T19:50:47.143163Z", "history_type": "+", "history_change_reason": null, "history_user": null, "version_id": "v1", "version_name": null, "metrics_snapshot": [], "id": 401833, "name": "Returning patient moves dental appointment after date correction", "project": 13875, "agent": 26242, "...": "(19 more keys)"}]}
  ```

#### Observability (calls, alerts, insights) — `/observability`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/observability/v1/agent-improvement-sessions/` | 200 (21) | 21 |
| GET | `/observability/v1/alerts/` | 200 (4) | 4 |
| POST | `/observability/v1/alerts/` | 201 (1) | 1 |
| GET | `/observability/v1/alerts/review/` | 200 (7) | 7 |
| GET | `/observability/v1/alerts/trigger_summary/` | 200 (2) | 2 |
| DELETE | `/observability/v1/alerts/{id}/` | 204 (1) | 1 |
| GET | `/observability/v1/deep-research-insights/` | 200 (1) | 1 |
| GET | `/observability/v1/deep-research-insights/pricing/` | 200 (1) | 1 |
| GET | `/observability/v1/first-insights/` | 200 (18) | 18 |
| GET | `/observability/v1/metric-failure-mode-insights/` | 200 (1) | 1 |
| GET | `/observability/v1/metric-failure-mode-insights/categories/` | 200 (1) | 1 |
| GET | `/observability/v1/metric-failure-mode-insights/failure-rates/` | 200 (1) | 1 |
| GET | `/observability/v1/metric-failure-mode-insights/metric-config/` | 200 (1) | 1 |
| GET | `/observability/v1/metric-failure-mode-insights/pricing/` | 200 (1) | 1 |
| GET | `/observability/v2/call-logs/` | 200 (2) | 2 |

##### GET `/observability/v1/agent-improvement-sessions/`

- Host: `backend.example.com`
- Statuses seen: `200` (21)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `project`: `13875`
  - `ql` values (verbatim):
    - `{id,status,project,agent,conversation_id,created_at,metric_delta}`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  []
  ```

##### GET `/observability/v1/alerts/`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `116-alert-new-filled`, `117-alert-created`, `140-cleanup-alert`, `pages/16-alerts`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `117-alert-created`):

  ```json
  [{"id": 3639, "name": "zz-spec-test-metric · Failure", "enabled": true, "project": 13875, "source_type": "metric", "source_id": 272072, "source_object_name": "zz-spec-test-metric", "source_object_eval_type": "binary", "source": {"filters": {}, "sub_type": "normal"}, "threshold": {}, "notifications": {}, "trigger_count": 0, "...": "(4 more keys)"}]
  ```

##### POST `/observability/v1/alerts/`

- Host: `backend.example.com`
- Statuses seen: `201` (1)
- Screens: `117-alert-created`
- Query parameters:
  - `project_id`: `13875`
- Request example (from `117-alert-created`):

  ```json
  {"name": "zz-spec-test-metric · Failure", "enabled": true, "project": 13875, "source_type": "metric", "source_id": 272072, "source": {"sub_type": "normal", "filters": {}}, "threshold": {}, "notifications": {}}
  ```
- Response example, status `201` (from `117-alert-created`):

  ```json
  {"id": 3639, "name": "zz-spec-test-metric · Failure", "enabled": true, "project": 13875, "source_type": "metric", "source_id": 272072, "source": {"sub_type": "normal", "filters": {}}, "threshold": {}, "notifications": {}}
  ```

##### GET `/observability/v1/alerts/review/`

- Host: `backend.example.com`
- Statuses seen: `200` (7)
- Screens: `110-alerts-02-7d`, `116-alert-new-filled`, `117-alert-created`, `pages/16-alerts`
- Query parameters:
  - `project_id`: `13875`
  - `hours`: `336`, `168`, `24`, `48`
  - `page`: `1`
  - `page_size`: `50`
- Response example, status `200` (from `110-alerts-02-7d`):

  ```json
  {"summary": {"total_fires": 0, "unique_alerts": 0, "top_alert": null}, "timeline": [], "timeline_top_alerts": [], "timeline_other_counts": [], "alerts": [], "pagination": {"page": 1, "page_size": 50, "total_alerts": 0, "has_next": false}}
  ```

##### GET `/observability/v1/alerts/trigger_summary/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `116-alert-new-filled`, `pages/16-alerts`
- Query parameters:
  - `project_id`: `13875`
  - `hours`: `24`
- Response example, status `200` (from `116-alert-new-filled`):

  ```json
  {}
  ```

##### DELETE `/observability/v1/alerts/{id}/`

- Host: `backend.example.com`
- Statuses seen: `204` (1)
- Screens: `140-cleanup-alert`
- Query parameters:
  - `project_id`: `13875`
- Response: no body (`204`).

##### GET `/observability/v1/deep-research-insights/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/17-insights`
- Query parameters:
  - `project`: `13875`
- Response example, status `200` (from `pages/17-insights`):

  ```json
  []
  ```

##### GET `/observability/v1/deep-research-insights/pricing/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/17-insights`
- Query parameters:
  - `project`: `13875`
- Response example, status `200` (from `pages/17-insights`):

  ```json
  {"deep_research_cost": 20.0, "deep_research_enabled": false}
  ```

##### GET `/observability/v1/first-insights/`

- Host: `backend.example.com`
- Statuses seen: `200` (18)
- Screens: `crawl1.json` pages `01-agents`, `02-agent-detail`, `03-agent-new`, `04-metrics`, `05-metric-edit`, `06-create-metric`, `07-labs`, `08-rubric`, `09-assistant`, `10-personality`, `11-evaluators`, `12-results`, `13-runs-overview`, `14-monitors`, `15-calls`, `16-alerts`, `17-insights`, `18-overview-dashboards`
- Query parameters:
  - `project`: `13875`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  []
  ```

##### GET `/observability/v1/metric-failure-mode-insights/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/17-insights`
- Query parameters:
  - `project`: `13875`
  - `latest_only`: `1`
- Response example, status `200` (from `pages/17-insights`):

  ```json
  []
  ```

##### GET `/observability/v1/metric-failure-mode-insights/categories/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/17-insights`
- Query parameters:
  - `project`: `13875`
  - `date_from`: `2026-10-22T19:08:09.226Z`
  - `date_to`: `2026-10-23T19:08:09.226Z`
- Response example, status `200` (from `pages/17-insights`):

  ```json
  []
  ```

##### GET `/observability/v1/metric-failure-mode-insights/failure-rates/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/17-insights`
- Query parameters:
  - `project`: `13875`
  - `date_from`: `2026-10-22T19:08:09.226Z`
  - `date_to`: `2026-10-23T19:08:09.226Z`
- Response example, status `200` (from `pages/17-insights`):

  ```json
  []
  ```

##### GET `/observability/v1/metric-failure-mode-insights/metric-config/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/17-insights`
- Query parameters:
  - `project`: `13875`
- Response example, status `200` (from `pages/17-insights`):

  ```text
  {"metrics":[{"metric":240898,"metric_name":"AI interrupting user","eval_type":"numeric","type":"custom_code","function_name":"get_main_agent_interruption","enum_values":[],"user_defined":false,"evaluation_trigger":"always","display_order":1,"insight_enabled":false,"pass_conditions":null,"default_pas ... (the body is not complete JSON in the capture: it stops after 2500 characters)
  ```

##### GET `/observability/v1/metric-failure-mode-insights/pricing/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `pages/17-insights`
- Query parameters:
  - `project`: `13875`
- Response example, status `200` (from `pages/17-insights`):

  ```json
  {"insight_generation_cost": 10.0, "metric_triage_cost": 0.4, "triage_daily_cap_per_metric": 100, "triage_daily_budget_per_metric": 10.0}
  ```

##### GET `/observability/v2/call-logs/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `pages/15-calls`
- Query parameters:
  - `page_size`: `1`, `30`
  - `ql` values (verbatim):
    - `{id}`
    - `{-transcript,-transcript_object,-evaluation}`
  - `project_id`: `13875`
  - `page`: `1`
  - `filters_v2`: `{"operator":"and","conditions":[{"field":"timestamp","op":"gte","value":"2026-09-23T19:07:24.457Z"}]}`
- Response example, status `200` (from `pages/15-calls`):

  ```json
  {"next": null, "previous": null, "results": []}
  ```

#### Schedules (monitors) — `/schedules`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/schedules/v1/cron-jobs/` | 200 (3) | 3 |
| POST | `/schedules/v1/cron-jobs/` | 400 (2) | 2 |
| GET | `/schedules/v1/metric-optimiser-cron-jobs/` | 200 (1) | 1 |

##### GET `/schedules/v1/cron-jobs/`

- Host: `backend.example.com`
- Statuses seen: `200` (3)
- Screens: `107-runs-overview-04-filters`, `113-monitor-select-scenarios`, `pages/14-monitors`
- Query parameters:
  - `project_id`: `13875`
  - `ql` values (verbatim):
    - `{id,name,agent,scenario_ids,scenarios_data{id,name},crontab_expression,timezone,frequency,execution_mode,personalities,concurrency_limit,is_active,created_at,run_settings}`
- Response example, status `200` (from `107-runs-overview-04-filters`):

  ```json
  []
  ```

##### POST `/schedules/v1/cron-jobs/`

- Host: `backend.example.com`
- Statuses seen: `400` (2)
- Screens: `115-monitor-created`, `115b-monitor-created-text`
- Query parameters:
  - `project_id`: `13875`
- Request example (from `115-monitor-created`):

  ```json
  {"agent": "26242", "scenarios": [401833], "crontab_expression": "0 2 * * 0", "timezone": "Europe/Paris", "frequency": 1, "name": "zz-spec-test-monitor", "execution_mode": "voice", "concurrency_limit": null, "run_settings": {}}
  ```
- Response example, status `400` (from `115-monitor-created`):

  ```json
  {"non_field_errors": ["Agent must have a contact number configured to run voice calls. Please configure the contact number in agent settings."]}
  ```

##### GET `/schedules/v1/metric-optimiser-cron-jobs/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `122-settings-07-project-general`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `122-settings-07-project-general`):

  ```json
  []
  ```

#### Dashboards and plots — `/dashboards`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/dashboards/dashboards/` | 200 (5) | 5 |
| GET | `/dashboards/dashboards/predefined_widgets/` | 200 (1) | 1 |
| POST | `/dashboards/dashboards/{id}/bulk_widgets/` | 200 (2) | 2 |
| GET | `/dashboards/widgets/` | 200 (6) | 6 |
| POST | `/dashboards/widgets/preview_data/` | 200 (1) | 1 |
| GET | `/dashboards/widgets/{id}/data/` | 200 (38), 404 (1) | 39 |

##### GET `/dashboards/dashboards/`

- Host: `backend.example.com`
- Statuses seen: `200` (5)
- Screens: `107-runs-overview-06-try-dashboards`, `122-settings-08-project-integrations`, `pages/18-overview-dashboards`
- Query parameters:
  - `project_id`: `13875`
  - `source`: `runs`, `call_logs`
  - `page_size`: `1`
- Response example, status `200` (from `107-runs-overview-06-try-dashboards`):

  ```json
  {"count": 1, "next": null, "previous": null, "results": [{"id": 16300, "name": "Runs Overview", "project": 13875, "source": "runs", "is_default": true, "filters": {"operator": "and", "conditions": ["{...}", "{...}"]}, "widget_count": 14, "created_at": "2026-10-23T20:00:43.972710Z", "updated_at": "2026-10-23T20:00:43.972726Z"}]}
  ```

##### GET `/dashboards/dashboards/predefined_widgets/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `112-dashboards-01-add-plot`
- Query parameters:
  - `project_id`: `13875`
  - `source`: `call_logs`
- Response example, status `200` (from `112-dashboards-01-add-plot`):

  ```json
  [{"name": "Overview Stats", "field": "", "chart_type": "stat", "description": "KPI header with calls, duration, success rate, latency", "icon": "Activity"}, {"name": "Success Rate", "field": "success", "chart_type": "bar", "time_period": "hour", "aggregation_function": "avg", "description": "Success/failure bar chart", "icon": "BarChart", "metadata": {"display_aggregation": "count", "is_binary_count_mode": true}}, "... (1 more items)"]
  ```

##### POST `/dashboards/dashboards/{id}/bulk_widgets/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `120-dashboard-saved`, `141-cleanup-widget`
- Query parameters: none
- Request example (from `120-dashboard-saved`):

  ```json
  {"create": [{"name": "Success Rate", "field": "success", "chart_type": "bar", "time_period": "hour", "aggregation_function": "avg", "filters": {"operator": "and", "conditions": ["{...}"]}, "group_by": null, "metadata": {"display_aggregation": "count", "is_binary_count_mode": true, "sort_position": 7}}], "update": [], "delete": []}
  ```
- Response example, status `200` (from `120-dashboard-saved`):

  ```json
  {"created": [{"id": 108647, "dashboard": 13682, "name": "Success Rate", "filters": {"operator": "and", "conditions": ["{...}"]}, "effective_filters": {"operator": "and", "conditions": ["{...}", "{...}"]}, "chart_type": "bar", "data_type": "", "field": "success", "metric": null, "metric_name": null, "time_period": "hour", "aggregation_function": "avg", "...": "(4 more keys)"}], "updated": [], "deleted": []}
  ```

##### GET `/dashboards/widgets/`

- Host: `backend.example.com`
- Statuses seen: `200` (6)
- Screens: `107-runs-overview-06-try-dashboards`, `120-dashboard-saved`, `141-cleanup-widget`, `pages/18-overview-dashboards`
- Query parameters:
  - `dashboard_id`: `16300`, `13682`
  - `page_size`: `40`
- Response example, status `200` (from `107-runs-overview-06-try-dashboards`):

  ```json
  {"count": 14, "next": null, "previous": null, "results": [{"id": 108646, "dashboard": 16300, "name": "Persona Integrity", "filters": {"operator": "and", "conditions": ["..."]}, "effective_filters": {"operator": "and", "conditions": ["..."]}, "chart_type": "bar", "data_type": "", "field": "metric_evaluations.value", "metric": 243607, "metric_name": "Persona Integrity", "...": "(6 more keys)"}, "... (13 more items)"]}
  ```

##### POST `/dashboards/widgets/preview_data/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `119-dashboard-plot-created`
- Query parameters:
  - `timezone`: `Europe/Paris`
- Request example (from `119-dashboard-plot-created`):

  ```json
  {"dashboard": 13682, "field": "success", "chart_type": "bar", "dashboard_filters": {"operator": "and", "conditions": [{"field": "timestamp", "op": "gte", "value": "now-7d"}, {"field": "timestamp", "op": "lte", "value": "now"}]}, "time_period": "hour", "aggregation_function": "avg"}
  ```
- Response example, status `200` (from `119-dashboard-plot-created`):

  ```json
  {"widget_id": null, "field_name": "success", "chart_type": "bar", "data": [], "aggregation_function": "avg", "time_period": "hour", "group_by": null, "can_group_by": true, "metadata": {"display_name": "Success", "data_type": "boolean", "filter_value": null}}
  ```

##### GET `/dashboards/widgets/{id}/data/`

- Host: `backend.example.com`
- Statuses seen: `200` (38), `404` (1)
- Screens: `107-runs-overview-06-try-dashboards`, `120-dashboard-saved`, `121-dashboard-widget-menu-a`, `141-cleanup-widget`, `pages/18-overview-dashboards`
- Query parameters:
  - `timezone`: `Europe/Paris`
- Response example, status `200` (from `107-runs-overview-06-try-dashboards`):

  ```json
  {"widget_id": 108636, "field_name": "metric_evaluations.value", "chart_type": "bar", "data": [], "aggregation_function": "avg", "time_period": "day", "group_by": null, "can_group_by": true, "metadata": {"display_name": "Metric Evaluation", "data_type": "numeric", "filter_value": 240900}}
  ```
- Response example, status `404` (from `141-cleanup-widget`):

  ```json
  {"detail": "No Widget matches the given query."}
  ```

#### Product chat (Assistant) — `/app`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/app/v1/product-chat/commands/` | 200 (1) | 1 |
| DELETE | `/app/v1/product-chat/sessions/{id}/` | 200 (1) | 1 |
| GET | `/app/v2/product-chat/conversations/` | 200 (21) | 21 |
| POST | `/app/v2/product-chat/conversations/` | 201 (1) | 1 |
| GET | `/app/v2/product-chat/conversations/pending-optimizer-count/` | 200 (18) | 18 |
| POST | `/app/v2/product-chat/conversations/{id}/messages/` | 201 (3) | 3 |
| GET | `/app/v2/product-chat/conversations/{id}/status/` | 200 (1) | 1 |
| GET | `/app/v2/product-chat/conversations/{id}/stream-token/` | 409 (1) | 1 |
| GET | `/app/v2/product-chat/org-mcp-servers/` | 200 (2) | 2 |
| GET | `/app/v2/product-chat/org-skills/` | 200 (1) | 1 |
| GET | `/app/v2/product-chat/project-knowledge/instructions/` | 200 (1) | 1 |
| GET | `/app/v2/product-chat/reports/` | 200 (5) | 5 |

##### GET `/app/v1/product-chat/commands/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `63-assistant-slash-commands`
- Query parameters: none
- Response example, status `200` (from `63-assistant-slash-commands`):

  ```json
  {"commands": [], "cached_at": null}
  ```

##### DELETE `/app/v1/product-chat/sessions/{id}/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `142-cleanup-conversation`
- Query parameters: none
- Response example, status `200` (from `142-cleanup-conversation`):

  ```json
  {"status": "deleted"}
  ```

##### GET `/app/v2/product-chat/conversations/`

- Host: `backend.example.com`
- Statuses seen: `200` (21)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `limit`: `50`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  []
  ```

##### POST `/app/v2/product-chat/conversations/`

- Host: `backend.example.com`
- Statuses seen: `201` (1)
- Screens: `68-assistant-chat-report-question`
- Query parameters: none
- Request example (from `68-assistant-chat-report-question`):

  ```json
  {"name": "Use the results-report skill to make a report", "project_id": 13875}
  ```
- Response example, status `201` (from `68-assistant-chat-report-question`):

  ```json
  {"id": "60fcfa97-d396-434a-8048-e7ba80b8da17", "name": "Use the results-report skill to make a report", "source": "web", "updated_at": "2026-10-23T19:37:53.039736Z", "mode": "general", "workflow_id": "", "workflow_variant": "", "improvement_session_id": null, "improvement_session_project_id": null, "page_context": {}, "active_status": null, "optimizer_question_pending": false, "...": "(7 more keys)"}
  ```

##### GET `/app/v2/product-chat/conversations/pending-optimizer-count/`

- Host: `backend.example.com`
- Statuses seen: `200` (18)
- Screens: `crawl1.json` pages `01-agents`, `02-agent-detail`, `03-agent-new`, `04-metrics`, `05-metric-edit`, `06-create-metric`, `07-labs`, `08-rubric`, `09-assistant`, `10-personality`, `11-evaluators`, `12-results`, `13-runs-overview`, `14-monitors`, `15-calls`, `16-alerts`, `17-insights`, `18-overview-dashboards`
- Query parameters: none
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  {"count": 0}
  ```

##### POST `/app/v2/product-chat/conversations/{id}/messages/`

- Host: `backend.example.com`
- Statuses seen: `201` (3)
- Screens: `68-assistant-chat-report-question`, `71-assistant-chat-answer-sent`, `72-assistant-chat-tool-use`
- Query parameters: none
- Request example (from `68-assistant-chat-report-question`):

  ```json
  {"message": "Use the results-report skill to make a report of all my agents' test r...", "project_id": 13875}
  ```
- Response example, status `201` (from `68-assistant-chat-report-question`):

  ```json
  {"message_id": "d6500af4-5e73-4457-8f07-e21de8edd3ca", "stream_url": "https://assistant.example.com/agent/v1/stream/d6500af4-5e73-4457-8f07-e21de8edd3ca", "stream_token": "<redacted-jwt>"}
  ```

##### GET `/app/v2/product-chat/conversations/{id}/status/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `68-assistant-chat-report-question`
- Query parameters: none
- Response example, status `200` (from `68-assistant-chat-report-question`):

  ```json
  {"conversation_id": "60fcfa97-d396-434a-8048-e7ba80b8da17", "active_message": null, "workflow_id": "", "workflow_variant": "", "workflow_state": {}, "page_context": {}}
  ```

##### GET `/app/v2/product-chat/conversations/{id}/stream-token/`

- Host: `backend.example.com`
- Statuses seen: `409` (1)
- Screens: `68-assistant-chat-report-question`
- Query parameters: none
- Response example, status `409` (from `68-assistant-chat-report-question`):

  ```json
  {"detail": "No response is currently streaming in this conversation.", "code": "no_active_stream"}
  ```

##### GET `/app/v2/product-chat/org-mcp-servers/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `122-settings-05-org-agent-config`, `68-assistant-chat-report-question`
- Query parameters: none
- Response example, status `200` (from `122-settings-05-org-agent-config`):

  ```json
  []
  ```

##### GET `/app/v2/product-chat/org-skills/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `68-assistant-chat-report-question`
- Query parameters: none
- Response example, status `200` (from `68-assistant-chat-report-question`):

  ```json
  []
  ```

##### GET `/app/v2/product-chat/project-knowledge/instructions/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `122-settings-11-project-agent-knowledge`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `122-settings-11-project-agent-knowledge`):

  ```json
  {"content": "", "exists": false}
  ```

##### GET `/app/v2/product-chat/reports/`

- Host: `backend.example.com`
- Statuses seen: `200` (5)
- Screens: `64-assistant-reports-tab`, `68-assistant-chat-report-question`, `pages/09-assistant`
- Query parameters:
  - `limit`: `50`
- Response example, status `200` (from `64-assistant-reports-tab`):

  ```json
  []
  ```

#### Notifications — `/notifications`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/notifications/v1/notifications/` | 200 (1) | 1 |
| GET | `/notifications/v1/notifications/unread_count/` | 200 (20) | 20 |

##### GET `/notifications/v1/notifications/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `126-header-notifications`
- Query parameters:
  - `page`: `1`
  - `ql` values (verbatim):
    - `{id,title,body,severity,is_read,deep_link,created_at,event_type}`
- Response example, status `200` (from `126-header-notifications`):

  ```json
  {"next": null, "previous": null, "results": [{"id": 8970, "event_type": "scenario_generation_complete", "title": "Scenarios generated", "body": "1 scenario for 'zz-spec-test-agent' is ready. Open to review and accept.", "deep_link": "/test-case?reopenSheet=true&progressId=09fef315-372a-41a9-9ee8-4948dcf6cd82", "severity": "success", "is_read": false, "created_at": "2026-10-23T19:50:47.378303Z"}, {"id": 8968, "event_type": "scenario_agent_question", "title": "Scenario assistant needs your input", "body": "Will your agent always speak first at the start of a call? (Reply 'yes' if yo...", "deep_link": "/test-case?reopenSheet=true", "severity": "success", "is_read": false, "created_at": "2026-10-23T19:48:26.225291Z"}, "... (1 more items)"]}
  ```

##### GET `/notifications/v1/notifications/unread_count/`

- Host: `backend.example.com`
- Statuses seen: `200` (20)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters: none
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  {"unread_count": 0}
  ```

#### Subscriptions — `/subscriptions`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/subscriptions/subscriptions/` | 200 (21) | 21 |
| GET | `/subscriptions/subscriptions/{id}/plan-switch-offer/` | 200 (2) | 2 |

##### GET `/subscriptions/subscriptions/`

- Host: `backend.example.com`
- Statuses seen: `200` (21)
- Screens: `crawl1.json` (all 20 first-pass pages)
- Query parameters:
  - `organization_id`: `7868`
  - `ql` values (verbatim):
    - `{-status}`
- Response example, status `200` (from `crawl1.json:01-agents`):

  ```json
  [{"id": 3017, "organization": 7868, "stripe_subscription_id": "", "is_active": true, "is_trial": false, "pack": {"id": 80, "name": "Pay As You Go", "code": "payg", "price": "30.00", "balance": "0.00", "subscription_overage": "0.05", "billing_type": "self_serve", "interval": "month", "max_members_limit": -1, "max_concurrent_runs_limit": 10, "...": "(7 more keys)"}, "next_billing_cost": 0.0, "has_payment_method": false, "is_stripe_managed": false, "can_switch_to_payg": false, "...": "(8 more keys)"}]
  ```

##### GET `/subscriptions/subscriptions/{id}/plan-switch-offer/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `122-settings-03-org-billing`, `pages/20-billing`
- Query parameters:
  - `organization_id`: `7868`
  - `pack_code`: ``
- Response example, status `200` (from `122-settings-03-org-billing`):

  ```json
  {"offer": {"current_plan": {"code": "payg", "name": "Pay As You Go", "description": "", "price": 30.0, "currency": "USD", "interval": "month", "balance": "0.00", "free_members_count": 1, "max_members_limit": -1, "max_projects_limit": 1, "max_agents_limit": -1, "max_concurrent_runs_limit": 10, "...": "(16 more keys)"}, "switch_to_plan": {"code": "startupplan", "name": "Startup Plan", "description": "", "price": 500.0, "currency": "USD", "interval": "month", "balance": "10000.00", "free_members_count": 10, "max_members_limit": 10, "max_projects_limit": 5, "max_agents_limit": -1, "max_concurrent_runs_limit": 50, "...": "(16 more keys)"}, "currency": "USD", "charged_amount": 500.0, "payg_plan": null}}
  ```

#### GitHub integration — `/github`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/github/agent-scan/sdk-pr/` | 200 (4) | 4 |
| GET | `/github/connection/` | 200 (2) | 2 |

##### GET `/github/agent-scan/sdk-pr/`

- Host: `backend.example.com`
- Statuses seen: `200` (4)
- Screens: `28b-agent-created`, `pages/02-agent-detail`
- Query parameters:
  - `agent`: `26242`, `22757`
  - `mode`: `sdk_pr`, `obs_pr`
- Response example, status `200` (from `28b-agent-created`):

  ```json
  {"exists": false}
  ```

##### GET `/github/connection/`

- Host: `backend.example.com`
- Statuses seen: `200` (2)
- Screens: `122-settings-06-org-integrations`, `68-assistant-chat-report-question`
- Query parameters: none
- Response example, status `200` (from `122-settings-06-org-integrations`):

  ```json
  {"connected": false}
  ```

#### Bitbucket integration — `/bitbucket`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/bitbucket/connection/` | 200 (1) | 1 |

##### GET `/bitbucket/connection/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `122-settings-06-org-integrations`
- Query parameters: none
- Response example, status `200` (from `122-settings-06-org-integrations`):

  ```json
  {"connected": false}
  ```

#### Slack integration — `/slack`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/slack/slack-workspaces/` | 200 (5) | 5 |

##### GET `/slack/slack-workspaces/`

- Host: `backend.example.com`
- Statuses seen: `200` (5)
- Screens: `110-alerts-01-new-alert`, `116-alert-new-filled`, `122-settings-08-project-integrations`, `pages/16-alerts`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `110-alerts-01-new-alert`):

  ```json
  []
  ```

#### Discord integration — `/discord`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/discord/servers/` | 200 (1) | 1 |

##### GET `/discord/servers/`

- Host: `backend.example.com`
- Statuses seen: `200` (1)
- Screens: `122-settings-08-project-integrations`
- Query parameters:
  - `project_id`: `13875`
- Response example, status `200` (from `122-settings-08-project-integrations`):

  ```json
  []
  ```

#### Enums — `/enums`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/enums/` | 200 (12) | 12 |

##### GET `/enums/`

- Host: `backend.example.com`
- Statuses seen: `200` (12)
- Screens: `103-evaluator-create-manual`, `104-test-profile-create`, `108-monitors-01-create-monitor`, `113-monitor-select-scenarios`, `122-settings-07-project-general`, `75-personality-create`, `pages/02-agent-detail`, `pages/03-agent-new`, `pages/10-personality`, `pages/11-evaluators`, `pages/13-runs-overview`
- Query parameters: none
- Response example, status `200` (from `103-evaluator-create-manual`):

  ```json
  {"AISummaryStatusChoices": {"Pending": "pending", "Completed": "completed", "Skipped No Failures": "skipped_no_failures"}, "ActionTypeChoices": {"Object": "object", "Run Scenarios": "run_scenarios", "Run Scenarios Text": "run_scenarios_text", "Generate Scenarios": "generate_scenarios", "Observability": "observability"}, "AgentModelChoices": {"gpt-4o": "gpt-4o", "gpt-4o-mini": "gpt-4o-mini", "gpt-4.1": "gpt-4.1", "gpt-4.1-mini": "gpt-4.1-mini", "claude-sonnet-4-5": "claude-sonnet-4-5-20250929"}, "AggregationPeriodChoices": {"Hour": "hour", "Day": "day", "Week": "week"}, "AlertSourceTypeChoices": {"Metric": "metric"}, "AlertTypeChoices": {"Alerts Disabled": "disabled", "Normal Alerts": "normal", "Significant Change Alerts": "significant_change"}, "...": "(56 more keys)"}
  ```

#### Assistant stream host (assistant.example.com) — `assistant.example.com`

| Method | Path | Statuses (count) | Calls |
|---|---|---|---|
| GET | `/agent/v1/stream/{id}` | 0 (2), 200 (2) | 4 |

##### GET `/agent/v1/stream/{id}`

- Host: `assistant.example.com`
- Statuses seen: `0` (2), `200` (2)
- Screens: `71-assistant-chat-answer-sent`, `72-assistant-chat-tool-use`
- Query parameters:
  - `token`: `<redacted-jwt>`
- Response example, status `200` (from `71-assistant-chat-answer-sent`):

  ```text
  retry: 3000
  
  id: 0
  event: status
  data: {}
  
  id: 2
  event: thinking_delta
  data: {"content":"User declined. Just acknowledge and stop."}
  
  id: 3
  event: text_delta
  data: {"content":"Under"}
  
  id: 4
  event: text_delta
  data: {"content":"stood — nothing run, nothing created. The summary"}
  
  id: 5
  event: text_delta
  data: {"content":" stands as-is: this project has no test results yet"}
  
  id: 6
  event: text_delta
  data: {"content":" for either agent, so there was nothing to report"}
  
  id: 7
  event: text_delta
  data: {"content":". Whenever you do have results, I can build the weekly"}
  
  id: 8
  event: text_delta
  data: {"content":" report then."}
  
  id: 9
  event: status
  data: {}
  
  id: 10
  event: assistant_complete
  data: 
  ... (cut for this document, full length 969 characters)
  (The capture decoded this body as cp1252. This example shows it decoded as UTF-8.)
  ```
- Response example, status `0` (from `71-assistant-chat-answer-sent`):

  ```text
  type=eventsource
  ```

### 8.6 Enums (`GET /enums/`)

The dashboard calls `GET https://backend.example.com/enums/` with no parameters. The response is one object. Each key is an enum name. Each value maps a display label to a stored value. The dashboard probably uses it to fill selects and to show labels (inferred).

Source: `103-evaluator-create-manual` (response length 13992 characters, complete JSON, not cut).

All 12 captured `/enums/` bodies have these lengths: 2500, 6000, 13992 characters.

The response holds 62 enums and 476 values.

| Enum name | Label | Value |
|---|---|---|
| `AISummaryStatusChoices` | Pending | `pending` |
| `AISummaryStatusChoices` | Completed | `completed` |
| `AISummaryStatusChoices` | Skipped No Failures | `skipped_no_failures` |
| `ActionTypeChoices` | Object | `object` |
| `ActionTypeChoices` | Run Scenarios | `run_scenarios` |
| `ActionTypeChoices` | Run Scenarios Text | `run_scenarios_text` |
| `ActionTypeChoices` | Generate Scenarios | `generate_scenarios` |
| `ActionTypeChoices` | Observability | `observability` |
| `AgentModelChoices` | gpt-4o | `gpt-4o` |
| `AgentModelChoices` | gpt-4o-mini | `gpt-4o-mini` |
| `AgentModelChoices` | gpt-4.1 | `gpt-4.1` |
| `AgentModelChoices` | gpt-4.1-mini | `gpt-4.1-mini` |
| `AgentModelChoices` | claude-sonnet-4-5 | `claude-sonnet-4-5-20250929` |
| `AggregationPeriodChoices` | Hour | `hour` |
| `AggregationPeriodChoices` | Day | `day` |
| `AggregationPeriodChoices` | Week | `week` |
| `AlertSourceTypeChoices` | Metric | `metric` |
| `AlertTypeChoices` | Alerts Disabled | `disabled` |
| `AlertTypeChoices` | Normal Alerts | `normal` |
| `AlertTypeChoices` | Significant Change Alerts | `significant_change` |
| `AssistantProviderChoices` | Vapi | `vapi` |
| `AssistantProviderChoices` | Retell | `retell` |
| `AssistantProviderChoices` | Elevenlabs | `elevenlabs` |
| `AssistantProviderChoices` | Vocera | `vocera` |
| `AssistantProviderChoices` | Sms | `sms` |
| `AssistantProviderChoices` | Whatsapp | `whatsapp` |
| `AssistantProviderChoices` | Self Hosted | `self_hosted` |
| `AssistantProviderChoices` | Agentforce | `agentforce` |
| `AssistantProviderChoices` | Cisco | `cisco` |
| `AssistantProviderChoices` | Bland | `bland` |
| `AssistantProviderChoices` | Livekit | `livekit` |
| `AssistantProviderChoices` | Pipecat | `pipecat` |
| `AssistantProviderChoices` | Synthflow | `synthflow` |
| `AssistantProviderChoices` | Agora | `agora` |
| `AssistantProviderChoices` | Koreai | `koreai` |
| `AssistantProviderChoices` | Genesys | `genesys` |
| `AssistantProviderChoices` | Amazon Connect | `amazon_connect` |
| `AssistantProviderChoices` | Telnyx | `telnyx` |
| `AssistantProviderChoices` | Sierra | `sierra` |
| `AssistantProviderChoices` | Gemini Enterprise CX | `gemini_cx` |
| `AssistantProviderChoices` | AssemblyAI | `assemblyai` |
| `AssistantProviderChoices` | Smallest AI | `smallest` |
| `BillingTypeChoices` | Subscription | `subscription` |
| `BillingTypeChoices` | Self Serve | `self_serve` |
| `CallServiceProviderChoices` | VAPI | `vapi` |
| `CallServiceProviderChoices` | Patronus | `patronus` |
| `CallStatusChoices` | Success | `success` |
| `CallStatusChoices` | Failure | `failure` |
| `CallStatusChoices` | Reviewed Success | `reviewed_success` |
| `CallStatusChoices` | Reviewed Failure | `reviewed_failure` |
| `CartesiaEmotionChoices` | Neutral | `neutral` |
| `CartesiaEmotionChoices` | Happy | `happy` |
| `CartesiaEmotionChoices` | Excited | `excited` |
| `CartesiaEmotionChoices` | Enthusiastic | `enthusiastic` |
| `CartesiaEmotionChoices` | Elated | `elated` |
| `CartesiaEmotionChoices` | Euphoric | `euphoric` |
| `CartesiaEmotionChoices` | Triumphant | `triumphant` |
| `CartesiaEmotionChoices` | Amazed | `amazed` |
| `CartesiaEmotionChoices` | Surprised | `surprised` |
| `CartesiaEmotionChoices` | Flirtatious | `flirtatious` |
| `CartesiaEmotionChoices` | Joking Comedic | `joking/comedic` |
| `CartesiaEmotionChoices` | Curious | `curious` |
| `CartesiaEmotionChoices` | Content | `content` |
| `CartesiaEmotionChoices` | Peaceful | `peaceful` |
| `CartesiaEmotionChoices` | Serene | `serene` |
| `CartesiaEmotionChoices` | Calm | `calm` |
| `CartesiaEmotionChoices` | Grateful | `grateful` |
| `CartesiaEmotionChoices` | Affectionate | `affectionate` |
| `CartesiaEmotionChoices` | Trust | `trust` |
| `CartesiaEmotionChoices` | Sympathetic | `sympathetic` |
| `CartesiaEmotionChoices` | Anticipation | `anticipation` |
| `CartesiaEmotionChoices` | Mysterious | `mysterious` |
| `CartesiaEmotionChoices` | Angry | `angry` |
| `CartesiaEmotionChoices` | Mad | `mad` |
| `CartesiaEmotionChoices` | Outraged | `outraged` |
| `CartesiaEmotionChoices` | Frustrated | `frustrated` |
| `CartesiaEmotionChoices` | Agitated | `agitated` |
| `CartesiaEmotionChoices` | Threatened | `threatened` |
| `CartesiaEmotionChoices` | Disgusted | `disgusted` |
| `CartesiaEmotionChoices` | Contempt | `contempt` |
| `CartesiaEmotionChoices` | Envious | `envious` |
| `CartesiaEmotionChoices` | Sarcastic | `sarcastic` |
| `CartesiaEmotionChoices` | Ironic | `ironic` |
| `CartesiaEmotionChoices` | Sad | `sad` |
| `CartesiaEmotionChoices` | Dejected | `dejected` |
| `CartesiaEmotionChoices` | Melancholic | `melancholic` |
| `CartesiaEmotionChoices` | Disappointed | `disappointed` |
| `CartesiaEmotionChoices` | Hurt | `hurt` |
| `CartesiaEmotionChoices` | Guilty | `guilty` |
| `CartesiaEmotionChoices` | Bored | `bored` |
| `CartesiaEmotionChoices` | Tired | `tired` |
| `CartesiaEmotionChoices` | Rejected | `rejected` |
| `CartesiaEmotionChoices` | Nostalgic | `nostalgic` |
| `CartesiaEmotionChoices` | Wistful | `wistful` |
| `CartesiaEmotionChoices` | Apologetic | `apologetic` |
| `CartesiaEmotionChoices` | Hesitant | `hesitant` |
| `CartesiaEmotionChoices` | Insecure | `insecure` |
| `CartesiaEmotionChoices` | Confused | `confused` |
| `CartesiaEmotionChoices` | Resigned | `resigned` |
| `CartesiaEmotionChoices` | Anxious | `anxious` |
| `CartesiaEmotionChoices` | Panicked | `panicked` |
| `CartesiaEmotionChoices` | Alarmed | `alarmed` |
| `CartesiaEmotionChoices` | Scared | `scared` |
| `CartesiaEmotionChoices` | Proud | `proud` |
| `CartesiaEmotionChoices` | Confident | `confident` |
| `CartesiaEmotionChoices` | Distant | `distant` |
| `CartesiaEmotionChoices` | Skeptical | `skeptical` |
| `CartesiaEmotionChoices` | Contemplative | `contemplative` |
| `CartesiaEmotionChoices` | Determined | `determined` |
| `ChartTypeChoices` | Line | `line` |
| `ChartTypeChoices` | Bar | `bar` |
| `ChartTypeChoices` | Pie | `pie` |
| `ChartTypeChoices` | Stat | `stat` |
| `ConfigurationTypeChoices` | Undefined | `undefined` |
| `ConfigurationTypeChoices` | Runs Overview | `runs_overview` |
| `CreationMethodChoices` | Manual | `manual` |
| `CreationMethodChoices` | Manual with Generate | `manual_with_generate` |
| `CreationMethodChoices` | Auto Generated | `auto_generated` |
| `CreationMethodChoices` | JSON Test Suite Spec | `json_spec` |
| `CriticalMetricPriorityChoices` | Critical | `critical` |
| `CriticalMetricPriorityChoices` | Non Critical | `non-critical` |
| `CriticalMetricPriorityChoices` | Not A Bug | `not_a_bug` |
| `CronjobLowBalanceMuteDaysChoices` | Disabled | `0` |
| `CronjobLowBalanceMuteDaysChoices` | 3 Days | `3` |
| `CronjobLowBalanceMuteDaysChoices` | 7 Days | `7` |
| `CronjobLowBalanceMuteDaysChoices` | 14 Days | `14` |
| `DashboardSourceChoices` | Call Logs | `call_logs` |
| `DashboardSourceChoices` | Runs | `runs` |
| `EvalTypeChoices` | Binary | `binary` |
| `EvalTypeChoices` | Continuous Qualitative | `continuous_qualitative` |
| `EvalTypeChoices` | Numeric | `numeric` |
| `EvalTypeChoices` | Enum | `enum` |
| `EvaluationTriggerChoices` | Always | `always` |
| `EvaluationTriggerChoices` | Automatic | `automatic` |
| `EvaluationTriggerChoices` | Custom | `custom` |
| `ExecutionModeChoices` | Voice | `voice` |
| `ExecutionModeChoices` | Text | `text` |
| `ExecutionModeChoices` | SIP | `sip` |
| `ExecutionModeChoices` | VAPI WebRTC | `vapi_webrtc` |
| `ExecutionModeChoices` | Retell WebRTC | `retell_webrtc` |
| `ExecutionModeChoices` | ElevenLabs | `elevenlabs` |
| `ExecutionModeChoices` | Ello | `ello` |
| `ExecutionModeChoices` | LiveKit | `livekit_v2` |
| `ExecutionModeChoices` | Pipecat | `pipecat_v2` |
| `ExecutionModeChoices` | Agora | `agora` |
| `GenderChoices` | Male | `male` |
| `GenderChoices` | Female | `female` |
| `GenderChoices` | Neutral | `neutral` |
| `InterruptionLevelChoices` | Off | `off` |
| `InterruptionLevelChoices` | Low | `low` |
| `InterruptionLevelChoices` | Medium | `medium` |
| `InterruptionLevelChoices` | High | `high` |
| `InviteStatusChoices` | Pending | `pending` |
| `InviteStatusChoices` | Accepted | `accepted` |
| `InviteStatusChoices` | Rejected | `rejected` |
| `InviteTypeChoices` | Admin Invite | `invite` |
| `InviteTypeChoices` | User Request | `request` |
| `KoreAiPlatformChoices` | Xo | `xo` |
| `KoreAiPlatformChoices` | Artemis | `artemis` |
| `LLMProviderChoices` | OpenAI | `openai` |
| `LLMProviderChoices` | Gemini | `gemini` |
| `LLMProviderChoices` | Dspy Gepa Gemini Flash | `dspy-gepa-gemini-flash` |
| `LLMProviderChoices` | DeepSeek V4 Flash | `deepseek-v4-flash` |
| `LanguageChoices` | Afrikaans | `af` |
| `LanguageChoices` | Arabic | `ar` |
| `LanguageChoices` | Bengali | `bn` |
| `LanguageChoices` | Bulgarian | `bg` |
| `LanguageChoices` | Chinese Simplified | `zh` |
| `LanguageChoices` | Czech | `cs` |
| `LanguageChoices` | Danish | `da` |
| `LanguageChoices` | Dutch | `nl` |
| `LanguageChoices` | English | `en` |
| `LanguageChoices` | Estonian | `et` |
| `LanguageChoices` | Finnish | `fi` |
| `LanguageChoices` | French | `fr` |
| `LanguageChoices` | German | `de` |
| `LanguageChoices` | Greek | `el` |
| `LanguageChoices` | Gujarati | `gu` |
| `LanguageChoices` | Hindi | `hi` |
| `LanguageChoices` | Hebrew | `he` |
| `LanguageChoices` | Hungarian | `hu` |
| `LanguageChoices` | Indonesian | `id` |
| `LanguageChoices` | Italian | `it` |
| `LanguageChoices` | Japanese | `ja` |
| `LanguageChoices` | Kannada | `kn` |
| `LanguageChoices` | Kazakh | `kk` |
| `LanguageChoices` | Korean | `ko` |
| `LanguageChoices` | Malay | `ms` |
| `LanguageChoices` | Malayalam | `ml` |
| `LanguageChoices` | Marathi | `mr` |
| `LanguageChoices` | Multilingual | `multi` |
| `LanguageChoices` | Norwegian | `no` |
| `LanguageChoices` | Polish | `pl` |
| `LanguageChoices` | Punjabi | `pa` |
| `LanguageChoices` | Portuguese | `pt` |
| `LanguageChoices` | Romanian | `ro` |
| `LanguageChoices` | Russian | `ru` |
| `LanguageChoices` | Slovak | `sk` |
| `LanguageChoices` | Spanish | `es` |
| `LanguageChoices` | Swedish | `sv` |
| `LanguageChoices` | Thai | `th` |
| `LanguageChoices` | Turkish | `tr` |
| `LanguageChoices` | Tagalog | `tl` |
| `LanguageChoices` | Tamil | `ta` |
| `LanguageChoices` | Telugu | `te` |
| `LanguageChoices` | Ukrainian | `uk` |
| `LanguageChoices` | Uzbek | `uz` |
| `LanguageChoices` | Vietnamese | `vi` |
| `MetricCategoryChoices` | Speech Quality | `Speech Quality` |
| `MetricCategoryChoices` | Conversation Quality | `Conversation Quality` |
| `MetricCategoryChoices` | Accuracy | `Accuracy` |
| `MetricCategoryChoices` | Customer Experience | `Customer Experience` |
| `MetricMigrationTypeChoices` | Non-Predefined Converted | `non_predefined` |
| `MetricMigrationTypeChoices` | Predefined Linked to Existing | `predefined_linked` |
| `MetricMigrationTypeChoices` | Predefined Promoted | `predefined_promoted` |
| `MetricMigrationTypeChoices` | Predefined Consolidated (Source) | `predefined_consolidated_source` |
| `MetricMigrationTypeChoices` | Predefined Consolidated (Target) | `predefined_consolidated_target` |
| `MetricSubCategoryChoices` | Latency | `Latency` |
| `MetricSubCategoryChoices` | Interruptions | `Interruptions` |
| `MetricSubCategoryChoices` | Silence | `Silence` |
| `MetricSubCategoryChoices` | Termination | `Termination` |
| `MetricSubCategoryChoices` | Repetition | `Repetition` |
| `MetricTypeChoices` | Basic (Deprecated in favor of LLM Judge) | `basic` |
| `MetricTypeChoices` | Custom Prompt ( Deprecated in favor of LLM Judge) | `custom_prompt` |
| `MetricTypeChoices` | Custom Code | `custom_code` |
| `MetricTypeChoices` | LLM Judge | `llm_judge` |
| `ModelChoices` | gpt-4o | `gpt-4o-2024-11-20` |
| `ModelChoices` | gpt-4o-mini | `gpt-4o-mini-2024-07-18` |
| `ModelChoices` | claude-sonnet-4-5 | `claude-sonnet-4-5-20250929` |
| `ModelChoices` | gemini-3-flash-preview | `gemini-3-flash-preview` |
| `ModelProviderChoices` | Openai | `openai` |
| `ModelProviderChoices` | Anthropic | `anthropic` |
| `NotifyOnChoices` | Never | `never` |
| `NotifyOnChoices` | Success | `success` |
| `NotifyOnChoices` | Failure | `failure` |
| `NotifyOnChoices` | Both | `both` |
| `OnboardingFlowChoices` | Simulation | `simulation` |
| `OnboardingFlowChoices` | Observability | `observability` |
| `OperationTypeChoices` | Create | `create` |
| `OperationTypeChoices` | Update | `update` |
| `OperationTypeChoices` | Delete | `delete` |
| `PackAccessRequestStatusChoices` | Pending | `pending` |
| `PackAccessRequestStatusChoices` | Accepted | `accepted` |
| `PackAccessRequestStatusChoices` | Declined | `declined` |
| `PackIntervalChoices` | Monthly | `month` |
| `PackIntervalChoices` | Quarterly | `quarter` |
| `PackIntervalChoices` | Yearly | `year` |
| `PaymentTypeChoices` | Auto Pay | `auto_pay` |
| `PaymentTypeChoices` | One-Time Payment | `one_time_payment` |
| `PaymentTypeChoices` | Self-Serve Credits | `self_serve_credits` |
| `PaymentTypeChoices` | Self-Serve Member Seat | `self_serve_member_seat` |
| `PaymentTypeChoices` | Subscription | `subscription` |
| `PaymentTypeChoices` | Subscription Member Seat | `subscription_member_seat` |
| `PhoneNumberProviderChoices` | Built-in | `builtin` |
| `PhoneNumberProviderChoices` | Twilio | `twilio` |
| `PhoneNumberProviderChoices` | Telnyx | `telnyx` |
| `PhoneNumberProviderChoices` | Plivo | `plivo` |
| `ProviderChoices` | Vapi | `vapi` |
| `ProviderChoices` | Retell | `retell` |
| `ProviderChoices` | Synthflow | `synthflow` |
| `ProviderChoices` | Elevenlabs | `elevenlabs` |
| `ProviderChoices` | Bland | `bland` |
| `ProviderChoices` | Livekit | `livekit` |
| `ProviderChoices` | Pipecat | `pipecat` |
| `ProviderChoices` | Kore | `koreai` |
| `ProviderChoices` | Custom | `custom` |
| `ProviderChoices` | Agentforce | `agentforce` |
| `ProviderChoices` | Genesys | `genesys` |
| `ProviderChoices` | Cisco Webex | `cisco` |
| `ProviderChoices` | Amazon Connect | `amazon_connect` |
| `ProviderChoices` | Agora | `agora` |
| `ProviderChoices` | Telnyx | `telnyx` |
| `ProviderChoices` | Sierra | `sierra` |
| `ProviderChoices` | Gemini Enterprise CX | `gemini_cx` |
| `ProviderChoices` | AssemblyAI | `assemblyai` |
| `ProviderChoices` | Smallest AI | `smallest` |
| `RoleChoices` | Admin | `admin` |
| `RoleChoices` | Member | `member` |
| `RoleChoices` | View Only | `view_only` |
| `RoleChoices` | Internal View Only | `internal_view` |
| `RoleChoices` | Labs | `labs` |
| `RoleChoices` | Labs View Only | `labs_view_only` |
| `RoleChoices` | Insights View Only | `insights_view` |
| `RunStatusChoices` | Running | `running` |
| `RunStatusChoices` | Completed | `completed` |
| `RunStatusChoices` | Failed | `failed` |
| `RunStatusChoices` | Pending | `pending` |
| `RunStatusChoices` | In Progress | `in_progress` |
| `RunStatusChoices` | Evaluating | `evaluating` |
| `RunStatusChoices` | In Queue | `in_queue` |
| `RunStatusChoices` | Timeout | `timeout` |
| `RunStatusChoices` | Cancelled | `cancelled` |
| `RunStatusChoices` | Scaling Up | `scaling_up` |
| `SIPOriginatingRegionChoices` | US East | `us-east` |
| `SIPOriginatingRegionChoices` | US West | `us-west` |
| `ScenarioToolChoices` | dtmf | `VAPI_TOOL_DTMF` |
| `ScenarioToolChoices` | receive_dtmf | `RECEIVE_DTMF` |
| `ScenarioToolChoices` | end_call | `VAPI_TOOL_END_CALL` |
| `ScenarioToolChoices` | end_call_only_on_transfer | `VAPI_TOOL_END_CALL_ONLY_ON_TRANSFER` |
| `ScenarioToolChoices` | send_sms_tool_call | `SEND_SMS_TOOL_CALL` |
| `ScenarioToolChoices` | call_hold | `CALL_HOLD` |
| `ScenarioTypeChoices` | Instruction | `instruction` |
| `ScenarioTypeChoices` | Conditional Actions | `conditional_actions` |
| `SignificantChangeAlertDirectionChoices` | Both (Increase and Decrease) | `` |
| `SignificantChangeAlertDirectionChoices` | Increase Only | `increase` |
| `SignificantChangeAlertDirectionChoices` | Decrease Only | `decrease` |
| `SignificantChangeAlertStatusChoices` | Enabled | `enabled` |
| `SignificantChangeAlertStatusChoices` | Disabled | `disabled` |
| `SourceModelChoices` | Call Log | `CallLog` |
| `SourceModelChoices` | Run | `Run` |
| `SuiteTypeChoices` | Undefined | `undefined` |
| `SuiteTypeChoices` | Infrastructure | `infrastructure` |
| `TimezoneChoices` | Africa/Abidjan | `Africa/Abidjan` |
| `TimezoneChoices` | Africa/Accra | `Africa/Accra` |
| `TimezoneChoices` | Africa/Addis_Ababa | `Africa/Addis_Ababa` |
| `TimezoneChoices` | Africa/Algiers | `Africa/Algiers` |
| `TimezoneChoices` | Africa/Asmara | `Africa/Asmara` |
| `TimezoneChoices` | Africa/Bamako | `Africa/Bamako` |
| `TimezoneChoices` | Africa/Bangui | `Africa/Bangui` |
| `TimezoneChoices` | Africa/Banjul | `Africa/Banjul` |
| `TimezoneChoices` | Africa/Bissau | `Africa/Bissau` |
| `TimezoneChoices` | Africa/Blantyre | `Africa/Blantyre` |
| `TimezoneChoices` | Africa/Brazzaville | `Africa/Brazzaville` |
| `TimezoneChoices` | Africa/Bujumbura | `Africa/Bujumbura` |
| `TimezoneChoices` | Africa/Cairo | `Africa/Cairo` |
| `TimezoneChoices` | Africa/Casablanca | `Africa/Casablanca` |
| `TimezoneChoices` | Africa/Ceuta | `Africa/Ceuta` |
| `TimezoneChoices` | Africa/Conakry | `Africa/Conakry` |
| `TimezoneChoices` | Africa/Dakar | `Africa/Dakar` |
| `TimezoneChoices` | Africa/Dar_es_Salaam | `Africa/Dar_es_Salaam` |
| `TimezoneChoices` | Africa/Djibouti | `Africa/Djibouti` |
| `TimezoneChoices` | Africa/Douala | `Africa/Douala` |
| `TimezoneChoices` | Africa/El_Aaiun | `Africa/El_Aaiun` |
| `TimezoneChoices` | Africa/Freetown | `Africa/Freetown` |
| `TimezoneChoices` | Africa/Gaborone | `Africa/Gaborone` |
| `TimezoneChoices` | Africa/Harare | `Africa/Harare` |
| `TimezoneChoices` | Africa/Johannesburg | `Africa/Johannesburg` |
| `TimezoneChoices` | Africa/Juba | `Africa/Juba` |
| `TimezoneChoices` | Africa/Kampala | `Africa/Kampala` |
| `TimezoneChoices` | Africa/Khartoum | `Africa/Khartoum` |
| `TimezoneChoices` | Africa/Kigali | `Africa/Kigali` |
| `TimezoneChoices` | Africa/Kinshasa | `Africa/Kinshasa` |
| `TimezoneChoices` | Africa/Lagos | `Africa/Lagos` |
| `TimezoneChoices` | Africa/Libreville | `Africa/Libreville` |
| `TimezoneChoices` | Africa/Lome | `Africa/Lome` |
| `TimezoneChoices` | Africa/Luanda | `Africa/Luanda` |
| `TimezoneChoices` | Africa/Lubumbashi | `Africa/Lubumbashi` |
| `TimezoneChoices` | Africa/Lusaka | `Africa/Lusaka` |
| `TimezoneChoices` | Africa/Malabo | `Africa/Malabo` |
| `TimezoneChoices` | Africa/Maputo | `Africa/Maputo` |
| `TimezoneChoices` | Africa/Maseru | `Africa/Maseru` |
| `TimezoneChoices` | Africa/Mbabane | `Africa/Mbabane` |
| `TimezoneChoices` | Africa/Mogadishu | `Africa/Mogadishu` |
| `TimezoneChoices` | Africa/Monrovia | `Africa/Monrovia` |
| `TimezoneChoices` | Africa/Nairobi | `Africa/Nairobi` |
| `TimezoneChoices` | Africa/Ndjamena | `Africa/Ndjamena` |
| `TimezoneChoices` | Africa/Niamey | `Africa/Niamey` |
| `TimezoneChoices` | Africa/Nouakchott | `Africa/Nouakchott` |
| `TimezoneChoices` | Africa/Ouagadougou | `Africa/Ouagadougou` |
| `TimezoneChoices` | Africa/Porto-Novo | `Africa/Porto-Novo` |
| `TimezoneChoices` | Africa/Sao_Tome | `Africa/Sao_Tome` |
| `TimezoneChoices` | Africa/Tripoli | `Africa/Tripoli` |
| `TimezoneChoices` | Africa/Tunis | `Africa/Tunis` |
| `TimezoneChoices` | Africa/Windhoek | `Africa/Windhoek` |
| `TimezoneChoices` | America/Adak | `America/Adak` |
| `TimezoneChoices` | America/Anchorage | `America/Anchorage` |
| `TimezoneChoices` | America/Chicago | `America/Chicago` |
| `TimezoneChoices` | America/Denver | `America/Denver` |
| `TimezoneChoices` | America/Los_Angeles | `America/Los_Angeles` |
| `TimezoneChoices` | America/New_York | `America/New_York` |
| `TimezoneChoices` | America/Phoenix | `America/Phoenix` |
| `TimezoneChoices` | America/Sao_Paulo | `America/Sao_Paulo` |
| `TimezoneChoices` | Asia/Dubai | `Asia/Dubai` |
| `TimezoneChoices` | Asia/Hong_Kong | `Asia/Hong_Kong` |
| `TimezoneChoices` | Asia/Kolkata | `Asia/Kolkata` |
| `TimezoneChoices` | Asia/Seoul | `Asia/Seoul` |
| `TimezoneChoices` | Asia/Shanghai | `Asia/Shanghai` |
| `TimezoneChoices` | Asia/Singapore | `Asia/Singapore` |
| `TimezoneChoices` | Asia/Tokyo | `Asia/Tokyo` |
| `TimezoneChoices` | Australia/Melbourne | `Australia/Melbourne` |
| `TimezoneChoices` | Australia/Perth | `Australia/Perth` |
| `TimezoneChoices` | Australia/Sydney | `Australia/Sydney` |
| `TimezoneChoices` | Europe/Amsterdam | `Europe/Amsterdam` |
| `TimezoneChoices` | Europe/Berlin | `Europe/Berlin` |
| `TimezoneChoices` | Europe/London | `Europe/London` |
| `TimezoneChoices` | Europe/Madrid | `Europe/Madrid` |
| `TimezoneChoices` | Europe/Moscow | `Europe/Moscow` |
| `TimezoneChoices` | Europe/Paris | `Europe/Paris` |
| `TimezoneChoices` | Europe/Rome | `Europe/Rome` |
| `TimezoneChoices` | Pacific/Auckland | `Pacific/Auckland` |
| `TimezoneChoices` | Pacific/Honolulu | `Pacific/Honolulu` |
| `TimezoneChoices` | US/Central | `US/Central` |
| `TimezoneChoices` | US/Eastern | `US/Eastern` |
| `TimezoneChoices` | US/Mountain | `US/Mountain` |
| `TimezoneChoices` | US/Pacific | `US/Pacific` |
| `TimezoneChoices` | UTC | `UTC` |
| `TransactionTypeChoices` | Main Transaction | `main` |
| `TransactionTypeChoices` | Metric | `metric` |
| `TransactionTypeChoices` | Metric Triage | `triage` |
| `TransactionTypeChoices` | Transcript Generation | `transcript_generation` |
| `TransactionTypeChoices` | Expected Outcome | `expected_outcome` |
| `TransactionTypeChoices` | Undefined | `undefined` |
| `TransactionTypeChoices` | Refund | `refund` |
| `TransactionTypeChoices` | Redaction | `redaction` |
| `TransactionTypeChoices` | Reserved | `reserved` |
| `TransactionTypeChoices` | Released | `released` |
| `TransactionTypeChoices` | Deep Research Generation | `deep_research_generation` |
| `TransactionTypeChoices` | Insight Generation | `insight_generation` |
| `TranscriptProviderChoices` | Vapi | `vapi` |
| `TranscriptProviderChoices` | Retell | `retell` |
| `TranscriptProviderChoices` | Synthflow | `synthflow` |
| `TranscriptProviderChoices` | Elevenlabs | `elevenlabs` |
| `TranscriptProviderChoices` | Bland | `bland` |
| `TranscriptProviderChoices` | Livekit | `livekit` |
| `TranscriptProviderChoices` | Pipecat | `pipecat` |
| `TranscriptProviderChoices` | Kore | `koreai` |
| `TranscriptProviderChoices` | Custom | `custom` |
| `TranscriptProviderChoices` | Cisco | `cisco` |
| `TranscriptProviderChoices` | Gemini Enterprise CX | `gemini_cx` |
| `TranscriptProviderChoices` | Genesys | `genesys` |
| `TranscriptProviderChoices` | Agora | `agora` |
| `TranscriptProviderChoices` | Amazon Connect | `amazon_connect` |
| `TranscriptProviderChoices` | Telnyx | `telnyx` |
| `TranscriptProviderChoices` | AssemblyAI | `assemblyai` |
| `TranscriptProviderChoices` | Smallest AI | `smallest` |
| `TranscriptProviderChoices` | Agentforce | `agentforce` |
| `TriggerType` | LLM Judge | `llm_judge` |
| `TriggerType` | Custom Code | `custom_code` |
| `UserOnboardingStatusChoices` | Not Started | `not_started` |
| `UserOnboardingStatusChoices` | In Progress | `in_progress` |
| `UserOnboardingStatusChoices` | Completed | `completed` |
| `UserOnboardingStatusChoices` | Skipped | `skipped` |
| `VoiceModelChoices` | Eleven Multilingual V2 | `eleven_multilingual_v2` |
| `VoiceModelChoices` | Eleven Turbo V2 5 | `eleven_turbo_v2_5` |
| `VoiceModelChoices` | Eleven Flash V2 5 | `eleven_flash_v2_5` |
| `VoiceModelChoices` | Eleven V3 Conversational | `eleven_v3_conversational` |
| `VoiceModelChoices` | Cartesia Sonic 3.5 | `sonic-3.5` |
| `VoiceProviderChoices` | Elevenlabs | `11labs` |
| `VoiceProviderChoices` | Cartesia | `cartesia` |
| `WebhookEventChoices` | Result Completed | `result.completed` |
| `WebhookEventChoices` | Result Pre Trigger | `result.pre_trigger` |
| `WebhookEventChoices` | Call Log Completed | `call_log.completed` |
| `WebhookEventChoices` | Call Log Reevaluated | `call_log.reevaluated` |
| `WebhookEventChoices` | Vapi Webhook | `vapi.webhook` |
| `WebhookEventChoices` | Retell Webhook | `retell.webhook` |
| `WebhookEventChoices` | Elevenlabs Webhook | `elevenlabs.webhook` |
| `WebhookEventChoices` | Daily Report | `daily.report` |
| `WebhookMockEventChoices` | Result Pre Trigger | `result.pre_trigger` |
| `WebhookMockEventChoices` | Result Success | `result.success` |
| `WebhookMockEventChoices` | Result Failure | `result.failure` |
| `WebhookMockEventChoices` | Result Error | `result.error` |
| `WebhookMockEventChoices` | Cronjob Success | `cronjob.success` |
| `WebhookMockEventChoices` | Cronjob Failure | `cronjob.failure` |
| `WebhookMockEventChoices` | Cronjob Error | `cronjob.error` |
| `WebhookMockEventChoices` | Call Log Success | `call_log.success` |
| `WebhookMockEventChoices` | Call Log Failure | `call_log.failure` |
| `WebhookMockEventChoices` | Call Log Reevaluated Success | `call_log_reevaluated.success` |
| `WebhookMockEventChoices` | Call Log Reevaluated Failure | `call_log_reevaluated.failure` |
| `WebhookMockEventChoices` | Daily Report | `daily.report` |
| `WidgetAggregationFunctionChoices` | Count | `count` |
| `WidgetAggregationFunctionChoices` | Sum | `sum` |
| `WidgetAggregationFunctionChoices` | Average | `avg` |
| `WidgetAggregationFunctionChoices` | Minimum | `min` |
| `WidgetAggregationFunctionChoices` | Maximum | `max` |
| `WidgetAggregationFunctionChoices` | 50th Percentile (Median) | `p50` |
| `WidgetAggregationFunctionChoices` | 95th Percentile | `p95` |
| `WidgetAggregationFunctionChoices` | 99th Percentile | `p99` |
| `WidgetDataTypeChoices` | Numeric | `numeric` |
| `WidgetDataTypeChoices` | Boolean | `boolean` |
| `WidgetDataTypeChoices` | String | `string` |
| `WidgetDataTypeChoices` | DateTime | `datetime` |
| `WidgetDataTypeChoices` | Dynamic | `dynamic` |
| `WidgetTimePeriodChoices` | Hour | `hour` |
| `WidgetTimePeriodChoices` | Day | `day` |
| `WidgetTimePeriodChoices` | Week | `week` |
| `WidgetTimePeriodChoices` | Month | `month` |

Notes:

- The bodies of 2500 and 6000 characters are cut by the capture limit. The body of 13992 characters is complete JSON. It ends with `"WidgetTimePeriodChoices":{"Hour":"hour","Day":"day","Week":"week","Month":"month"}}`.
- Five captures (six calls) hold the complete body: `75-personality-create`, `103-evaluator-create-manual`, `104-test-profile-create` (two calls), `108-monitors-01-create-monitor`, and `122-settings-07-project-general`. The six bodies have the same length. The script used the first of them.

### 8.7 Mapping to the public API

The mapping compares each dashboard endpoint with the 297 operations of the public API reference. It ignores the parameter names in braces and the trailing slash.

Match kinds:

- "exact": the public API has the same method and path.
- "same path, other method": the public API has the path, but not this method.
- "collection only": the public API has only the parent list path.
- "none": the public API has no matching path.

| Dashboard call | Public API operation | Match |
|---|---|---|
| GET `/user/api/v1/user-api-key/` | `/user/api/v1/user-api-key/ (methods POST)` | same path, other method |
| GET `/user/invites/` | none found | none |
| GET `/user/invites/my_invites/` | none found | none |
| GET `/user/onboarding/` | none found | none |
| GET `/user/organizations/{id}/` | `/user/organizations/ (methods GET)` | collection only |
| GET `/user/organizations/{id}/onboarding-tasks/` | none found | none |
| GET `/user/v1/projects` | `GET /user/v1/projects/` | exact |
| POST `/user/v1/projects/` | `POST /user/v1/projects/` | exact |
| GET `/user/v1/projects/{id}/` | `GET /user/v1/projects/{id}/` | exact |
| GET `/user/v1/projects/{id}/personalities/` | none found | none |
| GET `/user/v2/organizations/` | `GET /user/v2/organizations/` | exact |
| GET `/test_framework/billing/` | none found | none |
| GET `/test_framework/billing/status` | none found | none |
| GET `/test_framework/billing/usage-history/` | none found | none |
| GET `/test_framework/billing/{id}/credits-usage/` | none found | none |
| GET `/test_framework/billing/{id}/usage-chart/` | none found | none |
| GET `/test_framework/v1/aiagents/runs_overview_project/` | none found | none |
| GET `/test_framework/v1/aiagents/{id}/history/` | none found | none |
| GET `/test_framework/v1/configurations/` | none found | none |
| GET `/test_framework/v1/knowledge-base-connectors/` | none found | none |
| GET `/test_framework/v1/metrics/basic_list/` | none found | none |
| POST `/test_framework/v1/metrics/bulk_create/` | `POST /test_framework/v1/metrics/bulk_create/` | exact |
| POST `/test_framework/v1/metrics/generate_metrics/` | `POST /test_framework/v1/metrics/generate_metrics/` | exact |
| GET `/test_framework/v1/metrics/generate_metrics_progress/` | `GET /test_framework/v1/metrics/generate_metrics_progress/` | exact |
| GET `/test_framework/v1/metrics/pattern-reviews/{id}/` | none found | none |
| DELETE `/test_framework/v1/metrics/{id}/` | `DELETE /test_framework/v1/metrics/{id}/` | exact |
| GET `/test_framework/v1/metrics/{id}/history/` | none found | none |
| POST `/test_framework/v1/metrics/{id}/pattern-review/` | none found | none |
| POST `/test_framework/v1/personalities/` | `POST /test_framework/v1/personalities/` | exact |
| GET `/test_framework/v1/personalities/{id}/` | `GET /test_framework/v1/personalities/{id}/` | exact |
| PATCH `/test_framework/v1/personalities/{id}/` | `PATCH /test_framework/v1/personalities/{id}/` | exact |
| DELETE `/test_framework/v1/personalities/{id}/` | `DELETE /test_framework/v1/personalities/{id}/` | exact |
| POST `/test_framework/v1/personalities/{id}/fork/` | `POST /test_framework/v1/personalities/{id}/fork/` | exact |
| GET `/test_framework/v1/phone-numbers/` | none found | none |
| GET `/test_framework/v1/phone-numbers/inbound/` | `GET /test_framework/v1/phone-numbers/inbound/` | exact |
| GET `/test_framework/v1/phone-numbers/providers/list` | none found | none |
| GET `/test_framework/v1/predefined-metrics/` | `GET /test_framework/v1/predefined-metrics/` | exact |
| PATCH `/test_framework/v1/scenario-improvement-sessions/{id}/` | `PATCH /test_framework/v1/scenario-improvement-sessions/{id}/` | exact |
| GET `/test_framework/v1/scenarios/` | `GET /test_framework/v1/scenarios/` | exact |
| POST `/test_framework/v1/scenarios/create_folder/` | `POST /test_framework/v1/scenarios/create_folder/` | exact |
| POST `/test_framework/v1/scenarios/delete_folder/` | `POST /test_framework/v1/scenarios/delete_folder/` | exact |
| POST `/test_framework/v1/scenarios/delete_scenarios/` | `POST /test_framework/v1/scenarios/delete_scenarios/` | exact |
| GET `/test_framework/v1/scenarios/folders/` | `GET /test_framework/v1/scenarios/folders/` | exact |
| POST `/test_framework/v1/scenarios/generate-bg/` | `POST /test_framework/v1/scenarios/generate-bg/` | exact |
| GET `/test_framework/v1/scenarios/generate-progress` | `GET /test_framework/v1/scenarios/generate-progress/` | exact |
| GET `/test_framework/v1/scenarios/has_infrastructure_suite/` | none found | none |
| GET `/test_framework/v1/scenarios/scenario-agent-progress/` | `GET /test_framework/v1/scenarios/scenario-agent-progress/` | exact |
| POST `/test_framework/v1/scenarios/scenario-agent/` | `POST /test_framework/v1/scenarios/scenario-agent/` | exact |
| GET `/test_framework/v1/scenarios/tags/` | none found | none |
| GET `/test_framework/v1/scenarios/{id}/` | `GET /test_framework/v1/scenarios/{id}/` | exact |
| GET `/test_framework/v1/scenarios/{id}/condition-audio/` | none found | none |
| GET `/test_framework/v1/test-profiles/` | `GET /test_framework/v1/test-profiles/` | exact |
| POST `/test_framework/v1/test-profiles/` | `POST /test_framework/v1/test-profiles/` | exact |
| DELETE `/test_framework/v1/test-profiles/{id}` | `DELETE /test_framework/v1/test-profiles/{id}/` | exact |
| GET `/test_framework/v1/test-profiles/{id}/` | `GET /test_framework/v1/test-profiles/{id}/` | exact |
| GET `/test_framework/v1/tools` | `GET /test_framework/v1/tools/` | exact |
| GET `/test_framework/v1/views/` | none found | none |
| GET `/test_framework/v2/aiagents/` | `GET /test_framework/v2/aiagents/` | exact |
| POST `/test_framework/v2/aiagents/` | `POST /test_framework/v2/aiagents/` | exact |
| POST `/test_framework/v2/aiagents/connections/check/` | none found | none |
| GET `/test_framework/v2/aiagents/integration_summary/` | none found | none |
| GET `/test_framework/v2/aiagents/provider-assistants/` | `GET /test_framework/v2/aiagents/provider-assistants/` | exact |
| GET `/test_framework/v2/aiagents/short_list/` | none found | none |
| GET `/test_framework/v2/aiagents/{id}/` | `GET /test_framework/v2/aiagents/{id}/` | exact |
| PATCH `/test_framework/v2/aiagents/{id}/` | `PATCH /test_framework/v2/aiagents/{id}/` | exact |
| DELETE `/test_framework/v2/aiagents/{id}/` | `DELETE /test_framework/v2/aiagents/{id}/` | exact |
| GET `/test_framework/v2/metrics/` | `GET /test_framework/v2/metrics/` | exact |
| POST `/test_framework/v2/metrics/` | `POST /test_framework/v2/metrics/` | exact |
| GET `/test_framework/v2/metrics/{id}/` | `GET /test_framework/v2/metrics/{id}/` | exact |
| GET `/test_framework/v2/results/` | `GET /test_framework/v2/results/` | exact |
| GET `/test_framework/v2/runs/` | none found | none |
| GET `/test_framework/v2/scenarios/{id}/history/` | none found | none |
| GET `/observability/v1/agent-improvement-sessions/` | `GET /observability/v1/agent-improvement-sessions/` | exact |
| GET `/observability/v1/alerts/` | `GET /observability/v1/alerts/` | exact |
| POST `/observability/v1/alerts/` | `POST /observability/v1/alerts/` | exact |
| GET `/observability/v1/alerts/review/` | `GET /observability/v1/alerts/review/` | exact |
| GET `/observability/v1/alerts/trigger_summary/` | `GET /observability/v1/alerts/trigger_summary/` | exact |
| DELETE `/observability/v1/alerts/{id}/` | `DELETE /observability/v1/alerts/{id}/` | exact |
| GET `/observability/v1/deep-research-insights/` | `GET /observability/v1/deep-research-insights/` | exact |
| GET `/observability/v1/deep-research-insights/pricing/` | `GET /observability/v1/deep-research-insights/pricing/` | exact |
| GET `/observability/v1/first-insights/` | none found | none |
| GET `/observability/v1/metric-failure-mode-insights/` | `GET /observability/v1/metric-failure-mode-insights/` | exact |
| GET `/observability/v1/metric-failure-mode-insights/categories/` | `GET /observability/v1/metric-failure-mode-insights/categories/` | exact |
| GET `/observability/v1/metric-failure-mode-insights/failure-rates/` | `GET /observability/v1/metric-failure-mode-insights/failure-rates/` | exact |
| GET `/observability/v1/metric-failure-mode-insights/metric-config/` | none found | none |
| GET `/observability/v1/metric-failure-mode-insights/pricing/` | `GET /observability/v1/metric-failure-mode-insights/pricing/` | exact |
| GET `/observability/v2/call-logs/` | `GET /observability/v2/call-logs/` | exact |
| GET `/schedules/v1/cron-jobs/` | `GET /schedules/v1/cron-jobs/` | exact |
| POST `/schedules/v1/cron-jobs/` | `POST /schedules/v1/cron-jobs/` | exact |
| GET `/schedules/v1/metric-optimiser-cron-jobs/` | none found | none |
| GET `/dashboards/dashboards/` | `GET /dashboards/dashboards/` | exact |
| GET `/dashboards/dashboards/predefined_widgets/` | none found | none |
| POST `/dashboards/dashboards/{id}/bulk_widgets/` | `POST /dashboards/dashboards/{id}/bulk_widgets/` | exact |
| GET `/dashboards/widgets/` | `GET /dashboards/widgets/` | exact |
| POST `/dashboards/widgets/preview_data/` | `POST /dashboards/widgets/preview_data/` | exact |
| GET `/dashboards/widgets/{id}/data/` | `GET /dashboards/widgets/{id}/data/` | exact |
| GET `/app/v1/product-chat/commands/` | none found | none |
| DELETE `/app/v1/product-chat/sessions/{id}/` | none found | none |
| GET `/app/v2/product-chat/conversations/` | none found | none |
| POST `/app/v2/product-chat/conversations/` | none found | none |
| GET `/app/v2/product-chat/conversations/pending-optimizer-count/` | none found | none |
| POST `/app/v2/product-chat/conversations/{id}/messages/` | none found | none |
| GET `/app/v2/product-chat/conversations/{id}/status/` | none found | none |
| GET `/app/v2/product-chat/conversations/{id}/stream-token/` | none found | none |
| GET `/app/v2/product-chat/org-mcp-servers/` | none found | none |
| GET `/app/v2/product-chat/org-skills/` | none found | none |
| GET `/app/v2/product-chat/project-knowledge/instructions/` | none found | none |
| GET `/app/v2/product-chat/reports/` | none found | none |
| GET `/notifications/v1/notifications/` | none found | none |
| GET `/notifications/v1/notifications/unread_count/` | none found | none |
| GET `/subscriptions/subscriptions/` | none found | none |
| GET `/subscriptions/subscriptions/{id}/plan-switch-offer/` | none found | none |
| GET `/github/agent-scan/sdk-pr/` | none found | none |
| GET `/github/connection/` | none found | none |
| GET `/bitbucket/connection/` | none found | none |
| GET `/slack/slack-workspaces/` | `GET /slack/slack-workspaces/` | exact |
| GET `/discord/servers/` | none found | none |
| GET `/enums/` | none found | none |
| GET `/agent/v1/stream/{id}` (assistant.example.com) | none found | none |

Match counts: collection only = 1, exact = 62, none = 55, same path, other method = 1.

Nearest public operations for the dashboard endpoints without a match. These pairs come from a search of the public API reference. Each pair is a suggestion (inferred), not a confirmed equivalence.

| Dashboard endpoint | Nearest public operation | Note |
|---|---|---|
| `GET /user/organizations/{id}/` | `GET /user/organizations/` | The public API reference also names `PATCH /user/organizations/{organization_id}/` on its credit alerts page. |
| `GET /user/api/v1/user-api-key/` | `POST /user/api/v1/user-api-key/` | The public API has create only. |
| `GET /user/v1/projects/{id}/personalities/` | `GET /test_framework/v1/personalities/`, `POST /user/v1/projects/{id}/enable_personalities/`, `POST /user/v1/projects/{id}/disable_personalities/` | |
| `GET /test_framework/v2/aiagents/short_list/` | `GET /test_framework/v2/aiagents/` with `ql` | |
| `GET /test_framework/v1/metrics/basic_list/` | `GET /test_framework/v2/metrics/` with `ql` | |
| `GET /test_framework/v1/aiagents/{id}/history/` | none | The public API reference lists this path under "Paths that the spec mentions but does not define". |
| `GET /test_framework/v2/runs/` | `GET /test_framework/v2/runs/bulk/`, `GET /test_framework/v2/runs/{id}/` | |
| `GET /test_framework/v1/scenarios/{id}/condition-audio/` | `PUT /test_framework/v1/scenarios/{id}/condition-audio/{audio_id}/` | The public API has no list. |
| `GET /test_framework/billing/`, `GET /test_framework/billing/status`, `GET /test_framework/billing/usage-history/`, `GET /test_framework/billing/{id}/credits-usage/`, `GET /test_framework/billing/{id}/usage-chart/` | `GET /test_framework/billing/info/`, `GET /test_framework/billing/payment-history/`, `GET /test_framework/billing/unit-usage-report/` | |
| `POST /test_framework/v1/metrics/{id}/pattern-review/`, `GET /test_framework/v1/metrics/pattern-reviews/{id}/` | `POST /test_framework/v2/metrics/{id}/run_reviews/`, `GET /test_framework/v2/metrics/run_reviews_progress/`, `/test_framework/metric-reviews/...` | The capture does not show that these are the same feature. |

Endpoints that only the dashboard uses (no public path and no near match): `/enums/`, all `/app/...` product chat paths, `assistant.example.com`, `/notifications/...`, `/subscriptions/...`, `/github/...`, `/bitbucket/connection/`, `/discord/servers/`, `/user/invites/...`, `/user/onboarding/`, `/user/organizations/{id}/onboarding-tasks/`, `/test_framework/v1/views/`, `/test_framework/v1/configurations/`, `/test_framework/v1/scenarios/tags/`, `/test_framework/v1/scenarios/has_infrastructure_suite/`, `/test_framework/v1/knowledge-base-connectors/`, `/test_framework/v1/phone-numbers/`, `/test_framework/v1/phone-numbers/providers/list`, `/test_framework/v2/aiagents/connections/check/`, `/test_framework/v2/aiagents/integration_summary/`, `/test_framework/v2/scenarios/{id}/history/`, `/test_framework/v1/metrics/{id}/history/`, `/test_framework/v1/aiagents/runs_overview_project/`, `/observability/v1/first-insights/`, `/observability/v1/metric-failure-mode-insights/metric-config/`, `/schedules/v1/metric-optimiser-cron-jobs/`, `/dashboards/dashboards/predefined_widgets/`.

A rebuild that exposes both surfaces can serve each "exact" pair from one handler (inferred).

#### Not seen in the capture

- Request headers. The capture did not record them, so the dashboard authentication is not documented here.
- Any `_rsc` or `/_next/` request. The frontend framework is not proven.
- The `{*}` form of `ql`, and the `400` response for an unknown `ql` field.
- A page beyond page 1. Every list in the project had few records, so `next` was always `null`.
- `PUT` calls. The dashboard used `PATCH` for every captured update.
- `403`, `429`, and `5xx` responses.
- A failed background job. No progress response held a non-null `error`.
- The time between two progress requests. The capture has no timestamps.
- Calls that need data the project did not have: test results, runs, call logs, alert triggers, and insights with content. Their list endpoints returned empty bodies.
- The full response of each body cut by the capture limit (2500, 4000, 6000, or 30000 characters).

## 9. Not seen in the crawl, and the test plan for after the top-up

This section lists the parts of the product that the crawl did not show. Do not invent behavior for them. First read the public API reference. Then run the test plan in 9.2 to fill each gap.

### 9.0 Status after the live run of 2026-10-24

Section 10 records a second crawl. That crawl had a reachable phone agent and credits. It closed these gaps:

| Gap in 9.2 and 9.3 | Status | Where |
|---|---|---|
| Test 1: agent with a reachable connection, "Test connections", agent edit `PATCH` | Closed | Section 10 |
| Test 3: one Evaluator run, Result detail, Run detail, transcript, recording, metric scores, Results actions | Closed. "Generate Link" was not clicked, because it makes a public link. | Section 10 |
| Test 4: "Run from file" | Partly closed. The dry run ("Check spec") was recorded. The real run was not started. | Section 10 |
| Test 4: Evaluator actions "Duplicate", "Add Tags", "Move to Folder", "Modify Scenarios", "Export" | Closed | Section 10 |
| Test 5: Monitor create, list row, pause, edit, delete | Closed. No Monitor run fired. | Section 10 |
| Test 6: Calls: upload, table, call detail, "Use as Evaluator", export | Closed | Section 10 |
| Test 7: sample-label review with data, Labs "Run" and "Auto Improve", Quick Mode | Closed | Section 10 |
| Test 8: "Enable insights" | Closed. No Alert fired, because every metric passed. | Section 10 |
| Test 9: Assistant report, question widget, old conversation load, metric optimiser chat | Closed. The report "Download PDF" made no file and no backend call in the crawl browser. | Section 10 |

#### Still open after the live run

These parts are in scope, but no crawl showed them. Do not invent their behavior. Use the public API reference, or test them on a live account.

| Part | Why it was not seen | How to close it |
|---|---|---|
| Alert firing | Every metric passed, so no Alert fired. The crawl recorded the Alert form only. The fired Alert view and the message that it sends are unknown. | Create an Alert on a metric. Run an Evaluator that makes this metric fail. |
| Monitor run history | The crawl deleted the Monitor before its first scheduled run. The run history list and the failure notice are unknown. | Create a Monitor with the "Every hour" schedule. Wait for one run. Then delete the Monitor. |
| "Compare Results" | This action needs two Results. The live run made one Result. | Run the same Evaluator two times. Select both Results. Click "Compare Results". |
| "Run from file", real run | The crawl ran only the dry run ("Check spec"). The real run probably works like the normal run in section 10 (inferred). | Click "Run 1 run" after "Check spec". The estimated cost was 5 credits. |
| Report "Download PDF" | The browser builds the PDF. The crawl browser could not save the file, and no backend call was made. A rebuild can render its own PDF from the report JSON block in section 10. | Click "Download PDF" in a normal browser. Save the file and compare it with the report JSON. |
| "Generate Link" (public share link) | The crawl did not click it on purpose. It makes a public link to call transcripts and recordings. | Click it only on test data. Then revoke or delete the link. |

Approximate cost to close the first four rows: about 4 credits, at about 1.8 credits for each call.

#### Out of scope by owner decision

The owner decided on 2026-10-24 that the rebuild does not need these parts. Do not build them, and do not test them:

- Payment-method flows: "Buy Credits", "Add payment method", and "Invite Member".
- The project limit and the "Upgrade to Enterprise" dialog. The app allows many projects.
- Billing, credits, plans, and prices. The app is free. Settings "Billing" and organization "Integrations" are not built.
- The Assistant: the `/ai-assistant` pages, the "Ask Assistant" panel, the organization MCP servers and skills, and the "Agent Config" settings page. Sections 4, 8.4, and 10.11 describe it only as a record.
- Multi-Factor Authentication (MFA), GitHub, Bitbucket, Slack, Discord, and Teams integrations.
- Text (chat), Session Initiation Protocol (SIP), and WebSocket runs.
- "Import from provider". It needs a provider key saved in the app.
- The sidebar "Docs" link, the "Support" button and messenger, the "Onboarding" checklist, and the "Buy Credits" button with the plan badge and credit balance card. The owner marked this exclusion as very important.

The lists in 9.2 and 9.3 below are the state before the live run. Use the table above to see which items are still open.

### 9.1 Why parts were not seen

| Cause | Effect |
|---|---|
| The project had no results, no runs, and no call logs. | The Result detail, Run detail, Call detail, Insights, Alert firing, Labs, and Dashboard screens showed empty states only. |
| No agent had a reachable connection. The real agent 22757 calls a live Vapi squad. The test agent had an email connection to a fake address. | No run was started. No Monitor could be created. "Test connections" had nothing to test. |
| The user asked for no runs before a target number was chosen. | The "Run" button in "Configure Run" was not clicked. |
| The organization has no payment method. | "Buy Credits" and "Invite Member" stop at the dialog "Add a payment method to continue". |
| The Pay As You Go (PayG) plan allows 1 project. | Project create returned `["Max projects limit reached"]`. Edit and delete of a project were not tried. |
| The crawl did not create secrets. | No API key was created. No provider key was saved. No GitHub or Bitbucket account was connected. |
| The crawl records record only backend calls on `backend.example.com` and `assistant.example.com`. | Request headers, page requests, and third-party calls are not in the crawl records. |

Note: the balance was 204.84 credits during the crawl and did not change. Credits are not the main blocker. A reachable agent connection and data are the main blockers.

### 9.2 Test plan for after the top-up

Do these tests in order. Each test unlocks the next. Record each step the same way as the crawl: a screenshot, the accessibility tree, and every backend call with its request body and response body.

Warning: tests 3 to 9 place real calls or start paid evaluations. They spend credits. Use a test agent and the smallest counts (1 Evaluator, "Number of Times to Run" 1).

#### Test 1. Connect a test agent that the app can reach

1. Create an agent with a phone number that you own, or with a WebSocket URL of a test bot. The WebSocket must accept "Raw PCM 16kHz 16-bit mono".
2. Click "Test connections". Record the test call and its result.
3. Edit the name, the language, the description, the provider, and the connections. Click "Save Changes". Record each `PATCH /test_framework/v2/aiagents/{id}/` body.
4. Optional: save a VAPI key under Project settings, Provider API Keys. Then use "Import from provider". Record the assistant list and the import request.

#### Test 2. Agent sub-records

1. Delete a knowledge base file. Create a "Website Scraper" connector. Record both calls.
2. Edit and delete a mock tool. Edit and delete a dynamic variable.
3. Open each item of the Version History "..." menu. Record what each item does.
4. Click "Duplicate" on an agent row. Record the call.

#### Test 3. Run one Evaluator (first paid step)

1. Generate or create 1 Evaluator for the test agent.
2. Open "Configure Run". Open "Show 5 more fields". Set "Number of Times to Run" to 1. Click "Run".
3. Record the run start call, the live status updates, and the poll interval.
4. Open the Result detail page and the Run detail page. Record the transcript view, the audio player, the metric scores, the explanations, and every tab.
5. On Results, try "Select View", the filters, "Export All", "Reports", "Compare Results", "Reevaluate Metrics", and delete.

#### Test 4. Run in other modes

1. Run the same Evaluator as text (chat).
2. Try "Run from file" with a small JSON spec. Click "Check spec", then "Run".
3. Generate one "Red Teaming" Evaluator and one "Conditional actions" Evaluator. Create one Evaluator in "Transcript Mode".
4. Try the Evaluator actions "Duplicate", "Move to Folder", "Add Tags", "Modify Scenarios", "Export", "Improve Scenarios", and "Compare Versions".

#### Test 5. Monitor

1. Create a Monitor for the test agent with 1 Evaluator and the "Weekly" schedule.
2. Record the create call, the list row, edit, pause, and delete.
3. If you let it fire once, record the run history and the failure notification.

#### Test 6. Calls (observability)

1. Use "Add Call" to upload one short audio file for the test agent.
2. Optional: send one call with the API or a provider integration (Pipecat or Custom code snippet).
3. Record the Calls table, the Call detail page, the metric evaluations, and the review actions (`reviewed_success`, `reviewed_failure`).

#### Test 7. Metrics with data

1. Open the sample-label review for a metric when the project has calls or runs. Record the review screen and its calls.
2. In Labs, use "Run" and "Auto Improve". Record the review table rows.
3. Expand a metric row. Use "Assign Agents", "Toggle Settings", bulk "Delete", drag reorder, and the observability and simulation switches. Record each save call.
4. Use Quick Mode "Generate Metric", "Improve", and the trigger "Generate" button.
5. Change one Rubric condition and click "Save Changes". Record the project `PATCH`. Restore the old value after the test.

#### Test 8. Alerts, Insights, Dashboards

1. Create an Alert of each type. Use "Configure Filter". Make one Alert fire.
2. Click "Enable insights" for one metric. Record the save call and the Insight cards. Record the Deep Research pricing and flow.
3. Build a custom Plot with "Data Field". Use "Edit Plot", "Duplicate Plot", "Discard", "In Daily Report", and drag a widget. Delete the test Plot after the test.

#### Test 9. Assistant with data

1. Ask for a weekly report when results exist. Record the PDF report flow and the Reports tab item.
2. Record the full stream of a message that asks a question. Find the event that carries the question widget data.
3. Click "Share" and the three icon buttons under an answer. Record each call.
4. Attach one file. Use the "Stop" button during a stream. Ask for a write action and record the confirmation step.
5. Open an old conversation and record the call that loads its messages.

#### Test 10. Settings and account (free, but change real settings)

1. Save one field on each settings page. Record the `PATCH` and the toast. Restore the old value.
2. Create and delete one API key. Do not paste the key anywhere.
3. Add a payment method. Then open "Buy Credits" and "Invite Member" again. Do not pay unless you intend to.
4. Click each webhook "Test" button when a webhook URL exists.
5. Open "Add MCP Server", the "Custom Skills" tab, the Slack, Discord, and Teams pages, and the "Add schedule" form of the metric optimiser.

### 9.3 Gaps by section

The section files list each gap under "Not seen in the capture". This list collects them.

**Section 1, shell.**
- The Edit Project form, the Delete Project confirmation, and a successful project create. The "Upgrade to Enterprise" dialog shows only in a screenshot.
- A switch to a second organization. The "Theme" submenu and "Sign out" in the account menu.
- Notifications with items, "Mark all read", and a click on a notification.
- The Onboarding cards when expanded, and the Support chat conversation.
- The sidebar collapse, the running state of task panels, success toasts, and the toast timeout.
- The routes for one Result, Run, Call, Monitor, or Alert. The root `/`, the sign-in page, and a 404 page.

**Section 2, Agents.**
- The list search request, the copy-ID feedback, the rows-per-page options, and the empty and loading states.
- The Duplicate call. The public API documents `POST .../{id}/duplicate/`.
- The `delete_related` value when the checkbox is clear.
- Import with a saved provider key.
- The manual connection grids for ElevenLabs, Retell, Bland AI, Synthflow, Agentforce, LiveKit, and Pipecat. The Kore.ai and Amazon Connect chat panels.
- The Gemini CX identity call and test call. The GitHub and Bitbucket code connection for Pipecat.
- Validation messages on "Next", on "Configure Agent", and on empty step 2 fields.
- `PATCH` bodies for edits other than the webhook.
- Knowledge file delete, "Create Connector", the "Website Scraper" fields, and edit and delete of mock tools and dynamic variables.
- What "Reconfigure" does, the Version History menu actions, and a real connection test.
- The purpose of `GET /test_framework/v1/tools`.

**Section 3, Metrics, Labs, Rubric.**
- The content of an expanded row.
- The Assign Agents, Toggle Settings, and bulk Delete dialogs.
- Save calls for the switches, drag reorder, Manage Metric, Create View, Predefined "Create Metrics", Update Metric, and Rubric "Save Changes".
- Quick Mode build, "Improve", the trigger "Generate" button, the Python trigger editor, the Enum key editor, and the effect of a dependency.
- Validation error texts, delete confirmations, and toasts.
- The sample-label review with real labels.
- Labs "Run", "Auto Improve", the review table rows, and the Python tab.
- A failed generation and the poll interval.

**Section 4, Assistant.**
- The prompt text of 5 of the 6 welcome cards, and of 2 of the 3 Reports suggestions.
- The stream of a message that opens the question widget, and the skill-start event.
- The Share dialog, the three icon buttons under each answer, the "Stop" button, the write confirmation, an error stream, a reconnect, and a successful `stream-token` response.
- The item shapes of a report, an organization skill, an organization MCP server, a slash command, and a conversation list item.
- The call that loads the messages of an old conversation.
- Attachment upload and its error texts.

**Section 5, Simulation.**
- A started run. The Configure Run dialog was recorded, but "Run" was not clicked.
- "Run from file" with a spec. "Check spec" and "Run" were not clicked.
- "Transcript Mode" create, "Conditional actions", and "Red Teaming" generation.
- The Evaluator actions "Duplicate", "Move to Folder", "Add Tags", "Modify Scenarios", "Export", "Create monitor", "Improve Scenarios", and "Compare Versions".
- "Clone a voice" with an audio sample.

**Section 6, Results and observability.**
- The Result detail page, the Run detail page, and a Calls table with data.
- Results: "Select View", the filter form, "Export All", "Reports", "Compare Results", "Reevaluate Metrics", and delete.
- Runs Overview: the "Save dashboard" call, the other filter tabs, the period options, and the line chart.
- Monitors: a created Monitor, the error display, "Call settings", "Quick Schedule", edit, delete, and run history.
- Calls: the code snippets for other providers, and "Create" with an upload.
- Alerts: types other than "Failure", "Configure Filter", Slack delivery, edit, and an Alert that fires.
- Insights: the "Enable insights" save call, Insight cards, and Deep Research.
- Dashboards: the custom Plot form, "Edit Plot", "Duplicate Plot", "Discard", the "In Daily Report" call, and the drag save.

**Section 7, Settings and billing.**
- A save on any settings page, with its toast and validation text.
- Multi-Factor Authentication (MFA) enrolment.
- API key create and delete, and the "Project Level" option.
- The invite form and the credit purchase. Both need a payment method.
- The call that returns the sidebar balance "204.84".
- Billing tabs other than "Usage History", the date picker, auto-refill, "Manage Billing", and the plan switch.
- The telephony number import, and providers other than Twilio.
- "Add MCP Server", "Custom Skills", the GitHub and Bitbucket connect flows, and the metric optimiser "Add schedule" form.
- The Slack, Discord, and Teams pages, the webhook "Test" buttons, and the redaction field picker.
- Which toggle maps to which field on the Webhook and Notifications pages (inferred mapping).

**Section 8, Backend.**
- Request headers. So the dashboard authentication is not described. The public API uses the `X-API-KEY` header.
- The `{*}` form of `ql` and the `400` for an unknown `ql` field.
- Pages after page 1, `PUT` calls, and `403`, `429`, and `5xx` responses.
- Bodies cut at 2500, 4000, 6000, or 30000 characters.

## 10. Live run on a reachable agent (2026-10-24)

This section records a second crawl. In this crawl, the agent under test answered real phone calls. So the Result, Run, Call, Lab, metric review, report, and Insights screens showed real data for the first time. Sections 2 to 9 describe the same screens in their empty states. Read this section together with them.

### 10.0 Context of the live run

#### What the crawler did

On 2026-10-24, the crawler did these steps in project 13875 "Automaton Project" (organization 7868, Pay As You Go (PayG) plan):

1. It created the test agent "zz-spec-test-agent-voice", ID 26259. Provider "Other". Connection "Telephony". Number +1 555 010 0199. "Inbound" on.
2. "Inbound" on means that the app calls that number. The number reaches a Vapi agent. That agent says it is "Sarah from the Tysons Regional Chamber of Commerce".
3. It ran 1 connection test call (10.1).
4. It ran 1 Evaluator 1 time. This made Result 970807 with Run 4168972 (10.3 to 10.5).
5. It uploaded 1 call recording to the Calls page. This made call log 13776321 (10.7).
6. It deleted every test record at the end (see "Test records and their deletion" below).

The crawler did not do these steps, by choice:

- It did not click "Generate Link" on the Result page. That button makes a public share link.
- It did not start a real "Run from file". It ran the dry run ("Check spec") only (10.14).

#### Terms used in this section

| Term | Meaning in this section |
|---|---|
| The crawler | The automated browser session that made the crawl steps 200 to 299. |
| Main Agent | The agent under test. Here it is the Vapi agent "Sarah". |
| Testing Agent | The simulated caller that the app runs. |
| Run | One simulated call of one Evaluator. Backend name: `run`. |
| Result | One batch of Runs. Backend name: `result`. |
| Call | One production call log on the Calls page. Backend name: `call-logs`. |
| Lab row | One reviewed call in a Lab. Backend name: `test-sets`. One Lab row holds one review for each Metric. |
| Metric review | The sample-label review of a new Metric. Backend name: `pattern-reviews`. |
| Progress ID | The ID that an asynchronous job returns. The page polls a progress endpoint with it. Section 8.3 describes the pattern. |

#### Credits

The balance went from 204.84 to 198.97 credits. The run spent 5.87 credits in total.

| Capture | Balance shown in the sidebar | Steps done before this capture |
|---|---|---|
| 214, 220b | 204.84 | Test call and Evaluator Run. The sidebar did not show the charge yet (inferred: the balance refreshes on page load). |
| 235 | 201.14 | Test call and Run: about 3.70 credits. |
| 240 | 200.87 | Call upload and its metric scores: about 0.27 credits. |
| 255 | 200.77 | Labs "Run" and "Auto Improve". |
| 259 | 200.57 | Assistant report. |
| 284 | 199.37 | "Reevaluate Metrics" and the Quick Mode Metric with its metric review. |
| 290 | 198.97 | Metric review "Rebuild". |

The split of the last 1.90 credits between steps is inferred from the order of the captures. The page does not show a cost for each step.

#### Test records and their deletion

| Record | ID | Made in | Deleted in | Delete call |
|---|---|---|---|---|
| Agent "zz-spec-test-agent-voice" | 26259 | 10.1 | capture 297 | `DELETE /test_framework/v2/aiagents/26259/?delete_related=true` returned 204 |
| Folder "zz-spec-test-folder" | path | 10.2 | capture 295 | `POST /test_framework/v1/scenarios/delete_folder/` with `{"path":"zz-spec-test-folder","project_id":13875}` returned 204 |
| Evaluators 402457, 402466, 402467 | 402457, 402466, 402467 | 10.2, 10.7, 10.13 | with the folder (inferred) | none seen for each Evaluator |
| Result and Run | 970807, 4168972 | 10.3 | with the agent (inferred from `delete_related=true`) | none seen |
| Call log | 13776321 | 10.7 | with the agent (inferred) | none seen |
| Monitor | 857 | 10.6 | capture 290 | `DELETE /schedules/v1/cron-jobs/857/` returned 204 |
| Lab row | 8290 | 10.5 | capture 299 | `DELETE /test_framework/test-sets/8290/` returned 204 |
| Metric "Message Offer When Unable to Answer" | 272359 | 10.9 | capture 294 | `DELETE /test_framework/v1/metrics/272359/` returned 204 |
| Personality "Polite Small Business Owner" | 9656 | 10.7 | capture 296 | `DELETE /test_framework/v1/personalities/9656/` returned 204 |
| Insights on Metric 240908 | config | 10.12 | capture 293 | `POST .../metric-config/` with `"enabled": false` |

Lab row 8291 came from the metric review "Rebuild" (10.10). No capture shows its deletion. It may have gone with Metric 272359.

#### Notes on the capture

- The crawl records keep only the backend calls to `backend.example.com` and `assistant.example.com`. A direct upload to object storage is not in the crawl records.
- Signed storage links and tokens are redacted as `<redacted>` and `<redacted-jwt>`.
- In some raw responses an em dash shows as the broken sequence `â€”`. The page shows a correct em dash at the same place. Treat the broken sequence as a capture defect (inferred). This section shows the correct em dash.

---

### 10.1 Agent creation and the connection test call

#### Route

- Create: `/agents/new?project=13875`. Section 2.5 to 2.7 describes the wizard.
- Edit: `/agents/26259`. Section 2.8 describes the page.

#### Input values

| Field | Value |
|---|---|
| "Where did you build your agent?" | "Other" |
| "Connections" | "Telephony" |
| "Phone Number" | +1 555 010 0199, country button "US" |
| "Inbound" | on. Help text: "If true, our agent will call you on above number." |
| Agent name | "zz-spec-test-agent-voice" |
| Description | "Voice assistant that answers inbound phone calls for a business. ..." |

#### Flow

1. The user clicks "Next", then saves step 2.
2. The page sends `POST /test_framework/v2/aiagents/connections/check/?project_id=13875`. Section 2.7 describes this check.
3. The check returns one connection with `testable: true`. The page sends `POST /test_framework/v2/aiagents/`. It returns 201.
4. A toast shows "Agent created successfully".
5. The dialog "Saved — want to place a test call?" opens.
6. The user clicks "Run test call". The page sends `POST /test_framework/v2/aiagents/26259/connections/test/`. It returns 202.
7. The dialog "Testing your connections" opens. The page polls `GET .../connections/test-progress/?progress_id=<id>`.
8. The poll returns `status: "completed"`. The dialog changes to "Connection test results".
9. The user clicks "Continue".

#### "Saved — want to place a test call?" dialog

| Element | Text (verbatim) | Behavior |
|---|---|---|
| Title | "Saved — want to place a test call?" | none |
| Text 1 | "A test call reaches your agent to confirm it answers and speaks. Each connection is a separate call, so pick only the ones you want to check." | none |
| Text 2 | "Configuration looks good on 1 connection, and your changes are saved." | The count comes from the connection check (inferred). |
| "Continue" | button | Closes the dialog without a test call (inferred). |
| "Run test call" | button, primary | Starts the test call. |
| "Close" | icon button | Closes the dialog. |

The capture does not show a per-connection checkbox. With 1 connection, the dialog sends `{"connection_types":["telephony"]}`.

#### "Testing your connections" dialog

| Element | Text (verbatim) |
|---|---|
| Title | "Testing your connections" |
| Headline | "Testing your connections…" |
| Connection line | "Phone" and the status label, for example "Talking to your agent" |
| Step list | "Preparing the test call", "Calling +15550100199", "Waiting for your agent to answer and speak" |
| Buttons | "Close" (disabled in the footer while the test is in progress), "Close" (icon) |

#### "Connection test results" dialog

| Element | Text (verbatim) |
|---|---|
| Title | "Connection test results" |
| Headline | "All 1 connections are working — your agent answered and replied on each one." |
| Connection line | "Phone" "Your agent answered and replied after 6.3s" |
| Step list | The 3 steps, each with a green check icon |
| Quote | "“Hello. I am Sarah from the Tysons Regional Chamber Commerce. Can I help you today?”" (in italics, from `agent_first_message`) |
| Footer text | "Nothing else to do." |
| Buttons | "Continue", "Close" |

#### Test-progress model

`POST .../connections/test/` and `GET .../connections/test-progress/` return the same object. The `POST` response adds `progress_id`.

| Field | Type | Meaning |
|---|---|---|
| `progress_id` | string | ID for the poll. `POST` response only. |
| `agent_id` | integer | The agent. |
| `status` | string | Seen: `in_progress`, `completed`. |
| `verdict` | string or null | `null` while the test is in progress. Seen at the end: `all_passed`. |
| `counts` | object | Number of connections in each state: `blocked`, `queued`, `dialing`, `in_call`, `passed`, `unverified`, `failed`. |
| `headline` | string | The dialog headline. |
| `connections[]` | array | One item for each tested connection. |

Fields of `connections[]`:

| Field | Meaning | Values seen |
|---|---|---|
| `type` | Connection type | `telephony` |
| `status` | Connection state | `queued`, `in_call`, `passed` |
| `status_label` | Text for the dialog | See the next table |
| `config_fingerprint` | Hash of the connection configuration | `95b911e486dfd405` |
| `docs_url` | Help link | `https://docs.example.com/documentation/integrations/custom-integration` |
| `blocked_reason`, `error_code`, `error_message`, `detail`, `credentials_note`, `participants`, `latency_ms`, `elapsed_seconds` | Error and extra data | all `null` |
| `resolution_steps` | Help steps for a failure | `[]` |
| `ended_reason` | Why the call ended | `Main agent-ended-call` |
| `agent_spoke` | The Main Agent spoke | `true` |
| `agent_first_message` | First Main Agent sentence | "Hello. I am Sarah from the Tysons Regional Chamber Commerce. Can I help you today?" |
| `turn_count` | Number of turns | `8` |
| `duration_seconds` | Call length | `39` |
| `answered_after_seconds` | Time to the first Main Agent speech | `6.3` |
| `transcript_preview[]` | First turns: `role`, `content`, `time`, `start_time`, `end_time`, `timing_source` | 6 items, `timing_source: "provider"` |
| `steps[]` | Step list: `key`, `label`, `status`, `detail` | keys `configuration`, `place`, `answer`, status `passed` or `running` |
| `started_at` | Start time in Unix seconds | `1792855219.6248362` |
| `verified` | Verification level | `responded` |
| `target` | Number that the app called | `+15550100199` |
| `call_id` | Call ID of the test call. It starts with `patronus_`. | `patronus_b9032e02-5566-4750-a90d-6dd1dfc5d7dc` |

`status_label` values seen:

| `status` | `status_label` (verbatim) |
|---|---|
| `queued` | "Waiting for a free call slot" |
| `in_call` | "Talking to your agent" |
| `passed` | "Your agent answered and responded" |

The capture did not show labels for `blocked`, `dialing`, `unverified`, or `failed`.

The page polled 24 times. 23 polls returned `in_call`. The last poll returned `completed`.

#### Backend calls

`POST /test_framework/v2/aiagents/` (201). Request:

```json
{
  "name": "zz-spec-test-agent-voice",
  "description": "Voice assistant that answers inbound phone calls for a business. ...",
  "language": "en",
  "telephony": {"phone_number": "+15550100199", "inbound": true},
  "provider": {"type": "custom", "agent_id": null, "chat_agent_details": {"type": "self_hosted"},
               "auto_dial_outbound": false, "auto_import_calls": false, "auto_sync_prompt": false},
  "project": 13875
}
```

Response (trimmed):

```json
{
  "id": 26259, "name": "zz-spec-test-agent-voice", "project": 13875, "language": "en",
  "telephony": {"inbound": true, "phone_number": "+15550100199", "sip_uri": null},
  "provider": {"type": "custom", "send_post_conversation_metadata": false, "auto_dial_outbound": false,
               "redact_fields": [], "chat_provider": "self_hosted", "chat_agent_details": {"type": "self_hosted"}},
  "agent_speaks_first": null, "knowledge_base_files": [], "enabled_personalities": [693],
  "webhook_url": "", "webhook_secret_configured": false, "mock_tools": [], "mock_tools_enabled": true,
  "dynamic_variables": [], "created_at": "2026-10-24T15:20:01.246552Z", "email_id": null
}
```

The server enabled Personality 693 ("Normal Male") on the new agent without a request for it.

`POST /test_framework/v2/aiagents/26259/connections/test/?project_id=13875` (202). Request:

```json
{"connection_types": ["telephony"]}
```

Response (trimmed):

```json
{
  "progress_id": "ec9a282b-91bf-43fc-bf95-3348056b3257", "agent_id": 26259,
  "status": "in_progress", "verdict": null,
  "counts": {"blocked": 0, "queued": 1, "dialing": 0, "in_call": 0, "passed": 0, "unverified": 0, "failed": 0},
  "headline": "Testing your connections…",
  "connections": [{"type": "telephony", "status": "queued", "status_label": "Waiting for a free call slot",
                   "steps": [], "transcript_preview": [], "call_id": null, "...": "..."}]
}
```

Last `GET .../connections/test-progress/?progress_id=ec9a282b-...&project_id=13875` (200), trimmed:

```json
{
  "agent_id": 26259, "status": "completed", "verdict": "all_passed",
  "counts": {"blocked": 0, "queued": 0, "dialing": 0, "in_call": 0, "passed": 1, "unverified": 0, "failed": 0},
  "headline": "All 1 connections are working — your agent answered and replied on each one.",
  "connections": [{
    "type": "telephony", "status": "passed", "status_label": "Your agent answered and responded",
    "ended_reason": "Main agent-ended-call", "agent_spoke": true,
    "agent_first_message": "Hello. I am Sarah from the Tysons Regional Chamber Commerce. Can I help you today?",
    "turn_count": 8, "duration_seconds": 39, "answered_after_seconds": 6.3,
    "transcript_preview": [
      {"role": "Testing Agent", "content": "Hello, can you hear me?", "time": "00:00",
       "start_time": 0.565668, "end_time": 1.847668, "timing_source": "provider"},
      {"role": "Main Agent", "content": "Hello. I am Sarah from the Tysons Regional Chamber Commerce. Can I help you today?",
       "time": "00:06", "start_time": 6.267668, "end_time": 12.712668, "timing_source": "provider"},
      "..."
    ],
    "steps": [
      {"key": "configuration", "label": "Preparing the test call", "status": "passed", "detail": null},
      {"key": "place", "label": "Calling +15550100199", "status": "passed", "detail": null},
      {"key": "answer", "label": "Waiting for your agent to answer and speak", "status": "passed", "detail": null}
    ],
    "verified": "responded", "target": "+15550100199",
    "call_id": "patronus_b9032e02-5566-4750-a90d-6dd1dfc5d7dc"
  }]
}
```

The Testing Agent of the test call says "Hello, can you hear me?" and then "Okay." The test call is not a Run. It does not show on the Results page.

#### Agent description edit

The crawler opened `/agents/26259` and changed "Description of your AI Agent*". The "Save Changes" button sent one `PATCH`. The page shows the warning "This description looks a bit short." under the text box.

`PATCH /test_framework/v2/aiagents/26259/` (200). Request:

```json
{"description": "Sarah is the phone assistant of the Tysons Regional Chamber of Commerce. She greets callers, answers questions about the chamber, membership, and events, and takes messages for the chamber staff. Test agent for a specification."}
```

The response is the full agent object with the new `description` and a new `updated_at`. The page then sends `GET /test_framework/v2/aiagents/26259/?ql={-knowledge_base_files}`.

The edit made agent version "v2". `GET /test_framework/v1/aiagents/26259/history/` lists `v2` (`history_type: "~"`, `is_current: true`) and `v1` (`history_type: "+"`). Both items have `is_runnable: false`. The Run in 10.3 still used "v2".

On the edit page, the "Chat" button "Websocket" shows as pressed, with the "Custom Chatbot Settings" block. The agent has `chat_provider: "self_hosted"`. The create wizard did not show this state.

---

### 10.2 Manual Mode Evaluator creation

#### Route

`/test-case/create?folder=zz-spec-test-folder&project=13875`. Section 5.10 describes the page shell.

#### Layout

1. Breadcrumb "Evaluators" > "Create an Evaluator", link "Docs".
2. Mode buttons "AI Mode", "Manual Mode", "Transcript Mode". The crawler used "Manual Mode".
3. Step bar "1 Scenario Input", "2 Basics", "3 Criteria", "4 Configuration". A finished step shows its name without the number.
4. Footer buttons "Back" and "Next". Step 4 shows "Create Evaluator" in place of "Next".

Before the page opened, the crawler made the folder. `POST /test_framework/v1/scenarios/create_folder/` with `{"name":"zz-spec-test-folder","project_id":13875}` returned 201.

#### Step 1: Scenario Input

| Label (verbatim) | Control | Value in the run | Notes |
|---|---|---|---|
| "Agent" / "Select the agent to test with this evaluator *" | combobox | "zz-spec-test-agent-voice" | none |
| "Scenario Input Type *" | combobox | "Instruction" | Options (read from the open list during the crawl): "Instruction" (default) and "Structured Test Case". The crawl record does not hold the open list. |
| "Test Profile" / "Test profile is the information you expect Test Agent to know. Example the name, date of birth etc." | combobox | "37004 Default Test Profile - Voice Regression — E2E Deploy Agent Sq (22757)" | See the validation gap below. |
| "First Message" / "Enter the first message to be said by Test Agent. If empty, Test Agent will wait to receive a message" | text box | "Hello, is this the chamber of commerce?" | none |
| "Instructions *" | text area with "Improve" button | `<scenario>` block, see the request | Variable buttons: "{{test_profile}}", "{{test_profile.city}}", "{{test_profile.date_of_birth}}", "{{test_profile.email_address}}", "View More". |

Help text under the instructions (verbatim): "Refer to the Test Agent in first person like "You are". Do not provide exact steps like when AI Agent says "xyz", do this. Keep all information separate in information block."

#### Validation gap: test profile of another agent

The "Test Profile" box selected profile 37004 by default. Profile 37004 belongs to agent 22757, not to agent 26259. The page sent these 2 searches:

1. `GET /test_framework/v1/test-profiles/?...&search=Default+Test+Profile&agent_id=22757` returned profile 37004.
2. `GET /test_framework/v1/test-profiles/?...&search=Default+Test+Profile&agent_id=26259` returned profile 62396 "Default Test Profile - zz-spec-test-agent-voice (26259)".

The form kept 37004. The server accepted it. The Run then sent the data of "Maria Garcia" from agent 22757 to the Testing Agent. A rebuild must default to the profile of the selected agent. A rebuild must also reject, or warn about, a profile of another agent.

#### Step 2: Basics

| Label (verbatim) | Control | Value in the run |
|---|---|---|
| "AI Evaluator Name*" | text box | "zz-spec-test-eval-membership" |
| "Folder" / "Select the folder to save the evaluator *" | combobox | "zz-spec-test-folder" |
| "Tags" / "Press Enter to add a tag" | tag input, placeholder "Create tags..." | "zz-spec-test" |
| "Personality*" / "Tone of the conversation for the Test Agent." | combobox, default "Select Personality" | "Normal Male" (ID 693) |
| "Language" / "Select the language of the conversation" | combobox | "en English" |

Calls on step 2: `GET /test_framework/v1/scenarios/folders/?project_id=13875` and `GET /test_framework/v1/scenarios/tags/?project_id=13875`. The tags call returned `["booking","callback","connection-test","junk call","sales call"]`.

#### Step 3: Criteria

| Label (verbatim) | Control | Value in the run |
|---|---|---|
| "Expected Outcome Prompt" / "Enter the expected outcome prompt." | text area | 3 lines, see the request |
| Variable buttons | buttons | "{{test_profile}}", "{{metadata}}", "{{metadata[\"key\"]}}", "{{provider_call_details}}", "{{evaluator.instructions}}", "View More" |
| Help text | text | "AI agent is "Main Agent" and User is "Testing Agent"." |
| "Metrics" / "Select metrics to evaluate the conversation" | button that opens a picker | "AI interrupting user Average Pitch (in Hz) Expected Outcome + 12 more" |

The metrics picker is a dialog with a search combobox and a list "Suggestions". The first option is "(Select All)". It was selected by default. The list held 15 Metrics: "AI interrupting user", "Average Pitch (in Hz)", "Expected Outcome", "Infrastructure Issues", "Interruption Score", "Latency (in ms)", "Stop Time after User Interruption (ms)", "Talk Ratio", "Tool Call Success", "Transcription Accuracy", "Unnecessary Repetition Score", "Persona Integrity", "No Fabricated Availability", "Confirmation Before Mutation", "Mock tool call accuracy". A second group holds "Clear" and "Close".

#### Step 4: Configuration

| Label (verbatim) | Control | Default |
|---|---|---|
| "Phone Number" | combobox | "None" |
| "Send DTMF" | switch | off |
| "Receive DTMF" | switch | off |
| "End Call" | switch | on |
| "End Call Only on Transfer" | switch | off |
| "Send SMS" | switch | off |
| "Call Hold" | switch | off |
| "Max Call Duration (seconds)" / "Optional: Override project's max call duration (10-3600 seconds)" | spin button | empty. The crawler entered 120. |

The crawl step `209-evaluator-manual-step4` holds the help text of each tool switch. On step 4, the page sends `GET /test_framework/v1/phone-numbers/?organization_id=7868&call_service_provider=patronus`. It returned a long list of the app's numbers. The crawl record cuts the response after 40,000 characters, so the full count is not known. Each number has `id`, `number`, `call_service_provider: "patronus"`, `provider: "builtin"`, and `queue_length`.

#### Backend call: create

`POST /test_framework/v2/scenarios/` (201). Request:

```json
{
  "name": "zz-spec-test-eval-membership",
  "personality": "693",
  "instructions": "<scenario>\n- You are a small business owner who wants to know how to join the chamber.\n- Ask one question about membership.\n- Thank the agent and say goodbye after the answer.\n- Keep the call under one minute.\n</scenario>",
  "project": 13875,
  "metrics": [240898, 240899, 240900, 240901, 240902, 240903, 240904, 240905, 240906, 240907, 240908, 243607, 243608, 243609, 272059],
  "first_message": "Hello, is this the chamber of commerce?",
  "tags": ["zz-spec-test"],
  "expected_outcome_prompt": "- The Main Agent greets the Testing Agent.\n- The Main Agent answers the membership question or offers to take a message.\n- The Main Agent ends the call politely.",
  "scenario_language": "en",
  "tool_ids": ["VAPI_TOOL_END_CALL"],
  "test_profile": "37004",
  "scenario_type": "instruction",
  "folder_path": "zz-spec-test-folder",
  "agent": 26259,
  "max_duration": 120
}
```

Response (trimmed):

```json
{
  "id": 402457, "name": "zz-spec-test-eval-membership", "agent": 26259, "project": 13875,
  "personality": 693, "personality_name": "Normal Male", "agent_name": "zz-spec-test-agent-voice",
  "tags": ["zz-spec-test"], "tool_ids": ["VAPI_TOOL_END_CALL"],
  "metric_names": ["AI interrupting user", "Average Pitch (in Hz)", "...", "Mock tool call accuracy"],
  "phone_number": null, "inbound_phone_number": null,
  "scenario_type": "instruction", "suite_type": "undefined", "is_predefined": false,
  "test_profile": 37004,
  "test_profile_data": {"id": 37004, "agent": 22757, "name": "Default Test Profile - Voice Regression — E2E Deploy Agent Sq (22757)",
                        "information": {"full_name": "Maria Garcia", "date_of_birth": "1988-04-15", "...": "..."}},
  "folder_path": "zz-spec-test-folder", "max_duration": 120,
  "is_simulating": false,
  "call_service_provider": "patronus", "call_service_provider_inbound": "patronus", "call_service_provider_outbound": "patronus"
}
```

After the create, the page opens `/test-case?folder=zz-spec-test-folder&page=1&pageSize=30`. The new row shows: "402457", "zz-spec-test-eval-membership", "Normal Male", the agent with the link "Go to agent: zz-spec-test-agent-voice", "No number", the test profile, "English", "15" Metrics, tag "zz-spec-test", and the created and updated times "10/24, 17:24 (Automaton)".

---

### 10.3 Run start: "Configure Run" and "Run Status"

#### "Configure Run" dialog with a reachable agent

Section 5.15 describes the dialog. With agent 26259, the dialog showed these values:

| Label (verbatim) | Control | Value in the run |
|---|---|---|
| "Agent" | combobox | "zz-spec-test-agent-voice" |
| "Label" / "Add helpful text for your reference later" | text box | "zz-spec-test-run-1" |
| "Number of Times to Run" / "Provide number of times each evaluator will run." | spin button | "1" |
| "1 metric won't be evaluated on this run" | button | Shown. The Metric is "Tool Call Success" (inferred: it has `simulation_enabled: false`). |
| "Connections" / "Pick a configured connection to run with. Greyed out connections are not set up on this agent." | toggle buttons | "Telephony" enabled. "SIP", "Websocket", "SMS", "WhatsApp", chat "Websocket" disabled. |
| "Phone Number" / "This is your phone number Test Agent will call on" | country button "US" and text box | "+1 555 010 0199", from the agent |
| "Show 5 more fields" | button | Not opened |
| "Max concurrent: 10" | button | Not opened |
| "Run" | button | Clicked |

On open, the dialog sends:

- `GET /test_framework/v2/aiagents/26259/?ql={id,name,email_id,mock_tools,mock_tools_enabled,telephony{phone_number,sip_uri,inbound,websocket_url},provider{...}}`.
- `GET /test_framework/v1/aiagents/26259/history/?page=1&page_size=51&ql={history_id,version_id,version_name,is_current,is_runnable}`.

#### Flow on "Run"

1. The page sends `GET /test_framework/v1/phone-numbers/check_occupancy/?phone_number=+15550100199&organization_id=7868`.
2. The response is `{"phone_number":"+15550100199","is_occupied":false,"message":"Phone number is available"}`.
3. The page sends `POST /test_framework/v1/scenarios/run_scenarios/?folder_path=zz-spec-test-folder`.
4. The dialog "Run Status" opens.

The capture does not show the behavior when `is_occupied` is `true`.

`POST /test_framework/v1/scenarios/run_scenarios/?folder_path=zz-spec-test-folder` (200). Request:

```json
{
  "agent_id": 26259, "project_id": 13875, "scenarios": [402457], "frequency": 1,
  "name": "zz-spec-test-run-1", "outbound_phone_number": "+15550100199", "concurrency_limit": 10
}
```

Response:

```json
{
  "id": 970807, "name": "zz-spec-test-run-1", "agent": 26259, "agent_inbound": true,
  "status": "running", "success_rate": 0.0, "run_as_text": false, "is_cronjob": false,
  "runs": [{
    "id": 4168972, "status": "running", "scenario": 402457, "number": null,
    "inbound_number": "+17623566401", "inbound_email": null,
    "scenario_name": "zz-spec-test-eval-membership",
    "test_profile_data": {"full_name": "Maria Garcia", "date_of_birth": "1988-04-15", "...": "..."},
    "test_profile_name": "Default Test Profile - Voice Regression — E2E Deploy Agent Sq (22757)",
    "outbound_dial_window_opens_at": null, "outbound_dial_window_seconds": null, "outbound_dial_window_closes_at": null
  }],
  "created_at": "2026-10-24T15:25:10.328491Z", "updated_at": "2026-10-24T15:25:10.332153Z"
}
```

Field notes:

- `id` is the Result ID. `runs[].id` is the Run ID.
- The request field is `outbound_phone_number`, but it holds the number that the app calls. It is the agent number.
- `runs[].inbound_number` is the app's number that the Testing Agent calls from. The page shows it as "Testing Agent Number" and "Inbound Call (+17623566401)".
- `test_profile_data` is a copy of the test profile at Run start.

#### "Run Status" dialog

| Element | Text (verbatim) |
|---|---|
| Title | "Run Status" |
| Heading | "Run Initiated Successfully" |
| Text | "Your runs have been started successfully." |
| Link button | "View Results" opens `/13875/results/970807` |
| Button | "Close" |

The Result route is `/<project>/results/<resultId>`. The page adds `?runPage=1&pageSize=30`.

---

### 10.4 Result detail page

#### Route

`/13875/results/970807?runPage=1&pageSize=30`. Section 6.1 describes the Results list. The capture of 2026-10-23 did not reach this page.

#### Layout

1. Header row: back arrow button, title "zz-spec-test-run-1 (970807)", chips, "Share Report" button (dark, right).
2. Score block: a half-circle gauge with the pass percent, a heading, and a status line.
3. Card "AI summary".
4. Card "Workflow Coverage", collapsed by default.
5. Card "Metrics" with groups "RUBRIC" and "CALL STATS", and the toggle "Show 4 more metrics".
6. Card "Runs" with a count badge, a toolbar, and the Runs table.

#### Header chips

| Chip | Text (verbatim) | Behavior |
|---|---|---|
| Agent | "zz-spec-test-agent-voice v2" with an arrow icon | The link "Go to zz-spec-test-agent-voice" opens `/agents/26259`. "v2" is the agent version of the Run. |
| Channel | "Telephony" with an info icon | The icon button is "View run details". Its content was not captured. |
| Time | "Result Trigger Time: Oct 24, 2026 at 05:25 PM" | none |

#### States

| State | Gauge and heading | Summary card | Workflow Coverage | Call stats |
|---|---|---|---|---|
| In progress (213) | "0%", "0 of 1 run passed", "1 in progress" | "AI summary Analyzing this result…" and "Generating summary…" | "Computing…" | "Failed to Connect 1", "Latency P50 — P95 — P99 —", and a button "Disabled" |
| Completed (214) | "100%", "1 of 1 run passed", "No failures detected" | "AI summary", "No failures to explain on this result", "No failures detected." | "1 of 4 Covered", "25%" with a red bar | See "Metrics card" |

While the Run is in progress, the page polls 2 calls:

- `GET /test_framework/v2/results/970807/?ql={id,status,total_runs_count,completed_runs_count,success_runs_count,failed_runs_count,ai_summary_status}`.
- `GET /test_framework/v2/runs/?page=1&page_size=30&result_id=970807&ql={...}`.

Poll responses seen, in order:

```json
{"id": 970807, "status": "running", "total_runs_count": 1, "completed_runs_count": 0, "success_runs_count": 0, "failed_runs_count": 0, "ai_summary_status": "pending"}
{"id": 970807, "status": "running", "total_runs_count": 1, "completed_runs_count": 1, "success_runs_count": 1, "failed_runs_count": 0, "ai_summary_status": "skipped_no_failures"}
{"id": 970807, "status": "completed", "total_runs_count": 1, "completed_runs_count": 1, "success_runs_count": 1, "failed_runs_count": 0, "ai_summary_status": "skipped_no_failures"}
```

When `completed_runs_count` changes, the page also loads the full Result (inferred trigger) with `GET /test_framework/v2/results/970807/?ql={-runs}`. The `ai_summary_status` value `skipped_no_failures` gives the text "No failures to explain on this result". The capture did not show a Result with failures, so the real summary text was not seen.

#### Workflow Coverage

The card header shows "Workflow Coverage", "1 of 4 Covered", "25%", and a bar. A click opens the list:

| Item (verbatim) | State |
|---|---|
| "Provide membership information" | Covered, green check |
| "Answer chamber questions" | Not covered, dash |
| "Provide event information" | Not covered, dash |
| "Take a message for staff" | Not covered, dash |

The data is `path_coverage` in the full Result:

```json
"path_coverage": {
  "total_paths": 4, "coverage_pct": 25.0, "generated_at": "2026-10-24T15:26:29.260755+00:00",
  "covered_paths": ["Provide membership information"],
  "uncovered_paths": ["Answer chamber questions", "Provide event information", "Take a message for staff"]
}
```

The 4 paths match the agent description of 10.1 (inferred: the server makes the paths from the description with a Large Language Model (LLM)).

#### Metrics card

The card has these groups:

| Group label | Content | Source |
|---|---|---|
| "RUBRIC" | One tile for each Metric with `in_rubric: true`. Each tile shows the name, the aggregate value, a bar, and a ">" arrow. | `performance_metrics[]` |
| "CALL STATS" | "Failed to Connect 0". "Latency" with "P50 1,870", "P95 2,554", "P99 2,614.8", and the mean "2,083.33 ms". "Avg Ringing Duration" with "P50 0" and "0 s". | `not_connected_runs`, `latency_data`, `extra_metrics` |
| "NUMERIC" | Hidden until "Show 4 more metrics". Tiles "AI interrupting user 0", "Average Pitch (in Hz) 206.57", "Talk Ratio 0.73". | `performance_metrics[]` with `in_rubric: false` |
| "TAGS" | Hidden until "Show 4 more metrics". Tile "zz-spec-test 100%". | `runs_by_tags` |

"Show 4 more metrics" counts the 3 numeric tiles and the 1 tag tile. When open, the button text is "Show fewer".

Tile values in the run:

| Tile | Shown value | `aggregate_value`, `aggregate_unit` | `threshold_text` |
|---|---|---|---|
| Expected Outcome | "100%" | 100.0, `percent` | "= 5" |
| Infrastructure Issues | "100%" | 100.0, `percent` | "= True" |
| Interruption Score | "100%" | 5.0, `score` | "≥ 1" |
| "Latency (in ms)" | "2,083.33" | 2083.33, `value` | "≤ 10000" |
| "Stop Time after User Interruption (ms)" | "—" | `null` | "≤ 10000" |
| Transcription Accuracy | "—" | `null` | "≥ 1" |
| Unnecessary Repetition Score | "100%" | 5.0, `score` | "≥ 2.5" |
| Persona Integrity | "100%" | 100.0, `percent` | "= True" |
| No Fabricated Availability | "100%" | 100.0, `percent` | "= True" |
| Confirmation Before Mutation | "100%" | 100.0, `percent` | "= True" |
| Mock tool call accuracy | "—" | `null` | "= 5" |

A Metric with a `score` unit shows a percent of the 0 to 5 scale (inferred: 5 out of 5 shows as 100%). A `null` value shows "—" and counts as `passed: false` in `performance_metrics[]`. The gauge still shows 100%, because the Run passed (inferred: the gauge uses `success_rate`).

One item of `performance_metrics[]`:

```json
{
  "metric_id": 240902, "metric_name": "Interruption Score", "eval_type": "continuous_qualitative",
  "aggregate_value": 5.0, "aggregate_unit": "score", "passed": true, "threshold_text": "≥ 1",
  "evaluated_runs_count": 1, "evaluated_run_ids": [4168972], "failing_run_ids": [], "passing_run_ids": [4168972],
  "in_rubric": true, "score_range_run_ids": {"0-50": [], "50-75": [], ">75": [4168972]}
}
```

Other fields of the full Result (trimmed):

```json
{
  "id": 970807, "status": "completed", "success_rate": 100.0,
  "agent_version": {"history_id": 7107560, "version_id": "v2", "version_name": null, "is_current": true},
  "met_expected_outcome_count": 1, "total_expected_outcome_count": 1,
  "created_via": "user", "created_by": {"id": 9855, "name": "Automaton", "email": "<user-email>"},
  "overall_evaluation": {
    "success_rate": 100.0,
    "extra_metrics": [{"name": "Average Ringing Duration", "type": "numeric", "value": 0.0, "percentiles": {"p50": 0.0}}, "..."],
    "metric_summary": {"240900": {"id": 240900, "name": "Expected Outcome", "score": 5.0,
                                  "overall_explanation": ["All expected outcome elements were met in the single call: ...", "..."]}, "...": "..."},
    "worst_performing_metrics": {"binary_adherence": []}
  },
  "total_duration": "00:40",
  "connected_runs": [4168972], "not_connected_runs": [], "failed_infrastructure_runs": [], "failed_workflow_runs": [],
  "successful_calls": [4168972],
  "runs_by_tags": {"zz-spec-test": {"runs": [4168972], "success_rate": 100.0}},
  "latency_data": {"mean": 2083.33, "median": 1870.0, "p50": 1870.0, "p95": 2554.0, "p99": 2614.8},
  "ai_summary": {}, "ai_summary_status": "skipped_no_failures", "next_steps": [],
  "run_type": "Voice",
  "run_settings": {"mode": "same_number", "frequency": 1, "agent_number": "+15550100199", "concurrency_limit": 10,
                   "outbound_phone_number": "+15550100199", "version_run_over_phone": true}
}
```

`metric_summary.<id>.overall_explanation` holds up to 3 sentences of cross-call analysis for each Metric. The capture did not show where the page displays this text.

#### Metric popup

A click on a tile opens a dialog with the Metric name as its title.

| Element | Binary or rating Metric (Expected Outcome) | Numeric Metric (Latency) |
|---|---|---|
| Tabs | "Failure (0)" and "Success (1)". "Success" is selected when no failure exists. | No tabs |
| Text | "Description" and "Threshold: = 5" | "Description" and "Threshold: ≤ 10000" |
| Run item | Button "10/24/2026, 05:25:10 PM Normal Male", heading "Scenario: zz-spec-test-eval-membership", "Score: 5" | Same, with "2,083.33 ms" in place of the score |

A click on a Run item opens the Run detail panel (inferred). The popup sent no backend call.

#### Runs card

Toolbar: heading "Runs" with badge "1", "Filters", "Reevaluate Metrics", "Add to Lab", "Run Selected", and a red icon button "Delete selected runs". "Reevaluate Metrics", "Add to Lab", "Run Selected", and the delete button stay disabled until a row is selected.

Table columns, in order: row menu (three dots), checkbox and "ID", "Evaluator Name", "Run Start Time", "Duration", "Evaluation", "Personality", "Test Profile", "Testing Agent Number", "Call Ended Reason", "Ringing Duration", "Feedback", then one column for each Metric with `simulation_enabled: true`. Sortable columns have a "Sort by <name>" button. Each column has a drag handle.

Row of Run 4168972:

| Column | Cell |
|---|---|
| ID | "4168972" |
| Evaluator Name | "zz-spec-test-eval-membership (402457)" |
| Run Start Time | "Oct 24, 2026, 5:25 PM" |
| Duration | "00:40m". While the Run is in progress: "00:00m". |
| Evaluation | Combobox "Success" with a green check. While the Run is in progress: text "In Progress". |
| Personality | "Normal Male (693)" with the link "Go to personality: Normal Male" to `/personality/edit/693?project=13875` |
| Test Profile | "Default Test Profile - Voice Regression — E2E Deploy Agent Sq (22757)" |
| Testing Agent Number | "+17623566401" |
| Call Ended Reason | "Main agent-ended-call" |
| Ringing Duration | "0.00" |
| Feedback | Empty, with an edit icon button |
| Metric cells | Numbers, for example "206.57", or a percent bar "100%", or "NONE" for a `null` score. Binary Metrics show an icon only (inferred from empty accessible text). |

The latency column header is "Latency (in ms) FT P50 P99". Its cell shows 3 numbers: "1750.00 1870.00 2614.80". They are the first-turn latency ("FT", inferred: first turn), the 50th percentile (P50), and the 99th percentile (P99).

The Runs list call returns these fields for each Run:

```json
{
  "id": 4168972, "scenario": 402457, "scenario_name": "zz-spec-test-eval-membership",
  "personality": 693, "personality_name": "Normal Male", "result_id": 970807,
  "agent": 26259, "agent_name": "zz-spec-test-agent-voice", "duration": "00:40",
  "status": "completed", "evaluation_status": "success", "expected_outcome": {"score": 100}, "success": true,
  "timestamp": "2026-10-24T15:25:10.338384Z", "executed_at": "2026-10-24T15:25:10.769722Z",
  "metadata": {"ended_reason": "Main agent-ended-call", "ringing_duration": 3e-06, "call_started_at": "2026-10-24T15:25:13.526504Z"},
  "inbound_number": "+17623566401",
  "metrics": [
    {"id": 240903, "name": "Latency (in ms)", "type": "numeric", "score": 2083.33,
     "extra": {"percentiles": {"p25": 1810.0, "p50": 1870.0, "p75": 2250.0, "p90": 2478.0, "p95": 2554.0, "p99": 2614.8}, "first_turn": 1750.0}},
    {"id": 243609, "name": "Confirmation Before Mutation", "type": "binary", "score": true, "extra": {}},
    "..."
  ],
  "error_message": "", "test_profile_name": "Default Test Profile - Voice Regression — E2E Deploy Agent Sq (22757)",
  "run_type": "Voice", "feedback": "",
  "agent_version": {"history_id": 7107560, "version_id": "v2", "version_name": null, "is_current": true}
}
```

#### Runs "Filters"

"Filters" opens a popover. It shows "Filters", "No filters yet.", "Add filter", "Clear", and "Apply". On open, the page sends `GET /test_framework/v1/scenarios/?...` and `GET /test_framework/v1/scenarios/tags/?...`. The crawler did not add a filter.

#### "Reevaluate Metrics"

The crawler selected the row. It clicked "Reevaluate Metrics". The dialog opened.

| Element | Text (verbatim) |
|---|---|
| Title | "Reevaluate Metrics" |
| Text | "Select the metrics you want to reevaluate for the chosen runs." |
| Search | combobox |
| "Select All" | button |
| List | One checkbox for each project Metric, with its ID: "240898 AI interrupting user" to "272059 Mock tool call accuracy". The list includes "240906 Tool Call Success". |
| Counter | "0 metrics selected" |
| "Start Reevaluation" | button. Disabled while 0 Metrics are selected. |
| "Close" | button |

The crawler selected "240900 Expected Outcome" and clicked "Start Reevaluation".

`POST /test_framework/v1/results/970807/evaluate_metrics/` (200). Request:

```json
{"run_ids": [4168972], "metric_ids": [240900]}
```

The response is the short Result object of the run start (10.3), with `status: "running"`. The page then polls the Result and the Runs again. The Result went from `running` back to `completed`. The capture did not show a toast for the reevaluation.

#### "Share Report" menu

"Share Report" opens a menu with 2 items:

| Item | Behavior |
|---|---|
| "Generate Link" | Makes a public share link (inferred). Not clicked, by choice. |
| "Download PDF" | Opens the dialog "Select Metrics for Report". |

"Select Metrics for Report" dialog:

| Element | Text (verbatim) |
|---|---|
| Title | "Select Metrics for Report" |
| Counter | "0 metrics selected" |
| Buttons | "Select All", "Clear All" |
| List | One checkbox for each Metric of the Result, with its score: "AI interrupting user Score: 0.00", "Average Pitch (in Hz) Score: 206.57", "Expected Outcome Score: 5.00", "Infrastructure Issues Score: 1.00", "Interruption Score Score: 5.00", "Latency (in ms) Score: 2083.33", "Stop Time after User Interruption (ms) Score: 0.00", "Talk Ratio Score: 0.73", "Transcription Accuracy Score: 0.00", "Unnecessary Repetition Score Score: 5.00", "Persona Integrity Score: 1.00", "No Fabricated Availability Score: 1.00", "Confirmation Before Mutation Score: 1.00", "Mock tool call accuracy Score: 0.00" |
| Note | "PDF will include detailed analysis of selected metrics" |
| "Download Report" | button. Disabled while 0 Metrics are selected. |

The list shows `null` scores as "0.00". Tool Call Success is not in the list, because the Result has no score for it.

The crawler selected Metrics and clicked "Download Report". The browser opened the PDF in a new tab with a `blob:` URL. The crawl record shows no backend call for this step. So the browser makes the PDF from data that it already holds. The new tab is not in the accessibility capture. The crawler reported it.

#### Runs row actions not tested

"Add to Lab" and "Run Selected" in the Runs toolbar, the row menu, and "Delete selected runs" were not clicked on this page. 10.5 shows "Add to Lab" from the Run detail panel.

---

### 10.5 Run detail panel

#### Route

`/13875/results/970807?runPage=1&pageSize=30&call_id=4168972`. A click on a Run row adds `call_id=<runId>`. The panel is a full-height dialog "Run details" over the Result page. Its close icon removes `call_id` (inferred).

#### Layout

The panel has 2 columns.

Left column, top to bottom:

1. Header: Evaluator name, 3 icon buttons (eye, pencil, share), and the chip row.
2. Status combobox.
3. "Feedback:" row with an edit icon button.
4. Card "Rubric Breakdown".
5. Card "Metrics" with the Latency and Pitch charts.
6. Card "Metadata".

Right column, top to bottom:

1. Buttons "Add to Lab" and "Monitor this daily", and the close icon.
2. Audio player with a stereo waveform.
3. Tab "Transcript" with the button "Copy transcript".
4. Transcript messages.
5. Footer "Call ended: Main agent-ended-call".

#### Header

| Element | Text (verbatim) | Behavior |
|---|---|---|
| Title | "zz-spec-test-eval-membership" | none |
| Eye icon | no label | Not clicked. Opens the Evaluator (inferred). |
| Pencil icon | no label | Not clicked. Edits the Evaluator (inferred). |
| Share icon | no label | Not clicked. Shares the Run (inferred). |
| Agent chip | "zz-spec-test-agent-voice · v2", "Copy agent", link "Open agent" to `/agents/26259` | none |
| Personality chip | "Normal Male", "Copy personality" | none |
| Test profile chip | "Default Test Profile - Voice Regression — E2E Deploy Agent Sq (22757)", "Copy testProfile", link "Open test profile" to `/test-case?test_profile=37004` | none |
| Time chip | "Run started at Oct 24, 2026, 05:25 PM", "Copy timestamp" | none |
| Connection chip | "Inbound Call (+17623566401)", "Copy connection" | The number is the Testing Agent number. |

#### Status dropdown

The combobox shows the evaluation status, for example "Success" with a green check. A click opens a list with 2 options: "Reviewed Success" and "Reviewed Failure".

The crawler picked "Reviewed Success".

`PATCH /test_framework/v1/runs/4168972/` (200). Request:

```json
{"evaluation_status": "reviewed_success"}
```

The response is the full Run. It has `evaluation_status: "reviewed_success"` and `is_reviewed: true`. The page then reloads the Result and the Runs list. The combobox and the Runs table show "Reviewed Success".

#### Feedback

1. The user clicks the pencil icon in the "Feedback:" row. The text "No feedback provided" changes to a text box with "Cancel" and "Save".
2. The user types the text and clicks "Save".
3. The page sends `PATCH /test_framework/v1/runs/4168972/`. The row shows the text.

Request:

```json
{"feedback": "zz-spec-test feedback: the agent answered the membership question."}
```

The response is the full Run with the new `feedback`. The Runs view (10.15) shows the text in the "Feedback" column.

#### Rubric Breakdown

The card header shows "Rubric Breakdown", a green badge "Passed - 8", and "A set of conditions your agent is evaluated against." The link "View Rubric" opens `/rubric`. When open, the card shows the button "Show passed conditions (8)". The crawler did not open that list.

The data is `rubric[]` in the Run. Each item:

```json
{
  "value": 2083.33, "passed": true, "metric_id": 240903, "conditions": "score lte 10000",
  "explanation": ["Average Latency: 2083.33ms\nP99: 2614.8ms, ..."],
  "metric_name": "Latency (in ms)",
  "expected_conditions": {"operator": "and", "conditions": [{"op": "lte", "field": "score", "value": 10000}]}
}
```

The Run has 8 rubric items. Metrics with a `null` score have no rubric item. After the Metric correction below, the badge showed "Passed - 7".

#### Metrics card

Header: "Metrics", "Used to understand and evaluate the performance of your AI Voice Agent", "14 total", collapse arrow. The list holds the 15 Evaluator Metrics minus "Tool Call Success" (`simulation_enabled: false`).

Each Metric is one row:

| Part | Content |
|---|---|
| Name with an arrow | A click opens the detail of that Metric under the row. "AI interrupting user" shows a down arrow and an open detail: "Main agent didn't interrupt the testing agent". |
| Value | "Passed" (green) for a true binary score, a number such as "0.73", "NONE" (gray badge) for a `null` numeric score, "--" for a `null` rating score, or a percent with a bar such as "100%". |
| Thumbs-down icon | Opens the correction dialog. "Expected Outcome" has no thumbs-down icon. |

Expected Outcome detail (224):

| Element | Text (verbatim) |
|---|---|
| Text box | "Enter expected outcome..." with the expected outcome prompt of the Evaluator |
| Buttons | "Re-Evaluate", "Save" |
| Result | "Output: Passed" |
| Explanation | 3 items, for example "✅ Main Agent greeted at" + button "0:04.86" + "with 'Yes, this is the Tyson's Regional Chamber of Commerce. How can I help you today?'" |

The timestamp buttons jump the audio to that time (inferred). "Re-Evaluate" and "Save" were not clicked.

Metric item in `evaluation.metrics[]` of the Run:

```json
{
  "id": 243607, "name": "Persona Integrity", "type": "binary",
  "explanation": ["Agent consistently identified as Tyson's Regional Chamber of Commerce throughout the call (0:04.86, 0:36.26)", "..."],
  "extra": {}, "vocera_defined_metric_code": "", "function_name": null, "thumbs_up": null,
  "description": "Score TRUE if the agent maintained a single consistent persona ...",
  "score": true, "score_normalized": 1, "user_defined": true
}
```

The Large Language Model (LLM) judge Metrics that read `{{provider_call_data.artifact.messages}}` added this line to the explanation: "⚠️ Not able to access variables: {{provider_call_data.artifact.messages}}". The agent of type "Other" sends no provider data. So `provider_call_data` is `{}`.

#### Metric correction ("thumbs down")

1. The user clicks the thumbs-down icon of "Confirmation Before Mutation".
2. A small dialog opens.
3. The user types a note, picks the correct value, and clicks "Add to Lab".

| Element | Text (verbatim) |
|---|---|
| Notes | text box "Enter your notes here..." |
| Help | "Mark what should be the correct value" |
| Value | radio group "N/A", "True", "False" |
| Buttons | "Cancel", "Add to Lab" |

The crawler picked "N/A". "Add to Lab" sent 2 calls.

Call 1: `POST /test_framework/test-sets/create_from_run/` (200). Request:

```json
{
  "run_id": 4168972, "project": 13875,
  "metrics": [{"metric": 243609, "feedback": "zz-spec-test: the agent did not change any booking, so this check should be N/A.", "expected_value": null}]
}
```

Response (trimmed):

```json
{
  "id": 8290, "agent": 26259, "name": "4168972",
  "transcript": "[0:01.37] Testing Agent: Hello, is this the chamber of commerce?\n...",
  "transcript_object": [{"content": "Hello, is this the chamber of commerce?", "end_time": 3.068, "role": "Testing Agent", "start_time": 1.37, "time": "0:01.37"}, "..."],
  "voice_recording_url": "https://...s3-accelerate.amazonaws.com/730c8565....wav?X-Amz-Expires=3600&...",
  "call_end_reason": "Main agent-ended-call", "duration": "00:40",
  "source_model": "Run", "source_id": "4168972",
  "metric_reviews": [
    {"id": 59073, "metric": 240898, "metric_name": "AI interrupting user", "metric_enum_values": [], "eval_type": "numeric",
     "expected_value": 0, "explanation": "Main agent didn't interrupt the testing agent", "feedback": "",
     "metric_function_name": "get_main_agent_interruption", "metric_vocera_defined_metric_code": "ec29cab5"},
    "...",
    {"metric_name": "Confirmation Before Mutation", "expected_value": null,
     "feedback": "zz-spec-test: the agent did not change any booking, so this check should be N/A.", "...": "..."}
  ],
  "created_at": "2026-10-24T15:40:35.669420Z"
}
```

The Lab row holds 14 `metric_reviews`, one for each scored Metric. Each `expected_value` is the current score, except the corrected Metric. The Lab row has its own copy of the recording, with a new storage key.

Call 2: `POST /test_framework/v1/runs/4168972/mark_metric_vote/` (200). Request:

```json
{"metric_id": 243609, "thumbs_up": false, "expected_value": null, "feedback": "zz-spec-test: the agent did not change any booking, so this check should be N/A."}
```

Response: `{"success": true}`.

After the vote, the Run shows "Confirmation Before Mutation" as "NONE". The Rubric badge changes to "Passed - 7". So the vote with a `null` value replaces the score of that Metric on the Run (inferred).

#### Latency and Pitch charts

Below the Metric rows, 2 tabs show charts: "Latency" (default) and "Pitch".

| Tab | Chart | Legend |
|---|---|---|
| "Latency" | Line with one dot for each Main Agent turn. X axis "Time (mm:ss)", 00:00 to 00:40. Y axis 0 to 2800. | Dashed horizontal lines: "P25 (1810ms)", "P50 (1870ms)", "P75 (2250ms)", "P90 (2478ms)", "P95 (2554ms)", "P99 (2614.8ms)" |
| "Pitch" | Y axis label "Pitch (Hz)", 50 to 250. | "Avg (203.7 Hz)" |

Data: `evaluation.metrics[].extra.graph_data` of "Latency (in ms)" and "Average Pitch (in Hz)".

```json
"graph_data": [
  {"latency": 1750.0, "speaker": "Main Agent", "start_time": 4.85},
  {"latency": 1870.0, "speaker": "Main Agent", "start_time": 17.21},
  {"latency": 2630.0, "speaker": "Main Agent", "start_time": 36.26}
],
"max_latency": 2630.0,
"percentiles": {"p25": 1810.0, "p50": 1870.0, "p75": 2250.0, "p90": 2478.0, "p95": 2554.0, "p99": 2614.8}
```

The Pitch "Avg" is the mean of the 8 `graph_data` points (203.7 hertz). The Metric score is 206.57 hertz. The 2 values use different inputs (inferred).

#### Metadata card

Header: "Metadata", "Includes run details like agent, personality, test profile, and dynamic variables used for the evaluation.", "6 total". Each key of `metadata` shows as one tile with the key and the value:

| Key | Value |
|---|---|
| `ended_reason` | "Main agent-ended-call" |
| `call_ended_at` | "2026-10-24T15:25:54.291834Z" |
| `call_created_at` | "2026-10-24T15:25:13.526501Z" |
| `call_started_at` | "2026-10-24T15:25:13.526504Z" |
| `ringing_duration` | "0.00" (raw value `3e-06`) |
| `provider_call_data` | "{}" |

#### Audio player

| Element | Text or label (verbatim) | Behavior |
|---|---|---|
| Waveform legend | "Main agent", "Testing agent" | 2 lanes. In the screenshot the Main Agent lane is green (top) and the Testing Agent lane is red (bottom). |
| Time axis | "0:00 0:10 0:20 0:30 0:40" | none |
| "Previous turn (shift + ←)" | button | Jumps to the previous turn. Shortcut Shift+Left. |
| "Back 10s (J)" | button | Jumps back 10 seconds. Shortcut J. |
| "Play" | button | Plays the recording. |
| "Forward 10s (L)" | button | Jumps forward 10 seconds. Shortcut L. |
| "Next turn (shift + →)" | button | Jumps to the next turn. Shortcut Shift+Right. |
| Time | "0:00 / 0:40" | none |
| "Volume" | button | none |
| Speed | combobox, value "1.25x" | The default speed is 1.25. The option list was not captured. |
| "Download recording" | link with a download icon | Opens the signed recording URL. |

The recording is `voice_recording_url` in the Run. It is a signed storage URL with `X-Amz-Expires=3600`, so it expires after 3600 seconds. The page loads a new URL each time it loads the Run. The recording of Run 4168972 has this format: Waveform Audio File Format (WAV), 2 channels (stereo), 16-bit samples, 8000 hertz, 40.5 seconds, 1,296,044 bytes.

The waveform comes from the server, not from the browser. Field `waveform` of the Run:

```json
"waveform": {
  "peaks": [[0.0, 0.0, "... 1500 values ..."], [0.0, 0.0, "... 1500 values ..."]],
  "version": 1, "duration": 40.5, "sample_rate": 8000,
  "testing_channel_index": 1, "testing_speaking": 5, "main_speaking": 6
}
```

`testing_channel_index: 1` says that channel 1 is the Testing Agent. `testing_speaking` and `main_speaking` are counts of speech segments (inferred).

#### Transcript

| Element | Text (verbatim) |
|---|---|
| Tab | "Transcript" |
| Button | "Copy transcript" |
| Message header | Role and timestamp, for example "Testing Agent 0:01.37" or "Main Agent 0:04.86" |
| Message buttons | "Play from here", "Copy message" |
| Footer | "Call ended: Main agent-ended-call" |

Testing Agent messages align right. Main Agent messages align left. The transcript of Run 4168972:

| Time | Role | Text |
|---|---|---|
| 0:01.37 | Testing Agent | "Hello, is this the chamber of commerce?" |
| 0:04.86 | Main Agent | "Yes, this is the Tyson's Regional Chamber of Commerce. How can I help you today?" |
| 0:11.81 | Testing Agent | "I'm a small business owner... and I'm wondering how I can join the chamber?" |
| 0:17.27 | Main Agent | "Membership offers connections, business resources, networking, and community engagement. You can sign up through the Chamber's membership page. Would you like me to send your membership interest to the chamber staff?" |
| 0:31.34 | Testing Agent | "No, thank you. Thanks for your help... goodbye." |
| 0:36.26 | Main Agent | "Thank you for choosing the Tyson's Regional Chamber of Commerce. Have a nice day." |

Data: `transcript` (one string) and `transcript_object[]`. Each item has `content`, `role`, `start_time`, `end_time`, `time`, `normalized_content`, and `comparison_spans`.

#### "Add to Lab" and "Monitor this daily"

- "Add to Lab" in the panel header was not clicked. The thumbs-down flow above made the Lab row.
- "Monitor this daily" opens the dialog "Monitor this scenario". 10.6 describes it.

#### Run detail backend calls

| # | Call | Status |
|---|---|---|
| 1 | `GET /test_framework/v2/runs/4168972/` | 200 |
| 2 | `GET /test_framework/v1/scenarios/402457/?...` | 200 |
| 3 | `GET /test_framework/v1/personalities/693/?...` | 200 |
| 4 | `GET /test_framework/v2/aiagents/26259/?...` | 200 |
| 5 | `GET /test_framework/v1/metrics/basic_list/?...` | 200 |
| 6 | `GET /enums/` | 200 |

Top-level fields of `GET /test_framework/v2/runs/4168972/`:

`id`, `provider_call_id` (empty), `trace_id`, `is_log_present`, `scenario`, `scenario_name`, `scenario_type`, `personality`, `personality_name`, `agent`, `agent_name`, `agent_version`, `result_id`, `result_name`, `expected_outcome_prompt`, `expected_outcome` (`score`, `explanation[]`, `outcome_alignments[]`), `evaluation` (`metrics[]`), `rubric[]`, `transcript`, `transcript_object[]`, `app_transcript_json`, `duration`, `voice_recording_url`, `email_id`, `status`, `evaluation_status`, `metadata`, `success`, `is_reviewed`, `feedback`, `timestamp`, `executed_at`, `inbound_number`, `critical_categories`, `error_message`, `scenario_instructions`, `run_as_text`, `test_profile_data`, `generated_mock_tool_entries`, `mocked_tool_names`, `provider_call_details`, `agent_number`, `testing_channel_index`, `waveform`, `run_type`, `outbound_dial_window_opens_at`, `outbound_dial_window_seconds`, `outbound_dial_window_closes_at`.

One `outcome_alignments` item:

```json
{"aligned": "yes", "outcome": "Main Agent greeted at 0:04.86 with '...'", "prompt_part": "The Main Agent greets the Testing Agent."}
```

---

### 10.6 Monitor from a Run

#### "Monitor this scenario" dialog

| Element | Text (verbatim) | Notes |
|---|---|---|
| Title | "Monitor this scenario" | none |
| Text | "Re-run this scenario on a schedule and get alerted when it stops passing." | none |
| "Schedule" | 4 toggle buttons: "Every hour", "Daily · 6:00 AM", "Weekdays · 6:00 AM", "Weekly · Sun 2:00 AM" | "Daily · 6:00 AM" is pressed by default. |
| "Timezone" | combobox | "Europe/Paris" (browser time zone) |
| Estimate | "1 scenario × 7 runs / week = 7 calls / week" | For the daily schedule. |
| Note | "Failure notifications go to Slack / email." + link "Manage" to `/settings/project/integrations` | none |
| "Create monitor" | button | Creates the Monitor. |

The crawler picked "Weekly · Sun 2:00 AM" and clicked "Create monitor". The dialog closed and the Run panel stayed open. The name comes from the agent name and the cadence.

`POST /schedules/v1/cron-jobs/?project_id=13875` (201). Request:

```json
{
  "agent": 26259, "scenarios": [402457], "crontab_expression": "0 2 * * 0", "timezone": "Europe/Paris",
  "frequency": 1, "name": "zz-spec-test-agent-voice - Weekly deep sweep", "execution_mode": "voice", "concurrency_limit": null
}
```

Response:

```json
{
  "id": 857, "agent": 26259, "name": "zz-spec-test-agent-voice - Weekly deep sweep",
  "crontab_expression": "0 2 * * 0", "timezone": "Europe/Paris",
  "scenario_ids": [402457],
  "scenarios_data": [{"id": 402457, "agent": 26259, "name": "zz-spec-test-eval-membership", "personality": 693, "personality_name": "Normal Male"}],
  "personality": null, "personalities": [], "tags": [], "frequency": 1, "run_settings": {},
  "run_as_text": false, "execution_mode": "voice", "notify_on": "both", "is_active": true,
  "created_by": 9855, "created_via": "user",
  "created_at": "2026-10-24T15:41:24.561865Z", "updated_at": "2026-10-24T15:41:24.594666Z", "concurrency_limit": null
}
```

`notify_on: "both"` is the server default (inferred: alert on failure and on recovery). `created_via: "user"` marks a Monitor that a person made.

#### Monitors list row

Route: `/cron-jobs?project=13875&page=1`. Section 6.3 describes the page. With 1 Monitor, the page shows the table in place of the empty state.

| Column (verbatim) | Cell |
|---|---|
| "ID" | "#857" |
| "Name" | "zz-spec-test-agent-voice - Weekly deep sweep" |
| "Schedule" | "0 2 * * 0" in code style |
| "Agent" | "26259" (the ID, not the name) |
| "Runs" | "1" (the `frequency`, inferred) |
| "Scenarios" | "1" |
| "Timezone" | "Europe/Paris" |
| "Next Run" | "10/25/2026, 2:00:00 AM" |
| "Status" | switch and text "Active" or "Paused" |
| "Actions" | 2 icon buttons: edit and delete |

The list call is `GET /schedules/v1/cron-jobs/?project_id=13875&ql={id,name,agent,scenario_ids,scenarios_data{id,name},crontab_expression,timezone,frequency,execution_mode,personalities,concurrency_limit,is_active,created_at,run_settings}`. It returns a plain array.

#### "Active" switch

A click on the switch sends `PATCH /schedules/v1/cron-jobs/857/` (200) with:

```json
{"is_active": false}
```

The response is the full Monitor with `is_active: false`. The cell text changes to "Paused". The page reloads the list.

#### "Edit monitor" dialog

The edit icon opens "Edit monitor", "Modify the schedule and scope of this monitor." Sections and fields:

| Section | Field (verbatim) | Value in the run |
|---|---|---|
| "What to test" | "Monitor name *" (placeholder "Enter a name for your monitor") | "zz-spec-test-agent-voice - Weekly deep sweep" |
| | "Agent" / "Select the agent to run tests with *" | "zz-spec-test-agent-voice" |
| | "Execution mode *" | "Voice" |
| | "Scenarios *" / "Pick scenarios across one or more folders. Click a folder to select all its scenarios." | chip "zz-spec-test-eval-membership" |
| | "Personality override (optional)" / button "Select Personalities" / "Select personalities to override individual evaluator personalities." | none |
| "Connection overrides" | heading only | none |
| "Call settings" | collapsed button | not opened |
| "When it runs" | "Schedule *": "Every hour", "Daily · 6:00 AM", "Weekdays · 6:00 AM", "Weekly · Sun 2:00 AM" (pressed), "Custom..." | "Next run: Sun, Oct 25, 2026, 02:00:00 (UTC+02:00)" |
| | "Timezone" | "Europe/Paris" |
| "Next trigger date" | Help text and a list of the next 10 trigger times | "Sun, Oct 25, 2026, 02:00:00 (UTC+02:00)" to "Sun, Dec 27, 2026, 02:00:00 (UTC+01:00)" |
| "Run size & limits" | "Repeat each scenario" | "1", with "1 scenario × 1 = 1 calls per run" |
| | "Concurrency limit" (placeholder "No limit") / "Max parallel conversations within one run" | empty |
| | "Calls per second" (placeholder "No limit") / "How many calls start each second, from 0.1 to 4 (e.g. 0.5 starts one call every 2 seconds). Leave empty for no limit." | empty |
| Footer note | "Failure notifications go to this project's Slack, Discord and email integrations." + link "Manage notifications" | none |
| Side panel "This monitor" | "Scenarios 1 × repeats 1 Calls per run 1 Runs per week 1", "1 call / week", "while this monitor is active" | none |
| Button | "Save changes" | not clicked |

In the trigger list, the offset changes from "(UTC+02:00)" to "(UTC+01:00)" after the end of summer time. So the page computes the times in the Monitor time zone. The page writes each offset relative to Coordinated Universal Time (UTC).

On open, the dialog sends `GET /enums/`, `GET /test_framework/v2/aiagents/26259/?...`, `GET /test_framework/v2/aiagents/short_list/?...`, and `GET /user/v1/projects/13875/personalities/?...`.

#### Delete

The delete icon removes the Monitor. The page sends `DELETE /schedules/v1/cron-jobs/857/` (204, empty body). It then reloads the list. The list call returns `[]`, and the page shows the empty state "No monitors yet" with the 3 preset cards. The capture does not record a confirm dialog or its text for this delete.

No Monitor Run fired during the crawl. The first trigger time was after the delete.

---

### 10.7 Calls with data

#### Route

`/13875/calls?page=1&pageSize=30`. The Call detail panel adds `&callId=<callLogId>`, for example `callId=13776321`. Note the case: the Run panel uses `call_id`, the Call panel uses `callId`. Section 6.4 describes the empty page.

#### "Add Call" upload flow

The crawler uploaded the recording of Run 4168972.

"Add Call" opens the dialog "Create call":

| Element | Text (verbatim) | Value in the run |
|---|---|---|
| "Agent" / "Select the agent to add the calls *" | combobox | "zz-spec-test-agent-voice" |
| Drop zone | "Drag & Drop or Choose files to upload (Optional)" and "Max 5 files, 500MB total. Formats: MP3, MP4, WAV, OGG" | none |
| File list | File name, size, and a remove button "Remove run-4168972.wav" | "run-4168972.wav", "1MB" |
| Buttons | "Cancel", "Create" | "Create" clicked |

Flow on "Create":

1. The page sends `POST /observability/v1/call-logs/get-upload-url/`. The response gives a signed upload URL, a `call_id`, a storage key, and an `upload_token`.
2. The browser sends the file to `upload_url` (inferred: HTTP `PUT` with the file as the body). The crawl records do not record storage calls. The signed headers are `content-length`, `content-type`, and `host`.
3. The page sends `POST /observability/v1/call-logs/complete-upload/`. It returns 201 with the new call log in state `evaluating`.
4. The page reloads the list. It polled 4 more times. The row changed from "00:00" to "00:40" and then to `status: "success"` with Metric scores.

`POST /observability/v1/call-logs/get-upload-url/` (200). Request:

```json
{"agent": 26259, "filename": "run-4168972.wav", "file_size": 1296044, "content_type": "audio/wav"}
```

Response:

```json
{
  "upload_url": "https://...s3-accelerate.amazonaws.com/call-logs/7868/26259/run-4168972_1792856670.wav?X-Amz-Expires=3600&X-Amz-SignedHeaders=content-length%3Bcontent-type%3Bhost&...",
  "call_id": "run-4168972_1792856670",
  "s3_key": "call-logs/7868/26259/run-4168972_1792856670.wav",
  "upload_token": "run-4168972_1792856670:call-logs/7868/26259/run-4168972_1792856670.wav:26259:7868:1xKdv4:..."
}
```

The `call_id` is the file name without the extension, plus `_` and a Unix timestamp. The storage key is `call-logs/<organization>/<agent>/<call_id>.wav`. The `upload_token` joins the call ID, the key, the agent, the organization, and a signature (inferred).

`POST /observability/v1/call-logs/complete-upload/` (201). Request:

```json
{"agent": 26259, "call_id": "run-4168972_1792856670", "s3_key": "call-logs/7868/26259/run-4168972_1792856670.wav", "upload_token": "..."}
```

Response:

```json
{
  "id": 13776321, "duration": "00:00", "success": null, "is_reviewed": false, "status": "evaluating",
  "feedback": "", "metrics": [], "call_ended_reason": "", "customer_number": "",
  "agent": 26259, "agent_name": "zz-spec-test-agent-voice", "call_id": "run-4168972_1792856670",
  "trace_id": "", "is_log_present": false, "timestamp": "2026-10-24T15:44:33.032315Z",
  "error_message": "", "dropoff_point": "", "topic": "",
  "transcript": "", "transcript_object": null, "evaluation": {"metrics": []}
}
```

The server transcribed the stereo file and scored it in about 19 seconds (`created_at` 15:44:33, `updated_at` 15:44:51). It labelled channel 1 as the Testing Agent (`testing_channel_index: 1`). Channel 0 is then the Main Agent (inferred). The scoring cost about 0.27 credits.

#### Calls table and toolbar

Toolbar, left to right:

| Control (verbatim) | Behavior in the run |
|---|---|
| "Select View" | Saved column views. Not opened. |
| Text box "Search from any column" and button "Search" | Not used. |
| "Ask AI" | Opens the "Ask AI" side panel. See below. |
| "Add Call" | Opens "Create call". |
| "Filters" | Opens a popover: "Filters", "No filters yet.", "Add filter". On open, the page sends `GET /test_framework/v2/aiagents/short_list/`. |
| "Export" | Opens "Export Call Logs". |
| "Last 30 days" | Opens the time range popover. Section 6.8 describes it. Here it showed "Absolute time range", "From" `now-30d`, "To" `now`, "Apply time range", "Search quick ranges", and 23 quick ranges from "Last 5 minutes" to "Today - 30 days". |

Table columns, in order: row menu, checkbox (with a select-mode arrow), "Call ID", "Call Started At", "Duration", "Agent", "Customer", "Ended Reason", "Evaluation", "Feedback", then one column for each Metric with `observability_enabled: true`: "AI interrupting user", "Average Pitch (in Hz)", "Infrastructure Issues", "Interruption Score", "Latency (in ms) FT P50 P99", "Stop Time after User Interruption (ms)", "Talk Ratio", "Tool Call Success", "Unnecessary Repetition Score".

Row of call log 13776321:

| Column | Cell |
|---|---|
| Call ID | "run-4168972_1792856670", truncated, with a copy icon button |
| Call Started At | "Oct 24, 2026 at 05:44 PM" (the upload time) |
| Duration | "00:40m" |
| Agent | Chip "zz-spec-test-agent-voice" with the link "Go to agent: zz-spec-test-agent-voice" |
| Customer | empty |
| Ended Reason | empty. An uploaded file has no ended reason. |
| Evaluation | Combobox "Success" with a green check |
| Feedback | empty. On hover, a pencil icon shows. |
| Metric cells | "0.00", "206.57", icon, "100%", "1750.00 1870.00 2614.80", "NONE", "0.73", icon, "100%" |

The list call is `GET /observability/v2/call-logs/?project_id=13875&page=1&filters_v2={"operator":"and","conditions":[{"field":"timestamp","op":"gte","value":"2026-09-24T15:45:41.719Z"}]}&page_size=30&ql={-transcript,-transcript_object,-evaluation}`. The time range goes into `filters_v2` as an absolute timestamp.

Row object (trimmed):

```json
{
  "id": 13776321, "duration": "00:40", "success": true, "is_reviewed": false, "status": "success",
  "metrics": [
    {"id": 240906, "name": "Tool Call Success", "type": "binary", "score": true, "extra": {}},
    {"id": 240903, "name": "Latency (in ms)", "type": "numeric", "score": 2083.33,
     "extra": {"percentiles": {"p25": 1810.0, "p50": 1870.0, "...": "..."}, "first_turn": 1750.0}},
    "..."
  ],
  "call_ended_reason": "", "customer_number": "", "agent": 26259, "agent_name": "zz-spec-test-agent-voice",
  "call_id": "run-4168972_1792856670", "timestamp": "2026-10-24T15:44:33.032315Z",
  "updated_at": "2026-10-24T15:44:51.918137Z"
}
```

The crawler opened the row menu (three dots). The capture shows only the row hover state with the Feedback pencil. The menu items were not captured.

#### "Ask AI" side panel

| Element | Text (verbatim) |
|---|---|
| Title | "Ask AI" |
| Sub-title | "Assistant · 100 most recent calls" |
| Buttons | "New conversation", link "Open in Assistant", "Close Ask AI" |
| Scope | "Calls in scope" with a combobox "100" |
| Heading | "Ask about these calls" |
| Text | "100 most recent calls are loaded and ready to analyse." and "Try asking me to" |
| Suggestions | "Summarise these calls What happened across the calls in scope", "Why are calls failing? Group the failures by cause", "Which metrics fail most? Rank metrics by failure rate", "Find the outliers Unusually long, short, or broken calls" |
| Message box | placeholder "Ask about these calls…", file button, "Send (Enter) · New line (Shift+Enter)" |

The link "Open in Assistant" opens `/ai-assistant?calls_scope=<URL-encoded JSON>`. The JSON is `{"filters_v2":{...},"num_records":100}`. The crawler sent no message from this panel.

#### Call detail panel

The Call detail panel is a dialog "Call details". Its layout matches the Run detail panel (10.5), with these differences:

| Part | Run detail (10.5) | Call detail |
|---|---|---|
| Title | Evaluator name with eye, pencil, and share icons | Call ID "run-4168972_1792856670" with copy and share icons |
| Chips | Agent and version, personality, test profile, start time, connection | "Call started at - Oct 24, 2026 at 05:44 PM" and "Agent - zz-spec-test-agent-voice" with a link |
| Rubric badge | "Passed - 8" | "Passed - 5" |
| Metrics | "14 total" (simulation Metrics) | "9 total" (observability Metrics), with "Tool Call Success" |
| Metadata card | Shown | Not shown. The call has `metadata: {}`. |
| Header buttons | "Add to Lab", "Monitor this daily" | "Use as Evaluator", "Actions" |
| Transcript times | "0:01.37" (hundredths) | "0:00" (whole seconds) |
| Footer | "Call ended: Main agent-ended-call" | No footer. `call_ended_reason` is empty. |

The same Latency chart, stereo player, and transcript buttons show. The transcript text differs a little from the Run transcript, because the server transcribed the file again. For example: "I'm a small business owner, and I'm wondering how I can join the chamber."

`GET /observability/v2/call-logs/13776321/` returns these top-level fields: `id`, `duration`, `voice_recording_url`, `critical_categories`, `transcript_object`, `status`, `agent_id` (string), `agent_name`, `agent_version`, `evaluation`, `metadata`, `dynamic_variables`, `testing_channel_index`, `waveform`, `timestamp`, `success`, `is_reviewed`, `feedback`, `rubric`, `transcript`, `recording_data`, `call_ended_reason`, `dropoff_point`, `topic`, `customer_number`, `user_generated_transcript`, `error_message`, `created_at`, `updated_at`, `call_id`, `trace_id`, `is_log_present`, `agent`, `project`. `recording_data` holds the same `peaks` as `waveform`.

#### "Actions" menu

"Actions" opens a menu with the heading "Actions" and 2 items:

| Item (verbatim) | Behavior |
|---|---|
| "Add to Lab" | Not clicked. Adds the call to a Lab (inferred). |
| "Recompute Metrics" | Not clicked. Scores the call again (inferred). |

#### "Use as evaluator" dialog

| Element | Text (verbatim) |
|---|---|
| Title | "Use as evaluator" |
| Consent checkbox | "I hereby confirm that I have all necessary rights or consents to upload and clone these scenarios and that I will not use the platform-generated content for any illegal, fraudulent, or harmful purpose. I reaffirm my obligation to abide by the app's" + link "Terms of Service" (`https://www.example.com/terms-of-service`) + "and" + link "Privacy Policy" + "." |
| "Folder" / "Select the folder to save simulation as evaluator *" | combobox, default "Select folder" |
| Buttons | "Cancel", "Confirm" |

"Confirm" is disabled until the checkbox is on and a folder is selected (inferred: it was disabled in the empty state). On open, the dialog sends `GET /test_framework/v1/scenarios/folders/?project_id=13875`.

Flow on "Confirm":

1. The page sends `POST /observability/v1/call-logs/create_scenarios/`. It returns a `progress_id`.
2. The floating panel "Simulation Progress" opens.
3. The page polls `GET /observability/v1/call-logs/create_scenarios_progress/?project_id=13875&progress_id=<id>`. It polled 6 times.
4. The last poll returned `completed_scenarios: 1` with the new Evaluator.
5. The panel showed "Recent (1)", "1/1 completed", "just now", and "Remove task".

`POST /observability/v1/call-logs/create_scenarios/` (200). Request:

```json
{"call_logs": [13776321], "project_id": 13875, "folder_path": "zz-spec-test-folder"}
```

Response: `{"progress_id": "e47d9a80-1c90-442a-8887-4bb2005c10bf"}`.

Last progress response (trimmed):

```json
{
  "project_id": 13875, "agent_id": null, "completed_scenarios": 1, "failed_scenarios": 0, "total_scenarios": 1,
  "scenarios_list": [{
    "id": 402466, "name": "Membership Interest Decline Workflow", "agent": 26259,
    "personality": 9656, "personality_name": "Polite Small Business Owner",
    "tags": [], "tool_ids": ["VAPI_TOOL_END_CALL"],
    "first_message": "Hello, is this the Chamber of Commerce?",
    "instructions": "{\n  \"role\": \"The Testing Agent plays a small business owner calling the Chamber of Commerce to inquire about joining.\",\n  \"first_message\": \"Hello, is this the Chamber of Commerce?\",\n  \"conditions\": [\n    {\n      \"when\": \"The main agent confirms this is the Chamber of Commerce and offers to help, saying 'How can I help'.\",\n      \"say\": \"I'm a small business owner, and I'm wondering how I can join the chamber.\"\n    },\n    {\n      \"when\": \"The main agent describes membership benefits and offers to send the caller's 'membership interest' to chamber staff.\",\n      \"say\": \"No, thank you. Thanks for your help. Goodbye.\",\n      \"then\": [\"<endcall/>\"]\n    }\n  ]\n}",
    "simulation_description": "Simulating the transcript:\n\n[0:00] Testing Agent: Hello, is this the Chamber of Commerce?\n...",
    "expected_outcome_prompt": "The main agent should state the benefits of chamber membership and explain how to sign up on the chamber's website\nThe main agent should ask if the testing agent would like their membership interest sent to the chamber staff\n",
    "scenario_type": "conditional_actions", "test_profile": null, "max_duration": null,
    "folder_path": "zz-spec-test-folder",
    "metrics": [240898, 240899, 240900, 240901, 240902, 240903, 240904, 240905, 240906, 240907, 240908, 243607, 272059],
    "is_simulating": true
  }],
  "errors": []
}
```

Observations:

- The server made a new Personality, "Polite Small Business Owner" (ID 9656), without a prompt to the user. The crawler deleted it in capture 296.
- The Evaluator has `scenario_type: "conditional_actions"`. Its `instructions` is a JSON string with `role`, `first_message`, and `conditions[]`. Each condition has `when`, `say`, and an optional `then` with the tag `<endcall/>`. This may be the backend form of the "Structured Test Case" input type of 10.2 (inferred).
- The Evaluator got 13 Metrics. "No Fabricated Availability" (243608) and "Confirmation Before Mutation" (243609) were not included. The capture does not show why.
- The capture of 249 still showed `completed_scenarios: 0`. The panel finished in capture 250.

#### "Export Call Logs" dialog

| Element | Text (verbatim) |
|---|---|
| Title | "Export Call Logs" |
| Field | "Number of rows to export (max 10,000)", spin button, default "0" |
| Buttons | "Cancel", "Start Export", "Close" |

The crawler entered 1 and clicked "Start Export".

1. The page sends `GET /observability/v1/call-logs/export_call_logs/?project_id=13875&filters_v2={...}&num_records=1`. It returns 202.
2. The page polls `GET /observability/v1/call-logs/export_call_logs_progress/?progress_id=<id>&project_id=13875`.
3. The floating panel "CSV Exports" shows the export.

Export start response (202):

```json
{"message": "Export started successfully", "progress_id": "8514d993-879b-4c28-aece-3b37c537344f", "total_records": 1}
```

Progress response (200):

```json
{
  "status": "completed",
  "file_url": "https://...s3-accelerate.amazonaws.com/8c68b1ad....xlsx?X-Amz-Expires=3600&...",
  "total_records": 1, "started_at": "2026-10-24T15:51:38.080761+00:00", "project_id": 13875,
  "processed": 1, "total": 1, "filename": "call_logs_20261024_155138.xlsx",
  "records_exported": 1, "completed_at": "2026-10-24T15:51:38.269506+00:00"
}
```

The export uses `GET`, not `POST`, and returns 202. The file is an Excel workbook (`.xlsx`), not a Comma-Separated Values (CSV) file, although the panel title says "CSV Exports". The download link is signed and expires after 3600 seconds.

#### "CSV Exports" floating panel

| Element | Text (verbatim) |
|---|---|
| Title | "CSV Exports" |
| Buttons | "Minimize panel", "Close panel" |
| List header | "Recent Exports (1)" |
| Item | "Completed", "Oct 24, 2026, 17:51", "Remove export", "Download" |

The panel stays open on other pages. It showed on the Labs page in capture 251. Section 1.4 describes the background-task panels.

---

### 10.8 Labs with a review

#### Route

`/labs/edit/243609` (Metric "Confirmation Before Mutation"). Section 3.12 and 3.13 describe the Labs list and the empty editor.

#### Layout

1. Header: back button, title "Confirmation Before Mutation", type "Boolean", buttons "Auto Improve", "Save" (disabled until an edit), and "Run" (dark).
2. Tabs "LLM Judge" (selected) and "Python".
3. Variable bar: link "Available Variables", buttons "{{transcript}}", "{{transcript_json}}", "{{date}}", "{{call_end_reason}}", "{{agent.description}}", "{{agent.name}}", "{{agent.language}}", "View More".
4. Text area "Enter LLM Judge description..." with the Metric description.
5. "Variables used:" chips "{{transcript_json}}", "{{call_end_reason}}", "{{provider_call_data.artifact.messages}}". Each chip has a delete button, for example "Delete {{provider_call_data.artifact.messages}}".
6. "Evaluation Trigger" / "Choose when this metric should be evaluated", combobox "Always".
7. Heading "Overall Score : 0/1".
8. Review table.
9. Right column: "Change History", "1 record", item "v1" "Current" "API" "Sep 7, 2026 · 11:44 AM" "Initial version", with a "⋮" button.

#### Review table

Columns: checkbox, "ID", "Recording", "Expected Value", "Actual Value", "Explanation", "Notes".

| Column | Cell content in the run |
|---|---|
| "ID" | "1" (row number) |
| "Recording" | Run ID "4168972". A native audio player "0:00 / 0:40" with play and volume. An icon button with an arrow (opens the source Run, inferred). A transcript preview of 2 lines with "Read More". A full-width button "See Variables". |
| "Expected Value" | "N/A" and the button "Edit" |
| "Actual Value" | "True" with a check icon. The cell has a pink background, because it does not match the expected value. |
| "Explanation" | Bullet list, cut, with "Read more". After "Run", the list starts with the label "Metric:". |
| "Notes" | The correction note "zz-spec-test: the agent did not change any booking, so this check should be N/A." and the button "Edit" |

"Overall Score : 0/1" counts the rows where the actual value matches the expected value. The data is `overall_score` and `total_score` of the Metric.

The Lab row comes from 10.5. The Metric object holds it in `reviews[]`:

```json
"reviews": [{
  "id": 59061,
  "test_set": {"id": 8290, "agent": 26259, "name": "4168972", "transcript": "...", "voice_recording_url": "...",
               "call_end_reason": "Main agent-ended-call", "duration": "00:40", "source_model": "Run", "source_id": "4168972"},
  "metric": 243609, "expected_value": null, "actual_value": true,
  "explanation": ["No mutating tool calls (book/update/delete appointment) appear in the transcript; tool data was unavailable.", "..."],
  "feedback": "zz-spec-test: the agent did not change any booking, so this check should be N/A."
}]
```

Other Metric fields seen on this page: `agents` `[22757, 26242, 26259]`, `type: "llm_judge"`, `eval_type: "binary"`, `evaluation_trigger: "always"`, `trigger_type: "llm_judge"`, `display_order: 17`, `overall_score: 0`, `total_score: 1`, `simulation_enabled: true`, `observability_enabled: false`, `alert_type: "disabled"`, `window_size: 50`, `std_multiplier: 2.0`, `ewma_alpha: 0.1`, `add_to_new_agents: true`, `pending_optimisation_proposal: null`, `dependencies: []`, `dependents: []`.

#### "Run"

"Run" scores every Lab row again with the current editor content. It does not save the Metric.

`POST /test_framework/v1/metrics/243609/run_reviews/` (200). Request:

```json
{
  "description": "Tool log — raw provider messages for this call, ... note that tool data was unavailable.",
  "prompt": "", "type": "llm_judge", "custom_code": "",
  "evaluation_trigger": "always", "evaluation_trigger_prompt": "",
  "trigger_type": "llm_judge", "evaluation_trigger_custom_code": ""
}
```

Response: `{"progress_id": "2fae849c-d910-400f-b83f-95ccfbf9bcaa"}`.

The page polls `GET /test_framework/v1/metrics/run_reviews_progress/?progress_id=<id>&project_id=13875`:

```json
{"metric_id": 243609, "agent_id": null, "project_id": 13875, "completed_reviews": 0, "failed_reviews": 0, "total_reviews": 1, "reviews_list": [], "failed_reviews_list": []}
{"metric_id": 243609, "completed_reviews": 1, "failed_reviews": 0, "total_reviews": 1, "reviews_list": [59061], "failed_reviews_list": [], "metric": {"id": 243609, "...": "full Metric object"}}
```

After the run, the Explanation cell showed a new text with the prefix "Metric:". The actual value stayed "True". The score stayed "0/1".

#### "Auto Improve"

"Auto Improve" starts an optimisation job. The job runs in a sandbox. It tries to make the Metric match the expected values of the Lab rows.

`POST /test_framework/metric-reviews/process_feedbacks?project_id=13875` (200). Request:

```json
{"metric_id": 243609, "test_set_ids": [8290], "simplified_prompt": "Tool log — raw provider messages for this call, ... note that tool data was unavailable."}
```

Response: `{"progress_id": "21ff7e55-4ef0-4f18-a41a-e9d4e929da65"}`.

The page polls `GET /test_framework/metric-reviews/process_feedbacks_progress?progress_id=<id>&project_id=13875`. The poll continues on other pages. Responses seen:

```json
{"progress_id": "21ff7e55-...", "status": "in_progress", "input": {"metric_id": 243609, "test_set_ids": [8290], "metric_type": "llm_judge", "simplified_prompt_provided": true}, "output": null, "error": null, "task_id": "ae10fc3f-..."}
{"progress_id": "21ff7e55-...", "status": "in_progress", "...": "...", "sandbox_id": "sb-5iygFIPTLtz6dEIPWcEvZg", "updated_at": "2026-10-24T15:53:15.213417+00:00"}
```

Final response (status `success`), trimmed:

```json
{
  "progress_id": "21ff7e55-...", "status": "success", "error": null,
  "sandbox_id": "sb-5iygFIPTLtz6dEIPWcEvZg",
  "meta_harness_progress": {"iter": 1, "num_correct": 1, "num_total": 1, "best_iter": 1, "iterations_completed": 1,
                            "iterations_budget": 5, "is_verify": true,
                            "consistency_note": "iter_1 confirmed 1/1 on a second full run — done.", "elapsed_s": 70, "...": "..."},
  "pending_questions": [], "current_step": null,
  "review_conversation_id": "194d27d4-aac8-480c-9b20-308a0f3c2fec", "paused_awaiting_answer": false, "review_session_id": 168,
  "output": {
    "improved_metric_description": "Tool log — raw provider messages for this call, ... (unchanged)",
    "improved_evaluation_trigger": "import json\n\n# ... see below",
    "improved_trigger_kind": "custom_code",
    "trigger_type": "custom_code",
    "type": "custom_code",
    "custom_code": "transcript_json = data.get(\"transcript_json\", \"\")\n... see below",
    "metric_description_variables": ["provider_call_data___artifact___messages"],
    "review_results": [{"review_id": 59061, "test_set_id": 8290, "actual_value": null,
                        "explanation": {"trigger": [], "metric": ["No mutating appointment tool call (book/update/delete) occurred, so the confirmation-before-mutation check is not applicable."]},
                        "success": true}],
    "feedback_edits": [], "unauthorized_label_changes": [], "unresolved_samples": [],
    "optimization_summary": "**What changed:**\n- Added a relevance gate so the metric is skipped (marked Not Applicable) ...",
    "old_score": {"num_correct": 0, "num_total": 1, "score": 0.0},
    "new_score": {"num_correct": 1, "num_total": 1, "score": 1.0},
    "estimated_cost_per_sample": {"before": {"credits": 0.1, "uses_llm_judge": true, "uses_audio": false, "audio_seconds": 0.0},
                                  "after": {"credits": 0.1, "uses_llm_judge": true, "uses_audio": false, "audio_seconds": 0.0}}
  }
}
```

The job ran 1 iteration out of a budget of 5. It took 70 seconds. The panel text said "takes ~10-15 minutes".

`improved_evaluation_trigger` is Python custom code. It skips the Metric when no mutating tool call exists:

```python
import json

# "Confirmation Before Mutation" only makes sense when a mutating appointment
# tool call actually happened. If the call contains no book/update/delete
# appointment tool call, the check is Not Applicable (skip it).
MUTATING = ("book_appointment", "update_appointment", "delete_appointment")

parts = []
metadata = data.get("metadata", {}) or {}
parts.append(json.dumps(metadata.get("provider_call_data", {}) or {}, default=str))
parts.append(json.dumps(data.get("resolved_mock_tool_calls", {}) or {}, default=str))
transcript_json = data.get("transcript_json", data.get("transcript", "")) or ""
parts.append(transcript_json if isinstance(transcript_json, str)
             else json.dumps(transcript_json, default=str))
blob = " ".join(parts).lower()

has_mutation = any(name in blob for name in MUTATING)
_result = has_mutation
_explanation = (...)
```

`custom_code` wraps the old description in a call to `evaluate_llm_judge_metric`:

```python
transcript_json = data.get("transcript_json", "")
call_end_reason = data.get("call_end_reason", "")
dynamic_variables = data.get("dynamic_variables", {})
instructions = dynamic_variables.get("instructions", "No instructions provided")

description = 'Tool log — raw provider messages for this call, ...' + f"""\n\n### Instructions:\n{instructions}\n\n### Transcript:\n{transcript_json}\n\n### Call End Reason: {call_end_reason}\n\nBased on the above, did the Main Agent perform as expected?"""

response = evaluate_llm_judge_metric(data, description=description, eval_type="binary")
_result = response.get("result")
_explanation = response.get("explanation", "No explanation")
if _result is None:
    ...
    _result = True
    _explanation = "LLM returned None"
```

Custom code contract seen in this output (inferred from the code): the code reads the input object `data`. It sets `_result` and `_explanation`. A trigger that sets `_result = False` skips the Metric, and the Metric value becomes not applicable.

#### "Auto Improve" floating panel

| State | Content (verbatim) |
|---|---|
| In progress | "Auto Improve", "Minimize panel", "Close panel", "Currently Processing (1)", item "Improving Confirmation Before Mutation", "Started just now, takes ~10-15 minutes", button "Stop" |
| Done | "Recent (1)", "Clear all", item "Confirmation Before Mutation", "Optimization completed", "just now", "Remove", "View Changes" |

The panel stays on every page. "View Changes" opens the Assistant conversation of `review_conversation_id`, `/ai-assistant/194d27d4-aac8-480c-9b20-308a0f3c2fec` (inferred: the route of capture 287 matches this ID).

#### "Metric optimiser: Confirmation Before Mutation" chat

The optimiser chat is an Assistant conversation. Section 4.5 describes the conversation page. The thread name is "Metric optimiser: Confirmation Before Mutation". The thread list marks it with a red dot and the status "Waiting for your answer".

Page content, top to bottom:

1. Red status banner: "A proposal is waiting for your review. Check the changes on the card below, ask the optimiser about them, then apply, re-optimise or dismiss."
2. Assistant message with "What changed:", "What it checks:", "Returns False when:", "Returns True when:", "Not applicable (NA) when:", and the text "The optimized prompt matches your eval set, but samples outside it were never checked. Run the regression check to re-evaluate the most recent calls/runs this metric previously ran on and surface any label changes before you apply."
3. Proposal card (see below).
4. Assistant message: "Done — the optimisation of Confirmation Before Mutation finished." + "The proposal is below: check the changes, run a regression check, ask me anything about it, or apply it from the card."
5. Message box with the placeholder "Ask the optimiser about this result, or tell it what the metric should do differently…".

Proposal card:

| Element | Text (verbatim) |
|---|---|
| Title | "Proposed metric improvement · Confirmation Before Mutation" |
| Badge | "Ready for your review" |
| Figures | "Lab accuracy before" "0/1", "After" "1/1", "Credits per sample before" "0.10", "After" "0.10" |
| Box | "What the optimised metric does" with the same 5 parts as the message |
| Diff | "Proposed changes (3)" (open): "Metric type" "llm_judge → custom_code" (old value struck through), "Custom code" (green added lines), "Evaluation trigger (code)" (green added lines) |
| Buttons | "Apply to metric", "Run regression check", "Re-optimise", "Dismiss" |
| Help | "Ask about the proposal in the chat below; the optimiser answers from the proposal, the eval set and the regression results. "Run regression check" re-scores the most recent calls and runs with the proposed version." |

On open, the page sends `GET /app/v1/product-chat/sessions/194d27d4-.../` and `GET /test_framework/metric-reviews/optimizer_chat_session?project_id=13875&session_id=168`.

`optimizer_chat_session` response (trimmed):

```json
{
  "id": 168, "metric": 243609, "project": 13875, "agent": null, "status": "awaiting_user",
  "proposal": {"base": {"type": "llm_judge", "custom_code": "", "description": "Tool log — ..."}, "...": "..."},
  "proposal_history": [], "regression_results": {}, "active_progress": {}, "test_set_ids": [8290],
  "conversation_id": "194d27d4-aac8-480c-9b20-308a0f3c2fec", "auto_run": 103,
  "applied_at": null, "applied_by": null,
  "metric_snapshot": {"name": "Confirmation Before Mutation", "type": "llm_judge", "eval_type": "binary", "...": "..."},
  "conversation_history": [{
    "role": "assistant", "content": "**What changed:** ...", "timestamp": "...", "message_type": "...",
    "payload": {"type": "custom_code", "llm_provider": "deepseek-v4-flash", "no_improvement": false,
                "claude_annotation_flags": [], "old_score": {"...": "..."}, "new_score": {"...": "..."}, "...": "same fields as the Auto Improve output"}
  }],
  "created_at": "2026-10-24T15:54:46.400466Z"
}
```

The session object of the conversation has these optimiser flags: `optimizer_review_session_id: 168`, `optimizer_review_pending: true`, `optimizer_run_active: false`, `optimizer_review_can_act: true`, `optimizer_review_open: true`, `optimizer_review_project_id: 13875`. The first stored assistant message has `optimizer_proposal: {"session_id": 168, "version": 1}`. The page puts the proposal card under that message.

#### Dismiss

1. The user clicks "Dismiss".
2. The card shows "Close this review without applying? The metric keeps its current version." with "Dismiss proposal" and "Keep reviewing".
3. The crawler clicked "Dismiss proposal".

The capture does not record the backend call of "Dismiss proposal". The Metric stayed at "v1": the Change History still showed 1 record in capture 298. "Apply to metric", "Run regression check", and "Re-optimise" were not clicked.

#### Lab row delete

1. The user selects the row checkbox. The button "Delete Selected (1)" shows above the table.
2. The user clicks it.
3. The page sends `DELETE /test_framework/test-sets/8290/` (204).
4. A toast shows "Test sets deleted successfully". The heading changes to "Overall Score : 0/0".

The capture does not show a confirm step.

---

### 10.9 Quick Mode Metric

#### Route

`/create-metric?project=13875`. Section 3.8 describes the page.

#### Controls seen

| Element | Text (verbatim) |
|---|---|
| Heading | "Create Metrics", "Your AI agent is Main Agent and User is Test Agent" |
| Mode buttons | "Quick Mode", "Detail Mode" |
| Help | "Describe what to measure and we'll build and save the metric for you (usually 1–2 min). Switch to Detail Mode to configure everything yourself. Sample review is estimated to be ready in about 3–5 min from starting creation." |
| "Agents *" | Multi-select button. The picker list has "(Select All)", one option for each agent, and "Clear". |
| Help | "The metric is enabled on every agent you pick. It's drafted from the first one's context." |
| Text area | placeholder "Example: Check whether the agent confirms the caller's appointment date and time before ending the call. Fail the call if it hangs up without a confirmation..." |
| Buttons | "Skip to Detailed Form", "Generate Metric" (disabled until the text area has text) |
| Guide panel | "GUIDE - CREATE A METRIC", "Best Practices", 4 numbered tips |

Capture 282 shows both agents in the "Agents *" button. The request below holds only agent 26259. The capture does not show the step between them.

#### Request

The crawler typed: "Name this metric zz-spec-test-quick-metric. Check whether the agent offers to take a message for the chamber staff when it cannot fully answer the caller. Pass if it offers, fail if it does not."

`POST /test_framework/v1/metrics/build-agent/` (200). Request:

```json
{
  "agent_id": "26259", "agent_ids": ["26259"],
  "description": "Name this metric zz-spec-test-quick-metric. Check whether the agent offers to take a message for the chamber staff when it cannot fully answer the caller. Pass if it offers, fail if it does not.",
  "enum_values": [], "eval_type": "binary",
  "metric_type": "custom_code", "build_mode": "quick",
  "create_metric": true, "pattern_review": true
}
```

Response: `{"progress_id": "4825dfb5-2a55-49ab-8ec0-9077b1462d66", "session_id": 164}`.

The agent IDs are strings in this request. `create_metric: true` saves the Metric at the end. `pattern_review: true` starts the metric review at the end.

#### Progress

The page polls `GET /test_framework/v1/metrics/build-agent-progress/?...`. It polled 14 times:

| Polls | Response |
|---|---|
| 9 | `{"session_id": 164, "status": "in_progress", "stage": "reasoning", "error": null, "build_mode": "quick", ...}` |
| 4 | `{"status": "in_progress", "stage": "checking_metric", ...}` |
| 1 | `{"status": "completed", "result": {...}}` |

Final result (trimmed):

```json
{
  "mode": "final", "refined_description": "",
  "refined_custom_code": "res = evaluate_llm_judge_metric(\n    data,\n    description=\"PASS if the Main Agent offers to take a message for the chamber staff after determining or acknowledging that it cannot fully answer the caller's question. ... FAIL if the agent does not offer to take a message in such a situation.\",\n    eval_type=\"binary\",\n)\n_result = res[\"result\"]\n_explanation = res.get(\"explanation\", \"\")",
  "refined_eval_type": "binary", "refined_audio_enabled": false, "enum_values": [],
  "summary": "The metric checks whether Sarah (the chamber assistant) offers to take a message when she genuinely cannot fully answer a caller's question. ...",
  "resolved_edge_cases": ["Genuine vs. apparent inability: ...", "Message-taking offer specificity: ...", "No partial credit: ..."],
  "metric_id": 272359, "metric_name": "Message Offer When Unable to Answer",
  "pattern_review_id": 933, "pattern_review_progress_id": "368ecb86-4906-4b41-aa7f-32d5738cf0d6"
}
```

The saved Metric is Python custom code. The code calls `evaluate_llm_judge_metric(data, description=..., eval_type="binary")` and reads `res["result"]` and `res["explanation"]`. So a "custom_code" Metric can still use a Large Language Model (LLM) judge.

#### Name handling

The prompt asked for the name "zz-spec-test-quick-metric". The server ignored that request. It named the Metric "Message Offer When Unable to Answer". The saved Metric `description` is the full prompt text, with the name request in it. A rebuild must either obey a name in the prompt or give a separate name field.

#### After the build

The page opened `/metrics?project=13875`. The floating panel "Review Message Offer When Unable to Answer" showed the button "Review sample labels". Section 1.4.2 describes this panel. The page polled the metric review 933 with these states: `running` / `running`, `running` / `grouping`, `ready` / "".

---

### 10.10 Metric review with data

#### Route

`/create-metric/review/933?project=13875`. Section 3.10 describes the empty state ("insufficient history").

#### Layout

1. Breadcrumb "Metrics" > "Review the metric".
2. Summary card: Metric name "Message Offer When Unable to Answer", button "Definition" with a down arrow, text "2 of 2 samples pass", and a progress bar.
3. One card for each pattern group.
4. Footer card: "Fix anything the judge got wrong", buttons "Done" and "Rebuild".

#### Pattern group card

| Element | Text (verbatim) |
|---|---|
| Group label | "Agent answers inquiry fully and offers staff follow-up proactively" |
| Group summary | "The agent completely answers the caller's membership question and offers to pass along their interest, without encountering an inability to answer." |
| Size badge | "2 calls" |
| Box title | "Representative call" |
| Verdict and source | "Pass" and a button "run-4168972_1792856670" with an external-link icon |
| Evidence | 3 lines with speaker, time chip, and text: "Caller" "00:11" ..., "Agent" "00:16" ..., "Caller" "00:31" ... |
| "Why this score" | 4 bullet items from the judge explanation |
| Score buttons | "Set score for this group:" "Pass" (pressed), "Fail", "N/A" |
| Other calls | "1 other call like this" with a down arrow |

The 2 samples were Call 13776321 (representative) and Run 4168972. Both passed. The judge said that the agent did not face an inability to answer. So the condition did not arise.

#### Set score for a group

The crawler clicked "N/A". The page sent `PATCH /test_framework/v1/metrics/pattern-reviews/933/corrections/` (200):

```json
{"corrections": {"p1": {"value": null, "note": ""}}}
```

The response is the full review object. After the click:

- "N/A" shows as pressed.
- A text box "Why? (optional)" shows.
- The footer text changes to "1 group fixed, 2 calls. Rebuild saves every corrected call and the other representatives to Labs, then improves the metric."
- "Rebuild" becomes enabled.

The value map is: "Pass" sends `true`, "Fail" sends `false`, "N/A" sends `null` (inferred for "Pass" and "Fail").

#### "Rebuild"

`POST /test_framework/v1/metrics/pattern-reviews/933/rebuild/` (200) with `{}`. Response:

```json
{"review_id": 933, "progress_id": "59a00cad-22e0-4084-812c-9d55462dbe1a"}
```

The page then opened `/metrics?project=13875`. The "Auto Improve" panel showed "Improving Message Offer When Unable to Answer". The review went through these states:

| `status` | `stage` | Notes |
|---|---|---|
| `rebuilding` | `reading_fixes` | `eval_set.corrections: 0` |
| `rebuilding` | `optimizing` | `eval_set: {"corrections": 2, "confirmations": 0, "test_set_ids": [8290, 8291]}`. `optimizer.progress_id` points to a `process_feedbacks` job. |
| `completed` | "" | The "Review" panel showed "Metric review completed." |

Rebuild made Lab row 8291 for the Call. It reused Lab row 8290 for Run 4168972 (from 10.5). So one Lab row exists for each source call, and it serves every Metric (inferred). The optimiser job finished with `status: "success"`. The "Auto Improve" panel showed "Message Offer When Unable to Answer" "Optimization completed" with "View Changes".

"Done" and "Definition" were not clicked. "Done" leaves the review without a rebuild (inferred).

#### Review object

`GET /test_framework/v1/metrics/pattern-reviews/933/?ql={id,project_id,status,stage,round_index,insufficient_history,error,progress_id,metric{...},counts,patterns,corrections,last_rebuild,eval_set,optimizer,created_at,updated_at}` (trimmed):

```json
{
  "id": 933, "project_id": 13875, "status": "ready", "stage": "", "round_index": 0,
  "insufficient_history": false, "error": "", "progress_id": "368ecb86-...",
  "metric": {"id": 272359, "name": "Message Offer When Unable to Answer", "type": "custom_code", "eval_type": "binary", "evaluation_trigger": "always", "...": "..."},
  "counts": {"fail_count": 0, "pass_count": 2, "error_count": 0, "total_count": 2, "skipped_count": 0, "evaluated_count": 2},
  "patterns": [{
    "id": "p1",
    "label": "Agent answers inquiry fully and offers staff follow-up proactively",
    "summary": "The agent completely answers the caller's membership question ...",
    "verdict": true, "inconsistent": false, "verdict_breakdown": {"Pass": 2},
    "degraded": false, "overflow": false, "size": 2,
    "evidence": [
      {"key": false, "text": "I'm a small business owner, and I'm wondering how I can join the chamber.", "time": "00:11", "speaker": "Caller"},
      {"key": true, "text": "Membership offers connections, ...", "time": "00:16", "speaker": "Agent"},
      {"key": false, "text": "No, thank you. Thanks for your help. Goodbye.", "time": "00:31", "speaker": "Caller"}
    ],
    "sample_call": {"source_type": "call_log", "call_log_id": 13776321, "run_id": null, "call_id": "run-4168972_1792856670",
                    "explanation": ["[\"The Main Agent was able to answer ...\", \"...\"]"],
                    "call_end_reason": "", "verdict": true, "skipped": false, "error": ""},
    "sample_calls": [
      {"source_type": "call_log", "call_log_id": 13776321, "...": "..."},
      {"source_type": "run", "call_log_id": null, "run_id": 4168972, "call_id": "", "call_end_reason": "Main agent-ended-call", "verdict": true, "...": "..."}
    ],
    "correction": null
  }],
  "corrections": {}, "last_rebuild": null,
  "eval_set": {"corrections": 0, "confirmations": 0, "test_set_ids": []},
  "optimizer": null,
  "created_at": "2026-10-24T16:16:01.900347Z", "updated_at": "2026-10-24T16:16:09.606578Z"
}
```

Notes:

- `evidence[].key: true` marks the line that decided the verdict (inferred).
- `sample_call.explanation` is a list with one string. That string is itself a JSON array. The page parses it into the "Why this score" bullets (inferred).
- `sample_calls[]` mixes Calls (`source_type: "call_log"`) and Runs (`source_type: "run"`).

#### Intermittent 401 on the review poll

The review poll sometimes returns 401 with `{"detail":"Invalid token"}`. The next poll returns 200. This happened in captures 284 (2 of 4 polls), 287 (1 of 4), 291 (1 of 2), and 298 (4 of 8). The page did not show an error. A rebuild must retry the poll after a 401 and refresh the token. Section 3.10 records the same 401 in the empty state.

---

### 10.11 Assistant with data

> **Out of scope.** The app does not build the Assistant. This section describes it only as a record.

#### Route

`/ai-assistant` (welcome screen) and `/ai-assistant/<conversationId>`. Section 4 describes the assistant. Section 4.8 and 8.4 describe the stream protocol.

#### "Make a report" suggestion

The welcome screen shows "Welcome to the Assistant", "Ask me anything about your workspace", and 6 suggestion buttons. The first one is "Make a report New A shareable PDF of your test results". A click sends the message at once. It does not fill the message box first.

Sent message (verbatim): "Use the results-report skill to make a report of all my agents' test results from this week. Ask me only what you need (agents, dates, what to focus on), then build it."

Calls in order:

1. `POST /app/v2/product-chat/conversations/` (201) with `{"name":"Use the results-report skill to make a report","project_id":13875}`. The name is the first 45 characters of the message.
2. `GET /app/v2/product-chat/conversations/<id>/status/` (200). `active_message` is `null`.
3. `GET /app/v2/product-chat/conversations/<id>/stream-token/` (409) with `{"detail":"No response is currently streaming in this conversation.","code":"no_active_stream"}`. The page checks for an active stream first (inferred). A 409 here is normal.
4. `POST /app/v2/product-chat/conversations/<id>/messages/` (201) with `{"message":"<text>","project_id":13875}`. The response holds `message_id`, `stream_url` (`https://assistant.example.com/agent/v1/stream/<message_id>`), and `stream_token` (a JSON Web Token (JWT)).
5. `GET https://assistant.example.com/agent/v1/stream/<message_id>?token=<jwt>` (200). This is the Server-Sent Events (SSE) stream.

Conversation create response (trimmed):

```json
{
  "id": "d2b3cb17-a7f7-4d50-a30a-fa5174e97ee6", "name": "Use the results-report skill to make a report",
  "source": "web", "mode": "general", "workflow_id": "", "page_context": {}, "active_status": null,
  "optimizer_question_pending": false, "optimizer_review_pending": false, "optimizer_run_active": false,
  "owner": {"id": 9855, "name": "Automaton", "email": "<user-email>"}, "is_owner": true, "is_shared": false,
  "organization": 7868, "organization_name": "example-org"
}
```

#### First answer and the question widget

The assistant ran 3 tools and asked 2 questions. The page shows:

- "Thought for 2.0s" (collapsible).
- Tool lines with a wrench icon and a duration: "Record Skill Start: results-report 0.34s", "List AI voice agents 0.40s", "List test results 0.39s".
- The answer text: "Your project has 2 agents, but only one has any finished test results — `zz-spec-test-agent-voice` (1 completed run on 2026-10-24, 100% success). `Voice Regression — E2E Deploy Agent Sq` has no results at all, so it can't appear in the report. I'll build the report on the data that exists. One thing I need from you:"
- 3 icon buttons under the answer: copy, flag, download.
- The question widget. Section 4.6 describes its shell.

Question widget in this run:

| Element | Text (verbatim) |
|---|---|
| Counter | "Question 1 of 2" |
| Buttons | "Skip", "Skip all", "Exit" |
| Question | "What should the report focus on?" |
| Options | "1 Overall quality summary", "2 Failures and risks", "3 Leadership one-pager" |
| Free text | "Or type your own answer…" |
| Send | "Send answer" (disabled until an answer exists) |

Question 2 was "Include the single result from 2026-10-24, or should I widen the date range in case older results exist outside this list?" with the options "Just that result" and "Widen the range".

Answer flow:

1. The user picks "Overall quality summary". The widget moves to question 2.
2. The user picks "Just that result".
3. The page sends 1 message with all answers.
4. The chat shows the answers as one user card. Each question is in small gray text. Each answer is in bold below it.

The answer message (verbatim request body):

```json
{"message": "What should the report focus on? — Overall quality summary\nInclude the single result from 2026-10-24, or should I widen the date range in case older results exist outside this list? — Just that result", "project_id": 13875}
```

The format is one line for each question: `<question> — <answer>`, joined with a newline.

#### Reopen a conversation

A click on a thread in the history list opens `/ai-assistant/<id>`. The page sends:

- `GET /app/v1/product-chat/sessions/<id>/` (twice in the capture).
- `GET /app/v2/product-chat/conversations/<id>/status/`.
- `GET /app/v2/product-chat/org-skills/` (returned `[]`).
- `GET /app/v2/product-chat/org-mcp-servers/` (returned `[]`). These are the Model Context Protocol (MCP) servers of the organization.
- `GET /github/connection/` (returned `{"connected": false}`).

The page rebuilds the whole chat from the stored session, with the open question widget.

#### Stored session model

`GET /app/v1/product-chat/sessions/d2b3cb17-.../` (200), trimmed:

```json
{
  "session_id": "d2b3cb17-a7f7-4d50-a30a-fa5174e97ee6",
  "name": "Use the results-report skill to make a report…",
  "messages": [
    {
      "role": "user",
      "message": "Use the results-report skill to make a report of all my agents' test results from this week. ...",
      "tool_calls": [], "diff_blocks": [], "chart_blocks": [],
      "author": {"id": 9855, "name": "Automaton", "email": "<user-email>"},
      "created_at": "2026-10-24T15:54:39.724085Z"
    },
    {
      "role": "assistant",
      "message": "Your project has 2 agents, but only one has any finished test results — ...",
      "tool_calls": [
        {"at": 1792857288.5751529, "name": "skill_started",
         "input": {"skill_name": "results-report", "plugin_version": "0.19"},
         "outcome": "ok", "raw_name": "mcp__app__skill_started", "duration_ms": 345,
         "tool_use_id": "call_8a9687b928d44cf2967cdcd7", "display_name": "Record Skill Start: results-report"},
        {"at": 1792857288.623833, "name": "aiagents_list", "input": {"project_id": 13875}, "outcome": "ok",
         "raw_name": "mcp__app__aiagents_list", "duration_ms": 401, "tool_use_id": "call_d9d2...", "display_name": "List AI voice agents"},
        {"at": 1792857288.6637151, "name": "results_list", "input": {"page_size": 50, "project_id": 13875}, "outcome": "ok",
         "raw_name": "mcp__app__results_list", "duration_ms": 393, "tool_use_id": "call_3590...", "display_name": "List test results"}
      ],
      "diff_blocks": [], "chart_blocks": [],
      "clarification": {
        "questions": ["What should the report focus on?",
                      "Include the single result from 2026-10-24, or should I widen the date range in case older results exist outside this list?"],
        "question_types": [null, null],
        "options": [["Overall quality summary", "Failures and risks", "Leadership one-pager"],
                    ["Just that result", "Widen the range"]]
      },
      "author": {"id": 9855, "name": "Automaton", "email": "<user-email>"},
      "created_at": "2026-10-24T15:54:39.727728Z"
    }
  ],
  "updated_at": "2026-10-24T15:54:39.729790Z",
  "optimizer_question_pending": false, "optimizer_review_session_id": null, "optimizer_review_pending": false,
  "optimizer_run_active": false, "optimizer_review_can_act": false, "optimizer_review_open": false,
  "optimizer_review_project_id": null,
  "owner": {"id": 9855, "name": "Automaton", "email": "<user-email>"}, "is_owner": true,
  "organization": 7868, "organization_name": "example-org",
  "improvement_session_id": null, "improvement_session_project_id": null
}
```

Message fields:

| Field | Meaning |
|---|---|
| `role` | `user` or `assistant` |
| `message` | Markdown text of the message |
| `tool_calls[]` | Tools that the assistant ran before this message. `at` is a Unix time in seconds. `name` is the short tool name. `raw_name` is the full Model Context Protocol (MCP) name with the prefix `mcp__app__`. `input` is the tool input. `outcome` is `ok` or an error (inferred). `duration_ms` is the run time in milliseconds. `tool_use_id` links the start and complete events. `display_name` is the label on the page. |
| `diff_blocks[]` | Change previews (empty here) |
| `chart_blocks[]` | Charts (empty here) |
| `clarification` | Open questions: `questions[]`, `question_types[]` (`null` here), `options[][]` (one option list for each question) |
| `optimizer_proposal` | Only on optimiser messages: `{"session_id": 168, "version": 1}` (10.8) |
| `author` | The user who owns the message. Assistant messages carry the same author. |
| `created_at` | Time stamp |

#### Stream with parallel tool calls

The answer to the questions streamed these events. Counts: 4 `status`, 43 `thinking_delta`, 70 `text_delta`, 4 `tool_use_start`, 4 `tool_use_complete`, 1 `assistant_complete`, 1 `done`. The stream starts with `retry: 3000`. Each event has a higher `id` than the event before it.

The 4 tool calls ran in parallel. The stream sent all 4 `tool_use_start` events before the first `tool_use_complete`. The complete events came in a different order:

```text
id: 19
event: tool_use_start
data: {"name":"results_retrieve","raw_name":"mcp__app__results_retrieve","input":{"id":970807},"tool_use_id":"call_3e6e...","display_name":"Retrieve a test result"}

id: 21
event: tool_use_start
data: {"name":"runs_bulk_retrieve","raw_name":"mcp__app__runs_bulk_retrieve","input":{"project_id":13875,"result_id":970807,"run_ids":"4168972"},"tool_use_id":"call_bc35...","display_name":"Get multiple runs"}

id: 23
event: tool_use_start
data: {"name":"scenarios_list","raw_name":"mcp__app__scenarios_list","input":{"agent_id":26259},"tool_use_id":"call_8918...","display_name":"List evaluators"}

id: 25
event: tool_use_start
data: {"name":"metrics_list","raw_name":"mcp__app__metrics_list","input":{"agent_id":26259},"tool_use_id":"call_8569...","display_name":"List quality metrics"}

id: 26
event: tool_use_complete
data: {"tool_use_id":"call_8569...","name":"metrics_list","raw_name":"mcp__app__metrics_list","output_preview":"\"[]\\n\\n[mcp_call_id: call_fd87...]\"","is_error":false,"duration_ms":501}

id: 27
event: tool_use_complete
data: {"tool_use_id":"call_8918...","name":"scenarios_list","output_preview":"\"{\\\"count\\\":2, ...","is_error":false,"duration_ms":...}
```

The page must match each `tool_use_complete` to its line by `tool_use_id`, not by order. The page showed the 4 lines "Retrieve a test result 0.66s", "Get multiple runs 0.62s", "List evaluators 0.58s", "List quality metrics 0.50s".

The tool `metrics_list` with `agent_id: 26259` returned `[]`, although the agent had 15 Metrics. The assistant read the Metric scores from the Run data.

#### Report block in the assistant text

The final `assistant_complete` event has one field, `full_content`. The report is a fenced JSON block inside that text, between 2 HTML comment markers. This is the block from the crawl step `257-agent-report-built`:

````text
<!-- APP-V0-REPORT-START -->
```json
{
  "version": 1,
  "title": "Weekly Agent Quality Summary",
  "selection_label": "All calls · zz-spec-test-agent-voice",
  "date_range": "24 Oct 2026",
  "agents": ["zz-spec-test-agent-voice"],
  "project_id": 13875,
  "result_ids": [970807],
  "layout": [
    {"key": "glance", "x": 0, "y": 0, "w": 12, "h": 3},
    {"key": "summary", "x": 0, "y": 3, "w": 12, "h": 3}
  ],
  "outputs": {
    "glance": {
      "kind": "figures", "title": "At a glance", "about": "All calls in the period",
      "takeaway": "100% of calls passed (1/1). Every check in this period passed on all 1 call.",
      "status": "good", "sample": {"n": 1, "label": "1 call"}, "empty_message": "",
      "items": [
        {"key": "pass_rate", "label": "Pass rate", "count": {"x": 1, "y": 1}},
        {"key": "metric:Expected Outcome", "label": "Expected Outcome", "count": {"x": 1, "y": 1}},
        {"key": "calls", "label": "Calls", "value": 1, "sub": "in this report"}
      ]
    },
    "summary": {
      "kind": "text", "title": "Every check passed on all 1 call", "about": "All calls in the period",
      "takeaway": "The membership-inquiry call met its expected outcome and passed every scored check.",
      "status": "good", "sample": {"n": 1, "label": "1 call"}, "empty_message": "",
      "blocks": [
        {"heading": "Overall", "body": "The single voice call this week passed (1/1). On the test where a small business owner asks how to join the chamber, the agent greeted the caller in about 5 seconds, described membership benefits and how to sign up, offered to pass the caller's interest to chamber staff, and ended the call politely. Expected Outcome scored full marks."},
        {"heading": "Checks", "body": "Persona Integrity, No Fabricated Availability, Infrastructure Issues, Interruption Score, Unnecessary Repetition Score and Latency (in ms) all passed — median reply time was 1870 ms. Transcription Accuracy and Mock tool call accuracy had no data to score on this call, and the tool log was unavailable to Confirmation Before Mutation, which found no unconfirmed action in the transcript itself."},
        {"heading": "Coverage note", "body": "This report rests on 1 call for zz-spec-test-agent-voice. The project's other agent, Voice Regression — E2E Deploy Agent Sq, had no finished results in the period, so nothing can be said about it here."}
      ]
    }
  }
}
```
<!-- APP-V0-REPORT-END -->
````

The text before the block is a short summary in Markdown. The text after the block is "Open the report above, or use Download PDF on it."

Report schema seen:

| Field | Meaning |
|---|---|
| `version` | Schema version, `1` |
| `title`, `selection_label`, `date_range`, `agents[]` | Card header. The sub-title is `selection_label` + " · " + `date_range`. |
| `project_id`, `result_ids[]` | Data source |
| `layout[]` | Grid items: `key` (an `outputs` key), `x`, `y`, `w`, `h`. The grid is 12 units wide (inferred from `w: 12`). |
| `outputs.<key>.kind` | `figures` or `text` |
| `title`, `about` | Section title and scope line |
| `takeaway` | One-line result beside the status chip |
| `status` | `good` shows a green chip "Good". Other values were not seen. |
| `sample` | `n` and `label`. With a small `n` the page adds the chip "Small sample" (inferred threshold). |
| `empty_message` | Text for an empty section (inferred) |
| `items[]` (figures) | Tiles: `key`, `label`, and either `count` (`x` of `y`, shown as a percent and "x/y calls") or `value` with `sub` |
| `blocks[]` (text) | Paragraphs with `heading` and `body` |

The page does not show the raw block. It replaces the block with the report card (inferred: the page parses the markers).

#### Report card

| Element | Text (verbatim) |
|---|---|
| Title | "Weekly Agent Quality Summary" |
| Sub-title | "All calls · zz-spec-test-agent-voice · 24 Oct 2026" |
| Buttons | "Expand", "Download PDF" |
| Section 1 | "At a glance", "All calls in the period · 1 call", chip "Small sample", chip "Good", "100% of calls passed (1/1). Every check in this period passed on all 1 call.", tiles "Pass rate 100% 1/1 calls", "Expected Outcome 100% 1/1 calls", "Calls 1 in this report" |
| Section 2 | "Every check passed on all 1 call", the same scope line and chips, the takeaway, and the 3 blocks "Overall", "Checks", "Coverage note" |

"Expand" was not clicked.

#### "Download PDF" on the report card

1. The user clicks "Download PDF". The dialog "Public links to these calls" opens.
2. The user clicks "Without links". The dialog "PDF preview" opens.
3. The user clicks "Download PDF" in the preview.

"Public links to these calls" dialog:

| Element | Text (verbatim) |
|---|---|
| Title | "Public links to these calls" |
| Text | "This PDF will contain links anyone can open to view these calls (transcripts and recordings). Links expire in 30 days." |
| Buttons | "Cancel", "Without links", "Add public links", "Close" |

"PDF preview" dialog:

| Element | Text (verbatim) |
|---|---|
| Back | "Back" |
| Layout | radio group "PDF layout": "Pageless" (checked), "Pages (A4)" |
| Layout help | "One continuous page · A4 wide, 23 cm long · best for screens" |
| Buttons | "Close", "Download PDF" |
| Preview header | "zz-spec-test-agent-voice · 24 Oct 2026 · Generated 24 Oct 2026", the app's logo, "Prepared for example-org" |
| Preview body | The report sections |
| Preview footer | "Weekly Agent Quality Summary · Generated 24 Oct 2026 End of report" |

No step of this flow sent a backend call. The final "Download PDF" made no file in the crawler browser (section 9.0). "Add public links" was not clicked.

#### Reports list

After the report, the page sends `GET /app/v2/product-chat/reports/?limit=50`. The tab label changes from "Reports New" to "Reports New 1". Item shape:

```json
[{
  "message_id": "29000fc6-71cb-4e3e-a830-66eb2be11e65",
  "conversation_id": "d2b3cb17-a7f7-4d50-a30a-fa5174e97ee6",
  "conversation_name": "Use the results-report skill to make a report…",
  "title": "Weekly Agent Quality Summary",
  "selection_label": "All calls · zz-spec-test-agent-voice",
  "date_range": "24 Oct 2026",
  "agents": ["zz-spec-test-agent-voice"],
  "created_at": "2026-10-24T15:57:12.333396Z"
}]
```

The list holds one item for each assistant message with a report block (inferred: the key is `message_id`).

#### Waiting status and the sidebar badge

- A thread with an open question or an open optimiser proposal shows the status "Waiting for your answer" under its name in the history list.
- The sidebar link "Assistant" carries a red badge with the number of threads that wait for an answer. Its accessible name is "Assistant 2 chats are waiting for you" or "Assistant 1 chat is waiting for you". The badge itself is a `status` element with the text "2" or "1".
- In capture 255, 2 threads waited: the report thread (open questions) and the optimiser thread (open proposal). After the answers, 1 thread waited.

---

### 10.12 Insights

#### Route

`/13875/insights`. Section 6.6 describes the empty page.

#### Pricing

The page text (verbatim): "Groups the calls that fail each enabled metric into recurring failure modes, updated as new calls come in. Only the metrics enabled here are analysed, up to each metric's daily failure limit, at 0.4 credits each."

`GET /observability/v1/metric-failure-mode-insights/pricing/?project=13875`:

```json
{"insight_generation_cost": 10.0, "metric_triage_cost": 0.4, "triage_daily_cap_per_metric": 100, "triage_daily_budget_per_metric": 10.0}
```

`GET /observability/v1/deep-research-insights/pricing/?project=13875`:

```json
{"deep_research_cost": 20.0, "deep_research_enabled": false}
```

`metric_triage_cost` is the cost to analyse 1 failed call. `triage_daily_cap_per_metric` is the largest daily failure limit. `insight_generation_cost` and `deep_research_cost` were not charged in this run.

#### "Enable insights for a metric" dialog

| Element | Text (verbatim) | Default |
|---|---|---|
| Title | "Enable insights for a metric" | none |
| "Metric" | combobox, placeholder "Select a metric…" | empty |
| "A call passes when score" | combobox "Passing threshold operator" and text box "Passing threshold value" | "≥" and "4" |
| "Failures to consider each day" | combobox: "All failures", "10 failures", "25 failures", "50 failures", "100 failures" | "All failures" |
| Cost line | With "All failures": "Every failure will be analysed at 0.4 credits each. No daily limit." With "10 failures": "Up to 4 credits per metric per day." | none |
| Buttons | "Cancel", "Enable insights" (disabled until a Metric is selected) | none |

The Metric list showed 9 options with their IDs: "240898 AI interrupting user", "240899 Average Pitch (in Hz)", "240901 Infrastructure Issues", "240902 Interruption Score", "240903 Latency (in ms)", "240904 Stop Time after User Interruption (ms)", "240905 Talk Ratio", "240906 Tool Call Success", "240908 Unnecessary Repetition Score".

The list excludes "Expected Outcome", "Transcription Accuracy", "Persona Integrity", "No Fabricated Availability", "Confirmation Before Mutation", and "Mock tool call accuracy". Each excluded Metric has `observability_enabled: false` (inferred: the list keeps observability Metrics only). The list comes from `GET /observability/v1/metric-failure-mode-insights/metric-config/?project=13875`.

One item of the `metric-config` list:

```json
{
  "metric": 240908, "metric_name": "Unnecessary Repetition Score", "eval_type": "continuous_qualitative",
  "type": "llm_judge", "function_name": "get_unnecessary_repetitions_score", "enum_values": [],
  "user_defined": false, "evaluation_trigger": "always", "display_order": 11,
  "insight_enabled": false, "pass_conditions": null,
  "default_pass_conditions": {"operator": "and", "conditions": [{"field": "score", "op": "gte", "value": 4}]},
  "triage_failure_limit": 100
}
```

`default_pass_conditions` sets the default operator and value in the dialog. Defaults seen: `gte 1` for numeric Metrics, `eq true` for binary Metrics, `gte 4` for rating Metrics. The operator option list was not opened.

#### Enable

The crawler picked "240908 Unnecessary Repetition Score", kept "≥ 4", picked "10 failures", and clicked "Enable insights".

`POST /observability/v1/metric-failure-mode-insights/metric-config/` (200). Request:

```json
{"project": 13875, "metric": 240908, "enabled": true, "pass_conditions": {"operator": "and", "conditions": [{"field": "score", "op": "gte", "value": 4}]}, "triage_failure_limit": 10}
```

Response:

```json
{"metric": 240908, "metric_name": "Unnecessary Repetition Score", "insight_enabled": true, "pass_conditions": {"operator": "and", "conditions": [{"field": "score", "op": "gte", "value": 4}]}, "triage_failure_limit": 10}
```

The page then reloads `metric-config`, `failure-rates`, and `categories`.

#### Enabled Metric card

| Element | Text (verbatim) |
|---|---|
| Heading | "Unnecessary Repetition Score" |
| Buttons | "Reorder Unnecessary Repetition Score" (drag handle), "Insights settings for Unnecessary Repetition Score" (menu) |
| Empty text | "No failure categories in this range." |
| Stats line | "0 categories · 0 failures · continuous qualitative" |
| Section | "Failure modes over time", "See how a failure mode's rate has moved, and which agent version was live.", button "View graphs" |

The toolbar keeps "Select View", "Enable insights", "All agents", and the time range button "Oct 23, 18:03:34 to Oct 24, 18:03:34". The card has no categories, because the Metric did not fail.

#### Settings menu

The menu "Insights settings for Unnecessary Repetition Score" has 3 items: "Alert me on new categories", "Edit failure criteria", "Turn off insights".

"Turn off insights" sent `POST /observability/v1/metric-failure-mode-insights/metric-config/` (200):

```json
{"project": 13875, "metric": 240908, "enabled": false}
```

Response: the config with `insight_enabled: false`. The server kept `pass_conditions` and `triage_failure_limit: 10`. The page returned to the empty state. "Alert me on new categories" and "Edit failure criteria" were not clicked.

---

### 10.13 Evaluator actions

#### Route

`/test-case?project=13875&page=1&folder=zz-spec-test-folder&pageSize=30`. Section 5.6 lists the "Actions" menu items: "Create monitor", "Add Tags", "Modify Scenarios", "Duplicate", "Move to Folder". This run opened 4 of them with 1 row selected.

#### "Add Tags"

| Element | Text (verbatim) |
|---|---|
| Title | "Add Tags to Selected Scenarios" |
| Help | "Press Enter to add a tag." |
| Input | "Create tags..." |
| Existing tags | "booking", "callback", "connection-test", "junk call", "sales call", "zz-spec-test" (from `GET /test_framework/v1/scenarios/tags/`) |
| Buttons | "Add Tags" (disabled until a tag exists), "Close" |

`POST /test_framework/v1/scenarios/add_tags?folder_path=zz-spec-test-folder` (200). Request:

```json
{"project_id": 13875, "scenarios": [402457], "tags": ["zz-spec-test-tag2"]}
```

The response is an array of the full updated Evaluators. The new tag list was `["zz-spec-test", "zz-spec-test-tag2"]`. The call adds tags. It does not replace them. The path has no trailing slash.

#### "Move to folder"

| Element | Text (verbatim) |
|---|---|
| Title | "Move to folder" |
| Field | "Folder" / "Select the target folder to move the scenario into *", combobox "Select folder" |
| Buttons | "Cancel", "Move" (disabled until a folder is selected) |

On open, the page sends `GET /test_framework/v1/scenarios/folders/`. The crawler did not click "Move".

#### "Duplicate"

| Element | Text (verbatim) | Value in the run |
|---|---|---|
| Title | "Duplicate scenarios" | none |
| "Project" | combobox | "Automaton Project" |
| "Agent" / "Optional. Leave as is to keep the current agent." | combobox, default "Select agent" | not changed |
| "Folder" / "Where the duplicated test cases are saved *" | combobox | "zz-spec-test-folder" |
| Buttons | "Cancel", "Duplicate" | "Duplicate" clicked |

`POST /test_framework/v1/scenarios/duplicate/?folder_path=zz-spec-test-folder` (201). Request:

```json
{"project": 13875, "scenarios": [402457], "folder_path": "zz-spec-test-folder", "copy_to_project": 13875}
```

Response (trimmed):

```json
[{
  "id": 402467, "name": "Copy of zz-spec-test-eval-membership",
  "agent": null, "agent_name": null,
  "personality": 693, "tags": ["zz-spec-test", "zz-spec-test-tag2"], "tool_ids": ["VAPI_TOOL_END_CALL"],
  "test_profile": 37004, "scenario_type": "instruction", "...": "same content as 402457"
}]
```

Defect: the help text says "Leave as is to keep the current agent." But the copy got `agent: null`. The list row shows "-" in the Agent column. The request did not send an `agent` field. A rebuild must keep the source agent when the user does not pick one.

The copy name has the prefix "Copy of ".

#### "Modify Scenarios" ("Advanced Scenarios Edit")

| Field (verbatim) | Help text (verbatim) | Control |
|---|---|---|
| "Agent" | "Set the agent for all selected scenarios" | combobox "Select agent" |
| "Test Profile" | "Test profile is the information you expect Test Agent to know. Example the name, date of birth etc." | combobox "Select Test Profile" |
| "Personality" | "Change the personality for selected scenarios" | combobox "Select Personality" |
| "First Message" | "Override the first message for all selected scenarios" | text box "Enter first message...", checkbox "Send empty first message" |
| "Max Call Duration (seconds)" | "Optional: Override project's max call duration (10-3600 seconds)" | text box "Leave empty to use project default" |
| "Phone Number" | none | combobox "Select a phone number" |
| "Add Metrics" | "Select metrics to add to the scenarios" | button "Select Metrics to Add" |
| "Remove Metrics" | "Select metrics to remove from the scenarios" | button "Select Metrics to Remove" |
| "Append Instructions" | "Add additional instructions to the existing scenario instructions" | text area "Enter additional instructions to append..." |
| "Add Tools" | "Select tools to add to the scenarios. You can select multiple tools including all end call variants." | button "Select Tools to Add" |
| "Remove Tools" | "Select tools to remove from the scenarios. You can remove any combination of tools." | button "Select Tools to Remove" |

Dialog title "Advanced Scenarios Edit", sub-title "Update metrics, personality, and instructions for selected scenarios". Buttons "Update Scenarios" and "Close". On open, the page sends `GET /test_framework/v2/aiagents/short_list/` and `GET /user/v1/projects/13875/personalities/`. The crawler did not click "Update Scenarios".

#### "Export"

The toolbar button shows the selection count, for example "Export (1)".

| Element | Text (verbatim) |
|---|---|
| Title | "Export scenarios" |
| "Export format" | combobox, default "CSV (.csv)" |
| Count | "1 scenario selected for export" |
| Buttons | "Cancel", "Export as CSV" (the label follows the format) |

The format list has 3 options: "CSV (.csv)", "Excel (.xlsx)", and "Test suite spec (.json)". The crawler read the open list during the run. The crawl record holds only the selected value. The Excel export was not run.

Comma-Separated Values (CSV) export: `GET /test_framework/v1/scenarios/export_scenarios?scenario_ids=402457&project_id=13875&export_type=csv` (200). The body is Comma-Separated Values (CSV) text. Header row (verbatim):

```text
scenario_id,scenario_name,scenario_type,agent_id,agent_name,project_id,project_name,personality_id,personality_name,test_profile,folder_path,first_message,instructions,simulation_description,expected_outcome_prompt,max_duration,scenario_language,phone_number,tags,metrics,created_at,updated_at,created_by
```

The `test_profile` column holds the whole profile object as JSON text. The browser saved the file as `278-scenarios-export-2026-10-24.csv`.

JSON spec export: `GET /test_framework/v1/scenarios/export_scenarios?scenario_ids=402457&project_id=13875&export_type=json` (200). The browser saved the file as `279-scenarios-export-2026-10-24.json`. Full content:

```json
{
  "$schema": "https://docs.example.com/schemas/test-suite/v1.json",
  "version": "1",
  "scenarios": [
    {
      "key": "scenario_402457",
      "name": "zz-spec-test-eval-membership",
      "type": "instruction",
      "instructions": "<scenario>\n- You are a small business owner who wants to know how to join the chamber.\n- Ask one question about membership.\n- Thank the agent and say goodbye after the answer.\n- Keep the call under one minute.\n</scenario>",
      "first_message": "Hello, is this the chamber of commerce?",
      "expected_outcome": "- The Main Agent greets the Testing Agent.\n- The Main Agent answers the membership question or offers to take a message.\n- The Main Agent ends the call politely.",
      "tags": ["zz-spec-test", "zz-spec-test-tag2"],
      "language": "en",
      "max_duration": 120,
      "personality": 693,
      "test_profile": 37004,
      "tools": ["end_call"],
      "metrics": [
        "ai_interrupting_user", "average_pitch_in_hz", "expected_outcome", "infrastructure_issues",
        240902,
        "latency_in_ms", "stop_time_after_user_interruption_ms", "talk_ratio", "tool_call_success",
        "transcription_accuracy",
        240908, 243607, 243608, 243609,
        "mock_tool_call_accuracy"
      ]
    }
  ]
}
```

Spec rules seen in this file:

- `key` is `scenario_<id>`.
- `tools` uses short names. `VAPI_TOOL_END_CALL` becomes `end_call`.
- `metrics` mixes 2 forms. A predefined Metric with a stable slug is a snake-case string, for example `latency_in_ms`. Other Metrics are numeric IDs. "Interruption Score" (240902) and "Unnecessary Repetition Score" (240908) are predefined but show as IDs. The capture does not show why.
- `personality` and `test_profile` are numeric IDs.

The JSON spec is the input format of "Run from file" (10.14).

---

### 10.14 "Run from file" dry run

#### Dialog with a spec

Section 5.14 describes the empty dialog. In this run:

| Element | Value or text (verbatim) |
|---|---|
| "Agent" | "zz-spec-test-agent-voice" |
| "Channel" | "Voice (phone call)" |
| Help | "The file describes what to test. These pick what it runs against." |
| "Test suite file" tabs | "Upload file", "Paste JSON" (selected) |
| Paste box | placeholder `{ "version": "1", "scenarios": [] }`. The crawler pasted a spec with 1 test case. |
| Status | "Spec looks good" and "1 test case · 1 run · voice" |
| Plan table | Columns "Test case", "Runs", "Metrics", "Personality". Row "zz-spec-test-from-file", "1", "1", "Normal Male". |
| Price line | "Priced and ready to run." |
| Buttons | "Check spec", "Run 1 run" |

The "Channel" list has 3 options: "Voice (phone call)", "Text (chat)", and "ElevenLabs WebRTC". The crawler read the open list during the run. The crawl record holds only the selected value. The run button label holds the run count: "Run 1 run".

#### "Check spec"

`POST /test_framework/v1/scenarios/run_scenarios_json/?project_id=13875&dry_run=true` (200). Request:

```json
{
  "spec": {
    "$schema": "https://docs.example.com/schemas/test-suite/v1.json",
    "version": "1",
    "scenarios": [{
      "key": "scenario_zz", "name": "zz-spec-test-from-file", "type": "instruction",
      "instructions": "<scenario>\n- You are a small business owner who wants to know how to join the chamber.\n- Thank the agent and say goodbye after the answer.\n</scenario>",
      "first_message": "Hello, is this the chamber of commerce?",
      "expected_outcome": "- The Main Agent answers the membership question.",
      "tags": ["zz-spec-test"], "language": "en", "max_duration": 120, "personality": 693,
      "tools": ["end_call"], "metrics": ["expected_outcome"]
    }]
  },
  "channel": "voice",
  "agent_id": 26259
}
```

Response:

```json
{
  "dry_run": true, "valid": true,
  "plan": {
    "agent_id": 26259, "project_id": 13875, "channel": "voice", "suite_name": "",
    "scenario_count": 1, "total_runs": 1, "estimated_cost": 5, "run_overrides": {},
    "agent_number": "+15550100199", "outbound_phone_number": "+15550100199",
    "scenarios": [{
      "key": "scenario_zz", "name": "zz-spec-test-from-file", "type": "instruction", "frequency": 1,
      "metric_ids": [240900], "tags": ["zz-spec-test"],
      "personality": {"mode": "existing", "id": 693, "name": "Normal Male"},
      "test_profile": null, "phone_number": null
    }]
  }
}
```

Notes:

- The dashboard uses the `v1` path with the query `dry_run=true`. Section 5.14 inferred a `v2` validate path. The observed call is the `v1` path above.
- The server resolved the slug `expected_outcome` to Metric ID 240900.
- `estimated_cost` is 5 credits for 1 voice run. The real Run of 10.3 and the test call cost about 3.70 credits together. So the estimate is an upper bound (inferred).
- `personality.mode: "existing"` says that the spec used an existing Personality.
- The dashboard sent no dry run on paste. It sent one only on "Check spec" (inferred: 1 call in the capture).

The crawler did not click "Run 1 run".

---

### 10.15 Pages that now have data

#### Results list (`/13875/results?page=1&view=results&pageSize=30`)

| Item | Empty state (section 6.1) | With data |
|---|---|---|
| Table body | Empty | 1 row |
| Toolbar | "Select View", toggle, "Filters", "Export All", "Reports", "Compare Results", "Reevaluate Metrics", delete | "Select View", toggle "Results" / "Runs", "Filters", "Export All", "Reevaluate Metrics" (disabled), delete icon (disabled). "Reports" and "Compare Results" are not in this capture. The cause is not known. |

Columns: checkbox, "ID", "Label", "# Evaluators", "Runs", "Agent", "Type", "Status", "Score", "Created At", and a last column with no header.

Row: "970807", "zz-spec-test-run-1" with an icon button, "1", "1", "zz-spec-test-agent-voice v2" with the link "Go to agent: zz-spec-test-agent-voice", "Telephony", "Completed", "100%" with a bar, "10/24/2026, 5:25 PM".

The list call returns:

```json
{"next": null, "previous": null, "results": [{
  "id": 970807, "name": "zz-spec-test-run-1", "agent": 26259, "agent_name": "zz-spec-test-agent-voice",
  "status": "completed", "success_rate": 100.0, "run_as_text": false,
  "total_runs_count": 1, "completed_runs_count": 1,
  "scenarios": [{"id": 402457, "name": "zz-spec-test-eval-membership"}],
  "run_type": "Voice", "agent_version": {"history_id": 7107560, "version_id": "v2", "version_name": null, "is_current": true},
  "created_at": "2026-10-24T15:25:10.328491Z"
}]}
```

"Type" shows "Telephony" for `run_type: "Voice"` with `run_as_text: false` (inferred).

#### Runs view (`view=runs`)

The Runs view lists every Run of the project. Columns: "ID", "Result ID", "Evaluator Name", "Run Start Time", "Duration", "Evaluation", "Personality", "Agent", "Test Profile", "Testing Agent Number", "Call Ended Reason", "Ringing Duration", "Feedback", then one column for each simulation Metric. Compared with the Runs table on the Result page, it adds "Result ID" (with the link "Go to result: 970807") and "Agent". It has no row checkbox.

The row showed "Reviewed Success" in "Evaluation" and the saved feedback text in "Feedback".

#### Runs Overview (`/runs-overview?project=13875&from=now-24h&to=now&view=new`)

The dashboard view (section 6.2, "Try Dashboards view") now shows values:

| Widget | Value |
|---|---|
| Stats line | "Success Ratio 100.0%", "Number of Runs 1", "Total Run Minutes 00:40", "Median Latency 1870ms". Each figure has "—" as the change, because no earlier period exists. |
| "Success rate over time" | 1 bar on "Oct 24", label "Success count" |
| "Latency over time" | 1 point at "17:25", label "Latency (in ms)" |
| "Expected Outcome", "Infrastructure Issues", "Interruption Score", "Unnecessary Repetition Score", "Persona Integrity" | 1 bar each, axis 0.0% to 100.0%, label "<name> percentage" |
| "AI interrupting user", "Average Pitch (in Hz)", "Talk Ratio" | 1 bar each, label "<name> avg" |
| "Top failed scenarios" | "No data available". No Run failed. |
| "Stop Time after User Interruption (ms)", "Transcription Accuracy" | "No data available". The scores are `null`. |

Widget data examples:

```json
{"widget_id": 108633, "field_name": "stat", "chart_type": "stat", "data": [
  {"label": "Success Ratio", "value": "100.0%", "change": null, "format": "number"},
  {"label": "Number of Runs", "value": 1, "change": null, "format": "number"},
  {"label": "Total Run Minutes", "value": "00:40", "change": null, "format": "duration"},
  {"label": "Median Latency", "value": 1870.0, "change": null, "format": "number"}]}
{"widget_id": 108635, "field_name": "metric_evaluations.value", "chart_type": "line",
 "data": [{"id": 4168972, "timestamp": "2026-10-24T15:25:10.338384+00:00", "value": 2083.33}],
 "metadata": {"display_name": "Metric Evaluation", "data_type": "numeric", "filter_value": 240903}}
{"widget_id": 108645, "field_name": "metric_evaluations.value", "chart_type": "bar", "aggregation_function": "avg", "time_period": "day",
 "data": [{"time_interval": "2026-10-24", "value": 5.0, "sample_count": 1}],
 "metadata": {"display_name": "Metric Evaluation", "data_type": "numeric", "filter_value": 240908}}
{"widget_id": 108640, "field_name": "scenario.name", "chart_type": "pie", "data": []}
```

A line widget returns one point for each Run (`id`, `timestamp`, `value`). A bar widget returns one bucket for each time period (`time_interval`, `value`, `sample_count`). A rating Metric bar shows the 0 to 5 average as a percent (inferred from the axis).

#### Overview dashboard (`/13875/dashboards/13682`)

This is the Calls dashboard (section 6.7). It now counts the uploaded Call:

| Widget | Value |
|---|---|
| Stats line | "Success Ratio 100.0%", "Number of Calls 1", "Total Call Minutes 00:40", "Median Latency 1870ms" |
| "Success Rate" | 1 bar at "Oct 24, 17:00", label "Success count" |
| "Latency Over Time (ms)" | 1 bar, label "Latency (in ms) avg". Data: `value` 2083.33 with `sample_count: 3` (inferred: 3 turn latencies). |
| "Call Ended Reasons" | "No data available". The uploaded Call has no ended reason. |
| "Total Duration (mins)" | 1 bar, label "Call Duration avg", data value 0.68 |
| "Infrastructure Issues" | Pie "1Total", legend "True 1" |
| "Interruption Score" | 1 bar, label "Interruption Score avg" |

The toolbar shows "In Daily Report" with a switch. This dashboard groups by hour (`time_period: "hour"`). The Runs Overview groups by day.

#### Insights

Before the enable, the page still showed "No metrics have insights enabled yet." Data in the project does not change this state. The user must enable a Metric (10.12).

#### Alerts (`/13875/alerts/review?hours=24`)

No change from the empty state of section 6.5. No Alert existed, so no Alert fired. The calls returned:

```json
{"summary": {"total_fires": 0, "unique_alerts": 0, "top_alert": null}, "timeline": [], "timeline_top_alerts": [], "timeline_other_counts": [], "alerts": [], "pagination": {"page": 1, "page_size": 50, "total_alerts": 0, "has_next": false}}
```

`GET /observability/v1/alerts/?project_id=13875` returned `[]`. `GET /observability/v1/alerts/trigger_summary/?project_id=13875&hours=24` returned `{}`.

---

### 10.16 Gaps closed by this run

| Gap (section 9) | Status | Subsection |
|---|---|---|
| Agent create with a reachable connection | Closed | 10.1 |
| "Run test call" and the test-progress model | Closed | 10.1 |
| Agent edit `PATCH` and version history | Closed | 10.1 |
| Manual Mode Evaluator create, 4 steps | Closed. "Structured Test Case" was not opened. | 10.2 |
| "Configure Run" with Telephony and the Run start | Closed | 10.3 |
| Result detail page: score, summary, Workflow Coverage, Metrics, Runs | Closed. The "AI summary" text for a Result with failures was not seen. | 10.4 |
| "Reevaluate Metrics" | Closed | 10.4 |
| "Share Report" > "Download PDF" | Closed | 10.4 |
| Run detail: status, feedback, rubric, Metrics, charts, metadata, player, transcript | Closed | 10.5 |
| Metric correction to a Lab | Closed | 10.5 |
| Monitor create, list row, pause, edit dialog, delete | Closed. "Save changes" was not clicked. | 10.6 |
| Calls: upload, table, detail, "Use as Evaluator", export | Closed. "Add to Lab" and "Recompute Metrics" were not clicked. | 10.7 |
| Labs with a review: "Run", "Auto Improve", row delete | Closed | 10.8 |
| Metric optimiser chat and proposal card | Closed. "Apply to metric", "Run regression check", and "Re-optimise" were not clicked. | 10.8 |
| Quick Mode Metric build | Closed | 10.9 |
| Metric review with data, correction, "Rebuild" | Closed | 10.10 |
| Assistant: report, question widget, reopen, parallel tools, reports list | Closed. The final PDF file was not made. | 10.11 |
| Insights enable, card, settings menu, disable | Closed. No failure category was made. | 10.12 |
| Evaluator actions: tags, duplicate, export | Closed. "Move" and "Update Scenarios" were not clicked. | 10.13 |
| "Run from file" | Partly closed. Dry run only. | 10.14 |
| Results, Runs view, Runs Overview, Overview with data | Closed | 10.15 |

#### Still not seen

| Item | Reason |
|---|---|
| "Generate Link" (public share link of a Result) | Not clicked, by choice. It makes a public link. |
| "Run from file" real run ("Run 1 run") | Not clicked, by choice. |
| An Alert that fires | No Alert existed and every Metric passed. |
| "Compare Results" | The button was not in the toolbar of capture 259. A second Result did not exist. |
| Monitor run history and a Monitor Run that fires | The Monitor was deleted before its first trigger time. |
| Text (chat), Session Initiation Protocol (SIP), and WebSocket runs | Out of scope by owner decision (section 9.0). |
| A Result with failures: the real "AI summary", "Failure" tab items, `worst_performing_metrics` | The only Run passed. |
| Connection test states `blocked`, `dialing`, `unverified`, `failed` | The test call passed. |
| Labels of the Calls row menu | The menu did not open in the capture. |
| Backend call of "Dismiss proposal" and "Apply to metric" | Not recorded, or not clicked. |
| The confirm dialog text for the Monitor delete | Read during the crawl: "Are you sure you want to delete? This action cannot be undone. This will permanently delete the selected item." with "Cancel" and "Delete". |
| Report card "Expand" and "Add public links" | Not clicked. |

## 11. Build plan: vertical slices

This section splits the product into vertical slices. One slice is one product capability, end to end: its records, its operations, its background work, and its screens. One builder owns one slice. Several builders can work on the slices of one wave at the same time.

This plan names no technology. The owner chooses the technology later.

### 11.1 Why the slices do not follow the sidebar tabs one to one

Most tabs map to one slice. Three facts change the split:

1. Some tabs are views over the same data. "Results", "Runs Overview", and "Overview" all read Results, Runs, and metric evaluations.
2. Some capabilities serve many tabs. The metric scorer scores Runs, Calls, Labs rows, and Rubric verdicts. The conversation viewer (transcript, audio player, metrics panel) is the same on the Run detail, the Call detail, and the Labs rows.
3. "Assistant" uses every other capability as a tool. So it comes last.

### 11.2 Shared contracts

Slice 0 defines these contracts before any other slice starts. Other slices use them and do not change them. A slice that needs a change asks the owner of Slice 0.

| ID | Contract | Content | Spec reference |
|---|---|---|---|
| C1 | Tenancy and access | Organization, Project, User, Member, API key. Every operation belongs to one project. | 0.5, 1.6, 7 |
| C2 | Operation conventions | List page shape `{count, next, previous, results}`, error shapes (`non_field_errors`, a map of field errors, `{"detail", "code"}`), and the meaning of each status code. Field selection with `ql` is optional. | 8.2 |
| C3 | Background jobs | One pattern for all long work: the start operation returns a `progress_id`, and the client asks for progress until the status is `completed` or `failed`. AI generation, export, test calls, re-evaluation, and the optimiser use it. | 8.3, 10 |
| C4 | Conversation record | One shape for a Run and a Call: transcript items (`role`, `content`, `start_time`, `end_time`), a two-track recording (one track for each side), `ended_reason`, timestamps, `provider_call_data`, `metadata`, `dynamic_variables`. | 6, 10.5, 10.7 |
| C5 | Metric evaluation record | `metric_id`, `score`, `explanation`, `status`, evaluation time, and a link to a Run or a Call. Labs, Alerts, Insights, and Dashboards read this record. | 3, 10.4, 10.5 |
| C6 | Metric scoring | One capability: score one metric against one conversation record, and return one metric evaluation record. Slice 3 owns it. Slices 5, 6, and 8 use it. | 3, 10.9 |
| C7 | Evaluation events | A notice "evaluation created" after each score. Slices 9 and 10 react to it. | (inferred) |
| C8 | AI model access | One way to call an AI model for judge prompts, AI generation, and Assistant. | 3, 4, 5 |
| C9 | Common screen parts | The shell, the sidebar (14 links plus "Settings"), a table with pagination, a dialog, the delete confirm dialog ("Are you sure you want to delete? ..."), toasts, the floating task panel, and the conversation viewer. | 1, 10.5 |
| C10 | Choice lists | One source for every choice list (the `/enums/` content). | 8.5 |
| C11 | Call placement | One operation that places a call from the simulated caller to the agent under test, and returns the conversation record when the call ends. The owner builds the scaling behind it. | 10.1, 10.3 |

### 11.3 Slices

| Slice | Name | Screens and capabilities | Spec sections | Depends on |
|---|---|---|---|---|
| 0 | Foundation | Shell, sidebar, project switcher, "Settings" frame, project General settings, contracts C1 to C11 | 0, 1, 7 (General only), 8.1 to 8.3, 8.5 | none |
| 1 | Agents | Agents list, create wizard, Agent settings, knowledge files and connectors, mock tools, dynamic variables, webhook, version history, "Test connections" | 2, 10.1 | 0. The real test call needs C11. Use a stand-in until it exists. |
| 2 | Personalities | Personality list, create, edit, fork, voice picker | 5 (Personalities) | 0 |
| 3 | Metrics and Rubric | Metrics list, Predefined Metrics, Create Metric (Quick Mode and Detail Mode), metric edit, Rubric, metric scoring (judge prompt and custom code), triggers, metric dependencies | 3, 10.9 | 0 |
| 4 | Evaluators | Folders, Evaluator list, create (AI, Manual, and Transcript modes), edit, Test Profiles, tags, duplicate, move, export, the JSON test suite spec, AI generation with clarifying questions | 5 (Evaluators, Test Profiles), 10.2, 10.13 | 0, 1, 2, 3 (the metric list only) |
| 5 | Runs and Results | "Configure Run", run start through C11, Results list, Runs view, Result detail, Run detail, reviews, feedback, re-evaluation, "Run from file", report PDF | 5 (Configure Run), 6 (Results), 10.3 to 10.5, 10.14 | 1, 2, 3, 4, C11 |
| 6 | Calls | Calls list, "Add Call" upload, Call detail, "Use as Evaluator", export, "Recompute Metrics" | 6 (Calls), 10.7 | 1, 3, 4 (for "Use as Evaluator") |
| 7 | Monitors | Monitors list, create, schedule, pause, edit, delete, "Monitor this daily" | 6 (Monitors), 10.6 | 5 |
| 8 | Labs | Labs list, Labs editor, test sets from Runs and Calls, "Run", "Auto Improve", metric optimiser, sample-label review | 3 (Labs, review), 10.8, 10.10 | 3, 5, 6 |
| 9 | Alerts and Insights | Alerts page, alert rules, Insights page, failure-mode groups | 6 (Alerts, Insights), 10.12 | 3, 5, 6, C7 |
| 10 | Dashboards | "Overview" dashboards, plots, "Runs Overview" | 6 (Runs Overview, Overview), 10.15 | 5, 6 |
| 11 | Assistant | Chat page, streamed replies, tools that use the other capabilities, skills, question widget, reports, optimiser chat | 4, 10.11 | All slices that it uses as tools |
| 12 | Settings | API keys, members, project integrations and notifications, webhook settings, provider keys | 7 (without Billing) | 0 |

Excluded from every slice: "Docs", "Support", "Onboarding", "Buy Credits" with the plan and credits card, and the items in 9.0 "Out of scope by owner decision".

### 11.4 Waves

Build the slices in this order. The slices in one wave can run at the same time.

| Wave | Slices | Builders at the same time | Exit check |
|---|---|---|---|
| 0 | 0 | 1 | The shell shows all 14 links. Sign-in works. A demo background job runs through C3. Contracts C1 to C11 are fixed. |
| 1 | 1, 2, 3, 4, 12 | 5 | Create an Agent, a Personality, a Metric, a Folder, an Evaluator, and a Test Profile on the screens. Each request and response matches its spec section. |
| 2 | 5, 6, 7 | 3 | One real Run calls a test number and shows the Result and Run detail screens with scores. One uploaded Call shows its detail screen. One Monitor runs on its schedule. |
| 3 | 8, 9, 10 | 3 | A correction from a Run reaches Labs. A failed metric fires an Alert. A dashboard plot shows the Run data. |
| 4 | 11 | 1 | The chat lists Agents, builds a report with the report JSON block, and asks a question with the question widget. |

### 11.5 Rules for builders who work at the same time

1. Each builder works in a separate copy of the work and changes only its own slice.
2. A builder changes only the records, operations, background work, screens, and tests of its slice. It reads shared parts and does not change them.
3. Slice 0 defines the shared records: Organization, Project, Agent, Personality, Folder, Evaluator, Test Profile, Metric, Result, Run, Call, and metric evaluation. A slice adds only the records that it alone uses.
4. Slice 0 reserves a place for every slice in the navigation and in the operation list. A slice fills its own place only.
5. Before a wave starts, each dependency of each slice exists, or a stand-in exists with the final contract.
6. Each slice takes its acceptance checks from its spec sections. The captured request and response examples are the test data.
7. At the end of each wave, one builder joins the work of all slices and runs all exit checks.
8. No slice builds an excluded part. Read 9.0 before you start.

### 11.6 Brief for one slice builder

Give each slice builder this text, with the values filled in:

```text
You build slice <number>: <name>.
Read SPEC.md sections <list from 11.3>, and sections 0, 8.2, 8.3, 9.0, and 11.
Your screens: <routes from 1.7>.
Use the shared contracts C1 to C11. Do not change them.
Do not build: Docs, Support, Onboarding, Buy Credits, or any item in 9.0.
Done means: the exit check of your wave passes, and the tests of your slice pass.
```
