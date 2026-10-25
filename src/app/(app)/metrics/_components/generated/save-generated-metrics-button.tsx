'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import type { GeneratedMetricDraft } from '@/server/metrics/types';

import { useBulkCreateMetricsMutation } from '../../_hooks/mutations/create/use-bulk-create-metrics-mutation';

type SaveGeneratedMetricsButtonProps = {
  jobId: string;
  drafts: GeneratedMetricDraft[];
  onSaved: () => void;
};

export function SaveGeneratedMetricsButton({
  jobId,
  drafts,
  onSaved,
}: SaveGeneratedMetricsButtonProps) {
  const projectId = useCurrentProjectId();
  const bulkCreate = useBulkCreateMetricsMutation();

  const handleSave = () => {
    bulkCreate.mutate(
      { projectId, jobId, metrics: drafts },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    );
  };

  return (
    <Button
      type="button"
      className="w-full"
      disabled={drafts.length === 0 || bulkCreate.isPending}
      onClick={handleSave}
    >
      Save Selected Metrics ({drafts.length})
    </Button>
  );
}
