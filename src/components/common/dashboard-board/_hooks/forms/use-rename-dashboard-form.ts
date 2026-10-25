'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { DashboardItem } from '@/server/dashboards/types';

import {
  dashboardNameFormSchema,
  type DashboardNameFormValues,
} from '../../_schemas/dashboard-name-form-schema';
import { useRenameDashboardMutation } from '../mutations/use-rename-dashboard-mutation';

export const useRenameDashboardForm = (
  dashboard: DashboardItem | null,
  onDone: () => void,
) => {
  const form = useForm<DashboardNameFormValues>({
    resolver: zodResolver(dashboardNameFormSchema),
    defaultValues: { name: dashboard?.name ?? '' },
  });
  const renameDashboard = useRenameDashboardMutation();

  const onSubmit = form.handleSubmit((values) => {
    if (!dashboard) return;
    renameDashboard.mutate(
      { dashboardId: dashboard.id, name: values.name },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onDone();
        },
      },
    );
  });

  return { form, onSubmit, isPending: renameDashboard.isPending };
};
