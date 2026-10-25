import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectScopeSchema } from '@/server/insights/schemas';
import type { InsightMetricOption } from '@/server/insights/types';
import {
  defaultPassOf,
  passConditionOf,
  passKindOf,
} from '@/server/insights/utils/pass-condition';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listInsightMetricOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<InsightMetricOption[]> => {
    await requireProjectAccess(projectId);
    const metrics = await prisma.metric.findMany({
      where: { projectId, observabilityEnabled: true },
      orderBy: [
        { displayOrder: Prisma.SortOrder.asc },
        { id: Prisma.SortOrder.asc },
      ],
      select: {
        id: true,
        name: true,
        evalType: true,
        predefinedMetric: { select: { functionName: true } },
        enumOptions: {
          orderBy: { position: Prisma.SortOrder.asc },
          select: { value: true },
        },
        insightConfig: true,
      },
    });
    return metrics.map((metric) => {
      const kind = passKindOf(metric);
      const enumValues = metric.enumOptions.map((option) => option.value);
      const config = metric.insightConfig;
      return {
        id: metric.id,
        name: metric.name,
        evalType: metric.evalType,
        kind,
        enumValues,
        defaultPass: defaultPassOf(metric.evalType, kind, enumValues),
        config: config && {
          enabled: config.enabled,
          pass: passConditionOf(kind, config),
          triageFailureLimit: config.triageFailureLimit,
          alertOnNewCategories: config.alertOnNewCategories,
        },
      };
    });
  },
);
