import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import {
  evaluatorSnapshotSchema,
  getEvaluatorSchema,
} from '@/server/evaluators/schemas/evaluator-fields';
import type { EvaluatorVersionView } from '@/server/evaluators/types';
import { evaluatorAccessWhere } from '@/server/evaluators/utils/evaluator-access-where';

export const listEvaluatorVersions = withValidation(
  getEvaluatorSchema,
  async ({ evaluatorId }) => {
    const { user } = await requireUser();
    await prisma.evaluator.findUniqueOrThrow({
      where: { id: evaluatorId, ...evaluatorAccessWhere(user.id) },
      select: { id: true },
    });
    const rows = await prisma.evaluatorVersion.findMany({
      where: { evaluatorId },
      orderBy: { version: Prisma.SortOrder.desc },
      select: {
        id: true,
        version: true,
        changeType: true,
        changeReason: true,
        createdAt: true,
        snapshot: true,
        createdBy: { select: { name: true } },
      },
    });
    addEventFields({
      evaluator: { id: evaluatorId },
      evaluator_versions: { count: rows.length },
    });
    return rows.map((row, index): EvaluatorVersionView => ({
      id: row.id,
      version: row.version,
      changeType: row.changeType,
      changeReason: row.changeReason,
      createdAt: row.createdAt,
      createdByName: row.createdBy?.name ?? null,
      isCurrent: index === 0,
      snapshot: evaluatorSnapshotSchema.parse(row.snapshot),
    }));
  },
);
