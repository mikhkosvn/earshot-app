'use client';

import type { RefObject } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { PLAYBACK_SPEEDS } from '../../_constants/playback';
import { setAudioSpeed } from '../../_utils/playback';

type SpeedSelectProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
  speed: number;
  onSpeedChange: (speed: number) => void;
};

const speedItems = PLAYBACK_SPEEDS.map((value) => ({
  value,
  label: `${value}x`,
}));

export function SpeedSelect({
  audioRef,
  speed,
  onSpeedChange,
}: SpeedSelectProps) {
  return (
    <Select
      items={speedItems}
      value={speed}
      onValueChange={(next) => {
        if (next === null) return;
        setAudioSpeed(audioRef.current, next);
        onSpeedChange(next);
      }}
    >
      <SelectTrigger size="sm" aria-label="Playback speed" className="w-18">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {speedItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
