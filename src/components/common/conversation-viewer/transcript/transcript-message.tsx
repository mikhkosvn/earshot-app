'use client';

import type { RefObject } from 'react';

import { CopyButton } from '@/components/common/clipboard/copy-button';
import { TranscriptRole } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';
import { TranscriptRoleLabel } from '@/server/conversations/constants/transcript-role-labels';
import type { ConversationSource } from '@/server/conversations/constants/conversation-source';
import type { ConversationTurnItem } from '@/server/conversations/types';

import { formatTurnTime } from '../_utils/format-time';
import { TurnPlayButton } from './turn-play-button';

const ITEM_CLASS: Record<TranscriptRole, string> = {
  [TranscriptRole.main_agent]: 'items-start',
  [TranscriptRole.testing_agent]: 'items-end',
};

const HEADER_CLASS: Record<TranscriptRole, string> = {
  [TranscriptRole.main_agent]: 'flex-row',
  [TranscriptRole.testing_agent]: 'flex-row-reverse',
};

const BUBBLE_CLASS: Record<TranscriptRole, string> = {
  [TranscriptRole.main_agent]: 'bg-muted',
  [TranscriptRole.testing_agent]: 'border bg-background',
};

type TranscriptMessageProps = {
  turn: ConversationTurnItem;
  source: ConversationSource;
  active: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
};

export function TranscriptMessage({
  turn,
  source,
  active,
  audioRef,
}: TranscriptMessageProps) {
  return (
    <li className={cn('group flex flex-col gap-1', ITEM_CLASS[turn.role])}>
      <div className={cn('flex items-center gap-2', HEADER_CLASS[turn.role])}>
        <span className="text-sm font-medium">
          {TranscriptRoleLabel[turn.role]}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {formatTurnTime(turn.startTime, source)}
        </span>
        <div className="flex items-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <TurnPlayButton turn={turn} audioRef={audioRef} />
          <CopyButton value={turn.content} label="Copy message" />
        </div>
      </div>
      <p
        data-active={active}
        className={cn(
          'max-w-[85%] rounded-lg px-4 py-2.5 text-sm/relaxed whitespace-pre-wrap data-[active=true]:ring-2 data-[active=true]:ring-primary/40',
          BUBBLE_CLASS[turn.role],
        )}
      >
        {turn.content}
      </p>
    </li>
  );
}
