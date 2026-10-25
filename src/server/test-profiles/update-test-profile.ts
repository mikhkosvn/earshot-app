import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { updateTestProfileSchema } from '@/server/test-profiles/schemas';
import { assertAgentInProject } from '@/server/test-profiles/utils/assert-agent-in-project';
import { testProfileAccessWhere } from '@/server/test-profiles/utils/test-profile-access-where';
import {
  testProfileViewSelect,
  toTestProfileView,
} from '@/server/test-profiles/utils/test-profile-view';
import { toVariableRows } from '@/server/test-profiles/utils/variable-rows';

export const updateTestProfile = withValidation(
  updateTestProfileSchema,
  async ({
    testProfileId,
    name,
    agentId,
    mainAgentVariables,
    testingAgentVariables,
  }) => {
    const { user } = await requireUser();
    return prisma.$transaction(async (tx) => {
      const profile = await tx.testProfile.findUniqueOrThrow({
        where: { id: testProfileId, ...testProfileAccessWhere(user.id) },
        select: {
          projectId: true,
          agentId: true,
          name: true,
          _count: { select: { evaluators: true } },
        },
      });
      addEventFields({
        project: { id: profile.projectId },
        agent: { id: agentId },
        test_profile: {
          id: testProfileId,
          agent_changed: agentId !== profile.agentId,
          evaluator_count: profile._count.evaluators,
        },
      });
      await assertAgentInProject(tx, profile.projectId, agentId);
      if (agentId !== profile.agentId && profile._count.evaluators > 0) {
        throw new ActionError(
          'Evaluators use this test profile. Remove it from them before you change its agent.',
        );
      }
      await tx.testProfileVariable.deleteMany({ where: { testProfileId } });
      const row = await tx.testProfile.update({
        where: { id: testProfileId },
        data: {
          agentId,
          name: name || profile.name,
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
