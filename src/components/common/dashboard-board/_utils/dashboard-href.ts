import { DashboardSource } from '@/generated/prisma/enums';
import { RunsOverviewView } from '@/lib/url-generator/constants';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

export const dashboardHref = (
  source: DashboardSource,
  projectId: number,
  dashboardId: number,
) => {
  if (source === DashboardSource.runs) {
    return UrlGenerator.runsOverview({
      values: {
        project: projectId,
        view: RunsOverviewView.new,
        dashboard: dashboardId,
      },
    });
  }
  return UrlGenerator.dashboard({ projectId, dashboardId });
};

export const dashboardRootHref = (
  source: DashboardSource,
  projectId: number,
) => {
  if (source === DashboardSource.runs) {
    return UrlGenerator.runsOverview({
      values: { project: projectId, view: RunsOverviewView.new },
    });
  }
  return UrlGenerator.dashboards({ projectId });
};
