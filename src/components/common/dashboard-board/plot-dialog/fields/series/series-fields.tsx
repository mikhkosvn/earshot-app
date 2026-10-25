'use client';

import { useWatch } from 'react-hook-form';

import type { DashboardSource } from '@/generated/prisma/enums';
import { TIME_SERIES_DISPLAY_TYPES } from '@/server/dashboards/constants/plot/plot-display-type';

import type { PlotFormValues } from '../../../_schemas/plot-form-schema';
import { AggregationSelect } from './aggregation-select';
import { GroupByMetadataField } from './group-by-metadata-field';
import { GroupBySelect } from './group-by-select';
import { TimePeriodSelect } from './time-period-select';

interface SeriesFieldsProps {
  source: DashboardSource;
}

export function SeriesFields({ source }: SeriesFieldsProps) {
  const displayType = useWatch<PlotFormValues, 'displayType'>({
    name: 'displayType',
  });

  if (!TIME_SERIES_DISPLAY_TYPES.includes(displayType)) return null;

  return (
    <>
      <GroupBySelect source={source} />
      <GroupByMetadataField />
      <TimePeriodSelect />
      <AggregationSelect />
    </>
  );
}
