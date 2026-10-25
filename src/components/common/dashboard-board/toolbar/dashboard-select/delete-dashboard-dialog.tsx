'use client';

import { useRouter } from 'next/navigation';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import type { DashboardSource } from '@/generated/prisma/enums';
import type { DashboardItem } from '@/server/dashboards/types';

import { useDeleteDashboardMutation } from '../../_hooks/mutations/use-delete-dashboard-mutation';
import { dashboardRootHref } from '../../_utils/dashboard-href';

type DeleteDashboardDialogProps = {
  dashboard: DashboardItem | null;
  currentDashboardId: number;
  source: DashboardSource;
  onClose: () => void;
};

const descriptionOf = (dashboard: DashboardItem | null) => {
  if (!dashboard) return undefined;
  return `This action cannot be undone. This will permanently delete the dashboard "${dashboard.name}" and its plots.`;
};

export function DeleteDashboardDialog({
  dashboard,
  currentDashboardId,
  source,
  onClose,
}: DeleteDashboardDialogProps) {
  const router = useRouter();
  const projectId = useCurrentProjectId();
  const deleteDashboard = useDeleteDashboardMutation();

  return (
    <DeleteConfirmDialog
      open={dashboard !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      isPending={deleteDashboard.isPending}
      description={descriptionOf(dashboard)}
      onConfirm={() => {
        if (!dashboard) return;
        deleteDashboard.mutate(
          { dashboardId: dashboard.id },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              onClose();
              if (result.data.id !== currentDashboardId) return;
              router.push(dashboardRootHref(source, projectId));
            },
          },
        );
      }}
    />
  );
}
