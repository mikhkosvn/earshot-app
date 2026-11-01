import { Gender, Language, LiveVoice } from '@/generated/prisma/enums';

export interface LiveVoiceTraits {
  language: Language;
  accent: string | null;
  gender: Gender;
}

export const DEFAULT_LIVE_VOICE = LiveVoice.marin;

export const LIVE_VOICE_TRAITS: Record<LiveVoice, LiveVoiceTraits> = {
  [LiveVoice.marin]: {
    language: Language.en,
    accent: null,
    gender: Gender.neutral,
  },
  [LiveVoice.quartz]: {
    language: Language.en,
    accent: 'Australian',
    gender: Gender.female,
  },
  [LiveVoice.ripple]: {
    language: Language.en,
    accent: 'Australian',
    gender: Gender.male,
  },
  [LiveVoice.vesper]: {
    language: Language.en,
    accent: 'British',
    gender: Gender.male,
  },
  [LiveVoice.willow]: {
    language: Language.en,
    accent: 'Irish',
    gender: Gender.female,
  },
  [LiveVoice.stone]: {
    language: Language.en,
    accent: 'Irish',
    gender: Gender.male,
  },
  [LiveVoice.gleam]: {
    language: Language.en,
    accent: 'North American',
    gender: Gender.female,
  },
  [LiveVoice.meridian]: {
    language: Language.en,
    accent: 'North American',
    gender: Gender.male,
  },
  [LiveVoice.bossa]: {
    language: Language.pt,
    accent: 'Brazilian',
    gender: Gender.female,
  },
  [LiveVoice.tempo]: {
    language: Language.pt,
    accent: 'Brazilian',
    gender: Gender.male,
  },
  [LiveVoice.beacon]: {
    language: Language.en,
    accent: 'Filipino',
    gender: Gender.male,
  },
  [LiveVoice.delta]: {
    language: Language.en,
    accent: 'Southern U.S.',
    gender: Gender.female,
  },
  [LiveVoice.cinder]: {
    language: Language.en,
    accent: 'Southern U.S.',
    gender: Gender.male,
  },
  [LiveVoice.nuri]: {
    language: Language.de,
    accent: null,
    gender: Gender.female,
  },
  [LiveVoice.juni]: {
    language: Language.de,
    accent: null,
    gender: Gender.female,
  },
  [LiveVoice.flitz]: {
    language: Language.de,
    accent: null,
    gender: Gender.male,
  },
  [LiveVoice.brise]: {
    language: Language.fr,
    accent: null,
    gender: Gender.female,
  },
  [LiveVoice.sillage]: {
    language: Language.fr,
    accent: null,
    gender: Gender.male,
  },
  [LiveVoice.nira]: {
    language: Language.hi,
    accent: null,
    gender: Gender.female,
  },
  [LiveVoice.harema]: {
    language: Language.ja,
    accent: null,
    gender: Gender.female,
  },
  [LiveVoice.shida]: {
    language: Language.ja,
    accent: null,
    gender: Gender.male,
  },
  [LiveVoice.noeul]: {
    language: Language.ko,
    accent: null,
    gender: Gender.female,
  },
};
