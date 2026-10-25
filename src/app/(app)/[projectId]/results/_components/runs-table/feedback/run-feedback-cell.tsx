'use client';

import { useState } from 'react';

import { RunFeedbackEditor } from './run-feedback-editor';
import { RunFeedbackText } from './run-feedback-text';

interface RunFeedbackCellProps {
  runId: number;
  feedback: string | null;
}

export function RunFeedbackCell({ runId, feedback }: RunFeedbackCellProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <RunFeedbackEditor
        runId={runId}
        feedback={feedback}
        onClose={() => setEditing(false)}
        className="w-64"
      />
    );
  }
  return (
    <RunFeedbackText feedback={feedback} onEdit={() => setEditing(true)} />
  );
}
