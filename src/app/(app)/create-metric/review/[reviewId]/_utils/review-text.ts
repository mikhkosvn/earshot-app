import { MetricEvalType } from '@/generated/prisma/enums';
import { PatternReviewStageLabel } from '@/server/labs/constants/pattern-review-stage-labels';
import { PatternReviewStatusLabel } from '@/server/labs/constants/pattern-review-status-labels';
import type {
  PatternGroupView,
  PatternReviewView,
} from '@/server/metrics/types';

const plural = (count: number, singular: string, many: string) => {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${many}`;
};

export const reviewProgressText = (review: PatternReviewView) => {
  if (review.stage) return `${PatternReviewStageLabel[review.stage]}...`;
  return `${PatternReviewStatusLabel[review.status]}...`;
};

export const sampleCountText = (review: PatternReviewView) => {
  if (review.metric.evalType === MetricEvalType.binary) {
    return `${review.counts.pass} of ${review.counts.total} samples pass`;
  }
  return `${review.counts.evaluated} of ${review.counts.total} samples scored`;
};

export const sampleProgressValue = (review: PatternReviewView) => {
  if (review.counts.total === 0) return 0;
  if (review.metric.evalType === MetricEvalType.binary) {
    return (review.counts.pass / review.counts.total) * 100;
  }
  return (review.counts.evaluated / review.counts.total) * 100;
};

export const groupSizeText = (size: number) => plural(size, 'call', 'calls');

export const otherCallsText = (count: number) =>
  `${plural(count, 'other call', 'other calls')} like this`;

export const reviewFooterText = (groups: readonly PatternGroupView[]) => {
  const corrected = groups.filter((group) => group.correction !== null);
  if (corrected.length === 0) return 'Fix anything the judge got wrong';
  const calls = corrected.reduce((sum, group) => sum + group.size, 0);
  return `${plural(corrected.length, 'group', 'groups')} fixed, ${plural(calls, 'call', 'calls')}. Rebuild saves every corrected call and the other representatives to Labs, then improves the metric.`;
};
