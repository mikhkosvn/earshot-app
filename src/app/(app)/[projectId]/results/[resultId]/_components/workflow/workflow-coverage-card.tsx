'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { WorkflowCoverageSummary } from './workflow-coverage-summary';
import { WorkflowPathList } from './workflow-path-list';

const WORKFLOW_COVERAGE_ITEM_VALUE = 'workflow-coverage';

export function WorkflowCoverageCard() {
  return (
    <Accordion className="rounded-xl border bg-background">
      <AccordionItem value={WORKFLOW_COVERAGE_ITEM_VALUE}>
        <AccordionTrigger className="items-center gap-4 px-4 py-3 hover:no-underline">
          <span className="text-sm font-medium">Workflow Coverage</span>
          <span className="ml-auto flex items-center gap-4 font-normal">
            <WorkflowCoverageSummary />
          </span>
        </AccordionTrigger>
        <AccordionContent className="border-t px-4 py-3">
          <WorkflowPathList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
