import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { projectTimeZone } from '@/server/dashboards/utils/time/project-time-zone';
import { rangeOf } from '@/server/dashboards/utils/plot-data/compute-plot-data';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { getRunsOverviewSchema } from '@/server/runs-overview/schemas';
import type { RunsOverview } from '@/server/runs-overview/types';
import { loadOverviewRuns } from '@/server/runs-overview/utils/load-overview-runs';
import {
  latencySummary,
  metricSummary,
  overviewStats,
  successRateSummary,
  topScenariosFailed,
} from '@/server/runs-overview/utils/overview-series';

export const getRunsOverview = withValidation(
  getRunsOverviewSchema,
  async ({ projectId, from, to, period, filters }): Promise<RunsOverview> => {
    const { project } = await requireProjectAccess(projectId);
    const range = rangeOf(
      { from, to, agentId: null, metadata: [] },
      new Date(),
    );
    const length = range.to.getTime() - range.from.getTime();
    const previousRange = {
      from: new Date(range.from.getTime() - length),
      to: new Date(range.from.getTime() - 1),
    };
    const [current, previous] = await Promise.all([
      loadOverviewRuns(projectId, range, filters),
      loadOverviewRuns(projectId, previousRange, filters),
    ]);
    const context = { period, timeZone: projectTimeZone(project.timezone) };
    return {
      ...overviewStats(current, previous),
      successRateSummary: successRateSummary(current, range, context),
      latencySummary: latencySummary(current, context),
      metricSummary: metricSummary(current, context),
      topScenariosFailed: topScenariosFailed(current),
    };
  },
);
