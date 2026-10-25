'use client';

import { Separator } from '@/components/ui/separator';

import { useCallsPerRun } from '../_hooks/use-calls-per-run';
import { useRunsPerWeek } from '../_hooks/use-runs-per-week';
import { callUnit } from '../_utils/form/call-count-label';
import { SummaryRow } from './summary-row';
import { WeeklyCallsTotal } from './weekly-calls-total';

export function MonitorSummaryPanel() {
  const { scenarios, repeats, callsPerRun } = useCallsPerRun();
  const runsPerWeek = useRunsPerWeek();
  const callsPerWeek = callsPerRun * runsPerWeek;

  return (
    <aside
      aria-labelledby="monitor-summary-title"
      className="rounded-lg border bg-background"
    >
      <h3
        id="monitor-summary-title"
        className="border-b bg-muted/40 px-3 py-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
      >
        This monitor
      </h3>
      <div className="flex flex-col gap-2 p-3">
        <SummaryRow label="Scenarios" value={scenarios} />
        <SummaryRow label="× repeats" value={repeats} />
        <Separator />
        <SummaryRow label="Calls per run" value={callsPerRun} />
        <SummaryRow label="Runs per week" value={runsPerWeek} />
        <Separator />
        <WeeklyCallsTotal
          callsPerWeek={callsPerWeek}
          unit={callUnit(callsPerWeek)}
        />
      </div>
    </aside>
  );
}
