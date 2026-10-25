import 'dotenv/config';

import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

import { PrismaPg } from '@prisma/adapter-pg';

import { Prisma, PrismaClient } from '@/generated/prisma/client';
import { MemberRole } from '@/generated/prisma/enums';
import {
  DEFAULT_ORGANIZATION_NAME,
  DEFAULT_PROJECT_NAME,
} from '@/server/projects/constants/default-project-name';
import { seedProjectDefaults } from '@/server/projects/utils/seed-project-defaults';

import { GLOBAL_PERSONALITIES } from './seed-data/personalities';
import { PREDEFINED_METRICS } from './seed-data/predefined-metrics';
import type { PersonalitySeed, PredefinedMetricSeed } from './seed-data/types';

const DEFAULT_SEED_EMAIL = 'admin@earshot.local';
const DEFAULT_SEED_PASSWORD = 'earshot-dev-password';
const SEED_USER_NAME = 'Admin';
const PASSWORD_SCHEME = 'scrypt';
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 };
const TRANSACTION_TIMEOUT_MS = 60000;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const deriveKey = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, key) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(key);
    });
  });

const hashPassword = async (password: string) => {
  const salt = randomBytes(SALT_LENGTH);
  const key = await deriveKey(password, salt);
  return `${PASSWORD_SCHEME}$${salt.toString('hex')}$${key.toString('hex')}`;
};

const passwordMatches = async (password: string, storedHash: string) => {
  const [scheme, saltHex, hashHex] = storedHash.split('$');
  if (scheme !== PASSWORD_SCHEME || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const key = await deriveKey(password, Buffer.from(saltHex, 'hex'));
  if (key.length !== expected.length) return false;
  return timingSafeEqual(key, expected);
};

const toJsonInput = (value: Record<string, number> | null) => {
  if (value === null) return Prisma.DbNull;
  return value;
};

const seedUser = async () => {
  const email = process.env.SEED_USER_EMAIL ?? DEFAULT_SEED_EMAIL;
  const password = process.env.SEED_USER_PASSWORD ?? DEFAULT_SEED_PASSWORD;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    return prisma.user.create({
      data: {
        email,
        name: SEED_USER_NAME,
        passwordHash: await hashPassword(password),
      },
    });
  }
  if (await passwordMatches(password, existing.passwordHash)) return existing;
  return prisma.user.update({
    where: { id: existing.id },
    data: { passwordHash: await hashPassword(password) },
  });
};

const seedOrganization = async (userId: number) => {
  const existing = await prisma.organization.findFirst({
    where: {
      name: DEFAULT_ORGANIZATION_NAME,
      members: { some: { userId } },
    },
    orderBy: { id: Prisma.SortOrder.asc },
  });
  if (existing) return existing;
  return prisma.organization.create({
    data: {
      name: DEFAULT_ORGANIZATION_NAME,
      members: { create: { userId, role: MemberRole.admin } },
    },
  });
};

const seedProject = async (organizationId: number) => {
  const existing = await prisma.project.findFirst({
    where: { organizationId, name: DEFAULT_PROJECT_NAME },
    orderBy: { id: Prisma.SortOrder.asc },
  });
  if (existing) return existing;
  return prisma.project.create({
    data: { organizationId, name: DEFAULT_PROJECT_NAME },
  });
};

const catalogData = (metric: PredefinedMetricSeed) => ({
  slug: metric.slug,
  name: metric.name,
  description: metric.description,
  type: metric.type,
  evalType: metric.evalType,
  functionName: metric.functionName,
  customCode: metric.customCode,
  category: metric.category,
  subCategory: metric.subCategory,
  badge: metric.badge,
  audioEnabled: metric.audioEnabled,
  simulationEnabled: metric.simulationEnabled,
  observabilityEnabled: metric.observabilityEnabled,
  configuration: toJsonInput(metric.configuration),
  editable: metric.editable,
  addToNewProjects: metric.addToNewProjects,
  defaultDisplayOrder: metric.defaultDisplayOrder,
  rubricOperator: metric.rubricOperator,
  rubricNumberValue: metric.rubricNumberValue,
  rubricBooleanValue: metric.rubricBooleanValue,
});

const seedPredefinedMetric = async (metric: PredefinedMetricSeed) => {
  const options = metric.enumOptions.map((value, position) => ({
    position,
    value,
  }));
  await prisma.predefinedMetric.upsert({
    where: { code: metric.code },
    create: {
      code: metric.code,
      ...catalogData(metric),
      enumOptions: { create: options },
    },
    update: {
      ...catalogData(metric),
      enumOptions: { deleteMany: {}, create: options },
    },
  });
};

const personalityData = (personality: PersonalitySeed) => ({
  description: personality.description,
  prompt: personality.prompt,
  accent: personality.accent,
  gender: personality.gender,
  isStarred: personality.isStarred,
  enabledByDefault: personality.enabledByDefault,
  voiceModel: personality.voiceModel,
  voiceId: personality.voiceId,
  speed: personality.speed,
  interruptionLevel: personality.interruptionLevel,
  backgroundNoise: personality.backgroundNoise,
  idleTimeoutSeconds: personality.idleTimeoutSeconds,
  idleMessageMaxSpokenCount: personality.idleMessageMaxSpokenCount,
  startSpeakingWaitSeconds: personality.startSpeakingWaitSeconds,
  stopSpeakingNumWords: personality.stopSpeakingNumWords,
  stopSpeakingBackoffSeconds: personality.stopSpeakingBackoffSeconds,
});

const seedGlobalPersonality = async (personality: PersonalitySeed) => {
  const existing = await prisma.personality.findFirst({
    where: {
      projectId: null,
      name: personality.name,
      language: personality.language,
    },
    select: { id: true },
  });
  if (existing) {
    await prisma.personality.update({
      where: { id: existing.id },
      data: personalityData(personality),
    });
    return;
  }
  await prisma.personality.create({
    data: {
      name: personality.name,
      language: personality.language,
      ...personalityData(personality),
    },
  });
};

const main = async () => {
  for (const metric of PREDEFINED_METRICS) await seedPredefinedMetric(metric);
  for (const personality of GLOBAL_PERSONALITIES) {
    await seedGlobalPersonality(personality);
  }
  const user = await seedUser();
  const organization = await seedOrganization(user.id);
  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: user.id,
      },
    },
    create: {
      organizationId: organization.id,
      userId: user.id,
      role: MemberRole.admin,
    },
    update: { role: MemberRole.admin },
  });
  const project = await seedProject(organization.id);
  await prisma.$transaction((tx) => seedProjectDefaults(tx, project.id), {
    timeout: TRANSACTION_TIMEOUT_MS,
  });
  console.log(
    `Seeded ${PREDEFINED_METRICS.length} predefined metrics, ${GLOBAL_PERSONALITIES.length} global personalities, user ${user.email}, organization ${organization.id}, project ${project.id}.`,
  );
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
