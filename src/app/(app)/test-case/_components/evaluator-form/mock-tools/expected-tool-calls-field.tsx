'use client';

import { Suspense } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { Skeleton } from '@/components/ui/skeleton';

import { ExpectedToolCallsEditor } from './expected-tool-calls-editor';

export function ExpectedToolCallsField() {
  const { control } = useFormContext<EvaluatorFormValues>();
  const agentId = useWatch({ control, name: 'agentId' });

  if (agentId === null) return null;

  return (
    <Suspense fallback={<Skeleton className="h-16 w-full" />}>
      <ExpectedToolCallsEditor agentId={agentId} />
    </Suspense>
  );
}
