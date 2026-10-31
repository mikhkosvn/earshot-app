import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { testProfileScopeWhere } from '@/server/test-profiles/public-api/utils/test-profile-scope-where';

export const deletePublicTestProfile = async ({
  auth,
  testProfileId,
}: {
  auth: ApiKeyAuth;
  testProfileId: number;
}) => {
  const row = await prisma.testProfile.findUniqueOrThrow({
    where: { id: testProfileId, ...testProfileScopeWhere(auth) },
    select: { id: true, projectId: true },
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: row.projectId },
    test_profile: { id: row.id },
  });
  await prisma.testProfile.delete({ where: { id: row.id } });
};
