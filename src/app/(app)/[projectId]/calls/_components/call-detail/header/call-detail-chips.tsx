import { PlayIcon } from 'lucide-react';

import type { CallLogDetail } from '@/server/call-logs/types';

import { callStartedText } from '../../../_utils/call-format';
import { CallAgentChip } from './call-agent-chip';

interface CallDetailChipsProps {
  call: CallLogDetail;
}

export function CallDetailChips({ call }: CallDetailChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
        <PlayIcon className="size-3" />
        Call started at - {callStartedText(call.startedAt)}
      </span>
      <CallAgentChip agentId={call.agentId} agentName={call.agentName} />
    </div>
  );
}
