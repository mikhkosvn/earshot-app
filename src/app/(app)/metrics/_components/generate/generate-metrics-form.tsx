'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useGenerateMetricsForm } from '../../_hooks/forms/use-generate-metrics-form';
import { GenerateAgentField } from './generate-agent-field';
import { GenerateSubmitButton } from './generate-submit-button';

interface GenerateMetricsFormProps {
  onStarted: () => void;
}

export function GenerateMetricsForm({ onStarted }: GenerateMetricsFormProps) {
  const { form, onSubmit } = useGenerateMetricsForm(onStarted);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <GenerateAgentField />
        <div className="flex justify-end gap-2">
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <GenerateSubmitButton />
        </div>
      </form>
    </FormProvider>
  );
}
