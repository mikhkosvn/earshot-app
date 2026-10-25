import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { JobResult, JobView } from '@/server/jobs/types';

export const jobViewSelect = {
  id: true,
  projectId: true,
  kind: true,
  status: true,
  currentStep: true,
  input: true,
  result: true,
  error: true,
  createdAt: true,
  startedAt: true,
  finishedAt: true,
} satisfies Prisma.BackgroundJobSelect;

type JobRow = Prisma.BackgroundJobGetPayload<{ select: typeof jobViewSelect }>;

const toJobResult = (value: Prisma.JsonValue): JobResult | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as JobResult;
};

export const toJobView = (row: JobRow): JobView => ({
  ...row,
  result: toJobResult(row.result),
});
