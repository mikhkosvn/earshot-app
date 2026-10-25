import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectSourceSchema } from '@/server/dashboards/schemas';
import { dashboardListOrder } from '@/server/dashboards/utils/dashboard-row';
import { ensureDefaultDashboard } from '@/server/dashboards/utils/ensure-default-dashboard';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getFirstDashboardId = withValidation(
  projectSourceSchema,
  async ({ projectId, source }): Promise<number> => {
    await requireProjectAccess(projectId);
    await ensureDefaultDashboard(projectId, source);
    const first = await prisma.dashboard.findFirstOrThrow({
      where: { projectId, source },
      orderBy: dashboardListOrder,
      select: { id: true },
    });
    addEventFields({ dashboard: { id: first.id, source } });
    return first.id;
  },
);
