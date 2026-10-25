'use client';

import { ShareReportMenu } from '../share/share-report-menu';
import { ResultAgentChip } from './result-agent-chip';
import { ResultBackButton } from './result-back-button';
import { ResultRunTypeChip } from './result-run-type-chip';
import { ResultTitle } from './result-title';
import { ResultTriggerTimeChip } from './result-trigger-time-chip';

export function ResultHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <ResultBackButton />
        <ResultTitle />
        <ResultAgentChip />
        <ResultRunTypeChip />
        <ResultTriggerTimeChip />
      </div>
      <ShareReportMenu />
    </div>
  );
}
