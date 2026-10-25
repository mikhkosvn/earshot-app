'use client';

import { MemberRole } from '@/generated/prisma/enums';

import { useOrganizationSettings } from '../../_hooks/use-organization-settings';

export const useIsOrganizationAdmin = () => {
  const settings = useOrganizationSettings();
  return settings.role === MemberRole.admin;
};
