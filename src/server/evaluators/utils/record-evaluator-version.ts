import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { HistoryChangeType } from '@/generated/prisma/enums';
import {
  evaluatorDetailSelect,
  toEvaluatorDetail,
  toEvaluatorSnapshot,
} from '@/server/evaluators/utils/evaluator-detail';

const changeTypeOf = (hasPrevious: boolean) => {
  if (hasPrevious) return HistoryChangeType.updated;
  return HistoryChangeType.created;
};

type RecordVersionArgs = {
  evaluatorId: number;
  userId: number | null;
  changeReason?: string | null;
};

export const recordEvaluatorVersion = async (
  tx: Prisma.TransactionClient,
  { evaluatorId, userId, changeReason = null }: RecordVersionArgs,
) => {
  const row = await tx.evaluator.findUniqueOrThrow({
    where: { id: evaluatorId },
    select: evaluatorDetailSelect,
  });
  const latest = await tx.evaluatorVersion.findFirst({
    where: { evaluatorId },
    orderBy: { version: Prisma.SortOrder.desc },
    select: { version: true },
  });
  const changeType = changeTypeOf(latest !== null);
  const snapshot = toEvaluatorSnapshot(toEvaluatorDetail(row));
  await tx.evaluatorVersion.create({
    data: {
      evaluatorId,
      version: (latest?.version ?? 0) + 1,
      changeType,
      changeReason,
      snapshot: JSON.parse(JSON.stringify(snapshot)) as Prisma.InputJsonObject,
      createdById: userId,
    },
  });
  return row;
};
