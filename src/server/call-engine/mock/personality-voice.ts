import 'server-only';

import type { Voice } from '@/server/call-engine/audio/synthesize-speech';
import type { CallPersonality } from '@/server/call-engine/types';

const QUIET_NOISE_VALUES = ['', 'none', 'no', 'off', 'false'];
const BACKGROUND_NOISE_LEVEL = 0.02;

export const MAIN_AGENT_VOICE: Voice = { pitchHz: 185, wordsPerSecond: 2.7 };

const pitchOf = (gender: string) => {
  const value = gender.toLowerCase();
  if (value.includes('female')) return 210;
  if (value.includes('male')) return 120;
  return 170;
};

const rateOf = (speed: string) => {
  const value = speed.toLowerCase();
  if (value.includes('slow')) return 2.1;
  if (value.includes('fast')) return 3.2;
  return 2.6;
};

export const testingAgentVoice = (personality: CallPersonality): Voice => ({
  pitchHz: pitchOf(personality.gender),
  wordsPerSecond: rateOf(personality.speed),
});

export const isFastCaller = (personality: CallPersonality) =>
  personality.interruptionLevel.toLowerCase().includes('high');

export const backgroundNoiseLevel = (personality: CallPersonality) => {
  if (
    QUIET_NOISE_VALUES.includes(
      personality.backgroundNoise.trim().toLowerCase(),
    )
  )
    return 0;
  return BACKGROUND_NOISE_LEVEL;
};
