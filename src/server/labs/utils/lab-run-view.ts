import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { LAB_RUN_INPUT_KEY } from '@/server/labs/constants/lab-run';
import {
  labRunChangedReviewIdsSchema,
  labRunScoreSchema,
} from '@/server/labs/schemas';
import type { LabRunView } from '@/server/labs/types';

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

const toLabRunView = (row: LabRunRow): LabRunView => {
  return {
    jobId: row.id,
    status: row.status,
    step: row.currentStep,
    error: row.error,
    score: labRunScoreSchema.parse(row.result),
    changedReviewIds: labRunChangedReviewIdsSchema.parse(row.result)
      .changedReviewIds,
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
