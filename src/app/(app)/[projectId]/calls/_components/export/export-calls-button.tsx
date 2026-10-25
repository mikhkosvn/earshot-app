'use client';

import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ExportCallsDialog } from './export-calls-dialog';

export function ExportCallsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" className="text-xs" onClick={() => setOpen(true)}>
        <DownloadIcon />
        Export
      </Button>
      <ExportCallsDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
