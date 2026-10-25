import { ExternalLinkIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { PatternSampleView } from '@/server/metrics/types';

type SampleSourceButtonProps = {
  sample: PatternSampleView;
};

export function SampleSourceButton({ sample }: SampleSourceButtonProps) {
  if (!sample.href) {
    return (
      <span className="rounded-md border bg-background px-2.5 py-1 text-sm">
        {sample.label}
      </span>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-background"
      nativeButton={false}
      render={<Link href={sample.href as Route} target="_blank" />}
    >
      {sample.label}
      <ExternalLinkIcon />
    </Button>
  );
}
