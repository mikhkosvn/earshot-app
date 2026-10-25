import Link from 'next/link';

import { cn } from '@/lib/utils';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { LabMetricListItem } from '@/server/labs/types';
import { MetricEvalTypeLabel } from '@/server/metrics/constants/metric-eval-type-labels';

import { LAB_GRID_CLASS } from '../_constants/labs-text';
import { descriptionPreview, scoreText } from '../_utils/lab-text';

type LabMetricRowProps = {
  metric: LabMetricListItem;
};

const CELL_CLASS = 'flex h-full items-center border-r px-3 py-3 last:border-r-0';

export function LabMetricRow({ metric }: LabMetricRowProps) {
  return (
    <Link
      role="row"
      href={UrlGenerator.labEdit({ metricId: metric.id })}
      className={cn(
        LAB_GRID_CLASS,
        'rounded-md border bg-background text-sm transition-colors hover:bg-muted/50',
      )}
    >
      <span role="cell" className={cn(CELL_CLASS, 'font-semibold')}>
        {metric.id}
      </span>
      <span role="cell" className={cn(CELL_CLASS, 'font-semibold')}>
        {metric.name}
      </span>
      <span role="cell" className={cn(CELL_CLASS, 'text-muted-foreground')}>
        {MetricEvalTypeLabel[metric.evalType]}
      </span>
      <span role="cell" className={cn(CELL_CLASS, 'whitespace-pre-line')}>
        {descriptionPreview(metric.description)}
      </span>
      <span role="cell" className={cn(CELL_CLASS, 'justify-end')}>
        {scoreText(metric.score)}
      </span>
    </Link>
  );
}
