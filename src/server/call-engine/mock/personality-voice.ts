import 'server-only';

import { BackgroundNoise, InterruptionLevel } from '@/generated/prisma/enums';
import type { Voice } from '@/server/call-engine/audio/synthesize-speech';
import type { CallerSetup } from '@/server/call-engine/types';

const BACKGROUND_NOISE_LEVEL = 0.02;
const CALLER_PITCH_HZ = 170;
const CALLER_WORDS_PER_SECOND = 2.6;
const NORMAL_SPEED = 1;

export const MAIN_AGENT_VOICE: Voice = { pitchHz: 185, wordsPerSecond: 2.7 };

export const testingAgentVoice = (caller: CallerSetup): Voice => ({
  pitchHz: CALLER_PITCH_HZ,
  wordsPerSecond: CALLER_WORDS_PER_SECOND * (caller.speed ?? NORMAL_SPEED),
});

export const isFastCaller = (caller: CallerSetup) =>
  caller.interruption_level === InterruptionLevel.high;

export const backgroundNoiseLevel = (caller: CallerSetup) => {
  if (caller.background_noise === BackgroundNoise.off) return 0;
  return BACKGROUND_NOISE_LEVEL;
};
