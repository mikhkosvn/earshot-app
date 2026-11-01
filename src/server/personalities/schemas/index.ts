import { z } from 'zod';

import { Language, LiveVoice } from '@/generated/prisma/enums';
import { ALL_LANGUAGES } from '@/server/personalities/constants/personality-filters';

const idSchema = z.number().int().positive();

export const personalityLanguageFilterSchema = z.union([
  z.enum(Language),
  z.literal(ALL_LANGUAGES),
]);

export const listPersonalitiesSchema = z.object({
  projectId: idSchema,
  language: personalityLanguageFilterSchema,
});

export const personalityIdSchema = z.object({ personalityId: idSchema });

export const personalityFormSchema = z.object({
  name: z.string().trim().min(1, 'Enter a personality name.').max(255),
  prompt: z.string().trim().min(1, 'Enter a personality prompt.'),
  voice: z.enum(LiveVoice, { error: 'Select a voice.' }),
  language: z.enum(Language, { error: 'Select a language.' }),
});

export const createPersonalitySchema = z.object({
  projectId: idSchema,
  values: personalityFormSchema,
});

export const updatePersonalitySchema = z.object({
  personalityId: idSchema,
  values: personalityFormSchema,
});

export const forkPersonalitySchema = z.object({
  projectId: idSchema,
  personalityId: idSchema,
});

export const setPersonalityEnabledSchema = z.object({
  projectId: idSchema,
  personalityId: idSchema,
  enabled: z.boolean(),
});

export const setPersonalitiesEnabledSchema = z.object({
  projectId: idSchema,
  language: personalityLanguageFilterSchema,
  enabled: z.boolean(),
});
