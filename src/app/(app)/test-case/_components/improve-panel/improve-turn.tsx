'use client';

import type { ActionResult } from '@/lib/action-result';
import type { EvaluatorImprovementReply } from '@/server/evaluators/types';

import { ImproveReply } from './improve-reply';

type ImproveTurnProps = {
  turn: {
    id: number;
    prompt?: string;
    result?: ActionResult<EvaluatorImprovementReply>;
  };
};

export function ImproveTurn({ turn }: ImproveTurnProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="ml-10 self-end rounded-2xl bg-muted px-3.5 py-2 text-sm">
        {turn.prompt}
      </div>
      <ImproveReply result={turn.result} />
    </div>
  );
}
