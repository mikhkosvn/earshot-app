'use client';

import { useSharedView } from '../../_hooks/use-shared-view';
import { SharedRunConversation } from './shared-run-conversation';

export function SharedRunView() {
  const view = useSharedView();

  if (!view || view.runId === null) return null;
  return (
    <div className="h-[calc(100dvh-3rem)] bg-background">
      <SharedRunConversation runId={view.runId} />
    </div>
  );
}
