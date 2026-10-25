import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { DashboardDetail, DashboardItem } from '@/server/dashboards/types';
import { fromStoredFilters } from '@/server/dashboards/utils/dashboard-filters';
import {
  toWidgetItem,
  widgetSelect,
} from '@/server/dashboards/utils/widget-row';

export const dashboardItemSelect = {
  id: true,
  name: true,
  source: true,
  includeInDailyReport: true,
  _count: { select: { widgets: true } },
} satisfies Prisma.DashboardSelect;

export const dashboardDetailSelect = {
  ...dashboardItemSelect,
  filters: true,
  widgets: {
    orderBy: [
      { sortPosition: Prisma.SortOrder.asc },
      { id: Prisma.SortOrder.asc },
    ],
    select: widgetSelect,
  },
} satisfies Prisma.DashboardSelect;

type DashboardItemRecord = Prisma.DashboardGetPayload<{
  select: typeof dashboardItemSelect;
}>;

type DashboardDetailRecord = Prisma.DashboardGetPayload<{
  select: typeof dashboardDetailSelect;
}>;

export const toDashboardItem = (
  record: DashboardItemRecord,
): DashboardItem => ({
  id: record.id,
  name: record.name,
  source: record.source,
  includeInDailyReport: record.includeInDailyReport,
  widgetCount: record._count.widgets,
});

export const toDashboardDetail = (
  record: DashboardDetailRecord,
): DashboardDetail => ({
  ...toDashboardItem(record),
  filters: fromStoredFilters(record.filters),
  widgets: record.widgets.map(toWidgetItem),
});

export const dashboardListOrder = [
  { createdAt: Prisma.SortOrder.asc },
  { id: Prisma.SortOrder.asc },
];
