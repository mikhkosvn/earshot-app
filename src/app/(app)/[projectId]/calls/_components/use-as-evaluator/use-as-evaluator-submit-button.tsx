'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { useIsCreatingEvaluators } from '../../_hooks/mutations/call-actions/use-is-creating-evaluators';
import type { UseAsEvaluatorFormValues } from '../../_schemas/use-as-evaluator-form-schema';

export function UseAsEvaluatorSubmitButton() {
  const { control } = useFormContext<UseAsEvaluatorFormValues>();
  const [consent, folderPath] = useWatch({
    control,
    name: ['consent', 'folderPath'],
  });
  const isCreating = useIsCreatingEvaluators();

  return (
    <Button
      type="submit"
      size="sm"
      disabled={isCreating || !consent || !folderPath}
    >
      Confirm
    </Button>
  );
}
