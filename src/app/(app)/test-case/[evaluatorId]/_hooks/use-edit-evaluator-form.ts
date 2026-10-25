'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useUpdateEvaluatorMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluators/use-update-evaluator-mutation';
import {
  type EvaluatorFormOutput,
  evaluatorFormSchema,
  type EvaluatorFormValues,
} from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import type { EvaluatorDetail } from '@/server/evaluators/types';

import { detailToFormValues } from '../_utils/detail-to-form-values';

export const useEditEvaluatorForm = (detail: EvaluatorDetail) => {
  const form = useForm<EvaluatorFormValues, unknown, EvaluatorFormOutput>({
    resolver: zodResolver(evaluatorFormSchema),
    defaultValues: detailToFormValues(detail),
  });
  const updateEvaluator = useUpdateEvaluatorMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateEvaluator.mutate({ evaluatorId: detail.id, ...values }),
  );

  return { form, onSubmit, isPending: updateEvaluator.isPending };
};
