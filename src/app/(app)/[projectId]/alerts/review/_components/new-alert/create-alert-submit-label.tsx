'use client';

import { useIsCreatingAlert } from '../../_hooks/mutations/use-is-creating-alert';

export function CreateAlertSubmitLabel() {
  const isCreating = useIsCreatingAlert();

  if (isCreating) return 'Creating...';
  return 'Create alert';
}
