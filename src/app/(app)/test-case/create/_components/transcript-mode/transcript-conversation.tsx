'use client';

import { CodeIcon, MessageSquareIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FieldError } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { TranscriptEditorMode } from '../../_constants/transcript-editor-mode';
import type { TranscriptFormValues } from '../../_schemas/transcript-form-schema';
import { MessageCount } from './message-count';
import { TranscriptEditor } from './transcript-editor';

const isMode = (value: unknown): value is TranscriptEditorMode =>
  Object.values(TranscriptEditorMode).includes(value as TranscriptEditorMode);

export function TranscriptConversation() {
  const [mode, setMode] = useState<TranscriptEditorMode>(
    TranscriptEditorMode.chat,
  );
  const { formState } = useFormContext<TranscriptFormValues>();

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium">Conversation</h3>
          <MessageCount />
        </div>
        <ToggleGroup
          aria-label="Conversation editor"
          variant="outline"
          size="sm"
          value={[mode]}
          onValueChange={(values) => {
            const [next] = values;
            if (isMode(next)) setMode(next);
          }}
        >
          <ToggleGroupItem value={TranscriptEditorMode.chat}>
            <MessageSquareIcon />
            Chat
          </ToggleGroupItem>
          <ToggleGroupItem value={TranscriptEditorMode.json}>
            <CodeIcon />
            JSON
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <TranscriptEditor mode={mode} />
      <FieldError
        errors={[formState.errors.turns?.root, formState.errors.turns]}
      />
    </div>
  );
}
