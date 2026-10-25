import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import {
  MANUAL_STEP_LABELS,
  type ManualStep,
} from '../../_constants/create-mode';
import { WizardStepBadge } from './wizard-step-badge';

interface WizardStepperProps {
  step: ManualStep;
}

export function WizardStepper({ step }: WizardStepperProps) {
  return (
    <ol
      aria-label="Steps"
      className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3"
    >
      {MANUAL_STEP_LABELS.map((label, index) => (
        <Fragment key={label}>
          <li
            aria-current={index === step && 'step'}
            className={cn(
              'flex shrink-0 items-center gap-2 text-sm',
              index > step && 'text-muted-foreground',
            )}
          >
            <WizardStepBadge index={index} step={step} />
            {label}
          </li>
          <li
            aria-hidden
            className={cn(
              'h-0.5 flex-1 bg-border last:hidden',
              index < step && 'bg-green-500',
            )}
          />
        </Fragment>
      ))}
    </ol>
  );
}
