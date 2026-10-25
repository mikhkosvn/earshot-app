'use client';

import { Button } from '@/components/ui/button';
import type { JobKind } from '@/generated/prisma/enums';
import { useDismissAllJobsMutation } from '@/hooks/jobs/use-dismiss-all-jobs-mutation';
import { useRecentJobs } from '@/hooks/jobs/use-recent-jobs';

import { panelJobs, type PanelScope } from '../_utils/panel-jobs';

type BackgroundTaskSummaryProps = {
  kind: JobKind;
  scope: PanelScope;
  onDismiss: () => void;
};

export function BackgroundTaskSummary({
  kind,
  scope,
  onDismiss,
}: BackgroundTaskSummaryProps) {
  const jobs = panelJobs(useRecentJobs(), kind, scope);
  const dismissAll = useDismissAllJobsMutation();

  if (jobs.length === 0) return null;

  const clearAll = () =>
    dismissAll.mutate(
      { projectId: jobs[0].projectId, kinds: [kind] },
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
        Recent ({jobs.length})
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
