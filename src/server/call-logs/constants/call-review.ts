import { CallEvaluationStatus } from '@/generated/prisma/enums';

export const REVIEW_STATUSES: CallEvaluationStatus[] = [
  CallEvaluationStatus.reviewed_success,
  CallEvaluationStatus.reviewed_failure,
];

export const SUCCESS_STATUSES: CallEvaluationStatus[] = [
  CallEvaluationStatus.success,
  CallEvaluationStatus.reviewed_success,
];

export const FAILURE_STATUSES: CallEvaluationStatus[] = [
  CallEvaluationStatus.failure,
  CallEvaluationStatus.reviewed_failure,
];
