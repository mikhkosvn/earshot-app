'use client';

import { FormProvider } from 'react-hook-form';

import { BodyVariableBar } from '@/components/common/metric-form/variables/body-variable-bar';

import { useLabEditorForm } from '../_hooks/form/use-lab-editor-form';
import { LabBodyField } from './fields/lab-body-field';
import { LabTriggerField } from './fields/lab-trigger-field';
import { LabTypeTabs } from './fields/lab-type-tabs';
import { VariablesUsed } from './fields/variables-used';
import { LabEditorHeader } from './header/lab-editor-header';
import { OptimizationProposalCard } from './proposal/optimization-proposal-card';
import { LabReviewSection } from './reviews/lab-review-section';
import { LabRunSummary } from './run/lab-run-summary';

const FORM_ID = 'lab-metric-form';

export function LabEditorForm() {
  const { form, onSubmit } = useLabEditorForm();

  return (
    <FormProvider {...form}>
      <div className="flex min-w-0 flex-col gap-4">
        <form
          id={FORM_ID}
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <LabEditorHeader />
          <LabTypeTabs />
          <div className="flex flex-col gap-2">
            <BodyVariableBar />
            <LabBodyField />
            <VariablesUsed />
          </div>
          <LabTriggerField />
        </form>
        <OptimizationProposalCard />
        <LabRunSummary />
        <LabReviewSection />
      </div>
    </FormProvider>
  );
}
