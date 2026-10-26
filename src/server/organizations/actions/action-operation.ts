export const OrganizationsActionOperation = {
  listOrganizations: 'organizations.list_organizations',
  switchOrganization: 'organizations.switch_organization',
} as const;

export type OrganizationsActionOperation =
  (typeof OrganizationsActionOperation)[keyof typeof OrganizationsActionOperation];
