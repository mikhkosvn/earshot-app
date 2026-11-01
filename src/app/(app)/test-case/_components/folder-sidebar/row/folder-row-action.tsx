'use client';

import type { FolderView } from '@/server/folders/types';

import { DuplicateFolderButton } from './duplicate-folder-button';
import { FolderMenu } from './folder-menu';

interface FolderRowActionProps {
  folder: FolderView;
}

export function FolderRowAction({ folder }: FolderRowActionProps) {
  if (folder.isRegressionSuite)
    return <DuplicateFolderButton folder={folder} />;
  return <FolderMenu folder={folder} />;
}
