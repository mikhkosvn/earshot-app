'use client';

import { ConversationViewerLayout } from '@/components/common/conversation-viewer/conversation-viewer-layout';

import { useShareToken } from '../../_hooks/use-share-token';
import { useSharedRun } from '../../_hooks/use-shared-run';
import { SharedRunHeader } from './shared-run-header';

interface SharedRunConversationProps {
  runId: number;
}

export function SharedRunConversation({ runId }: SharedRunConversationProps) {
  const token = useShareToken();
  const run = useSharedRun(runId);

  return (
    <ConversationViewerLayout
      conversationId={run.conversationId}
      header={<SharedRunHeader runId={runId} />}
      shareToken={token}
    />
  );
}
