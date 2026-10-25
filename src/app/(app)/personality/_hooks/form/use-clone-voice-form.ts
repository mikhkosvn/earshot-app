'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { cloneVoiceFormSchema } from '@/server/voices/schemas';
import type { CloneVoiceFormValues } from '@/server/voices/types';

import { useCloneVoiceMutation } from '../mutations/form/use-clone-voice-mutation';

export const useCloneVoiceForm = (onCloned: (voiceId: string) => void) => {
  const projectId = useCurrentProjectId();
  const form = useForm<CloneVoiceFormValues>({
    resolver: zodResolver(cloneVoiceFormSchema),
    defaultValues: { name: '', sample: null },
  });
  const cloneVoice = useCloneVoiceMutation();

  const onSubmit = form.handleSubmit((values) =>
    cloneVoice.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onCloned(result.data.id);
        },
      },
    ),
  );

  return { form, onSubmit, isPending: cloneVoice.isPending };
};
