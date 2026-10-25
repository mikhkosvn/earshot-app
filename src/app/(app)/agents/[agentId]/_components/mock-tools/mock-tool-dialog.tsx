'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { MockToolItem } from '@/server/agents/types';

import { MockToolDialogTitle } from './mock-tool-dialog-title';
import { MockToolForm } from './mock-tool-form';

interface MockToolDialogProps {
  tool: MockToolItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MockToolDialog({
  tool,
  open,
  onOpenChange,
}: MockToolDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <MockToolDialogTitle tool={tool} />
          </DialogTitle>
          <DialogDescription>
            Define a mock tool with input/output mappings for testing
          </DialogDescription>
        </DialogHeader>
        <MockToolForm
          key={String(open)}
          tool={tool}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
