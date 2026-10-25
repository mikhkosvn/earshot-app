'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useSaveTestProfileMutation } from '@/app/(app)/test-case/_hooks/mutations/test-profiles/use-save-test-profile-mutation';
import {
  type TestProfileFormOutput,
  testProfileFormSchema,
  type TestProfileFormValues,
} from '@/app/(app)/test-case/_schemas/test-profile-form-schema';
import type {
  TestProfileVariableView,
  TestProfileView,
} from '@/server/test-profiles/types';

const EMPTY_VARIABLE = { key: '', value: '' };

const withEmptyRow = (variables: TestProfileVariableView[]) => {
  if (variables.length > 0) return variables;
  return [EMPTY_VARIABLE];
};

const defaultValues = (
  profile: TestProfileView | null,
  agentId: number | null,
): TestProfileFormValues => ({
  name: profile?.name ?? '',
  agentId: profile?.agentId ?? agentId,
  mainAgentVariables: withEmptyRow(profile?.mainAgentVariables ?? []),
  testingAgentVariables: withEmptyRow(profile?.testingAgentVariables ?? []),
});

const toSaveInput = (
  projectId: number,
  profile: TestProfileView | null,
  values: TestProfileFormOutput,
) => {
  if (profile) return { update: { testProfileId: profile.id, ...values } };
  return { create: { projectId, ...values } };
};

export const useTestProfileForm = (
  profile: TestProfileView | null,
  defaultAgentId: number | null,
  onSaved: (profileId: number) => void,
) => {
  const projectId = useCurrentProjectId();
  const form = useForm<TestProfileFormValues, unknown, TestProfileFormOutput>({
    resolver: zodResolver(testProfileFormSchema),
    defaultValues: defaultValues(profile, defaultAgentId),
  });
  const saveTestProfile = useSaveTestProfileMutation();

  const onSubmit = form.handleSubmit((values) =>
    saveTestProfile.mutate(toSaveInput(projectId, profile, values), {
      onSuccess: (result) => {
        if (!result.ok) return;
        onSaved(result.data.id);
      },
    }),
  );

  return { form, onSubmit, isPending: saveTestProfile.isPending };
};
