'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { useModifyScenariosForm } from '../../../_hooks/evaluator-actions/use-modify-scenarios-form';
import { ModifyAgentFields } from './modify-agent-fields';
import { ModifyInstructionFields } from './modify-instruction-fields';
import { ModifyMessageFields } from './modify-message-fields';
import { ModifyMetricFields } from './modify-metric-fields';

type ModifyScenariosFormProps = {
  evaluatorIds: number[];
  onDone: () => void;
};

export function ModifyScenariosForm({
  evaluatorIds,
  onDone,
}: ModifyScenariosFormProps) {
  const { form, onSubmit, isPending } = useModifyScenariosForm(
    evaluatorIds,
    onDone,
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <ModifyAgentFields />
        <ModifyMessageFields />
        <ModifyMetricFields />
        <ModifyInstructionFields />
        <Button type="submit" className="w-full" disabled={isPending}>
          Update Scenarios
        </Button>
      </form>
    </FormProvider>
  );
}
