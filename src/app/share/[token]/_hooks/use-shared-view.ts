'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShareService } from '../_service';
import { useShareToken } from './use-share-token';

export const useSharedView = () => {
  const token = useShareToken();
  return useSuspenseQuery(ShareService.getViewQuery({ token })).data;
};
