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
import { PlotOutcome } from './plot/plot-outcome';

export interface DefaultWidgetSpec {
  config: PlotConfig;
  metricFunction: MetricFunction | null;
}

const series = (
  name: string,
  displayType: PlotDisplayType,
  field: WidgetField,
  aggregation: PlotAggregation,
  timePeriod: WidgetTimePeriod,
): PlotConfig => ({
  ...BASE_PLOT_CONFIG,
  name,
  displayType,
  field,
  aggregation,
  timePeriod,
});

const metricSeries = (
  name: string,
  displayType: PlotDisplayType,
  metricFunction: MetricFunction,
  aggregation: PlotAggregation,
  timePeriod: WidgetTimePeriod,
): DefaultWidgetSpec => ({
  config: series(
    name,
    displayType,
    WidgetField.metric_value,
    aggregation,
    timePeriod,
  ),
  metricFunction,
});

const plain = (config: PlotConfig): DefaultWidgetSpec => ({
  config,
  metricFunction: null,
});

const hourly = WidgetTimePeriod.hour;

const daily = WidgetTimePeriod.day;

const CALL_LOG_WIDGETS: DefaultWidgetSpec[] = [
  plain(STAT_PLOT_CONFIG),
  plain(
    series(
      'Success Rate',
      PlotDisplayType.bar,
      WidgetField.success,
      PlotAggregation.count,
      hourly,
    ),
  ),
  metricSeries(
    'Latency Over Time (ms)',
    PlotDisplayType.bar,
    MetricFunction.latency,
    PlotAggregation.avg,
    hourly,
  ),
  plain({
    ...BASE_PLOT_CONFIG,
    name: 'Call Ended Reasons',
    displayType: PlotDisplayType.list,
    field: WidgetField.call_ended_reason,
  }),
  plain(
    series(
      'Total Duration (mins)',
      PlotDisplayType.line,
      WidgetField.duration,
      PlotAggregation.avg,
      hourly,
    ),
  ),
  {
    config: {
      ...BASE_PLOT_CONFIG,
      name: 'Infrastructure Issues',
      displayType: PlotDisplayType.pie,
      field: WidgetField.metric_value,
    },
    metricFunction: MetricFunction.infrastructureIssues,
  },
  metricSeries(
    'Interruption Score',
    PlotDisplayType.line,
    MetricFunction.interruptionScore,
    PlotAggregation.avg,
    hourly,
  ),
];

const RUN_WIDGETS: DefaultWidgetSpec[] = [
  plain(STAT_PLOT_CONFIG),
  plain(
    series(
      'Success rate over time',
      PlotDisplayType.bar,
      WidgetField.success,
      PlotAggregation.count,
      daily,
    ),
  ),
  {
    config: {
      ...BASE_PLOT_CONFIG,
      name: 'Latency over time',
      displayType: PlotDisplayType.scatter,
      field: WidgetField.metric_value,
    },
    metricFunction: MetricFunction.latency,
  },
  metricSeries(
    'Expected Outcome',
    PlotDisplayType.bar,
    MetricFunction.expectedOutcome,
    PlotAggregation.percentage,
    daily,
  ),
  metricSeries(
    'AI interrupting user',
    PlotDisplayType.line,
    MetricFunction.aiInterruptingUser,
    PlotAggregation.avg,
    daily,
  ),
  metricSeries(
    'Average Pitch (in Hz)',
    PlotDisplayType.line,
    MetricFunction.averagePitch,
    PlotAggregation.avg,
    daily,
  ),
  metricSeries(
    'Infrastructure Issues',
    PlotDisplayType.bar,
    MetricFunction.infrastructureIssues,
    PlotAggregation.percentage,
    daily,
  ),
  plain({
    ...BASE_PLOT_CONFIG,
    name: 'Top failed scenarios',
    displayType: PlotDisplayType.list,
    field: WidgetField.scenario_name,
    outcome: PlotOutcome.failure,
  }),
  metricSeries(
    'Interruption Score',
    PlotDisplayType.bar,
    MetricFunction.interruptionScore,
    PlotAggregation.percentage,
    daily,
  ),
  metricSeries(
    'Stop Time after User Interruption (ms)',
    PlotDisplayType.line,
    MetricFunction.stopTimeAfterInterruption,
    PlotAggregation.avg,
    daily,
  ),
  metricSeries(
    'Talk Ratio',
    PlotDisplayType.line,
    MetricFunction.talkRatio,
    PlotAggregation.avg,
    daily,
  ),
  metricSeries(
    'Transcription Accuracy',
    PlotDisplayType.bar,
    MetricFunction.transcriptionAccuracy,
    PlotAggregation.percentage,
    daily,
  ),
  metricSeries(
    'Unnecessary Repetition Score',
    PlotDisplayType.bar,
    MetricFunction.repetitionScore,
    PlotAggregation.percentage,
    daily,
  ),
];

export const DEFAULT_WIDGETS: Record<DashboardSource, DefaultWidgetSpec[]> = {
  [DashboardSource.call_logs]: CALL_LOG_WIDGETS,
  [DashboardSource.runs]: RUN_WIDGETS,
};
