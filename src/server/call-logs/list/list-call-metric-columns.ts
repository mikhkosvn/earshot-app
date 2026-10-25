import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { projectScopeSchema } from '@/server/call-logs/schemas';
import type { CallMetricColumn } from '@/server/call-logs/types';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listCallMetricColumns = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<CallMetricColumn[]> => {
    await requireProjectAccess(projectId);
    const metrics = await prisma.metric.findMany({
      where: { projectId, observabilityEnabled: true },
      orderBy: { name: Prisma.SortOrder.asc },
      select: {
        id: true,
        name: true,
        evalType: true,
        predefinedMetric: { select: { functionName: true } },
      },
    });
    return metrics.map((metric) => ({
      id: metric.id,
      name: metric.name,
      evalType: metric.evalType,
      functionName: metric.predefinedMetric?.functionName ?? null,
    }));
  },
);
