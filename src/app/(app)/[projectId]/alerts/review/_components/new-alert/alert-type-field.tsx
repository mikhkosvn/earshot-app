'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertTypeDescription,
  AlertTypeLabel,
} from '@/server/alerts/constants/alert-type-labels';
import { ALERT_TYPES_BY_EVAL_TYPE } from '@/server/alerts/constants/alert-type-options';
import type {
  AlertMetricOption,
  CreateAlertInput,
} from '@/server/alerts/types';

import { changeAlertType } from '../../_utils/alert-form-transitions';

const FIELD_ID = 'alert-type';

type AlertTypeFieldProps = {
  metric: AlertMetricOption;
};

export function AlertTypeField({ metric }: AlertTypeFieldProps) {
  const form = useFormContext<CreateAlertInput>();
  const type = useWatch<CreateAlertInput, 'params.type'>({
    name: 'params.type',
  });
  const items = ALERT_TYPES_BY_EVAL_TYPE[metric.evalType].map((value) => ({
    value,
    label: AlertTypeLabel[value],
  }));

  return (
    <Field className="gap-1.5">
      <FieldLabel htmlFor={FIELD_ID} className="text-xs">
        Alert type
      </FieldLabel>
      <Select
        items={items}
        value={type}
        onValueChange={(value) => {
          if (value === null) return;
          changeAlertType(form, metric, value);
        }}
      >
        <SelectTrigger
          id={FIELD_ID}
          aria-label="Alert type"
          className="w-full text-xs"
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
      <FieldDescription className="text-[11px]">
        {AlertTypeDescription[type]}
      </FieldDescription>
    </Field>
  );
}
