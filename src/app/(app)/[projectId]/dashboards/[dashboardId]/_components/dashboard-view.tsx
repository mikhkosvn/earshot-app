'use client';

import { useParams } from 'next/navigation';

import { DashboardBoard } from '@/components/common/dashboard-board/dashboard-board';
import { DashboardSource } from '@/generated/prisma/enums';

export function DashboardView() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const id = Number(dashboardId);

  return (
    <DashboardBoard
      key={id}
      dashboardId={id}
      source={DashboardSource.call_logs}
    />
  );
}
