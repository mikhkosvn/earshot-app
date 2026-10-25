'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteMetricsMutation } from '../../_hooks/mutations/row/use-delete-metrics-mutation';
import type { MetricSelection } from '../metrics-view';

export function BulkDeleteButton({
  selectedIds,
  onSelectedIdsChange,
}: MetricSelection) {
  const [open, setOpen] = useState(false);
  const projectId = useCurrentProjectId();
  const deleteMetrics = useDeleteMetricsMutation();

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-6 rounded-l-none border-l text-xs text-destructive hover:text-destructive"
        disabled={selectedIds.length === 0}
        onClick={() => setOpen(true)}
      >
        <Trash2Icon />
        Delete
      </Button>
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        isPending={deleteMetrics.isPending}
        onConfirm={() =>
          deleteMetrics.mutate(
            { projectId, metricIds: selectedIds },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setOpen(false);
                onSelectedIdsChange([]);
              },
            },
          )
        }
      />
    </>
  );
}
