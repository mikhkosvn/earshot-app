'use client';

import { useFormContext } from 'react-hook-form';

import type {
  MonitorFormOutput,
  MonitorFormValues,
} from '../_schemas/monitor-form-schema';

export const useMonitorFormContext = () =>
  useFormContext<MonitorFormValues, unknown, MonitorFormOutput>();
