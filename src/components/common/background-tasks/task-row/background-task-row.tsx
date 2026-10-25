'use client';

import type { JobView } from '@/server/jobs/types';

import { jobRowText } from '../_utils/job-row-text';
import { relativeTime } from '../_utils/relative-time';
import { JobStatusIcon } from './job-status-icon';
import { RemoveTaskButton } from './remove-task-button';
import { ViewTaskButton } from './view-task-button';

type BackgroundTaskRowProps = {
  job: JobView;
  onDismiss: () => void;
};

export function BackgroundTaskRow({ job, onDismiss }: BackgroundTaskRowProps) {
  return (
    <li className="flex flex-col gap-2 px-3 py-2.5">
      <div className="flex items-start gap-2">
        <JobStatusIcon status={job.status} />
        <div className="min-w-0 flex-1">
          <p className="text-sm wrap-break-word">{jobRowText(job)}</p>
          <p className="text-xs text-muted-foreground">
            {relativeTime(job.createdAt)}
          </p>
        </div>
        <RemoveTaskButton
          jobId={job.id}
          kind={job.kind}
          onDismiss={onDismiss}
        />
      </div>
      <ViewTaskButton deepLink={job.result?.deepLink} kind={job.kind} />
    </li>
  );
}
