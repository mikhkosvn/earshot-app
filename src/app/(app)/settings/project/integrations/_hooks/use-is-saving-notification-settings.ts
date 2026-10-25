'use client';

import { useIsMutating } from '@tanstack/react-query';

import { NotificationSettingsService } from '../_service';

export const useIsSavingNotificationSettings = () =>
  useIsMutating({
    mutationKey: NotificationSettingsService.updateSettingsMutationKey,
  }) > 0;
