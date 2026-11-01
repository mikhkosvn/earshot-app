import { Gender } from '@/generated/prisma/enums';

export const VoiceGenderLabel: Record<Gender, string | null> = {
  [Gender.male]: 'Masculine',
  [Gender.female]: 'Feminine',
  [Gender.neutral]: null,
};

export const STANDARD_VOICE_LABEL = 'Standard';

export const VOICE_LABEL_SEPARATOR = ' · ';
