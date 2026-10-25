'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { ConversationMetricItem } from '@/server/conversations/types';

import { useCorrectMetricForm } from '../../_hooks/use-correct-metric-form';
import type { ConversationQueryArgs } from '../../_service';
import { CorrectMetricNotesField } from './correct-metric-notes-field';
import { CorrectMetricSubmitButton } from './correct-metric-submit-button';
import { CorrectMetricValueField } from './correct-metric-value-field';

type CorrectMetricFormProps = {
  metric: ConversationMetricItem;
  query: ConversationQueryArgs;
  onDone: () => void;
};

export function CorrectMetricForm({
  metric,
  query,
  onDone,
}: CorrectMetricFormProps) {
  const { form, onSubmit } = useCorrectMetricForm({ metric, query, onDone });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <CorrectMetricNotesField />
        <div className="flex items-end justify-between gap-3">
          <CorrectMetricValueField metric={metric} />
          <div className="flex shrink-0 items-center gap-2">
            <Button type="button" variant="outline" onClick={onDone}>
              Cancel
            </Button>
            <CorrectMetricSubmitButton />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
