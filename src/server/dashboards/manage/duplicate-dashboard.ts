import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { dashboardIdSchema } from '@/server/dashboards/schemas';
import type { DashboardItem } from '@/server/dashboards/types';
import { requireDashboardAccess } from '@/server/dashboards/utils/dashboard-access';
import {
  dashboardItemSelect,
  toDashboardItem,
} from '@/server/dashboards/utils/dashboard-row';

const jsonInput = (value: Prisma.JsonValue) => {
  if (value === null) return Prisma.DbNull;
  return value;
};

export const duplicateDashboard = withValidation(
  dashboardIdSchema,
  async ({ dashboardId }): Promise<DashboardItem> => {
    await requireDashboardAccess(dashboardId);
    const source = await prisma.dashboard.findUniqueOrThrow({
      where: { id: dashboardId },
      include: { widgets: true },
    });
    const row = await prisma.dashboard.create({
      data: {
        projectId: source.projectId,
        source: source.source,
        name: `${source.name} (Copy)`,
        filters: jsonInput(source.filters),
        widgets: {
          create: source.widgets.map((widget) => ({
            name: widget.name,
            chartType: widget.chartType,
            field: widget.field,
            metricId: widget.metricId,
            metadataKey: widget.metadataKey,
            aggregation: widget.aggregation,
            timePeriod: widget.timePeriod,
            groupByType: widget.groupByType,
            groupByField: widget.groupByField,
            groupByIntervalMs: widget.groupByIntervalMs,
            filters: jsonInput(widget.filters),
            sortPosition: widget.sortPosition,
            layoutX: widget.layoutX,
            layoutY: widget.layoutY,
            layoutW: widget.layoutW,
            layoutH: widget.layoutH,
            displayOptions: jsonInput(widget.displayOptions),
          })),
        },
      },
      select: dashboardItemSelect,
    });
    addEventFields({
      dashboard: { copy_id: row.id, widget_count: source.widgets.length },
    });
    return toDashboardItem(row);
  },
);
