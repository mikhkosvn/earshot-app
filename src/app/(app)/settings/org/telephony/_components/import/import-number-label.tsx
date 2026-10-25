'use client';

import { useIsImportingPhoneNumber } from '../../_hooks/use-is-importing-phone-number';

export function ImportNumberLabel() {
  const isImporting = useIsImportingPhoneNumber();

  if (isImporting) return 'Importing...';
  return 'Import Number';
}
