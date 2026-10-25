'use client';

import { type ReactNode, useRef, useState } from 'react';

import { ConversationViewerActions } from './conversation-viewer-actions';
import { ConversationMetadataCard } from './metadata/conversation-metadata-card';
import { ConversationMetricsCard } from './metrics/conversation-metrics-card';
import { ConversationAudioPlayer } from './player/conversation-audio-player';
import { ConversationTranscript } from './transcript/conversation-transcript';

type ConversationViewerColumnsProps = {
  conversationId: number;
  header?: ReactNode;
  actions?: ReactNode;
  shareToken?: string | null;
};

export function ConversationViewerColumns({
  conversationId,
  header,
  actions,
  shareToken = null,
}: ConversationViewerColumnsProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="flex min-h-0 flex-col gap-3 overflow-y-auto p-4">
        {header}
        <ConversationMetricsCard
          conversationId={conversationId}
          shareToken={shareToken}
        />
        <ConversationMetadataCard
          conversationId={conversationId}
          shareToken={shareToken}
        />
      </div>
      <div className="flex min-h-0 flex-col overflow-y-auto border-t lg:border-t-0 lg:border-l">
        <ConversationViewerActions actions={actions} />
        <ConversationAudioPlayer
          conversationId={conversationId}
          shareToken={shareToken}
          audioRef={audioRef}
          currentTime={currentTime}
          onTimeChange={setCurrentTime}
        />
        <ConversationTranscript
          conversationId={conversationId}
          shareToken={shareToken}
          audioRef={audioRef}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}
