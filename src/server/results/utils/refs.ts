import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { DELETED_EVALUATOR_NAME } from '@/server/results/constants/result-list';
import type { AgentRef, NamedRef } from '@/server/results/types';

export const versionLabel = (version: { version: number } | null) => {
  if (!version) return null;
  return `v${version.version}`;
};

export const toAgentRef = (
  agent: NamedRef | null,
  version: { version: number } | null,
): AgentRef | null => {
  if (!agent) return null;
  return { id: agent.id, name: agent.name, versionLabel: versionLabel(version) };
};

export const toNamedRef = (value: NamedRef | null): NamedRef | null => {
  if (!value) return null;
  return { id: value.id, name: value.name };
};

const snapshotName = (snapshot: Prisma.JsonValue) => {
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) {
    return null;
  }
  const name = (snapshot as Record<string, unknown>).name;
  if (typeof name === 'string') return name;
  return null;
};

export const evaluatorRefOf = (
  evaluator: NamedRef | null,
  snapshot: Prisma.JsonValue,
) => {
  if (evaluator) return { id: evaluator.id, name: evaluator.name };
  return { id: null, name: snapshotName(snapshot) ?? DELETED_EVALUATOR_NAME };
};

export const runStartOf = (run: {
  executedAt: Date | null;
  createdAt: Date;
  conversation: { startedAt: Date | null };
}) => run.conversation.startedAt ?? run.executedAt ?? run.createdAt;
