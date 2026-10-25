import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { getRubricSchema } from '@/server/rubric/schemas';
import type { RubricView } from '@/server/rubric/types';
import { rubricValueKind } from '@/server/rubric/utils/rubric-kind';
import { ruleValueOf } from '@/server/rubric/utils/rule-value';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getRubric = withValidation(
  getRubricSchema,
  async ({ projectId }): Promise<RubricView> => {
    await requireProjectAccess(projectId);
    const metrics = await prisma.metric.findMany({
      where: { projectId },
      orderBy: [
        { displayOrder: Prisma.SortOrder.asc },
        { id: Prisma.SortOrder.asc },
      ],
      select: {
        id: true,
        name: true,
        evalType: true,
        predefinedMetric: { select: { functionName: true } },
        enumOptions: {
          select: { value: true },
          orderBy: { position: Prisma.SortOrder.asc },
        },
        rubricRule: true,
      },
    });
    const options = metrics.map((metric) => ({
      id: metric.id,
      name: metric.name,
      evalType: metric.evalType,
      kind: rubricValueKind({
        evalType: metric.evalType,
        functionName: metric.predefinedMetric?.functionName ?? null,
      }),
      enumValues: metric.enumOptions.map((option) => option.value),
    }));
    const kindById = new Map(options.map((option) => [option.id, option.kind]));
    const rules = metrics
      .flatMap((metric) => {
        if (!metric.rubricRule) return [];
        return [{ metricId: metric.id, rule: metric.rubricRule }];
      })
      .toSorted((left, right) => left.rule.position - right.rule.position)
      .map(({ metricId, rule }) => ({
        metricId,
        operator: rule.operator,
        value: ruleValueOf(kindById.get(metricId)!, rule),
      }));
    return { rules, metrics: options };
  },
);
