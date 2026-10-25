'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useDuplicateAgentMutation } from '../../_hooks/mutations/agent-list/use-duplicate-agent-mutation';
import { PendingLabel } from '../pending-label';

interface DuplicateAgentDialogProps {
  agentId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DuplicateAgentDialog({
  agentId,
  open,
  onOpenChange,
}: DuplicateAgentDialogProps) {
  const duplicateAgent = useDuplicateAgentMutation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Duplicate Agent</DialogTitle>
          <DialogDescription>
            Are you sure you want to duplicate this agent?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button
            type="button"
            disabled={duplicateAgent.isPending}
            onClick={() =>
              duplicateAgent.mutate(
                { agentId },
                {
                  onSuccess: (result) => {
                    if (!result.ok) return;
                    onOpenChange(false);
                  },
                },
              )
            }
          >
            <PendingLabel
              pending={duplicateAgent.isPending}
              pendingText="Duplicating..."
            >
              Duplicate
            </PendingLabel>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
