'use client';

import { MetricEvalType } from '@/generated/prisma/enums';

import { usePatternReview } from '../../../_hooks/use-pattern-review';
import { BooleanScoreToggles } from './boolean-score-toggles';
import { EnumScoreSelect } from './enum-score-select';
import { NumberScoreInput } from './number-score-input';

interface GroupScoreInputProps {
  groupKey: string;
}

export function GroupScoreInput({ groupKey }: GroupScoreInputProps) {
  const review = usePatternReview();

  if (review.metric.evalType === MetricEvalType.binary) {
    return <BooleanScoreToggles groupKey={groupKey} />;
  }
  if (review.metric.evalType === MetricEvalType.enum) {
    return <EnumScoreSelect groupKey={groupKey} />;
  }
  return <NumberScoreInput groupKey={groupKey} />;
}
