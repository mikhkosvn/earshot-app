import { type Language, LiveVoice } from '@/generated/prisma/enums';
import { LanguageLabel } from '@/server/agents/constants/language-labels';
import { LIVE_VOICE_TRAITS } from '@/server/personalities/constants/live-voices';

import {
  STANDARD_VOICE_LABEL,
  VOICE_LABEL_SEPARATOR,
  VoiceGenderLabel,
} from '../_constants/voice-gender-labels';

const voiceTraitParts = (voice: LiveVoice) => {
  const traits = LIVE_VOICE_TRAITS[voice];
  const parts = [traits.accent, VoiceGenderLabel[traits.gender]].filter(
    (part): part is string => part !== null,
  );
  if (parts.length === 0) return [STANDARD_VOICE_LABEL];
  return parts;
};

export const voiceLabel = (voice: LiveVoice) =>
  [
    voice,
    LanguageLabel[LIVE_VOICE_TRAITS[voice].language],
    ...voiceTraitParts(voice),
  ].join(VOICE_LABEL_SEPARATOR);

export const voiceItems = (language: Language) => {
  const voices = Object.values(LiveVoice);
  const matching = voices.filter(
    (voice) => LIVE_VOICE_TRAITS[voice].language === language,
  );
  const rest = voices.filter(
    (voice) => LIVE_VOICE_TRAITS[voice].language !== language,
  );
  return [...matching, ...rest].map((voice) => ({
    value: voice,
    label: voiceLabel(voice),
  }));
};
