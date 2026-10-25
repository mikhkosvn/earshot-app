'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ConversationService } from '../_service';

export const useIsCorrectingMetric = () =>
  useIsMutating({ mutationKey: ConversationService.correctMetricMutationKey }) >
  0;
