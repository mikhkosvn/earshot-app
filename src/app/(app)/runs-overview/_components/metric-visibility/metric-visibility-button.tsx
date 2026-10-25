'use client';

import { EyeIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { MetricVisibilityDialog } from './metric-visibility-dialog';

export function MetricVisibilityButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => setOpen(true)}
      >
        <EyeIcon />
        Metrics
      </Button>
      <MetricVisibilityDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
