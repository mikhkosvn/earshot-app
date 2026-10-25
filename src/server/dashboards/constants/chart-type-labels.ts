import { ChartType } from '@/generated/prisma/enums';

export const ChartTypeLabel: Record<ChartType, string> = {
  [ChartType.line]: 'Line',
  [ChartType.bar]: 'Bar',
  [ChartType.pie]: 'Pie',
  [ChartType.stat]: 'Stat',
};
