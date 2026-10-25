'use client';

import { useWatch } from 'react-hook-form';

import type { MetricDefinitionValues } from '@/server/metrics/types';

export const useMetricFormType = () =>
  useWatch<MetricDefinitionValues, 'type'>({ name: 'type' });
