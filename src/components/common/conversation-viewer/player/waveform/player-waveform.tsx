'use client';

import type { RefObject } from 'react';

import { Button } from '@/components/ui/button';

import { useConversation } from '../../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../../_service';
import { progressPercent, seekAudio } from '../../_utils/playback';
import { waveformLanes } from '../../_utils/waveform-bars';
import { WaveformCursor } from './waveform-cursor';
import { WaveformLane } from './waveform-lane';
import { WaveformTimeAxis } from './waveform-time-axis';

type PlayerWaveformProps = {
  query: ConversationQueryArgs;
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTime: number;
};

export function PlayerWaveform({
  query,
  audioRef,
  currentTime,
}: PlayerWaveformProps) {
  const { waveform, durationSeconds } = useConversation(query);
  const lanes = waveformLanes(waveform);

  return (
    <div className="flex flex-col gap-1 px-4 pt-3">
      <Button
        type="button"
        variant="unstyled"
        size="unstyled"
        aria-label="Seek in the recording"
        className="relative flex w-full cursor-pointer flex-col items-stretch gap-1"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const ratio = (event.clientX - rect.left) / Math.max(rect.width, 1);
          seekAudio(audioRef.current, ratio * durationSeconds);
        }}
      >
        <WaveformLane peaks={lanes.main} className="fill-emerald-500" />
        <WaveformLane peaks={lanes.testing} className="fill-rose-400" />
        <WaveformCursor
          percent={progressPercent(currentTime, durationSeconds)}
        />
      </Button>
      <WaveformTimeAxis duration={durationSeconds} />
    </div>
  );
}
