import { FolderIcon } from 'lucide-react';

import {
  FOLDER_DEPTH_INDENT_PX,
  FOLDER_ROW_BASE_PADDING_PX,
} from '../../../_constants/folder-list-entry';
import type { PendingFolderEntry } from '../../../_utils/folders/folder-list-entries';

interface PendingFolderRowProps {
  entry: PendingFolderEntry;
}

export function PendingFolderRow({ entry }: PendingFolderRowProps) {
  return (
    <div
      aria-busy="true"
      className="flex h-7 items-center gap-2 rounded-lg px-2 text-xs text-muted-foreground"
      style={{
        paddingLeft:
          FOLDER_ROW_BASE_PADDING_PX + entry.depth * FOLDER_DEPTH_INDENT_PX,
      }}
    >
      <FolderIcon className="size-3.5 shrink-0" />
      <span className="truncate">{entry.name}</span>
    </div>
  );
}
