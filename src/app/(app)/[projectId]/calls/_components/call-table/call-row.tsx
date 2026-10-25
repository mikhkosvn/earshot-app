'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import type { CallLogRow } from '@/server/call-logs/types';

import { useCallIdParam } from '../../_hooks/call-params/use-call-id-param';
import { callDurationText, callStartedText } from '../../_utils/call-format';
import { CallAgentCell } from './cells/call-agent-cell';
import { CallEvaluationCell } from './cells/call-evaluation-cell';
import { CallFeedbackCell } from './cells/call-feedback-cell';
import { CallIdCell } from './cells/call-id-cell';
import { CallMetricCells } from './cells/call-metric-cells';
import { CallRowMenu } from './cells/call-row-menu';

type CallRowProps = {
  call: CallLogRow;
  selected: boolean;
  onSelectedChange: (checked: boolean) => void;
};

export function CallRow({ call, selected, onSelectedChange }: CallRowProps) {
  const { openCall } = useCallIdParam();

  return (
    <TableRow
      data-state={selected && 'selected'}
      className="cursor-pointer"
      onClick={() => openCall(call.id)}
    >
      <TableCell onClick={(event) => event.stopPropagation()}>
        <CallRowMenu call={call} />
      </TableCell>
      <TableCell onClick={(event) => event.stopPropagation()}>
        <Checkbox
          aria-label={`Select call ${call.callId}`}
          checked={selected}
          onCheckedChange={(checked) => onSelectedChange(checked)}
        />
      </TableCell>
      <TableCell>
        <CallIdCell callId={call.callId} />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {callStartedText(call.startedAt)}
      </TableCell>
      <TableCell>{callDurationText(call.durationSeconds)}</TableCell>
      <TableCell onClick={(event) => event.stopPropagation()}>
        <CallAgentCell agentId={call.agentId} agentName={call.agentName} />
      </TableCell>
      <TableCell>{call.customerNumber}</TableCell>
      <TableCell>{call.endedReason}</TableCell>
      <TableCell onClick={(event) => event.stopPropagation()}>
        <CallEvaluationCell call={call} />
      </TableCell>
      <TableCell onClick={(event) => event.stopPropagation()}>
        <CallFeedbackCell callLogId={call.id} feedback={call.feedback} />
      </TableCell>
      <CallMetricCells metrics={call.metrics} />
    </TableRow>
  );
}
