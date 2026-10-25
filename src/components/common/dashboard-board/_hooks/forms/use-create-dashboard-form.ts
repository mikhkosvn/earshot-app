'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { DashboardSource } from '@/generated/prisma/enums';

import {
  dashboardNameFormSchema,
  type DashboardNameFormValues,
} from '../../_schemas/dashboard-name-form-schema';
import { useCreateDashboardMutation } from '../mutations/use-create-dashboard-mutation';
import { useSelectDashboard } from '../use-select-dashboard';

export const useCreateDashboardForm = (
  source: DashboardSource,
  onDone: () => void,
) => {
  const projectId = useCurrentProjectId();
  const selectDashboard = useSelectDashboard(source);
  const form = useForm<DashboardNameFormValues>({
    resolver: zodResolver(dashboardNameFormSchema),
    defaultValues: { name: '' },
  });
  const createDashboard = useCreateDashboardMutation();

  const onSubmit = form.handleSubmit((values) =>
    createDashboard.mutate(
      { projectId, source, name: values.name },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onDone();
          selectDashboard(result.data.id);
        },
      },
    ),
  );

  return { form, onSubmit, isPending: createDashboard.isPending };
};
