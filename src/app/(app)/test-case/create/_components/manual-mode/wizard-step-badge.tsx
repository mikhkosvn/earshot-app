import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface WizardStepBadgeProps {
  index: number;
  step: number;
}

export function WizardStepBadge({ index, step }: WizardStepBadgeProps) {
  if (index < step) {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-green-500 text-white">
        <CheckIcon className="size-4" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        'flex size-7 items-center justify-center rounded-full border text-xs font-semibold',
        index === step && 'border-primary bg-primary text-primary-foreground',
      )}
    >
      {index + 1}
    </span>
  );
}
