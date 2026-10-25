'use client';

import { SharedRunConversation } from './shared-run-conversation';

type SharedRunDialogContentProps = {
  runId: number | null;
};

export function SharedRunDialogContent({ runId }: SharedRunDialogContentProps) {
  if (runId === null) return null;
  return <SharedRunConversation runId={runId} />;
}
