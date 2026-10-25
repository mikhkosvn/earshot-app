import { WizardStep } from '../../_constants/wizard-step';
import { WizardStepper } from './wizard-stepper';

type WizardHeaderProps = {
  step: WizardStep;
  completed: boolean;
};

export function WizardHeader({ step, completed }: WizardHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="px-4 py-3">
        <h1 className="text-base font-semibold">Create an Agent</h1>
        <p className="text-xs text-muted-foreground">
          Create an agent to start testing your voice assistant
        </p>
      </div>
      <WizardStepper step={step} completed={completed} />
    </div>
  );
}
