'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { downloadTextFile } from '@/app/(app)/test-case/_utils/download-text-file';
import { exportEvaluatorsAction } from '@/server/evaluators/actions';
import type { ExportEvaluatorsInput } from '@/server/evaluators/types';

export const useExportEvaluatorsMutation = () =>
  useMutation({
    mutationKey: EvaluatorService.exportEvaluatorsMutationKey,
    mutationFn: (input: ExportEvaluatorsInput) => exportEvaluatorsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      downloadTextFile(result.data);
      toast.success(`Exported ${result.data.fileName}`);
    },
  });
