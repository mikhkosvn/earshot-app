'use client';

import { useFormState } from 'react-hook-form';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';
import { useIsOptimizing } from '../lab/use-is-optimizing';
import { useLab } from '../lab/use-lab';

export const useAutoImproveDisabled = () => {
  const { rows } = useLab();
  const isOptimizing = useIsOptimizing();
  const { disabled } = useFormState<LabMetricFormInput>();
  return disabled || isOptimizing || rows.length === 0;
};
