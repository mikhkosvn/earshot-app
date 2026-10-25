'use client';

import { useFormState } from 'react-hook-form';

import type { CreateMetricFormInput } from '../_schemas/create-metric-form-schema';
import { useIsCreatingMetric } from './use-is-creating-metric';

export const useCreateSubmitDisabled = () => {
  const { isValid, isDirty } = useFormState<CreateMetricFormInput>();
  const isCreating = useIsCreatingMetric();
  return !isValid || !isDirty || isCreating;
};
