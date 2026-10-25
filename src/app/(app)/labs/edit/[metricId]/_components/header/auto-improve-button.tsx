'use client';

import { WandSparklesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useAutoImproveDisabled } from '../../_hooks/form/use-auto-improve-disabled';
import { useStartAutoImprove } from '../../_hooks/form/use-start-auto-improve';
import { AutoImproveLabel } from './auto-improve-label';

export function AutoImproveButton() {
  const isDisabled = useAutoImproveDisabled();
  const startAutoImprove = useStartAutoImprove();

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isDisabled}
      onClick={startAutoImprove}
    >
      <WandSparklesIcon />
      <AutoImproveLabel />
    </Button>
  );
}
