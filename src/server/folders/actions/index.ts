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
import { FoldersActionOperation } from '@/server/folders/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

interface FolderPathResult {
  id: number;
  path: string;
}

export async function listFoldersAction(
  args: ListFoldersInput,
): Promise<FolderView[]> {
  return withActionEvent(FoldersActionOperation.listFolders, () =>
    listFolders(args),
  );
}

export async function createFolderAction(
  args: CreateFolderInput,
): Promise<ActionResult<FolderPathResult>> {
  return withActionEvent(FoldersActionOperation.createFolder, () =>
    runAction(() => createFolder(args)),
  );
}

export async function renameFolderAction(
  args: RenameFolderInput,
): Promise<ActionResult<FolderPathResult>> {
  return withActionEvent(FoldersActionOperation.renameFolder, () =>
    runAction(() => renameFolder(args)),
  );
}

export async function deleteFolderAction(
  args: FolderTargetInput,
): Promise<ActionResult<{ path: string; deletedFolderCount: number }>> {
  return withActionEvent(FoldersActionOperation.deleteFolder, () =>
    runAction(() => deleteFolder(args)),
  );
}

export async function duplicateFolderAction(
  args: FolderTargetInput,
): Promise<ActionResult<{ path: string; evaluatorCount: number }>> {
  return withActionEvent(FoldersActionOperation.duplicateFolder, () =>
    runAction(() => duplicateFolder(args)),
  );
}
