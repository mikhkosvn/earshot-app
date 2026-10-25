'use client';

import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useLabMetricId } from '../../_hooks/lab/use-lab-metric-id';
import { useDeleteLabRowsMutation } from '../../_hooks/mutations/use-delete-lab-rows-mutation';

interface DeleteSelectedButtonProps {
  selected: number[];
  onDeleted: () => void;
}

export function DeleteSelectedButton({
  selected,
  onDeleted,
}: DeleteSelectedButtonProps) {
  const metricId = useLabMetricId();
  const deleteRows = useDeleteLabRowsMutation();

  if (selected.length === 0) return null;

  return (
    <Button
      type="button"
      variant="destructive"
      className="bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
      disabled={deleteRows.isPending}
      onClick={() =>
        deleteRows.mutate(
          { metricId, testSetIds: selected },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              onDeleted();
            },
          },
        )
      }
    >
      <Trash2Icon />
      Delete Selected ({selected.length})
    </Button>
  );
}
