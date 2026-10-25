import { CallEvaluationStatus } from '@/generated/prisma/enums';

export const CallEvaluationStatusLabel: Record<CallEvaluationStatus, string> = {
  [CallEvaluationStatus.success]: 'Success',
  [CallEvaluationStatus.failure]: 'Failure',
  [CallEvaluationStatus.reviewed_success]: 'Reviewed Success',
  [CallEvaluationStatus.reviewed_failure]: 'Reviewed Failure',
};
