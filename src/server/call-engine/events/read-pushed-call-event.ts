import 'server-only';

import { z } from 'zod';

import {
  callEventSchema,
  pubSubPushSchema,
} from '@/server/call-engine/schemas';
import type { CallEvent, PubSubPush } from '@/server/call-engine/types';
import { addEventFields } from '@/server/common/logging/event-fields';

const parseJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const decodeBase64 = (value: string) =>
  Buffer.from(value, 'base64').toString('utf8');

export const recordInvalidPush = (part: string, error: z.ZodError) =>
  addEventFields({
    validation: { part, message: z.prettifyError(error) },
  });

export const parsePubSubPush = (body: string) =>
  pubSubPushSchema.safeParse(parseJson(body));

export const readPushedCallEvent = (push: PubSubPush): CallEvent | null => {
  const event = callEventSchema.safeParse(
    parseJson(decodeBase64(push.message.data)),
  );
  if (!event.success) {
    recordInvalidPush('event', event.error);
    return null;
  }
  return event.data;
};
