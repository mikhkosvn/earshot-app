import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { renameDashboardSchema } from '@/server/dashboards/schemas';
import type { DashboardItem } from '@/server/dashboards/types';
import { requireDashboardAccess } from '@/server/dashboards/utils/dashboard-access';
import {
  dashboardItemSelect,
  toDashboardItem,
} from '@/server/dashboards/utils/dashboard-row';

export const renameDashboard = withValidation(
  renameDashboardSchema,
  async ({ dashboardId, name }): Promise<DashboardItem> => {
    await requireDashboardAccess(dashboardId);
    const row = await prisma.dashboard.update({
      where: { id: dashboardId },
      data: { name },
      select: dashboardItemSelect,
    });
    return toDashboardItem(row);
  },
);
