import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
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
    addEventFields({
      project: { id: projectId },
      evaluators: {
        requested_count: evaluatorIds.length,
        deleted_count: count,
      },
    });
    return { count };
  },
);
