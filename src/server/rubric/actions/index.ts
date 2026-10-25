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

export async function getRubricAction(
  args: GetRubricInput,
): Promise<RubricView> {
  return getRubric(args);
}

export async function saveRubricAction(
  args: SaveRubricInput,
): Promise<ActionResult<{ count: number }>> {
  return runAction(() => saveRubric(args));
}
