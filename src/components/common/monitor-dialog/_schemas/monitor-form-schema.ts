import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { monitorFieldsSchema } from '@/server/monitors/schemas';

import { ScheduleMode } from '../_constants/schedule-mode';

export const monitorFormSchema = monitorFieldsSchema.extend({
  agentId: z
    .number()
    .int()
    .positive()
    .nullable()
    .refine((value) => value !== null, 'Select an agent.'),
  scheduleMode: z.enum(ScheduleMode),
  autoName: z.boolean(),
});

export type MonitorFormValues = z.input<typeof monitorFormSchema>;

export type MonitorFormOutput = z.output<typeof monitorFormSchema>;

export type MonitorForm = UseFormReturn<
  MonitorFormValues,
  unknown,
  MonitorFormOutput
>;
