import { z } from 'zod';

import {
  CALL_REF_SEPARATOR,
  CallEndedReason,
  CallEventType,
  CallRefKind,
  RECORDING_URL_PROTOCOL,
  TranscriptRole,
} from '@/server/call-engine/constants';

const RUN_ID_PATTERN = /^[1-9]\d*$/;

const splitCallRef = (value: string) => {
  const separator = value.indexOf(CALL_REF_SEPARATOR);
  if (separator < 0) return { kind: value, id: '' };
  return { kind: value.slice(0, separator), id: value.slice(separator + 1) };
};

const callRefPartsSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal(CallRefKind.run),
    id: z.string().regex(RUN_ID_PATTERN).transform(Number),
  }),
  z.object({
    kind: z.literal(CallRefKind.test_call),
    id: z.uuid(),
  }),
]);

export const callRefSchema = z
  .string()
  .transform(splitCallRef)
  .pipe(callRefPartsSchema);

const transcriptTurnSchema = z.object({
  role: z.enum(TranscriptRole),
  content: z.string(),
  start_time: z.number().nonnegative(),
  end_time: z.number().nonnegative(),
});

export const endOfCallEventSchema = z.object({
  type: z.literal(CallEventType.end_of_call),
  call_ref: callRefSchema,
  provider_call_id: z.string().min(1),
  ended_reason: z.enum(CallEndedReason),
  started_at: z.iso.datetime({ offset: true }),
  ended_at: z.iso.datetime({ offset: true }),
  ringing_seconds: z.number().nonnegative().nullable(),
  transcript: z.array(transcriptTurnSchema),
  recording_url: z.url({ protocol: RECORDING_URL_PROTOCOL }).nullable(),
  provider_call_data: z.record(z.string(), z.json()),
});

export const callEventSchema = z.discriminatedUnion('type', [
  endOfCallEventSchema,
]);

export const pubSubPushSchema = z.object({
  message: z.object({
    data: z.base64(),
    messageId: z.string(),
    publishTime: z.iso.datetime({ offset: true }),
    attributes: z.record(z.string(), z.string()).optional(),
  }),
  subscription: z.string(),
  deliveryAttempt: z.number().int().optional(),
});

export const startCallResponseSchema = z.object({
  provider_call_id: z.string().min(1),
});
