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

import { useUpdateReviewMutation } from '../../_hooks/mutations/call-review/use-update-review-mutation';
import { CallReviewIcon } from './call-review-icon';

interface CallReviewSelectProps {
  callLogId: number;
  evaluationStatus: CallEvaluationStatus;
}

const REVIEW_ITEMS = [
  { value: CallEvaluationStatus.reviewed_success, label: 'Success' },
  { value: CallEvaluationStatus.reviewed_failure, label: 'Failure' },
];

export function CallReviewSelect({
  callLogId,
  evaluationStatus,
}: CallReviewSelectProps) {
  const updateReview = useUpdateReviewMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="xs"
            data-success={SUCCESS_STATUSES.includes(evaluationStatus)}
            disabled={updateReview.isPending}
            className="gap-1 rounded-full border-red-200 bg-red-50 text-xs text-red-700 data-[success=true]:border-emerald-200 data-[success=true]:bg-emerald-50 data-[success=true]:text-emerald-700 dark:bg-transparent dark:data-[success=true]:bg-transparent"
          />
        }
      >
        <CallReviewIcon evaluationStatus={evaluationStatus} />
        {CallEvaluationStatusLabel[evaluationStatus]}
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {REVIEW_ITEMS.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="text-xs"
            onClick={() =>
              updateReview.mutate({ callLogId, evaluationStatus: item.value })
            }
          >
            <CallReviewIcon evaluationStatus={item.value} />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
