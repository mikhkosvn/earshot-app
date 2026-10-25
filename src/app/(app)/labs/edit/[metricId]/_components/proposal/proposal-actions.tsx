'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ApplyProposalButton } from './apply-proposal-button';
import { DismissProposalConfirm } from './dismiss-proposal-confirm';

interface ProposalActionsProps {
  sessionId: number;
}

export function ProposalActions({ sessionId }: ProposalActionsProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <DismissProposalConfirm
        sessionId={sessionId}
        onKeep={() => setIsConfirming(false)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 border-t pt-3">
      <div className="flex flex-wrap gap-2">
        <ApplyProposalButton sessionId={sessionId} />
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsConfirming(true)}
        >
          Dismiss
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Apply to metric saves the proposal as a new version of the metric.
        Dismiss closes the review and keeps the current version.
      </p>
    </div>
  );
}
