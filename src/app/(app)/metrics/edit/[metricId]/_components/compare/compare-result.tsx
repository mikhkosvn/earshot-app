'use client';

import { useMetricVersions } from '@/components/common/metric-history/_hooks/use-metric-versions';
import { diffSnapshots } from '../../_utils/snapshot-diff';
import { CompareChangeList } from './compare-change-list';

export interface ComparedPair {
  fromId: number;
  toId: number;
}

interface CompareResultProps {
  compared: ComparedPair | null;
}

export function CompareResult({ compared }: CompareResultProps) {
  const versions = useMetricVersions();
  const from = versions.find((version) => version.id === compared?.fromId);
  const to = versions.find((version) => version.id === compared?.toId);

  if (!from || !to) {
    return (
      <p className="text-xs text-muted-foreground italic">
        Select two versions and click Compare.
      </p>
    );
  }

  return (
    <CompareChangeList changes={diffSnapshots(from.snapshot, to.snapshot)} />
  );
}
