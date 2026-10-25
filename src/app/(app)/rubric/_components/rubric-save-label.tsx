'use client';

import { useIsSavingRubric } from '../_hooks/use-is-saving-rubric';

export function RubricSaveLabel() {
  const isSaving = useIsSavingRubric();

  if (isSaving) return 'Saving...';
  return 'Save Changes';
}
