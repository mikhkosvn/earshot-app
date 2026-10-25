'use client';

import { WizardStep } from '../../_constants/wizard-step';
import { BasicInfoStep } from './basic-info-step';
import { ConnectionStep } from './connection-step';

type WizardBodyProps = {
  step: WizardStep;
  onNext: () => void;
  onBack: () => void;
};

export function WizardBody({ step, onNext, onBack }: WizardBodyProps) {
  if (step === WizardStep.basicInfo) return <BasicInfoStep onBack={onBack} />;
  return <ConnectionStep onNext={onNext} />;
}
