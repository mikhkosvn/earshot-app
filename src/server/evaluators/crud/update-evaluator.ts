import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { updateEvaluatorSchema } from '@/server/evaluators/schemas/evaluator-fields';
import { evaluatorAccessWhere } from '@/server/evaluators/utils/evaluator-access-where';
import { toEvaluatorDetail } from '@/server/evaluators/utils/evaluator-detail';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { updateEvaluatorRecord } from '@/server/evaluators/utils/write-evaluator';

export const updateEvaluator = withValidation(
  updateEvaluatorSchema,
  async ({ evaluatorId, ...fields }) => {
    const { user } = await requireUser();
    return prisma.$transaction(async (tx) => {
      const evaluator = await tx.evaluator.findUniqueOrThrow({
        where: { id: evaluatorId, ...evaluatorAccessWhere(user.id) },
        select: { projectId: true },
      });
      await updateEvaluatorRecord(tx, {
        projectId: evaluator.projectId,
        evaluatorId,
        userId: user.id,
        fields,
      });
      const row = await recordEvaluatorVersion(tx, {
        evaluatorId,
        userId: user.id,
      });
      return toEvaluatorDetail(row);
    });
  },
);
