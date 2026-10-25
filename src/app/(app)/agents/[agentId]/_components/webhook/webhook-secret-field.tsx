'use client';

import { useState } from 'react';

import { ConfiguredSecret } from '../../../_components/integration/secret/configured-secret';
import { WEBHOOK_SECRET_HELP } from '../../_constants/webhook';
import { WebhookSecretInput } from './webhook-secret-input';

interface WebhookSecretFieldProps {
  configured: boolean;
}

export function WebhookSecretField({ configured }: WebhookSecretFieldProps) {
  const [updating, setUpdating] = useState(false);
  if (configured && !updating) {
    return (
      <ConfiguredSecret
        label="Webhook Secret"
        description={WEBHOOK_SECRET_HELP}
        statusText="Webhook Secret Configured"
        onUpdate={() => setUpdating(true)}
      />
    );
  }
  return <WebhookSecretInput />;
}
