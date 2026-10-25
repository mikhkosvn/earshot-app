import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { CallEvaluationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { computeRubricVerdict } from '@/server/metric-scoring/compute-rubric-verdict';
import { scoreConversation } from '@/server/metric-scoring/score-conversation';
import { readSnapshotMetricIds } from '@/server/runs/utils/evaluator-snapshot';

type ScoreRunArgs = {
  projectId: number;
  conversationId: number;
  evaluatorId: number | null;
  evaluatorSnapshot: Prisma.JsonValue;
  metricIds?: number[];
};

const specMetricIds = async (
  projectId: number,
  evaluatorId: number | null,
  snapshot: Prisma.JsonValue,
) => {
  if (evaluatorId !== null) return undefined;
  const ids = readSnapshotMetricIds(snapshot);
  if (ids.length === 0) return undefined;
  const rows = await prisma.metric.findMany({
    where: { id: { in: ids }, projectId, simulationEnabled: true },
    select: { id: true },
  });
  return rows.map((row) => row.id);
};

const evaluationStatusOf = (passed: boolean) => {
  if (passed) return CallEvaluationStatus.success;
  return CallEvaluationStatus.failure;
};

export const computeEvaluationStatus = async (conversationId: number) => {
  const verdict = await computeRubricVerdict({ conversationId });
  return evaluationStatusOf(verdict.passed);
};

export const scoreRun = async ({
  projectId,
  conversationId,
  evaluatorId,
  evaluatorSnapshot,
  metricIds,
}: ScoreRunArgs) => {
  await scoreConversation({
    projectId,
    conversationId,
    metricIds:
      metricIds ??
      (await specMetricIds(projectId, evaluatorId, evaluatorSnapshot)),
  });
  return computeEvaluationStatus(conversationId);
};
