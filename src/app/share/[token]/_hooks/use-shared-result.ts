'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShareService } from '../_service';
import { useShareToken } from './use-share-token';

export const useSharedResult = () => {
  const token = useShareToken();
  return useSuspenseQuery(ShareService.getResultQuery({ token })).data;
};
