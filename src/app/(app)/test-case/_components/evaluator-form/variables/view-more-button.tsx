'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ViewMoreButtonProps {
  hiddenCount: number;
  onExpand: () => void;
}

export function ViewMoreButton({ hiddenCount, onExpand }: ViewMoreButtonProps) {
  if (hiddenCount <= 0) return null;
  return (
    <Button type="button" variant="outline" size="xs" onClick={onExpand}>
      <PlusIcon />
      View More
    </Button>
  );
}
