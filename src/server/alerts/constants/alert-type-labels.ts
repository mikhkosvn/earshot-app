import { AlertType } from '@/generated/prisma/enums';

export const AlertTypeLabel: Record<AlertType, string> = {
  [AlertType.normal]: 'Failure',
  [AlertType.threshold]: 'Threshold',
  [AlertType.significant_change]: 'Trend',
  [AlertType.insight_new_mode]: 'New Insights category',
  [AlertType.insight_uptick]: 'Insights category spike',
};

export const AlertTypeTableLabel: Record<AlertType, string> = {
  [AlertType.normal]: 'Failure Alert',
  [AlertType.threshold]: 'Threshold Alert',
  [AlertType.significant_change]: 'Trend Alert',
  [AlertType.insight_new_mode]: 'New Category Alert',
  [AlertType.insight_uptick]: 'Category Spike Alert',
};

export const AlertTypeDescription: Record<AlertType, string> = {
  [AlertType.normal]: 'Fires immediately on each failing evaluation.',
  [AlertType.threshold]:
    'Fires when N of the last window-size evaluations cross a value.',
  [AlertType.significant_change]:
    'Fires when the rolling window mean drifts significantly from history.',
  [AlertType.insight_new_mode]:
    'Fires when a brand-new failure category appears for this metric on the Insights page.',
  [AlertType.insight_uptick]:
    "Fires when an existing Insights category's recent volume spikes vs its baseline.",
};
