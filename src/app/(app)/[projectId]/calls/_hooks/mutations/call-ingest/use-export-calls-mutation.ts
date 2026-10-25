'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JobService } from '@/components/common/background-tasks/_service';
import { exportCallLogsAction } from '@/server/call-exports/actions';
import type { ExportCallLogsInput } from '@/server/call-exports/types';

import { CallService } from '../../../_service';

export const useExportCallsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CallService.exportMutationKey,
    mutationFn: (input: ExportCallLogsInput) => exportCallLogsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Export started successfully.');
      return queryClient.invalidateQueries({
        queryKey: JobService.recentJobsKey,
      });
    },
  });
};
