'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { CreateMonitorDialog } from '@/components/common/monitor-dialog/create-monitor-dialog';
import { Button } from '@/components/ui/button';

export function CreateMonitorButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <PlusIcon />
        Create monitor
      </Button>
      <CreateMonitorDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
