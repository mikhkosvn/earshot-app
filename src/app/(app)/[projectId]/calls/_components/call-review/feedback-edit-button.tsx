'use client';

import { PencilIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { FeedbackForm } from './feedback-form';

type FeedbackEditButtonProps = {
  callLogId: number;
  feedback: string | null;
  className?: string;
};

export function FeedbackEditButton({
  callLogId,
  feedback,
  className,
}: FeedbackEditButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Edit feedback"
            className={cn('text-muted-foreground', className)}
          />
        }
      >
        <PencilIcon />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <FeedbackForm
          callLogId={callLogId}
          feedback={feedback}
          onSaved={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
