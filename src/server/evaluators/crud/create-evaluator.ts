import 'server-only';

import { CreationMethod } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { createEvaluatorSchema } from '@/server/evaluators/schemas/evaluator-fields';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { createEvaluatorRecord } from '@/server/evaluators/utils/write-evaluator';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const createEvaluator = withValidation(
  createEvaluatorSchema,
  async ({ projectId, ...fields }) => {
    const { user } = await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const created = await createEvaluatorRecord(tx, {
        projectId,
        userId: user.id,
        fields,
        creationMethod: CreationMethod.manual,
      });
      await recordEvaluatorVersion(tx, {
        evaluatorId: created.id,
        userId: user.id,
      });
      return { id: created.id, folderPath: fields.folderPath };
    });
  },
);
