'use client';

import { FormProvider } from 'react-hook-form';

import { SettingSwitchField } from '@/app/(app)/settings/_components/fields/setting-switch-field';
import { SettingTextField } from '@/app/(app)/settings/_components/fields/setting-text-field';
import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';
import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsSaveButton } from '@/app/(app)/settings/_components/settings-save-button';
import { Separator } from '@/components/ui/separator';

import {
  CALL_LOG_NOTIFICATION_ROWS,
  DAILY_REPORT_NOTIFICATION_ROW,
  RESULT_NOTIFICATION_GROUPS,
} from '../_constants/webhook-notification-groups';
import { useIsSavingWebhook } from '../_hooks/use-is-saving-webhook';
import { useWebhookForm } from '../_hooks/use-webhook-form';
import type { WebhookFormValues } from '../_schemas/webhook-form-schema';
import { NotificationGroup } from './notifications/notification-group';
import { WebhookNotificationRow } from './notifications/webhook-notification-row';
import { RedactSensitiveDataField } from './redaction/redact-sensitive-data-field';
import { WebhookSecretField } from './webhook-secret-field';

export function WebhookForm() {
  const { form, onSubmit } = useWebhookForm();
  const isSaving = useIsSavingWebhook();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <SettingsHeaderCard
          title="Webhook Settings"
          description="Configure webhook endpoints for your project."
        >
          <SettingsSaveButton isSaving={isSaving} />
        </SettingsHeaderCard>
        <SettingsCard className="gap-5">
          <SettingTextField<WebhookFormValues>
            name="url"
            label="Webhook URL"
            description="The URL where webhook notifications will be sent"
            type="url"
            autoComplete="url"
          />
          <WebhookSecretField />
          <Separator />
          <h2 className="text-lg font-semibold">Webhook Notifications</h2>
          {RESULT_NOTIFICATION_GROUPS.map((group) => (
            <NotificationGroup key={group.title} title={group.title}>
              {group.rows.map((row) => (
                <WebhookNotificationRow key={row.notification} row={row} />
              ))}
            </NotificationGroup>
          ))}
          <NotificationGroup title="Call Log Evaluation Notifications">
            {CALL_LOG_NOTIFICATION_ROWS.map((row) => (
              <WebhookNotificationRow key={row.notification} row={row} />
            ))}
            <SettingSwitchField<WebhookFormValues>
              name="skipCallsWithoutContent"
              label="Skip Calls Without Content"
              description="Don't send webhook notifications for calls with no conversation, such as busy or unanswered calls"
            />
            <RedactSensitiveDataField />
          </NotificationGroup>
          <NotificationGroup title="Project Notifications">
            <WebhookNotificationRow row={DAILY_REPORT_NOTIFICATION_ROW} />
          </NotificationGroup>
          <NotificationGroup title="Webhook Forwarding">
            <SettingSwitchField<WebhookFormValues>
              name="forwardVapiWebhooks"
              label="Forward VAPI Webhooks"
              description="Forward webhook notifications from VAPI to your webhook URL"
            />
            <SettingSwitchField<WebhookFormValues>
              name="forwardRetellWebhooks"
              label="Forward Retell Webhooks"
              description="Forward webhook notifications from Retell to your webhook URL"
            />
          </NotificationGroup>
        </SettingsCard>
      </form>
    </FormProvider>
  );
}
