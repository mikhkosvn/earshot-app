'use client';

import { Controller, FormProvider } from 'react-hook-form';

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { useCreateApiKeyMutation } from '../../_hooks/mutations/use-create-api-key-mutation';
import { useCreateApiKeyForm } from '../../_hooks/use-create-api-key-form';
import { ApiKeyLevelField } from './api-key-level-field';
import { CreateApiKeySubmitButton } from './create-api-key-submit-button';

interface CreateApiKeyFormProps {
  createApiKey: ReturnType<typeof useCreateApiKeyMutation>;
}

const NAME_FIELD_ID = 'create-api-key-name';

export function CreateApiKeyForm({ createApiKey }: CreateApiKeyFormProps) {
  const { form, onSubmit } = useCreateApiKeyForm(createApiKey);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Enter a name for your new API key.
          </DialogDescription>
        </DialogHeader>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor={NAME_FIELD_ID}>API Key Name</FieldLabel>
              <Input
                {...field}
                id={NAME_FIELD_ID}
                placeholder="API Key Name"
                autoComplete="off"
                autoFocus
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} className="text-xs" />
            </Field>
          )}
        />
        <ApiKeyLevelField />
        <DialogFooter>
          <CreateApiKeySubmitButton isPending={createApiKey.isPending} />
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
