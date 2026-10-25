import { BackgroundNoise, InterruptionLevel } from '@/generated/prisma/enums';
import { PERSONALITY_DEFAULTS } from '@/server/personalities/constants/personality-limits';
import type { PersonalityFormValues } from '@/server/personalities/types';

export const DEFAULT_PERSONALITY_VALUES: PersonalityFormValues = {
  name: '',
  prompt: '',
  voiceModel: null,
  voiceId: '',
  voiceVolume: PERSONALITY_DEFAULTS.voiceVolume,
  interruptionLevel: InterruptionLevel.off,
  language: null,
  speed: PERSONALITY_DEFAULTS.speed,
  backgroundNoise: BackgroundNoise.off,
  backgroundNoiseUrl: '',
  backgroundSoundVolumeBase: PERSONALITY_DEFAULTS.backgroundSoundVolumeBase,
  backgroundSoundVolumeReduced:
    PERSONALITY_DEFAULTS.backgroundSoundVolumeReduced,
  packetLossPercent: PERSONALITY_DEFAULTS.packetLossPercent,
  idleTimeoutSeconds: null,
  idleMessageMaxSpokenCount: null,
  startSpeakingWaitSeconds: null,
  stopSpeakingNumWords: null,
  stopSpeakingVoiceSeconds: null,
  stopSpeakingBackoffSeconds: null,
};

export const PERSONALITY_INTRO_CREATE =
  'Configure how the Test Agent should behave and respond to users by defining a custom personality.';

export const PERSONALITY_INTRO_EDIT =
  'Configure how the Test Agent should behave and respond to users.';
