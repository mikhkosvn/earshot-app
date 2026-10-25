import { z } from 'zod';

import { CallerNumberMode, Timezone } from '@/generated/prisma/enums';
import { isValidCronExpression } from '@/lib/cron/is-valid-cron-expression';
import { ExecutionMode } from '@/server/monitors/constants/execution-mode';
import {
  AGENT_NUMBER_MAX_LENGTH,
  CALLS_PER_SECOND_MAX,
  CALLS_PER_SECOND_MIN,
  FREQUENCY_MAX,
  FREQUENCY_MIN,
  MONITOR_NAME_MAX_LENGTH,
} from '@/server/monitors/constants/monitor-limits';

const idSchema = z.number().int().positive();

export const monitorProjectScopeSchema = z.object({ projectId: idSchema });

export const listMonitorsSchema = z.object({
  projectId: idSchema,
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).max(100),
});

export const monitorIdSchema = z.object({ monitorId: idSchema });

export const monitorFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter a name for your monitor.')
    .max(
      MONITOR_NAME_MAX_LENGTH,
      `Enter ${MONITOR_NAME_MAX_LENGTH} characters or fewer.`,
    ),
  agentId: z.number({ error: 'Select an agent.' }).int().positive(),
  executionMode: z.enum(ExecutionMode),
  evaluatorIds: z.array(idSchema).min(1, 'Select at least one scenario.'),
  personalityIds: z.array(idSchema),
  cronExpression: z
    .string()
    .trim()
    .refine(isValidCronExpression, 'Enter a valid cron expression.'),
  timezone: z.enum(Timezone),
  frequency: z
    .number({
      error: `Enter a number from ${FREQUENCY_MIN} to ${FREQUENCY_MAX}.`,
    })
    .int('Enter a whole number.')
    .min(
      FREQUENCY_MIN,
      `Enter a number from ${FREQUENCY_MIN} to ${FREQUENCY_MAX}.`,
    )
    .max(
      FREQUENCY_MAX,
      `Enter a number from ${FREQUENCY_MIN} to ${FREQUENCY_MAX}.`,
    ),
  concurrencyLimit: z
    .number()
    .int('Enter a whole number.')
    .min(1, 'Enter 1 or a larger number.')
    .nullable(),
  callsPerSecond: z
    .number()
    .min(
      CALLS_PER_SECOND_MIN,
      `Enter a number from ${CALLS_PER_SECOND_MIN} to ${CALLS_PER_SECOND_MAX}.`,
    )
    .max(
      CALLS_PER_SECOND_MAX,
      `Enter a number from ${CALLS_PER_SECOND_MIN} to ${CALLS_PER_SECOND_MAX}.`,
    )
    .nullable(),
  callerNumberMode: z.enum(CallerNumberMode),
  agentNumber: z
    .string()
    .trim()
    .max(AGENT_NUMBER_MAX_LENGTH, 'Enter a valid phone number.')
    .nullable(),
});

export const createMonitorSchema = monitorFieldsSchema.extend({
  projectId: idSchema,
});

export const updateMonitorSchema = monitorFieldsSchema.extend({
  monitorId: idSchema,
});

export const setMonitorActiveSchema = z.object({
  monitorId: idSchema,
  isActive: z.boolean(),
});
