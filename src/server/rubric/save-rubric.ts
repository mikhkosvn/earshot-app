import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import {
  RUBRIC_OPERATORS,
  RubricValueKind,
} from '@/server/metrics/constants/rubric/rubric-value-kind';
import { saveRubricSchema } from '@/server/rubric/schemas';
import type { RubricRuleValue } from '@/server/rubric/types';
import { rubricValueKind } from '@/server/rubric/utils/rubric-kind';
import { storedRuleValue } from '@/server/rubric/utils/rule-value';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

interface RuleMetric {
  name: string;
  kind: RubricValueKind;
  enumValues: string[];
}

const valueMatchesKind = (
  value: RubricRuleValue,
  metric: RuleMetric,
): boolean => {
  if (value === null) return true;
  if (metric.kind === RubricValueKind.boolean)
    return typeof value === 'boolean';
  if (metric.kind === RubricValueKind.number) return typeof value === 'number';
  if (!Array.isArray(value)) return false;
  return value.every((item) => metric.enumValues.includes(item));
};

export const saveRubric = withValidation(
  saveRubricSchema,
  async ({ projectId, rules }) => {
    await requireProjectAccess(projectId);
    const metrics = await prisma.metric.findMany({
      where: { projectId },
      select: {
        id: true,
        name: true,
        evalType: true,
        predefinedMetric: { select: { functionName: true } },
        enumOptions: {
          select: { value: true },
          orderBy: { position: Prisma.SortOrder.asc },
        },
      },
    });
    const metricById = new Map<number, RuleMetric>(
      metrics.map((metric) => [
        metric.id,
        {
          name: metric.name,
          kind: rubricValueKind({
            evalType: metric.evalType,
            functionName: metric.predefinedMetric?.functionName ?? null,
          }),
          enumValues: metric.enumOptions.map((option) => option.value),
        },
      ]),
    );
    const data = rules.map((rule, index) => {
      const metric = metricById.get(rule.metricId ?? 0);
      if (!metric) throw new ActionError('Pick metrics of this project only.');
      if (!RUBRIC_OPERATORS[metric.kind].includes(rule.operator)) {
        throw new ActionError(
          `The operator does not fit the metric "${metric.name}".`,
        );
      }
      if (!valueMatchesKind(rule.value, metric)) {
        throw new ActionError(
          `The value does not fit the metric "${metric.name}".`,
        );
      }
      return {
        metricId: rule.metricId ?? 0,
        position: index + 1,
        operator: rule.operator,
        ...storedRuleValue(rule.value),
      };
    });
    await prisma.$transaction([
      prisma.rubricRule.deleteMany({ where: { metric: { projectId } } }),
      prisma.rubricRule.createMany({ data }),
    ]);
    addEventFields({
      project: { id: projectId },
      rubric: { rule_count: data.length },
    });
    return { count: data.length };
  },
);
