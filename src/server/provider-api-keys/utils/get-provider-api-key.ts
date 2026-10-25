import 'server-only';

import type { ProviderKeyProvider } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { decryptSecret } from '@/server/crypto/decrypt-secret';

type ProviderApiKeyRef = {
  projectId: number;
  provider: ProviderKeyProvider;
};

export const getProviderApiKey = async ({
  projectId,
  provider,
}: ProviderApiKeyRef) => {
  const record = await prisma.providerApiKey.findUnique({
    where: { projectId_provider: { projectId, provider } },
    select: { encryptedKey: true },
  });
  if (!record) return null;
  return decryptSecret(record.encryptedKey);
};
