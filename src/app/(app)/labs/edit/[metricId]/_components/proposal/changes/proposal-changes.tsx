'use client';

import { ChevronDownIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { ProposalChange as ProposalChangeData } from '@/server/metric-optimizer/types';

import { ProposalChange } from './proposal-change';

interface ProposalChangesProps {
  changes: readonly ProposalChangeData[];
}

export function ProposalChanges({ changes }: ProposalChangesProps) {
  if (changes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        The proposal keeps the current definition.
      </p>
    );
  }

  return (
    <Collapsible defaultOpen className="flex flex-col gap-2">
      <CollapsibleTrigger className="group flex w-fit items-center gap-1 text-sm font-medium">
        <ChevronDownIcon className="size-4 -rotate-90 transition-transform group-data-panel-open:rotate-0" />
        Proposed changes ({changes.length})
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-3">
        {changes.map((change) => (
          <ProposalChange key={change.field} change={change} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
