import 'server-only';

import {
  MetricEvaluationStatus,
  type EvaluationConsumer,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { ALERT_PENDING_GRACE_MS } from '@/server/alerts/constants/alert-limits';

const OPEN_STATUSES: MetricEvaluationStatus[] = [
  MetricEvaluationStatus.pending,
  MetricEvaluationStatus.running,
];

const createCursor = async (consumer: EvaluationConsumer) => {
  const latest = await prisma.metricEvaluation.aggregate({
    _max: { id: true },
  });
  const cursor = await prisma.evaluationCursor.upsert({
    where: { consumer },
    create: { consumer, lastEvaluationId: latest._max.id ?? 0 },
    update: {},
    select: { lastEvaluationId: true },
  });
  return cursor.lastEvaluationId;
};

export const readEvaluationCursor = async (consumer: EvaluationConsumer) => {
  const cursor = await prisma.evaluationCursor.findUnique({
    where: { consumer },
    select: { lastEvaluationId: true },
  });
  if (cursor) return cursor.lastEvaluationId;
  return createCursor(consumer);
};

export const writeEvaluationCursor = (
  consumer: EvaluationConsumer,
  lastEvaluationId: number,
) =>
  prisma.evaluationCursor.update({
    where: { consumer },
    data: { lastEvaluationId },
  });

export const settledPrefix = <
  TRow extends { status: MetricEvaluationStatus; createdAt: Date },
>(
  rows: TRow[],
  now: number = Date.now(),
) => {
  const blocked = rows.findIndex(
    (row) =>
      OPEN_STATUSES.includes(row.status) &&
      now - row.createdAt.getTime() < ALERT_PENDING_GRACE_MS,
  );
  if (blocked === -1) return rows;
  return rows.slice(0, blocked);
};
