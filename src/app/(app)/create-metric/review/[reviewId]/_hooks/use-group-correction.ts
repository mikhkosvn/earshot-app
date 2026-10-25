'use client';

import type { MetricValue } from '@/server/metrics/types';

import { useSetPatternCorrectionMutation } from './mutations/use-set-pattern-correction-mutation';
import { usePatternGroup } from './use-pattern-group';
import { useReviewId } from './use-review-id';

export const useGroupCorrection = (groupKey: string) => {
  const reviewId = useReviewId();
  const { correction } = usePatternGroup(groupKey);
  const setCorrection = useSetPatternCorrectionMutation();

  const setScore = (value: MetricValue) =>
    setCorrection.mutate({
      reviewId,
      groupKey,
      correction: { value, note: correction?.note ?? '' },
    });

  const clearScore = () =>
    setCorrection.mutate({ reviewId, groupKey, correction: null });

  const saveNote = (note: string) => {
    if (!correction) return;
    if (note.trim() === correction.note) return;
    setCorrection.mutate({
      reviewId,
      groupKey,
      correction: { value: correction.value, note },
    });
  };

  return { setScore, clearScore, saveNote };
};
