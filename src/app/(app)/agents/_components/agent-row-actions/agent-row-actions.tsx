'use client';

import { CopyIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { AgentListItem } from '@/server/agents/types';

import { DeleteAgentDialog } from './delete-agent-dialog';
import { DuplicateAgentDialog } from './duplicate-agent-dialog';

type AgentRowActionsProps = {
  agent: AgentListItem;
};

export function AgentRowActions({ agent }: AgentRowActionsProps) {
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Duplicate agent"
        onClick={() => setDuplicateOpen(true)}
      >
        <CopyIcon />
      </Button>
      <Button
        type="button"
        variant="unstyled"
        size="icon-sm"
        aria-label="Delete agent"
        className="bg-red-500 text-white hover:bg-red-600"
        onClick={() => setDeleteOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DuplicateAgentDialog
        agentId={agent.id}
        open={duplicateOpen}
        onOpenChange={setDuplicateOpen}
      />
      <DeleteAgentDialog
        agent={agent}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
