'use client';

import { ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type WizardPrimaryButtonProps = {
  isLastStep: boolean;
  isPending: boolean;
  onNext: () => void;
};

export function WizardPrimaryButton({
  isLastStep,
  isPending,
  onNext,
}: WizardPrimaryButtonProps) {
  if (isLastStep) {
    return (
      <Button key="submit" type="submit" disabled={isPending}>
        Create Evaluator
      </Button>
    );
  }
  return (
    <Button key="next" type="button" onClick={onNext}>
      Next
      <ChevronRightIcon />
    </Button>
  );
}
