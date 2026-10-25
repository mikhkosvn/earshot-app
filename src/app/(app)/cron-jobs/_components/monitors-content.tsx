'use client';

import { useMonitorListQuery } from '../_hooks/use-monitor-list-query';
import { MonitorsEmptyState } from './empty/monitors-empty-state';
import { MonitorsTable } from './list/monitors-table';

export function MonitorsContent() {
  const { data } = useMonitorListQuery();
  if (data.count === 0) return <MonitorsEmptyState />;

  return <MonitorsTable />;
}
