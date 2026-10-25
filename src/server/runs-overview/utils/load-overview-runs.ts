import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import {
  type CallEvaluationStatus,
  type MetricEvalType,
  MetricEvaluationStatus,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { evaluatorRefOf } from '@/server/results/utils/refs';
import type { RunsOverviewFilters } from '@/server/runs-overview/types';
import { runOverviewWhere } from '@/server/runs-overview/utils/run-overview-where';

export interface OverviewEvaluation {
  metricId: number;
  metricName: string;
  evalType: MetricEvalType;
  functionName: string | null;
  number: number | null;
  boolean: boolean | null;
}

export interface OverviewRun {
  id: number;
  createdAt: Date;
  evaluationStatus: CallEvaluationStatus | null;
  scenarioName: string;
  evaluations: OverviewEvaluation[];
}

export const loadOverviewRuns = async (
  projectId: number,
  range: { from: Date; to: Date },
  filters: RunsOverviewFilters,
): Promise<OverviewRun[]> => {
  const rows = await prisma.run.findMany({
    where: runOverviewWhere(projectId, range, filters),
    orderBy: { createdAt: Prisma.SortOrder.asc },
    select: {
      id: true,
      createdAt: true,
      evaluationStatus: true,
      evaluatorSnapshot: true,
      evaluator: { select: { id: true, name: true } },
      conversation: {
        select: {
          metricEvaluations: {
            where: { status: MetricEvaluationStatus.completed },
            select: {
              valueNumber: true,
              valueBoolean: true,
              metric: {
                select: {
                  id: true,
                  name: true,
                  evalType: true,
                  predefinedMetric: { select: { functionName: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt,
    evaluationStatus: row.evaluationStatus,
    scenarioName: evaluatorRefOf(row.evaluator, row.evaluatorSnapshot).name,
    evaluations: row.conversation.metricEvaluations.map((evaluation) => ({
      metricId: evaluation.metric.id,
      metricName: evaluation.metric.name,
      evalType: evaluation.metric.evalType,
      functionName: evaluation.metric.predefinedMetric?.functionName ?? null,
      number: evaluation.valueNumber,
      boolean: evaluation.valueBoolean,
    })),
  }));
};
