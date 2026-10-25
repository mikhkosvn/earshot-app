'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RowExpandButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function RowExpandButton({
  isExpanded,
  onToggle,
}: RowExpandButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label="Expand row"
      aria-expanded={isExpanded}
      onClick={onToggle}
    >
      <ChevronDownIcon
        className={cn('transition-transform', isExpanded && 'rotate-180')}
      />
    </Button>
  );
}
