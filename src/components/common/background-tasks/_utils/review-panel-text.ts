import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { JOB_KIND_TITLE } from '@/server/jobs/constants';
import type { JobView } from '@/server/jobs/types';

import { reviewJobInput } from './review-job-input';

export const reviewPanelTitle = (job: JobView) => {
  const metricName = reviewJobInput(job)?.metricName;
  if (!metricName) return JOB_KIND_TITLE[job.kind];
  return `Review ${metricName}`;
};

export const reviewPanelLink = (job: JobView) => {
  const input = reviewJobInput(job);
  if (!input) return job.result?.deepLink;
  return UrlGenerator.metricReview({
    reviewId: input.reviewId,
    values: { project: job.projectId },
  });
};
