'use client';

import { ConversationViewerLayout } from '@/components/common/conversation-viewer/conversation-viewer-layout';

import { useCallDetailQuery } from '../../_hooks/call-list/use-call-detail-query';
import { isActiveCall } from '../../_utils/call-processing';
import { CallDetailActions } from './call-detail-actions';
import { CallProcessingState } from './call-processing-state';
import { CallDetailHeader } from './header/call-detail-header';

type CallDetailBodyProps = {
  callLogId: number;
};

export function CallDetailBody({ callLogId }: CallDetailBodyProps) {
  const { data: call } = useCallDetailQuery(callLogId);

  if (isActiveCall(call)) return <CallProcessingState call={call} />;
  return (
    <ConversationViewerLayout
      conversationId={call.conversationId}
      header={<CallDetailHeader callLogId={callLogId} />}
      actions={<CallDetailActions callLogId={callLogId} />}
    />
  );
}
