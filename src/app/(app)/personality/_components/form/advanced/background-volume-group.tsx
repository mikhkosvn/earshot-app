'use client';

import { useWatch } from 'react-hook-form';

import { BackgroundNoise } from '@/generated/prisma/enums';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { AdvancedGroup } from './advanced-group';
import { BackgroundVolumeControls } from './background-volume-controls';

export function BackgroundVolumeGroup() {
  const noise = useWatch<PersonalityFormValues, 'backgroundNoise'>({
    name: 'backgroundNoise',
  });

  return (
    <AdvancedGroup
      title="Background sound volume"
      description="How loud the ambient track sits under the call."
    >
      <BackgroundVolumeControls noiseOff={noise === BackgroundNoise.off} />
    </AdvancedGroup>
  );
}
