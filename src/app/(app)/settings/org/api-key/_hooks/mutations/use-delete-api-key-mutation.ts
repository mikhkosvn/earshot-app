'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteApiKeyAction } from '@/server/api-keys/actions';
import type { DeleteApiKeyInput } from '@/server/api-keys/types/api-key-row';

import { ApiKeyKey, ApiKeyService } from '../../_service';

export const useDeleteApiKeyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ApiKeyService.deleteApiKeyMutationKey,
    mutationFn: (input: DeleteApiKeyInput) => deleteApiKeyAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The API key is deleted.');
      return queryClient.invalidateQueries({ queryKey: [ApiKeyKey.list] });
    },
  });
};
