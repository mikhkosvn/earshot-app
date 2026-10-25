'use client';

import { type Mutation, useMutationState } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';

import type { ActionResult } from '@/lib/action-result';
import type { SpecCheck, TestSuiteRequestInput } from '@/server/runs/types';

import { RunDialogService } from '../_service';
import type { RunFromFileForm } from './use-run-from-file-form';

interface CheckState {
  data: ActionResult<SpecCheck> | undefined;
  variables: TestSuiteRequestInput | undefined;
}

type CheckMutation = Mutation<
  ActionResult<SpecCheck>,
  Error,
  TestSuiteRequestInput
>;

const matches = (
  state: CheckState | undefined,
  agentId: number | undefined,
  specText: string,
) =>
  state?.variables?.agentId === agentId &&
  state?.variables?.specText.trim() === specText.trim();

export const useCurrentSpecCheck = (
  control: RunFromFileForm['control'],
): SpecCheck | null => {
  const agentId = useWatch({ control, name: 'agentId' });
  const specText = useWatch({ control, name: 'specText' });
  const states = useMutationState<CheckState, CheckMutation>({
    filters: { mutationKey: RunDialogService.checkTestSuiteMutationKey },
    select: (mutation): CheckState => ({
      data: mutation.state.data,
      variables: mutation.state.variables,
    }),
  });
  const latest = states.at(-1);
  if (!matches(latest, agentId, specText)) return null;
  if (!latest?.data?.ok) return null;
  return latest.data.data;
};
