'use client';

import { Maximize2Icon } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CodeEditorSurface } from './code-editor-surface';

type CodeEditorProps = Omit<
  ComponentProps<'textarea'>,
  'value' | 'onChange'
> & {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function CodeEditor({ label, id, ...props }: CodeEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <CodeEditorSurface
        {...props}
        id={id}
        aria-label={label}
        className="h-68"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Expand ${label}`}
        className="absolute top-2 right-3"
        onClick={() => setIsExpanded(true)}
      >
        <Maximize2Icon />
      </Button>
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="flex h-[85vh] flex-col sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <CodeEditorSurface
            {...props}
            aria-label={`${label} (expanded)`}
            className="flex-1"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
