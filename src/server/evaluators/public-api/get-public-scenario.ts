import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  publicScenarioSelect,
  toPublicScenario,
} from '@/server/evaluators/public-api/utils/public-scenario';
import { scenarioScopeWhere } from '@/server/evaluators/public-api/utils/scenario-scope-where';

export const getPublicScenario = async ({
  auth,
  scenarioId,
}: {
  auth: ApiKeyAuth;
  scenarioId: number;
}) => {
  const row = await prisma.evaluator.findUniqueOrThrow({
    where: { id: scenarioId, ...scenarioScopeWhere(auth) },
    select: publicScenarioSelect,
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: row.projectId },
    evaluator: { id: row.id },
  });
  return toPublicScenario(row);
};
