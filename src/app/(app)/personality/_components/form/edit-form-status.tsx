'use client';

import { useFormState } from 'react-hook-form';

export function EditFormStatus() {
  const { isDirty } = useFormState();

  if (isDirty) return 'You have unsaved changes.';
  return 'All changes saved.';
}
