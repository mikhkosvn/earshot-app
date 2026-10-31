import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  publicMetricSelect,
  toPublicMetric,
} from '@/server/metrics/public-api/utils/public-metric';
import { metricOrder } from '@/server/metrics/utils/metric-view';
import { projectAgentIds } from '@/server/metrics/utils/records/project-agent-ids';
import { resolveQueryProjectId } from '@/server/public-api/project-scope';

export const listPublicMetrics = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const projectId = await resolveQueryProjectId(auth, request);
  const [rows, agentIds] = await Promise.all([
    prisma.metric.findMany({
      where: { projectId },
      orderBy: metricOrder,
      select: publicMetricSelect,
    }),
    projectAgentIds(prisma, projectId),
  ]);
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    metrics: { returned: rows.length },
  });
  return rows.map((row) => toPublicMetric(row, agentIds));
};
