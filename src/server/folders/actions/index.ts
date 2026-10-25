'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createFolder } from '@/server/folders/create-folder';
import { deleteFolder } from '@/server/folders/delete-folder';
import { duplicateFolder } from '@/server/folders/duplicate-folder';
import { listFolders } from '@/server/folders/list-folders';
import { renameFolder } from '@/server/folders/rename-folder';
import type {
  CreateFolderInput,
  FolderTargetInput,
  FolderView,
  ListFoldersInput,
  RenameFolderInput,
} from '@/server/folders/types';

type FolderPathResult = { id: number; path: string };

export async function listFoldersAction(
  args: ListFoldersInput,
): Promise<FolderView[]> {
  return listFolders(args);
}

export async function createFolderAction(
  args: CreateFolderInput,
): Promise<ActionResult<FolderPathResult>> {
  return runAction(() => createFolder(args));
}

export async function renameFolderAction(
  args: RenameFolderInput,
): Promise<ActionResult<FolderPathResult>> {
  return runAction(() => renameFolder(args));
}

export async function deleteFolderAction(
  args: FolderTargetInput,
): Promise<ActionResult<{ path: string; deletedFolderCount: number }>> {
  return runAction(() => deleteFolder(args));
}

export async function duplicateFolderAction(
  args: FolderTargetInput,
): Promise<ActionResult<{ path: string; evaluatorCount: number }>> {
  return runAction(() => duplicateFolder(args));
}
