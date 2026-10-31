# Project

- Stack: Next.js 16.4.3 (App Router, `cacheComponents`, React Compiler), React 19.3, Tailwind CSS 4, TypeScript.
- Package manager: Bun 1.3.9. Use `bun` and `bunx`. Do not use `npm`, `pnpm`, or `yarn` in this project.
- Commands: `bun dev` starts the app. `bun run build` builds it. `bun run lint` runs ESLint.
- Import alias: `@/` is `src/`.

# External links

**IMPORTANT:** Do not mention or link an external community, course, or training site in the code or the user interface. Examples: a community site, a classroom page, a tour video, or a setup video.

# Comments

**IMPORTANT:** Do not write comments. The code is the source of truth. A comment that describes code, explains code, or marks a task is not allowed. This rule applies to every file type, including `.ts`, `.tsx`, `.css`, and `.prisma`.

- When you edit a file, delete each comment that you find in it.
- Keep only a comment that has a function, for example `eslint-disable`, `@ts-expect-error`, a triple-slash directive, `/* turbopackIgnore: true */`, or a `@type` annotation in a configuration file.
- If code is hard to read, rename the identifier or extract a function. Do not add a comment.

# Ternary operators

**IMPORTANT:** Do not write a ternary operator (`a ? b : c`). Use a separate component or a function with early returns.

- If the JavaScript XML (JSX) markup shows different output in different states, move that output into a separate component.
- The component returns the output of each state with `if (...) return ...;`.
- If one condition selects an icon and a label, make one component for the icon. Make a second component for the label.
- If a value depends on a condition, compute the value in a function with early returns.
- Put each new component in its own file. The rules in "Components" apply.
- Example: `RetrySaveIcon` in `_components/retry-save-icon.tsx` and `RetrySaveLabel` in `_components/retry-save-label.tsx`.

# Early return

**IMPORTANT:** If a component renders nothing in some state, return `null` at the top: `if (!value) return null;`. Do not wrap the whole output in `{value ? (...) : null}` or `{value && (...)}`. Do not keep an empty wrapper element, for example `<div className="empty:hidden">`.

Exception: a dialog or a sheet keeps its root mounted, so the close animation can run. Put the condition inside the root.

# Enums

**IMPORTANT:** Do not write a string literal for a value from a closed set. Examples: a kind, a mode, a status, a provider, a MIME type, an error code, a query key. Use an enum object.

- A database enum comes from Prisma: `import { ItemStatus } from '@/generated/prisma/enums'`. Write `ItemStatus.active`. This file is safe for the browser.
- For a set that is not in the database, write an `as const` object and a type with the same name, as Prisma does. Example: `CreateMode` in `src/server/<entity>/constants/`.
- If the server uses the enum, put it in `src/server/<entity>/constants/`. If only one page uses it, put it in `src/app/<page>/_constants/`.
- Build lists and schemas from the enum: `Object.values(CreateMode)`, `z.enum(ItemStatus)`.
- The rule does not apply to text for the user, CSS classes, import paths, or form field names that TypeScript checks.

# Components

**IMPORTANT:** Put one component in each file. Do not define a second component in the same file, not even a small one that is not exported.

- The file name is the component name in kebab case: `ItemDetailPanel` goes in `item-detail-panel.tsx`.
- `page.tsx`, `layout.tsx`, and `error.tsx` hold only their default export. Move each helper component to `_components/`.
- A type or a constant that two components use goes in the file of the component that owns it, or in `_constants/`.
- Exception: the shadcn files in `src/components/ui/`. The shadcn command line tool (CLI) generates them with many parts in one file. Do not split them.

**IMPORTANT:** Make each component self-contained. If a component holds several parts that each have a clear meaning, move each part into its own component. Do not put a large mass of elements together in one component.

- A part has a clear meaning if you can give it a name. Examples: `ItemList`, `ItemStatusField`, `CreateItemSubmitButton`.
- A component reads the data it needs with its own hooks: `useWatch`, `useSuspenseQuery`, or a custom hook. Do not read a value in the parent only to send it down as a prop.
- A parent keeps local state that more than one child uses, and sends it down as a prop. If each child calls the hook itself, each child gets a separate copy of the state.
- If a part shows only in some states, the part's component starts with `if (...) return null;`. The parent does not wrap the part in a condition.
- If the same markup repeats with different data, make one component and give it the data as props. Example: `ItemTextField`.

# Hooks

**IMPORTANT:** Each custom hook has one responsibility. A hook can import and call other hooks. Use hook composition to build a larger behavior from small hooks.

- Give each hook one job. Example: `useIsCreatingItem` tells if an item create runs. `useCreateItemSubmitDisabled` tells if the submit button is disabled.
- Do not write a hook that collects many hooks and returns one large object for a full component. The component that needs a value calls the small hook for that value.
- A hook can call other hooks. Example: `useCreateItemSubmitDisabled` calls `useWatch` and `useIsCreatingItem`.
- A function that calls no React hook is not a hook. Do not give it the `use` prefix. Put it in `_utils/`. Example: `changeItemKind(form, kind)` in `_utils/item-transitions.ts`.

# UI primitives

**IMPORTANT:** Agents MUST use the shadcn component when an HTML primitive has a shadcn equivalent. Do not write the raw HTML element.

| Raw HTML element                                                 | shadcn component in `src/components/ui/`                                    |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `<button>`                                                       | `Button`                                                                    |
| `<input>` (text, search, number, file, and the other text types) | `Input`                                                                     |
| `<textarea>`                                                     | `Textarea`                                                                  |
| `<select>` and `<option>`                                        | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, and `SelectItem` |
| `<input type="radio">`                                           | `RadioGroup` and `RadioGroupItem`                                           |
| `<input type="checkbox">`                                        | `Checkbox`                                                                  |
| A switch (on and off)                                            | `Switch`                                                                    |
| A tooltip from the `title` attribute                             | `Tooltip`, `TooltipTrigger`, and `TooltipContent`                           |

- If the component is not in `src/components/ui/`, add it: `bunx shadcn@latest add <name>`.
- Use only the shadcn `Tooltip` for a tooltip. Do not write the HTML `title` attribute on an element or on a shadcn component.
  - A component prop with the name `title` is correct, for example `<PageHeader title="Settings" />`. The rule is about the HTML attribute only.
  - Put the element that shows the tooltip in the `render` prop of `TooltipTrigger`. Put its content in the children of `TooltipTrigger`.
  - Put one `TooltipProvider` in `src/app/layout.tsx`. Do not add a second provider.
- Cards and layout containers do not need shadcn components. Plain HTML is correct for them.
- A design can need styles that no shadcn variant gives, for example a copy of an element from a reference design. Keep the shadcn component, and put the styles in `className`. `cn()` merges `className` over the defaults.
  - `Button`: use `variant="unstyled" size="unstyled"`. They add no colors and no size. If `src/components/ui/button.tsx` does not have these two variants, add them.
  - A default with a variant, for example `md:text-sm` or `dark:bg-input/30`, stays until a class with the same variant replaces it. Write `md:text-[13px]` or `dark:bg-muted`, not only `text-[13px]` or `bg-muted`.

# Server data

**IMPORTANT:** Server data lives only in the TanStack Query cache. Do not copy server data into a React context, a store, props that go down several levels, or `useState`. The full flow is in the [tanstack-streaming](.claude/skills/tanstack-streaming/SKILL.md) skill.

# Server Actions

**IMPORTANT:** The app reads and writes its own data only through Server Actions. Do not add a Route Handler (`src/app/api/`) for data that a page of this app uses.

- A Route Handler is correct only when a Server Action cannot do the job. Examples: a URL for `<img src>`, a webhook, or a caller outside this app.
- A Server Action takes one plain object. Do not use `FormData`. A `File` goes in the object as a property: `{ payload, photo: File | null }`. Validate it with `z.instanceof(File)`.
- A read action returns `Promise<T>`. It does not use `runAction()`, and it does not return `ActionResult`. Every error of a read action throws. The user cannot correct a read error, so the error goes to the error boundary.
- A mutation action returns `ActionResult<T>` from `src/lib/action-result.ts`. Wrap the call in `runAction()` from `src/server/common/run-action.ts`.
- In a mutation, read a record that must exist with `findUniqueOrThrow`. `runAction()` changes the Prisma error `P2025` (record not found) into a 404 result. Use `findUnique` only when `null` is a correct result.
- The full pattern of a mutation, with the code of `runAction()` and `ActionError`, is in the [form-dev](.claude/skills/form-dev/SKILL.md) skill.

## Server errors

- `runAction()` changes only three errors into `{ ok: false, error, status }`: `ActionError`, `ZodError`, and the Prisma error `P2025`. It throws every other error again.
- Throw `ActionError` with a message and a status only for an error that the user can correct. An expected business result is also an `ActionError`. Examples: the API key is not valid, or the provider is not known.
- For every other error, throw `Error`. Examples: a server variable is missing, a server bug, or a 500 or 503 status. The user cannot correct these errors.
- An `Error` of a read goes to the nearest error boundary: a `QueryErrorBoundary` or the `error.tsx` file of the route.
- Warning: in production, Next.js removes the message of a thrown `Error`. The browser gets only a `digest`. Do not put text for the user in a thrown `Error`. Put text for the user only in an `ActionError`.

## Mutation errors

**IMPORTANT:** Show each error of a mutation in one place only.

- A validation error before the submit goes inline, next to its field. Examples: a required field is empty, or a file is too large.
- An error after the submit goes to the toast. This includes every `ActionError` and every thrown `Error`.
- Do not show an error after the submit inline, in a banner, or in an alert. The toast already shows it.
- An `ActionError` of a mutation shows its message in an error toast. The `MutationCache` in `src/lib/query-client/browser-query-client.ts` does this. Each mutation gets it automatically.
- A thrown `Error` of a mutation shows a general error toast: "Something went wrong. Try again." The page stays. The same `MutationCache` does this.
- Do not write `onError` to show an error. Do not read `mutation.error` for a message.

# Folder structure

**IMPORTANT:** The frontend has one folder for each page. The backend has one folder for each database entity.

| Folder                   | Content                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `src/app/`               | The pages. See "Frontend" below.                                                                     |
| `src/components/ui/`     | The shadcn components                                                                                |
| `src/components/common/` | Components that pages of two or more sections use                                                    |
| `src/server/<entity>/`   | The backend of one database entity. See "Backend" below.                                             |
| `src/server/common/`     | Server code that has no entity, for example `run-action.ts`                                          |
| `src/lib/`               | Code with no page and no entity: `action-result.ts`, `prisma.ts`, `query-client/`, `url-generator/`  |
| `src/generated/prisma/`  | The Prisma client and enums that `prisma generate` writes. Do not edit.                              |

Frontend, in `src/app/<page>/`:

| Folder or file      | Content                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `page.tsx`          | The page component only                                           |
| `_components/`      | The components of this page. One component in each file.          |
| `_hooks/`           | The hooks of this page. Mutation hooks go in `_hooks/mutations/`. |
| `_service/index.ts` | The query options, the query keys, and the mutation keys          |
| `_schemas/`         | The Zod schemas of the forms                                      |
| `_utils/`           | Helper functions of this page, for example cache updates          |
| `_constants/`       | Constants of this page                                            |

Where a component goes:

- One page uses it: `_components/` of that page.
- Two or more pages of one section use it: `_components/` of the section folder. Example: the item form of `items/new/` and `items/[itemId]/` goes in `src/app/items/_components/`.
- Pages of two or more sections use it: `src/components/common/`.
- The shadcn components stay in `src/components/ui/`.

Example tree for one section:

```text
src/app/items/
  page.tsx              /items
  _components/          the list page, and the parts that the section shares
  _service/index.ts
  new/
    page.tsx            /items/new
    _components/
  [itemId]/
    page.tsx            /items/<id>
    _components/
    _hooks/
      mutations/
```

Backend, in `src/server/<entity>/`. Example: `src/server/items/`.

| Folder or file                        | Content                                                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<verb>-<noun>.ts` in the module root | One execution function in each file, for example `get-item.ts` or `delete-item.ts`. Wrap the function in `withValidation(schema, fn)` when it takes input. When the module has 10 or more execution functions, put them in feature folders, for example `src/server/items/comments/add-comment.ts`. |
| `actions/index.ts`                    | The `'use server'` entry points. Each action calls one execution function. A mutation action calls it inside `runAction()`. Put no business logic here.             |
| `schemas/`                            | The Zod schemas of the inputs                                                                                                                                       |
| `types/`                              | The TypeScript types of the module                                                                                                                                  |
| `constants/`                          | The constants of the module                                                                                                                                         |
| `utils/`                              | Helpers that more than one execution function uses                                                                                                                  |

- An execution function and a file in `utils/` start with `import 'server-only';`.
- A file in `types/` or `constants/` has no server code, so a client component can import it.
- Shared server code that has no entity goes in `src/server/common/`.

## Feature folders

**IMPORTANT:** A folder must not hold 10 or more files. When a folder holds 10 or more files, group them into subfolders by feature.

- This rule applies to every folder in `src/`, on the frontend and on the backend.
- Group the files that work together. Example: a parent component and the components that only it renders.
- Do not group by file type. Do not use a generic name, for example `misc`, `other`, `common`, `shared`, or `helpers`.
- Give each subfolder a short noun in kebab case. Example: `item-list`, `item-detail`, `filters`.
- A subfolder holds 2 or more files. A file that fits no group, or that many groups use, stays in the folder root.
- The entry file of a folder stays in the root. Example: `item-list.tsx` stays in `_components/item-list/`.
- If a subfolder gets 10 or more files, split it again. Do not go deeper than 2 new levels.
- When you add a file to a feature, put it in the folder of that feature.
- Use the same subfolder name for one feature in each folder. Example: `_hooks/item-list/` and `_hooks/mutations/item-list/`.
- Exception: the shadcn files in `src/components/ui/`.

# Global state

**IMPORTANT:** Do not add global client state without the approval of the user. Global state is a React context, a Zustand store, or a module-level variable that more than one component reads.

- Before you add global state, ask the user with the `AskUserQuestion` tool. Name the state, the components that read it, and the local alternative.
- Server data is never global state. It stays in TanStack Query.
- Local state stays in the component that owns it, or in the nearest common parent.
- Do not use a React context for app state.
- If the user approves global state, use Zustand. If Zustand is not installed, add it: `bun add zustand`. A correct example is the open or closed state of a dialog that distant components control.

# useEffect report

**IMPORTANT:** At the end of each answer that changes code, write `useEffect used: <number>`.

# Skills

Claude Code shows the description of each skill at the start of a session. This map adds only what the descriptions do not say.

| When you                                       | Load                                                                                                                         | Also                                                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Write or change a React component              | [react-best-practices](.claude/skills/react-best-practices/SKILL.md), [component-granularity](.claude/skills/component-granularity/SKILL.md) | Use `component-granularity` with [composition-patterns](.claude/skills/composition-patterns/SKILL.md) |
| Write a form, or any create, update, or delete | [form-dev](.claude/skills/form-dev/SKILL.md)                                                                                 |                                                                                                  |
| Read server data on a page                     | [tanstack-streaming](.claude/skills/tanstack-streaming/SKILL.md)                                                             |                                                                                                  |
| Write a link, a redirect, or a navigation      | [url-generator](.claude/skills/url-generator/SKILL.md)                                                                       |                                                                                                  |
| Change the Prisma schema or run a migration    | [prisma-cli](.claude/skills/prisma-cli/SKILL.md)                                                                             |                                                                                                  |
| Write a Prisma query                           | [prisma-client-api](.claude/skills/prisma-client-api/SKILL.md)                                                               |                                                                                                  |
| Finish a change in the app                     | [next-dev-loop](.claude/skills/next-dev-loop/SKILL.md)                                                                       |                                                                                                  |

If a skill conflicts with this file, this file wins.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
