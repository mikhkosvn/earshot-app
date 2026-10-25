'use client';

import { useWatch } from 'react-hook-form';

import { MetricType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

export const useMetricBodyText = () => {
  const [type, description, customCode] = useWatch<
    MetricDefinitionValues,
    ['type', 'description', 'customCode']
  >({ name: ['type', 'description', 'customCode'] });
  if (type === MetricType.custom_code) return customCode;
  return description;
};
