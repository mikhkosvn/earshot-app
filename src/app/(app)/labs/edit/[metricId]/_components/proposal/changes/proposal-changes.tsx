'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ProposalChange as ProposalChangeData } from '@/server/metric-optimizer/types';

import { ProposalChange } from './proposal-change';

const PROPOSAL_CHANGES_ITEM_VALUE = 'proposal-changes';

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
    <Accordion defaultValue={[PROPOSAL_CHANGES_ITEM_VALUE]}>
      <AccordionItem value={PROPOSAL_CHANGES_ITEM_VALUE}>
        <AccordionTrigger className="w-fit flex-none items-center gap-1 py-0 hover:no-underline">
          Proposed changes ({changes.length})
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 pt-2 pb-0 [&_p:not(:last-child)]:mb-0">
          {changes.map((change) => (
            <ProposalChange key={change.field} change={change} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
