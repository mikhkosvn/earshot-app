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

export async function addConversationToLabAction(
  args: CreateLabTestSetInput,
): Promise<ActionResult<LabTestSetSummary>> {
  return runAction(() => addConversationToLab(args));
}

export async function addRunsToLabAction(
  args: AddRunsToLabInput,
): Promise<ActionResult<{ count: number }>> {
  return runAction(() => addRunsToLab(args));
}
