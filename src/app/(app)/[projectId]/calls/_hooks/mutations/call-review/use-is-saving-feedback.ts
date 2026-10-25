'use client';

import { useIsMutating } from '@tanstack/react-query';

import { CallService } from '../../../_service';

export const useIsSavingFeedback = () =>
  useIsMutating({ mutationKey: CallService.updateFeedbackMutationKey }) > 0;
