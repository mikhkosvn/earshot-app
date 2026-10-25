'use client';

import type { RefObject } from 'react';

import { TranscriptEndedFooter } from './transcript-ended-footer';
import { TranscriptHeader } from './transcript-header';
import { TranscriptMessages } from './transcript-messages';

interface ConversationTranscriptProps {
  conversationId: number;
  shareToken?: string | null;
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTime: number;
}

export function ConversationTranscript({
  conversationId,
  shareToken = null,
  audioRef,
  currentTime,
}: ConversationTranscriptProps) {
  const query = { conversationId, shareToken };

  return (
    <div className="flex flex-col">
      <TranscriptHeader query={query} />
      <TranscriptMessages
        query={query}
        audioRef={audioRef}
        currentTime={currentTime}
      />
      <TranscriptEndedFooter query={query} />
    </div>
  );
}
