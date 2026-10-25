import { ChangeDirection } from '@/generated/prisma/enums';

export const ChangeDirectionLabel: Record<ChangeDirection, string> = {
  [ChangeDirection.both]: 'Both (Increase and Decrease)',
  [ChangeDirection.increase]: 'Increase Only',
  [ChangeDirection.decrease]: 'Decrease Only',
};

export const ChangeDirectionShortLabel: Record<ChangeDirection, string> = {
  [ChangeDirection.both]: 'Both',
  [ChangeDirection.increase]: 'Increase',
  [ChangeDirection.decrease]: 'Decrease',
};
