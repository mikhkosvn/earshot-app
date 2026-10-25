'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { NewAlertDialog } from '../new-alert/new-alert-dialog';

export function NewAlertButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" className="text-xs" onClick={() => setOpen(true)}>
        <PlusIcon />
        New alert
      </Button>
      <NewAlertDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
