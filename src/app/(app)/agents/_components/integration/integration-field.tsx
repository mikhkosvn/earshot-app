'use client';

import {
  type IntegrationField as IntegrationFieldConfig,
  IntegrationFieldKind,
} from '@/server/agents/constants/provider-integrations';

import { IntegrationSecretField } from './secret/integration-secret-field';
import { IntegrationSelectField } from './integration-select-field';
import { IntegrationTextField } from './integration-text-field';

interface IntegrationFieldProps {
  field: IntegrationFieldConfig;
  apiKeyConfigured: boolean;
}

export function IntegrationField({
  field,
  apiKeyConfigured,
}: IntegrationFieldProps) {
  if (field.kind === IntegrationFieldKind.secret) {
    return (
      <IntegrationSecretField field={field} configured={apiKeyConfigured} />
    );
  }
  if (field.kind === IntegrationFieldKind.select) {
    return <IntegrationSelectField field={field} />;
  }
  return <IntegrationTextField field={field} />;
}
