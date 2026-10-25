import type { DashboardSource } from '@/generated/prisma/enums';
import { BASE_PLOT_CONFIG } from '@/server/dashboards/constants/dashboard-defaults';
import { PlotAggregation } from '@/server/dashboards/constants/plot/plot-aggregation';
import { SOURCE_TIME_PERIOD } from '@/server/dashboards/constants/predefined-plots';
import type { PlotConfig } from '@/server/dashboards/types';

import type { PlotFormValues } from '../_schemas/plot-form-schema';

export const emptyPlotForm = (source: DashboardSource): PlotFormValues => ({
  ...BASE_PLOT_CONFIG,
  field: null,
  aggregation: PlotAggregation.avg,
  timePeriod: SOURCE_TIME_PERIOD[source],
});

export const toPlotFormValues = (config: PlotConfig): PlotFormValues => ({
  ...config,
});

export const toPlotConfigValues = (
  values: PlotFormValues,
): PlotConfig | null => {
  if (values.field === null) return null;
  return { ...values, field: values.field };
};
