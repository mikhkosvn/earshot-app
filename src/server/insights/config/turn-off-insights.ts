import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { insightMetricSchema } from '@/server/insights/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const turnOffInsights = withValidation(
  insightMetricSchema,
  async ({ projectId, metricId }) => {
    await requireProjectAccess(projectId);
    await prisma.metricInsightConfig.update({
      where: { metricId, metric: { projectId } },
      data: { enabled: false },
    });
    addEventFields({ project: { id: projectId }, metric: { id: metricId } });
    return { metricId };
  },
);
