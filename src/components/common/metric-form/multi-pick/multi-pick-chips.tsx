'use client';

import { XCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { MultiPickItem } from './multi-pick-types';

interface MultiPickChipsProps {
  items: readonly MultiPickItem[];
  value: readonly number[];
  disabled?: boolean;
  onValueChange: (value: number[]) => void;
}

export function MultiPickChips({
  items,
  value,
  disabled,
  onValueChange,
}: MultiPickChipsProps) {
  const chosen = items.filter((item) => value.includes(item.value));

  return chosen.map((item) => (
    <span
      key={item.value}
      className="inline-flex max-w-56 items-center gap-1 rounded-md border bg-background py-0.5 pr-0.5 pl-2 text-xs font-medium"
    >
      <span className="truncate">{item.label}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Remove ${item.label}`}
        disabled={disabled}
        onClick={() =>
          onValueChange(value.filter((selected) => selected !== item.value))
        }
      >
        <XCircleIcon />
      </Button>
    </span>
  ));
}
