'use client';

import { useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { PendingLabel } from '../../../_components/pending-label';
import { useIsSavingAgent } from '../../_hooks/use-is-saving-agent';

export function SaveChangesButton() {
  const { isDirty } = useFormState();
  const isSaving = useIsSavingAgent();

  return (
    <Button type="submit" size="sm" disabled={!isDirty || isSaving}>
      <PendingLabel pending={isSaving} pendingText="Saving...">
        Save Changes
      </PendingLabel>
    </Button>
  );
}
