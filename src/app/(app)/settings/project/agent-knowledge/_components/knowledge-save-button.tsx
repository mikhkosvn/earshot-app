'use client';

import { useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { useIsSavingKnowledge } from '../_hooks/use-is-saving-knowledge';
import { KnowledgeSaveLabel } from './knowledge-save-label';

export function KnowledgeSaveButton() {
  const { isDirty } = useFormState();
  const isSaving = useIsSavingKnowledge();

  return (
    <Button type="submit" size="sm" disabled={!isDirty || isSaving}>
      <KnowledgeSaveLabel isSaving={isSaving} />
    </Button>
  );
}
