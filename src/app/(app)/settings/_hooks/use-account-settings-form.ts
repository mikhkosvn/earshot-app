'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { ShellService } from '@/app/(app)/_service';
import { updateCurrentUserSchema } from '@/server/users/schemas';
import type { UpdateCurrentUserInput } from '@/server/users/types';

import { useUpdateCurrentUserMutation } from './mutations/use-update-current-user-mutation';

export const useAccountSettingsForm = () => {
  const { data: user } = useSuspenseQuery(ShellService.getCurrentUserQuery());
  const form = useForm<UpdateCurrentUserInput>({
    resolver: zodResolver(updateCurrentUserSchema),
    defaultValues: { name: user.name, email: user.email },
  });
  const updateUser = useUpdateCurrentUserMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateUser.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        form.reset(values);
      },
    }),
  );

  return { form, onSubmit };
};
