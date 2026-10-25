'use client';

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type {
  EvaluatorFormOutput,
  EvaluatorFormValues,
} from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { ManualStep } from '../_constants/create-mode';

type EvaluatorFieldName = keyof EvaluatorFormValues;

const STEP_FIELDS: Record<ManualStep, EvaluatorFieldName[]> = {
  [ManualStep.scenarioInput]: [
    'agentId',
    'scenarioType',
    'testProfileId',
    'firstMessage',
    'instructions',
  ],
  [ManualStep.basics]: [
    'name',
    'folderPath',
    'tags',
    'personalityId',
    'language',
  ],
  [ManualStep.criteria]: [
    'expectedOutcomePrompt',
    'metricIds',
    'expectedToolCalls',
  ],
  [ManualStep.configuration]: ['phoneNumberId', 'tools', 'maxDurationSeconds'],
};

const LAST_STEP = ManualStep.configuration;

const isManualStep = (value: number): value is ManualStep =>
  Object.values(ManualStep).some((item) => item === value);

export const useManualWizardStep = (
  form: UseFormReturn<EvaluatorFormValues, unknown, EvaluatorFormOutput>,
) => {
  const [step, setStep] = useState<ManualStep>(ManualStep.scenarioInput);

  const next = async () => {
    const isValid = await form.trigger(STEP_FIELDS[step]);
    const nextStep = step + 1;
    if (!isValid || !isManualStep(nextStep)) return;
    setStep(nextStep);
  };

  const back = () => {
    const previousStep = step - 1;
    if (!isManualStep(previousStep)) return;
    setStep(previousStep);
  };

  return { step, isLastStep: step === LAST_STEP, next, back };
};
