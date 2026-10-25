'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteProviderApiKeyAction } from '@/server/provider-api-keys/actions';
import type { DeleteProviderApiKeyInput } from '@/server/provider-api-keys/types';

import { ProviderKeysService } from '../../_service';

export const useDeleteProviderApiKeyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ProviderKeysService.deleteKeyMutationKey,
    mutationFn: (input: DeleteProviderApiKeyInput) =>
      deleteProviderApiKeyAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The provider API key is deleted.');
      return queryClient.invalidateQueries({
        queryKey: ProviderKeysService.getKeysQuery({
          projectId: input.projectId,
        }).queryKey,
      });
    },
  });
};
