'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import type { JobKind } from '@/generated/prisma/enums';
import { useDismissAllJobsMutation } from '@/hooks/jobs/use-dismiss-all-jobs-mutation';
import { useRecentJobs } from '@/hooks/jobs/use-recent-jobs';

import { panelJobs } from '../_utils/panel-jobs';

type BackgroundTaskSummaryProps = {
  kind: JobKind;
  hiddenBefore: number | undefined;
  onDismiss: () => void;
};

export function BackgroundTaskSummary({
  kind,
  hiddenBefore,
  onDismiss,
}: BackgroundTaskSummaryProps) {
  const projectId = useCurrentProjectId();
  const count = panelJobs(useRecentJobs(), kind, hiddenBefore).length;
  const dismissAll = useDismissAllJobsMutation();

  if (count === 0) return null;

  const clearAll = () =>
    dismissAll.mutate(
      { projectId, kinds: [kind] },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onDismiss();
        },
      },
    );

  return (
    <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase">
        Recent ({count})
      </span>
      <Button
        variant="link"
        size="xs"
        className="h-auto px-0 text-muted-foreground"
        disabled={dismissAll.isPending}
        onClick={clearAll}
      >
        Clear all
      </Button>
    </div>
  );
}
