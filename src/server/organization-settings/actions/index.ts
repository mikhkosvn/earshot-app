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

export async function getOrganizationSettingsAction(
  args: OrganizationIdInput,
): Promise<OrganizationSettings> {
  return getOrganizationSettings(args);
}

export async function updateOrganizationSettingsAction(
  args: UpdateOrganizationSettingsInput,
): Promise<ActionResult<{ id: number; name: string }>> {
  return runAction(() => updateOrganizationSettings(args));
}
