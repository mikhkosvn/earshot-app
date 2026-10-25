import { BackgroundNoise } from '@/generated/prisma/enums';
import {
  FORK_TITLE_SUFFIX,
  SPEED_FAST_MIN,
  SPEED_SLOW_MAX,
} from '@/server/personalities/constants/personality-limits';
import { InterruptionLevelLabel } from '@/server/personalities/constants/interruption-level-labels';
import type { PersonalityListItem } from '@/server/personalities/types';

const NOT_AVAILABLE = 'N/A';

export const speedText = (speed: number | null) => {
  if (speed === null) return NOT_AVAILABLE;
  if (speed <= SPEED_SLOW_MAX) return 'Slow';
  if (speed >= SPEED_FAST_MIN) return 'Fast';
  return 'Normal';
};

export const interruptionText = (item: PersonalityListItem) => {
  if (!item.interruptionLevel) return NOT_AVAILABLE;
  return InterruptionLevelLabel[item.interruptionLevel];
};

export const backgroundNoiseText = (noise: BackgroundNoise) => {
  if (noise === BackgroundNoise.off) return 'disabled';
  return 'enabled';
};

export const accentText = (accent: string | null) => {
  if (!accent) return NOT_AVAILABLE;
  return `${accent.charAt(0).toUpperCase()}${accent.slice(1)}`;
};

export const personalityTitle = (item: PersonalityListItem) => {
  if (item.forkedFromId === null) return item.name;
  return `${item.name}${FORK_TITLE_SUFFIX}`;
};
