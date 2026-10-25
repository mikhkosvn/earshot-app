'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useAsEvaluatorForm } from '../../_hooks/forms/use-as-evaluator-form';
import { EvaluatorConsentField } from './evaluator-consent-field';
import { EvaluatorFolderField } from './evaluator-folder-field';
import { UseAsEvaluatorSubmitButton } from './use-as-evaluator-submit-button';

interface UseAsEvaluatorFormProps {
  callLogIds: number[];
  onStarted: () => void;
}

export function UseAsEvaluatorForm({
  callLogIds,
  onStarted,
}: UseAsEvaluatorFormProps) {
  const { form, onSubmit } = useAsEvaluatorForm(callLogIds, onStarted);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <EvaluatorConsentField />
        <EvaluatorFolderField />
        <div className="flex justify-end gap-2">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <UseAsEvaluatorSubmitButton />
        </div>
      </form>
    </FormProvider>
  );
}
