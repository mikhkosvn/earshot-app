'use client';

import { useRouter } from 'next/navigation';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { DashboardSource } from '@/generated/prisma/enums';

import { dashboardHref } from '../_utils/dashboard-href';

export const useSelectDashboard = (source: DashboardSource) => {
  const router = useRouter();
  const projectId = useCurrentProjectId();
  return (dashboardId: number) =>
    router.push(dashboardHref(source, projectId, dashboardId));
};
