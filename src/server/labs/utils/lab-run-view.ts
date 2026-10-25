import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { LAB_RUN_INPUT_KEY } from '@/server/labs/constants/lab-run';
import type { LabRunView, LabScore } from '@/server/labs/types';

const labRunSelect = {
  id: true,
  status: true,
  currentStep: true,
  error: true,
  result: true,
  createdAt: true,
} satisfies Prisma.BackgroundJobSelect;

type LabRunRow = Prisma.BackgroundJobGetPayload<{
  select: typeof labRunSelect;
}>;

const asRecord = (value: Prisma.JsonValue | null): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value;
};

const scoreOf = (result: Record<string, unknown>): LabScore | null => {
  if (typeof result.matched !== 'number' || typeof result.total !== 'number') {
    return null;
  }
  return { matched: result.matched, total: result.total };
};

const changedIdsOf = (result: Record<string, unknown>) => {
  if (!Array.isArray(result.changedReviewIds)) return [];
  return result.changedReviewIds.filter(
    (id): id is number => typeof id === 'number',
  );
};

const toLabRunView = (row: LabRunRow): LabRunView => {
  const result = asRecord(row.result);
  return {
    jobId: row.id,
    status: row.status,
    step: row.currentStep,
    error: row.error,
    score: scoreOf(result),
    changedReviewIds: changedIdsOf(result),
    createdAt: row.createdAt,
  };
};

export const labRunWhere = (
  projectId: number,
  metricId: number,
): Prisma.BackgroundJobWhereInput => ({
  projectId,
  kind: JobKind.reevaluation,
  input: { path: [LAB_RUN_INPUT_KEY], equals: metricId },
});

export const findLatestLabRun = async (
  projectId: number,
  metricId: number,
): Promise<LabRunView | null> => {
  const row = await prisma.backgroundJob.findFirst({
    where: labRunWhere(projectId, metricId),
    orderBy: { createdAt: Prisma.SortOrder.desc },
    select: labRunSelect,
  });
  if (!row) return null;
  return toLabRunView(row);
};
