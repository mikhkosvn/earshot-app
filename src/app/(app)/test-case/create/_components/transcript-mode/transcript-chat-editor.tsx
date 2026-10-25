'use client';

import { PlusIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { TranscriptRole } from '@/server/call-engine/constants';

import { TRANSCRIPT_EXAMPLE } from '../../_constants/transcript-example';
import type { TranscriptFormValues } from '../../_schemas/transcript-form-schema';
import { TranscriptMessageRow } from './transcript-message-row';

const nextRole = (turns: TranscriptFormValues['turns']) => {
  if (turns.at(-1)?.role === TranscriptRole.main_agent) {
    return TranscriptRole.testing_agent;
  }
  return TranscriptRole.main_agent;
};

export function TranscriptChatEditor() {
  const { control, getValues } = useFormContext<TranscriptFormValues>();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'turns',
  });

  return (
    <div className="flex flex-col rounded-lg border">
      <div className="flex flex-col gap-4 p-3">
        {fields.map((field, index) => (
          <TranscriptMessageRow
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between border-t bg-muted/30 p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              role: nextRole(getValues('turns')),
              content: '',
              startTime: null,
            })
          }
        >
          <PlusIcon />
          Add message
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => replace(TRANSCRIPT_EXAMPLE)}
        >
          Load example
        </Button>
      </div>
    </div>
  );
}
