'use client';

import { PencilIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface RunFeedbackTextProps {
  feedback: string | null;
  onEdit: () => void;
}

export function RunFeedbackText({ feedback, onEdit }: RunFeedbackTextProps) {
  return (
    <div className="flex min-w-32 items-center gap-1">
      <span className="max-w-60 truncate">{feedback}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Edit feedback"
        className="text-muted-foreground"
        onClick={onEdit}
      >
        <PencilIcon />
      </Button>
    </div>
  );
}
