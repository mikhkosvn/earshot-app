import { z } from 'zod';

import { ProviderKeyProvider } from '@/generated/prisma/enums';

const idSchema = z.number().int().positive();

const providerKeyValueSchema = z
  .string()
  .trim()
  .max(500, 'The key must have 500 or fewer characters.');

export const providerApiKeysFormSchema = z.object({
  keys: z.record(z.enum(ProviderKeyProvider), providerKeyValueSchema),
});

export const listProviderApiKeysSchema = z.object({
  projectId: idSchema,
});

export const saveProviderApiKeysSchema = z.object({
  projectId: idSchema,
  keys: z.partialRecord(z.enum(ProviderKeyProvider), providerKeyValueSchema),
});

export const deleteProviderApiKeySchema = z.object({
  projectId: idSchema,
  provider: z.enum(ProviderKeyProvider),
});
