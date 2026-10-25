'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type MultiPickClearProps = {
  label: string;
  count: number;
  disabled?: boolean;
  onClear: () => void;
};

export function MultiPickClear({
  label,
  count,
  disabled,
  onClear,
}: MultiPickClearProps) {
  if (count === 0) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={`Clear ${label}`}
      disabled={disabled}
      className="absolute top-1/2 right-8 -translate-y-1/2 text-muted-foreground"
      onClick={onClear}
    >
      <XIcon />
    </Button>
  );
}
