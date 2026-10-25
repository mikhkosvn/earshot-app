'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { saveInsightConfigSchema } from '@/server/insights/schemas';
import type { SaveInsightConfigInput } from '@/server/insights/types';

import { insightFormValuesOf } from '../../_utils/insight-form-values';
import { useSaveInsightConfigMutation } from '../mutations/use-save-insight-config-mutation';
import { useInsightMetricOptionsQuery } from '../queries/use-insight-metric-options-query';

export const useEnableInsightsForm = (
  initialMetricId: number | null,
  onSaved: () => void,
) => {
  const projectId = useCurrentProjectId();
  const { data: metrics } = useInsightMetricOptionsQuery();
  const initialMetric =
    metrics.find((metric) => metric.id === initialMetricId) ?? null;
  const form = useForm<SaveInsightConfigInput>({
    resolver: zodResolver(saveInsightConfigSchema),
    defaultValues: insightFormValuesOf(projectId, initialMetric),
  });
  const saveConfig = useSaveInsightConfigMutation();

  const onSubmit = form.handleSubmit((values) =>
    saveConfig.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onSaved();
      },
    }),
  );

  return { form, onSubmit };
};
