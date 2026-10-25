'use client';

import { useMetricVersions } from '../../_hooks/use-metric-versions';
import { recordCountText } from '../../_utils/version-text';
import { HistoryEntry } from './history-entry';

export function ChangeHistoryCard() {
  const versions = useMetricVersions();

  return (
    <section className="rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b px-3 py-2.5">
        <h2 className="text-sm font-semibold">Change History</h2>
        <span className="text-xs text-muted-foreground">
          {recordCountText(versions.length)}
        </span>
      </div>
      <ol className="flex max-h-96 flex-col gap-3 overflow-y-auto p-3">
        {versions.map((version, index) => (
          <HistoryEntry
            key={version.id}
            version={version}
            isCurrent={index === 0}
          />
        ))}
      </ol>
    </section>
  );
}
