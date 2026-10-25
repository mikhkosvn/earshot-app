'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentOrganizationId } from '../../_hooks/use-current-organization-id';
import { TelephonyService } from '../_service';

export const usePhoneNumbers = () => {
  const organizationId = useCurrentOrganizationId();
  const { data } = useSuspenseQuery(
    TelephonyService.getPhoneNumbersQuery({ organizationId }),
  );
  return data;
};
