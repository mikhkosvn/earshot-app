'use client';

import type { DashboardSource } from '@/generated/prisma/enums';

import { useCreateDashboardForm } from '../../../_hooks/forms/use-create-dashboard-form';
import { DashboardNameForm } from './dashboard-name-form';

type CreateDashboardFormProps = {
  source: DashboardSource;
  onDone: () => void;
};

export function CreateDashboardForm({
  source,
  onDone,
}: CreateDashboardFormProps) {
  const { form, onSubmit, isPending } = useCreateDashboardForm(source, onDone);

  return (
    <DashboardNameForm
      form={form}
      onSubmit={() => {
        void onSubmit();
      }}
      submitLabel="Create"
      isPending={isPending}
    />
  );
}
