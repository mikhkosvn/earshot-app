'use client';

import { CallProcessingStatus } from '@/generated/prisma/enums';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CallProcessingStatusLabel } from '@/server/call-logs/constants/call-processing-status-labels';

import { CallStatusIcon } from './call-status-icon';

type CallStatusBadgeProps = {
  status: CallProcessingStatus;
  errorMessage: string | null;
};

export function CallStatusBadge({
  status,
  errorMessage,
}: CallStatusBadgeProps) {
  const badge = (
    <Badge
      variant="outline"
      data-failed={status === CallProcessingStatus.failed}
      className="gap-1 text-xs data-[failed=true]:border-red-200 data-[failed=true]:text-red-600"
    >
      <CallStatusIcon status={status} />
      {CallProcessingStatusLabel[status]}
    </Badge>
  );
  if (!errorMessage) return badge;
  return (
    <Tooltip>
      <TooltipTrigger render={badge} />
      <TooltipContent className="max-w-xs">{errorMessage}</TooltipContent>
    </Tooltip>
  );
}
