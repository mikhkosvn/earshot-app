'use client';

import { FormProvider } from 'react-hook-form';

import { AddToNewAgentsField } from '@/components/common/metric-form/add-to-new-agents-field';
import { MetricBodyFields } from '@/components/common/metric-form/body/metric-body-fields';
import { DependencyField } from '@/components/common/metric-form/dependencies/dependency-field';
import { EnumValuesField } from '@/components/common/metric-form/enum-values/enum-values-field';
import { MetricEvalTypeField } from '@/components/common/metric-form/eval-type/metric-eval-type-field';
import { MetricIdentityFields } from '@/components/common/metric-form/identity/metric-identity-fields';
import { MetricTypeSwitch } from '@/components/common/metric-form/identity/metric-type-switch';
import { EvaluationTriggerField } from '@/components/common/metric-form/trigger/evaluation-trigger-field';

import { useCreateMetricForm } from '../../_hooks/use-create-metric-form';
import { AddToRubricField } from './add-to-rubric-field';
import { ApplyAgentsCard } from './agents/apply-agents-card';
import { CreateMetricSubmitButton } from './create-metric-submit-button';
import { ApplyScenariosCard } from './scenarios/apply-scenarios-card';

export function DetailModeForm() {
  const { form, onSubmit } = useCreateMetricForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <div className="rounded-lg border bg-background">
          <MetricTypeSwitch />
          <div className="flex flex-col gap-5 p-4">
            <MetricIdentityFields />
            <MetricEvalTypeField />
            <AddToRubricField />
            <EnumValuesField />
            <MetricBodyFields />
            <DependencyField />
            <EvaluationTriggerField />
            <ApplyScenariosCard />
            <ApplyAgentsCard />
            <AddToNewAgentsField />
          </div>
        </div>
        <CreateMetricSubmitButton />
      </form>
    </FormProvider>
  );
}
