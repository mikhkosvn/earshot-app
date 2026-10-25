'use client';

import { useIsUpdatingProject } from '@/app/(app)/_hooks/use-is-updating-project';

export function EditProjectSubmitLabel() {
  const isUpdating = useIsUpdatingProject();

  if (isUpdating) return 'Saving...';
  return 'Save changes';
}
