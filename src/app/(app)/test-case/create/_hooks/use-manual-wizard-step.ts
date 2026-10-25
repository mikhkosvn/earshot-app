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

export const useManualWizardStep = (
  form: UseFormReturn<EvaluatorFormValues, unknown, EvaluatorFormOutput>,
) => {
  const [step, setStep] = useState<ManualStep>(ManualStep.scenarioInput);

  const next = async () => {
    const isValid = await form.trigger(STEP_FIELDS[step]);
    if (!isValid || step === LAST_STEP) return;
    setStep((step + 1) as ManualStep);
  };

  const back = () => {
    if (step === ManualStep.scenarioInput) return;
    setStep((step - 1) as ManualStep);
  };

  return { step, isLastStep: step === LAST_STEP, next, back };
};
