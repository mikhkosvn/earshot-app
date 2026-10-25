'use client';

import { Button } from '@/components/ui/button';

import { useIsRenamingResult } from '../../../_hooks/results-list/use-is-renaming-result';
import { RenameResultSubmitLabel } from './rename-result-submit-label';

export function RenameResultSubmitButton() {
  const isRenaming = useIsRenamingResult();

  return (
    <Button type="submit" disabled={isRenaming}>
      <RenameResultSubmitLabel />
    </Button>
  );
}
