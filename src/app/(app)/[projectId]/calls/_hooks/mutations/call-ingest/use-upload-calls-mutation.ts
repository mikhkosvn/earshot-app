'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { uploadCallLogsAction } from '@/server/call-logs/actions';
import type { UploadCallLogsInput } from '@/server/call-logs/types';

import { CallService } from '../../../_service';

const createdText = (count: number) => {
  if (count === 1) return 'The call is created. Processing starts now.';
  return `${count} calls are created. Processing starts now.`;
};

export const useUploadCallsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CallService.uploadMutationKey,
    mutationFn: (input: UploadCallLogsInput) => uploadCallLogsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(createdText(result.data.callLogIds.length));
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: CallService.hasCallsKey }),
        queryClient.invalidateQueries({ queryKey: CallService.listKey }),
      ]);
    },
  });
};
