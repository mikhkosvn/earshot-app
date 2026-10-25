'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentOrganizationId } from '../../_hooks/use-current-organization-id';
import { ApiKeyService } from '../_service';

export const useApiKeys = () => {
  const organizationId = useCurrentOrganizationId();
  const { data } = useSuspenseQuery(
    ApiKeyService.getApiKeysQuery({ organizationId }),
  );
  return data;
};
