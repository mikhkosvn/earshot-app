'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { updateRunEvaluation } from '@/server/run-reviews/update-run-evaluation';
import { updateRunFeedback } from '@/server/run-reviews/update-run-feedback';
import { voteMetric } from '@/server/run-reviews/vote-metric';
import type {
  RunReviewState,
  UpdateRunEvaluationInput,
  UpdateRunFeedbackInput,
  VoteMetricInput,
} from '@/server/run-reviews/types';
import { RunReviewsActionOperation } from '@/server/run-reviews/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function updateRunEvaluationAction(
  args: UpdateRunEvaluationInput,
): Promise<ActionResult<RunReviewState>> {
  return withActionEvent(RunReviewsActionOperation.updateRunEvaluation, () =>
    runAction(() => updateRunEvaluation(args)),
  );
}

export async function updateRunFeedbackAction(
  args: UpdateRunFeedbackInput,
): Promise<ActionResult<RunReviewState>> {
  return withActionEvent(RunReviewsActionOperation.updateRunFeedback, () =>
    runAction(() => updateRunFeedback(args)),
  );
}

export async function voteMetricAction(
  args: VoteMetricInput,
): Promise<ActionResult<{ success: boolean }>> {
  return withActionEvent(RunReviewsActionOperation.voteMetric, () =>
    runAction(() => voteMetric(args)),
  );
}
