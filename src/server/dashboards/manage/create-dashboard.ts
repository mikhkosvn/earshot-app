import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { DEFAULT_DASHBOARD_FILTERS } from '@/server/dashboards/constants/dashboard-defaults';
import { createDashboardSchema } from '@/server/dashboards/schemas';
import type { DashboardItem } from '@/server/dashboards/types';
import { toStoredFilters } from '@/server/dashboards/utils/dashboard-filters';
import {
  dashboardItemSelect,
  toDashboardItem,
} from '@/server/dashboards/utils/dashboard-row';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const createDashboard = withValidation(
  createDashboardSchema,
  async ({ projectId, source, name }): Promise<DashboardItem> => {
    await requireProjectAccess(projectId);
    const row = await prisma.dashboard.create({
      data: {
        projectId,
        source,
        name,
        filters: toStoredFilters(DEFAULT_DASHBOARD_FILTERS),
      },
      select: dashboardItemSelect,
    });
    return toDashboardItem(row);
  },
);
