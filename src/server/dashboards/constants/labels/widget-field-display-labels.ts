import { DashboardSource, WidgetField } from '@/generated/prisma/enums';

export const WidgetFieldDisplayLabel: Record<WidgetField, string> = {
  [WidgetField.stat]: 'Overview Stats',
  [WidgetField.success]: 'Success',
  [WidgetField.duration]: 'Call Duration',
  [WidgetField.is_reviewed]: 'Is Reviewed',
  [WidgetField.call_ended_reason]: 'Call End Reason',
  [WidgetField.dropoff_point]: 'Drop-off Point',
  [WidgetField.topic]: 'Topic',
  [WidgetField.metric_value]: 'Metric Evaluation',
  [WidgetField.metadata]: 'Metadata',
  [WidgetField.scenario_name]: 'Scenario',
};

export const StatLabel: Record<DashboardSource, string[]> = {
  [DashboardSource.call_logs]: [
    'Success Ratio',
    'Number of Calls',
    'Total Call Minutes',
    'Median Latency',
  ],
  [DashboardSource.runs]: [
    'Success Ratio',
    'Number of Runs',
    'Total Run Minutes',
    'Median Latency',
  ],
};
