import type { UseFormReturn } from 'react-hook-form';

import type { AgentProvider } from '@/generated/prisma/enums';
import {
  IntegrationFieldTarget,
  PROVIDER_INTEGRATIONS,
  TelephonySupport,
} from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

const OPTIONS = { shouldDirty: true } as const;

export const defaultProviderConfig = (provider: AgentProvider) =>
  Object.fromEntries(
    PROVIDER_INTEGRATIONS[provider].fields.flatMap((field) => {
      if (field.target !== IntegrationFieldTarget.config) return [];
      if (!field.configKey) return [];
      return [[field.configKey, field.options?.[0]?.value ?? '']];
    }),
  );

export const changeProvider = (
  form: Pick<UseFormReturn<AgentConfigValues>, 'setValue' | 'getValues'>,
  provider: AgentProvider,
) => {
  if (form.getValues('provider') === provider) return;
  form.setValue('provider', provider, OPTIONS);
  form.setValue('providerConfig', defaultProviderConfig(provider), OPTIONS);
  const support = PROVIDER_INTEGRATIONS[provider].telephony;
  if (support === TelephonySupport.none) {
    form.setValue('telephonyEnabled', false, OPTIONS);
    return;
  }
  if (support === TelephonySupport.preselected) {
    form.setValue('telephonyEnabled', true, OPTIONS);
  }
};
