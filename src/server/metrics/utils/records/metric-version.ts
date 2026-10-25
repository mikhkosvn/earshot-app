import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { HistoryChangeType } from '@/generated/prisma/enums';
import type { MetricSnapshot } from '@/server/metrics/types';
import {
  metricDetailSelect,
  toMetricDetail,
} from '@/server/metrics/utils/metric-view';

interface WriteMetricVersionArgs {
  metricId: number;
  userId: number | null;
  changeType: HistoryChangeType;
  changeReason?: string;
}

export const toMetricSnapshot = (
  detail: ReturnType<typeof toMetricDetail>,
): MetricSnapshot => ({
  type: detail.type,
  name: detail.name,
  slug: detail.slug,
  evalType: detail.evalType,
  enumValues: detail.enumValues,
  audioEnabled: detail.audioEnabled,
  description: detail.description,
  customCode: detail.customCode,
  configuration: detail.configuration,
  dependencyIds: detail.dependencyIds,
  evaluationTrigger: detail.evaluationTrigger,
  triggerType: detail.triggerType,
  evaluationTriggerPrompt: detail.evaluationTriggerPrompt,
  evaluationTriggerCustomCode: detail.evaluationTriggerCustomCode,
  addToNewAgents: detail.addToNewAgents,
});

export const writeMetricVersion = async (
  tx: Prisma.TransactionClient,
  { metricId, userId, changeType, changeReason }: WriteMetricVersionArgs,
) => {
  const row = await tx.metric.findUniqueOrThrow({
    where: { id: metricId },
    select: metricDetailSelect,
  });
  const { _max } = await tx.metricVersion.aggregate({
    where: { metricId },
    _max: { version: true },
  });
  await tx.metricVersion.create({
    data: {
      metricId,
      version: (_max.version ?? 0) + 1,
      changeType,
      changeReason: changeReason ?? null,
      snapshot: toMetricSnapshot(toMetricDetail(row)),
      createdById: userId,
    },
  });
};
