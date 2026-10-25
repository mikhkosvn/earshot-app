'use client';

import { PhoneOffIcon } from 'lucide-react';

import { useConversation } from '../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../_service';

type TranscriptEndedFooterProps = {
  query: ConversationQueryArgs;
};

export function TranscriptEndedFooter({ query }: TranscriptEndedFooterProps) {
  const { endedReason } = useConversation(query);
  if (!endedReason) return null;

  return (
    <div className="flex items-center justify-center gap-2 border-y bg-muted/40 px-3 py-2.5 text-sm">
      <PhoneOffIcon className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">Call ended:</span>
      <span className="font-medium">{endedReason}</span>
    </div>
  );
}
