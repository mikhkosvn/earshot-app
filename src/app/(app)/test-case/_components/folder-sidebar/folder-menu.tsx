'use client';

import {
  CopyIcon,
  EllipsisVerticalIcon,
  FolderPlusIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { FolderView } from '@/server/folders/types';

import { FolderDialog } from '../../_constants/folder-dialog';
import { useDuplicateFolderMutation } from '../../_hooks/mutations/folders/use-duplicate-folder-mutation';
import { CreateFolderDialog } from './dialogs/create-folder-dialog';
import { DeleteFolderDialog } from './dialogs/delete-folder-dialog';
import { RenameFolderDialog } from './dialogs/rename-folder-dialog';

type FolderMenuProps = {
  folder: FolderView;
};

export function FolderMenu({ folder }: FolderMenuProps) {
  const projectId = useCurrentProjectId();
  const [dialog, setDialog] = useState<FolderDialog | null>(null);
  const duplicateFolder = useDuplicateFolderMutation();
  const closeDialog = (open: boolean) => {
    if (!open) setDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Folder actions for ${folder.name}`}
              className="mr-1"
            />
          }
        >
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem onClick={() => setDialog(FolderDialog.subfolder)}>
            <FolderPlusIcon />
            New subfolder
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!folder.isRenamable}
            onClick={() => setDialog(FolderDialog.rename)}
          >
            <PencilIcon />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              duplicateFolder.mutate({ projectId, path: folder.path })
            }
          >
            <CopyIcon />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled={!folder.isDeletable}
            onClick={() => setDialog(FolderDialog.delete)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateFolderDialog
        open={dialog === FolderDialog.subfolder}
        onOpenChange={closeDialog}
        parentPath={folder.path}
      />
      <RenameFolderDialog
        open={dialog === FolderDialog.rename}
        onOpenChange={closeDialog}
        folder={folder}
      />
      <DeleteFolderDialog
        open={dialog === FolderDialog.delete}
        onOpenChange={closeDialog}
        folder={folder}
      />
    </>
  );
}
