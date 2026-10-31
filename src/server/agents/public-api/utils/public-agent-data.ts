import 'server-only';

import type { PublicAgentFields } from '@/server/agents/public-api/schemas';
import { phoneNumberOf } from '@/server/agents/utils/agent-config-data';
import { encryptSecret } from '@/server/crypto/encrypt-secret';

const textOrNull = (value: string | null) => {
  if (!value) return null;
  return value;
};

export const encryptedPublicApiKey = (
  apiKey: string | null | undefined,
  providerChanged: boolean,
) => {
  if (apiKey) return encryptSecret(apiKey);
  if (providerChanged) return null;
  return undefined;
};

export const publicAgentData = (values: PublicAgentFields) => ({
  ...(values.description !== undefined && {
    description: values.description ?? '',
  }),
  ...(values.inbound !== undefined && { inbound: values.inbound }),
  ...(values.contact_number !== undefined && {
    phoneNumber: phoneNumberOf({
      telephonyEnabled: true,
      phoneNumber: values.contact_number ?? '',
    }),
  }),
  ...(values.assistant_id !== undefined && {
    providerAgentId: textOrNull(values.assistant_id),
  }),
  ...(values.assistant_provider && { provider: values.assistant_provider }),
  ...(values.auto_sync_prompt_enabled !== undefined && {
    autoSyncPrompt: values.auto_sync_prompt_enabled,
  }),
  ...(values.language && { language: values.language }),
});
