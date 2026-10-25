'use client';

import { PlusIcon, SparklesIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCallDetailQuery } from '../../_hooks/call-list/use-call-detail-query';
import { useAddCallToLabMutation } from '../../_hooks/mutations/call-actions/use-add-call-to-lab-mutation';
import { useRecomputeMetricsMutation } from '../../_hooks/mutations/call-actions/use-recompute-metrics-mutation';
import { UseAsEvaluatorDialog } from '../use-as-evaluator/use-as-evaluator-dialog';

type CallDetailActionsProps = {
  callLogId: number;
};

export function CallDetailActions({ callLogId }: CallDetailActionsProps) {
  const [evaluatorOpen, setEvaluatorOpen] = useState(false);
  const { data: call } = useCallDetailQuery(callLogId);
  const recompute = useRecomputeMetricsMutation();
  const addToLab = useAddCallToLabMutation();

  return (
    <>
      <Button
        size="sm"
        className="text-xs"
        onClick={() => setEvaluatorOpen(true)}
      >
        <SparklesIcon />
        Use as Evaluator
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size="sm" className="text-xs" />}>
          <PlusIcon />
          Actions
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-xs"
              onClick={() =>
                addToLab.mutate({ conversationId: call.conversationId })
              }
            >
              Add to Lab
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              onClick={() => recompute.mutate([callLogId])}
            >
              Recompute Metrics
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <UseAsEvaluatorDialog
        callLogIds={[callLogId]}
        open={evaluatorOpen}
        onOpenChange={setEvaluatorOpen}
      />
    </>
  );
}
