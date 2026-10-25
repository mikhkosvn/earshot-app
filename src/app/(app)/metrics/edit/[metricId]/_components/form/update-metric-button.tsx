'use client';

import { Button } from '@/components/ui/button';

import { useUpdateDisabled } from '../../_hooks/use-update-disabled';
import { UpdateMetricLabel } from './update-metric-label';

export function UpdateMetricButton() {
  const isDisabled = useUpdateDisabled();

  return (
    <Button type="submit" size="lg" className="w-full" disabled={isDisabled}>
      <UpdateMetricLabel />
    </Button>
  );
}
