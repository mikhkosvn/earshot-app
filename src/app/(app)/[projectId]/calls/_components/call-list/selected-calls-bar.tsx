'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useRecomputeMetricsMutation } from '../../_hooks/mutations/call-actions/use-recompute-metrics-mutation';
import { UseAsEvaluatorDialog } from '../use-as-evaluator/use-as-evaluator-dialog';

interface SelectedCallsBarProps {
  selectedIds: number[];
  onClear: () => void;
}

export function SelectedCallsBar({
  selectedIds,
  onClear,
}: SelectedCallsBarProps) {
  const [evaluatorOpen, setEvaluatorOpen] = useState(false);
  const recompute = useRecomputeMetricsMutation();

  if (selectedIds.length === 0) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs">
      <span className="font-medium">{selectedIds.length} selected</span>
      <Button
        variant="outline"
        size="xs"
        onClick={() => setEvaluatorOpen(true)}
      >
        Use as Evaluator
      </Button>
      <Button
        variant="outline"
        size="xs"
        disabled={recompute.isPending}
        onClick={() => recompute.mutate(selectedIds)}
      >
        Recompute Metrics
      </Button>
      <Button variant="ghost" size="xs" onClick={onClear}>
        Clear selection
      </Button>
      <UseAsEvaluatorDialog
        callLogIds={selectedIds}
        open={evaluatorOpen}
        onOpenChange={setEvaluatorOpen}
      />
    </div>
  );
}
