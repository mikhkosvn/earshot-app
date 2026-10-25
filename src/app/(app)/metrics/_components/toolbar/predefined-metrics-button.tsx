'use client';

import { SquareLibraryIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useStartPredefinedQuery } from '../../_hooks/use-start-predefined-query';
import { PredefinedMetricsDialog } from '../predefined/predefined-metrics-dialog';

export function PredefinedMetricsButton() {
  const [open, setOpen] = useState(false);
  const startPredefinedQuery = useStartPredefinedQuery();

  return (
    <>
      <Button
        type="button"
        size="sm"
        className="text-xs"
        onClick={() => {
          startPredefinedQuery();
          setOpen(true);
        }}
      >
        <SquareLibraryIcon />
        Predefined Metrics
      </Button>
      <PredefinedMetricsDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
