'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TagChipProps {
  tag: string;
  onRemove: () => void;
}

export function TagChip({ tag, onRemove }: TagChipProps) {
  return (
    <span className="flex items-center gap-0.5 rounded-md border bg-muted py-0.5 pr-0.5 pl-1.5 text-xs font-medium">
      {tag}
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Remove tag ${tag}`}
        className="size-4"
        onClick={onRemove}
      >
        <XIcon />
      </Button>
    </span>
  );
}
