'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { addConversationToLabAction } from '@/server/lab-test-sets/actions';
import type { LabCorrection } from '@/server/lab-test-sets/types';
import { voteMetricAction } from '@/server/run-reviews/actions';

import { ConversationService } from '../../_service';

export type CorrectMetricInput = LabCorrection & {
  projectId: number;
  conversationId: number;
};

const correctMetric = async ({
  projectId,
  conversationId,
  metricId,
  expectedValue,
  feedback,
}: CorrectMetricInput) => {
  const lab = await addConversationToLabAction({
    projectId,
    conversationId,
    corrections: [{ metricId, expectedValue, feedback }],
  });
  if (!lab.ok) return lab;
  return voteMetricAction({
    conversationId,
    metricId,
    thumbsUp: false,
    expectedValue,
    feedback,
  });
};

export const useCorrectMetricMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ConversationService.correctMetricMutationKey,
    mutationFn: correctMetric,
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The correction is added to the Lab.');
      return queryClient.invalidateQueries();
    },
  });
};
