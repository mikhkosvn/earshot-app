'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import type { RunRow } from '@/server/results/types';

import { useSharedRunParam } from '../../_hooks/use-shared-run-param';
import {
  durationText,
  evaluationText,
  evaluatorText,
  namedRefText,
  tableDateText,
} from '../../_utils/share-format';

interface SharedRunRowProps {
  run: RunRow;
}

export function SharedRunRow({ run }: SharedRunRowProps) {
  const { openRun } = useSharedRunParam();

  return (
    <TableRow className="cursor-pointer" onClick={() => openRun(run.id)}>
      <TableCell className="font-medium">{run.id}</TableCell>
      <TableCell className="font-medium">
        {evaluatorText(run.evaluator)}
      </TableCell>
      <TableCell className="whitespace-nowrap" suppressHydrationWarning>
        {tableDateText(run.startedAt)}
      </TableCell>
      <TableCell>{durationText(run.durationSeconds)}</TableCell>
      <TableCell>{evaluationText(run)}</TableCell>
      <TableCell>{namedRefText(run.personality)}</TableCell>
    </TableRow>
  );
}
