'use client';

import { Button } from '@/components/ui/button';

import { useCreateSubmitDisabled } from '../../_hooks/use-create-submit-disabled';
import { CreateMetricSubmitLabel } from './create-metric-submit-label';

export function CreateMetricSubmitButton() {
  const isDisabled = useCreateSubmitDisabled();

  return (
    <Button type="submit" size="lg" className="w-full" disabled={isDisabled}>
      <CreateMetricSubmitLabel />
    </Button>
  );
}
