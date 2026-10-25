'use client';

import { RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ReevaluateMetricsDialog } from '../../reevaluate/reevaluate-metrics-dialog';

type ReevaluateResultsButtonProps = {
  selectedIds: number[];
};

export function ReevaluateResultsButton({
  selectedIds,
}: ReevaluateResultsButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        disabled={selectedIds.length === 0}
        onClick={() => setOpen(true)}
      >
        <RefreshCwIcon />
        Reevaluate Metrics
      </Button>
      <ReevaluateMetricsDialog
        open={open}
        onOpenChange={setOpen}
        targets={selectedIds.map((resultId) => ({ resultId }))}
      />
    </>
  );
}
