'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShareService } from '../_service';
import { useShareToken } from './use-share-token';

export const useSharedRun = (runId: number) => {
  const token = useShareToken();
  return useSuspenseQuery(ShareService.getRunQuery({ token, runId })).data;
};
