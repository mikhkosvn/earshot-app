import { queryOptions } from '@tanstack/react-query';

import { getOrganizationSettingsAction } from '@/server/organization-settings/actions';

export const OrganizationSettingsKey = {
  settings: 'organization-settings',
  update: 'update-organization-settings',
} as const;

export type OrganizationSettingsKey =
  (typeof OrganizationSettingsKey)[keyof typeof OrganizationSettingsKey];

export class OrganizationSettingsService {
  static readonly updateSettingsMutationKey = [OrganizationSettingsKey.update];

  static getSettingsQuery(args: { organizationId: number }) {
    return queryOptions({
      queryKey: [OrganizationSettingsKey.settings, args],
      queryFn: () => getOrganizationSettingsAction(args),
    });
  }
}
