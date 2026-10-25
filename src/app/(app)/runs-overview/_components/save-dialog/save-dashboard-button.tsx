'use client';

import { SaveIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { SaveDashboardDialog } from './save-dashboard-dialog';

export function SaveDashboardButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => setOpen(true)}
      >
        <SaveIcon />
        Save dashboard
      </Button>
      <SaveDashboardDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
