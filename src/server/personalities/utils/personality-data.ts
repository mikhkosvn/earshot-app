import 'server-only';

import type { Personality } from '@/generated/prisma/client';
import { LIVE_VOICE_TRAITS } from '@/server/personalities/constants/live-voices';
import type { PersonalityFormValues } from '@/server/personalities/types';

export const personalityData = (values: PersonalityFormValues) => {
  const traits = LIVE_VOICE_TRAITS[values.voice];
  return {
    name: values.name.trim(),
    prompt: values.prompt.trim(),
    voice: values.voice,
    language: values.language,
    accent: traits.accent,
    gender: traits.gender,
  };
};

export const toPersonalityFormValues = (
  personality: Personality,
): PersonalityFormValues => ({
  name: personality.name,
  prompt: personality.prompt,
  voice: personality.voice,
  language: personality.language,
});
