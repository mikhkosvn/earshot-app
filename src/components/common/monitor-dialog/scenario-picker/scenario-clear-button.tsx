'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ScenarioClearButtonProps = {
  selectedCount: number;
  onClear: () => void;
};

export function ScenarioClearButton({
  selectedCount,
  onClear,
}: ScenarioClearButtonProps) {
  if (selectedCount === 0) return null;

  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClear}>
      <XIcon />
      Clear
    </Button>
  );
}
