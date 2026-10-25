import 'server-only';

import type { MetricEvalType } from '@/generated/prisma/enums';
import { AlertTypeLabel } from '@/server/alerts/constants/alert-type-labels';
import { isAlertTypeAllowed } from '@/server/alerts/constants/alert-type-options';
import type { AlertParams } from '@/server/alerts/types';
import { ActionError } from '@/server/common/run-action';

export const assertAlertTypeAllowed = (
  evalType: MetricEvalType,
  params: AlertParams,
) => {
  if (isAlertTypeAllowed(evalType, params.type)) return;
  throw new ActionError(
    `The alert type "${AlertTypeLabel[params.type]}" does not fit this metric.`,
    422,
  );
};
