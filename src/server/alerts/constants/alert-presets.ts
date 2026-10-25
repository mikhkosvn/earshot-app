export const SensitivityPreset = {
  conservative: 'conservative',
  balanced: 'balanced',
  aggressive: 'aggressive',
} as const;

export type SensitivityPreset =
  (typeof SensitivityPreset)[keyof typeof SensitivityPreset];

export const SensitivityPresetLabel: Record<SensitivityPreset, string> = {
  [SensitivityPreset.conservative]: 'Conservative',
  [SensitivityPreset.balanced]: 'Balanced',
  [SensitivityPreset.aggressive]: 'Aggressive',
};

export interface TrendPresetValues {
  windowSize: number;
  stdMultiplier: number;
  ewmaAlpha: number;
}

export const TREND_PRESETS: Record<SensitivityPreset, TrendPresetValues> = {
  [SensitivityPreset.conservative]: {
    windowSize: 100,
    stdMultiplier: 3,
    ewmaAlpha: 0.1,
  },
  [SensitivityPreset.balanced]: {
    windowSize: 50,
    stdMultiplier: 2,
    ewmaAlpha: 0.3,
  },
  [SensitivityPreset.aggressive]: {
    windowSize: 25,
    stdMultiplier: 1.5,
    ewmaAlpha: 0.5,
  },
};

export const TREND_PRESET_DESCRIPTION: Record<SensitivityPreset, string> = {
  [SensitivityPreset.conservative]:
    'Catches only large shifts. Best for quiet metrics.',
  [SensitivityPreset.balanced]: 'Sensible defaults. Start here.',
  [SensitivityPreset.aggressive]:
    'Fires quickly on small shifts. Best for high-traffic metrics.',
};

export interface SpikePresetValues {
  minCount: number;
  multiplier: number;
  windowHours: number;
  baselineHours: number;
}

export const SPIKE_BASELINE_HOURS = 168;

export const SPIKE_PRESETS: Record<SensitivityPreset, SpikePresetValues> = {
  [SensitivityPreset.conservative]: {
    minCount: 10,
    multiplier: 4,
    windowHours: 24,
    baselineHours: SPIKE_BASELINE_HOURS,
  },
  [SensitivityPreset.balanced]: {
    minCount: 5,
    multiplier: 3,
    windowHours: 24,
    baselineHours: SPIKE_BASELINE_HOURS,
  },
  [SensitivityPreset.aggressive]: {
    minCount: 3,
    multiplier: 2,
    windowHours: 6,
    baselineHours: SPIKE_BASELINE_HOURS,
  },
};

export const SPIKE_PRESET_DESCRIPTION: Record<SensitivityPreset, string> = {
  [SensitivityPreset.conservative]:
    'Only large, sustained spikes. Best for low-volume metrics.',
  [SensitivityPreset.balanced]: 'Sensible defaults. Start here.',
  [SensitivityPreset.aggressive]:
    'Fires quickly on small spikes. Best for high-traffic metrics.',
};

export const THRESHOLD_DEFAULTS = {
  thresholdValue: 0,
  thresholdUpperValue: 1,
  minBreaches: 1,
  windowSize: 50,
} as const;

export const NEW_MODE_DEFAULT_MIN_CALLS = 1;

export const SENSITIVITY_PRESET_ORDER: SensitivityPreset[] = [
  SensitivityPreset.conservative,
  SensitivityPreset.balanced,
  SensitivityPreset.aggressive,
];
