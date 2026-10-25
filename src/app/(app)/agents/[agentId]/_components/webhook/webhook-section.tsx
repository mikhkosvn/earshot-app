'use client';

import { WebhookIcon } from 'lucide-react';

import { useAgent } from '../../_hooks/use-agent';
import { SectionCard } from '../section-card';
import { WebhookSecretField } from './webhook-secret-field';
import { WebhookUrlField } from './webhook-url-field';

export function WebhookSection() {
  const agent = useAgent();

  return (
    <SectionCard
      icon={WebhookIcon}
      title="Webhook"
      subtitle="Agent-level webhook URL and secret"
    >
      <WebhookUrlField />
      <WebhookSecretField
        key={String(agent.updatedAt)}
        configured={agent.webhookSecretConfigured}
      />
    </SectionCard>
  );
}
