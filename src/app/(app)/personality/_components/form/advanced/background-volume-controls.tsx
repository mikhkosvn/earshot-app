'use client';

import { Volume1Icon, Volume2Icon } from 'lucide-react';

import {
  SOUND_VOLUME_MAX,
  SOUND_VOLUME_MIN,
} from '@/server/personalities/constants/personality-limits';

import { SliderField } from '../fields/slider-field';

type BackgroundVolumeControlsProps = {
  noiseOff: boolean;
};

export function BackgroundVolumeControls({
  noiseOff,
}: BackgroundVolumeControlsProps) {
  if (noiseOff) {
    return (
      <p className="rounded-lg bg-muted/60 px-3 py-2.5 text-xs text-muted-foreground">
        Choose a background noise in Environment to set its volume levels.
      </p>
    );
  }
  return (
    <>
      <SliderField
        name="backgroundSoundVolumeBase"
        label="Base volume"
        icon={Volume2Icon}
        min={SOUND_VOLUME_MIN}
        max={SOUND_VOLUME_MAX}
        step={0.01}
        suffix=""
        rangeText="0.00 to 1.00"
      />
      <SliderField
        name="backgroundSoundVolumeReduced"
        label="Reduced volume"
        icon={Volume1Icon}
        min={SOUND_VOLUME_MIN}
        max={SOUND_VOLUME_MAX}
        step={0.01}
        suffix=""
        rangeText="0.00 to 1.00"
      />
    </>
  );
}
