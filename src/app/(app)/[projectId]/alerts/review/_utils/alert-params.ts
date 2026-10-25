import { AlertType, ThresholdOperator } from '@/generated/prisma/enums';
import {
  NEW_MODE_DEFAULT_MIN_CALLS,
  SENSITIVITY_PRESET_ORDER,
  SensitivityPreset,
  SPIKE_PRESETS,
  THRESHOLD_DEFAULTS,
  TREND_PRESETS,
} from '@/server/alerts/constants/alert-presets';
import { AlertTypeLabel } from '@/server/alerts/constants/alert-type-labels';
import type { AlertParams, AlertRow } from '@/server/alerts/types';

export const defaultParamsOf = (type: AlertType): AlertParams => {
  switch (type) {
    case AlertType.threshold:
      return {
        type,
        thresholdOperator: ThresholdOperator.gt,
        ...THRESHOLD_DEFAULTS,
      };
    case AlertType.significant_change:
      return { type, ...TREND_PRESETS[SensitivityPreset.balanced] };
    case AlertType.insight_new_mode:
      return { type, minCalls: NEW_MODE_DEFAULT_MIN_CALLS };
    case AlertType.insight_uptick:
      return { type, ...SPIKE_PRESETS[SensitivityPreset.balanced] };
    default:
      return { type: AlertType.normal };
  }
};

export const paramsOfRow = (row: AlertRow): AlertParams => {
  const defaults = defaultParamsOf(row.type);
  switch (defaults.type) {
    case AlertType.threshold:
      return {
        ...defaults,
        thresholdOperator: row.thresholdOperator ?? defaults.thresholdOperator,
        thresholdValue: row.thresholdValue ?? defaults.thresholdValue,
        thresholdUpperValue:
          row.thresholdUpperValue ?? defaults.thresholdUpperValue,
        minBreaches: row.minBreaches ?? defaults.minBreaches,
        windowSize: row.windowSize ?? defaults.windowSize,
      };
    case AlertType.significant_change:
      return {
        ...defaults,
        windowSize: row.windowSize ?? defaults.windowSize,
        stdMultiplier: row.stdMultiplier ?? defaults.stdMultiplier,
        ewmaAlpha: row.ewmaAlpha ?? defaults.ewmaAlpha,
      };
    case AlertType.insight_new_mode:
      return { ...defaults, minCalls: row.minCalls ?? defaults.minCalls };
    case AlertType.insight_uptick:
      return {
        ...defaults,
        minCount: row.minCount ?? defaults.minCount,
        multiplier: row.multiplier ?? defaults.multiplier,
        windowHours: row.windowHours ?? defaults.windowHours,
        baselineHours: row.baselineHours ?? defaults.baselineHours,
      };
    default:
      return defaults;
  }
};

export const alertNameOf = (metricName: string, type: AlertType) =>
  `${metricName} · ${AlertTypeLabel[type]}`;

export const trendPresetOf = (params: {
  windowSize: number;
  stdMultiplier: number;
  ewmaAlpha: number;
}): SensitivityPreset | null =>
  SENSITIVITY_PRESET_ORDER.find((preset) => {
    const values = TREND_PRESETS[preset];
    return (
      values.windowSize === params.windowSize &&
      values.stdMultiplier === params.stdMultiplier &&
      values.ewmaAlpha === params.ewmaAlpha
    );
  }) ?? null;

export const spikePresetOf = (params: {
  minCount: number;
  multiplier: number;
  windowHours: number;
}): SensitivityPreset | null =>
  SENSITIVITY_PRESET_ORDER.find((preset) => {
    const values = SPIKE_PRESETS[preset];
    return (
      values.minCount === params.minCount &&
      values.multiplier === params.multiplier &&
      values.windowHours === params.windowHours
    );
  }) ?? null;

export const hasEditableParams = (type: AlertType) => type !== AlertType.normal;
