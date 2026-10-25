'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useModifyEvaluatorsMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluator-actions/use-modify-evaluators-mutation';
import { modifyEvaluatorsFieldsSchema } from '@/server/evaluators/schemas/evaluator-bulk';
import type { ModifyEvaluatorsFieldsValues } from '@/server/evaluators/types';

const DEFAULT_VALUES: ModifyEvaluatorsFieldsValues = {
  agentId: null,
  testProfileId: null,
  personalityId: null,
  firstMessage: '',
  sendEmptyFirstMessage: false,
  maxDurationSeconds: null,
  phoneNumberId: null,
  addMetricIds: [],
  removeMetricIds: [],
  appendInstructions: '',
  addTools: [],
  removeTools: [],
};

export const useModifyScenariosForm = (
  evaluatorIds: number[],
  onDone: () => void,
) => {
  const projectId = useCurrentProjectId();
  const form = useForm<ModifyEvaluatorsFieldsValues>({
    resolver: zodResolver(modifyEvaluatorsFieldsSchema),
    defaultValues: DEFAULT_VALUES,
  });
  const modifyEvaluators = useModifyEvaluatorsMutation();

  const onSubmit = form.handleSubmit((values) =>
    modifyEvaluators.mutate(
      { projectId, evaluatorIds, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onDone();
        },
      },
    ),
  );

  return { form, onSubmit, isPending: modifyEvaluators.isPending };
};
