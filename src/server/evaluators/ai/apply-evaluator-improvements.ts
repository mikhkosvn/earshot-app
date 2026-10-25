import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';
import { applyEvaluatorImprovementsSchema } from '@/server/evaluators/schemas/evaluator-ai';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const changeData = (kind: EvaluatorTextKind, value: string) => {
  if (kind === EvaluatorTextKind.expectedOutcome) {
    return { expectedOutcomePrompt: value };
  }
  return { instructions: value };
};

export const applyEvaluatorImprovements = withValidation(
  applyEvaluatorImprovementsSchema,
  async ({ projectId, changes }) => {
    const { user } = await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const updatedIds = new Set<number>();
      for (const change of changes) {
        const { count } = await tx.evaluator.updateMany({
          where: { id: change.evaluatorId, projectId },
          data: {
            ...changeData(change.kind, change.value),
            updatedById: user.id,
          },
        });
        if (count > 0) updatedIds.add(change.evaluatorId);
      }
      for (const evaluatorId of updatedIds) {
        await recordEvaluatorVersion(tx, {
          evaluatorId,
          userId: user.id,
          changeReason: 'Improve Scenarios',
        });
      }
      addEventFields({
        project: { id: projectId },
        evaluators: {
          requested_count: changes.length,
          updated_count: updatedIds.size,
        },
      });
      return { count: updatedIds.size };
    });
  },
);
