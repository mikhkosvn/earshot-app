import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { metricScopeWhere } from '@/server/metrics/public-api/utils/metric-scope-where';

export const deletePublicMetric = async ({
  auth,
  metricId,
}: {
  auth: ApiKeyAuth;
  metricId: number;
}) => {
  const metric = await prisma.metric.findUniqueOrThrow({
    where: { id: metricId, ...metricScopeWhere(auth) },
    select: { id: true, projectId: true },
  });
  const { count } = await prisma.metric.deleteMany({
    where: { projectId: metric.projectId, id: { in: [metric.id] } },
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: metric.projectId },
    metric: { id: metric.id },
    metrics: { requested_count: 1, deleted_count: count },
  });
};
