import 'server-only';

import { prisma } from '@/lib/prisma';
import { generateApiKey } from '@/server/api-keys/generate-api-key';
import { createApiKeySchema } from '@/server/api-keys/schemas';
import type { CreatedApiKey } from '@/server/api-keys/types/api-key-row';
import {
  apiKeyRowSelect,
  toApiKeyRow,
} from '@/server/api-keys/utils/to-api-key-row';
import { withValidation } from '@/server/common/run-action';
import { requireOrganizationAdmin } from '@/server/organization-settings/utils/require-organization-admin';

export const createApiKey = withValidation(
  createApiKeySchema,
  async ({ organizationId, name, projectId }): Promise<CreatedApiKey> => {
    const { user } = await requireOrganizationAdmin(organizationId);
    if (projectId !== null) {
      await prisma.project.findUniqueOrThrow({
        where: { id: projectId, organizationId },
        select: { id: true },
      });
    }
    const { plainKey, keyPrefix, keyHash } = generateApiKey();
    const apiKey = await prisma.apiKey.create({
      data: {
        organizationId,
        projectId,
        name,
        keyPrefix,
        keyHash,
        createdById: user.id,
      },
      select: apiKeyRowSelect,
    });
    return { apiKey: toApiKeyRow(apiKey), plainKey };
  },
);
