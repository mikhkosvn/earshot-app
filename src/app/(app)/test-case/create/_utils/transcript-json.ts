import { TranscriptRole } from '@/server/call-engine/constants';

type Turn = {
  role: TranscriptRole;
  content: string;
  startTime: number | null;
};

const ROLES = Object.values(TranscriptRole) as string[];

export const turnsToJson = (turns: Turn[]) =>
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

const numberOrNull = (value: unknown) => {
  if (typeof value !== 'number') return null;
  return value;
};

const toTurn = (item: unknown): Turn | null => {
  if (typeof item !== 'object' || item === null) return null;
  const record = item as Record<string, unknown>;
  if (typeof record.role !== 'string' || !ROLES.includes(record.role)) {
    return null;
  }
  if (typeof record.content !== 'string') return null;
  return {
    role: record.role as TranscriptRole,
    content: record.content,
    startTime: numberOrNull(record.start_time),
  };
};

export const parseTurnsJson = (text: string) => {
  const value = readJson(text);
  if (!Array.isArray(value)) {
    return { turns: null, error: 'Enter a JSON array of messages.' };
  }
  const turns = value.map(toTurn);
  if (turns.some((turn) => turn === null)) {
    return {
      turns: null,
      error: `Each message needs "role" (${ROLES.join(' or ')}) and "content".`,
    };
  }
  return { turns: turns as Turn[], error: null };
};
