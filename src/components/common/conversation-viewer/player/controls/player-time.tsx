'use client';

import { useConversation } from '../../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../../_service';
import { formatClock } from '../../_utils/format-time';

interface PlayerTimeProps {
  query: ConversationQueryArgs;
  currentTime: number;
}

export function PlayerTime({ query, currentTime }: PlayerTimeProps) {
  const { durationSeconds } = useConversation(query);

  return (
    <span className="mx-auto font-mono text-xs text-muted-foreground tabular-nums">
      {formatClock(currentTime)} / {formatClock(durationSeconds)}
    </span>
  );
}
