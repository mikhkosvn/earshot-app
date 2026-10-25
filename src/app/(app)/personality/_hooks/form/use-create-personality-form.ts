'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { personalityFormSchema } from '@/server/personalities/schemas';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { DEFAULT_PERSONALITY_VALUES } from '../../_constants/personality-form-defaults';
import { useCreatePersonalityMutation } from '../mutations/form/use-create-personality-mutation';
import { useOpenPersonalityList } from './use-open-personality-list';

export const useCreatePersonalityForm = () => {
  const projectId = useCurrentProjectId();
  const openList = useOpenPersonalityList();
  const form = useForm<PersonalityFormValues>({
    resolver: zodResolver(personalityFormSchema),
    defaultValues: DEFAULT_PERSONALITY_VALUES,
  });
  const createPersonality = useCreatePersonalityMutation();

  const onSubmit = form.handleSubmit((values) =>
    createPersonality.mutate(
      { projectId, values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          openList();
        },
      },
    ),
  );

  return { form, onSubmit };
};
