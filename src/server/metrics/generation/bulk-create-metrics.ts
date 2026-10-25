import 'server-only';

import { JobKind, MetricType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { bulkCreateMetricsSchema } from '@/server/metrics/schemas';
import { createMetricRecord } from '@/server/metrics/utils/records/create-metric-record';
import { projectAgentIds } from '@/server/metrics/utils/records/project-agent-ids';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const bulkCreateMetrics = withValidation(
  bulkCreateMetricsSchema,
  async ({ projectId, jobId, metrics }) => {
    const { user } = await requireProjectAccess(projectId);
    await prisma.backgroundJob.findUniqueOrThrow({
      where: {
        id: jobId,
        projectId,
        createdById: user.id,
        kind: JobKind.metric_generation,
      },
      select: { id: true },
    });
    return prisma.$transaction(async (tx) => {
      const agentIds = await projectAgentIds(tx, projectId);
      const created = [];
      for (const draft of metrics) {
        created.push(
          await createMetricRecord(tx, {
            projectId,
            userId: user.id,
            type: MetricType.llm_judge,
            name: draft.name,
            slug: null,
            evalType: draft.evalType,
            description: draft.description,
            agentIds,
          }),
        );
      }
      await tx.backgroundJob.update({
        where: { id: jobId },
        data: { dismissedAt: new Date() },
      });
      return created;
    });
  },
);
