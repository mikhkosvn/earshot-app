import 'server-only';

import { prisma } from '@/lib/prisma';
import { deleteApiKeySchema } from '@/server/api-keys/schemas';
import { withValidation } from '@/server/common/run-action';
import { requireOrganizationAdmin } from '@/server/organization-settings/utils/require-organization-admin';
import { requireUser } from '@/server/auth';

export const deleteApiKey = withValidation(
  deleteApiKeySchema,
  async ({ apiKeyId }) => {
    const { user } = await requireUser();
    const apiKey = await prisma.apiKey.findUniqueOrThrow({
      where: {
        id: apiKeyId,
        organization: { members: { some: { userId: user.id } } },
      },
      select: { id: true, organizationId: true },
    });
    await requireOrganizationAdmin(apiKey.organizationId);
    await prisma.apiKey.delete({ where: { id: apiKey.id } });
    return { id: apiKey.id };
  },
);
