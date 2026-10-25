import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { LabScore } from '@/server/labs/types';
import { SCHEDULE_NAME_INPUT_KEY } from '@/server/metric-optimizer/constants/optimizer-limits';
import type { OptimizationView } from '@/server/metric-optimizer/types';
import { proposalChanges } from '@/server/metric-optimizer/utils/proposal-changes';

const definitionSelect = {
  type: true,
  description: true,
  customCode: true,
  evaluationTrigger: true,
  triggerType: true,
  evaluationTriggerPrompt: true,
  evaluationTriggerCustomCode: true,
} satisfies Prisma.MetricSelect;

const optimizationSelect = {
  id: true,
  status: true,
  jobId: true,
  summary: true,
  oldCorrectCount: true,
  oldTotalCount: true,
  newCorrectCount: true,
  newTotalCount: true,
  createdAt: true,
  job: { select: { input: true } },
  metric: { select: definitionSelect },
  proposals: {
    orderBy: { version: Prisma.SortOrder.desc },
    take: 1,
    select: { id: true, version: true, ...definitionSelect },
  },
} satisfies Prisma.MetricOptimizationSessionSelect;

type OptimizationRow = Prisma.MetricOptimizationSessionGetPayload<{
  select: typeof optimizationSelect;
}>;

const scoreOf = (
  matched: number | null,
  total: number | null,
): LabScore | null => {
  if (matched === null || total === null) return null;
  return { matched, total };
};

const scheduleNameOf = (input: Prisma.JsonValue | null) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const name = input[SCHEDULE_NAME_INPUT_KEY];
  if (typeof name !== 'string') return null;
  return name;
};

const proposalOf = (row: OptimizationRow) => {
  const [proposal] = row.proposals;
  if (!proposal) return null;
  const { id, version, ...definition } = proposal;
  return {
    id,
    version,
    changes: proposalChanges(row.metric, definition),
  };
};

export const toOptimizationView = (row: OptimizationRow): OptimizationView => ({
  sessionId: row.id,
  status: row.status,
  jobId: row.jobId,
  summary: row.summary,
  oldScore: scoreOf(row.oldCorrectCount, row.oldTotalCount),
  newScore: scoreOf(row.newCorrectCount, row.newTotalCount),
  scheduleName: scheduleNameOf(row.job?.input ?? null),
  createdAt: row.createdAt,
  proposal: proposalOf(row),
});

export const findLatestOptimization = async (
  metricId: number,
): Promise<OptimizationView | null> => {
  const row = await prisma.metricOptimizationSession.findFirst({
    where: { metricId },
    orderBy: { createdAt: Prisma.SortOrder.desc },
    select: optimizationSelect,
  });
  if (!row) return null;
  return toOptimizationView(row);
};
