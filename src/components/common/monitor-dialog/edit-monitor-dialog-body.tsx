'use client';

import { Suspense } from 'react';

import { EditMonitorForm } from './edit-monitor-form';
import { MonitorFormSkeleton } from './monitor-form-skeleton';

type EditMonitorDialogBodyProps = {
  monitorId: number | null;
  onSaved: () => void;
};

export function EditMonitorDialogBody({
  monitorId,
  onSaved,
}: EditMonitorDialogBodyProps) {
  if (monitorId === null) return null;

  return (
    <Suspense fallback={<MonitorFormSkeleton />}>
      <EditMonitorForm
        key={monitorId}
        monitorId={monitorId}
        onSaved={onSaved}
      />
    </Suspense>
  );
}
