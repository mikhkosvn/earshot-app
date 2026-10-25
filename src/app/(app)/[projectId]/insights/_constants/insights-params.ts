import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

import {
  INSIGHT_DEFAULT_FROM,
  INSIGHT_DEFAULT_TO,
} from '@/server/insights/constants/insight-limits';

export const insightsParsers = {
  from: parseAsString.withDefault(INSIGHT_DEFAULT_FROM),
  to: parseAsString.withDefault(INSIGHT_DEFAULT_TO),
  agent: parseAsInteger,
};

export const loadInsightsParams = createLoader(insightsParsers);

export const ALL_AGENTS = 0;
