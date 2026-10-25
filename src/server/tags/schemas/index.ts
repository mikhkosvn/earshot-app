import { z } from 'zod';

export const TAG_MAX_LENGTH = 50;

export const tagNameSchema = z
  .string()
  .trim()
  .min(1, 'The tag is empty.')
  .max(TAG_MAX_LENGTH, `A tag must be ${TAG_MAX_LENGTH} characters or fewer.`);

export const tagListSchema = z.array(tagNameSchema);

export const listTagsSchema = z.object({
  projectId: z.number().int().positive(),
});
