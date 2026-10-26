import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { moveEvaluatorsSchema } from '@/server/evaluators/schemas/evaluator-bulk';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { findFolderOrThrow } from '@/server/folders/utils/find-folder';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const moveEvaluators = withValidation(
  moveEvaluatorsSchema,
  async ({ projectId, evaluatorIds, folderPath }) => {
    const { user } = await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const folder = await findFolderOrThrow(tx, projectId, folderPath);
      const evaluators = await tx.evaluator.findMany({
        where: {
          projectId,
          id: { in: evaluatorIds },
          NOT: { folderId: folder.id },
        },
        select: { id: true },
      });
      for (const evaluator of evaluators) {
        await tx.evaluator.update({
          where: { id: evaluator.id },
          data: { folderId: folder.id, updatedById: user.id },
        });
        await recordEvaluatorVersion(tx, {
          evaluatorId: evaluator.id,
          userId: user.id,
          changeReason: `Moved to ${folder.path}`,
        });
      }
      addEventFields({
        project: { id: projectId },
        folder: { id: folder.id },
        evaluators: {
          requested_count: evaluatorIds.length,
          updated_count: evaluators.length,
        },
      });
      return { count: evaluators.length, folderPath: folder.path };
    });
  },
);
