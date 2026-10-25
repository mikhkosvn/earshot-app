import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { saveInsightConfigSchema } from '@/server/insights/schemas';
import {
  passKindOf,
  storedPassOf,
} from '@/server/insights/utils/pass-condition';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const saveInsightConfig = withValidation(
  saveInsightConfigSchema,
  async ({
    projectId,
    metricId,
    passOperator,
    passValue,
    triageFailureLimit,
  }) => {
    await requireProjectAccess(projectId);
    const metric = await prisma.metric.findUniqueOrThrow({
      where: { id: metricId, projectId, observabilityEnabled: true },
      select: {
        id: true,
        evalType: true,
        predefinedMetric: { select: { functionName: true } },
      },
    });
    const stored = storedPassOf(passKindOf(metric), {
      operator: passOperator,
      value: passValue,
    });
    const last = await prisma.metricInsightConfig.aggregate({
      where: { metric: { projectId } },
      _max: { position: true },
    });
    await prisma.metricInsightConfig.upsert({
      where: { metricId: metric.id },
      create: {
        metricId: metric.id,
        enabled: true,
        triageFailureLimit,
        position: (last._max.position ?? -1) + 1,
        ...stored,
      },
      update: { enabled: true, triageFailureLimit, ...stored },
    });
    return { metricId: metric.id };
  },
);
