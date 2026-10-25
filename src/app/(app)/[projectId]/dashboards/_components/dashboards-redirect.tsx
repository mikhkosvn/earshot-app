import { io } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { DashboardSource } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { getFirstDashboardIdAction } from '@/server/dashboards/actions';

interface DashboardsRedirectProps {
  params: Promise<{ projectId: string }>;
}

export async function DashboardsRedirect({ params }: DashboardsRedirectProps) {
  await io();

  const projectId = parseProjectId((await params).projectId);
  if (!projectId) notFound();
  const dashboardId = await getFirstDashboardIdAction({
    projectId,
    source: DashboardSource.call_logs,
  });
  return redirect(UrlGenerator.dashboard({ projectId, dashboardId }));
}
