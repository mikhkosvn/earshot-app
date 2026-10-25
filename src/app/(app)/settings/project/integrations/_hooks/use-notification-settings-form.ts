'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { notificationSettingsSchema } from '@/server/notification-settings/schemas';
import type { NotificationSettings } from '@/server/notification-settings/types';

import { NotificationSettingsService } from '../_service';
import { useUpdateNotificationSettingsMutation } from './mutations/use-update-notification-settings-mutation';

export const useNotificationSettingsForm = () => {
  const projectId = useCurrentProjectId();
  const { data: settings } = useSuspenseQuery(
    NotificationSettingsService.getSettingsQuery({ projectId }),
  );
  const form = useForm<NotificationSettings>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: settings,
  });
  const updateSettings = useUpdateNotificationSettingsMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateSettings.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The notification settings are saved.');
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
