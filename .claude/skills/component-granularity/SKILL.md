---
name: component-granularity
description: Rules for the size and the grouping of React components. Use when you create a component, split or merge components, choose the folder for a component file, or review a component that is too big or too small. Use it together with vercel-composition-patterns.
---

# Component granularity

A component has one job. You can name that job in one short phrase, with no "and".

This skill tells you when to split a component, and when to stop. The skill
`vercel-composition-patterns` tells you how to split: compound components, no boolean
props, state in a provider.

## 1. Size levels

Every component file has one level. Write the level in your plan when you create the file.

| Level | Definition | Data access | Folder |
|---|---|---|---|
| Base component | Styled and reusable. No business logic. Example: `Button`, `Dialog`. | None. Props and children only. | `src/components/ui/` (shadcn) |
| Route block | Base components put together for one use case on one route. Example: a call table with its filters. | Through a hook. | `src/app/<route>/_components/` |
| Section block | A route block that 2 or more pages of one section use. Example: the item form of `items/new/` and `items/[itemId]/`. | Through a hook. | `src/app/<section>/_components/` |
| Shared block | A route block that pages of 2 or more sections use. Example: `app-sidebar`. | Through a hook. | `src/components/common/` |
| Page | One route. Loads data on the server and puts blocks in a layout. | On the server, as in `tanstack-streaming`. | `src/app/<route>/page.tsx` |
| Hook | Logic only. Renders nothing. | Queries and mutations. | `_hooks/` of the page. Mutation hooks go in `_hooks/mutations/` (see `AGENTS.md`). |

Rules:

- A base component never imports from `src/server/`, from `src/app/`, or from a feature hook.
- A page contains layout markup and blocks. It does not contain form fields, table rows, or list items.
- A new block starts in `_components/` of its page. If a second page of the same section needs it, move it to `_components/` of the section folder. If a page of another section needs it, move it to `src/components/common/`.

## 2. Group a component family in one folder

Some parts only make sense together, like the shadcn `Card`, `CardHeader`, and `CardContent`.
Put such a family in one folder. Each part has its own file (see "Components" in `AGENTS.md`).

- Make one folder for each family. The folder name is the name of the root part. Example: `call-table/` holds `call-table.tsx`, `call-table-toolbar.tsx`, `call-table-body.tsx`, and `call-table-empty.tsx`.
- If the parts share state, the root part holds the state in React context. The child parts read the context. They do not get that state as props.
- If the parts share no state, do not add a context.
- Each part accepts `className` and the props of its native element.
- The consumer selects the parts and their order.
- Put only the parts of the family in the family folder.

```tsx
<CallTable calls={calls}>
  <CallTableToolbar>
    <CallTableSearch />
    <CallTableStatusFilter />
  </CallTableToolbar>
  <CallTableBody />
  <CallTableEmpty>No calls yet.</CallTableEmpty>
</CallTable>
```

## 3. Split a component when one of these is true

1. You need "and" to name its job.
2. One component function has more than 150 lines, or the file has more than 300 lines. These limits are a project choice, not a standard.
3. A boolean prop switches between two layouts or two behaviors. Make two named components (rule `architecture-avoid-boolean-props` in `vercel-composition-patterns`).
4. The component has a `renderHeader` or another `renderX` prop. Use children (rule `patterns-children-over-render-props` in `vercel-composition-patterns`).
5. The component loads data or sends a mutation in the same function as its markup. Move the logic to a hook, as in `form-dev`.
6. The component passes 3 or more props to a child without a use of its own. Use a family with context, or pass children.
7. One part of the markup changes often, and the rest does not. Move the part that changes into its own component, so the rest does not render again.

## 4. Do not split when one of these is true

1. Inside a block, a piece of markup has one caller and fewer than about 30 lines. Keep it inline. Exception: the piece has its own state, or it has a name in the product (example: `CallStatusBadge`).
2. The new component only passes its props to one other component, with no logic of its own.
3. You make a shared component "for reuse later". Wait for the third similar copy. Two similar copies stay as two copies. This rule applies to similar code. It does not apply to one block that a second route needs without change (see section 1).
4. The two halves need 3 or more values of shared state passed between them. This shows that the two halves are one component.
5. A consumer must nest more than 3 levels of family parts for a normal case. Merge parts, or give the root part a default layout.

Do not define a second component in a file, not even a private helper (see "Components" in `AGENTS.md`).
Never define a component inside another component (rule `rerender-no-inline-components` in `vercel-react-best-practices`).

## 5. Checklist before you finish

- [ ] Each new file has one level from section 1, and the file is in the folder of that level.
- [ ] Each file holds one component.
- [ ] You can name the job of each component in one phrase with no "and".
- [ ] No boolean prop switches layout or behavior.
- [ ] No component is defined inside another component.
- [ ] No new file holds a piece of markup that section 4 tells you to keep inline.
- [ ] No shared component comes from fewer than 3 similar copies.
- [ ] Data logic and mutation logic are in hooks, not in markup components.
