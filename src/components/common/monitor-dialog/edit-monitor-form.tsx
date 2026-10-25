'use client';

import { FormProvider } from 'react-hook-form';

import { ConnectionOverridesSection } from './call-settings/connection-overrides-section';
import { useEditMonitorForm } from './_hooks/use-edit-monitor-form';
import { MonitorFormLayout } from './form/monitor-form-layout';
import { MonitorSubmitLabel } from './form/monitor-submit-label';
import { RunSizeSection } from './run-size/run-size-section';
import { WhatToTestSection } from './what-to-test/what-to-test-section';
import { NextTriggerDatesSection } from './when-it-runs/next-trigger-dates-section';
import { WhenItRunsSection } from './when-it-runs/when-it-runs-section';

interface EditMonitorFormProps {
  monitorId: number;
  onSaved: () => void;
}

export function EditMonitorForm({ monitorId, onSaved }: EditMonitorFormProps) {
  const { form, onSubmit } = useEditMonitorForm(monitorId, onSaved);

  return (
    <FormProvider {...form}>
      <MonitorFormLayout
        onSubmit={onSubmit}
        submitLabel={
          <MonitorSubmitLabel idle="Save changes" pending="Saving..." />
        }
      >
        <WhatToTestSection />
        <ConnectionOverridesSection />
        <WhenItRunsSection />
        <NextTriggerDatesSection />
        <RunSizeSection />
      </MonitorFormLayout>
    </FormProvider>
  );
}
