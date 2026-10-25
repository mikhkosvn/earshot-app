import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { listTestProfilesSchema } from '@/server/test-profiles/schemas';
import {
  testProfileViewSelect,
  toTestProfileView,
} from '@/server/test-profiles/utils/test-profile-view';

export const listTestProfiles = withValidation(
  listTestProfilesSchema,
  async ({ projectId, agentId }) => {
    await requireProjectAccess(projectId);
    const rows = await prisma.testProfile.findMany({
      where: { projectId, ...(agentId !== null && { agentId }) },
      select: testProfileViewSelect,
      orderBy: [
        { createdAt: Prisma.SortOrder.desc },
        { id: Prisma.SortOrder.desc },
      ],
    });
    return rows.map(toTestProfileView);
  },
);
