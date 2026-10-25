'use client';

import { useQueryClient } from '@tanstack/react-query';
import { FileJsonIcon } from 'lucide-react';
import { useState } from 'react';

import { RunFromFileDialog } from '@/components/common/run-dialogs/run-from-file/run-from-file-dialog';
import { RunStatusDialog } from '@/components/common/run-dialogs/run-status/run-status-dialog';
import { Button } from '@/components/ui/button';

import { invalidateEvaluatorData } from '../../../_utils/invalidate-evaluator-data';

export function RunFromFileButton() {
  const queryClient = useQueryClient();
  const [isFileOpen, setFileOpen] = useState(false);
  const [startedResultId, setStartedResultId] = useState<number | null>(null);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setFileOpen(true)}
      >
        <FileJsonIcon />
        Run from file
      </Button>
      <RunFromFileDialog
        open={isFileOpen}
        onOpenChange={setFileOpen}
        onStarted={(resultId) => {
          setFileOpen(false);
          setStartedResultId(resultId);
          void invalidateEvaluatorData(queryClient);
        }}
      />
      <RunStatusDialog
        resultId={startedResultId}
        onClose={() => setStartedResultId(null)}
      />
    </>
  );
}
