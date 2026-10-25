'use client';

import { useWatch } from 'react-hook-form';

import type { PlotFormValues } from '../../_schemas/plot-form-schema';
import { plotKindOf } from '../../_utils/plot-form-transitions';
import { usePlotMetricsQuery } from '../queries/use-plot-metrics-query';

export const usePlotFieldKind = () => {
  const { data: metrics } = usePlotMetricsQuery();
  const [field, metricId, metadataFieldType] = useWatch<
    PlotFormValues,
    ['field', 'metricId', 'metadataFieldType']
  >({ name: ['field', 'metricId', 'metadataFieldType'] });
  return plotKindOf({ field, metricId, metadataFieldType }, metrics);
};
