'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { ResultMetricTile } from '@/server/results/types';

import { useRunDetailParam } from '../../../../_hooks/use-run-detail-param';
import { MetricPopupContent } from './metric-popup-content';

type MetricPopupDialogProps = {
  tile: ResultMetricTile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MetricPopupDialog({
  tile,
  open,
  onOpenChange,
}: MetricPopupDialogProps) {
  const [, setRunDetailId] = useRunDetailParam();

  const openRun = (runId: number) => {
    onOpenChange(false);
    void setRunDetailId(runId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-3 overflow-y-auto sm:max-w-5xl">
        <MetricPopupContent tile={tile} onOpenRun={openRun} />
      </DialogContent>
    </Dialog>
  );
}
