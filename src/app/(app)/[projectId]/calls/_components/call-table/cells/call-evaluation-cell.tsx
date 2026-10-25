'use client';

import { CallProcessingStatus } from '@/generated/prisma/enums';
import type { CallLogRow } from '@/server/call-logs/types';

import { CallReviewSelect } from '../../call-review/call-review-select';
import { CallStatusBadge } from './call-status-badge';

type CallEvaluationCellProps = {
  call: CallLogRow;
};

export function CallEvaluationCell({ call }: CallEvaluationCellProps) {
  if (
    call.status !== CallProcessingStatus.completed ||
    !call.evaluationStatus
  ) {
    return (
      <CallStatusBadge status={call.status} errorMessage={call.errorMessage} />
    );
  }
  return (
    <CallReviewSelect
      callLogId={call.id}
      evaluationStatus={call.evaluationStatus}
    />
  );
}
