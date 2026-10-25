'use client';

import { useState } from 'react';

import { CallStatsGroup } from './call-stats/call-stats-group';
import { MoreMetricsGroups } from './more-metrics/more-metrics-groups';
import { MoreMetricsToggle } from './more-metrics/more-metrics-toggle';
import { RubricTilesGroup } from './tiles/rubric-tiles-group';

export function MetricsCard() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="rounded-xl border bg-background">
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-base font-semibold">Metrics</h2>
        <RubricTilesGroup />
        <CallStatsGroup />
        <MoreMetricsGroups open={showMore} />
      </div>
      <MoreMetricsToggle
        open={showMore}
        onToggle={() => setShowMore((current) => !current)}
      />
    </section>
  );
}
