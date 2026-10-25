'use client';

import { ResultHeader } from './header/result-header';
import { MetricsCard } from './metrics/metrics-card';
import { ResultLiveStatus } from './result-live-status';
import { ResultScore } from './score/result-score';
import { AiSummaryCard } from './summary/ai-summary-card';
import { WorkflowCoverageCard } from './workflow/workflow-coverage-card';

export function ResultDetailView() {
  return (
    <div className="flex flex-col gap-3">
      <ResultLiveStatus />
      <ResultHeader />
      <ResultScore />
      <AiSummaryCard />
      <WorkflowCoverageCard />
      <MetricsCard />
    </div>
  );
}
