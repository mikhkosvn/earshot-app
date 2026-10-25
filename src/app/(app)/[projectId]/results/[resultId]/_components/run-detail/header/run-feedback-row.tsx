'use client';

import { PencilIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { RunFeedbackEditor } from '../../../../_components/runs-table/feedback/run-feedback-editor';
import { feedbackText } from '../../../../_utils/runs/run-detail-text';

interface RunFeedbackRowProps {
  runId: number;
  feedback: string | null;
}

export function RunFeedbackRow({ runId, feedback }: RunFeedbackRowProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border bg-card px-4 py-3 text-sm">
        <span className="font-medium">Feedback:</span>
        <RunFeedbackEditor
          runId={runId}
          feedback={feedback}
          onClose={() => setEditing(false)}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-sm">
      <p className="min-w-0 wrap-break-word">
        <span className="font-medium">Feedback: </span>
        {feedbackText(feedback)}
      </p>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Edit feedback"
        onClick={() => setEditing(true)}
      >
        <PencilIcon />
      </Button>
    </div>
  );
}
