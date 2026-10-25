import 'server-only';

import { CallEvaluationStatus } from '@/generated/prisma/enums';

const REVIEWED_STATUSES: CallEvaluationStatus[] = [
  CallEvaluationStatus.reviewed_success,
  CallEvaluationStatus.reviewed_failure,
];

export const keepReviewedStatus = (
  current: CallEvaluationStatus | null,
  computed: CallEvaluationStatus,
) => {
  if (current !== null && REVIEWED_STATUSES.includes(current)) return current;
  return computed;
};
