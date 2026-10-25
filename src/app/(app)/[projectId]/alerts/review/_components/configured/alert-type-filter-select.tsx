'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MetricEvalType } from '@/generated/prisma/enums';
import {
  METRIC_TYPE_FILTER_ORDER,
  MetricEvalTypeLabel,
} from '@/server/alerts/constants/metric-type-filter';

import { useAlertFilterParams } from '../../_hooks/params/use-alert-filter-params';

const ALL_TYPES = 'all';

const items = [
  { value: ALL_TYPES, label: 'All Types' },
  ...METRIC_TYPE_FILTER_ORDER.map((type) => ({
    value: type,
    label: MetricEvalTypeLabel[type],
  })),
];

const isEvalType = (value: string): value is MetricEvalType =>
  METRIC_TYPE_FILTER_ORDER.some((type) => type === value);

const typeOf = (value: string) => {
  if (isEvalType(value)) return value;
  return null;
};

export function AlertTypeFilterSelect() {
  const [{ type }, setParams] = useAlertFilterParams();

  return (
    <Select
      items={items}
      value={type ?? ALL_TYPES}
      onValueChange={(value) => {
        if (value === null) return;
        void setParams({ type: typeOf(value) });
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label="Metric type"
        className="w-40 text-xs"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
