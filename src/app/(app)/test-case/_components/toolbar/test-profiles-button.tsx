'use client';

import { UserCogIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { TestProfilesDialog } from '../test-profiles/test-profiles-dialog';

export function TestProfilesButton() {
  const [isOpen, setOpen] = useState(false);

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
      <TestProfilesDialog open={isOpen} onOpenChange={setOpen} />
    </>
  );
}
