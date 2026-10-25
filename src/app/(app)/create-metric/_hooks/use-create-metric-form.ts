'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useAgentOptions } from '@/components/common/metric-form/_hooks/use-agent-options';
import { EvaluationTrigger, TriggerType } from '@/generated/prisma/enums';
import { MetricFormType } from '@/server/metrics/constants/definition/metric-form-type';

import {
  type CreateMetricFormInput,
  createMetricFormSchema,
  type CreateMetricFormValues,
} from '../_schemas/create-metric-form-schema';
import { useCreateMetricMutation } from './mutations/use-create-metric-mutation';

export const useCreateMetricForm = () => {
  const projectId = useCurrentProjectId();
  const agents = useAgentOptions();
  const form = useForm<CreateMetricFormInput, unknown, CreateMetricFormValues>({
    resolver: zodResolver(createMetricFormSchema),
    mode: 'onTouched',
    defaultValues: {
      type: MetricFormType.llm_judge,
      name: '',
      slug: '',
      enumValues: [],
      audioEnabled: false,
      description: '',
      customCode: '',
      configuration: null,
      dependencyIds: [],
      evaluationTrigger: EvaluationTrigger.always,
      triggerType: TriggerType.llm_judge,
      evaluationTriggerPrompt: '',
      evaluationTriggerCustomCode: '',
      addToNewAgents: false,
      agentIds: agents.map((agent) => agent.id),
      scenarioIds: [],
      addToRubric: false,
    },
  });
  const createMetric = useCreateMetricMutation();

  const onSubmit = form.handleSubmit((values) =>
    createMetric.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset(
            { ...values, evalType: undefined },
            { keepIsSubmitSuccessful: true },
          );
        },
      },
    ),
  );

  return { form, onSubmit };
};
