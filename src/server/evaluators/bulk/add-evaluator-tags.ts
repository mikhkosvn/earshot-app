import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { addEvaluatorTagsSchema } from '@/server/evaluators/schemas/evaluator-bulk';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { upsertTags } from '@/server/tags/utils/upsert-tags';

export const addEvaluatorTags = withValidation(
  addEvaluatorTagsSchema,
  async ({ projectId, evaluatorIds, tags }) => {
    const { user } = await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const evaluators = await tx.evaluator.findMany({
        where: { projectId, id: { in: evaluatorIds } },
        select: { id: true },
      });
      const tagIds = await upsertTags(tx, projectId, tags);
      for (const evaluator of evaluators) {
        await tx.evaluatorTag.createMany({
          data: tagIds.map((tagId) => ({ evaluatorId: evaluator.id, tagId })),
          skipDuplicates: true,
        });
        await tx.evaluator.update({
          where: { id: evaluator.id },
          data: { updatedById: user.id },
        });
        await recordEvaluatorVersion(tx, {
          evaluatorId: evaluator.id,
          userId: user.id,
          changeReason: 'Tags added',
        });
      }
      addEventFields({
        project: { id: projectId },
        evaluators: {
          requested_count: evaluatorIds.length,
          updated_count: evaluators.length,
        },
        tags: { count: tagIds.length },
      });
      return { count: evaluators.length };
    });
  },
);
