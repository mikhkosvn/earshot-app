'use client';

import { useIsMutating } from '@tanstack/react-query';

import { InsightService } from '../../_service';

export const useIsSavingInsightConfig = () =>
  useIsMutating({ mutationKey: InsightService.saveConfigMutationKey }) > 0;
