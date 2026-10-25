import { z } from 'zod';

import { ComparisonOperator } from '@/generated/prisma/enums';

const idSchema = z.number().int().positive();

export const getRubricSchema = z.object({
  projectId: idSchema,
});

export const rubricRuleValueSchema = z.union([
  z.boolean(),
  z.number({ error: 'Enter a number.' }),
  z.array(z.string().min(1)).min(1, 'Pick at least one value.'),
  z.null(),
]);

export const rubricRuleSchema = z.object({
  metricId: idSchema.nullable(),
  operator: z.enum(ComparisonOperator),
  value: rubricRuleValueSchema,
});

export const rubricRulesSchema = z
  .array(rubricRuleSchema)
  .superRefine((rules, context) => {
    const seen = new Set<number>();
    for (const [index, rule] of rules.entries()) {
      if (rule.metricId === null) {
        context.addIssue({
          code: 'custom',
          path: [index, 'metricId'],
          message: 'Pick a metric.',
        });
        continue;
      }
      if (seen.has(rule.metricId)) {
        context.addIssue({
          code: 'custom',
          path: [index, 'metricId'],
          message: 'This metric already has a condition.',
        });
      }
      seen.add(rule.metricId);
    }
  });

export const saveRubricSchema = z.object({
  projectId: idSchema,
  rules: rubricRulesSchema,
});
