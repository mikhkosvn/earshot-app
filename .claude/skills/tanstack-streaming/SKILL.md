---
name: tanstack-streaming
description: Server data reads with TanStack Query and streaming in Next.js App Router - the service class, the query start in a Server Component, dehydration, Suspense, and useSuspenseQuery. Use when a page or a component reads server data, when you add a query to a service class, or when you set up the query client or the providers.
user-invocable: true
---

# TanStack Query Streaming with Next.js App Router

This skill describes how a page reads server data. The server starts each query and does not wait for it. The browser gets the pending query, and a `<Suspense>` boundary shows a fallback until the data arrives.

## The flow

**IMPORTANT:** Server data lives only in the TanStack Query cache. Do not copy server data into a React context, a store, props that go down several levels, or `useState`.

Obey this flow for all server data:

1. The query options live in the `_service/index.ts` file of the page. The `queryFn` calls a read Server Action and returns its data: `queryFn: () => getThingsAction()`. The server and the browser use the same query options. Do not write a second `queryFn` for the server.
2. A data component starts the query. The data component is an async Server Component in `_components/`, and `page.tsx` renders it inside `<Suspense>`. Its first line is `await io()` from `next/cache`. Then it starts the query with `void queryClient.query({ ...someQuery, retry: false }).catch(noop)`. It does not await the query, so the page can stream.
3. The data component wraps its children in `<HydrationBoundary state={dehydrate(queryClient)}>`, a `QueryErrorBoundary`, and a `<Suspense>` boundary.
4. Each client component that needs the data calls `useSuspenseQuery(someQuery)` itself. Use `select` to read only one part of the data. The cache gives the same data to every caller, and no second request goes to the server.
5. The `mutationFn` returns the `ActionResult` of the Server Action without a change: `mutationFn: (input) => saveThingAction(input)`. Each `onSuccess` starts with `if (!result.ok) return;`. Then it reads `result.data`. This rule applies to the `onSuccess` of the hook and to the `onSuccess` of each `mutate()` call.
6. A mutation writes its result into the cache with `queryClient.setQueryData`, or it invalidates the query. Every component that reads the query then shows the new data.
7. The mutation state comes from `useMutation`: `isPending`, `variables`, and `data`. Do not show the error of a mutation in the page. The global error toast shows it. Do not read `mutation.error` for a message. Do not copy this state into `useState`. If a distant component needs the mutation state, give the mutation a `mutationKey` and read it with `useIsMutating` or `useMutationState`.

The mutation steps (5 to 7) are in detail in the `form-dev` skill.

```text
SERVER (page.tsx)
  <Suspense fallback={...}>              the static shell holds only this fallback
    <ItemsData />

SERVER (_components/items-data.tsx)
  await io()                             renders at request time
  getQueryClient()                       one client for each request
  void queryClient.query(...)            starts the query, does not wait
  <HydrationBoundary state={dehydrate(queryClient)}>
    <QueryErrorBoundary>
      <Suspense fallback={...}>

BROWSER (client components inside the Suspense boundary)
  useSuspenseQuery(ItemService.getListQuery())
    data is available    → the component renders
    data is pending      → the Suspense boundary shows the fallback
    query failed         → the QueryErrorBoundary shows the error
```

## Key files

| File | Content |
|---|---|
| `src/lib/query-client/get-query-client.ts` | Gives one query client for each server request, and one query client for the browser |
| `src/lib/query-client/browser-query-client.ts` | The `MutationCache` that shows the error toast of every mutation (code in `form-dev`) |
| `src/app/providers.tsx` | `QueryClientProvider` for the browser |
| `src/components/common/query-error-boundary.tsx` | The error boundary for a failed query |
| `src/app/<page>/_service/index.ts` | The service class: query options, query keys, and mutation keys |

## Do not send server data or route parameters as props

The cache is the source of truth in the browser. Every client component inside `<HydrationBoundary>` can read the same data with `useSuspenseQuery`. TanStack Query sends one request, and each caller gets the same data.

**Rules:**

- If a child needs server data, it calls `useSuspenseQuery` with the query options from the service class. It does not get the data as a prop from the page.
- If a child needs a route parameter (`agentId`, `projectId`, `itemId`), it calls `useParams<{ ... }>()` from `next/navigation`. It does not get the parameter as a prop.
- The data component only starts the queries. It sends no data props and no route parameter props to the client components.
- This applies at every level: dialogs, cards, and sections read their own data with `useSuspenseQuery` and `useParams`.

**Why:**

- A prop with server data skips the cache. The child does not show cache updates, optimistic updates, or invalidations.
- When every caller reads the same `queryKey`, TanStack Query sends one request for all of them.

**Bad.** The page reads the data and sends it down as props:

```tsx
export default async function ItemsPage() {
  const items = await listItemsAction();

  return <ItemList items={items} />;
}
```

**Good.** The page renders the data component inside `<Suspense>`. The data component starts the query. The client component reads the cache:

`src/app/items/page.tsx`

```tsx
import { Suspense } from 'react';
import { ItemListSkeleton } from './_components/item-list-skeleton';
import { ItemsData } from './_components/items-data';

export default function ItemsPage() {
  return (
    <Suspense fallback={<ItemListSkeleton />}>
      <ItemsData />
    </Suspense>
  );
}
```

`src/app/items/_components/items-data.tsx`

```tsx
import { Suspense } from 'react';
import { io } from 'next/cache';
import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { ItemService } from '../_service';
import { ItemList } from './item-list';
import { ItemListSkeleton } from './item-list-skeleton';

export async function ItemsData() {
  await io();

  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ItemService.getListQuery(), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<ItemListSkeleton />}>
          <ItemList />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
```

`src/app/items/_components/item-list.tsx`

```tsx
'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ItemService } from '../_service';
import { ItemRow } from './item-row';

export function ItemList() {
  const { data: items } = useSuspenseQuery(ItemService.getListQuery());

  return (
    <ul>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </ul>
  );
}
```

**Props are correct in these cases:**

- The value is local state that the parent owns: `open`, `onOpenChange`, `selected`, or a callback.
- The value is one item of a list that the parent iterates: `<ItemRow item={item} />` inside `.map()`. The row cannot find its item with a hook.
- The child needs a part of the data that only the parent can compute.

**Pages with a dynamic segment.** Next.js 16 changed how a page reads `params`, and this project uses `cacheComponents`. Read the guide in `node_modules/next/dist/docs/` before you write a page that reads `params`.

## Step 1: The service class

`src/app/items/_service/index.ts`

The service class holds the query options and the keys. The server and the browser use the same query options, so the query keys are always the same.

```typescript
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import {
  getItemAction,
  listItemActivitiesAction,
  listItemsAction,
} from '@/server/items/actions';

export const ItemKey = {
  list: 'item-list',
  detail: 'item-detail',
  activities: 'item-activities',
  create: 'item-create',
  update: 'item-update',
} as const;

export type ItemKey = (typeof ItemKey)[keyof typeof ItemKey];

export class ItemService {
  static readonly createItemMutationKey = [ItemKey.create];
  static readonly updateItemMutationKey = [ItemKey.update];

  static getListQuery() {
    return queryOptions({
      queryKey: [ItemKey.list],
      queryFn: () => listItemsAction(),
    });
  }

  static getItemQuery(args: { itemId: string }) {
    return queryOptions({
      queryKey: [ItemKey.detail, args.itemId],
      queryFn: () => getItemAction(args),
    });
  }

  static getActivitiesInfiniteQuery(args: { itemId: string }) {
    return infiniteQueryOptions({
      queryKey: [ItemKey.activities, args.itemId],
      queryFn: ({ pageParam }) =>
        listItemActivitiesAction({ ...args, cursor: pageParam }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
  }
}
```

**Rules:**

- Build each query key from the key object (`ItemKey`). Do not write a key as a string literal at the call site (see "Enums" in `AGENTS.md`).
- The `queryFn` only calls a read Server Action: `() => listItemsAction()`.
- A read Server Action returns the data (`Promise<T>`), not `ActionResult`. It does not use `runAction()`. Every error throws, and the nearest `QueryErrorBoundary` shows it.

## Step 2: Start the queries in the data component

The page example above shows the pattern. More rules:

- `page.tsx` renders the data component inside `<Suspense>`. The static shell then holds only the fallback, and the data streams in.
- The first line of the data component is `await io()` from `next/cache`. This project uses `cacheComponents`. Without `io()`, `next build` fails with "Next.js encountered the unstable value `Date.now()` while prerendering", because `dehydrate()` reads the current time.
- Use `io()`, not `connection()`. With Cache Components, the Next.js docs prefer `io()`, because it "can also be cached and prefetched".
- Start each query with `void queryClient.query({ ...options, retry: false }).catch(noop)`. Start an infinite query with `void queryClient.infiniteQuery({ ...options, retry: false }).catch(noop)`.
- Do not await the query. The page then sends its HTML at once, and the data streams in.
- `retry: false` stops the server from a second try. `.catch(noop)` stops an unhandled rejection on the server. The browser gets the failed query, and the `QueryErrorBoundary` shows the error.
- Do not use `prefetchQuery` or `fetchQuery`. TanStack Query marks both as deprecated and points to `queryClient.query()`.
- Start all queries of the page before the `return`. They then run at the same time.

## Step 3: Suspense boundaries

- Each `<Suspense>` boundary shows its content when the data of that boundary is available.
- Two `useSuspenseQuery` calls inside one boundary wait for each other. Put sections that can load separately in separate boundaries.
- Give each boundary a fallback with the shape of its content, for example a skeleton.

```tsx
<QueryErrorBoundary>
  <Suspense fallback={<ItemSummarySkeleton />}>
    <ItemSummary />
  </Suspense>
</QueryErrorBoundary>
<QueryErrorBoundary>
  <Suspense fallback={<ItemActivitySkeleton />}>
    <ItemActivityList />
  </Suspense>
</QueryErrorBoundary>
```

## Step 4: Read the data in client components

Read only one part of the data with `select`:

`src/app/items/_components/item-count.tsx`

```tsx
'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ItemService } from '../_service';

export function ItemCount() {
  const { data: count } = useSuspenseQuery({
    ...ItemService.getListQuery(),
    select: (items) => items.length,
  });

  return <span>{count}</span>;
}
```

An infinite query. The "Load more" button is a separate component, and it returns `null` when no next page exists (see "Early return" in `AGENTS.md`).

`src/app/items/[itemId]/_components/item-activity-list.tsx`

```tsx
'use client';

import { useParams } from 'next/navigation';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ItemService } from '@/app/items/_service';
import { ActivityCard } from './activity-card';
import { LoadMoreActivitiesButton } from './load-more-activities-button';

export function ItemActivityList() {
  const { itemId } = useParams<{ itemId: string }>();
  const { data } = useSuspenseInfiniteQuery(
    ItemService.getActivitiesInfiniteQuery({ itemId }),
  );
  const activities = data.pages.flatMap((page) => page.activities);

  return (
    <>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
      <LoadMoreActivitiesButton />
    </>
  );
}
```

`src/app/items/[itemId]/_components/load-more-activities-button.tsx`

```tsx
'use client';

import { useParams } from 'next/navigation';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ItemService } from '@/app/items/_service';

export function LoadMoreActivitiesButton() {
  const { itemId } = useParams<{ itemId: string }>();
  const { hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(ItemService.getActivitiesInfiniteQuery({ itemId }));

  if (!hasNextPage) return null;

  return (
    <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
      Load more
    </Button>
  );
}
```

## Setup

If these files do not exist, create them with this code. If they exist, use them. Do not write a second version.

`src/lib/query-client/get-query-client.ts`

```typescript
import { cache } from 'react';
import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
  type MutationCache,
} from '@tanstack/react-query';
import { makeBrowserMutationCache } from './browser-query-client';

function makeQueryClient(mutationCache?: MutationCache) {
  return new QueryClient({
    mutationCache,
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

const getServerQueryClient = cache(() => makeQueryClient());

let browserQueryClient: QueryClient | undefined;

export default function getQueryClient() {
  if (isServer) return getServerQueryClient();
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient(makeBrowserMutationCache());
  }
  return browserQueryClient;
}
```

**Rules for the query client:**

- `shouldDehydrateQuery` must include the pending queries. If it does not, `dehydrate()` leaves out each query that the server did not await, and the streaming stops without an error.
- On the server, `cache()` from React gives one query client for each request. Two Server Components of one request get the same client.
- In the browser, the query client is one module-level instance. It keeps the cache when a component suspends.
- The browser client gets the `MutationCache` from `browser-query-client.ts`. It shows the error toast of every mutation. Do not set `throwOnError` for mutations. A mutation error must not replace the page with the error boundary (see "Mutation errors" in `AGENTS.md`).

`src/app/providers.tsx`

```tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from '@/lib/query-client/get-query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

Put `<Providers>` around `{children}` in `src/app/layout.tsx`.

`src/components/common/query-error-boundary.tsx`

The boundary resets the failed queries when the user selects "Try again". It uses the `react-error-boundary` package. If the package is not installed, add it: `bun add react-error-boundary`.

```tsx
'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorFallback } from './query-error-fallback';

export function QueryErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={QueryErrorFallback}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
```

`src/components/common/query-error-fallback.tsx`

```tsx
'use client';

import type { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

export function QueryErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>The data did not load.</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
```

## When to start a query on the server

| Case | Pattern |
|---|---|
| Data that the page shows | `void queryClient.query(...)` in the data component |
| A list with "Load more" or infinite scroll | `void queryClient.infiniteQuery(...)` in the data component. The first page streams. The browser loads the next pages. |
| Data that a dialog or another user action needs | Do not start it on the server. The client component calls `useSuspenseQuery` when it mounts, inside a `<Suspense>` boundary. |

## Common mistakes

1. **Different query keys.** The server starts a query with one key, and the browser reads another key. The data does not hydrate. Take both from the service class.
2. **No pending queries in `shouldDehydrateQuery`.** The queries that the server did not await are not sent to the browser. The streaming stops without an error.
3. **`useQuery` in place of `useSuspenseQuery`.** `useQuery` does not suspend. The component renders with `undefined` data.
4. **An awaited query in the Server Component.** The page waits for the data, and nothing streams. Use `void`.
5. **No `<Suspense>` boundary.** `useSuspenseQuery` suspends. With no `<Suspense>` parent, the nearest boundary higher in the tree shows its fallback, or the render fails.
6. **One `<Suspense>` boundary for the whole page.** All data must arrive before anything shows. Use one boundary for each independent section.
7. **No `'use client'`.** A component that calls `useSuspenseQuery` must be a client component.
8. **Server data or route parameters as props.** See "Do not send server data or route parameters as props" above.
9. **No `await io()` in the data component.** With `cacheComponents`, `next build` fails: "Next.js encountered the unstable value `Date.now()` while prerendering". Start the data component with `await io()`.
10. **The query starts in `page.tsx`.** `page.tsx` has no `<Suspense>` above it. The Next.js docs say that data access outside `<Suspense>` "prevents the route from being prerendered, blocking the page load". Start the queries in a data component inside `<Suspense>`.

## Reference

- [TanStack Query Suspense Streaming Example](https://tanstack.com/query/v5/docs/framework/react/examples/nextjs-suspense-streaming)
- [TanStack Query Advanced SSR Guide](https://tanstack.com/query/v5/docs/framework/react/guides/advanced-ssr)
