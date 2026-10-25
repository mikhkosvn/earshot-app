import 'server-only';

import type { AgentProvider, RedactionField } from '@/generated/prisma/enums';
import {
  IntegrationFieldTarget,
  PROVIDER_INTEGRATIONS,
} from '@/server/agents/constants/provider-integrations';
import { normalizePhoneNumber } from '@/server/agents/schemas';
import type { AgentConfigValues } from '@/server/agents/types';
import { encryptSecret } from '@/server/crypto/encrypt-secret';

const emptyToNull = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed;
};

export const phoneNumberOf = (values: {
  telephonyEnabled: boolean;
  phoneNumber: string;
}) => {
  if (!values.telephonyEnabled) return null;
  return emptyToNull(normalizePhoneNumber(values.phoneNumber));
};

export const providerConfigOf = (
  provider: AgentProvider,
  config: Record<string, string>,
) => {
  const keys = PROVIDER_INTEGRATIONS[provider].fields
    .filter((field) => field.target === IntegrationFieldTarget.config)
    .map((field) => field.configKey)
    .filter((key): key is string => Boolean(key));
  const entries = keys
    .map((key) => [key, (config[key] ?? '').trim()] as const)
    .filter(([, value]) => value !== '');
  return Object.fromEntries(entries);
};

export const redactionFieldsOf = (values: {
  redactionEnabled: boolean;
  redactionFields: RedactionField[];
}) => {
  if (!values.redactionEnabled) return [];
  return [...new Set(values.redactionFields)];
};

const encryptedApiKeyOf = (
  values: AgentConfigValues,
  previousProvider: AgentProvider | null,
) => {
  const apiKey = values.providerApiKey.trim();
  if (apiKey) return encryptSecret(apiKey);
  if (previousProvider && previousProvider !== values.provider) return null;
  return undefined;
};

export const agentConfigData = (
  values: AgentConfigValues,
  previousProvider: AgentProvider | null,
) => ({
  name: values.name.trim(),
  description: values.description.trim(),
  language: values.language,
  provider: values.provider,
  phoneNumber: phoneNumberOf(values),
  inbound: values.inbound,
  providerAgentId: emptyToNull(values.providerAgentId),
  providerApiKeyEncrypted: encryptedApiKeyOf(values, previousProvider),
  providerConfig: providerConfigOf(values.provider, values.providerConfig),
  autoImportCalls: values.autoImportCalls,
  autoSyncPrompt: values.autoSyncPrompt,
  sendPostConversationMetadata: values.sendPostConversationMetadata,
});
