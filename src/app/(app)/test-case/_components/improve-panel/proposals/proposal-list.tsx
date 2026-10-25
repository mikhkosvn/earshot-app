'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import type { EvaluatorImprovementProposal } from '@/server/evaluators/types';

import {
  changeKey,
  useAppliedChanges,
} from '@/app/(app)/test-case/_hooks/improve/use-applied-changes';
import { useApplyImprovementsMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluator-ai/use-apply-improvements-mutation';
import { ProposalCard } from './proposal-card';

type ProposalListProps = {
  proposals: EvaluatorImprovementProposal[];
};

export function ProposalList({ proposals }: ProposalListProps) {
  const projectId = useCurrentProjectId();
  const applied = useAppliedChanges();
  const applyImprovements = useApplyImprovementsMutation();
  const open = proposals.filter(
    (proposal) => !applied.has(changeKey(proposal.evaluatorId, proposal.after)),
  );
  const accept = (items: EvaluatorImprovementProposal[]) =>
    applyImprovements.mutate({
      projectId,
      changes: items.map((item) => ({
        evaluatorId: item.evaluatorId,
        kind: item.kind,
        value: item.after,
      })),
    });

  if (proposals.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {proposals.map((proposal) => (
        <ProposalCard
          key={`${proposal.evaluatorId}-${proposal.kind}`}
          proposal={proposal}
          isApplied={applied.has(
            changeKey(proposal.evaluatorId, proposal.after),
          )}
          isPending={applyImprovements.isPending}
          onAccept={() => accept([proposal])}
        />
      ))}
      <Button
        type="button"
        size="sm"
        disabled={open.length === 0 || applyImprovements.isPending}
        onClick={() => accept(open)}
      >
        Accept all ({open.length})
      </Button>
    </div>
  );
}
