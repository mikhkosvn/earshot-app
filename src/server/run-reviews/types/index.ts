import type { z } from 'zod';

import type { CallEvaluationStatus } from '@/generated/prisma/enums';
import type {
  updateRunEvaluationSchema,
  updateRunFeedbackSchema,
  voteMetricSchema,
} from '@/server/run-reviews/schemas';

export type UpdateRunEvaluationInput = z.input<
  typeof updateRunEvaluationSchema
>;
export type UpdateRunFeedbackInput = z.input<typeof updateRunFeedbackSchema>;
export type VoteMetricInput = z.input<typeof voteMetricSchema>;

export interface RunReviewState {
  runId: number;
  evaluationStatus: CallEvaluationStatus | null;
  feedback: string | null;
}
