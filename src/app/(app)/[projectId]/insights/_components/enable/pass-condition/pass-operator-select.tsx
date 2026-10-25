'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PASS_OPERATORS,
  PassOperatorLabel,
} from '@/server/insights/constants/pass-condition';
import type { SaveInsightConfigInput } from '@/server/insights/types';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';

import { useSelectedInsightMetric } from '../../../_hooks/forms/use-selected-insight-metric';

export function PassOperatorSelect() {
  const { control } = useFormContext<SaveInsightConfigInput>();
  const metric = useSelectedInsightMetric();
  const kind = metric?.kind ?? RubricValueKind.number;
  const items = PASS_OPERATORS[kind].map((operator) => ({
    value: operator,
    label: PassOperatorLabel[operator] ?? operator,
  }));

  return (
    <Controller
      name="passOperator"
      control={control}
      render={({ field }) => (
        <Select
          items={items}
          value={field.value}
          disabled={!metric}
          onValueChange={(value) => {
            if (value === null) return;
            field.onChange(value);
          }}
        >
          <SelectTrigger
            aria-label="Passing threshold operator"
            className="w-full text-xs"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="text-xs"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
