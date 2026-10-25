'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createTestProfile } from '@/server/test-profiles/create-test-profile';
import { deleteTestProfile } from '@/server/test-profiles/delete-test-profile';
import { duplicateTestProfile } from '@/server/test-profiles/duplicate-test-profile';
import { listTestProfiles } from '@/server/test-profiles/list-test-profiles';
import type {
  CreateTestProfileInput,
  ListTestProfilesInput,
  TestProfileIdInput,
  TestProfileView,
  UpdateTestProfileInput,
} from '@/server/test-profiles/types';
import { updateTestProfile } from '@/server/test-profiles/update-test-profile';

export async function listTestProfilesAction(
  args: ListTestProfilesInput,
): Promise<TestProfileView[]> {
  return listTestProfiles(args);
}

export async function createTestProfileAction(
  args: CreateTestProfileInput,
): Promise<ActionResult<TestProfileView>> {
  return runAction(() => createTestProfile(args));
}

export async function updateTestProfileAction(
  args: UpdateTestProfileInput,
): Promise<ActionResult<TestProfileView>> {
  return runAction(() => updateTestProfile(args));
}

export async function duplicateTestProfileAction(
  args: TestProfileIdInput,
): Promise<ActionResult<TestProfileView>> {
  return runAction(() => duplicateTestProfile(args));
}

export async function deleteTestProfileAction(
  args: TestProfileIdInput,
): Promise<ActionResult<{ testProfileId: number }>> {
  return runAction(() => deleteTestProfile(args));
}
