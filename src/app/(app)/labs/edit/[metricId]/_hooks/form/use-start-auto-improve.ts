'use client';

import { useFormContext } from 'react-hook-form';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';
import { toLabDraft } from '../../_utils/lab-form-values';
import { useLabMetricId } from '../lab/use-lab-metric-id';
import { useStartOptimizationMutation } from '../mutations/use-start-optimization-mutation';

export const useStartAutoImprove = () => {
  const metricId = useLabMetricId();
  const { getValues } = useFormContext<LabMetricFormInput>();
  const startOptimization = useStartOptimizationMutation();

  return () =>
    startOptimization.mutate({ metricId, draft: toLabDraft(getValues()) });
};
