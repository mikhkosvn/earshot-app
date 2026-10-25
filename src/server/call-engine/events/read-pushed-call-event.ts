import 'server-only';

import { z } from 'zod';

import {
  callEventSchema,
  pubSubPushSchema,
} from '@/server/call-engine/schemas';
import type { CallEvent } from '@/server/call-engine/types';

const parseJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const decodeBase64 = (value: string) =>
  Buffer.from(value, 'base64').toString('utf8');

const warnInvalid = (part: string, error: z.ZodError) =>
  console.warn(
    `[call-engine] The pushed ${part} is not valid.\n${z.prettifyError(error)}`,
  );

export const readPushedCallEvent = (body: string): CallEvent | null => {
  const push = pubSubPushSchema.safeParse(parseJson(body));
  if (!push.success) {
    warnInvalid('message', push.error);
    return null;
  }
  const event = callEventSchema.safeParse(
    parseJson(decodeBase64(push.data.message.data)),
  );
  if (!event.success) {
    warnInvalid(`event ${push.data.message.messageId}`, event.error);
    return null;
  }
  return event.data;
};
