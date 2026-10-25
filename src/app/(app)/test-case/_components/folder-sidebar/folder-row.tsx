'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FolderView } from '@/server/folders/types';

import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';
import { FolderRowAction } from './folder-row-action';
import { FolderRowIcon } from './folder-row-icon';

const DEPTH_INDENT_PX = 12;

type FolderRowProps = {
  folder: FolderView;
};

export function FolderRow({ folder }: FolderRowProps) {
  const [params, setParams] = useEvaluatorListParams();
  const isSelected = params.folder === folder.path;

  return (
    <div
      className={cn(
        'group flex items-center rounded-lg hover:bg-muted',
        isSelected && 'bg-muted',
      )}
    >
      <Button
        type="button"
        variant="unstyled"
        size="unstyled"
        aria-current={isSelected}
        className={cn(
          'h-7 min-w-0 flex-1 justify-start gap-2 px-2 text-xs font-normal',
          isSelected && 'font-medium',
        )}
        style={{ paddingLeft: 8 + folder.depth * DEPTH_INDENT_PX }}
        onClick={() => setParams({ folder: folder.path, page: null })}
      >
        <FolderRowIcon folder={folder} />
        <span className="truncate">{folder.name}</span>
      </Button>
      <FolderRowAction folder={folder} />
    </div>
  );
}
