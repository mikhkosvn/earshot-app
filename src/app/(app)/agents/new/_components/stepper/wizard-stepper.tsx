import { WizardStep } from '../../_constants/wizard-step';
import { WizardStepBadge } from './wizard-step-badge';

type WizardStepperProps = {
  step: WizardStep;
  completed: boolean;
};

export function WizardStepper({ step, completed }: WizardStepperProps) {
  const onBasicInfo = step === WizardStep.basicInfo;

  return (
    <div className="flex items-center gap-4 border-y bg-muted/40 px-4 py-2.5 text-sm">
      <WizardStepBadge
        number={1}
        label="Connection"
        active={!onBasicInfo}
        done={onBasicInfo}
      />
      <div className="h-px flex-1 bg-border" />
      <WizardStepBadge
        number={2}
        label="Basic Info"
        active={onBasicInfo}
        done={completed}
      />
    </div>
  );
}
