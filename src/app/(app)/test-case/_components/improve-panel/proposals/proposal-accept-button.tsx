'use client';

import { CheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ProposalAcceptButtonProps = {
  isApplied: boolean;
  isPending: boolean;
  onAccept: () => void;
};

export function ProposalAcceptButton({
  isApplied,
  isPending,
  onAccept,
}: ProposalAcceptButtonProps) {
  if (isApplied) {
    return (
      <Badge variant="secondary" className="w-fit gap-1">
        <CheckIcon className="size-3" />
        Accepted
      </Badge>
    );
  }
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-fit"
      disabled={isPending}
      onClick={onAccept}
    >
      Accept
    </Button>
  );
}
