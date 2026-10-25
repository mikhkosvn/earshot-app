'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useEnableInsightsForm } from '../../_hooks/forms/use-enable-insights-form';
import { EnableInsightsSubmitButton } from './enable-insights-submit-button';
import { FailureLimitField } from './failure-limit/failure-limit-field';
import { InsightMetricField } from './insight-metric-field';
import { PassConditionField } from './pass-condition/pass-condition-field';

interface EnableInsightsFormProps {
  initialMetricId: number | null;
  onSaved: () => void;
}

export function EnableInsightsForm({
  initialMetricId,
  onSaved,
}: EnableInsightsFormProps) {
  const { form, onSubmit } = useEnableInsightsForm(initialMetricId, onSaved);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <InsightMetricField />
        <PassConditionField />
        <FailureLimitField />
        <div className="flex justify-end gap-2">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <EnableInsightsSubmitButton />
        </div>
      </form>
    </FormProvider>
  );
}
