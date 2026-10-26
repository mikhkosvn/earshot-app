import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { setDashboardDailyReportSchema } from '@/server/dashboards/schemas';
import type { DashboardItem } from '@/server/dashboards/types';
import { requireDashboardAccess } from '@/server/dashboards/utils/dashboard-access';
import {
  dashboardItemSelect,
  toDashboardItem,
} from '@/server/dashboards/utils/dashboard-row';

export const setDashboardDailyReport = withValidation(
  setDashboardDailyReportSchema,
  async ({ dashboardId, includeInDailyReport }): Promise<DashboardItem> => {
    await requireDashboardAccess(dashboardId);
    const row = await prisma.dashboard.update({
      where: { id: dashboardId },
      data: { includeInDailyReport },
      select: dashboardItemSelect,
    });
    addEventFields({
      dashboard: { include_in_daily_report: includeInDailyReport },
    });
    return toDashboardItem(row);
  },
);
