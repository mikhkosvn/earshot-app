'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { providerApiKeysFormSchema } from '@/server/provider-api-keys/schemas';
import type { ProviderApiKeysFormValues } from '@/server/provider-api-keys/types';

import { EMPTY_PROVIDER_KEYS } from '../_constants/provider-key-field-labels';
import { useSaveProviderApiKeysMutation } from './mutations/use-save-provider-api-keys-mutation';

export const useProviderApiKeysForm = () => {
  const projectId = useCurrentProjectId();
  const form = useForm<ProviderApiKeysFormValues>({
    resolver: zodResolver(providerApiKeysFormSchema),
    defaultValues: { keys: EMPTY_PROVIDER_KEYS },
  });
  const saveKeys = useSaveProviderApiKeysMutation();

  const onSubmit = form.handleSubmit((values) =>
    saveKeys.mutate(
      { projectId, keys: values.keys },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset({ keys: EMPTY_PROVIDER_KEYS });
        },
      },
    ),
  );

  return { form, onSubmit };
};
