'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import {
  rubricFormSchema,
  type RubricFormValues,
} from '../_schemas/rubric-form-schema';
import { RubricService } from '../_service';
import { useSaveRubricMutation } from './mutations/use-save-rubric-mutation';

export const useRubricForm = () => {
  const projectId = useCurrentProjectId();
  const { data: rules } = useSuspenseQuery({
    ...RubricService.getRubricQuery({ projectId }),
    select: (rubric) => rubric.rules,
  });
  const form = useForm<RubricFormValues>({
    resolver: zodResolver(rubricFormSchema),
    defaultValues: { rules },
  });
  const saveRubric = useSaveRubricMutation();

  const onSubmit = form.handleSubmit((values) =>
    saveRubric.mutate(
      { projectId, rules: values.rules },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The rubric is saved.');
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
