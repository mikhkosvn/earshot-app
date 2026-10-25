'use client';

import { SparklesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useGenerateMetricDisabled } from '../../_hooks/use-generate-metric-disabled';
import { GenerateMetricLabel } from './generate-metric-label';

export function GenerateMetricButton() {
  const isDisabled = useGenerateMetricDisabled();

  return (
    <Button type="submit" disabled={isDisabled}>
      <SparklesIcon />
      <GenerateMetricLabel />
    </Button>
  );
}
