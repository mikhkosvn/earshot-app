'use client';

import { FlaskConicalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useAddRunsToLabMutation } from '../../../../_hooks/mutations/runs/use-add-runs-to-lab-mutation';

interface AddRunsToLabButtonProps {
  selectedIds: number[];
}

export function AddRunsToLabButton({ selectedIds }: AddRunsToLabButtonProps) {
  const addToLab = useAddRunsToLabMutation();

  return (
    <Button
      size="sm"
      className="text-xs"
      disabled={selectedIds.length === 0 || addToLab.isPending}
      onClick={() => addToLab.mutate(selectedIds)}
    >
      <FlaskConicalIcon />
      Add to Lab
    </Button>
  );
}
