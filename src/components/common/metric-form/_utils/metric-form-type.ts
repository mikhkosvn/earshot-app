import { MetricFormType } from '@/server/metrics/constants/definition/metric-form-type';

export const isMetricFormType = (value: unknown): value is MetricFormType =>
  Object.values<unknown>(MetricFormType).includes(value);
