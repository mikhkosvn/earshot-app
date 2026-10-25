import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

interface ClaimRowsArgs<TId extends number | string> {
  table: string;
  where: Prisma.Sql;
  orderBy?: Prisma.Sql;
  limit: number;
  claim: (tx: Prisma.TransactionClient, ids: TId[]) => Promise<void>;
}

const TABLE_NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;

export const claimRows = async <TId extends number | string>({
  table,
  where,
  orderBy,
  limit,
  claim,
}: ClaimRowsArgs<TId>): Promise<TId[]> => {
  if (!TABLE_NAME_PATTERN.test(table)) {
    throw new Error(`The table name "${table}" is not valid.`);
  }
  const order = orderBy ?? Prisma.sql`"id"`;
  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<{ id: TId }[]>`
      SELECT "id" FROM ${Prisma.raw(`"${table}"`)}
      WHERE ${where}
      ORDER BY ${order}
      LIMIT ${limit}
      FOR UPDATE SKIP LOCKED
    `;
    const ids = rows.map((row) => row.id);
    if (ids.length === 0) return ids;
    await claim(tx, ids);
    return ids;
  });
};
