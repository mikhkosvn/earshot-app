import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { reorderMetricsSchema } from '@/server/metrics/schemas';
import { metricOrder } from '@/server/metrics/utils/metric-view';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const mergedOrder = (allIds: number[], movedIds: number[]) => {
  const moved = new Set(movedIds);
  const queue = [...movedIds];
  return allIds.map((id) => {
    if (!moved.has(id)) return id;
    return queue.shift() ?? id;
  });
};

export const reorderMetrics = withValidation(
  reorderMetricsSchema,
  async ({ projectId, metricIds }) => {
    await requireProjectAccess(projectId);
    const rows = await prisma.metric.findMany({
      where: { projectId },
      orderBy: metricOrder,
      select: { id: true },
    });
    const allIds = rows.map((row) => row.id);
    const known = new Set(allIds);
    if (
      new Set(metricIds).size !== metricIds.length ||
      metricIds.some((id) => !known.has(id))
    ) {
      throw new ActionError('The order holds a metric of another project.');
    }
    const order = mergedOrder(allIds, metricIds);
    await prisma.$transaction(
      order.map((id, index) =>
        prisma.metric.update({
          where: { id },
          data: { displayOrder: index + 1 },
        }),
      ),
    );
    addEventFields({
      project: { id: projectId },
      metrics: { count: order.length, moved_count: metricIds.length },
    });
    return { metricIds: order };
  },
);
