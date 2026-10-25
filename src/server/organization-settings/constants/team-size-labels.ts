import { TeamSize } from '@/generated/prisma/enums';

export const TeamSizeLabel: Record<TeamSize, string> = {
  [TeamSize.one]: '1',
  [TeamSize.under_10]: '<10',
  [TeamSize.from_10_to_100]: '10-100',
  [TeamSize.from_100_to_500]: '100-500',
  [TeamSize.over_500]: '500+',
};
