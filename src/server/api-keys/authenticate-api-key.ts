import 'server-only';

import { prisma } from '@/lib/prisma';
import { API_KEY_HEADER, API_KEY_PREFIX } from '@/server/api-keys/constants';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { hashApiKey } from '@/server/api-keys/utils/hash-api-key';

export const authenticateApiKey = async (
  request: Request,
): Promise<ApiKeyAuth | null> => {
  const plainKey = request.headers.get(API_KEY_HEADER)?.trim();
  if (!plainKey?.startsWith(API_KEY_PREFIX)) return null;
  const apiKey = await prisma.apiKey.findUnique({
    where: { keyHash: hashApiKey(plainKey) },
    select: { id: true, organizationId: true, projectId: true },
  });
  if (!apiKey) return null;
  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });
  return { organizationId: apiKey.organizationId, projectId: apiKey.projectId };
};
