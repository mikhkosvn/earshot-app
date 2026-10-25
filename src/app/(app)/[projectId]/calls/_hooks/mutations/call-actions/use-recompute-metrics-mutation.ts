'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { JobService } from '@/components/common/background-tasks/_service';
import { ConversationKey } from '@/components/common/conversation-viewer/_service';
import { recomputeCallMetricsAction } from '@/server/call-logs/actions';

import { CallService } from '../../../_service';

export const useRecomputeMetricsMutation = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: CallService.recomputeMutationKey,
    mutationFn: (callLogIds: number[]) =>
      recomputeCallMetricsAction({ projectId, callLogIds }),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The metrics are being computed again.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
        queryClient.invalidateQueries({ queryKey: CallService.listKey }),
        queryClient.invalidateQueries({ queryKey: CallService.detailKey }),
        queryClient.invalidateQueries({ queryKey: [ConversationKey.detail] }),
      ]);
    },
  });
};
