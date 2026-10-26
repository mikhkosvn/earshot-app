import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectSourceSchema } from '@/server/dashboards/schemas';
import type { DashboardItem } from '@/server/dashboards/types';
import {
  dashboardItemSelect,
  dashboardListOrder,
  toDashboardItem,
} from '@/server/dashboards/utils/dashboard-row';
import { ensureDefaultDashboard } from '@/server/dashboards/utils/ensure-default-dashboard';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listDashboards = withValidation(
  projectSourceSchema,
  async ({ projectId, source }): Promise<DashboardItem[]> => {
    await requireProjectAccess(projectId);
    await ensureDefaultDashboard(projectId, source);
    const rows = await prisma.dashboard.findMany({
      where: { projectId, source },
      orderBy: dashboardListOrder,
      select: dashboardItemSelect,
    });
    addEventFields({ dashboards: { source, count: rows.length } });
    return rows.map(toDashboardItem);
  },
);
