'use client';

import { Minimize2Icon, SparklesIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useCloseGenerationSheet } from '../../_hooks/generation/use-close-generation-sheet';

export function GenerationSheetHeader() {
  const closeSheet = useCloseGenerationSheet();

  return (
    <div className="flex items-start gap-3 border-b p-3">
      <span className="rounded-lg border p-2">
        <SparklesIcon className="size-4" />
      </span>
      <div className="flex flex-1 flex-col">
        <h2 className="text-base font-semibold">Review Generated Scenarios</h2>
        <p className="text-xs text-muted-foreground">
          Keep scenarios or continue editing
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Minimize to panel"
        onClick={() => void closeSheet()}
      >
        <Minimize2Icon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Close"
        onClick={() => void closeSheet()}
      >
        <XIcon />
      </Button>
    </div>
  );
}
