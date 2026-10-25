import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { createConfigurationSchema } from '@/server/runs-overview/schemas';
import type { RunsOverviewConfigurationItem } from '@/server/runs-overview/types';
import {
  configurationSelect,
  toConfigurationItem,
} from '@/server/runs-overview/utils/configuration-item';

const hiddenMetricsOf = async (
  projectId: number,
  includeMetricVisibility: boolean,
  metricIds: number[],
) => {
  if (!includeMetricVisibility || metricIds.length === 0) return [];
  const metrics = await prisma.metric.findMany({
    where: { projectId, id: { in: metricIds } },
    select: { id: true },
  });
  return metrics.map((metric) => ({ metricId: metric.id }));
};

export const createConfiguration = withValidation(
  createConfigurationSchema,
  async ({
    projectId,
    name,
    rangeFrom,
    rangeTo,
    filters,
    includeMetricVisibility,
    hiddenMetricIds,
  }): Promise<RunsOverviewConfigurationItem> => {
    await requireProjectAccess(projectId);
    const existing = await prisma.runsOverviewConfiguration.findUnique({
      where: { projectId_name: { projectId, name } },
      select: { id: true },
    });
    if (existing) {
      throw new ActionError('A dashboard with this name already exists.');
    }
    const row = await prisma.runsOverviewConfiguration.create({
      data: {
        projectId,
        name,
        rangeFrom,
        rangeTo,
        filters,
        includeMetricVisibility,
        hiddenMetrics: {
          create: await hiddenMetricsOf(
            projectId,
            includeMetricVisibility,
            hiddenMetricIds,
          ),
        },
      },
      select: configurationSelect,
    });
    addEventFields({
      configuration: {
        id: row.id,
        include_metric_visibility: includeMetricVisibility,
      },
    });
    return toConfigurationItem(row);
  },
);
