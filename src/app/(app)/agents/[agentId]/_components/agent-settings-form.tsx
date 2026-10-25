'use client';

import { FormProvider } from 'react-hook-form';

import { useAgentSettingsForm } from '../_hooks/use-agent-settings-form';
import { BasicsCard } from './basics-card';
import { DynamicVariablesSection } from './dynamic-variables/dynamic-variables-section';
import { AgentSettingsHeader } from './header/agent-settings-header';
import { KnowledgeSection } from './knowledge/knowledge-section';
import { MockToolsSection } from './mock-tools/mock-tools-section';
import { ProviderCard } from './provider-card';
import { WebhookSection } from './webhook/webhook-section';

export function AgentSettingsForm() {
  const { form, onSubmit } = useAgentSettingsForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <AgentSettingsHeader />
        <div className="grid items-start gap-3 lg:grid-cols-2">
          <BasicsCard />
          <div className="flex flex-col gap-3 lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto lg:pr-1">
            <ProviderCard />
            <KnowledgeSection />
            <MockToolsSection />
            <DynamicVariablesSection />
            <WebhookSection />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
