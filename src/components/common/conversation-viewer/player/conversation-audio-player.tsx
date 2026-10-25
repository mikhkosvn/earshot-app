'use client';

import { type RefObject, useState } from 'react';

import { DEFAULT_PLAYBACK_SPEED } from '../_constants/playback';
import { useConversation } from '../_hooks/use-conversation';
import { usePlayerShortcuts } from '../_hooks/use-player-shortcuts';
import { setAudioSpeed } from '../_utils/playback';
import { PlayerControls } from './controls/player-controls';
import { PlayerEmpty } from './player-empty';
import { PlayerWaveform } from './waveform/player-waveform';
import { WaveformLegend } from './waveform/waveform-legend';

interface ConversationAudioPlayerProps {
  conversationId: number;
  shareToken?: string | null;
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTime: number;
  onTimeChange: (time: number) => void;
}

export function ConversationAudioPlayer({
  conversationId,
  shareToken = null,
  audioRef,
  currentTime,
  onTimeChange,
}: ConversationAudioPlayerProps) {
  const query = { conversationId, shareToken };
  const conversation = useConversation(query);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_PLAYBACK_SPEED);
  usePlayerShortcuts(audioRef, conversation.turns);

  if (!conversation.recordingUrl) return <PlayerEmpty />;

  return (
    <div className="m-3 flex flex-col rounded-lg border bg-muted/20">
      <WaveformLegend />
      <PlayerWaveform
        query={query}
        audioRef={audioRef}
        currentTime={currentTime}
      />
      <PlayerControls
        query={query}
        audioRef={audioRef}
        currentTime={currentTime}
        playing={playing}
        muted={muted}
        speed={speed}
        onMutedChange={setMuted}
        onSpeedChange={setSpeed}
      />
      <audio
        ref={audioRef}
        src={conversation.recordingUrl}
        preload="metadata"
        className="hidden"
        onLoadedMetadata={() => setAudioSpeed(audioRef.current, speed)}
        onTimeUpdate={(event) => onTimeChange(event.currentTarget.currentTime)}
        onSeeked={(event) => onTimeChange(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
