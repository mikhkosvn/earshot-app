import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { MetricEvalType } from '@/generated/prisma/enums';
import { alertsParser } from '@/lib/url-generator/parsers';
import { DEFAULT_ALERT_WINDOW_HOURS } from '@/server/alerts/constants/alert-window';

export const ALERT_SEARCH_PARAM = 'search';

export const alertsPageParsers = {
  hours: alertsParser.hours.withDefault(DEFAULT_ALERT_WINDOW_HOURS),
  [ALERT_SEARCH_PARAM]: parseAsString.withDefault(''),
  scope: parseAsInteger,
  type: parseAsStringLiteral(Object.values(MetricEvalType)),
};

export const loadAlertsPageParams = createLoader(alertsPageParsers);
