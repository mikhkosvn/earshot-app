'use client';

import { Suspense } from 'react';
import { useWatch } from 'react-hook-form';

import { Skeleton } from '@/components/ui/skeleton';
import type { MetricFormType } from '@/server/metrics/constants/definition/metric-form-type';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { ImproveRunner } from './improve-runner';

interface ImproveDialogBodyProps {
  type: MetricFormType;
  onApplied: () => void;
}

export function ImproveDialogBody({ type, onApplied }: ImproveDialogBodyProps) {
  const evalType = useWatch<MetricDefinitionValues, 'evalType'>({
    name: 'evalType',
  });

  if (!evalType) {
    return (
      <p className="text-sm text-muted-foreground">Pick a metric type first.</p>
    );
  }

  return (
    <Suspense fallback={<Skeleton className="h-16 w-full" />}>
      <ImproveRunner type={type} evalType={evalType} onApplied={onApplied} />
    </Suspense>
  );
}
