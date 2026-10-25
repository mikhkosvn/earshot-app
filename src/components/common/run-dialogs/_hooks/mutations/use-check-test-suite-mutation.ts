'use client';

import { useMutation } from '@tanstack/react-query';

import { checkTestSuiteAction } from '@/server/runs/actions';
import type { TestSuiteRequestInput } from '@/server/runs/types';

import { RunDialogService } from '../../_service';

export const useCheckTestSuiteMutation = () =>
  useMutation({
    mutationKey: RunDialogService.checkTestSuiteMutationKey,
    mutationFn: (input: TestSuiteRequestInput) => checkTestSuiteAction(input),
  });
