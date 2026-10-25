import 'server-only';

import { prisma } from '@/lib/prisma';
import type { Classification } from '@/server/insights/generation/classify-failures';

export const persistClassification = async (
  metricId: number,
  classification: Classification,
  evaluatedAt: Map<number, Date>,
) => {
  const categoryIds = new Map<string, number>();
  for (const category of classification.categories) {
    const row = await prisma.failureCategory.upsert({
      where: { metricId_slug: { metricId, slug: category.slug } },
      create: {
        metricId,
        slug: category.slug,
        name: category.name,
        description: category.description,
      },
      update: {},
      select: { id: true },
    });
    categoryIds.set(category.slug, row.id);
  }
  const counts = new Map<number, number>();
  for (const assignment of classification.assignments) {
    const categoryId = categoryIds.get(assignment.slug);
    if (categoryId === undefined) continue;
    counts.set(categoryId, (counts.get(categoryId) ?? 0) + 1);
    const assignedAt = evaluatedAt.get(assignment.evaluationId) ?? new Date();
    await prisma.failureCategoryAssignment.upsert({
      where: { metricEvaluationId: assignment.evaluationId },
      create: {
        metricEvaluationId: assignment.evaluationId,
        categoryId,
        explanation: assignment.explanation,
        assignedAt,
      },
      update: { categoryId, explanation: assignment.explanation },
    });
  }
  return { categoryIds, counts };
};

export const knownCategoriesOf = (metricId: number) =>
  prisma.failureCategory.findMany({
    where: { metricId },
    select: { slug: true, name: true, description: true },
  });
