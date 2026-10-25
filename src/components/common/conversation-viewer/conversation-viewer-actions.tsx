import type { ReactNode } from 'react';

type ConversationViewerActionsProps = {
  actions?: ReactNode;
};

export function ConversationViewerActions({
  actions,
}: ConversationViewerActionsProps) {
  if (!actions) return null;
  return <div className="flex items-center gap-2 px-3 pt-3">{actions}</div>;
}
