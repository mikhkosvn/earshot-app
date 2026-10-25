'use client';

import { RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ReevaluateMetricsDialog } from '../../../../_components/reevaluate/reevaluate-metrics-dialog';
import { useResultId } from '../../../../_hooks/use-result-id';

type ReevaluateRunsButtonProps = {
  selectedIds: number[];
};

export function ReevaluateRunsButton({
  selectedIds,
}: ReevaluateRunsButtonProps) {
  const [open, setOpen] = useState(false);
  const resultId = useResultId();

  return (
    <>
      <Button
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
        targets={[{ resultId, runIds: selectedIds }]}
      />
    </>
  );
}
