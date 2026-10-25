'use client';

import { useIsSavingLabMetric } from '../../_hooks/form/use-is-saving-lab-metric';

export function SaveLabMetricLabel() {
  const isSaving = useIsSavingLabMetric();

  if (isSaving) return 'Saving...';
  return 'Save';
}
