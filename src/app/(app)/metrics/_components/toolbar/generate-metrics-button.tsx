'use client';

import { SparklesIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { GenerateMetricsDialog } from '../generate/generate-metrics-dialog';

export function GenerateMetricsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => setOpen(true)}
      >
        <SparklesIcon />
        Generate Metrics
      </Button>
      <GenerateMetricsDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
