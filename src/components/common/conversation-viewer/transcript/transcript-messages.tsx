'use client';

import type { RefObject } from 'react';

import { useConversation } from '../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../_service';
import { isActiveTurn } from '../_utils/playback';
import { TranscriptEmpty } from './transcript-empty';
import { TranscriptMessage } from './transcript-message';

interface TranscriptMessagesProps {
  query: ConversationQueryArgs;
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTime: number;
}

export function TranscriptMessages({
  query,
  audioRef,
  currentTime,
}: TranscriptMessagesProps) {
  const { turns, source } = useConversation(query);
  if (turns.length === 0) return <TranscriptEmpty />;

  return (
    <ol className="flex flex-col gap-4 p-3">
      {turns.map((turn) => (
        <TranscriptMessage
          key={turn.id}
          turn={turn}
          source={source}
          active={isActiveTurn(turn, currentTime)}
          audioRef={audioRef}
        />
      ))}
    </ol>
  );
}
