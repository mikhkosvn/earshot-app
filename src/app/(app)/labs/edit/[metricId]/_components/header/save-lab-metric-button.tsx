'use client';

import { SaveIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useSaveDisabled } from '../../_hooks/form/use-save-disabled';
import { SaveLabMetricLabel } from './save-lab-metric-label';

export function SaveLabMetricButton() {
  const isDisabled = useSaveDisabled();

  return (
    <Button type="submit" variant="outline" disabled={isDisabled}>
      <SaveIcon />
      <SaveLabMetricLabel />
    </Button>
  );
}
