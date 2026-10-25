'use client';

import { useSharedResult } from '../../../_hooks/use-shared-result';
import { SharedCallStatTile } from './shared-call-stat-tile';
import { SharedLatencyStat } from './shared-latency-stat';
import { SharedRingingStat } from './shared-ringing-stat';

export function SharedCallStats() {
  const { callStats } = useSharedResult();

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
      <SharedCallStatTile label="Failed to Connect">
        <span className="font-medium tabular-nums">
          {callStats.failedToConnect}
        </span>
      </SharedCallStatTile>
      <SharedCallStatTile label="Latency">
        <SharedLatencyStat latency={callStats.latency} />
      </SharedCallStatTile>
      <SharedCallStatTile label="Avg Ringing Duration">
        <SharedRingingStat ringing={callStats.ringing} />
      </SharedCallStatTile>
    </div>
  );
}
