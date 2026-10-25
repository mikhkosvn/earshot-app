'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import {
  useAsEvaluatorFormSchema,
  type UseAsEvaluatorFormValues,
} from '../../_schemas/use-as-evaluator-form-schema';
import { useCreateEvaluatorsMutation } from '../mutations/call-actions/use-create-evaluators-mutation';

export const useAsEvaluatorForm = (
  callLogIds: number[],
  onStarted: () => void,
) => {
  const projectId = useCurrentProjectId();
  const form = useForm<UseAsEvaluatorFormValues>({
    resolver: zodResolver(useAsEvaluatorFormSchema),
    defaultValues: { projectId, callLogIds, folderPath: '', consent: false },
  });
  const createEvaluators = useCreateEvaluatorsMutation();

  const onSubmit = form.handleSubmit((values) =>
    createEvaluators.mutate(
      { ...values, consent: true },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset();
          onStarted();
        },
      },
    ),
  );

  return { form, onSubmit };
};
