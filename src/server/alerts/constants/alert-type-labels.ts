import { AlertType } from '@/generated/prisma/enums';

export const AlertTypeLabel: Record<AlertType, string> = {
  [AlertType.normal]: 'Failure',
  [AlertType.significant_change]: 'Trend',
  [AlertType.threshold]: 'Threshold',
  [AlertType.insight_new_mode]: 'New failure mode',
  [AlertType.insight_uptick]: 'Failure mode spike',
};
