'use client';

import { CircleCheckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type TestCallProgressFooterProps = {
  finished: boolean;
  onClose: () => void;
};

export function TestCallProgressFooter({
  finished,
  onClose,
}: TestCallProgressFooterProps) {
  if (!finished) {
    return (
      <div>
        <Button type="button" variant="outline" disabled>
          Close
        </Button>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-sm text-muted-foreground">Nothing else to do.</p>
      <Button type="button" onClick={onClose}>
        <CircleCheckIcon />
        Continue
      </Button>
    </div>
  );
}
