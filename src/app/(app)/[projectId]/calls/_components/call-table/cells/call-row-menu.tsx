'use client';

import { EllipsisVerticalIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { CallLogRow } from '@/server/call-logs/types';

import { useCallIdParam } from '../../../_hooks/call-params/use-call-id-param';
import { useAddCallToLabMutation } from '../../../_hooks/mutations/call-actions/use-add-call-to-lab-mutation';
import { useRecomputeMetricsMutation } from '../../../_hooks/mutations/call-actions/use-recompute-metrics-mutation';
import { UseAsEvaluatorDialog } from '../../use-as-evaluator/use-as-evaluator-dialog';

interface CallRowMenuProps {
  call: CallLogRow;
}

export function CallRowMenu({ call }: CallRowMenuProps) {
  const [evaluatorOpen, setEvaluatorOpen] = useState(false);
  const { openCall } = useCallIdParam();
  const recompute = useRecomputeMetricsMutation();
  const addToLab = useAddCallToLabMutation();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Actions for call ${call.callId}`}
            />
          }
        >
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem
            className="text-xs"
            onClick={() => openCall(call.id)}
          >
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs"
            onClick={() => setEvaluatorOpen(true)}
          >
            Use as Evaluator
          </DropdownMenuItem>
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
            onClick={() => recompute.mutate([call.id])}
          >
            Recompute Metrics
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UseAsEvaluatorDialog
        callLogIds={[call.id]}
        open={evaluatorOpen}
        onOpenChange={setEvaluatorOpen}
      />
    </>
  );
}
