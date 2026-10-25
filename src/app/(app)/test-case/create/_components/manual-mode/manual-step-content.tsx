'use client';

import { AgentField } from '@/app/(app)/test-case/_components/evaluator-form/basics/agent-field';
import { FirstMessageField } from '@/app/(app)/test-case/_components/evaluator-form/basics/first-message-field';
import { FolderField } from '@/app/(app)/test-case/_components/evaluator-form/basics/folder-field';
import { NameField } from '@/app/(app)/test-case/_components/evaluator-form/basics/name-field';
import { PersonalityLanguageFields } from '@/app/(app)/test-case/_components/evaluator-form/basics/personality-language-fields';
import { ScenarioTypeField } from '@/app/(app)/test-case/_components/evaluator-form/basics/scenario-type-field';
import { TagsField } from '@/app/(app)/test-case/_components/evaluator-form/basics/tags-field';
import { TestProfileField } from '@/app/(app)/test-case/_components/evaluator-form/basics/test-profile-field';
import { ConfigurationFields } from '@/app/(app)/test-case/_components/evaluator-form/configuration/configuration-fields';
import { ExpectedOutcomeField } from '@/app/(app)/test-case/_components/evaluator-form/criteria/expected-outcome-field';
import { InstructionsField } from '@/app/(app)/test-case/_components/evaluator-form/criteria/instructions-field';
import { MetricsField } from '@/app/(app)/test-case/_components/evaluator-form/criteria/metrics-field';
import { ExpectedToolCallsField } from '@/app/(app)/test-case/_components/evaluator-form/mock-tools/expected-tool-calls-field';

import { ManualStep } from '../../_constants/create-mode';

interface ManualStepContentProps {
  step: ManualStep;
}

export function ManualStepContent({ step }: ManualStepContentProps) {
  if (step === ManualStep.basics) {
    return (
      <>
        <NameField />
        <FolderField />
        <TagsField />
        <PersonalityLanguageFields />
      </>
    );
  }
  if (step === ManualStep.criteria) {
    return (
      <>
        <ExpectedOutcomeField />
        <MetricsField />
        <ExpectedToolCallsField />
      </>
    );
  }
  if (step === ManualStep.configuration) return <ConfigurationFields />;
  return (
    <>
      <AgentField />
      <ScenarioTypeField />
      <TestProfileField />
      <FirstMessageField />
      <InstructionsField />
    </>
  );
}
