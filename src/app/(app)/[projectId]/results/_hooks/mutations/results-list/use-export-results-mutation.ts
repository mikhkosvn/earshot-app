'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { exportResultsAction } from '@/server/results/actions';
import type { ExportResultsInput } from '@/server/results/types';

import { ResultService } from '../../../_service';
import { downloadCsvFile } from '../../../_utils/results-list/download-text-file';

export const useExportResultsMutation = () =>
  useMutation({
    mutationKey: ResultService.exportResultsMutationKey,
    mutationFn: (input: ExportResultsInput) => exportResultsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      downloadCsvFile(result.data);
      toast.success('The results are exported.');
    },
  });
