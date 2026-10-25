'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AgentListItem } from '@/server/agents/types';

import { useDeleteAgentMutation } from '../../_hooks/mutations/agent-list/use-delete-agent-mutation';
import { PendingLabel } from '../pending-label';

type DeleteAgentFormProps = {
  agent: AgentListItem;
  onDeleted: () => void;
};

export function DeleteAgentForm({ agent, onDeleted }: DeleteAgentFormProps) {
  const [confirmText, setConfirmText] = useState('');
  const [deleteRelated, setDeleteRelated] = useState(false);
  const deleteAgent = useDeleteAgentMutation();
  const canDelete = confirmText === agent.name && !deleteAgent.isPending;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!canDelete) return;
        deleteAgent.mutate(
          { agentId: agent.id, deleteRelated },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              onDeleted();
            },
          },
        );
      }}
    >
      <Label className="items-start gap-2.5 rounded-lg border p-3 text-sm font-normal">
        <Checkbox
          checked={deleteRelated}
          onCheckedChange={(checked) => setDeleteRelated(checked)}
          className="mt-0.5"
        />
        Also delete related call logs, scenario evaluators, results, and runs,
        and hide associated metric evaluations
      </Label>
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Please type <strong>{agent.name}</strong> to confirm.
        </p>
        <Input
          value={confirmText}
          placeholder="Type here to confirm"
          aria-label="Type here to confirm"
          onChange={(event) => setConfirmText(event.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button
          type="submit"
          variant="unstyled"
          size="default"
          disabled={!canDelete}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          <PendingLabel
            pending={deleteAgent.isPending}
            pendingText="Deleting..."
          >
            Delete
          </PendingLabel>
        </Button>
      </div>
    </form>
  );
}
