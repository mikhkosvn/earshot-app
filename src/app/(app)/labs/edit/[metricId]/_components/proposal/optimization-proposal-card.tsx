'use client';

import { SparklesIcon } from 'lucide-react';

import { OptimizationStatusLabel } from '@/server/labs/constants/optimization-status-labels';

import { useLabMetric } from '../../_hooks/lab/use-lab-metric';
import { usePendingProposal } from '../../_hooks/lab/use-pending-proposal';
import { ProposalChanges } from './changes/proposal-changes';
import { ProposalActions } from './proposal-actions';
import { ProposalFigures } from './proposal-figures';
import { ProposalScheduleNote } from './proposal-schedule-note';
import { ProposalSummary } from './summary/proposal-summary';

export function OptimizationProposalCard() {
  const metric = useLabMetric();
  const pending = usePendingProposal();

  if (!pending) return null;

  return (
    <section
      aria-label="Proposed metric improvement"
      className="flex flex-col gap-3 rounded-lg border bg-background p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <SparklesIcon className="size-4 text-violet-600" />
          Proposed metric improvement · {metric.name}
        </h2>
        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          {OptimizationStatusLabel[pending.status]}
        </span>
      </div>
      <ProposalScheduleNote scheduleName={pending.scheduleName} />
      <ProposalFigures oldScore={pending.oldScore} newScore={pending.newScore} />
      <ProposalSummary summary={pending.summary} />
      <ProposalChanges changes={pending.proposal.changes} />
      <ProposalActions sessionId={pending.sessionId} />
    </section>
  );
}
