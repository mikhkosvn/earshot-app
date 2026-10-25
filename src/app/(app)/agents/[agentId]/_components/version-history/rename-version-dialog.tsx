'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { AgentVersionItem } from '@/server/agents/types';

import { useRenameAgentVersionMutation } from '../../_hooks/mutations/versions/use-rename-agent-version-mutation';

type RenameVersionDialogProps = {
  version: AgentVersionItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RenameVersionDialog({
  version,
  open,
  onOpenChange,
}: RenameVersionDialogProps) {
  const [name, setName] = useState(version.name ?? '');
  const renameVersion = useRenameAgentVersionMutation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename v{version.version}</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          placeholder="Version name"
          aria-label="Version name"
          onChange={(event) => setName(event.target.value)}
        />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button
            type="button"
            disabled={renameVersion.isPending}
            onClick={() =>
              renameVersion.mutate(
                { agentVersionId: version.id, name },
                {
                  onSuccess: (result) => {
                    if (!result.ok) return;
                    onOpenChange(false);
                  },
                },
              )
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
