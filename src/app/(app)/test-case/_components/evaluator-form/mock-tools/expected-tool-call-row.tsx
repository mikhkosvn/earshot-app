'use client';

import { ChevronRightIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MockToolOption } from '@/server/evaluators/types';

import { ExpectedToolCallEditor } from './expected-tool-call-editor';

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
    <div
      className={cn(
        'flex flex-col rounded-lg border',
        hasError && 'border-destructive',
      )}
    >
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Show entry ${index + 1}`}
          aria-expanded={isOpen}
          onClick={() => setOpen(!isOpen)}
        >
          <ChevronRightIcon
            className={cn('transition-transform', isOpen && 'rotate-90')}
          />
        </Button>
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
      <ExpectedToolCallEditor
        index={index}
        mockTools={mockTools}
        isOpen={isOpen || hasError}
      />
    </div>
  );
}
