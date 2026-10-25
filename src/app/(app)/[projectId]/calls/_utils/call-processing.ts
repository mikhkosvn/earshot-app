import { CallProcessingStatus } from '@/generated/prisma/enums';
import type { CallLogRow } from '@/server/call-logs/types';

const ACTIVE_STATUSES: CallProcessingStatus[] = [
  CallProcessingStatus.pending,
  CallProcessingStatus.transcribing,
  CallProcessingStatus.evaluating,
];

export const isActiveCall = (call: Pick<CallLogRow, 'status'>) =>
  ACTIVE_STATUSES.includes(call.status);

export const hasActiveCall = (calls: CallLogRow[]) => calls.some(isActiveCall);
