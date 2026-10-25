import { WidgetField } from '@/generated/prisma/enums';

export const WidgetFieldLabel: Record<WidgetField, string> = {
  [WidgetField.stat]: 'Overview Stats',
  [WidgetField.success]: 'Success',
  [WidgetField.duration]: 'Duration (mins)',
  [WidgetField.is_reviewed]: 'Is Reviewed',
  [WidgetField.call_ended_reason]: 'Call Ended Reason',
  [WidgetField.dropoff_point]: 'Drop-off Point',
  [WidgetField.topic]: 'Topic',
  [WidgetField.metric_value]: 'Metric',
  [WidgetField.metadata]: 'Custom Metadata',
  [WidgetField.scenario_name]: 'Scenario',
};
