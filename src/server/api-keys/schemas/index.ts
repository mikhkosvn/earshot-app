import { z } from 'zod';

const idSchema = z.number().int().positive();

export const listApiKeysSchema = z.object({
  organizationId: idSchema,
});

export const apiKeyNameSchema = z
  .string()
  .trim()
  .min(1, 'Enter a name for the API key.')
  .max(100, 'The name must have 100 or fewer characters.');

export const createApiKeySchema = z.object({
  organizationId: idSchema,
  name: apiKeyNameSchema,
  projectId: idSchema.nullable(),
});

export const deleteApiKeySchema = z.object({
  apiKeyId: idSchema,
});
