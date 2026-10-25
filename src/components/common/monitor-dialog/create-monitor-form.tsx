'use client';

import { FormProvider } from 'react-hook-form';

import { ConnectionOverridesSection } from './call-settings/connection-overrides-section';
import { useCreateMonitorForm } from './_hooks/use-create-monitor-form';
import type { CreateMonitorPrefill } from './_utils/form/monitor-form-defaults';
import { MonitorFormLayout } from './form/monitor-form-layout';
import { MonitorSubmitLabel } from './form/monitor-submit-label';
import { RunSizeSection } from './run-size/run-size-section';
import { WhatToTestSection } from './what-to-test/what-to-test-section';
import { WhenItRunsSection } from './when-it-runs/when-it-runs-section';

type CreateMonitorFormProps = {
  prefill: CreateMonitorPrefill;
  onCreated: () => void;
};

export function CreateMonitorForm({
  prefill,
  onCreated,
}: CreateMonitorFormProps) {
  const { form, onSubmit } = useCreateMonitorForm(prefill, onCreated);

  return (
    <FormProvider {...form}>
      <MonitorFormLayout
        onSubmit={onSubmit}
        submitLabel={
          <MonitorSubmitLabel idle="Create monitor" pending="Creating..." />
        }
      >
        <WhatToTestSection />
        <ConnectionOverridesSection />
        <WhenItRunsSection />
        <RunSizeSection />
      </MonitorFormLayout>
    </FormProvider>
  );
}
