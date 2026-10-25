import 'server-only';

import { AlertType, ThresholdOperator } from '@/generated/prisma/enums';
import type { AlertParams } from '@/server/alerts/types';

const EMPTY_PARAMS = {
  thresholdOperator: null,
  thresholdValue: null,
  thresholdUpperValue: null,
  minBreaches: null,
  windowSize: null,
  stdMultiplier: null,
  ewmaAlpha: null,
  minCalls: null,
  minCount: null,
  multiplier: null,
  windowHours: null,
  baselineHours: null,
};

const upperValueOf = (
  params: Extract<AlertParams, { type: typeof AlertType.threshold }>,
) => {
  if (params.thresholdOperator === ThresholdOperator.outside) {
    return params.thresholdUpperValue;
  }
  return null;
};

const typeFields = (params: AlertParams) => {
  switch (params.type) {
    case AlertType.threshold:
      return {
        thresholdOperator: params.thresholdOperator,
        thresholdValue: params.thresholdValue,
        thresholdUpperValue: upperValueOf(params),
        minBreaches: params.minBreaches,
        windowSize: params.windowSize,
      };
    case AlertType.significant_change:
      return {
        windowSize: params.windowSize,
        stdMultiplier: params.stdMultiplier,
        ewmaAlpha: params.ewmaAlpha,
      };
    case AlertType.insight_new_mode:
      return { minCalls: params.minCalls };
    case AlertType.insight_uptick:
      return {
        minCount: params.minCount,
        multiplier: params.multiplier,
        windowHours: params.windowHours,
        baselineHours: params.baselineHours,
      };
    default:
      return {};
  }
};

export const alertParamsData = (params: AlertParams) => ({
  type: params.type,
  ...EMPTY_PARAMS,
  ...typeFields(params),
});
