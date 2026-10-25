'use client';

import { MailIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { NotificationSettings } from '@/server/notification-settings/types';

import { useIsEmailEnabled } from '../../_hooks/use-is-email-enabled';
import { EmailNotificationsStatus } from './email-notifications-status';
import { EmailNotificationsToggleLabel } from './email-notifications-toggle-label';

export function EmailNotificationsCard() {
  const { setValue } = useFormContext<NotificationSettings>();
  const isEmailEnabled = useIsEmailEnabled();

  return (
    <section className="flex flex-col gap-3 rounded-lg border bg-background p-4">
      <div className="flex items-center gap-2">
        <MailIcon className="size-6" />
        <h2 className="text-lg font-semibold">Email Notifications</h2>
        <EmailNotificationsStatus />
      </div>
      <p className="text-sm text-muted-foreground">
        Manage your email notification preferences for your organization
      </p>
      <Button
        type="button"
        className="mt-auto"
        aria-pressed={isEmailEnabled}
        onClick={() =>
          setValue('emailNotificationsEnabled', !isEmailEnabled, {
            shouldDirty: true,
          })
        }
      >
        <EmailNotificationsToggleLabel />
        <SlidersHorizontalIcon />
      </Button>
    </section>
  );
}
