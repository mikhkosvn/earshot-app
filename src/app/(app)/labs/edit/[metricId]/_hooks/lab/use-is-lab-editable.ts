'use client';

import { useLabMetric } from './use-lab-metric';

export const useIsLabEditable = () => useLabMetric().editable;
