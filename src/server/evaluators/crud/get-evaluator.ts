import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { getEvaluatorSchema } from '@/server/evaluators/schemas/evaluator-fields';
import { evaluatorAccessWhere } from '@/server/evaluators/utils/evaluator-access-where';
import {
  evaluatorDetailSelect,
  toEvaluatorDetail,
} from '@/server/evaluators/utils/evaluator-detail';

export const getEvaluator = withValidation(
  getEvaluatorSchema,
  async ({ evaluatorId }) => {
    const { user } = await requireUser();
    const row = await prisma.evaluator.findUniqueOrThrow({
      where: { id: evaluatorId, ...evaluatorAccessWhere(user.id) },
      select: evaluatorDetailSelect,
    });
    addEventFields({ evaluator: { id: evaluatorId } });
    return toEvaluatorDetail(row);
  },
);
