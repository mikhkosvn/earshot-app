'use client';

import { useWatch } from 'react-hook-form';

import type { DashboardSource } from '@/generated/prisma/enums';

import type { PlotFormValues } from '../_schemas/plot-form-schema';
import { ChartColorPicker } from './fields/chart-color-picker';
import { ChartTypePicker } from './fields/chart-type-picker';
import { MetadataFields } from './fields/metadata-fields';
import { MetricSelect } from './fields/metric-select';
import { PlotNameField } from './fields/plot-name-field';
import { SeriesFields } from './fields/series/series-fields';
import { ShowPercentagesField } from './fields/show-percentages-field';
import { PlotFiltersSection } from './plot-filters-section';

interface PlotFormDetailsProps {
  source: DashboardSource;
}

export function PlotFormDetails({ source }: PlotFormDetailsProps) {
  const field = useWatch<PlotFormValues, 'field'>({ name: 'field' });

  if (field === null) return null;

  return (
    <>
      <MetricSelect />
      <MetadataFields />
      <PlotNameField />
      <ChartTypePicker />
      <ChartColorPicker />
      <ShowPercentagesField />
      <SeriesFields source={source} />
      <PlotFiltersSection />
    </>
  );
}
