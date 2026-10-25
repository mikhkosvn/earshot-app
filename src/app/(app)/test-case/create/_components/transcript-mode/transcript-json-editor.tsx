'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';

import type { TranscriptFormValues } from '../../_schemas/transcript-form-schema';
import { parseTurnsJson, turnsToJson } from '../../_utils/transcript-json';
import { TranscriptJsonError } from './transcript-json-error';

export function TranscriptJsonEditor() {
  const { getValues, setValue } = useFormContext<TranscriptFormValues>();
  const [text, setText] = useState(() => turnsToJson(getValues('turns')));
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <Textarea
        value={text}
        aria-label="Conversation as JSON"
        aria-invalid={error !== null}
        className="min-h-72 font-mono text-xs md:text-xs"
        onChange={(event) => {
          setText(event.target.value);
          const parsed = parseTurnsJson(event.target.value);
          setError(parsed.error);
          if (parsed.turns)
            setValue('turns', parsed.turns, { shouldDirty: true });
        }}
      />
      <TranscriptJsonError error={error} />
    </div>
  );
}
