'use client';

import { useIsUpdatingPhoneNumber } from '../../_hooks/use-is-updating-phone-number';

export function SavePhoneNumberLabel() {
  const isSaving = useIsUpdatingPhoneNumber();

  if (isSaving) return 'Saving...';
  return 'Save';
}
