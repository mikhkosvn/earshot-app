import { CheckCheckIcon, XIcon } from 'lucide-react';

import type { CallEvaluationStatus } from '@/generated/prisma/enums';
import { SUCCESS_STATUSES } from '@/server/call-logs/constants/call-review';

type EvaluationStatusIconProps = {
  evaluationStatus: CallEvaluationStatus;
};

export function EvaluationStatusIcon({
  evaluationStatus,
}: EvaluationStatusIconProps) {
  if (SUCCESS_STATUSES.includes(evaluationStatus)) {
    return <CheckCheckIcon className="size-3.5 text-emerald-600" />;
  }
  return <XIcon className="size-3.5 text-red-600" />;
}
