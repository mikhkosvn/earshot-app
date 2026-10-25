import { z } from 'zod';

import { ApiKeyLevel } from '@/server/api-keys/constants/api-key-level';
import { apiKeyNameSchema } from '@/server/api-keys/schemas';

export const createApiKeyFormSchema = z.object({
  name: apiKeyNameSchema,
  level: z.enum(ApiKeyLevel),
});

export type CreateApiKeyFormValues = z.input<typeof createApiKeyFormSchema>;
