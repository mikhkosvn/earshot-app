'use client';

import {
  RotateCcwIcon,
  RotateCwIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from 'lucide-react';
import type { RefObject } from 'react';

import { SKIP_SECONDS } from '../../_constants/playback';
import { useConversation } from '../../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../../_service';
import {
  jumpToNextTurn,
  jumpToPreviousTurn,
  skipAudio,
  toggleAudio,
} from '../../_utils/playback';
import { DownloadRecordingButton } from './download-recording-button';
import { PlayIcon } from './play-icon';
import { PlayerControlButton } from './player-control-button';
import { PlayerTime } from './player-time';
import { SpeedSelect } from './speed-select';
import { VolumeButton } from './volume-button';

type PlayerControlsProps = {
  query: ConversationQueryArgs;
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTime: number;
  playing: boolean;
  muted: boolean;
  speed: number;
  onMutedChange: (muted: boolean) => void;
  onSpeedChange: (speed: number) => void;
};

const playLabel = (playing: boolean) => {
  if (playing) return 'Pause';
  return 'Play';
};

export function PlayerControls({
  query,
  audioRef,
  currentTime,
  playing,
  muted,
  speed,
  onMutedChange,
  onSpeedChange,
}: PlayerControlsProps) {
  const { turns } = useConversation(query);

  return (
    <div className="flex items-center gap-1 border-t px-3 py-2">
      <PlayerControlButton
        label="Previous turn (shift + ←)"
        onClick={() => jumpToPreviousTurn(audioRef.current, turns)}
      >
        <SkipBackIcon />
      </PlayerControlButton>
      <PlayerControlButton
        label="Back 10s (J)"
        onClick={() => skipAudio(audioRef.current, -SKIP_SECONDS)}
      >
        <RotateCcwIcon />
      </PlayerControlButton>
      <PlayerControlButton
        label={playLabel(playing)}
        onClick={() => toggleAudio(audioRef.current)}
      >
        <PlayIcon playing={playing} />
      </PlayerControlButton>
      <PlayerControlButton
        label="Forward 10s (L)"
        onClick={() => skipAudio(audioRef.current, SKIP_SECONDS)}
      >
        <RotateCwIcon />
      </PlayerControlButton>
      <PlayerControlButton
        label="Next turn (shift + →)"
        onClick={() => jumpToNextTurn(audioRef.current, turns)}
      >
        <SkipForwardIcon />
      </PlayerControlButton>
      <PlayerTime query={query} currentTime={currentTime} />
      <VolumeButton
        audioRef={audioRef}
        muted={muted}
        onMutedChange={onMutedChange}
      />
      <SpeedSelect
        audioRef={audioRef}
        speed={speed}
        onSpeedChange={onSpeedChange}
      />
      <DownloadRecordingButton query={query} />
    </div>
  );
}
