'use client';

import { useIsRenamingResult } from '../../../_hooks/results-list/use-is-renaming-result';

export function RenameResultSubmitLabel() {
  const isRenaming = useIsRenamingResult();

  if (isRenaming) return 'Saving...';
  return 'Save';
}
