import 'server-only';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/generated/prisma/client';
import { RetryingPgPool } from '@/lib/retrying-pg-pool';
import { SerialPgClient } from '@/lib/serial-pg-client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const pool = new RetryingPgPool({
    connectionString: process.env.DATABASE_URL,
    Client: SerialPgClient,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 300_000,
    query_timeout: 60_000,
  });
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
