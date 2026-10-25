import { z } from 'zod';

import { TranscriptRole } from '@/server/call-engine/constants';

const turnJsonSchema = z
  .object({
    role: z.enum(TranscriptRole),
    content: z.string(),
    start_time: z.number().nullable().catch(null),
  })
  .transform((turn) => ({
    role: turn.role,
    content: turn.content,
    startTime: turn.start_time,
  }));

const turnsJsonSchema = z.array(turnJsonSchema);

type Turn = z.output<typeof turnJsonSchema>;

const ROLES = Object.values(TranscriptRole);

export const turnsToJson = (turns: readonly Turn[]) =>
  JSON.stringify(
    turns.map((turn) => ({
      role: turn.role,
      content: turn.content,
      start_time: turn.startTime,
    })),
    null,
    2,
  );

const readJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

export const parseTurnsJson = (text: string) => {
  const value = readJson(text);
  if (!Array.isArray(value)) {
    return { turns: null, error: 'Enter a JSON array of messages.' };
  }
  const parsed = turnsJsonSchema.safeParse(value);
  if (!parsed.success) {
    return {
      turns: null,
      error: `Each message needs "role" (${ROLES.join(' or ')}) and "content".`,
    };
  }
  return { turns: parsed.data, error: null };
};
