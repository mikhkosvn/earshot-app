'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluationTrigger, TriggerType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { useGenerateTriggerMutation } from '../mutations/use-generate-trigger-mutation';
import { useMetricBodyText } from '../use-metric-body-text';

const SET_OPTIONS = { shouldDirty: true, shouldValidate: true };

export const useGenerateTrigger = () => {
  const projectId = useCurrentProjectId();
  const description = useMetricBodyText();
  const { setValue } = useFormContext<MetricDefinitionValues>();
  const generateTrigger = useGenerateTriggerMutation();

  return () =>
    generateTrigger.mutate(
      { projectId, description },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          setValue('evaluationTrigger', EvaluationTrigger.custom, SET_OPTIONS);
          setValue('triggerType', TriggerType.llm_judge, SET_OPTIONS);
          setValue('evaluationTriggerPrompt', result.data.prompt, SET_OPTIONS);
          toast.success('The trigger prompt is generated.');
        },
      },
    );
};
