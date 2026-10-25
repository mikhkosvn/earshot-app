'use client';

import { useWatch } from 'react-hook-form';

import type { NotificationSettings } from '@/server/notification-settings/types';

export const useIsEmailEnabled = () =>
  useWatch<NotificationSettings, 'emailNotificationsEnabled'>({
    name: 'emailNotificationsEnabled',
  });
