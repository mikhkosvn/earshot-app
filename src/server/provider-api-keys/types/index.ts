import type { z } from 'zod';

import type { ProviderKeyProvider } from '@/generated/prisma/enums';
import type {
  deleteProviderApiKeySchema,
  listProviderApiKeysSchema,
  providerApiKeysFormSchema,
  saveProviderApiKeysSchema,
} from '@/server/provider-api-keys/schemas';

export type ListProviderApiKeysInput = z.input<
  typeof listProviderApiKeysSchema
>;
export type SaveProviderApiKeysInput = z.input<
  typeof saveProviderApiKeysSchema
>;
export type DeleteProviderApiKeyInput = z.input<
  typeof deleteProviderApiKeySchema
>;
export type ProviderApiKeysFormValues = z.input<
  typeof providerApiKeysFormSchema
>;

export interface ProviderApiKeyState {
  provider: ProviderKeyProvider;
  maskedKey: string | null;
  updatedAt: Date | null;
}
