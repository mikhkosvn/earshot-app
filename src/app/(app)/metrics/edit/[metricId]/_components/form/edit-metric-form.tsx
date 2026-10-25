'use client';

import { FormProvider } from 'react-hook-form';

import { AddToNewAgentsField } from '@/components/common/metric-form/add-to-new-agents-field';
import { MetricBodyFields } from '@/components/common/metric-form/body/metric-body-fields';
import { EnumValuesField } from '@/components/common/metric-form/enum-values/enum-values-field';
import { MetricEvalTypeField } from '@/components/common/metric-form/eval-type/metric-eval-type-field';
import { MetricIdentityFields } from '@/components/common/metric-form/identity/metric-identity-fields';
import { MetricTypeSwitch } from '@/components/common/metric-form/identity/metric-type-switch';
import { EvaluationTriggerField } from '@/components/common/metric-form/trigger/evaluation-trigger-field';

import { useEditMetricForm } from '../../_hooks/use-edit-metric-form';
import { ConfigurationFields } from './configuration-fields';
import { EditDependencyField } from './edit-dependency-field';
import { PredefinedLockNote } from './predefined-lock-note';
import { UpdateMetricButton } from './update-metric-button';

export function EditMetricForm() {
  const { form, onSubmit } = useEditMetricForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <PredefinedLockNote />
        <div className="rounded-lg border bg-background">
          <MetricTypeSwitch />
          <div className="flex flex-col gap-5 p-4">
            <MetricIdentityFields />
            <MetricEvalTypeField />
            <EnumValuesField />
            <MetricBodyFields />
            <ConfigurationFields />
            <EditDependencyField />
            <EvaluationTriggerField />
            <AddToNewAgentsField />
          </div>
        </div>
        <UpdateMetricButton />
      </form>
    </FormProvider>
  );
}
