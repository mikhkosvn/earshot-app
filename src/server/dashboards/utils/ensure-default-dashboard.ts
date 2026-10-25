import 'server-only';

import type { DashboardSource } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  DEFAULT_DASHBOARD_FILTERS,
  DEFAULT_DASHBOARD_NAME,
} from '@/server/dashboards/constants/dashboard-defaults';
import { DEFAULT_WIDGETS } from '@/server/dashboards/constants/default-widgets';
import { toStoredFilters } from '@/server/dashboards/utils/dashboard-filters';
import { metricIdsByFunction } from '@/server/dashboards/utils/project-metrics';
import { toWidgetData } from '@/server/dashboards/utils/widget-row';

const DEFAULT_DASHBOARD_LOCK = 41_207;

const defaultWidgetConfigs = (
  source: DashboardSource,
  metricIds: Map<string, number>,
) =>
  DEFAULT_WIDGETS[source].flatMap((spec) => {
    if (!spec.metricFunction) return [spec.config];
    const metricId = metricIds.get(spec.metricFunction);
    if (!metricId) return [];
    return [{ ...spec.config, metricId }];
  });

export const ensureDefaultDashboard = (
  projectId: number,
  source: DashboardSource,
) =>
  prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(${DEFAULT_DASHBOARD_LOCK}::int, ${projectId}::int)`;
    const existing = await tx.dashboard.count({ where: { projectId, source } });
    if (existing > 0) return;
    const metricIds = await metricIdsByFunction(projectId, tx);
    await tx.dashboard.create({
      data: {
        projectId,
        source,
        name: DEFAULT_DASHBOARD_NAME[source],
        filters: toStoredFilters(DEFAULT_DASHBOARD_FILTERS),
        widgets: {
          create: defaultWidgetConfigs(source, metricIds).map((config, index) =>
            toWidgetData(config, index),
          ),
        },
      },
    });
  });
