import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { duplicateEvaluatorsSchema } from '@/server/evaluators/schemas/evaluator-bulk';
import { copyEvaluators } from '@/server/evaluators/utils/copy-evaluator';
import { assertEvaluatorReferences } from '@/server/evaluators/utils/resolve-evaluator-references';
import { findFolderOrThrow } from '@/server/folders/utils/find-folder';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const duplicateEvaluators = withValidation(
  duplicateEvaluatorsSchema,
  async ({ projectId, evaluatorIds, targetProjectId, agentId, folderPath }) => {
    const { user } = await requireProjectAccess(projectId);
    await requireProjectAccess(targetProjectId);
    return prisma.$transaction(async (tx) => {
      await assertEvaluatorReferences(tx, {
        projectId: targetProjectId,
        agentId,
      });
      const folder = await findFolderOrThrow(tx, targetProjectId, folderPath);
      const createdIds = await copyEvaluators(
        tx,
        { projectId, id: { in: evaluatorIds } },
        {
          projectId: targetProjectId,
          folderId: folder.id,
          agentId,
          userId: user.id,
        },
      );
      return { count: createdIds.length, evaluatorIds: createdIds };
    });
  },
);
