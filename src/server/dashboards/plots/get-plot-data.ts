import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { getPlotDataSchema } from '@/server/dashboards/schemas';
import type { PlotData } from '@/server/dashboards/types';
import { requireDashboardAccess } from '@/server/dashboards/utils/dashboard-access';
import { computePlotData } from '@/server/dashboards/utils/plot-data/compute-plot-data';
import { projectTimeZone } from '@/server/dashboards/utils/time/project-time-zone';

export const getPlotData = withValidation(
  getPlotDataSchema,
  async ({ dashboardId, plot, filters }): Promise<PlotData> => {
    const { dashboard } = await requireDashboardAccess(dashboardId);
    return computePlotData({
      projectId: dashboard.projectId,
      source: dashboard.source,
      timeZone: projectTimeZone(dashboard.project.timezone),
      config: plot,
      filters,
    });
  },
);
