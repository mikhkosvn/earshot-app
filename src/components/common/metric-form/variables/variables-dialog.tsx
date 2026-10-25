'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { MetricVariable } from '@/server/metrics/constants/definition/metric-variables';

import { VariableRow } from './variable-row';

type VariablesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variables: MetricVariable[];
};

export function VariablesDialog({
  open,
  onOpenChange,
  variables,
}: VariablesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Available Variables</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 flex flex-col gap-2 overflow-y-auto px-4">
          {variables.map((variable) => (
            <VariableRow key={variable.code} variable={variable} />
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
