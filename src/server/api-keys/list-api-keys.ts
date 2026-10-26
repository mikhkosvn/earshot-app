import 'server-only';

import { prisma } from '@/lib/prisma';
import { listApiKeysSchema } from '@/server/api-keys/schemas';
import type { ApiKeyRow } from '@/server/api-keys/types/api-key-row';
import {
  apiKeyRowSelect,
  toApiKeyRow,
} from '@/server/api-keys/utils/to-api-key-row';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireOrganizationAdmin } from '@/server/organization-settings/utils/require-organization-admin';

export const listApiKeys = withValidation(
  listApiKeysSchema,
  async ({ organizationId }): Promise<ApiKeyRow[]> => {
    await requireOrganizationAdmin(organizationId);
    const apiKeys = await prisma.apiKey.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'asc' },
      select: apiKeyRowSelect,
    });
    addEventFields({
      organization: { id: organizationId },
      api_keys: { count: apiKeys.length },
    });
    return apiKeys.map(toApiKeyRow);
  },
);
