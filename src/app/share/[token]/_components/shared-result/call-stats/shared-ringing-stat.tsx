import type { ResultRingingStats } from '@/server/results/types';

import { EMPTY_VALUE, numberText } from '../../../_utils/share-format';
import { SharedPercentile } from './shared-percentile';

type SharedRingingStatProps = {
  ringing: ResultRingingStats | null;
};

export function SharedRingingStat({ ringing }: SharedRingingStatProps) {
  if (!ringing) return <span className="font-medium">{EMPTY_VALUE}</span>;

  return (
    <div className="flex items-center gap-2">
      <SharedPercentile label="P50" value={ringing.p50} />
      <span className="font-medium tabular-nums">
        {numberText(ringing.mean)} s
      </span>
    </div>
  );
}
