import {
  BackgroundNoise,
  InterruptionLevel,
  Language,
  VoiceModel,
} from '@/generated/prisma/enums';
import { LanguageLabel } from '@/server/agents/constants/language-labels';
import { BackgroundNoiseLabel } from '@/server/personalities/constants/background-noise-labels';
import { InterruptionLevelLabel } from '@/server/personalities/constants/interruption-level-labels';
import { VoiceModelLabel } from '@/server/personalities/constants/voice-model-labels';

export const VOICE_MODEL_ITEMS = Object.values(VoiceModel).map((value) => ({
  value,
  label: VoiceModelLabel[value],
}));

export const INTERRUPTION_ITEMS = Object.values(InterruptionLevel).map(
  (value) => ({ value, label: InterruptionLevelLabel[value] }),
);

export const LANGUAGE_ITEMS = Object.values(Language).map((value) => ({
  value,
  label: LanguageLabel[value],
}));

export const BACKGROUND_NOISE_ITEMS = Object.values(BackgroundNoise).map(
  (value) => ({ value, label: BackgroundNoiseLabel[value] }),
);
