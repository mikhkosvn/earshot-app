'use client';

import { useMetricBodyText } from './use-metric-body-text';

export const useHasBodyText = () => useMetricBodyText().trim().length > 0;
