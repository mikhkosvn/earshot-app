'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { listOrganizations } from '@/server/organizations/list-organizations';
import { switchOrganization } from '@/server/organizations/switch-organization';
import type {
  OrganizationIdInput,
  OrganizationSummary,
} from '@/server/organizations/types';

export async function listOrganizationsAction(): Promise<
  OrganizationSummary[]
> {
  return listOrganizations();
}

export async function switchOrganizationAction(
  args: OrganizationIdInput,
): Promise<ActionResult<{ projectId: number }>> {
  return runAction(() => switchOrganization(args));
}
