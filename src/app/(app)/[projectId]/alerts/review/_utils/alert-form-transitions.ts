import type { UseFormReturn } from 'react-hook-form';

import type { AlertType } from '@/generated/prisma/enums';
import { DEFAULT_ALERT_TYPE } from '@/server/alerts/constants/alert-type-options';
import type {
  AlertMetricOption,
  CreateAlertInput,
} from '@/server/alerts/types';

import { alertNameOf, defaultParamsOf } from './alert-params';

const SET_OPTIONS = { shouldDirty: true, shouldValidate: false };

export const selectAlertMetric = (
  form: UseFormReturn<CreateAlertInput>,
  metric: AlertMetricOption,
) => {
  const type = DEFAULT_ALERT_TYPE[metric.evalType];
  form.setValue('metricId', metric.id, {
    ...SET_OPTIONS,
    shouldValidate: true,
  });
  form.setValue('params', defaultParamsOf(type), SET_OPTIONS);
  form.setValue('name', alertNameOf(metric.name, type), SET_OPTIONS);
};

export const changeAlertType = (
  form: UseFormReturn<CreateAlertInput>,
  metric: AlertMetricOption,
  type: AlertType,
) => {
  form.setValue('params', defaultParamsOf(type), SET_OPTIONS);
  form.setValue('name', alertNameOf(metric.name, type), SET_OPTIONS);
};
