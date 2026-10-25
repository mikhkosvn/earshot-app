import 'server-only';

import type { Personality } from '@/generated/prisma/client';
import { BackgroundNoise, InterruptionLevel } from '@/generated/prisma/enums';
import { PERSONALITY_DEFAULTS } from '@/server/personalities/constants/personality-limits';
import type { PersonalityFormValues } from '@/server/personalities/types';
import { voiceTraitsOf } from '@/server/voices/utils/voice-traits';

const withDefault = (value: number | null, fallback: number) => {
  if (value === null) return fallback;
  return value;
};

const noiseUrlOf = (values: PersonalityFormValues) => {
  if (values.backgroundNoise !== BackgroundNoise.custom_url) return null;
  return values.backgroundNoiseUrl;
};

const soundVolumeOf = (values: PersonalityFormValues, volume: number) => {
  if (values.backgroundNoise === BackgroundNoise.off) return null;
  return volume;
};

export const personalityData = (values: PersonalityFormValues) => {
  const traits = voiceTraitsOf(values.voiceId);
  return {
    name: values.name.trim(),
    prompt: values.prompt.trim(),
    voiceModel: values.voiceModel,
    voiceId: values.voiceId.trim(),
    voiceVolume: values.voiceVolume,
    interruptionLevel: values.interruptionLevel,
    language: values.language ?? undefined,
    speed: values.speed,
    gender: traits.gender,
    accent: traits.accent,
    backgroundNoise: values.backgroundNoise,
    backgroundNoiseUrl: noiseUrlOf(values),
    backgroundSoundVolumeBase: soundVolumeOf(
      values,
      values.backgroundSoundVolumeBase,
    ),
    backgroundSoundVolumeReduced: soundVolumeOf(
      values,
      values.backgroundSoundVolumeReduced,
    ),
    packetLossPercent: values.packetLossPercent,
    idleTimeoutSeconds: withDefault(
      values.idleTimeoutSeconds,
      PERSONALITY_DEFAULTS.idleTimeoutSeconds,
    ),
    idleMessageMaxSpokenCount: withDefault(
      values.idleMessageMaxSpokenCount,
      PERSONALITY_DEFAULTS.idleMessageMaxSpokenCount,
    ),
    startSpeakingWaitSeconds: withDefault(
      values.startSpeakingWaitSeconds,
      PERSONALITY_DEFAULTS.startSpeakingWaitSeconds,
    ),
    stopSpeakingNumWords: withDefault(
      values.stopSpeakingNumWords,
      PERSONALITY_DEFAULTS.stopSpeakingNumWords,
    ),
    stopSpeakingVoiceSeconds: values.stopSpeakingVoiceSeconds,
    stopSpeakingBackoffSeconds: withDefault(
      values.stopSpeakingBackoffSeconds,
      PERSONALITY_DEFAULTS.stopSpeakingBackoffSeconds,
    ),
  };
};

export const toPersonalityFormValues = (
  personality: Personality,
): PersonalityFormValues => ({
  name: personality.name,
  prompt: personality.prompt,
  voiceModel: personality.voiceModel,
  voiceId: personality.voiceId ?? '',
  voiceVolume: personality.voiceVolume ?? PERSONALITY_DEFAULTS.voiceVolume,
  interruptionLevel: personality.interruptionLevel ?? InterruptionLevel.off,
  language: personality.language,
  speed: personality.speed ?? PERSONALITY_DEFAULTS.speed,
  backgroundNoise: personality.backgroundNoise,
  backgroundNoiseUrl: personality.backgroundNoiseUrl ?? '',
  backgroundSoundVolumeBase:
    personality.backgroundSoundVolumeBase ??
    PERSONALITY_DEFAULTS.backgroundSoundVolumeBase,
  backgroundSoundVolumeReduced:
    personality.backgroundSoundVolumeReduced ??
    PERSONALITY_DEFAULTS.backgroundSoundVolumeReduced,
  packetLossPercent:
    personality.packetLossPercent ?? PERSONALITY_DEFAULTS.packetLossPercent,
  idleTimeoutSeconds: personality.idleTimeoutSeconds,
  idleMessageMaxSpokenCount: personality.idleMessageMaxSpokenCount,
  startSpeakingWaitSeconds: personality.startSpeakingWaitSeconds,
  stopSpeakingNumWords: personality.stopSpeakingNumWords,
  stopSpeakingVoiceSeconds: personality.stopSpeakingVoiceSeconds,
  stopSpeakingBackoffSeconds: personality.stopSpeakingBackoffSeconds,
});
