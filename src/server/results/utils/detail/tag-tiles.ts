import 'server-only';

import type { ResultTagTile } from '@/server/results/types';
import type { ResultRunRecord } from '@/server/results/utils/detail/detail-record';
import { successRateOf } from '@/server/results/utils/result-row';

export const buildTagTiles = (runs: ResultRunRecord[]): ResultTagTile[] => {
  const runsByTag = new Map<string, ResultRunRecord[]>();
  for (const run of runs) {
    for (const entry of run.evaluator?.tags ?? []) {
      const tagged = runsByTag.get(entry.tag.name) ?? [];
      runsByTag.set(entry.tag.name, [...tagged, run]);
    }
  }
  return [...runsByTag.entries()]
    .toSorted(([left], [right]) => left.localeCompare(right))
    .map(([tag, tagged]) => ({
      tag,
      successRate: successRateOf(tagged) ?? 0,
      runIds: tagged.map((run) => run.id),
    }));
};
