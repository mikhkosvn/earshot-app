'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { MetricType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

const SET_OPTIONS = { shouldDirty: true, shouldValidate: true };

export const useApplyImprovedText = () => {
  const { getValues, setValue } = useFormContext<MetricDefinitionValues>();

  return (refinedText: string) => {
    if (getValues('type') === MetricType.custom_code) {
      setValue('customCode', refinedText, SET_OPTIONS);
    } else {
      setValue('description', refinedText, SET_OPTIONS);
    }
    toast.success('The improved metric is in the form.');
  };
};
