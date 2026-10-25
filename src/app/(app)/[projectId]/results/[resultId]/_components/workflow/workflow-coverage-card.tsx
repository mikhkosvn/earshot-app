'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { WorkflowCoverageSummary } from './workflow-coverage-summary';
import { WorkflowPathList } from './workflow-path-list';

export function WorkflowCoverageCard() {
  return (
    <Collapsible className="rounded-xl border bg-background">
      <CollapsibleTrigger
        render={
          <Button
            variant="unstyled"
            size="unstyled"
            className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
          />
        }
      >
        <span className="text-sm font-medium">Workflow Coverage</span>
        <span className="flex items-center gap-4">
          <WorkflowCoverageSummary />
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-data-panel-open:rotate-180" />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t px-4 py-3">
        <WorkflowPathList />
      </CollapsibleContent>
    </Collapsible>
  );
}
