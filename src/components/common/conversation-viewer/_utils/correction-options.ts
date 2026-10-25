import { MetricEvalType } from '@/generated/prisma/enums';
import type { ConversationMetricItem } from '@/server/conversations/types';
import type { MetricValue } from '@/server/metrics/types';

import {
  NOT_APPLICABLE_KEY,
  NOT_APPLICABLE_LABEL,
} from '../_constants/correction';

export type CorrectionOption = {
  key: string;
  label: string;
  value: MetricValue;
};

const notApplicable: CorrectionOption = {
  key: NOT_APPLICABLE_KEY,
  label: NOT_APPLICABLE_LABEL,
  value: null,
};

export const correctionOptions = (
  metric: ConversationMetricItem,
): CorrectionOption[] | null => {
  if (metric.evalType === MetricEvalType.binary) {
    return [
      notApplicable,
      { key: 'true', label: 'True', value: true },
      { key: 'false', label: 'False', value: false },
    ];
  }
  if (metric.evalType === MetricEvalType.enum) {
    return [
      notApplicable,
      ...metric.enumValues.map((value) => ({
        key: `enum-${value}`,
        label: value,
        value,
      })),
    ];
  }
  return null;
};

export const optionKeyOf = (
  options: CorrectionOption[],
  value: MetricValue | undefined,
) =>
  options.find((option) => option.value === value)?.key ?? NOT_APPLICABLE_KEY;
