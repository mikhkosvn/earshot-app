import type { Path } from 'react-hook-form';

import {
  type IntegrationField,
  IntegrationFieldTarget,
} from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

export const integrationFieldName = (
  field: IntegrationField,
): Path<AgentConfigValues> => {
  if (field.target === IntegrationFieldTarget.agentId) return 'providerAgentId';
  if (field.target === IntegrationFieldTarget.apiKey) return 'providerApiKey';
  return `providerConfig.${field.configKey ?? ''}`;
};
