'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { getRubric } from '@/server/rubric/get-rubric';
import { saveRubric } from '@/server/rubric/save-rubric';
import type {
  GetRubricInput,
  RubricView,
  SaveRubricInput,
} from '@/server/rubric/types';
import { RubricActionOperation } from '@/server/rubric/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getRubricAction(
  args: GetRubricInput,
): Promise<RubricView> {
  return withActionEvent(RubricActionOperation.getRubric, () =>
    getRubric(args),
  );
}

export async function saveRubricAction(
  args: SaveRubricInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(RubricActionOperation.saveRubric, () =>
    runAction(() => saveRubric(args)),
  );
}
