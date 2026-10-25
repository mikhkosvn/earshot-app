'use client';

import { useFormState } from 'react-hook-form';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';
import { useIsSavingLabMetric } from './use-is-saving-lab-metric';

export const useSaveDisabled = () => {
  const { isDirty, disabled } = useFormState<LabMetricFormInput>();
  const isSaving = useIsSavingLabMetric();
  return disabled || !isDirty || isSaving;
};
