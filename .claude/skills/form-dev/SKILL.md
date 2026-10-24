---
name: form-dev
description: Rules for forms and for every mutation in this app - the form hook, useMutation, the Server Action, the executor, and server validation. Use when you create or change a form, a dialog with inputs, or any create, update, or delete action, also one with no form, such as a delete button.
---

# Form Development Pattern

This skill describes the project's standard pattern for developing forms. It ensures a clean separation of concerns between UI and business logic.

## Key Principles

1.  **Separation of Concerns**: The React component should be responsible only for User Interface (UI) elements and layout. All business logic, state management, and form handling must reside in custom hooks. Each hook has one job (see "Hooks" in `AGENTS.md`).
2.  **Data Fetching/Mutation**: Use `useMutation` from TanStack Query (TSQ) for form submissions and data updates.
3.  **Server Actions**: Perform database operations using Server Actions, passed as the `mutationFn` to `useMutation`.
4.  **Validation**: Use one Zod schema on the client (through `zodResolver` from `react-hook-form`) and on the server (in the executor).
5.  **User Interface (UI) Components**: Use shadcn/ui components for all form elements. shadcn/ui is a set of source files in the project, built on Radix UI and Tailwind CSS.

## Files of one form

The example is a create form for an item on the page `src/app/items/`.

| File | Content |
|---|---|
| `src/server/items/schemas/index.ts` | The input schemas of the Server Actions |
| `src/app/items/_hooks/mutations/use-create-item-mutation.ts` | The mutation |
| `src/app/items/_hooks/use-is-creating-item.ts` | Tells if the create runs |
| `src/app/items/_hooks/use-create-item-form.ts` | The form state and the submit handler |
| `src/app/items/_components/create-item-form.tsx` | The form fields |
| `src/app/items/_components/create-item-submit-button.tsx` | The submit button |
| `src/app/items/_components/create-item-submit-label.tsx` | The label of the submit button |

`ItemService` in `src/app/items/_service/index.ts` is the service class of the section (see `tanstack-streaming`). It holds the query options and the keys that this skill uses: `getListQuery()`, `getItemQuery()`, `createItemMutationKey`, and `updateItemMutationKey`.

## Implementation Guide

### 1. Create the Mutation Hook

`src/app/items/_hooks/mutations/use-create-item-mutation.ts`

The mutation hook calls the Server Action. It does not know the form.

```typescript
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ItemService } from '@/app/items/_service';
import { createItemAction } from '@/server/items/actions';
import type { CreateItemInput } from '@/server/items/types';

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ItemService.createItemMutationKey,
    mutationFn: (input: CreateItemInput) => createItemAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The item is saved.');
      return queryClient.invalidateQueries({
        queryKey: ItemService.getListQuery().queryKey,
      });
    },
  });
};
```

`src/app/items/_hooks/use-is-creating-item.ts`

Each component that needs the mutation state reads it with this hook. The parent does not send it down as a prop.

```typescript
'use client';

import { useIsMutating } from '@tanstack/react-query';
import { ItemService } from '@/app/items/_service';

export const useIsCreatingItem = () =>
  useIsMutating({ mutationKey: ItemService.createItemMutationKey }) > 0;
```

**Refresh rules:**

- Take the query keys and the mutation keys from the service class (see `tanstack-streaming`). Do not type a key by hand. If the two keys are different, the data does not refresh, and no error shows.
- Return the promise of `invalidateQueries` from `onSuccess`. TanStack Query then keeps the mutation pending until the refresh ends. Thus the button stays disabled until the new data shows.

### 2. Create the Form Hook

`src/app/items/_hooks/use-create-item-form.ts`

The form hook holds the form state and the submit handler. It calls the mutation hook.

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createItemSchema } from '@/server/items/schemas';
import type { CreateItemInput } from '@/server/items/types';
import { useCreateItemMutation } from './mutations/use-create-item-mutation';

export const useCreateItemForm = () => {
  const form = useForm<CreateItemInput>({
    resolver: zodResolver(createItemSchema),
    defaultValues: { name: '' },
  });
  const createItem = useCreateItemMutation();

  const onSubmit = form.handleSubmit((values) =>
    createItem.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        form.reset();
      },
    }),
  );

  return { form, onSubmit };
};
```

**Schema rules:**

- Do not write a second schema for the same fields. Start from the schema in `src/server/<entity>/schemas/`.
- If the form shows the same fields as the server schema, import the server schema directly.
- If the form differs, put a form schema in `_schemas/` of the page. Build it from the server schema with `.omit()`, `.pick()`, or `.extend()`. Example: an ID that the hook reads from the URL.
- Write the messages for the user in the server schema. The client and the server show the same messages.

**Error handling rules:**

- The Server Action returns `ActionResult<T>`. The `mutationFn` returns it without a change. Do not unwrap it.
- Every `onSuccess` starts with `if (!result.ok) return;`. This applies to the `onSuccess` of the mutation hook and to the `onSuccess` of each `mutate()` call.
- A validation error before the submit shows inline, under its field, with `FormMessage`.
- Do not show an error after the submit in the form. The `MutationCache` shows it in a toast (see "Mutation errors" in `AGENTS.md`). An `ActionError` shows its message. A thrown `Error` shows "Something went wrong. Try again."
- Do not write `onError`. Do not read `mutation.error`.

### 3. Create the UI Components

`src/app/items/_components/create-item-form.tsx`

```tsx
'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateItemForm } from '../_hooks/use-create-item-form';
import { CreateItemSubmitButton } from './create-item-submit-button';

export function CreateItemForm() {
  const { form, onSubmit } = useCreateItemForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Enter name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CreateItemSubmitButton />
      </form>
    </Form>
  );
}
```

`src/app/items/_components/create-item-submit-button.tsx`

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { useIsCreatingItem } from '../_hooks/use-is-creating-item';
import { CreateItemSubmitLabel } from './create-item-submit-label';

export function CreateItemSubmitButton() {
  const isCreating = useIsCreatingItem();

  return (
    <Button type="submit" disabled={isCreating}>
      <CreateItemSubmitLabel />
    </Button>
  );
}
```

`src/app/items/_components/create-item-submit-label.tsx`

```tsx
'use client';

import { useIsCreatingItem } from '../_hooks/use-is-creating-item';

export function CreateItemSubmitLabel() {
  const isCreating = useIsCreatingItem();

  if (isCreating) return 'Saving...';
  return 'Save';
}
```

### 4. Edit Form

An edit form shows the current values of a record. The page is `src/app/items/[itemId]/`. The form hook reads the record from its query and reads the ID from the URL. The component does not get the record or the ID as a prop (see `tanstack-streaming`).

`src/app/items/[itemId]/_schemas/edit-item-form-schema.ts`

The form does not show the ID, so the form schema removes it from the server schema.

```typescript
import { updateItemSchema } from '@/server/items/schemas';

export const editItemFormSchema = updateItemSchema.omit({ itemId: true });
```

`src/app/items/[itemId]/_hooks/mutations/use-update-item-mutation.ts`

```typescript
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ItemService } from '@/app/items/_service';
import { updateItemAction } from '@/server/items/actions';
import type { UpdateItemInput } from '@/server/items/types';

export const useUpdateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ItemService.updateItemMutationKey,
    mutationFn: (input: UpdateItemInput) => updateItemAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The item is saved.');
      return queryClient.invalidateQueries({
        queryKey: ItemService.getItemQuery({ itemId: input.itemId }).queryKey,
      });
    },
  });
};
```

`src/app/items/[itemId]/_hooks/use-edit-item-form.ts`

```typescript
'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { z } from 'zod';
import { ItemService } from '@/app/items/_service';
import { editItemFormSchema } from '../_schemas/edit-item-form-schema';
import { useUpdateItemMutation } from './mutations/use-update-item-mutation';

type EditItemFormValues = z.infer<typeof editItemFormSchema>;

export const useEditItemForm = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { data: item } = useSuspenseQuery(ItemService.getItemQuery({ itemId }));
  const form = useForm<EditItemFormValues>({
    resolver: zodResolver(editItemFormSchema),
    defaultValues: { name: item.name },
  });
  const updateItem = useUpdateItemMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateItem.mutate(
      { itemId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
```

**Edit form rules:**

- Call `form.reset(values)` after a save. The saved values become the new default values. `form.reset()` with no argument empties the fields of an edit form.
- Put the form inside a `<Suspense>` boundary. `useSuspenseQuery` suspends until the record is available.

### 5. Server-Side Execution & Validation

Mutation functions (Server Actions) must be organized within a `server/[module]/actions` folder. These actions act as entry points that call the business logic, often referred to as the "executor". Validation using Zod must occur again within the executor to ensure data integrity.

#### Example: Item Update Flow

**1. Define the Schema**
`src/server/items/schemas/index.ts`

The client form imports this file too. Do not import `server-only` in a schema file.

```typescript
import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'The name is required.'),
});

export const updateItemSchema = z.object({
  itemId: z.string().uuid(),
  name: z.string().min(1, 'The name is required.'),
  summary: z.string().optional(),
});
```

**2. Define the Types**
`src/server/items/types/index.ts`

```typescript
import type { z } from 'zod';
import type { createItemSchema, updateItemSchema } from '@/server/items/schemas';

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type { Item } from '@/generated/prisma/client';
```

**3. Create the Server Action**
`src/server/items/actions/index.ts`

A mutation action returns `ActionResult<T>` from `@/lib/action-result`. It wraps the executor call in `runAction()`.

```typescript
'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { updateItem } from '@/server/items/update-item';
import type { Item, UpdateItemInput } from '@/server/items/types';

export async function updateItemAction(
  args: UpdateItemInput,
): Promise<ActionResult<Item>> {
  return runAction(() => updateItem(args));
}
```

**4. Implement the Executor (Business Logic)**
`src/server/items/update-item.ts`

The executor is wrapped with `withValidation` to perform the Zod validation again on the server. A `ZodError` becomes `{ ok: false, error, status: 422 }` in `runAction()`.

```typescript
import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { updateItemSchema } from '@/server/items/schemas';

export const updateItem = withValidation(
  updateItemSchema,
  async ({ itemId, name, summary }) => {
    const user = await requireUser();
    await prisma.item.findUniqueOrThrow({
      where: { id: itemId, project: { members: { some: { userId: user.id } } } },
    });

    return prisma.item.update({
      where: { id: itemId },
      data: {
        name,
        ...(summary !== undefined && { summary }),
      },
    });
  },
);
```

`requireUser()`, `@/server/auth`, and the relation `project.members` are placeholders. The project has no login code yet. Use the real names when the login code exists.

**Access rules for the executor:**

- A Server Action is a public POST endpoint. Any person who knows its ID can call it with any arguments.
- Every executor gets the current user first. Then it reads the record only if the user can access it.
- Read the record with `findUniqueOrThrow` and the access filter. If the user cannot access the record, Prisma throws `P2025`, and `runAction()` returns 404. Thus the response does not show if the record exists.

**Error rules for the executor:**

- Throw `ActionError` only for an error that the user can correct, or for an expected business result. `runAction()` returns it as `{ ok: false, error, status }`, and the toast shows the message.
- Throw `Error` for every other error, for example a missing server variable or a server bug. Do not catch an unexpected error to rename it as `ActionError`. `runAction()` throws it again, and the toast shows "Something went wrong. Try again."
- In production, Next.js removes the message of a thrown `Error`. The browser gets only a `digest`. Never put text for the user in a thrown `Error`.

### 6. Shared helpers

If these files do not exist, create them with this code. If they exist, use them. Do not write a second version.

`src/lib/action-result.ts`

```typescript
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

export const isActionResult = (value: unknown): value is ActionResult<unknown> =>
  typeof value === 'object' && value !== null && 'ok' in value;
```

`src/server/common/run-action.ts`

`runAction()` throws every other error again. This includes the errors of `redirect()` and `notFound()`, which Next.js must receive.

```typescript
import 'server-only';

import { ZodError, type z } from 'zod';
import { Prisma } from '@/generated/prisma/client';
import type { ActionResult } from '@/lib/action-result';

export class ActionError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function runAction<T>(
  fn: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (error) {
    if (error instanceof ActionError) {
      return { ok: false, error: error.message, status: error.status };
    }
    if (error instanceof ZodError) {
      return { ok: false, error: 'The data is not valid.', status: 422 };
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return { ok: false, error: 'The record does not exist.', status: 404 };
    }
    throw error;
  }
}

export const withValidation =
  <S extends z.ZodType, R>(schema: S, fn: (args: z.output<S>) => Promise<R>) =>
  (args: z.input<S>) =>
    fn(schema.parse(args));
```

`src/lib/query-client/browser-query-client.ts`

The browser query client uses this cache (see `getQueryClient` in `tanstack-streaming`). It shows the error toast of every mutation.

```typescript
import { MutationCache } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isActionResult } from '@/lib/action-result';

export const makeBrowserMutationCache = () =>
  new MutationCache({
    onSuccess: (data) => {
      if (!isActionResult(data) || data.ok) return;
      toast.error(data.error);
    },
    onError: () => {
      toast.error('Something went wrong. Try again.');
    },
  });
```

## Best Practices

- Always use shadcn/ui components if possible.
- Always use `useMutation` for side effects (POST/PUT/DELETE).
- Import `toast` from `sonner`. Put the shadcn/ui `Toaster` one time in the root layout.
- Disable the submit button while the mutation runs. Read the state with a hook such as `useIsCreatingItem`.
- Put the hooks in `_hooks/` of the page. Put the mutation hooks in `_hooks/mutations/`.
- Use `queryClient.invalidateQueries` with the query key from the service class to refresh data after a successful mutation. Return its promise from `onSuccess`.
