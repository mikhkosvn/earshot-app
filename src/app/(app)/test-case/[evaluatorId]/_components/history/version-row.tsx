'use client';

import { format } from 'date-fns';
import { EllipsisIcon, RotateCcwIcon } from 'lucide-react';

import { useRestoreVersionMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluators/use-restore-version-mutation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { EvaluatorVersionView } from '@/server/evaluators/types';

import { useEvaluatorId } from '../../_hooks/use-evaluator-id';
import { CurrentVersionBadge } from './current-version-badge';
import { VersionNote } from './version-note';

interface VersionRowProps {
  version: EvaluatorVersionView;
}

export function VersionRow({ version }: VersionRowProps) {
  const evaluatorId = useEvaluatorId();
  const restoreVersion = useRestoreVersionMutation();

  return (
    <li className="flex items-start gap-2 px-3 py-2.5">
      <span
        aria-hidden
        className={cn(
          'mt-1.5 size-2 shrink-0 rounded-full',
          version.isCurrent && 'bg-green-500',
        )}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-xs">
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="font-mono">
            v{version.version}
          </Badge>
          <CurrentVersionBadge isCurrent={version.isCurrent} />
          <span className="text-muted-foreground">
            {version.createdByName ?? 'API'}
          </span>
        </div>
        <time
          dateTime={version.createdAt.toISOString()}
          suppressHydrationWarning
        >
          {format(version.createdAt, 'MMM d, yyyy · hh:mm a')}
        </time>
        <VersionNote version={version} />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Actions for version ${version.version}`}
            />
          }
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            disabled={version.isCurrent || restoreVersion.isPending}
            onClick={() =>
              restoreVersion.mutate({ evaluatorId, versionId: version.id })
            }
          >
            <RotateCcwIcon />
            Restore this version
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
