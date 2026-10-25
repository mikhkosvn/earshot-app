import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { startMetricOptimizationSchema } from '@/server/metric-optimizer/schemas';
import { queueOptimization } from '@/server/metric-optimizer/utils/queue-optimization';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

export const startMetricOptimization = withValidation(
  startMetricOptimizationSchema,
  async ({ metricId, draft }) => {
    const { user } = await requireMetricAccess(metricId);
    return queueOptimization({ metricId, userId: user.id, draft });
  },
);
