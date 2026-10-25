import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { testProfileIdSchema } from '@/server/test-profiles/schemas';
import { testProfileAccessWhere } from '@/server/test-profiles/utils/test-profile-access-where';
import { copyTestProfileName } from '@/server/test-profiles/utils/test-profile-names';
import {
  testProfileViewSelect,
  toTestProfileView,
} from '@/server/test-profiles/utils/test-profile-view';

export const duplicateTestProfile = withValidation(
  testProfileIdSchema,
  async ({ testProfileId }) => {
    const { user } = await requireUser();
    const source = await prisma.testProfile.findUniqueOrThrow({
      where: { id: testProfileId, ...testProfileAccessWhere(user.id) },
      select: {
        projectId: true,
        agentId: true,
        name: true,
        variables: {
          select: { side: true, key: true, value: true, position: true },
        },
      },
    });
    const row = await prisma.testProfile.create({
      data: {
        projectId: source.projectId,
        agentId: source.agentId,
        name: copyTestProfileName(source.name),
        createdById: user.id,
        updatedById: user.id,
        variables: { create: source.variables },
      },
      select: testProfileViewSelect,
    });
    addEventFields({
      project: { id: source.projectId },
      agent: { id: source.agentId },
      test_profile: {
        id: row.id,
        source_id: testProfileId,
        variable_count: source.variables.length,
      },
    });
    return toTestProfileView(row);
  },
);
