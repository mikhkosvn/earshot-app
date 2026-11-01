'use client';

import type { FolderView } from '@/server/folders/types';

import { usePendingFolderName } from '../../../_hooks/folders/use-pending-folder-name';

interface FolderRowNameProps {
  folder: FolderView;
}

export function FolderRowName({ folder }: FolderRowNameProps) {
  const pendingName = usePendingFolderName(folder.path);

  if (pendingName !== null) {
    return (
      <span className="truncate text-muted-foreground">{pendingName}</span>
    );
  }
  return <span className="truncate">{folder.name}</span>;
}
