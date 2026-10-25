import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { createTestProfileSchema } from '@/server/test-profiles/schemas';
import { assertAgentInProject } from '@/server/test-profiles/utils/assert-agent-in-project';
import { generatedTestProfileName } from '@/server/test-profiles/utils/test-profile-names';
import {
  testProfileViewSelect,
  toTestProfileView,
} from '@/server/test-profiles/utils/test-profile-view';
import { toVariableRows } from '@/server/test-profiles/utils/variable-rows';

export const createTestProfile = withValidation(
  createTestProfileSchema,
  async ({
    projectId,
    name,
    agentId,
    mainAgentVariables,
    testingAgentVariables,
  }) => {
    const { user } = await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      await assertAgentInProject(tx, projectId, agentId);
      const row = await tx.testProfile.create({
        data: {
          projectId,
          agentId,
          name: name || generatedTestProfileName(agentId),
          createdById: user.id,
          updatedById: user.id,
          variables: {
            create: toVariableRows(mainAgentVariables, testingAgentVariables),
          },
        },
        select: testProfileViewSelect,
      });
      return toTestProfileView(row);
    });
  },
);
