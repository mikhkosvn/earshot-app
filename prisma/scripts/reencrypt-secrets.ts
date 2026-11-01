import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/generated/prisma/client';
import { CIPHER_SEPARATOR, CipherVersion } from '@/server/crypto/constants';
import { decryptSecret } from '@/server/crypto/decrypt-secret';
import { encryptSecret } from '@/server/crypto/encrypt-secret';

const LEGACY_PREFIX = `${CipherVersion.v1}${CIPHER_SEPARATOR}`;
const ENVELOPE_PREFIX = `${CipherVersion.v2}${CIPHER_SEPARATOR}`;
const legacyFilter = { startsWith: LEGACY_PREFIX };

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

interface LegacyValue {
  id: number;
  value: string | null;
}

interface EncryptedColumn {
  name: string;
  read: () => Promise<LegacyValue[]>;
  write: (id: number, previous: string, next: string) => Promise<number>;
}

const countOf = (result: { count: number }) => result.count;

const ENCRYPTED_COLUMNS: EncryptedColumn[] = [
  {
    name: 'Agent.providerApiKeyEncrypted',
    read: async () =>
      (
        await prisma.agent.findMany({
          where: { providerApiKeyEncrypted: legacyFilter },
          select: { id: true, providerApiKeyEncrypted: true },
        })
      ).map((row) => ({ id: row.id, value: row.providerApiKeyEncrypted })),
    write: async (id, previous, next) =>
      countOf(
        await prisma.agent.updateMany({
          where: { id, providerApiKeyEncrypted: previous },
          data: { providerApiKeyEncrypted: next },
        }),
      ),
  },
  {
    name: 'Agent.providerPublicKeyEncrypted',
    read: async () =>
      (
        await prisma.agent.findMany({
          where: { providerPublicKeyEncrypted: legacyFilter },
          select: { id: true, providerPublicKeyEncrypted: true },
        })
      ).map((row) => ({ id: row.id, value: row.providerPublicKeyEncrypted })),
    write: async (id, previous, next) =>
      countOf(
        await prisma.agent.updateMany({
          where: { id, providerPublicKeyEncrypted: previous },
          data: { providerPublicKeyEncrypted: next },
        }),
      ),
  },
  {
    name: 'Agent.webhookSecretEncrypted',
    read: async () =>
      (
        await prisma.agent.findMany({
          where: { webhookSecretEncrypted: legacyFilter },
          select: { id: true, webhookSecretEncrypted: true },
        })
      ).map((row) => ({ id: row.id, value: row.webhookSecretEncrypted })),
    write: async (id, previous, next) =>
      countOf(
        await prisma.agent.updateMany({
          where: { id, webhookSecretEncrypted: previous },
          data: { webhookSecretEncrypted: next },
        }),
      ),
  },
  {
    name: 'KnowledgeBaseConnector.credentialsEncrypted',
    read: async () =>
      (
        await prisma.knowledgeBaseConnector.findMany({
          where: { credentialsEncrypted: legacyFilter },
          select: { id: true, credentialsEncrypted: true },
        })
      ).map((row) => ({ id: row.id, value: row.credentialsEncrypted })),
    write: async (id, previous, next) =>
      countOf(
        await prisma.knowledgeBaseConnector.updateMany({
          where: { id, credentialsEncrypted: previous },
          data: { credentialsEncrypted: next },
        }),
      ),
  },
  {
    name: 'ProviderApiKey.encryptedKey',
    read: async () =>
      (
        await prisma.providerApiKey.findMany({
          where: { encryptedKey: legacyFilter },
          select: { id: true, encryptedKey: true },
        })
      ).map((row) => ({ id: row.id, value: row.encryptedKey })),
    write: async (id, previous, next) =>
      countOf(
        await prisma.providerApiKey.updateMany({
          where: { id, encryptedKey: previous },
          data: { encryptedKey: next },
        }),
      ),
  },
  {
    name: 'ProjectWebhook.secretEncrypted',
    read: async () =>
      (
        await prisma.projectWebhook.findMany({
          where: { secretEncrypted: legacyFilter },
          select: { projectId: true, secretEncrypted: true },
        })
      ).map((row) => ({ id: row.projectId, value: row.secretEncrypted })),
    write: async (id, previous, next) =>
      countOf(
        await prisma.projectWebhook.updateMany({
          where: { projectId: id, secretEncrypted: previous },
          data: { secretEncrypted: next },
        }),
      ),
  },
  {
    name: 'TelephonyPhoneNumber.authTokenEncrypted',
    read: async () =>
      (
        await prisma.telephonyPhoneNumber.findMany({
          where: { authTokenEncrypted: legacyFilter },
          select: { id: true, authTokenEncrypted: true },
        })
      ).map((row) => ({ id: row.id, value: row.authTokenEncrypted })),
    write: async (id, previous, next) =>
      countOf(
        await prisma.telephonyPhoneNumber.updateMany({
          where: { id, authTokenEncrypted: previous },
          data: { authTokenEncrypted: next },
        }),
      ),
  },
];

const reencryptValue = async (previous: string) => {
  const next = await encryptSecret(await decryptSecret(previous));
  if (!next.startsWith(ENVELOPE_PREFIX)) {
    throw new Error('The new value is not in the v2 format.');
  }
  return next;
};

const reencryptColumn = async (column: EncryptedColumn) => {
  const rows = await column.read();
  let updated = 0;
  let skipped = 0;
  for (const row of rows) {
    if (!row.value) continue;
    const next = await reencryptValue(row.value);
    const count = await column.write(row.id, row.value, next);
    updated += count;
    skipped += 1 - count;
  }
  console.log(
    `${column.name}: ${rows.length} v1 rows, ${updated} updated, ${skipped} changed by another writer.`,
  );
};

const main = async () => {
  if (!process.env.KMS_KEY_NAME) {
    throw new Error('KMS_KEY_NAME is not set. The script cannot write v2.');
  }
  for (const column of ENCRYPTED_COLUMNS) {
    await reencryptColumn(column);
  }
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
