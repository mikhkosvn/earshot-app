'use client';

import { FolderListEntryKind } from '../../../_constants/folder-list-entry';
import type { FolderListEntry } from '../../../_utils/folders/folder-list-entries';
import { FolderRow } from './folder-row';
import { PendingFolderRow } from './pending-folder-row';

interface FolderListEntryRowProps {
  entry: FolderListEntry;
}

export function FolderListEntryRow({ entry }: FolderListEntryRowProps) {
  if (entry.kind === FolderListEntryKind.pending) {
    return <PendingFolderRow entry={entry} />;
  }
  return <FolderRow folder={entry.folder} />;
}
