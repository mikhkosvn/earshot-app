import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { HistoryChangeType, MetricType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { ActionError, withValidation } from '@/server/common/run-action';
import { updateMetricSchema } from '@/server/metrics/schemas';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';
import { checkDependencies } from '@/server/metrics/utils/records/check-dependencies';
import { assertFreeSlug } from '@/server/metrics/utils/records/create-metric-record';
import { writeMetricVersion } from '@/server/metrics/utils/records/metric-version';

const EDITABLE_TYPES: MetricType[] = [
  MetricType.llm_judge,
  MetricType.custom_code,
];

const textOrNull = (value: string) => {
  if (!value.trim()) return null;
  return value;
};

const resolveType = (current: MetricType, requested: MetricType) => {
  if (!EDITABLE_TYPES.includes(current)) return current;
  if (!EDITABLE_TYPES.includes(requested)) {
    throw new ActionError('Pick LLM Judge or Python.');
  }
  return requested;
};

const configurationInput = (value: Record<string, number> | null) => {
  if (!value) return Prisma.DbNull;
  return value;
};

export const updateMetric = withValidation(
  updateMetricSchema,
  async ({ metricId, dependencyIds, enumValues, ...values }) => {
    const { user, metric } = await requireMetricAccess(metricId);
    if (metric.predefinedMetric && !metric.predefinedMetric.editable) {
      throw new ActionError('This predefined metric cannot be edited.');
    }
    await prisma.$transaction(async (tx) => {
      await assertFreeSlug(tx, metric.projectId, values.slug, metricId);
      await checkDependencies(tx, {
        projectId: metric.projectId,
        metricId,
        dependencyIds,
      });
      const versionCount = await tx.metricVersion.count({
        where: { metricId },
      });
      if (versionCount === 0) {
        await writeMetricVersion(tx, {
          metricId,
          userId: null,
          changeType: HistoryChangeType.created,
        });
      }
      await tx.metric.update({
        where: { id: metricId },
        data: {
          name: values.name,
          slug: values.slug,
          type: resolveType(metric.type, values.type),
          evalType: values.evalType,
          audioEnabled: values.audioEnabled,
          description: values.description,
          customCode: textOrNull(values.customCode),
          configuration: configurationInput(values.configuration),
          evaluationTrigger: values.evaluationTrigger,
          triggerType: values.triggerType,
          evaluationTriggerPrompt: textOrNull(values.evaluationTriggerPrompt),
          evaluationTriggerCustomCode: textOrNull(
            values.evaluationTriggerCustomCode,
          ),
          addToNewAgents: values.addToNewAgents,
          enumOptions: {
            deleteMany: {},
            create: enumValues.map((value, position) => ({ position, value })),
          },
          dependencies: {
            deleteMany: {},
            create: dependencyIds.map((dependsOnMetricId) => ({
              dependsOnMetricId,
            })),
          },
        },
      });
      await writeMetricVersion(tx, {
        metricId,
        userId: user.id,
        changeType: HistoryChangeType.updated,
      });
    });
    return { id: metricId };
  },
);
