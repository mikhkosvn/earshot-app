'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { KnowledgeConnectorFormValues } from '@/server/agents/types';

import { RequiredMark } from '../../../../_components/basics/required-mark';

export function WebsiteScraperFields() {
  const { control } = useFormContext<KnowledgeConnectorFormValues>();

  return (
    <Controller
      name="url"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor="connector-url" className="gap-0">
            Website URL <RequiredMark required />
          </FieldLabel>
          <Input
            {...field}
            id="connector-url"
            type="url"
            placeholder="https://example.com/help"
            aria-invalid={fieldState.invalid}
          />
          <FieldDescription>
            The page to read. The connector is saved, and the first sync is
            pending.
          </FieldDescription>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
