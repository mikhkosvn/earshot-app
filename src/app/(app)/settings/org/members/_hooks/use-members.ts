'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentOrganizationId } from '../../_hooks/use-current-organization-id';
import { MembersService } from '../_service';

export const useMembers = () => {
  const organizationId = useCurrentOrganizationId();
  const { data } = useSuspenseQuery(
    MembersService.getMembersQuery({ organizationId }),
  );
  return data;
};
