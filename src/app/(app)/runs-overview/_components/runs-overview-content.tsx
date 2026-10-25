'use client';

import { RunsOverviewView } from '@/lib/url-generator/constants';

import { useRunsOverviewParams } from '../_hooks/use-runs-overview-params';
import { ClassicOverview } from './classic/classic-overview';
import { RunsDashboardView } from './runs-dashboard-view';

export function RunsOverviewContent() {
  const [{ view }] = useRunsOverviewParams();

  if (view === RunsOverviewView.new) return <RunsDashboardView />;
  return <ClassicOverview />;
}
