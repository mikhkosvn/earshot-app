import 'server-only';

import { ProviderKeyProvider } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { decryptSecret } from '@/server/crypto/decrypt-secret';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { listProviderApiKeysSchema } from '@/server/provider-api-keys/schemas';
import type { ProviderApiKeyState } from '@/server/provider-api-keys/types';
import { maskSecret } from '@/server/provider-api-keys/utils/mask-secret';

export const listProviderApiKeys = withValidation(
  listProviderApiKeysSchema,
  async ({ projectId }): Promise<ProviderApiKeyState[]> => {
    await requireProjectAccess(projectId);
    const records = await prisma.providerApiKey.findMany({
      where: { projectId },
      select: { provider: true, encryptedKey: true, updatedAt: true },
    });
    addEventFields({
      project: { id: projectId },
      provider_keys: { configured_count: records.length },
    });
    const byProvider = new Map(
      records.map((record) => [record.provider, record]),
    );
    return Object.values(ProviderKeyProvider).map((provider) => {
      const record = byProvider.get(provider);
      if (!record) return { provider, maskedKey: null, updatedAt: null };
      return {
        provider,
        maskedKey: maskSecret(decryptSecret(record.encryptedKey)),
        updatedAt: record.updatedAt,
      };
    });
  },
);
