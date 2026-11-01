import { Language } from '@/generated/prisma/enums';

import { DEFAULT_LIVE_VOICE } from '@/server/personalities/constants/live-voices';

export const DEFAULT_PERSONALITY = {
  name: 'Default caller',
  prompt:
    'You are a calm, polite adult who calls a business by phone. You speak in short, natural sentences. You give one piece of information at a time. You wait for the agent to finish before you answer.',
  language: Language.en,
  voice: DEFAULT_LIVE_VOICE,
} as const;
