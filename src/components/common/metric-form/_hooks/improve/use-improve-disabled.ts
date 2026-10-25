'use client';

import { useFormState } from 'react-hook-form';

import type { MetricDefinitionValues } from '@/server/metrics/types';

export const useImproveDisabled = () => {
  const { isSubmitSuccessful, isDirty, disabled } =
    useFormState<MetricDefinitionValues>();
  return disabled || (isSubmitSuccessful && !isDirty);
};
