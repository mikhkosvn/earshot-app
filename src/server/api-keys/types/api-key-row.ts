import type { z } from 'zod';

import type {
  createApiKeySchema,
  deleteApiKeySchema,
  listApiKeysSchema,
} from '@/server/api-keys/schemas';

export type ListApiKeysInput = z.input<typeof listApiKeysSchema>;
export type CreateApiKeyInput = z.input<typeof createApiKeySchema>;
export type DeleteApiKeyInput = z.input<typeof deleteApiKeySchema>;

export type ApiKeyRow = {
  id: number;
  name: string;
  maskedKey: string;
  projectId: number | null;
  projectName: string | null;
  createdAt: Date;
};

export type CreatedApiKey = {
  apiKey: ApiKeyRow;
  plainKey: string;
};
