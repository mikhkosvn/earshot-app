'use client';

import type { JobView } from '@/server/jobs/types';

import { reviewPanelTitle } from '../_utils/review-panel-text';
import { ReviewSampleLabelsButton } from './review-sample-labels-button';
import { ReviewTaskPanelHeader } from './review-task-panel-header';

type ReviewTaskPanelProps = {
  job: JobView;
  onClose: () => void;
};

export function ReviewTaskPanel({ job, onClose }: ReviewTaskPanelProps) {
  const title = reviewPanelTitle(job);

  return (
    <section
      aria-label={title}
      className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg"
    >
      <ReviewTaskPanelHeader title={title} onClose={onClose} />
      <ReviewSampleLabelsButton job={job} />
    </section>
  );
}
