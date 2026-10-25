'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import type { StartedJob } from '@/server/jobs/types';
import { deleteLabTestSets } from '@/server/labs/delete-lab-test-sets';
import { getLab } from '@/server/labs/get-lab';
import { listLabMetrics } from '@/server/labs/list-lab-metrics';
import { startLabRun } from '@/server/labs/start-lab-run';
import type {
  DeleteLabTestSetsInput,
  LabMetricInput,
  LabMetricListItem,
  LabProjectInput,
  LabReviewChange,
  LabView,
  StartLabRunInput,
  UpdateLabExpectedInput,
  UpdateLabFeedbackInput,
} from '@/server/labs/types';
import { updateLabExpected } from '@/server/labs/update-lab-expected';
import { updateLabFeedback } from '@/server/labs/update-lab-feedback';

export async function listLabMetricsAction(
  args: LabProjectInput,
): Promise<LabMetricListItem[]> {
  return listLabMetrics(args);
}

export async function getLabAction(args: LabMetricInput): Promise<LabView> {
  return getLab(args);
}

export async function updateLabExpectedAction(
  args: UpdateLabExpectedInput,
): Promise<ActionResult<LabReviewChange>> {
  return runAction(() => updateLabExpected(args));
}

export async function updateLabFeedbackAction(
  args: UpdateLabFeedbackInput,
): Promise<ActionResult<LabReviewChange>> {
  return runAction(() => updateLabFeedback(args));
}

export async function deleteLabTestSetsAction(
  args: DeleteLabTestSetsInput,
): Promise<ActionResult<{ count: number }>> {
  return runAction(() => deleteLabTestSets(args));
}

export async function startLabRunAction(
  args: StartLabRunInput,
): Promise<ActionResult<StartedJob>> {
  return runAction(() => startLabRun(args));
}
