import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { deleteProviderApiKeySchema } from '@/server/provider-api-keys/schemas';

export const deleteProviderApiKey = withValidation(
  deleteProviderApiKeySchema,
  async ({ projectId, provider }) => {
    await requireProjectAccess(projectId);
    await prisma.providerApiKey.delete({
      where: { projectId_provider: { projectId, provider } },
    });
    return { projectId, provider };
  },
);
