import 'server-only';

import type { Voice } from '@/server/call-engine/audio/synthesize-speech';

export const MAIN_AGENT_VOICE: Voice = { pitchHz: 185, wordsPerSecond: 2.7 };

export const TESTING_AGENT_VOICE: Voice = {
  pitchHz: 170,
  wordsPerSecond: 2.6,
};
