---
name: url-generator
description: >
  Typed URL generation for every route in this app: pages, tabs, and Route Handlers.
  Use when you create a link, a redirect, a router navigation, or a fetch to a Route Handler.
  Use when you add a route.
user-invocable: false
---

# URL Generator

Every app URL comes from the `UrlGenerator` class. Do not write a path as a string in
`<Link href>`, `redirect()`, `router.push()`, `router.replace()`, or `fetch()`. Call a
`UrlGenerator` method.

Each path is in one place. If a route changes, you change one method.

## UrlGenerator — `src/lib/url-generator/url-generator.ts`

The class has static methods only. A page method returns the path as the `Route` type from
Next.js. Give the result directly to `href`, `redirect()`, or `router.push()`.

The methods below are examples of each method shape. Read `url-generator.ts` for the
methods of this app.

```typescript
import { UrlGenerator } from '@/lib/url-generator/url-generator';

// ── Pages ────────────────────────────────────────────────────────────────
UrlGenerator.rootUrl();                              // /  (redirects to /dashboard)
UrlGenerator.dashboard();                            // /dashboard
UrlGenerator.settings();                             // /settings  (redirects to the first tab)
UrlGenerator.settingsTab({ tab: 'profile' });        // /settings/profile
UrlGenerator.project({ projectId: id });             // /projects/<id>  (redirects to the first step)
UrlGenerator.projectStep({ projectId: id, step: ProjectStepSegment.details }); // /projects/<id>/details
UrlGenerator.items();                                // /items
UrlGenerator.items({ values: { item: id } });        // /items?item=<id>  (opens that item)
UrlGenerator.items({ values: { item: ItemSelection.new } }); // /items?item=new  (empty item form)
```

## Redirects

**IMPORTANT:** Put every fixed redirect in the `redirects()` function of `next.config.ts`. Do not add a page whose only job is to call `redirect()`.

- A fixed redirect has a source path and a destination path that do not change at request time. Example: `/` goes to `/dashboard`.
- Next.js applies a redirect from `next.config.ts` before it reads the pages. Thus the source path needs no `page.tsx`.
- Build each path with `UrlGenerator`. Import it in `next.config.ts` with a relative path: `./src/lib/url-generator/url-generator`.
- Use `permanent: false`. The status is then 307, and the browser does not cache the redirect.
- Call `redirect()` from `next/navigation` only when the destination depends on data that the server reads at request time. Example: a Server Action goes to the record that it created.

## Route type

The `as Route` cast does not check the path. If `typedRoutes` is off in `next.config.ts`,
`Route` is the type `string & {}`. Compare each new path with its folder in `src/app/`.

## When you do not call UrlGenerator

These values stay as they are:

- An `href` from a config object. A `UrlGenerator` call made it before. Example: the
  `items` array of the sidebar navigation.
- A URL that the server returns. Example: an Open Authorization (OAuth) redirect URL.
- A path that the code computes at runtime from the current path. Example:
  `router.replace(window.location.pathname)` to remove the query parameters.
- A route in a Next.js type parameter. Example: `LayoutProps<'/settings'>`. It is a
  type, not a link.

## Add a route

1. Create the page folder in `src/app/`.
2. Add a static method to `UrlGenerator`.
3. Use the method at every call site.

A route with no dynamic segment:

```typescript
static myPage() {
  return '/my-page' as Route;
}
```

A route with a dynamic segment. Put the parameter type in `types.ts`. Give the method one
object parameter.

```typescript
// types.ts
export type ReportType = {
  reportId: string;
};

// url-generator.ts
static report({ reportId }: ReportType) {
  return `/reports/${reportId}` as Route;
}
```

The object parameter keeps the call site the same when the route gets query parameters.

A dynamic segment with a fixed set of values, for example a tab: put a union type in
`types.ts`, for example `SettingsTabSegment`. In the tabs component, for example
`src/app/settings/settings-tabs.tsx`, make the `tabs` array `as const`. Thus `tab.segment`
has the union type, and TypeScript rejects a wrong segment.

A step of a multi-step flow is a path segment, not a query parameter. Put the step segments
in one constant object, for example `ProjectStepSegment`. Keep one map from each step of the
flow to its segment. Write one helper function that returns the step URL. Call the helper
at every call site. Do not build the step path by hand.

## Routes with query parameters (nuqs)

Do these steps when the first route of the app gets query parameters. If
`src/lib/url-generator/typed-links.ts` exists, start at step 4.

1. Install the library: `bun add nuqs`.

2. Create `src/lib/url-generator/typed-links.ts`:

```typescript
import type { Route } from 'next';
import {
  createSerializer,
  type CreateSerializerOptions,
  type inferParserType,
  type Nullable,
  type ParserMap,
} from 'nuqs/server';

export function createTypedLink<Parsers extends ParserMap>(
  route: Route,
  parsers: Parsers,
  options: CreateSerializerOptions<Parsers> = {},
) {
  const serialize = createSerializer<Parsers, Route, Route>(parsers, options);
  return (values: Partial<Nullable<inferParserType<Parsers>>> = {}) =>
    serialize(route, values);
}
```

3. Add `TypedLinkProps` to `src/lib/url-generator/types.ts`:

```typescript
import type {
  CreateSerializerOptions,
  inferParserType,
  Nullable,
  ParserMap,
} from 'nuqs/server';

export type TypedLinkProps<Parsers extends ParserMap> = {
  options?: CreateSerializerOptions<Parsers>;
  values?: Partial<Nullable<inferParserType<Parsers>>>;
};
```

4. Create `src/lib/url-generator/parsers.ts`. Add one parser map for each route:

```typescript
import { parseAsInteger } from 'nuqs/server';

export const reportParser = {
  page: parseAsInteger,
};
```

5. Add the parser map to the route type. Change the method to call `createTypedLink`:

```typescript
// types.ts
export type ReportType = {
  reportId: string;
} & TypedLinkProps<typeof reportParser>;

// url-generator.ts
static report({ reportId, options, values }: ReportType) {
  const route = `/reports/${reportId}` as Route;
  return createTypedLink(route, reportParser, options)(values);
}
```

6. Call the method:

```typescript
UrlGenerator.report({ reportId: 'abc' });
// → /reports/abc
UrlGenerator.report({ reportId: 'abc', values: { page: 2 } });
// → /reports/abc?page=2
```

Rules for the parser maps:

- Import the parsers from `nuqs/server`, not from `nuqs`. The `nuqs` entry point is a client
  module, and its parsers do not work in a Server Component. With `nuqs/server`, one parser
  map works on the server and in the browser. You do not need a second server copy.
- Put a query parameter name in the parser map only. The method that writes the parameter
  and the page that reads it use the same map. Thus the two cannot use different names.
- To read the parameters in a Server Component, give the same parser map to `createLoader`
  from `nuqs/server`.
- To read the parameters in a Client Component with `useQueryState`, add `NuqsAdapter` from
  `nuqs/adapters/next/app` to the client providers file, for example `src/app/providers.tsx`.
  `createTypedLink` alone does not need the adapter.

## Key files

| File                                       | Purpose                                            |
| ------------------------------------------ | -------------------------------------------------- |
| `src/lib/url-generator/url-generator.ts`   | `UrlGenerator` class. Add each new route here.     |
| `src/lib/url-generator/types.ts`           | Parameter types for the methods                    |
| `src/lib/url-generator/parsers.ts`         | nuqs parser maps of the query parameters           |
| `src/lib/url-generator/typed-links.ts`     | `createTypedLink` for routes with query parameters |
