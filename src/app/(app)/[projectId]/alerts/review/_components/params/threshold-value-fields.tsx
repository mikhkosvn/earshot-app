'use client';

import { useWatch } from 'react-hook-form';

import { ThresholdOperator } from '@/generated/prisma/enums';

import type { EditAlertFormValues } from '../../_schemas/edit-alert-form-schema';
import { NumberParamField } from './number-param-field';

const VALUE_STEP = 0.01;

export function ThresholdValueFields() {
  const operator = useWatch<EditAlertFormValues>({
    name: 'params.thresholdOperator',
  });

  if (operator === ThresholdOperator.outside) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <NumberParamField
          name="params.thresholdValue"
          label="Low"
          step={VALUE_STEP}
        />
        <NumberParamField
          name="params.thresholdUpperValue"
          label="High"
          step={VALUE_STEP}
        />
      </div>
    );
  }
  return (
    <NumberParamField
      name="params.thresholdValue"
      label="Threshold value"
      step={VALUE_STEP}
    />
  );
}
