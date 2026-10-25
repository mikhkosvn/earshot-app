'use client';

import { PlayIcon } from 'lucide-react';
import { useState } from 'react';

import { ConfigureRunDialog } from '@/components/common/run-dialogs/configure-run/configure-run-dialog';
import { RunStatusDialog } from '@/components/common/run-dialogs/run-status/run-status-dialog';
import { Button } from '@/components/ui/button';

type RunEvaluatorsButtonProps = {
  selectedIds: number[];
};

export function RunEvaluatorsButton({ selectedIds }: RunEvaluatorsButtonProps) {
  const [isConfigureOpen, setConfigureOpen] = useState(false);
  const [startedResultId, setStartedResultId] = useState<number | null>(null);

  return (
    <>
      <Button
        type="button"
        size="sm"
        disabled={selectedIds.length === 0}
        onClick={() => setConfigureOpen(true)}
      >
        <PlayIcon />
        Run
      </Button>
      <ConfigureRunDialog
        open={isConfigureOpen}
        onOpenChange={setConfigureOpen}
        evaluatorIds={selectedIds}
        onStarted={(resultId) => {
          setConfigureOpen(false);
          setStartedResultId(resultId);
        }}
      />
      <RunStatusDialog
        resultId={startedResultId}
        onClose={() => setStartedResultId(null)}
      />
    </>
  );
}
