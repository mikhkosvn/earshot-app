import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { agentScopeSchema } from '@/server/evaluators/schemas/evaluator-fields';
import { getAgentEvaluatorDefaults } from '@/server/evaluators/utils/agent-evaluator-defaults';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getAgentDefaults = withValidation(
  agentScopeSchema,
  async ({ projectId, agentId }) => {
    await requireProjectAccess(projectId);
    addEventFields({ project: { id: projectId }, agent: { id: agentId } });
    return prisma.$transaction((tx) =>
      getAgentEvaluatorDefaults(tx, projectId, agentId),
    );
  },
);
