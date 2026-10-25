'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import type { MetricListItem } from '@/server/metrics/types';

import { useDeleteMetricsMutation } from '../../_hooks/mutations/row/use-delete-metrics-mutation';

type DeleteMetricDialogProps = {
  metric: MetricListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteMetricDialog({
  metric,
  open,
  onOpenChange,
}: DeleteMetricDialogProps) {
  const projectId = useCurrentProjectId();
  const deleteMetrics = useDeleteMetricsMutation();

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={deleteMetrics.isPending}
      onConfirm={() =>
        deleteMetrics.mutate(
          { projectId, metricIds: [metric.id] },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              onOpenChange(false);
            },
          },
        )
      }
    />
  );
}
