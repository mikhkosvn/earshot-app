'use client';

import { useDeepResearchQuery } from '../../_hooks/queries/use-deep-research-query';
import { DeepResearchReport } from './deep-research-report';

export function DeepResearchReportList() {
  const { data: state } = useDeepResearchQuery();

  if (state.reports.length === 0) {
    return (
      <p className="px-3 py-6 text-center text-xs text-muted-foreground">
        No Deep Research report yet. Run one now, or wait for the weekly report.
      </p>
    );
  }
  return (
    <ul className="flex flex-col divide-y">
      {state.reports.map((report) => (
        <DeepResearchReport key={report.id} report={report} />
      ))}
    </ul>
  );
}
