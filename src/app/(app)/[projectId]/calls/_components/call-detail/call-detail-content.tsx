'use client';

import { CallDetailBody } from './call-detail-body';

interface CallDetailContentProps {
  callLogId: number | null;
}

export function CallDetailContent({ callLogId }: CallDetailContentProps) {
  if (callLogId === null) return null;
  return <CallDetailBody callLogId={callLogId} />;
}
