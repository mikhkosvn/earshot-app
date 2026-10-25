'use client';

import { UserCogIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useLinkedTestProfileParam } from '../../_hooks/test-profiles/use-linked-test-profile-param';
import { TestProfilesDialog } from '../test-profiles/test-profiles-dialog';

export function TestProfilesButton() {
  const [isOpen, setOpen] = useState(false);
  const [linkedProfileId, setLinkedProfileId] = useLinkedTestProfileParam();
  const changeOpen = (open: boolean) => {
    setOpen(open);
    if (open) return;
    void setLinkedProfileId(null);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <UserCogIcon />
        Test Profiles
      </Button>
      <TestProfilesDialog
        open={isOpen || linkedProfileId !== null}
        onOpenChange={changeOpen}
      />
    </>
  );
}
