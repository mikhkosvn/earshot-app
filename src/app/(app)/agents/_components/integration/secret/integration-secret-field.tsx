'use client';

import { useState } from 'react';

import type { IntegrationField } from '@/server/agents/constants/provider-integrations';

import { ConfiguredSecret } from './configured-secret';
import { IntegrationSecretInput } from './integration-secret-input';

type IntegrationSecretFieldProps = {
  field: IntegrationField;
  configured: boolean;
};

export function IntegrationSecretField({
  field,
  configured,
}: IntegrationSecretFieldProps) {
  const [updating, setUpdating] = useState(false);
  if (configured && !updating) {
    return (
      <ConfiguredSecret
        label={field.label}
        description={field.description}
        statusText="API Key Configured"
        onUpdate={() => setUpdating(true)}
      />
    );
  }
  return <IntegrationSecretInput field={field} />;
}
