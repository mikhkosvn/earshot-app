'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { MetricListItem } from '@/server/metrics/types';

type MetricEditActionProps = {
  metric: MetricListItem;
};

export function MetricEditAction({ metric }: MetricEditActionProps) {
  const projectId = useCurrentProjectId();
  const label = `Edit ${metric.name}`;

  if (!metric.editable) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon-xs"
        aria-label={label}
        disabled
      >
        <PencilIcon />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon-xs"
      nativeButton={false}
      render={
        <Link
          aria-label={label}
          href={UrlGenerator.metricEdit({
            metricId: metric.id,
            values: { project: projectId },
          })}
        />
      }
    >
      <PencilIcon />
    </Button>
  );
}
