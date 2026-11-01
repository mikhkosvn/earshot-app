'use client';

import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MockToolOption } from '@/server/evaluators/types';

import { ExpectedToolCallEditor } from './expected-tool-call-editor';

const TOOL_CALL_ITEM_VALUE = 'tool-call';

const openItemsOf = (isOpen: boolean) => {
  if (isOpen) return [TOOL_CALL_ITEM_VALUE];
  return [];
};

interface ExpectedToolCallRowProps {
  index: number;
  mockTools: readonly MockToolOption[];
  onRemove: () => void;
}

export function ExpectedToolCallRow({
  index,
  mockTools,
  onRemove,
}: ExpectedToolCallRowProps) {
  const [isOpen, setOpen] = useState(false);
  const { control, formState } = useFormContext<EvaluatorFormValues>();
  const mockToolId = useWatch({
    control,
    name: `expectedToolCalls.${index}.mockToolId`,
  });
  const toolName =
    mockTools.find((tool) => tool.id === mockToolId)?.name ?? 'Unknown tool';
  const hasError = Boolean(formState.errors.expectedToolCalls?.[index]);

  return (
    <Accordion
      value={openItemsOf(isOpen || hasError)}
      onValueChange={(values) => setOpen(values.includes(TOOL_CALL_ITEM_VALUE))}
      className={cn('rounded-lg border', hasError && 'border-destructive')}
    >
      <AccordionItem value={TOOL_CALL_ITEM_VALUE}>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <AccordionTrigger
            aria-label={`Show entry ${index + 1}`}
            className="size-6 items-center justify-center rounded-md p-0 hover:bg-muted hover:no-underline **:data-[slot=accordion-trigger-icon]:ml-0 **:data-[slot=accordion-trigger-icon]:size-3 **:data-[slot=accordion-trigger-icon]:text-current"
          />
          <span className="flex-1 font-mono text-xs">{toolName}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Edit entry ${index + 1}`}
            onClick={() => setOpen(true)}
          >
            <PencilIcon />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Delete entry ${index + 1}`}
            onClick={onRemove}
          >
            <Trash2Icon />
          </Button>
        </div>
        <AccordionContent className="pb-0 [&_p:not(:last-child)]:mb-0">
          <ExpectedToolCallEditor index={index} mockTools={mockTools} isOpen />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
