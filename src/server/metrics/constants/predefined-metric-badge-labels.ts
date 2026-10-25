import { PredefinedMetricBadge } from '@/generated/prisma/enums';

export const PredefinedMetricBadgeLabel: Record<PredefinedMetricBadge, string> =
  {
    [PredefinedMetricBadge.needs_configuration]: 'Need to be configured',
    [PredefinedMetricBadge.beta]: 'Beta',
  };
