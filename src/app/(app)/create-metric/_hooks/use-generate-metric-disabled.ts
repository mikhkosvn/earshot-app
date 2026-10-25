'use client';

import { useWatch } from 'react-hook-form';

import type { QuickMetricFormInput } from '../_schemas/quick-metric-form-schema';
import { useIsBuildingQuickMetric } from './use-is-building-quick-metric';

export const useGenerateMetricDisabled = () => {
  const description = useWatch<QuickMetricFormInput, 'description'>({
    name: 'description',
  });
  const isBuilding = useIsBuildingQuickMetric();
  return !description.trim() || isBuilding;
};
