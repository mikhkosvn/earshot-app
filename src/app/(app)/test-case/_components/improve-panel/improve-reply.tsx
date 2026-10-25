'use client';

import { LoaderCircleIcon } from 'lucide-react';

import type { ActionResult } from '@/lib/action-result';
import type { EvaluatorImprovementReply } from '@/server/evaluators/types';

import { ProposalList } from './proposals/proposal-list';

type ImproveReplyProps = {
  result?: ActionResult<EvaluatorImprovementReply>;
};

export function ImproveReply({ result }: ImproveReplyProps) {
  if (!result) {
    return (
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <LoaderCircleIcon className="size-3.5 animate-spin" />
        Reviewing the evaluators...
      </p>
    );
  }
  if (!result.ok) {
    return <p className="text-xs text-destructive">{result.error}</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">{result.data.message}</p>
      <ProposalList proposals={result.data.proposals} />
    </div>
  );
}
