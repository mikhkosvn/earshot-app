'use client';

import { FormProvider } from 'react-hook-form';

import { AgentField } from '@/app/(app)/test-case/_components/evaluator-form/basics/agent-field';
import { FirstMessageField } from '@/app/(app)/test-case/_components/evaluator-form/basics/first-message-field';
import { FolderField } from '@/app/(app)/test-case/_components/evaluator-form/basics/folder-field';
import { NameField } from '@/app/(app)/test-case/_components/evaluator-form/basics/name-field';
import { PersonalityLanguageFields } from '@/app/(app)/test-case/_components/evaluator-form/basics/personality-language-fields';
import { TagsField } from '@/app/(app)/test-case/_components/evaluator-form/basics/tags-field';
import { TestProfileField } from '@/app/(app)/test-case/_components/evaluator-form/basics/test-profile-field';
import { ConfigurationFields } from '@/app/(app)/test-case/_components/evaluator-form/configuration/configuration-fields';
import { ExpectedOutcomeField } from '@/app/(app)/test-case/_components/evaluator-form/criteria/expected-outcome-field';
import { InstructionsField } from '@/app/(app)/test-case/_components/evaluator-form/criteria/instructions-field';
import { MetricsField } from '@/app/(app)/test-case/_components/evaluator-form/criteria/metrics-field';
import { ExpectedToolCallsField } from '@/app/(app)/test-case/_components/evaluator-form/mock-tools/expected-tool-calls-field';
import type { EvaluatorDetail } from '@/server/evaluators/types';

import { EditSectionId } from '../../_constants/edit-section-id';
import { useEditEvaluatorForm } from '../../_hooks/use-edit-evaluator-form';
import { EditFormFooter } from './edit-form-footer';
import { EditSection } from './edit-section';
import { EditSectionNav } from './edit-section-nav';

interface EditEvaluatorFormBodyProps {
  detail: EvaluatorDetail;
}

export function EditEvaluatorFormBody({ detail }: EditEvaluatorFormBodyProps) {
  const { form, onSubmit, isPending } = useEditEvaluatorForm(detail);

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={onSubmit}
        className="flex flex-col rounded-xl border bg-background"
      >
        <div className="border-b p-4">
          <h1 className="text-lg font-semibold">Edit Evaluator</h1>
          <p className="text-sm text-muted-foreground">
            Update your evaluator settings.
          </p>
        </div>
        <EditSectionNav />
        <div className="flex flex-col gap-6 p-4">
          <EditSection id={EditSectionId.basics} title="Basics">
            <AgentField />
            <NameField />
            <FolderField />
            <TagsField />
            <TestProfileField />
            <FirstMessageField />
            <InstructionsField />
            <PersonalityLanguageFields />
          </EditSection>
          <EditSection id={EditSectionId.criteria} title="Evaluation Criteria">
            <ExpectedOutcomeField />
            <MetricsField />
            <ExpectedToolCallsField />
          </EditSection>
          <EditSection id={EditSectionId.configuration} title="Configuration">
            <ConfigurationFields />
          </EditSection>
        </div>
        <EditFormFooter isPending={isPending} />
      </form>
    </FormProvider>
  );
}
