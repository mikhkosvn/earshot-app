import 'server-only';

import { ProviderKeyProvider } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { encryptSecret } from '@/server/crypto/encrypt-secret';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { saveProviderApiKeysSchema } from '@/server/provider-api-keys/schemas';

export const saveProviderApiKeys = withValidation(
  saveProviderApiKeysSchema,
  async ({ projectId, keys }) => {
    await requireProjectAccess(projectId);
    const typedKeys = Object.values(ProviderKeyProvider).flatMap((provider) => {
      const value = keys[provider];
      if (!value) return [];
      return [{ provider, encryptedKey: encryptSecret(value) }];
    });
    await prisma.$transaction(
      typedKeys.map(({ provider, encryptedKey }) =>
        prisma.providerApiKey.upsert({
          where: { projectId_provider: { projectId, provider } },
          create: { projectId, provider, encryptedKey },
          update: { encryptedKey },
        }),
      ),
    );
    addEventFields({
      project: { id: projectId },
      provider_keys: {
        providers: typedKeys.map(({ provider }) => provider),
        saved_count: typedKeys.length,
      },
    });
    return { projectId, savedCount: typedKeys.length };
  },
);
