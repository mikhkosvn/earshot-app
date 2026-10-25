'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { useCopyPredefinedMetricsMutation } from '../../_hooks/mutations/create/use-copy-predefined-metrics-mutation';

interface CreatePredefinedButtonProps {
  codes: string[];
  onCreated: () => void;
}

export function CreatePredefinedButton({
  codes,
  onCreated,
}: CreatePredefinedButtonProps) {
  const projectId = useCurrentProjectId();
  const copyPredefined = useCopyPredefinedMetricsMutation();

  return (
    <Button
      type="button"
      disabled={codes.length === 0 || copyPredefined.isPending}
      onClick={() =>
        copyPredefined.mutate(
          { projectId, codes },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              onCreated();
            },
          },
        )
      }
    >
      Create Metrics
    </Button>
  );
}
