import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  publicTestProfileSelect,
  toPublicTestProfile,
} from '@/server/test-profiles/public-api/utils/public-test-profile';
import { testProfileScopeWhere } from '@/server/test-profiles/public-api/utils/test-profile-scope-where';

export const getPublicTestProfile = async ({
  auth,
  testProfileId,
}: {
  auth: ApiKeyAuth;
  testProfileId: number;
}) => {
  const row = await prisma.testProfile.findUniqueOrThrow({
    where: { id: testProfileId, ...testProfileScopeWhere(auth) },
    select: publicTestProfileSelect,
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: row.projectId },
    test_profile: { id: row.id },
  });
  return toPublicTestProfile(row);
};
