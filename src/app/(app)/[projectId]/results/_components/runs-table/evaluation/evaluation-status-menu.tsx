'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CallEvaluationStatus } from '@/generated/prisma/enums';
import { SUCCESS_STATUSES } from '@/server/call-logs/constants/call-review';
import { CallEvaluationStatusLabel } from '@/server/results/constants/call-evaluation-status-labels';

import { useUpdateRunEvaluationMutation } from '../../../_hooks/mutations/runs/use-update-run-evaluation-mutation';
import { EvaluationStatusIcon } from './evaluation-status-icon';

export const ALL_EVALUATION_OPTIONS: CallEvaluationStatus[] =
  Object.values(CallEvaluationStatus);

export const REVIEW_EVALUATION_OPTIONS: CallEvaluationStatus[] = [
  CallEvaluationStatus.reviewed_success,
  CallEvaluationStatus.reviewed_failure,
];

type EvaluationStatusMenuProps = {
  runId: number;
  evaluationStatus: CallEvaluationStatus;
  options: CallEvaluationStatus[];
};

export function EvaluationStatusMenu({
  runId,
  evaluationStatus,
  options,
}: EvaluationStatusMenuProps) {
  const updateEvaluation = useUpdateRunEvaluationMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="xs"
            role="combobox"
            aria-label={`Evaluation: ${CallEvaluationStatusLabel[evaluationStatus]}`}
            data-success={SUCCESS_STATUSES.includes(evaluationStatus)}
            disabled={updateEvaluation.isPending}
            className="gap-1 rounded-full border-red-200 bg-red-50 text-xs whitespace-nowrap text-red-700 data-[success=true]:border-emerald-200 data-[success=true]:bg-emerald-50 data-[success=true]:text-emerald-700 dark:bg-transparent dark:data-[success=true]:bg-transparent"
          />
        }
      >
        <EvaluationStatusIcon evaluationStatus={evaluationStatus} />
        {CallEvaluationStatusLabel[evaluationStatus]}
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            className="text-xs"
            onClick={() =>
              updateEvaluation.mutate({ runId, evaluationStatus: option })
            }
          >
            <EvaluationStatusIcon evaluationStatus={option} />
            {CallEvaluationStatusLabel[option]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
