'use client';

import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { SkippedMetric } from '@/server/runs/types';

type SkippedMetricItemProps = {
  metric: SkippedMetric;
};

export function SkippedMetricItem({ metric }: SkippedMetricItemProps) {
  const projectId = useCurrentProjectId();

  return (
    <li className="flex items-start justify-between gap-3 py-2">
      <div className="flex flex-col gap-0.5 text-xs">
        <span className="text-sm font-medium">{metric.name}</span>
        <span className="text-muted-foreground">
          Its Simulation toggle is turned off
        </span>
        <span className="text-muted-foreground">
          Fix: Metrics page → turn on the Simulation toggle
        </span>
      </div>
      <Button
        variant="outline"
        size="xs"
        nativeButton={false}
        render={
          <Link
            href={UrlGenerator.metricEdit({
              metricId: metric.id,
              values: { project: projectId },
            })}
          />
        }
      >
        Fix
      </Button>
    </li>
  );
}
