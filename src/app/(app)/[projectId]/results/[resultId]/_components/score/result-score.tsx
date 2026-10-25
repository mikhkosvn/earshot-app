'use client';

import { useResultDetail } from '../../_hooks/use-result-detail';
import { resultStatusText, runsPassedText } from '../../_utils/result-text';
import { ScoreGauge } from './score-gauge';

export function ResultScore() {
  const result = useResultDetail();

  return (
    <div className="flex items-center gap-6 px-1">
      <ScoreGauge percent={result.successRate} />
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">
          {runsPassedText(result.counts)}
        </h2>
        <p className="text-muted-foreground">
          {resultStatusText(result.counts)}
        </p>
      </div>
    </div>
  );
}
