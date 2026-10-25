export const OrganizationSettingsActionOperation = {
  getOrganizationSettings: 'organization_settings.get_organization_settings',
  updateOrganizationSettings:
    'organization_settings.update_organization_settings',
} as const;

export type OrganizationSettingsActionOperation =
  (typeof OrganizationSettingsActionOperation)[keyof typeof OrganizationSettingsActionOperation];
