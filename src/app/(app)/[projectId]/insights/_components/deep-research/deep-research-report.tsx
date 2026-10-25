'use client';

import { format } from 'date-fns';

import { RelativeTime } from '@/components/common/relative-time';
import { Badge } from '@/components/ui/badge';
import {
  DeepResearchStatusLabel,
  DeepResearchTriggerLabel,
} from '@/server/insights/constants/deep-research-status-labels';
import type { DeepResearchView } from '@/server/insights/types';

import { ResearchModeItem } from './research-mode-item';

const WINDOW_FORMAT = 'MMM d';

type DeepResearchReportProps = {
  report: DeepResearchView;
};

export function DeepResearchReport({ report }: DeepResearchReportProps) {
  return (
    <li className="flex flex-col gap-2 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-medium">
          {DeepResearchTriggerLabel[report.trigger]}
          <Badge variant="outline" className="text-[10px]">
            {DeepResearchStatusLabel[report.status]}
          </Badge>
        </span>
        <RelativeTime date={report.createdAt} />
      </div>
      <p className="text-[11px] text-muted-foreground" suppressHydrationWarning>
        {format(report.windowStart, WINDOW_FORMAT)} to{' '}
        {format(report.windowEnd, WINDOW_FORMAT)} · {report.numCallsAnalyzed}{' '}
        calls analysed
      </p>
      <p className="text-xs">{report.errorMessage ?? report.headline}</p>
      <ul className="grid gap-2 md:grid-cols-2">
        {report.failureModes.map((mode) => (
          <ResearchModeItem key={mode.id} mode={mode} />
        ))}
      </ul>
    </li>
  );
}
