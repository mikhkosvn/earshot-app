'use client';

import { Button } from '@/components/ui/button';

import { useDismissProposalMutation } from '../../_hooks/mutations/use-dismiss-proposal-mutation';

interface DismissProposalConfirmProps {
  sessionId: number;
  onKeep: () => void;
}

export function DismissProposalConfirm({
  sessionId,
  onKeep,
}: DismissProposalConfirmProps) {
  const dismissProposal = useDismissProposalMutation();

  return (
    <div className="flex flex-col gap-2 border-t pt-3">
      <p className="text-sm">
        Close this review without applying? The metric keeps its current
        version.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="destructive"
          disabled={dismissProposal.isPending}
          onClick={() => dismissProposal.mutate({ sessionId })}
        >
          Dismiss proposal
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={dismissProposal.isPending}
          onClick={onKeep}
        >
          Keep reviewing
        </Button>
      </div>
    </div>
  );
}
