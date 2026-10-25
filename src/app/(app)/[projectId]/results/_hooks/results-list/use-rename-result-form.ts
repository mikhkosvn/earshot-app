'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { renameResultSchema } from '@/server/results/schemas';
import type { RenameResultInput } from '@/server/results/types';

import { useRenameResultMutation } from '../mutations/results-list/use-rename-result-mutation';

interface RenameTarget {
  id: number;
  name: string;
}

export const useRenameResultForm = (
  target: RenameTarget,
  onRenamed: () => void,
) => {
  const form = useForm<RenameResultInput>({
    resolver: zodResolver(renameResultSchema),
    defaultValues: { resultId: target.id, name: target.name },
  });
  const renameResult = useRenameResultMutation();

  const onSubmit = form.handleSubmit((values) =>
    renameResult.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onRenamed();
      },
    }),
  );

  return { form, onSubmit };
};
