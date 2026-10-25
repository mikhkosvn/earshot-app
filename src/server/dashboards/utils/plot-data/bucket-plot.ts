import 'server-only';

import type { WidgetTimePeriod } from '@/generated/prisma/enums';
import type { FieldValueKind } from '@/server/dashboards/constants/plot/field-value-kind';
import type { PlotAggregation } from '@/server/dashboards/constants/plot/plot-aggregation';
import type { BucketRow, PlotSeries } from '@/server/dashboards/types';
import { bucketLabel } from '@/server/dashboards/utils/time/time-labels';
import { bucketStart } from '@/server/dashboards/utils/time/zoned-time';

import { aggregateValues } from './aggregate';

export const VALUE_SERIES_KEY = 'value';

const MAX_GROUPS = 8;

const OTHER_GROUP = 'Other';

export type BucketSample = {
  date: Date;
  value: number;
  group: string | null;
};

type BucketPlotInput = {
  samples: BucketSample[];
  period: WidgetTimePeriod;
  timeZone: string;
  aggregation: PlotAggregation;
  kind: FieldValueKind;
  displayName: string;
};

const topGroups = (samples: BucketSample[]) => {
  const counts = new Map<string, number>();
  for (const sample of samples) {
    if (sample.group === null) continue;
    counts.set(sample.group, (counts.get(sample.group) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([group]) => group);
};

const seriesOf = (samples: BucketSample[], displayName: string) => {
  const groups = topGroups(samples);
  if (groups.length === 0) {
    return {
      series: [{ key: VALUE_SERIES_KEY, label: displayName }],
      keyOf: () => VALUE_SERIES_KEY,
    };
  }
  const kept = groups.slice(0, MAX_GROUPS);
  const labels = [...kept];
  if (groups.length > MAX_GROUPS) labels.push(OTHER_GROUP);
  const series: PlotSeries[] = labels.map((label, index) => ({
    key: `g${index}`,
    label,
  }));
  const keyByLabel = new Map(series.map((item) => [item.label, item.key]));
  const keyOf = (group: string | null) => {
    if (group !== null && keyByLabel.has(group)) {
      return keyByLabel.get(group) ?? VALUE_SERIES_KEY;
    }
    return keyByLabel.get(OTHER_GROUP) ?? VALUE_SERIES_KEY;
  };
  return { series, keyOf };
};

export const bucketPlot = ({
  samples,
  period,
  timeZone,
  aggregation,
  kind,
  displayName,
}: BucketPlotInput) => {
  const { series, keyOf } = seriesOf(samples, displayName);
  const buckets = new Map<number, Map<string, number[]>>();
  for (const sample of samples) {
    const start = bucketStart(sample.date, period, timeZone).getTime();
    const bucket = buckets.get(start) ?? new Map<string, number[]>();
    const key = keyOf(sample.group);
    bucket.set(key, [...(bucket.get(key) ?? []), sample.value]);
    buckets.set(start, bucket);
  }
  const rows: BucketRow[] = [...buckets.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([start, bucket]) => ({
      key: new Date(start).toISOString(),
      label: bucketLabel(new Date(start), period, timeZone),
      sampleCount: [...bucket.values()].reduce(
        (total, values) => total + values.length,
        0,
      ),
      values: Object.fromEntries(
        series.map((item) => [
          item.key,
          aggregateValues(bucket.get(item.key) ?? [], aggregation, kind),
        ]),
      ),
    }));
  return { series, rows };
};
