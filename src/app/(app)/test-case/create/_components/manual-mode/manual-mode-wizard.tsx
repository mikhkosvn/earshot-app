'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { useManualEvaluatorForm } from '../../_hooks/use-manual-evaluator-form';
import { useManualWizardStep } from '../../_hooks/use-manual-wizard-step';
import { ManualStepContent } from './manual-step-content';
import { WizardPrimaryButton } from './wizard-primary-button';
import { WizardStepper } from './wizard-stepper';

export function ManualModeWizard() {
  const { form, onSubmit, isPending } = useManualEvaluatorForm();
  const { step, isLastStep, next, back } = useManualWizardStep(form);

  return (
    <div className="flex justify-center p-4 md:p-6">
      <FormProvider {...form}>
        <form
          noValidate
          className="w-full max-w-4xl overflow-hidden rounded-xl border bg-background"
          onSubmit={(event) => {
            if (isLastStep) return onSubmit(event);
            event.preventDefault();
            void next();
          }}
        >
          <WizardStepper step={step} />
          <div className="flex flex-col gap-5 p-4">
            <ManualStepContent step={step} />
          </div>
          <div className="flex items-center justify-between border-t p-3">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={back}
            >
              <ChevronLeftIcon />
              Back
            </Button>
            <WizardPrimaryButton
              isLastStep={isLastStep}
              isPending={isPending}
              onNext={() => void next()}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
