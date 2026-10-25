import 'server-only';

import { randomBytes } from 'node:crypto';

import type { Prisma } from '@/generated/prisma/client';
import { SLUG_SUFFIX_LENGTH } from '@/server/metrics/constants/definition/metric-limits';

const SLUG_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const MAX_SLUG_ATTEMPTS = 10;
const SLUG_BASE_MAX_LENGTH = 60;
const FALLBACK_SLUG_BASE = 'metric';

export const slugBase = (name: string) => {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, SLUG_BASE_MAX_LENGTH)
    .replace(/_+$/g, '');
  if (!base) return FALLBACK_SLUG_BASE;
  return base;
};

const randomSuffix = () =>
  Array.from(
    randomBytes(SLUG_SUFFIX_LENGTH),
    (byte) => SLUG_ALPHABET[byte % SLUG_ALPHABET.length],
  ).join('');

export const uniqueSlug = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  name: string,
) => {
  const base = slugBase(name);
  for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt += 1) {
    const slug = `${base}_${randomSuffix()}`;
    const existing = await tx.metric.findUnique({
      where: { projectId_slug: { projectId, slug } },
      select: { id: true },
    });
    if (!existing) return slug;
  }
  throw new Error('The server did not find a free metric slug.');
};
