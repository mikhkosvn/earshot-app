'use client';

import { FoldersIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ALL_EVALUATORS_FOLDER_PATH } from '@/server/folders/constants';

import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';

export function AllEvaluatorsRow() {
  const [{ folder }, setParams] = useEvaluatorListParams();
  const isSelected = folder === ALL_EVALUATORS_FOLDER_PATH;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-current={isSelected}
      className={cn(
        'h-7 justify-start gap-2 px-2 text-xs font-normal',
        isSelected && 'bg-muted font-medium',
      )}
      onClick={() =>
        setParams({ folder: ALL_EVALUATORS_FOLDER_PATH, page: null })
      }
    >
      <FoldersIcon className="size-3.5 text-muted-foreground" />
      All Evaluators
    </Button>
  );
}
