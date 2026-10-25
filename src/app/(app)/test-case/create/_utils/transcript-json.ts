import { TranscriptRole } from '@/server/call-engine/constants';

interface Turn {
  role: TranscriptRole;
  content: string;
  startTime: number | null;
}

const ROLES = Object.values(TranscriptRole);

const isTranscriptRole = (value: unknown): value is TranscriptRole =>
  ROLES.some((role) => role === value);

const isTurn = (turn: Turn | null): turn is Turn => turn !== null;

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

const numberOrNull = (value: unknown) => {
  if (typeof value !== 'number') return null;
  return value;
};

const startTimeOf = (item: object) => {
  if (!('start_time' in item)) return null;
  return numberOrNull(item.start_time);
};

const toTurn = (item: unknown): Turn | null => {
  if (typeof item !== 'object' || item === null) return null;
  if (!('role' in item) || !isTranscriptRole(item.role)) return null;
  if (!('content' in item) || typeof item.content !== 'string') return null;
  return {
    role: item.role,
    content: item.content,
    startTime: startTimeOf(item),
  };
};

export const parseTurnsJson = (text: string) => {
  const value = readJson(text);
  if (!Array.isArray(value)) {
    return { turns: null, error: 'Enter a JSON array of messages.' };
  }
  const parsed = value.map(toTurn);
  const turns = parsed.filter(isTurn);
  if (turns.length !== parsed.length) {
    return {
      turns: null,
      error: `Each message needs "role" (${ROLES.join(' or ')}) and "content".`,
    };
  }
  return { turns, error: null };
};
