'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PlayIcon } from 'lucide-react';
import { useState } from 'react';

import { RunStatusDialog } from '@/components/common/run-dialogs/run-status/run-status-dialog';
import { Button } from '@/components/ui/button';

import { useRunSelectedMutation } from '../../../../_hooks/mutations/runs/use-run-selected-mutation';
import { useResultRunsQuery } from '../../../../_hooks/runs/use-result-runs-query';
import { useResultId } from '../../../../_hooks/use-result-id';
import { ResultService } from '../../../../_service';
import { selectedEvaluatorIds } from '../../../../_utils/runs/run-selection';

interface RunSelectedButtonProps {
  selectedIds: readonly number[];
}

export function RunSelectedButton({ selectedIds }: RunSelectedButtonProps) {
  const [startedResultId, setStartedResultId] = useState<number | null>(null);
  const resultId = useResultId();
  const { data: agentId } = useSuspenseQuery({
    ...ResultService.getDetailQuery({ resultId }),
    select: (detail) => detail.agent?.id ?? null,
  });
  const { data: runs } = useResultRunsQuery();
  const runSelected = useRunSelectedMutation();

  return (
    <>
      <Button
        size="sm"
        className="text-xs"
        disabled={selectedIds.length === 0 || runSelected.isPending}
        onClick={() =>
          runSelected.mutate(
            {
              agentId,
              evaluatorIds: selectedEvaluatorIds(runs.rows, selectedIds),
            },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setStartedResultId(result.data.resultId);
              },
            },
          )
        }
      >
        <PlayIcon />
        Run Selected
      </Button>
      <RunStatusDialog
        resultId={startedResultId}
        onClose={() => setStartedResultId(null)}
      />
    </>
  );
}
