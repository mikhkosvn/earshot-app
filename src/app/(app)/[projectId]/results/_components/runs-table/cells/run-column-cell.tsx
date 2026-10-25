'use client';

import type { MouseEvent } from 'react';

import { TableCell } from '@/components/ui/table';
import type { RunRow } from '@/server/results/types';

import { RunColumn } from '../../../_utils/runs/run-columns';
import {
  fixedNumberText,
  namedRefText,
  runDurationText,
  runStartText,
} from '../../../_utils/runs/run-format';
import { RunEvaluationCell } from '../evaluation/run-evaluation-cell';
import { RunFeedbackCell } from '../feedback/run-feedback-cell';
import type { RunSelection } from '../runs-table';
import { RunAgentCell } from './run-agent-cell';
import { RunIdCell } from './run-id-cell';
import { RunPersonalityCell } from './run-personality-cell';
import { RunResultCell } from './run-result-cell';
import { RunRowMenu } from './run-row-menu';

interface RunColumnCellProps {
  column: RunColumn;
  run: RunRow;
  selection?: RunSelection;
  onOpenRun: (run: RunRow) => void;
}

const stop = (event: MouseEvent) => event.stopPropagation();

const TEXT_CELL = 'whitespace-nowrap';

export function RunColumnCell({
  column,
  run,
  selection,
  onOpenRun,
}: RunColumnCellProps) {
  if (column === RunColumn.menu) {
    return (
      <TableCell className="w-8" onClick={stop}>
        <RunRowMenu run={run} onOpenRun={onOpenRun} />
      </TableCell>
    );
  }
  if (column === RunColumn.id) {
    return (
      <TableCell>
        <RunIdCell runId={run.id} selection={selection} />
      </TableCell>
    );
  }
  if (column === RunColumn.resultId) {
    return (
      <TableCell onClick={stop}>
        <RunResultCell resultId={run.resultId} />
      </TableCell>
    );
  }
  if (column === RunColumn.evaluatorName) {
    return (
      <TableCell className="font-medium whitespace-nowrap">
        {namedRefText(run.evaluator)}
      </TableCell>
    );
  }
  if (column === RunColumn.startTime) {
    return (
      <TableCell className={TEXT_CELL}>{runStartText(run.startedAt)}</TableCell>
    );
  }
  if (column === RunColumn.duration) {
    return (
      <TableCell className={TEXT_CELL}>
        {runDurationText(run.durationSeconds)}
      </TableCell>
    );
  }
  if (column === RunColumn.evaluation) {
    return (
      <TableCell onClick={stop}>
        <RunEvaluationCell run={run} />
      </TableCell>
    );
  }
  if (column === RunColumn.personality) {
    return (
      <TableCell onClick={stop}>
        <RunPersonalityCell personality={run.personality} />
      </TableCell>
    );
  }
  if (column === RunColumn.agent) {
    return (
      <TableCell onClick={stop}>
        <RunAgentCell agent={run.agent} />
      </TableCell>
    );
  }
  if (column === RunColumn.testProfile) {
    return (
      <TableCell>
        <span className="block max-w-48 truncate">{run.testProfile?.name}</span>
      </TableCell>
    );
  }
  if (column === RunColumn.testingNumber) {
    return <TableCell className={TEXT_CELL}>{run.testingNumber}</TableCell>;
  }
  if (column === RunColumn.endedReason) {
    return <TableCell className={TEXT_CELL}>{run.endedReason}</TableCell>;
  }
  if (column === RunColumn.ringingDuration) {
    return (
      <TableCell className={TEXT_CELL}>
        {fixedNumberText(run.ringingDuration)}
      </TableCell>
    );
  }
  return (
    <TableCell onClick={stop}>
      <RunFeedbackCell runId={run.id} feedback={run.feedback} />
    </TableCell>
  );
}
