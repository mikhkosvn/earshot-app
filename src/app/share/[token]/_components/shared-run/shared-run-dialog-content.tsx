'use client';

import { SharedRunConversation } from './shared-run-conversation';

interface SharedRunDialogContentProps {
  runId: number | null;
}

export function SharedRunDialogContent({ runId }: SharedRunDialogContentProps) {
  if (runId === null) return null;
  return <SharedRunConversation runId={runId} />;
}
