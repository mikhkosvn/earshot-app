'use client';

import { useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { useIsSavingRubric } from '../_hooks/use-is-saving-rubric';
import { RubricSaveLabel } from './rubric-save-label';

export function RubricSaveButton() {
  const { isDirty } = useFormState();
  const isSaving = useIsSavingRubric();

  return (
    <Button type="submit" size="sm" disabled={!isDirty || isSaving}>
      <RubricSaveLabel />
    </Button>
  );
}
