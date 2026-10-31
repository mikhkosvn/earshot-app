import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { scenarioScopeWhere } from '@/server/evaluators/public-api/utils/scenario-scope-where';

export const deletePublicScenario = async ({
  auth,
  scenarioId,
}: {
  auth: ApiKeyAuth;
  scenarioId: number;
}) => {
  const row = await prisma.evaluator.findUniqueOrThrow({
    where: { id: scenarioId, ...scenarioScopeWhere(auth) },
    select: { id: true, projectId: true },
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: row.projectId },
    evaluator: { id: row.id },
  });
  await prisma.evaluator.delete({ where: { id: row.id } });
};
