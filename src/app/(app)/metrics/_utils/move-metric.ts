import { arrayMove } from '@dnd-kit/sortable';

import type { MetricListItem } from '@/server/metrics/types';

import { metricGroupOf, orderByGroup } from './metric-groups';

export const moveMetric = (
  metrics: MetricListItem[],
  activeId: number,
  overId: number,
): MetricListItem[] | null => {
  if (activeId === overId) return null;
  const ordered = orderByGroup(metrics);
  const from = ordered.findIndex((metric) => metric.id === activeId);
  const to = ordered.findIndex((metric) => metric.id === overId);
  if (from < 0 || to < 0) return null;
  if (metricGroupOf(ordered[from]) !== metricGroupOf(ordered[to])) return null;
  return arrayMove(ordered, from, to);
};
