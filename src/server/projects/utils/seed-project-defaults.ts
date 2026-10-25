import { Prisma } from '@/generated/prisma/client';
import { FolderSystemRole } from '@/generated/prisma/enums';

const DEFAULT_FOLDERS = [
  { path: 'Regression Suite', systemRole: FolderSystemRole.regression_suite },
  { path: 'default', systemRole: FolderSystemRole.default },
];

type CatalogMetric = Prisma.PredefinedMetricGetPayload<{
  include: { enumOptions: true };
}>;

const toJsonInput = (value: Prisma.JsonValue | null) => {
  if (value === null) return Prisma.DbNull;
  return value as Prisma.InputJsonValue;
};

const seedDefaultFolders = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  for (const folder of DEFAULT_FOLDERS) {
    await tx.folder.upsert({
      where: {
        projectId_systemRole: { projectId, systemRole: folder.systemRole },
      },
      create: { projectId, path: folder.path, systemRole: folder.systemRole },
      update: {},
    });
  }
};

const copyCatalogMetric = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  catalogMetric: CatalogMetric,
  displayOrder: number,
) => {
  const existing = await tx.metric.findUnique({
    where: {
      projectId_predefinedMetricId: {
        projectId,
        predefinedMetricId: catalogMetric.id,
      },
    },
    select: { id: true },
  });
  if (existing) return;

  const metric = await tx.metric.create({
    data: {
      projectId,
      predefinedMetricId: catalogMetric.id,
      name: catalogMetric.name,
      slug: catalogMetric.slug,
      description: catalogMetric.description,
      type: catalogMetric.type,
      evalType: catalogMetric.evalType,
      audioEnabled: catalogMetric.audioEnabled,
      customCode: catalogMetric.customCode,
      configuration: toJsonInput(catalogMetric.configuration),
      displayOrder,
      observabilityEnabled: catalogMetric.observabilityEnabled,
      simulationEnabled: catalogMetric.simulationEnabled,
      addToNewAgents: true,
      enumOptions: {
        create: catalogMetric.enumOptions.map((option) => ({
          position: option.position,
          value: option.value,
        })),
      },
    },
    select: { id: true },
  });

  if (!catalogMetric.rubricOperator) return;

  await tx.rubricRule.create({
    data: {
      metricId: metric.id,
      position: displayOrder,
      operator: catalogMetric.rubricOperator,
      numberValue: catalogMetric.rubricNumberValue,
      booleanValue: catalogMetric.rubricBooleanValue,
    },
  });
};

const seedDefaultMetrics = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  const catalogMetrics = await tx.predefinedMetric.findMany({
    where: { addToNewProjects: true },
    include: { enumOptions: true },
    orderBy: [
      { defaultDisplayOrder: Prisma.SortOrder.asc },
      { id: Prisma.SortOrder.asc },
    ],
  });
  for (const [index, catalogMetric] of catalogMetrics.entries()) {
    await copyCatalogMetric(
      tx,
      projectId,
      catalogMetric,
      catalogMetric.defaultDisplayOrder ?? index + 1,
    );
  }
};

const seedDefaultPersonalities = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  const enabledCount = await tx.projectPersonality.count({
    where: { projectId },
  });
  if (enabledCount > 0) return;

  const personalities = await tx.personality.findMany({
    where: { projectId: null, enabledByDefault: true },
    select: { id: true },
  });
  await tx.projectPersonality.createMany({
    data: personalities.map((personality) => ({
      projectId,
      personalityId: personality.id,
    })),
    skipDuplicates: true,
  });
};

export const seedProjectDefaults = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  await seedDefaultFolders(tx, projectId);
  await seedDefaultMetrics(tx, projectId);
  await seedDefaultPersonalities(tx, projectId);
};
