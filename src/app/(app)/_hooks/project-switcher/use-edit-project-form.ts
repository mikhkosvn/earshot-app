'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useUpdateProjectMutation } from '@/app/(app)/_hooks/mutations/use-update-project-mutation';
import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import {
  projectNameFormSchema,
  type ProjectNameFormValues,
} from '@/app/(app)/_schemas/project-name-form-schema';

export const useEditProjectForm = (onSaved: () => void) => {
  const project = useCurrentProject();
  const form = useForm<ProjectNameFormValues>({
    resolver: zodResolver(projectNameFormSchema),
    defaultValues: { name: project.name },
  });
  const updateProject = useUpdateProjectMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateProject.mutate(
      { projectId: project.id, name: values.name },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit };
};
