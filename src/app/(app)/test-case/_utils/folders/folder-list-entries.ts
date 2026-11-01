import { FolderListEntryKind } from '@/app/(app)/test-case/_constants/folder-list-entry';
import type { CreateFolderInput, FolderView } from '@/server/folders/types';

import {
  folderPathDepth,
  isSameOrDescendantFolderPath,
  joinFolderPath,
} from './folder-path';

export interface PendingFolderCreate {
  mutationId: number;
  input: CreateFolderInput;
}

interface SavedFolderEntry {
  kind: typeof FolderListEntryKind.saved;
  key: string;
  path: string;
  folder: FolderView;
}

export interface PendingFolderEntry {
  kind: typeof FolderListEntryKind.pending;
  key: string;
  path: string;
  name: string;
  depth: number;
}

export type FolderListEntry = SavedFolderEntry | PendingFolderEntry;

const savedEntry = (folder: FolderView): SavedFolderEntry => ({
  kind: FolderListEntryKind.saved,
  key: `folder-${folder.id}`,
  path: folder.path,
  folder,
});

const pendingEntry = ({
  mutationId,
  input,
}: PendingFolderCreate): PendingFolderEntry => {
  const name = input.name.trim();
  return {
    kind: FolderListEntryKind.pending,
    key: `pending-${mutationId}`,
    path: joinFolderPath(input.parentPath, name),
    name,
    depth: folderPathDepth(input.parentPath),
  };
};

const insertIndex = (entries: FolderListEntry[], parentPath: string | null) => {
  if (parentPath === null) return entries.length;
  const lastIndex = entries.findLastIndex((entry) =>
    isSameOrDescendantFolderPath(entry.path, parentPath),
  );
  if (lastIndex === -1) return entries.length;
  return lastIndex + 1;
};

export const withPendingFolders = (
  folders: FolderView[],
  creates: PendingFolderCreate[],
) =>
  creates.reduce<FolderListEntry[]>(
    (entries, create) =>
      entries.toSpliced(
        insertIndex(entries, create.input.parentPath),
        0,
        pendingEntry(create),
      ),
    folders.map(savedEntry),
  );
