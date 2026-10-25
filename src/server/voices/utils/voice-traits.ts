import 'server-only';

import { Gender } from '@/generated/prisma/enums';
import { ELEVENLABS_VOICES } from '@/server/voices/constants/elevenlabs-voices';

export const voiceTraitsOf = (voiceId: string) => {
  const voice = ELEVENLABS_VOICES.find((item) => item.id === voiceId);
  if (!voice) return { gender: Gender.neutral, accent: null };
  return { gender: voice.gender, accent: voice.accent };
};
