import { Language } from '@/generated/prisma/enums';
import { DEFAULT_LIVE_VOICE } from '@/server/personalities/constants/live-voices';
import type { PersonalityFormValues } from '@/server/personalities/types';

export const DEFAULT_PERSONALITY_VALUES: PersonalityFormValues = {
  name: '',
  prompt: '',
  voice: DEFAULT_LIVE_VOICE,
  language: Language.en,
};

export const PERSONALITY_INTRO_CREATE =
  'Configure how the Test Agent should behave and respond to users by defining a custom personality.';

export const PERSONALITY_INTRO_EDIT =
  'Configure how the Test Agent should behave and respond to users.';
