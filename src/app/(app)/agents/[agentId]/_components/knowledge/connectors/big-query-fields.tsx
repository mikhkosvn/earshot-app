'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { KnowledgeConnectorFormValues } from '@/server/agents/types';

import { RequiredMark } from '../../../../_components/basics/required-mark';

export function BigQueryFields() {
  const { control } = useFormContext<KnowledgeConnectorFormValues>();

  return (
    <>
      <Controller
        name="serviceAccountJson"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="connector-credentials" className="gap-0">
              Service Account JSON <RequiredMark required />
            </FieldLabel>
            <Textarea
              {...field}
              id="connector-credentials"
              placeholder='{"type": "service_account", "project_id": "...", ...}'
              aria-invalid={fieldState.invalid}
              className="min-h-24 font-mono text-xs"
            />
            <FieldDescription>
              Paste your Google Cloud service account JSON credentials
            </FieldDescription>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Controller
        name="query"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="connector-query" className="gap-0">
              Query <RequiredMark required />
            </FieldLabel>
            <Textarea
              {...field}
              id="connector-query"
              placeholder="SELECT doc_id, title, content, category, updated_at FROM `project.dataset.table`"
              aria-invalid={fieldState.invalid}
              className="min-h-20 font-mono text-xs"
            />
            <FieldDescription>
              SQL query to fetch knowledge base data from BigQuery
            </FieldDescription>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
    </>
  );
}
