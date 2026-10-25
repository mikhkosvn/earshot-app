import { SharedCallStats } from '../call-stats/shared-call-stats';
import { SharedMetricGroupLabel } from './shared-metric-group-label';
import { SharedRubricTiles } from './shared-rubric-tiles';

export function SharedMetricsCard() {
  return (
    <section className="flex flex-col gap-3 rounded-lg border bg-background p-4">
      <h2 className="text-base font-semibold">Metrics</h2>
      <SharedMetricGroupLabel>Rubric</SharedMetricGroupLabel>
      <SharedRubricTiles />
      <SharedMetricGroupLabel>Call stats</SharedMetricGroupLabel>
      <SharedCallStats />
    </section>
  );
}
