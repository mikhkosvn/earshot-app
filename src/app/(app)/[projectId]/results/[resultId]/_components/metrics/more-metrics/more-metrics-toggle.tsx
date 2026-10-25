'use client';

import { Button } from '@/components/ui/button';

import { useResultDetail } from '../../../_hooks/use-result-detail';
import { MoreMetricsToggleIcon } from './more-metrics-toggle-icon';
import { MoreMetricsToggleLabel } from './more-metrics-toggle-label';

interface MoreMetricsToggleProps {
  open: boolean;
  onToggle: () => void;
}

export function MoreMetricsToggle({ open, onToggle }: MoreMetricsToggleProps) {
  const result = useResultDetail();
  const count = result.otherTiles.length + result.tagTiles.length;
  if (count === 0) return null;

  return (
    <div className="flex justify-center border-t py-1.5">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        aria-expanded={open}
        onClick={onToggle}
      >
        <MoreMetricsToggleLabel open={open} count={count} />
        <MoreMetricsToggleIcon open={open} />
      </Button>
    </div>
  );
}
