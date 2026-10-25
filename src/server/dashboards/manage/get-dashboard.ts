import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { dashboardIdSchema } from '@/server/dashboards/schemas';
import type { DashboardDetail } from '@/server/dashboards/types';
import { dashboardAccessWhere } from '@/server/dashboards/utils/dashboard-access';
import {
  dashboardDetailSelect,
  toDashboardDetail,
} from '@/server/dashboards/utils/dashboard-row';
import { requireUser } from '@/server/auth';

export const getDashboard = withValidation(
  dashboardIdSchema,
  async ({ dashboardId }): Promise<DashboardDetail> => {
    const { user } = await requireUser();
    const row = await prisma.dashboard.findUniqueOrThrow({
      where: { id: dashboardId, ...dashboardAccessWhere(user.id) },
      select: dashboardDetailSelect,
    });
    return toDashboardDetail(row);
  },
);
