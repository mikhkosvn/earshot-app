'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { AgentListItem } from '@/server/agents/types';

import { DeleteAgentForm } from './delete-agent-form';

type DeleteAgentDialogProps = {
  agent: AgentListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteAgentDialog({
  agent,
  open,
  onOpenChange,
}: DeleteAgentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Agent</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            agent.
          </DialogDescription>
        </DialogHeader>
        <DeleteAgentForm
          key={String(open)}
          agent={agent}
          onDeleted={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
