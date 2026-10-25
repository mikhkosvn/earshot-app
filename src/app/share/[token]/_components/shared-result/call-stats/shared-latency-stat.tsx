import type { ResultLatencyStats } from '@/server/results/types';

import { EMPTY_VALUE, numberText } from '../../../_utils/share-format';
import { SharedPercentile } from './shared-percentile';

type SharedLatencyStatProps = {
  latency: ResultLatencyStats | null;
};

export function SharedLatencyStat({ latency }: SharedLatencyStatProps) {
  if (!latency) return <span className="font-medium">{EMPTY_VALUE}</span>;

  return (
    <div className="flex items-center gap-2">
      <SharedPercentile label="P50" value={latency.p50} />
      <SharedPercentile label="P95" value={latency.p95} />
      <SharedPercentile label="P99" value={latency.p99} />
      <span className="font-medium tabular-nums">
        {numberText(latency.mean)} ms
      </span>
    </div>
  );
}
