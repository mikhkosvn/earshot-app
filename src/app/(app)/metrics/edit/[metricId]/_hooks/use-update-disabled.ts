'use client';

import { useFormState } from 'react-hook-form';

import type { EditMetricFormInput } from '../_schemas/edit-metric-form-schema';
import { useIsUpdatingMetric } from './use-is-updating-metric';

export const useUpdateDisabled = () => {
  const { isDirty, disabled } = useFormState<EditMetricFormInput>();
  const isUpdating = useIsUpdatingMetric();
  return disabled || !isDirty || isUpdating;
};
