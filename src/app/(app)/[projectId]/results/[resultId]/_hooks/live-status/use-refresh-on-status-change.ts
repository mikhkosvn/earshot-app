'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { ResultService } from '../../../_service';
import { useResultStatusPoll } from './use-result-status-poll';

export const useRefreshOnStatusChange = () => {
  const queryClient = useQueryClient();
  const status = useResultStatusPoll();
  const signature = `${status.status}:${status.completed}`;
  const previousSignature = useRef(signature);

  useEffect(() => {
    if (previousSignature.current === signature) return;
    previousSignature.current = signature;
    void queryClient.invalidateQueries({ queryKey: ResultService.detailKey });
    void queryClient.invalidateQueries({ queryKey: ResultService.runsKey });
  }, [queryClient, signature]);
};
