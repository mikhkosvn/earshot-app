'use client';

import type { DashboardItem } from '@/server/dashboards/types';

import { useRenameDashboardForm } from '../../../_hooks/forms/use-rename-dashboard-form';
import { DashboardNameForm } from './dashboard-name-form';

interface RenameDashboardFormProps {
  dashboard: DashboardItem | null;
  onDone: () => void;
}

export function RenameDashboardForm({
  dashboard,
  onDone,
}: RenameDashboardFormProps) {
  const { form, onSubmit, isPending } = useRenameDashboardForm(
    dashboard,
    onDone,
  );

  if (!dashboard) return null;

  return (
    <DashboardNameForm
      form={form}
      onSubmit={() => {
        void onSubmit();
      }}
      submitLabel="Save"
      isPending={isPending}
    />
  );
}
