'use client';

import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { FolderView } from '@/server/folders/types';

import {
  FOLDER_DEPTH_INDENT_PX,
  FOLDER_ROW_BASE_PADDING_PX,
} from '../../../_constants/folder-list-entry';
import { useIsDeletingFolder } from '../../../_hooks/folders/use-is-deleting-folder';
import { useRouteFolderId } from '../../../_hooks/folders/use-route-folder-id';
import { FolderRowAction } from './folder-row-action';
import { FolderRowIcon } from './folder-row-icon';
import { FolderRowName } from './folder-row-name';

interface FolderRowProps {
  folder: FolderView;
}

export function FolderRow({ folder }: FolderRowProps) {
  const projectId = useCurrentProjectId();
  const isSelected = useRouteFolderId() === folder.id;
  const isDeleting = useIsDeletingFolder(folder.path);

  return (
    <div
      aria-busy={isDeleting}
      className={cn(
        'group flex items-center rounded-lg hover:bg-muted',
        isSelected && 'bg-muted',
        isDeleting && 'text-muted-foreground',
      )}
    >
      <Link
        href={UrlGenerator.evaluatorFolder({
          folderId: folder.id,
          values: { project: projectId },
        })}
        aria-current={isSelected}
        className={cn(
          buttonVariants({ variant: 'unstyled', size: 'unstyled' }),
          'h-7 min-w-0 flex-1 justify-start gap-2 px-2 text-xs font-normal',
          isSelected && 'font-medium',
        )}
        style={{
          paddingLeft:
            FOLDER_ROW_BASE_PADDING_PX + folder.depth * FOLDER_DEPTH_INDENT_PX,
        }}
      >
        <FolderRowIcon folder={folder} />
        <FolderRowName folder={folder} />
      </Link>
      <FolderRowAction folder={folder} />
    </div>
  );
}
