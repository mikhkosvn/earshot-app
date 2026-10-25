import {
  DashboardSource,
  WidgetField,
  WidgetTimePeriod,
} from '@/generated/prisma/enums';
import type { PlotConfig } from '@/server/dashboards/types';

import { BASE_PLOT_CONFIG, STAT_PLOT_CONFIG } from './dashboard-defaults';
import { MetricFunction } from './metric-function';
import { PlotAggregation } from './plot/plot-aggregation';
import { PlotDisplayType } from './plot/plot-display-type';

export const PredefinedPlotIcon = {
  activity: 'activity',
  trendingUp: 'trending_up',
} as const;

export type PredefinedPlotIcon =
  (typeof PredefinedPlotIcon)[keyof typeof PredefinedPlotIcon];

export interface PredefinedPlot {
  description: string;
  icon: PredefinedPlotIcon;
  config: PlotConfig;
  metricFunction: MetricFunction | null;
}

export const SOURCE_TIME_PERIOD: Record<DashboardSource, WidgetTimePeriod> = {
  [DashboardSource.call_logs]: WidgetTimePeriod.hour,
  [DashboardSource.runs]: WidgetTimePeriod.day,
};

export const predefinedPlots = (source: DashboardSource): PredefinedPlot[] => [
  {
    description: 'KPI header with calls, duration, success rate, latency',
    icon: PredefinedPlotIcon.activity,
    config: STAT_PLOT_CONFIG,
    metricFunction: null,
  },
  {
    description: 'Success/failure bar chart',
    icon: PredefinedPlotIcon.activity,
    config: {
      ...BASE_PLOT_CONFIG,
      name: 'Success Rate',
      displayType: PlotDisplayType.bar,
      field: WidgetField.success,
      aggregation: PlotAggregation.count,
      timePeriod: SOURCE_TIME_PERIOD[source],
    },
    metricFunction: null,
  },
  {
    description: 'Track latency trends over time (ms)',
    icon: PredefinedPlotIcon.trendingUp,
    config: {
      ...BASE_PLOT_CONFIG,
      name: 'Latency Over Time (ms)',
      displayType: PlotDisplayType.bar,
      field: WidgetField.metric_value,
      aggregation: PlotAggregation.avg,
      timePeriod: SOURCE_TIME_PERIOD[source],
    },
    metricFunction: MetricFunction.latency,
  },
];
