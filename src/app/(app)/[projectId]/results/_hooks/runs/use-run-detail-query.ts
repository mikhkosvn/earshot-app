'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ResultService } from '../../_service';

export const useRunDetailQuery = (runId: number) =>
  useSuspenseQuery(ResultService.getRunQuery({ runId }));
