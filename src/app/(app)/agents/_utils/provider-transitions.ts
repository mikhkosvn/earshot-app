import type { UseFormReturn } from 'react-hook-form';

import type { AgentProvider } from '@/generated/prisma/enums';
import {
  PROVIDER_INTEGRATIONS,
  TelephonySupport,
} from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

const OPTIONS = { shouldDirty: true } as const;

export const changeProvider = (
  form: Pick<UseFormReturn<AgentConfigValues>, 'setValue' | 'getValues'>,
  provider: AgentProvider,
) => {
  if (form.getValues('provider') === provider) return;
  form.setValue('provider', provider, OPTIONS);
  const support = PROVIDER_INTEGRATIONS[provider].telephony;
  if (support === TelephonySupport.none) {
    form.setValue('telephonyEnabled', false, OPTIONS);
    return;
  }
  if (support === TelephonySupport.preselected) {
    form.setValue('telephonyEnabled', true, OPTIONS);
  }
};
