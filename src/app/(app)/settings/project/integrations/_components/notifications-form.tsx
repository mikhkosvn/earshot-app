'use client';

import { FormProvider } from 'react-hook-form';

import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsSaveButton } from '@/app/(app)/settings/_components/settings-save-button';

import { useIsSavingNotificationSettings } from '../_hooks/use-is-saving-notification-settings';
import { useNotificationSettingsForm } from '../_hooks/use-notification-settings-form';
import { AlertGroupCard } from './alert-group-card';
import { EmailNotificationsCard } from './email-card/email-notifications-card';
import { IntegrationWarning } from './integration-warning';
import { NotificationSwitchField } from './notification-switch-field';

export function NotificationsForm() {
  const { form, onSubmit } = useNotificationSettingsForm();
  const isSaving = useIsSavingNotificationSettings();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <SettingsHeaderCard
          title="Notifications"
          description="Connect your tools and configure notification preferences"
        >
          <SettingsSaveButton isSaving={isSaving} />
        </SettingsHeaderCard>
        <div className="grid gap-3 md:grid-cols-3">
          <EmailNotificationsCard />
        </div>
        <IntegrationWarning />
        <AlertGroupCard
          title="Simulation Alerts"
          description="Configure notifications related to simulation testing and evaluation results"
        >
          <NotificationSwitchField
            name="notifyMonitorFailure"
            label="Monitor Failures"
            description="Get notified when a monitor run fails"
          />
          <NotificationSwitchField
            name="notifyMonitorSuccess"
            label="Monitor Success"
            description="Get notified when a monitor run completes successfully"
          />
          <NotificationSwitchField
            name="notifyResultsCompletion"
            label="Results Completion"
            description="Get notified when evaluation results are completed"
          />
        </AlertGroupCard>
        <AlertGroupCard
          title="Observability Alerts"
          description="Configure notifications related to system monitoring and operational health"
        >
          <NotificationSwitchField
            name="notifyDailyReport"
            label="Daily Report"
            description="Receive daily summary reports of system activity"
          />
          <NotificationSwitchField
            name="notifyDailyReportNoCalls"
            label="Daily Report (No Calls)"
            description="Receive a daily report when no calls were received"
          />
          <NotificationSwitchField
            name="dailyReportAiSummaryEnabled"
            label="AI Summary in Daily Report"
            description="Extend the daily data report in email with AI Insights."
          />
          <NotificationSwitchField
            name="notifyNoCalls"
            label="No Calls Alert"
            description="Get notified when there are no calls received during specified time periods"
          />
          <NotificationSwitchField
            name="notifyFrequentCalls"
            label="Frequent Calls for Number"
            description="Get notified when a specific number receives frequent calls"
          />
        </AlertGroupCard>
      </form>
    </FormProvider>
  );
}
