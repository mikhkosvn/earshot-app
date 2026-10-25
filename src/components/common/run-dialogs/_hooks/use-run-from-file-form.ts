'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { RunChannel } from '@/server/runs/constants/run-channel';

import {
  type RunFromFileOutput,
  runFromFileFormSchema,
  type RunFromFileValues,
} from '../_schemas/run-from-file-form-schema';
import { useRunTestSuiteMutation } from './mutations/use-run-test-suite-mutation';

export type RunFromFileForm = UseFormReturn<
  RunFromFileValues,
  unknown,
  RunFromFileOutput
>;

interface UseRunFromFileFormArgs {
  onStarted: (resultId: number) => void;
}

export const useRunFromFileForm = ({ onStarted }: UseRunFromFileFormArgs) => {
  const projectId = useCurrentProjectId();
  const form = useForm<RunFromFileValues, unknown, RunFromFileOutput>({
    resolver: zodResolver(runFromFileFormSchema),
    defaultValues: { channel: RunChannel.voice, specText: '' },
  });
  const runTestSuite = useRunTestSuiteMutation();

  const onSubmit = form.handleSubmit((values) =>
    runTestSuite.mutate(
      { ...values, projectId },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onStarted(result.data.resultId);
        },
      },
    ),
  );

  return { form, onSubmit };
};
