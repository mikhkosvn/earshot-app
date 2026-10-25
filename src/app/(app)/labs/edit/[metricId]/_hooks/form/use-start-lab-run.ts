'use client';

import { useFormContext } from 'react-hook-form';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';
import { toLabDraft } from '../../_utils/lab-form-values';
import { useLabMetricId } from '../lab/use-lab-metric-id';
import { useStartLabRunMutation } from '../mutations/use-start-lab-run-mutation';

export const useStartLabRun = () => {
  const metricId = useLabMetricId();
  const { getValues } = useFormContext<LabMetricFormInput>();
  const startRun = useStartLabRunMutation();

  return () =>
    startRun.mutate({ metricId, draft: toLabDraft(getValues()) });
};
