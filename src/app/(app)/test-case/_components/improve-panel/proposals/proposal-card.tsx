'use client';

import { Badge } from '@/components/ui/badge';
import { EvaluatorTextKindLabel } from '@/server/evaluators/constants/evaluator-text-kind';
import type { EvaluatorImprovementProposal } from '@/server/evaluators/types';

import { ProposalAcceptButton } from './proposal-accept-button';

type ProposalCardProps = {
  proposal: EvaluatorImprovementProposal;
  isApplied: boolean;
  isPending: boolean;
  onAccept: () => void;
};

export function ProposalCard({
  proposal,
  isApplied,
  isPending,
  onAccept,
}: ProposalCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-medium">
            {proposal.evaluatorName}
          </span>
          <span className="text-xs text-muted-foreground">
            {proposal.reason}
          </span>
        </div>
        <Badge variant="outline">{EvaluatorTextKindLabel[proposal.kind]}</Badge>
      </div>
      <details className="text-xs">
        <summary className="cursor-pointer text-muted-foreground">
          Show the change
        </summary>
        <div className="mt-2 flex flex-col gap-2">
          <pre className="rounded-md bg-red-50 p-2 whitespace-pre-wrap text-red-900 dark:bg-red-950 dark:text-red-200">
            {proposal.before || '(empty)'}
          </pre>
          <pre className="rounded-md bg-green-50 p-2 whitespace-pre-wrap text-green-900 dark:bg-green-950 dark:text-green-200">
            {proposal.after}
          </pre>
        </div>
      </details>
      <ProposalAcceptButton
        isApplied={isApplied}
        isPending={isPending}
        onAccept={onAccept}
      />
    </article>
  );
}
