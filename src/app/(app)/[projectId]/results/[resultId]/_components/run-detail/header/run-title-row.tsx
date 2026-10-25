'use client';

import { Share2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { RunDetail } from '@/server/results/types';

import { useShareRunMutation } from '../../../../_hooks/mutations/run-detail/use-share-run-mutation';
import { EvaluatorLinks } from './evaluator-links';

type RunTitleRowProps = {
  run: RunDetail;
};

export function RunTitleRow({ run }: RunTitleRowProps) {
  const share = useShareRunMutation();

  return (
    <div className="flex min-w-0 items-center gap-1">
      <h2 className="truncate text-lg font-semibold">{run.evaluator.name}</h2>
      <EvaluatorLinks evaluatorId={run.evaluator.id} />
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Share run"
        disabled={share.isPending}
        className="text-muted-foreground"
        onClick={() => share.mutate(run.id)}
      >
        <Share2Icon />
      </Button>
    </div>
  );
}
