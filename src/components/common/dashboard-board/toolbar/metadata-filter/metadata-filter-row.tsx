'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { MetadataCondition } from '@/server/dashboards/types';

interface MetadataFilterRowProps {
  condition: MetadataCondition;
  onChange: (change: Partial<MetadataCondition>) => void;
  onRemove: () => void;
}

export function MetadataFilterRow({
  condition,
  onChange,
  onRemove,
}: MetadataFilterRowProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-1 flex-col gap-1.5">
        <Input
          value={condition.key}
          aria-label="Metadata key"
          placeholder="Metadata key (e.g. caller_id)"
          className="h-8 text-xs md:text-xs"
          onChange={(event) => onChange({ key: event.target.value })}
        />
        <Input
          value={condition.value}
          aria-label="Metadata value"
          placeholder="Equals value…"
          className="h-8 text-xs md:text-xs"
          onChange={(event) => onChange({ value: event.target.value })}
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Remove metadata filter"
        onClick={onRemove}
      >
        <XIcon />
      </Button>
    </div>
  );
}
