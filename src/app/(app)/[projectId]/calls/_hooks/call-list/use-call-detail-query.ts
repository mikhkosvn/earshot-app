'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CallService } from '../../_service';

export const useCallDetailQuery = (callLogId: number) =>
  useSuspenseQuery(CallService.getDetailQuery({ callLogId }));
