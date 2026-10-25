import { z } from 'zod';

import { CallEvaluationStatus } from '@/generated/prisma/enums';
import { isTimeExpression } from '@/lib/time-range/parse-time-expression';
import {
  CALL_FEEDBACK_MAX_LENGTH,
  CALL_LIST_PAGE_SIZE_MAX,
  CALL_SEARCH_MAX_LENGTH,
  CALL_UPLOAD_MAX_FILES,
  CALL_UPLOAD_MAX_TOTAL_BYTES,
} from '@/server/call-logs/constants/call-log-limits';
import { callUploadFormatOf } from '@/server/call-logs/constants/call-upload-format';
import { filterNodeListSchema } from '@/server/call-logs/schemas/filters';
import { folderPathSchema } from '@/server/folders/schemas';

const idSchema = z.number().int().positive();

const timeExpressionSchema = z
  .string()
  .trim()
  .refine(
    isTimeExpression,
    'Enter a time such as now-30d or 2026-10-01 00:00:00.',
  );

const storedNumberSchema = z.number().nullable().catch(null);

export const metricExtraSchema = z
  .object({
    first_turn: storedNumberSchema,
    percentiles: z
      .object({ p50: storedNumberSchema, p99: storedNumberSchema })
      .catch({ p50: null, p99: null }),
  })
  .catch({ first_turn: null, percentiles: { p50: null, p99: null } });

export const projectScopeSchema = z.object({ projectId: idSchema });

export const callLogIdSchema = z.object({ callLogId: idSchema });

export const listCallLogsSchema = z.object({
  projectId: idSchema,
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(CALL_LIST_PAGE_SIZE_MAX),
  from: timeExpressionSchema,
  to: timeExpressionSchema,
  conditions: filterNodeListSchema,
  search: z.string().trim().max(CALL_SEARCH_MAX_LENGTH),
  viewId: idSchema.nullable(),
});

export const callLogListScopeSchema = listCallLogsSchema.omit({
  page: true,
  pageSize: true,
});

export const uploadCallLogsSchema = z.object({
  projectId: idSchema,
  agentId: z
    .number({ error: 'Select an agent.' })
    .int()
    .positive('Select an agent.'),
  files: z
    .array(z.instanceof(File))
    .min(1, 'Add at least one recording file.')
    .max(CALL_UPLOAD_MAX_FILES, `Add at most ${CALL_UPLOAD_MAX_FILES} files.`)
    .refine(
      (files) => files.every((file) => callUploadFormatOf(file.name)),
      'Use MP3, MP4, WAV, or OGG files.',
    )
    .refine(
      (files) =>
        files.reduce((total, file) => total + file.size, 0) <=
        CALL_UPLOAD_MAX_TOTAL_BYTES,
      'The files must be 500MB or smaller in total.',
    ),
});

export const reviewStatusSchema = z.enum([
  CallEvaluationStatus.reviewed_success,
  CallEvaluationStatus.reviewed_failure,
]);

export const updateCallReviewSchema = z.object({
  callLogId: idSchema,
  evaluationStatus: reviewStatusSchema,
});

export const updateCallFeedbackSchema = z.object({
  callLogId: idSchema,
  feedback: z
    .string()
    .trim()
    .max(
      CALL_FEEDBACK_MAX_LENGTH,
      `The feedback must be ${CALL_FEEDBACK_MAX_LENGTH} characters or fewer.`,
    ),
});

export const callLogIdsSchema = z.object({
  projectId: idSchema,
  callLogIds: z.array(idSchema).min(1, 'Select at least one call.').max(100),
});

export const evaluatorsFromCallsSchema = callLogIdsSchema.extend({
  folderPath: folderPathSchema,
  consent: z.literal(
    true,
    'Confirm that you have the rights to use these calls.',
  ),
});
