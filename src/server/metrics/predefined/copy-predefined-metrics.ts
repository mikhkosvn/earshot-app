import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { HistoryChangeType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { copyPredefinedMetricsSchema } from '@/server/metrics/schemas';
import { writeMetricVersion } from '@/server/metrics/utils/records/metric-version';
import { nextDisplayOrder } from '@/server/metrics/utils/records/next-display-order';
import { projectAgentIds } from '@/server/metrics/utils/records/project-agent-ids';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { addRubricRule } from '@/server/rubric/utils/add-rubric-rule';

const catalogInclude = {
  enumOptions: true,
} satisfies Prisma.PredefinedMetricInclude;

type CatalogMetric = Prisma.PredefinedMetricGetPayload<{
  include: typeof catalogInclude;
}>;

const toJsonInput = (value: Prisma.JsonValue | null) => {
  if (value === null) return Prisma.DbNull;
  return value;
};

const freeSlug = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  slug: string | null,
) => {
  if (!slug) return null;
  const existing = await tx.metric.findUnique({
    where: { projectId_slug: { projectId, slug } },
    select: { id: true },
  });
  if (existing) return null;
  return slug;
};

const copyCatalogMetric = async (
  tx: Prisma.TransactionClient,
  args: {
    projectId: number;
    userId: number;
    catalogMetric: CatalogMetric;
    agentIds: number[];
  },
) => {
  const { projectId, catalogMetric } = args;
  const metric = await tx.metric.create({
    data: {
      projectId,
      predefinedMetricId: catalogMetric.id,
      name: catalogMetric.name,
      slug: await freeSlug(tx, projectId, catalogMetric.slug),
      description: catalogMetric.description,
      type: catalogMetric.type,
      evalType: catalogMetric.evalType,
      audioEnabled: catalogMetric.audioEnabled,
      customCode: catalogMetric.customCode,
      configuration: toJsonInput(catalogMetric.configuration),
      displayOrder: await nextDisplayOrder(tx, projectId),
      observabilityEnabled: catalogMetric.observabilityEnabled,
      simulationEnabled: catalogMetric.simulationEnabled,
      addToNewAgents: true,
      enumOptions: {
        create: catalogMetric.enumOptions.map((option) => ({
          position: option.position,
          value: option.value,
        })),
      },
      agents: { create: args.agentIds.map((agentId) => ({ agentId })) },
    },
    select: { id: true, name: true },
  });
  await writeMetricVersion(tx, {
    metricId: metric.id,
    userId: args.userId,
    changeType: HistoryChangeType.created,
  });
  if (catalogMetric.rubricOperator) {
    await addRubricRule(tx, {
      metricId: metric.id,
      projectId,
      operator: catalogMetric.rubricOperator,
      numberValue: catalogMetric.rubricNumberValue,
      booleanValue: catalogMetric.rubricBooleanValue,
    });
  }
  return metric;
};

export const copyPredefinedMetrics = withValidation(
  copyPredefinedMetricsSchema,
  async ({ projectId, codes }) => {
    const { user } = await requireProjectAccess(projectId);
    const created = await prisma.$transaction(async (tx) => {
      const catalogMetrics = await tx.predefinedMetric.findMany({
        where: {
          code: { in: codes },
          projectMetrics: { none: { projectId } },
        },
        include: catalogInclude,
        orderBy: { name: Prisma.SortOrder.asc },
      });
      if (catalogMetrics.length === 0) {
        throw new ActionError(
          'The selected metrics are already in the project.',
        );
      }
      const agentIds = await projectAgentIds(tx, projectId);
      const created = [];
      for (const catalogMetric of catalogMetrics) {
        created.push(
          await copyCatalogMetric(tx, {
            projectId,
            userId: user.id,
            catalogMetric,
            agentIds,
          }),
        );
      }
      return created;
    });
    addEventFields({
      project: { id: projectId },
      metrics: { requested_count: codes.length, created_count: created.length },
    });
    return created;
  },
);
