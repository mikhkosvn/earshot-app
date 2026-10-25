import { WidgetTimePeriod } from '@/generated/prisma/enums';

export const WidgetTimePeriodLabel: Record<WidgetTimePeriod, string> = {
  [WidgetTimePeriod.hour]: 'Hour',
  [WidgetTimePeriod.day]: 'Day',
  [WidgetTimePeriod.week]: 'Week',
  [WidgetTimePeriod.month]: 'Month',
};
