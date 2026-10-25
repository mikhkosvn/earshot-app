'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { getOrganizationSettings } from '@/server/organization-settings/get-organization-settings';
import type {
  OrganizationIdInput,
  OrganizationSettings,
  UpdateOrganizationSettingsInput,
} from '@/server/organization-settings/types';
import { updateOrganizationSettings } from '@/server/organization-settings/update-organization-settings';
import { OrganizationSettingsActionOperation } from '@/server/organization-settings/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getOrganizationSettingsAction(
  args: OrganizationIdInput,
): Promise<OrganizationSettings> {
  return withActionEvent(
    OrganizationSettingsActionOperation.getOrganizationSettings,
    () => getOrganizationSettings(args),
  );
}

export async function updateOrganizationSettingsAction(
  args: UpdateOrganizationSettingsInput,
): Promise<ActionResult<{ id: number; name: string }>> {
  return withActionEvent(
    OrganizationSettingsActionOperation.updateOrganizationSettings,
    () => runAction(() => updateOrganizationSettings(args)),
  );
}
