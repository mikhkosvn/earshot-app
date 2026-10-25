'use client';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

export function CreateMetricLink() {
  const projectId = useCurrentProjectId();

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs"
      nativeButton={false}
      render={
        <Link
          href={UrlGenerator.createMetric({ values: { project: projectId } })}
        />
      }
    >
      <PlusIcon />
      Create Metric
    </Button>
  );
}
