'use client';

import { useMutation } from '@tanstack/react-query';

import { runTestSuiteAction } from '@/server/runs/actions';
import type { TestSuiteRequestInput } from '@/server/runs/types';

import { RunDialogService } from '../../_service';

export const useRunTestSuiteMutation = () =>
  useMutation({
    mutationKey: RunDialogService.runTestSuiteMutationKey,
    mutationFn: (input: TestSuiteRequestInput) => runTestSuiteAction(input),
  });
