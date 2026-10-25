import { z } from 'zod';

const idSchema = z.number().int().positive();

export const listSavedViewsSchema = z.object({
  projectId: idSchema,
});

export const createSavedViewSchema = z.object({
  projectId: idSchema,
  name: z
    .string()
    .trim()
    .min(1, 'Enter a view name.')
    .max(200, 'The view name must have 200 or fewer characters.'),
  agentIds: z.array(idSchema),
});
