'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { JobView } from '@/server/jobs/types';

import { reviewPanelLink } from '../_utils/review-panel-text';

type ReviewSampleLabelsButtonProps = {
  job: JobView;
};

export function ReviewSampleLabelsButton({
  job,
}: ReviewSampleLabelsButtonProps) {
  const href = reviewPanelLink(job);

  if (!href) return null;

  return (
    <div className="px-3 pb-3">
      <Button
        className="w-full"
        nativeButton={false}
        render={<Link href={href as Route} />}
      >
        Review sample labels
      </Button>
    </div>
  );
}
