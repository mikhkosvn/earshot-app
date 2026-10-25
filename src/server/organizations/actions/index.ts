'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { listOrganizations } from '@/server/organizations/list-organizations';
import { switchOrganization } from '@/server/organizations/switch-organization';
import type {
  OrganizationIdInput,
  OrganizationSummary,
} from '@/server/organizations/types';
import { OrganizationsActionOperation } from '@/server/organizations/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listOrganizationsAction(): Promise<
  OrganizationSummary[]
> {
  return withActionEvent(OrganizationsActionOperation.listOrganizations, () =>
    listOrganizations(),
  );
}

export async function switchOrganizationAction(
  args: OrganizationIdInput,
): Promise<ActionResult<{ projectId: number }>> {
  return withActionEvent(OrganizationsActionOperation.switchOrganization, () =>
    runAction(() => switchOrganization(args)),
  );
}
