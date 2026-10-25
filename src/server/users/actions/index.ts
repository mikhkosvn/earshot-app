'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { getCurrentUser } from '@/server/users/get-current-user';
import type { CurrentUser, UpdateCurrentUserInput } from '@/server/users/types';
import { updateCurrentUser } from '@/server/users/update-current-user';

export async function getCurrentUserAction(): Promise<CurrentUser> {
  return getCurrentUser();
}

export async function updateCurrentUserAction(
  args: UpdateCurrentUserInput,
): Promise<ActionResult<{ id: number; name: string; email: string }>> {
  return runAction(() => updateCurrentUser(args));
}
