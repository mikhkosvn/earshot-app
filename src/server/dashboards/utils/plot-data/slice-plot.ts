import 'server-only';

import type { PlotSlice } from '@/server/dashboards/types';

const MAX_SLICES = 20;

export const slicePlot = (labels: string[]) => {
  const counts = new Map<string, number>();
  for (const label of labels) {
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  const total = labels.length;
  const slices: PlotSlice[] = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_SLICES)
    .map(([label, value]) => ({
      label,
      value,
      percentage: Math.round((value / total) * 1000) / 10,
    }));
  return { slices, total };
};
