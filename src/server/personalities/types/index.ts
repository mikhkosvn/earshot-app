import type { z } from 'zod';

import type {
  BackgroundNoise,
  Gender,
  InterruptionLevel,
  Language,
} from '@/generated/prisma/enums';
import type {
  createPersonalitySchema,
  forkPersonalitySchema,
  listPersonalitiesSchema,
  personalityFormSchema,
  personalityIdSchema,
  personalityLanguageFilterSchema,
  setPersonalitiesEnabledSchema,
  setPersonalityEnabledSchema,
  updatePersonalitySchema,
} from '@/server/personalities/schemas';

export type PersonalityLanguageFilter = z.input<
  typeof personalityLanguageFilterSchema
>;
export type ListPersonalitiesInput = z.input<typeof listPersonalitiesSchema>;
export type PersonalityIdInput = z.input<typeof personalityIdSchema>;
export type PersonalityFormValues = z.input<typeof personalityFormSchema>;
export type CreatePersonalityInput = z.input<typeof createPersonalitySchema>;
export type UpdatePersonalityInput = z.input<typeof updatePersonalitySchema>;
export type ForkPersonalityInput = z.input<typeof forkPersonalitySchema>;
export type SetPersonalityEnabledInput = z.input<
  typeof setPersonalityEnabledSchema
>;
export type SetPersonalitiesEnabledInput = z.input<
  typeof setPersonalitiesEnabledSchema
>;

export type PersonalityListItem = {
  id: number;
  name: string;
  description: string;
  language: Language;
  accent: string | null;
  gender: Gender;
  isStarred: boolean;
  isGlobal: boolean;
  forkedFromId: number | null;
  backgroundNoise: BackgroundNoise;
  interruptionLevel: InterruptionLevel | null;
  speed: number | null;
  enabled: boolean;
  createdAt: Date;
};

export type PersonalityDetail = {
  id: number;
  name: string;
  isGlobal: boolean;
  values: PersonalityFormValues;
};

export type PersonalityRef = {
  id: number;
};
