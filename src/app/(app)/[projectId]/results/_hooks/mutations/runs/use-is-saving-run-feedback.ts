'use client';

import { useIsMutating } from '@tanstack/react-query';

import { ResultService } from '../../../_service';

export const useIsSavingRunFeedback = () =>
  useIsMutating({ mutationKey: ResultService.updateRunFeedbackMutationKey }) >
  0;
