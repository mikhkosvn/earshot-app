'use client';

import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { usePatternReview } from '../../_hooks/use-pattern-review';

export function ReviewOpenMetricButton() {
  const review = usePatternReview();
  const projectId = useCurrentProjectId();
  const href = UrlGenerator.metricEdit({
    metricId: review.metric.id,
    values: { project: projectId },
  });

  return (
    <Button
      variant="outline"
      nativeButton={false}
      render={<Link href={href} />}
    >
      Open the metric
    </Button>
  );
}
