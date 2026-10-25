import { SPIKE_EXPECTED_FLOOR } from '@/server/alerts/constants/alert-limits';

export interface SpikeCheckInput {
  recentCount: number;
  baselineCount: number;
  windowHours: number;
  baselineHours: number;
  minCount: number;
  multiplier: number;
}

export interface SpikeCheckResult {
  fired: boolean;
  expected: number;
  ratio: number;
}

export const checkSpike = ({
  recentCount,
  baselineCount,
  windowHours,
  baselineHours,
  minCount,
  multiplier,
}: SpikeCheckInput): SpikeCheckResult => {
  const expected = (baselineCount * windowHours) / baselineHours;
  const floor = Math.max(expected, SPIKE_EXPECTED_FLOOR);
  const ratio = recentCount / floor;
  return {
    fired: recentCount >= minCount && ratio >= multiplier,
    expected,
    ratio,
  };
};
