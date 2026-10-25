'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { CreatedAgent } from '@/server/agents/types';

import { TestCallOfferKind } from '../../_constants/test-call-offer';
import { TestCallDialog } from '../../_components/test-call/test-call-dialog';
import { WizardStep } from '../_constants/wizard-step';
import { useCreateAgentForm } from '../_hooks/use-create-agent-form';
import { useCreateAgentSubmit } from '../_hooks/use-create-agent-submit';
import { ConnectionCheckFailedDialog } from './connection-check-failed-dialog';
import { WizardBody } from './steps/wizard-body';
import { WizardHeader } from './stepper/wizard-header';

export function CreateAgentWizard() {
  const router = useRouter();
  const form = useCreateAgentForm();
  const [step, setStep] = useState<WizardStep>(WizardStep.connection);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedAgent | null>(null);
  const { onCreate, onCreateAnyway } = useCreateAgentSubmit(form, {
    onCheckFailed: setFailedMessage,
    onCreated: setCreated,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onCreate}
        noValidate
        className="flex w-full max-w-3xl flex-col rounded-xl border bg-background"
      >
        <WizardHeader step={step} completed={created !== null} />
        <WizardBody
          step={step}
          onNext={() => setStep(WizardStep.basicInfo)}
          onBack={() => setStep(WizardStep.connection)}
        />
      </form>
      <ConnectionCheckFailedDialog
        message={failedMessage}
        onClose={() => setFailedMessage(null)}
        onCreateAnyway={() => {
          setFailedMessage(null);
          onCreateAnyway();
        }}
      />
      <TestCallDialog
        agentId={created?.id ?? 0}
        kind={TestCallOfferKind.saved}
        check={created?.check ?? null}
        onClose={() => {
          if (!created) return;
          router.push(UrlGenerator.agent({ agentId: created.id }));
        }}
      />
    </FormProvider>
  );
}
