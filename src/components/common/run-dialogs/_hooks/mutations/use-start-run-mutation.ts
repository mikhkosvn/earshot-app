'use client';

import { useMutation } from '@tanstack/react-query';

import { startRunAction } from '@/server/runs/actions';
import type { StartRunInput } from '@/server/runs/types';

import { RunDialogService } from '../../_service';

export const useStartRunMutation = () =>
  useMutation({
    mutationKey: RunDialogService.startRunMutationKey,
    mutationFn: (input: StartRunInput) => startRunAction(input),
  });
