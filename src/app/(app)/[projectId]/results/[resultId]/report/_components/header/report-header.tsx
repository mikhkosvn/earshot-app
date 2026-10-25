'use client';

import { useResultDetail } from '../../../_hooks/use-result-detail';
import { triggerTimeText } from '../../../_utils/date-format';
import { ReportAgentLine } from './report-agent-line';

export function ReportHeader() {
  const result = useResultDetail();

  return (
    <header className="flex flex-col gap-1">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Result report
      </p>
      <h1 className="text-2xl font-semibold">
        {result.name} ({result.id})
      </h1>
      <ReportAgentLine />
      <p className="text-sm text-muted-foreground">
        Result Trigger Time: {triggerTimeText(result.createdAt)}
      </p>
    </header>
  );
}
