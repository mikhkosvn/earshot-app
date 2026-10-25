'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';

import { useMetricsListUrl } from '../_hooks/use-metrics-list-url';

type ReviewDoneButtonProps = {
  variant?: ComponentProps<typeof Button>['variant'];
};

export function ReviewDoneButton({
  variant = 'default',
}: ReviewDoneButtonProps) {
  const metricsUrl = useMetricsListUrl();

  return (
    <Button
      variant={variant}
      nativeButton={false}
      render={<Link href={metricsUrl} />}
    >
      Done
    </Button>
  );
}
