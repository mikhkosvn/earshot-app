'use client';

import { useCallDetailQuery } from '../../../_hooks/call-list/use-call-detail-query';
import { CallEvaluationCell } from '../../call-table/cells/call-evaluation-cell';
import { CallDetailChips } from './call-detail-chips';
import { CallFeedbackCard } from './call-feedback-card';
import { CallRubricCard } from './call-rubric-card';
import { CallTitleRow } from './call-title-row';

interface CallDetailHeaderProps {
  callLogId: number;
}

export function CallDetailHeader({ callLogId }: CallDetailHeaderProps) {
  const { data: call } = useCallDetailQuery(callLogId);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <CallTitleRow callLogId={call.id} callId={call.callId} />
        <CallDetailChips call={call} />
        <div>
          <CallEvaluationCell call={call} />
        </div>
      </div>
      <CallFeedbackCard callLogId={call.id} feedback={call.feedback} />
      <CallRubricCard rubric={call.rubric} />
    </div>
  );
}
