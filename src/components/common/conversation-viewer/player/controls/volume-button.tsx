'use client';

import type { RefObject } from 'react';

import { setAudioMuted } from '../../_utils/playback';
import { PlayerControlButton } from './player-control-button';
import { VolumeIcon } from './volume-icon';

interface VolumeButtonProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
}

const volumeLabel = (muted: boolean) => {
  if (muted) return 'Unmute';
  return 'Mute';
};

export function VolumeButton({
  audioRef,
  muted,
  onMutedChange,
}: VolumeButtonProps) {
  return (
    <PlayerControlButton
      label={volumeLabel(muted)}
      onClick={() => {
        setAudioMuted(audioRef.current, !muted);
        onMutedChange(!muted);
      }}
    >
      <VolumeIcon muted={muted} />
    </PlayerControlButton>
  );
}
