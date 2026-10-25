import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { computeRubricVerdict } from '@/server/metric-scoring/compute-rubric-verdict';
import { ResultRunType } from '@/server/results/constants/result-list';
import type { ResultDetail } from '@/server/results/types';
import { buildCallStats } from '@/server/results/utils/detail/call-stats';
import {
  detailMetricSelect,
  type ResultDetailRecord,
  resultDetailSelect,
} from '@/server/results/utils/detail/detail-record';
import {
  buildMetricTile,
  hasEvaluations,
  type RunVerdicts,
} from '@/server/results/utils/detail/metric-tiles';
import { buildReportMetrics } from '@/server/results/utils/detail/report-metrics';
import { buildTagTiles } from '@/server/results/utils/detail/tag-tiles';
import { evaluatorRefOf, runStartOf, toAgentRef } from '@/server/results/utils/refs';
import {
  isPassedEvaluation,
  successRateOf,
} from '@/server/results/utils/result-row';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

const loadVerdicts = async (
  record: ResultDetailRecord,
): Promise<RunVerdicts> => {
  const finished = record.runs.filter((run) => isTerminalRunStatus(run.status));
  const entries = await Promise.all(
    finished.map(async (run) => {
      const verdict = await computeRubricVerdict({
        conversationId: run.conversationId,
      });
      const passed = new Map(
        verdict.items.map((item) => [item.metricId, item.passed]),
      );
      return [run.id, passed] as const;
    }),
  );
  return new Map(entries);
};

const countsOf = (record: ResultDetailRecord) => {
  const completed = record.runs.filter((run) =>
    isTerminalRunStatus(run.status),
  );
  const success = record.runs.filter((run) =>
    isPassedEvaluation(run.evaluationStatus),
  ).length;
  return {
    total: record.runs.length,
    completed: completed.length,
    success,
    failed: completed.length - success,
    inProgress: record.runs.length - completed.length,
  };
};

export const loadResultDetail = async (
  resultId: number,
): Promise<ResultDetail> => {
  const record = await prisma.result.findUniqueOrThrow({
    where: { id: resultId },
    select: resultDetailSelect,
  });
  const [metrics, verdicts] = await Promise.all([
    prisma.metric.findMany({
      where: { projectId: record.projectId, simulationEnabled: true },
      orderBy: [
        { displayOrder: Prisma.SortOrder.asc },
        { id: Prisma.SortOrder.asc },
      ],
      select: detailMetricSelect,
    }),
    loadVerdicts(record),
  ]);
  const tileOf = (metric: (typeof metrics)[number]) =>
    buildMetricTile(metric, record.runs, verdicts);
  return {
    id: record.id,
    projectId: record.projectId,
    name: record.name,
    status: record.status,
    createdAt: record.createdAt,
    completedAt: record.completedAt,
    agent: toAgentRef(record.agent, record.agentVersion),
    runType: ResultRunType.telephony,
    counts: countsOf(record),
    successRate: successRateOf(record.runs) ?? 0,
    aiSummary: {
      status: record.aiSummaryStatus,
      whatHappened: record.aiSummaryWhatHappened,
      whyItHappened: record.aiSummaryWhyItHappened,
      howToFix: record.aiSummaryHowToFix,
    },
    workflow: {
      generated: record.pathCoverageGeneratedAt !== null,
      paths: record.workflowPaths,
    },
    rubricTiles: metrics
      .filter((metric) => metric.rubricRule !== null)
      .map(tileOf),
    otherTiles: metrics
      .filter(
        (metric) =>
          metric.rubricRule === null && hasEvaluations(metric.id, record.runs),
      )
      .map(tileOf),
    tagTiles: buildTagTiles(record.runs),
    callStats: buildCallStats(record.runs, metrics),
    runIndex: record.runs.map((run) => ({
      runId: run.id,
      startedAt: runStartOf(run),
      personalityName: run.personality?.name ?? null,
      evaluatorName: evaluatorRefOf(run.evaluator, run.evaluatorSnapshot).name,
    })),
    reportMetrics: buildReportMetrics(record, metrics),
  };
};
