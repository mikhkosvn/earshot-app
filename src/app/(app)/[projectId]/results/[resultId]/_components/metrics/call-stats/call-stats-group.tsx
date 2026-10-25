'use client';

import { MetricGroup } from '../metric-group';
import { FailedToConnectTile } from './failed-to-connect-tile';
import { LatencyTile } from './latency-tile';
import { RingingTile } from './ringing-tile';

export function CallStatsGroup() {
  return (
    <MetricGroup label="Call Stats">
      <FailedToConnectTile />
      <LatencyTile />
      <RingingTile />
    </MetricGroup>
  );
}
