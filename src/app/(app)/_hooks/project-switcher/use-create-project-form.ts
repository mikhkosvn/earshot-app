'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { useCreateProjectMutation } from '@/app/(app)/_hooks/mutations/project-switcher/use-create-project-mutation';
import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { projectNameFormSchema } from '@/app/(app)/_schemas/project-name-form-schema';

type ProjectNameFormValues = z.input<typeof projectNameFormSchema>;

export const useCreateProjectForm = (onCreated: () => void) => {
  const project = useCurrentProject();
  const form = useForm<ProjectNameFormValues>({
    resolver: zodResolver(projectNameFormSchema),
    defaultValues: { name: '' },
  });
  const createProject = useCreateProjectMutation();

  const onSubmit = form.handleSubmit((values) =>
    createProject.mutate(
      { organizationId: project.organizationId, name: values.name },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onCreated();
        },
      },
    ),
  );

  return { form, onSubmit };
};
