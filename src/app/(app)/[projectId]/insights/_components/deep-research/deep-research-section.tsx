'use client';

import { useDeepResearchQuery } from '../../_hooks/queries/use-deep-research-query';
import { DeepResearchReportList } from './deep-research-report-list';
import { RunDeepResearchButton } from './run-deep-research-button';

export function DeepResearchSection() {
  const { data: state } = useDeepResearchQuery();

  if (!state.enabled) return null;
  return (
    <section className="flex flex-col rounded-lg border bg-background">
      <header className="flex items-start justify-between gap-3 border-b px-3 py-2.5">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xs font-semibold">Deep Research</h2>
          <p className="text-[11px] text-muted-foreground">
            Audits the calls of the last 7 days for failure modes beyond your
            metrics. A weekly report runs on its own.
          </p>
        </div>
        <RunDeepResearchButton />
      </header>
      <DeepResearchReportList />
    </section>
  );
}
