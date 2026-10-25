'use client';

import type { JobKind } from '@/generated/prisma/enums';
import { useRecentJobs } from '@/hooks/jobs/use-recent-jobs';

import { panelJobs } from '../_utils/panel-jobs';
import { BackgroundTaskRow } from '../task-row/background-task-row';
import { BackgroundTaskEmpty } from './background-task-empty';

type BackgroundTaskListProps = {
  kind: JobKind;
  hiddenBefore: number | undefined;
  onDismiss: () => void;
};

export function BackgroundTaskList({
  kind,
  hiddenBefore,
  onDismiss,
}: BackgroundTaskListProps) {
  const jobs = panelJobs(useRecentJobs(), kind, hiddenBefore);

  if (jobs.length === 0) return <BackgroundTaskEmpty />;

  return (
    <ul className="max-h-80 divide-y overflow-y-auto">
      {jobs.map((job) => (
        <BackgroundTaskRow key={job.id} job={job} onDismiss={onDismiss} />
      ))}
    </ul>
  );
}
