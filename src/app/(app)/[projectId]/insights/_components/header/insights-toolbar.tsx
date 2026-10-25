'use client';

import { EnableInsightsButton } from '../enable/enable-insights-button';
import { InsightAgentSelect } from './insight-agent-select';
import { InsightTimeRange } from './insight-time-range';

export function InsightsToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <EnableInsightsButton />
      <InsightAgentSelect />
      <InsightTimeRange />
    </div>
  );
}
