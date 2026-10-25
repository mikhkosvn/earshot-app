import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { evaluatorSelectionSchema } from '@/server/evaluators/schemas/evaluator-bulk';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const deleteEvaluators = withValidation(
  evaluatorSelectionSchema,
  async ({ projectId, evaluatorIds }) => {
    await requireProjectAccess(projectId);
    const { count } = await prisma.evaluator.deleteMany({
      where: { projectId, id: { in: evaluatorIds } },
    });
    return { count };
  },
);
