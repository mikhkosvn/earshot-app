import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { saveDashboardChangesSchema } from '@/server/dashboards/schemas';
import type { DashboardDetail, PlotConfig } from '@/server/dashboards/types';
import { requireDashboardAccess } from '@/server/dashboards/utils/dashboard-access';
import { toStoredFilters } from '@/server/dashboards/utils/dashboard-filters';
import {
  dashboardDetailSelect,
  toDashboardDetail,
} from '@/server/dashboards/utils/dashboard-row';
import { toWidgetData } from '@/server/dashboards/utils/widget-row';

const assertMetricsExist = async (projectId: number, configs: PlotConfig[]) => {
  const metricIds = [
    ...new Set(
      configs.flatMap((config) => {
        if (config.metricId === null) return [];
        return [config.metricId];
      }),
    ),
  ];
  if (metricIds.length === 0) return;
  const found = await prisma.metric.count({
    where: { projectId, id: { in: metricIds } },
  });
  if (found !== metricIds.length) {
    throw new ActionError('A selected metric does not exist.', 404);
  }
};

export const saveDashboardChanges = withValidation(
  saveDashboardChangesSchema,
  async ({ dashboardId, filters, plots }): Promise<DashboardDetail> => {
    const { dashboard } = await requireDashboardAccess(dashboardId);
    await assertMetricsExist(
      dashboard.projectId,
      plots.map((plot) => plot.config),
    );
    const existing = await prisma.widget.findMany({
      where: { dashboardId },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((widget) => widget.id));
    const keptIds = new Set(
      plots.flatMap((plot) => {
        if (plot.id === null) return [];
        return [plot.id];
      }),
    );
    for (const id of keptIds) {
      if (!existingIds.has(id)) {
        throw new ActionError('A plot does not exist.', 404);
      }
    }
    addEventFields({
      plots: {
        count: plots.length,
        kept: keptIds.size,
        deleted: existingIds.size - keptIds.size,
      },
    });
    const row = await prisma.$transaction(async (tx) => {
      await tx.widget.deleteMany({
        where: { dashboardId, id: { notIn: [...keptIds] } },
      });
      for (const [index, plot] of plots.entries()) {
        const data = toWidgetData(plot.config, index);
        if (plot.id === null) {
          await tx.widget.create({ data: { ...data, dashboardId } });
          continue;
        }
        await tx.widget.update({ where: { id: plot.id }, data });
      }
      return tx.dashboard.update({
        where: { id: dashboardId },
        data: { filters: toStoredFilters(filters) },
        select: dashboardDetailSelect,
      });
    });
    return toDashboardDetail(row);
  },
);
