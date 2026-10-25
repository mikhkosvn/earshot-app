'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { OrganizationSettingsService } from '../_service';
import { useCurrentOrganizationId } from './use-current-organization-id';

export const useOrganizationSettings = () => {
  const organizationId = useCurrentOrganizationId();
  const { data } = useSuspenseQuery(
    OrganizationSettingsService.getSettingsQuery({ organizationId }),
  );
  return data;
};
