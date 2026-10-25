'use client';

import { useSelectedAlertMetric } from '../../_hooks/forms/use-selected-alert-metric';
import { AlertNameField } from '../params/alert-name-field';
import { AlertParamsFields } from '../params/alert-params-fields';
import { AlertTypeField } from './alert-type-field';

export function NewAlertDetails() {
  const metric = useSelectedAlertMetric();

  if (!metric) return null;
  return (
    <>
      <AlertNameField placeholder={metric.name} />
      <AlertTypeField metric={metric} />
      <AlertParamsFields />
    </>
  );
}
