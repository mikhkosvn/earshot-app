'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { EnableInsightsDialog } from './enable-insights-dialog';

type EnableInsightsButtonProps = {
  label?: string;
  variant?: 'outline' | 'default';
};

export function EnableInsightsButton({
  label = 'Enable insights',
  variant = 'outline',
}: EnableInsightsButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size="sm"
        className="text-xs"
        onClick={() => setOpen(true)}
      >
        <PlusIcon />
        {label}
      </Button>
      <EnableInsightsDialog
        open={open}
        onOpenChange={setOpen}
        initialMetricId={null}
      />
    </>
  );
}
