'use client';

import { TranscriptEditorMode } from '../../_constants/transcript-editor-mode';
import { TranscriptChatEditor } from './transcript-chat-editor';
import { TranscriptJsonEditor } from './transcript-json-editor';

interface TranscriptEditorProps {
  mode: TranscriptEditorMode;
}

export function TranscriptEditor({ mode }: TranscriptEditorProps) {
  if (mode === TranscriptEditorMode.json) return <TranscriptJsonEditor />;
  return <TranscriptChatEditor />;
}
