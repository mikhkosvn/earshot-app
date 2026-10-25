'use client';

import { CopyIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { FolderView } from '@/server/folders/types';

import { useDuplicateFolderMutation } from '../../_hooks/mutations/folders/use-duplicate-folder-mutation';

type DuplicateFolderButtonProps = {
  folder: FolderView;
};

export function DuplicateFolderButton({ folder }: DuplicateFolderButtonProps) {
  const projectId = useCurrentProjectId();
  const duplicateFolder = useDuplicateFolderMutation();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Duplicate folder"
            disabled={duplicateFolder.isPending}
            className="mr-1"
            onClick={() =>
              duplicateFolder.mutate({ projectId, path: folder.path })
            }
          />
        }
      >
        <CopyIcon />
      </TooltipTrigger>
      <TooltipContent>Duplicate folder</TooltipContent>
    </Tooltip>
  );
}
