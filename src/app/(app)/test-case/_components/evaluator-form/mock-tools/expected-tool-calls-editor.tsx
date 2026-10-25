'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { Button } from '@/components/ui/button';

import { LabeledField } from '../../fields/labeled-field';
import { ExpectedToolCallRow } from './expected-tool-call-row';
import { NoMockToolsNotice } from './no-mock-tools-notice';

interface ExpectedToolCallsEditorProps {
  agentId: number;
}

const EMPTY_JSON = '{}';

export function ExpectedToolCallsEditor({
  agentId,
}: ExpectedToolCallsEditorProps) {
  const projectId = useCurrentProjectId();
  const { data: mockTools } = useSuspenseQuery({
    ...EvaluatorService.getAgentDefaultsQuery({ projectId, agentId }),
    select: (defaults) => defaults.mockTools,
  });
  const { control } = useFormContext<EvaluatorFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expectedToolCalls',
  });
  const [firstTool] = mockTools;

  return (
    <LabeledField
      id="evaluator-mock-tools"
      label="Expected Mock Tools"
      description="Tool calls expected from the agent during this evaluator run."
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!firstTool}
          onClick={() => {
            if (!firstTool) return;
            append({
              mockToolId: firstTool.id,
              input: EMPTY_JSON,
              output: EMPTY_JSON,
            });
          }}
        >
          <PlusIcon />
          Add Entry
        </Button>
      }
    >
      <NoMockToolsNotice count={mockTools.length} />
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <ExpectedToolCallRow
            key={field.id}
            index={index}
            mockTools={mockTools}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </LabeledField>
  );
}
