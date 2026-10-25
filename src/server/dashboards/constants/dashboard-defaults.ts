import { DashboardSource, WidgetField } from '@/generated/prisma/enums';
import type {
  DashboardFilterState,
  PlotConfig,
} from '@/server/dashboards/types';

import { PlotColor } from './plot/plot-color';
import { PlotDisplayType } from './plot/plot-display-type';
import { PlotOutcome } from './plot/plot-outcome';
import { WidgetGroupBy } from './plot/widget-group-by';

export const DEFAULT_DASHBOARD_NAME: Record<DashboardSource, string> = {
  [DashboardSource.call_logs]: 'Overview',
  [DashboardSource.runs]: 'Runs Overview',
};

export const DEFAULT_DASHBOARD_FILTERS: DashboardFilterState = {
  from: 'now-7d',
  to: 'now',
  agentId: null,
  metadata: [],
};

export const MAX_DASHBOARD_PLOTS = 40;

export const BASE_PLOT_CONFIG: PlotConfig = {
  name: '',
  displayType: PlotDisplayType.line,
  field: WidgetField.duration,
  metricId: null,
  metadataKey: null,
  metadataFieldType: null,
  aggregation: null,
  timePeriod: null,
  groupBy: WidgetGroupBy.none,
  groupByMetadataKey: null,
  color: PlotColor.blue,
  showPercentages: false,
  outcome: PlotOutcome.all,
};

export const STAT_PLOT_CONFIG: PlotConfig = {
  ...BASE_PLOT_CONFIG,
  name: 'Overview Stats',
  displayType: PlotDisplayType.stat,
  field: WidgetField.stat,
};
