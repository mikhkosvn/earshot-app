import { FolderIcon, ShieldCheckIcon } from 'lucide-react';

import type { FolderView } from '@/server/folders/types';

interface FolderRowIconProps {
  folder: FolderView;
}

export function FolderRowIcon({ folder }: FolderRowIconProps) {
  if (folder.isRegressionSuite) {
    return <ShieldCheckIcon className="size-3.5 shrink-0 text-blue-600" />;
  }
  return <FolderIcon className="size-3.5 shrink-0 text-muted-foreground" />;
}
