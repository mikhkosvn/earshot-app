'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { personalityFormSchema } from '@/server/personalities/schemas';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { useUpdatePersonalityMutation } from '../mutations/form/use-update-personality-mutation';
import { useOpenPersonalityList } from './use-open-personality-list';
import { usePersonalityDetail } from './use-personality-detail';

export const useEditPersonalityForm = () => {
  const personality = usePersonalityDetail();
  const openList = useOpenPersonalityList();
  const form = useForm<PersonalityFormValues>({
    resolver: zodResolver(personalityFormSchema),
    defaultValues: personality.values,
  });
  const updatePersonality = useUpdatePersonalityMutation();

  const onSubmit = form.handleSubmit((values) =>
    updatePersonality.mutate(
      { personalityId: personality.id, values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset(values);
          openList();
        },
      },
    ),
  );

  return { form, onSubmit };
};
