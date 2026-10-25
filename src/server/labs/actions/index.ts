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
import { LabsActionOperation } from '@/server/labs/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listLabMetricsAction(
  args: LabProjectInput,
): Promise<LabMetricListItem[]> {
  return withActionEvent(LabsActionOperation.listLabMetrics, () =>
    listLabMetrics(args),
  );
}

export async function getLabAction(args: LabMetricInput): Promise<LabView> {
  return withActionEvent(LabsActionOperation.getLab, () => getLab(args));
}

export async function updateLabExpectedAction(
  args: UpdateLabExpectedInput,
): Promise<ActionResult<LabReviewChange>> {
  return withActionEvent(LabsActionOperation.updateLabExpected, () =>
    runAction(() => updateLabExpected(args)),
  );
}

export async function updateLabFeedbackAction(
  args: UpdateLabFeedbackInput,
): Promise<ActionResult<LabReviewChange>> {
  return withActionEvent(LabsActionOperation.updateLabFeedback, () =>
    runAction(() => updateLabFeedback(args)),
  );
}

export async function deleteLabTestSetsAction(
  args: DeleteLabTestSetsInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(LabsActionOperation.deleteLabTestSets, () =>
    runAction(() => deleteLabTestSets(args)),
  );
}

export async function startLabRunAction(
  args: StartLabRunInput,
): Promise<ActionResult<StartedJob>> {
  return withActionEvent(LabsActionOperation.startLabRun, () =>
    runAction(() => startLabRun(args)),
  );
}
