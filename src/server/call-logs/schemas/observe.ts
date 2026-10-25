import { z } from 'zod';

import {
  CALL_ID_MAX_LENGTH,
  CALL_TEXT_MAX_LENGTH,
} from '@/server/call-logs/constants/call-log-limits';
import {
  OBSERVE_ROLE_MAP,
  ObserveTranscriptType,
} from '@/server/call-logs/constants/observe-roles';
import { filterGroupSchema } from '@/server/call-logs/schemas/filters';

const roleKey = (role: string) => role.trim().toLowerCase();

const observeTurnSchema = z.object({
  role: z
    .string()
    .refine(
      (role) => roleKey(role) in OBSERVE_ROLE_MAP,
      'Use the role "user" or "assistant".',
    )
    .transform((role) => OBSERVE_ROLE_MAP[roleKey(role)]),
  content: z.string(),
  start_time: z.number().nonnegative().nullish(),
  end_time: z.number().nonnegative().nullish(),
});

const jsonObjectSchema = z.record(z.string(), z.json());

const emptyToNull = (value: unknown) => {
  if (value === '') return null;
  return value;
};

export const observeCallSchema = z
  .object({
    agent: z.coerce.number().int().positive('Send the ID of an agent.'),
    call_id: z.string().trim().min(1).max(CALL_ID_MAX_LENGTH),
    voice_recording_url: z.preprocess(
      emptyToNull,
      z.url({ protocol: /^https?$/ }).nullish(),
    ),
    transcript_type: z
      .enum(ObserveTranscriptType)
      .default(ObserveTranscriptType.custom),
    transcript_json: z.array(observeTurnSchema).default([]),
    call_ended_reason: z.string().trim().max(CALL_TEXT_MAX_LENGTH).default(''),
    customer_number: z.string().trim().max(CALL_TEXT_MAX_LENGTH).default(''),
    timestamp: z.iso.datetime({ offset: true }).optional(),
    metadata: jsonObjectSchema.default({}),
    dynamic_variables: jsonObjectSchema.default({}),
  })
  .refine(
    (body) => body.voice_recording_url || body.transcript_json.length > 0,
    {
      error: 'Send a transcript_json or a voice_recording_url.',
      path: ['transcript_json'],
    },
  );

export const publicCallLogListQuerySchema = z.object({
  project_id: z.coerce.number().int().positive().optional(),
  agent: z.coerce.number().int().positive().optional(),
  filters_v2: z
    .string()
    .optional()
    .transform((value, context) => {
      if (!value) return null;
      try {
        return filterGroupSchema.parse(JSON.parse(value));
      } catch {
        context.addIssue({
          code: 'custom',
          message: 'Send filters_v2 as a JSON filter group.',
        });
        return z.NEVER;
      }
    }),
});
