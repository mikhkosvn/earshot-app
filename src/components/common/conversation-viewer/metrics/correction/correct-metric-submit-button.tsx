'use client';

import { Button } from '@/components/ui/button';

import { useIsCorrectingMetric } from '../../_hooks/use-is-correcting-metric';
import { CorrectMetricSubmitLabel } from './correct-metric-submit-label';

export function CorrectMetricSubmitButton() {
  const isCorrecting = useIsCorrectingMetric();

  return (
    <Button type="submit" disabled={isCorrecting}>
      <CorrectMetricSubmitLabel />
    </Button>
  );
}
