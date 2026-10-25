import { Gender, VoiceModel } from '@/generated/prisma/enums';

export type CatalogVoice = {
  id: string;
  name: string;
  traits: string;
  gender: Gender;
  accent: string;
};

export const ELEVENLABS_VOICE_MODELS: VoiceModel[] = [
  VoiceModel.eleven_multilingual_v2,
  VoiceModel.eleven_turbo_v2_5,
  VoiceModel.eleven_flash_v2_5,
  VoiceModel.eleven_v3_conversational,
];

export const ELEVENLABS_VOICES: CatalogVoice[] = [
  {
    id: 'hpp4J3VqNfWAUOO0d1Us',
    name: 'Bella',
    traits: 'Professional, Bright, Warm',
    gender: Gender.female,
    accent: 'american',
  },
  {
    id: 'CwhRBWXzGAHq8TQ4Fs17',
    name: 'Roger',
    traits: 'Laid-Back, Casual, Resonant',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Sarah',
    traits: 'Mature, Reassuring, Confident',
    gender: Gender.female,
    accent: 'american',
  },
  {
    id: 'FGY2WhTYpPnrIDTdsKH5',
    name: 'Laura',
    traits: 'Enthusiast, Quirky Attitude',
    gender: Gender.female,
    accent: 'american',
  },
  {
    id: 'IKne3meq5aSn9XLyUdCD',
    name: 'Charlie',
    traits: 'Deep, Confident, Energetic',
    gender: Gender.male,
    accent: 'australian',
  },
  {
    id: 'JBFqnCBsd6RMkjVDRZzb',
    name: 'George',
    traits: 'Warm, Captivating Storyteller',
    gender: Gender.male,
    accent: 'british',
  },
  {
    id: 'N2lVS1w4EtoT3dr4eOWO',
    name: 'Callum',
    traits: 'Husky Trickster',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'SAz9YHcvj6GT2YYXdXww',
    name: 'River',
    traits: 'Relaxed, Neutral, Informative',
    gender: Gender.neutral,
    accent: 'american',
  },
  {
    id: 'SOYHLrjzK2X1ezoPC6cr',
    name: 'Harry',
    traits: 'Fierce Warrior',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'TX3LPaxmHKxFdv7VOQHJ',
    name: 'Liam',
    traits: 'Energetic, Social Media Creator',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'Xb7hH8MSUJpSbSDYk0k2',
    name: 'Alice',
    traits: 'Clear, Engaging Educator',
    gender: Gender.female,
    accent: 'british',
  },
  {
    id: 'XrExE9yKIg1WjnnlVkGX',
    name: 'Matilda',
    traits: 'Knowledgable, Professional',
    gender: Gender.female,
    accent: 'american',
  },
  {
    id: 'bIHbv24MWmeRgasZH58o',
    name: 'Will',
    traits: 'Relaxed Optimist',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'cgSgspJ2msm6clMCkdW9',
    name: 'Jessica',
    traits: 'Playful, Bright, Warm',
    gender: Gender.female,
    accent: 'american',
  },
  {
    id: 'cjVigY5qzO86Huf0OWal',
    name: 'Eric',
    traits: 'Smooth, Trustworthy',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'iP95p4xoKVk53GoZ742B',
    name: 'Chris',
    traits: 'Charming, Down-to-Earth',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'nPczCjzI2devNBz1zQrb',
    name: 'Brian',
    traits: 'Deep, Resonant and Comforting',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'onwK4e9ZLuTAKqWW03F9',
    name: 'Daniel',
    traits: 'Steady Broadcaster',
    gender: Gender.male,
    accent: 'british',
  },
  {
    id: 'pFZP5JQG7iQjIQuC4Bku',
    name: 'Lily',
    traits: 'Velvety Actress',
    gender: Gender.female,
    accent: 'british',
  },
  {
    id: 'pNInz6obpgDQGcFmaJgB',
    name: 'Adam',
    traits: 'Dominant, Firm',
    gender: Gender.male,
    accent: 'american',
  },
  {
    id: 'pqHfZKP75CvOlQylNhV4',
    name: 'Bill',
    traits: 'Wise, Mature, Balanced',
    gender: Gender.male,
    accent: 'american',
  },
];

export const CLONE_SAMPLE_EXTENSIONS = [
  '.wav',
  '.mp3',
  '.m4a',
  '.ogg',
  '.webm',
  '.flac',
];

export const CLONE_SAMPLE_MAX_BYTES = 25 * 1024 * 1024;
