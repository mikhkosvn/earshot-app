'use client';

import { useSharedResult } from '../../_hooks/use-shared-result';
import { passedRunsText, resultStateText } from '../../_utils/share-format';

export function SharedResultScore() {
  const { successRate, counts } = useSharedResult();

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-background p-4">
      <span className="text-3xl font-semibold tabular-nums">
        {Math.round(successRate)}%
      </span>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-semibold">
          {passedRunsText(counts.success, counts.total)}
        </h2>
        <p className="text-sm text-muted-foreground">
          {resultStateText(counts)}
        </p>
      </div>
    </div>
  );
}
