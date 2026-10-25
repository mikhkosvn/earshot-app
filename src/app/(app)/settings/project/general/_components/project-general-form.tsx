'use client';

import { FormProvider } from 'react-hook-form';

import { useIsUpdatingProject } from '@/app/(app)/_hooks/use-is-updating-project';
import { SettingNumberField } from '@/app/(app)/settings/_components/fields/setting-number-field';
import { SettingSwitchField } from '@/app/(app)/settings/_components/fields/setting-switch-field';
import { SettingTextField } from '@/app/(app)/settings/_components/fields/setting-text-field';
import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsSaveButton } from '@/app/(app)/settings/_components/settings-save-button';
import type { ProjectSettingsValues } from '@/server/projects/types';

import { useProjectGeneralForm } from '../_hooks/use-project-general-form';
import { EndCallWarning } from './end-call-warning';
import { SettingsGroup } from './settings-group';
import { TimezoneField } from './timezone-field';

const PERCENT_SCALE = 100;

export function ProjectGeneralForm() {
  const { form, onSubmit } = useProjectGeneralForm();
  const isSaving = useIsUpdatingProject();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <SettingsHeaderCard
          title="General Settings"
          description="Configure general project settings"
        >
          <SettingsSaveButton isSaving={isSaving} />
        </SettingsHeaderCard>
        <div className="flex flex-col gap-5 rounded-lg border bg-background p-4">
          <SettingsGroup title="Project">
            <div className="grid gap-4 md:grid-cols-2">
              <SettingTextField<ProjectSettingsValues>
                name="name"
                label="Project Name"
              />
              <TimezoneField />
            </div>
          </SettingsGroup>
          <SettingsGroup title="Call & Run Limits">
            <div className="grid gap-4 md:grid-cols-2">
              <SettingNumberField<ProjectSettingsValues>
                name="outboundTimeout"
                label="Outbound Dial Window"
                description="How long Earshot waits for your agent to dial the provisioned outbound number after a run is triggered (seconds)."
              />
              <SettingNumberField<ProjectSettingsValues>
                name="maxCallDuration"
                label="Max Call Duration"
                description="Sets the maximum duration of a call in seconds"
              />
              <SettingNumberField<ProjectSettingsValues>
                name="minCallDuration"
                label="Min Call Duration"
                description="If call duration (in seconds) is below this minimum duration, metrics won't be computed"
              />
            </div>
          </SettingsGroup>
          <SettingsGroup title="Evaluation">
            <div className="grid gap-4 md:grid-cols-2">
              <SettingNumberField<ProjectSettingsValues>
                name="sampleRate"
                label="Metric Sampling Rate (%)"
                description="Percentage of calls to evaluate (0-100). For example, 50 means 50% of calls, 0.1 means 0.1% of calls"
                scale={PERCENT_SCALE}
                step="any"
              />
            </div>
            <SettingSwitchField<ProjectSettingsValues>
              name="endCallEnabled"
              label="End call for evaluators"
              description="Enable or disable the end call for evaluators"
            />
            <EndCallWarning />
            <SettingSwitchField<ProjectSettingsValues>
              name="useProviderTranscript"
              label="Use Provider Transcript"
              description="Use the transcript provided by the voice provider instead of generating one"
            />
            <SettingSwitchField<ProjectSettingsValues>
              name="reconcileProviderTranscripts"
              label="Reconcile Provider Transcripts with Earshot"
              description="For observability calls that arrive with both a recording and a provider transcript, Earshot transcribes the recording and, for dual-channel audio, publishes its own transcript before metrics run. Mono audio keeps the provider transcript."
            />
          </SettingsGroup>
          <SettingsGroup title="Insights">
            <SettingSwitchField<ProjectSettingsValues>
              name="deepResearchEnabled"
              label="Deep Research"
              description="Audit recent calls for failure modes beyond your metrics. Adds a Deep Research section on Insights with a weekly report and on-demand runs."
            />
          </SettingsGroup>
          <SettingsGroup title="Notifications">
            <SettingSwitchField<ProjectSettingsValues>
              name="notifyDailyReport"
              label="Daily Report"
              description="Receive daily summary reports of system activity"
            />
          </SettingsGroup>
        </div>
      </form>
    </FormProvider>
  );
}
