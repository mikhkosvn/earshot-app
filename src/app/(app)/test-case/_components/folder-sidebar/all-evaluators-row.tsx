'use client';

import { FoldersIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useRouteFolderId } from '../../_hooks/folders/use-route-folder-id';

export function AllEvaluatorsRow() {
  const projectId = useCurrentProjectId();
  const isSelected = useRouteFolderId() === null;

  return (
    <Link
      href={UrlGenerator.evaluators({ values: { project: projectId } })}
      aria-current={isSelected}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'h-7 justify-start gap-2 px-2 text-xs font-normal',
        isSelected && 'bg-muted font-medium',
      )}
    >
      <FoldersIcon className="size-3.5 text-muted-foreground" />
      All Evaluators
    </Link>
  );
}
