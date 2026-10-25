'use client';

import { useIsMutating } from '@tanstack/react-query';

import { OrganizationSettingsService } from '../_service';

export const useIsUpdatingOrganizationSettings = () =>
  useIsMutating({
    mutationKey: OrganizationSettingsService.updateSettingsMutationKey,
  }) > 0;
