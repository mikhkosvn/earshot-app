'use client';

import { ConversationViewerLayout } from '@/components/common/conversation-viewer/conversation-viewer-layout';

import { useShareToken } from '../_hooks/use-share-token';
import { useSharedView } from '../_hooks/use-shared-view';

export function SharedCallView() {
  const token = useShareToken();
  const view = useSharedView();

  if (!view || view.conversationId === null) return null;
  return (
    <div className="h-[calc(100dvh-3rem)] bg-background">
      <ConversationViewerLayout
        conversationId={view.conversationId}
        shareToken={token}
      />
    </div>
  );
}
