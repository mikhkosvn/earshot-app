import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { MetadataCondition } from '@/server/dashboards/types';

const BOOLEAN_TEXT: Record<string, boolean> = { true: true, false: false };

const jsonCandidates = (value: string): (string | number | boolean)[] => {
  const candidates: (string | number | boolean)[] = [value];
  const number = Number(value);
  if (value.trim() !== '' && Number.isFinite(number)) candidates.push(number);
  const lower = value.trim().toLowerCase();
  if (lower in BOOLEAN_TEXT) candidates.push(BOOLEAN_TEXT[lower]);
  return candidates;
};

export const conversationMetadataWhere = (
  conditions: MetadataCondition[],
): Prisma.ConversationWhereInput[] =>
  conditions.map((condition) => ({
    OR: jsonCandidates(condition.value).map((candidate) => ({
      metadata: { path: [condition.key], equals: candidate },
    })),
  }));
