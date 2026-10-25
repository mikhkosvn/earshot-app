'use client';

import { SparklesIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ASSIST_BUTTON_CLASS } from '../_constants/assist-button';
import { useHasBodyText } from '../_hooks/use-has-body-text';
import { useImproveDisabled } from '../_hooks/improve/use-improve-disabled';
import { useMetricFormType } from '../_hooks/use-metric-form-type';
import { isMetricFormType } from '../_utils/metric-form-type';
import { ImproveDialogBody } from './improve-dialog-body';

export function ImproveButton() {
  const type = useMetricFormType();
  const hasText = useHasBodyText();
  const isDisabled = useImproveDisabled();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMetricFormType(type) || !hasText) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDisabled}
            className={ASSIST_BUTTON_CLASS}
          />
        }
      >
        <SparklesIcon />
        Improve
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Improve the metric</DialogTitle>
          <DialogDescription>
            Pick an agent. Earshot refines the metric with the context of that
            agent.
          </DialogDescription>
        </DialogHeader>
        <ImproveDialogBody type={type} onApplied={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
