'use client';

import { GitForkIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { useForkPersonalityMutation } from '../../../_hooks/mutations/list/use-fork-personality-mutation';

type ForkButtonProps = {
  personalityId: number;
};

export function ForkButton({ personalityId }: ForkButtonProps) {
  const projectId = useCurrentProjectId();
  const forkPersonality = useForkPersonalityMutation();

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      disabled={forkPersonality.isPending}
      onClick={() => forkPersonality.mutate({ projectId, personalityId })}
    >
      <GitForkIcon />
      Fork
    </Button>
  );
}
