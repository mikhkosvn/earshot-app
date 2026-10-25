'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { AddCallDialog } from './add-call-dialog';

export function AddCallButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" className="text-xs" onClick={() => setOpen(true)}>
        <PlusIcon />
        Add Call
      </Button>
      <AddCallDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
