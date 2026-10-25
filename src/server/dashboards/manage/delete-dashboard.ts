import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { dashboardIdSchema } from '@/server/dashboards/schemas';
import { requireDashboardAccess } from '@/server/dashboards/utils/dashboard-access';

export const deleteDashboard = withValidation(
  dashboardIdSchema,
  async ({ dashboardId }): Promise<{ id: number }> => {
    await requireDashboardAccess(dashboardId);
    await prisma.dashboard.delete({ where: { id: dashboardId } });
    return { id: dashboardId };
  },
);
