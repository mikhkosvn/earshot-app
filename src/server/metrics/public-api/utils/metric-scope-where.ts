import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { ApiKeyAuth } from '@/server/api-keys/types';

export const metricScopeWhere = (auth: ApiKeyAuth) =>
  ({
    project: { organizationId: auth.organizationId },
    ...(auth.projectId !== null && { projectId: auth.projectId }),
  }) satisfies Prisma.MetricWhereInput;
