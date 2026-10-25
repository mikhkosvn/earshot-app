'use client';

import { ArrowUpRightIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type { VariableSet } from '../_constants/variable-sets';
import { TranscriptSourceNote } from './transcript-source-note';
import { VariableChip } from './variable-chip';
import { VariableHint } from './variable-hint';
import { VariablesDialog } from './variables-dialog';

interface VariableBarProps {
  set: VariableSet;
}

export function VariableBar({ set }: VariableBarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          className="font-normal text-muted-foreground"
          onClick={() => setIsDialogOpen(true)}
        >
          Available Variables
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
        {set.chips.map((code) => (
          <VariableChip key={code} code={code} />
        ))}
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="font-normal"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusIcon data-icon="inline-start" />
          View More
        </Button>
      </div>
      <TranscriptSourceNote transcriptCode={set.transcriptCode} />
      <VariableHint codes={set.hintCodes} />
      <VariablesDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        variables={set.variables}
      />
    </div>
  );
}
