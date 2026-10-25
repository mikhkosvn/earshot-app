'use client';

import { EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { LabRowVariables } from '@/server/labs/types';

interface RowVariablesDialogProps {
  variables: LabRowVariables;
}

const SECTIONS: { key: keyof LabRowVariables; label: string }[] = [
  { key: 'callEndReason', label: 'call_end_reason' },
  { key: 'metadata', label: 'metadata' },
  { key: 'dynamicVariables', label: 'dynamic_variables' },
  { key: 'providerCallData', label: 'provider_call_data' },
];

const JSON_INDENT = 2;

export function RowVariablesDialog({ variables }: RowVariablesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button type="button" variant="outline" className="w-full" />}
      >
        <EyeIcon />
        See Variables
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Variables</DialogTitle>
        </DialogHeader>
        <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
          {SECTIONS.map((section) => (
            <div key={section.key} className="flex flex-col gap-1">
              <code className="text-xs font-semibold">{section.label}</code>
              <pre className="rounded-md bg-muted p-2 text-xs whitespace-pre-wrap">
                {JSON.stringify(variables[section.key], null, JSON_INDENT)}
              </pre>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
