import { Gender } from '@/generated/prisma/enums';

export const GenderLabel: Record<Gender, string> = {
  [Gender.male]: 'Male',
  [Gender.female]: 'Female',
  [Gender.neutral]: 'Neutral',
};
