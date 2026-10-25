'use client';

import { useWatch } from 'react-hook-form';

import { AlertType } from '@/generated/prisma/enums';

import type { EditAlertFormValues } from '../../_schemas/edit-alert-form-schema';
import { MinCallsField } from './min-calls-field';
import { SpikePresetField } from './spike-preset-field';
import { ThresholdFields } from './threshold-fields';
import { TrendPresetField } from './trend-preset-field';

export function AlertParamsFields() {
  const type = useWatch<EditAlertFormValues, 'params.type'>({
    name: 'params.type',
  });

  if (type === AlertType.threshold) return <ThresholdFields />;
  if (type === AlertType.significant_change) return <TrendPresetField />;
  if (type === AlertType.insight_new_mode) return <MinCallsField />;
  if (type === AlertType.insight_uptick) return <SpikePresetField />;
  return null;
}
