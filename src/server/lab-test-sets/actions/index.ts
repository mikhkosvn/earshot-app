'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { addConversationToLab } from '@/server/lab-test-sets/add-conversation-to-lab';
import { addRunsToLab } from '@/server/lab-test-sets/add-runs-to-lab';
import type {
  AddRunsToLabInput,
  CreateLabTestSetInput,
  LabTestSetSummary,
} from '@/server/lab-test-sets/types';
import { LabTestSetsActionOperation } from '@/server/lab-test-sets/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function addConversationToLabAction(
  args: CreateLabTestSetInput,
): Promise<ActionResult<LabTestSetSummary>> {
  return withActionEvent(LabTestSetsActionOperation.addConversationToLab, () =>
    runAction(() => addConversationToLab(args)),
  );
}

export async function addRunsToLabAction(
  args: AddRunsToLabInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(LabTestSetsActionOperation.addRunsToLab, () =>
    runAction(() => addRunsToLab(args)),
  );
}
