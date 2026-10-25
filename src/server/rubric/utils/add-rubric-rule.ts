import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { ComparisonOperator } from '@/generated/prisma/enums';

type AddRubricRuleArgs = {
  metricId: number;
  projectId: number;
  operator: ComparisonOperator;
  numberValue?: number | null;
  booleanValue?: boolean | null;
  textValues?: string[];
};

export const addRubricRule = async (
  tx: Prisma.TransactionClient,
  args: AddRubricRuleArgs,
) => {
  const { _max } = await tx.rubricRule.aggregate({
    where: { metric: { projectId: args.projectId } },
    _max: { position: true },
  });
  const values = {
    operator: args.operator,
    numberValue: args.numberValue ?? null,
    booleanValue: args.booleanValue ?? null,
    textValues: args.textValues ?? [],
  };
  await tx.rubricRule.upsert({
    where: { metricId: args.metricId },
    create: {
      metricId: args.metricId,
      position: (_max.position ?? 0) + 1,
      ...values,
    },
    update: values,
  });
};
