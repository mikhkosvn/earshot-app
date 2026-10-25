'use client';

import { EllipsisIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AgentVersionItem } from '@/server/agents/types';

import { useRestoreAgentVersionMutation } from '../../_hooks/mutations/versions/use-restore-agent-version-mutation';
import { RenameVersionDialog } from './rename-version-dialog';

interface VersionMenuProps {
  version: AgentVersionItem;
}

export function VersionMenu({ version }: VersionMenuProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const restoreVersion = useRestoreAgentVersionMutation();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Actions for v${version.version}`}
            />
          }
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuItem onClick={() => setRenameOpen(true)}>
            Rename version
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={version.isCurrent || restoreVersion.isPending}
            onClick={() =>
              restoreVersion.mutate({ agentVersionId: version.id })
            }
          >
            Restore this version
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameVersionDialog
        version={version}
        open={renameOpen}
        onOpenChange={setRenameOpen}
      />
    </>
  );
}
