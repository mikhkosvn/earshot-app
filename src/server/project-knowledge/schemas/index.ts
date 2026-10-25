import { z } from 'zod';

const idSchema = z.number().int().positive();

export const projectKnowledgeContentSchema = z.object({
  content: z
    .string()
    .max(20000, 'The instructions must have 20000 or fewer characters.'),
});

export const projectKnowledgeIdSchema = z.object({
  projectId: idSchema,
});

export const saveProjectKnowledgeSchema = projectKnowledgeContentSchema.extend({
  projectId: idSchema,
});
