import { NotifyOn } from '@/generated/prisma/enums';

export const NotifyOnLabel: Record<NotifyOn, string> = {
  [NotifyOn.never]: 'Never',
  [NotifyOn.success]: 'Success',
  [NotifyOn.failure]: 'Failure',
  [NotifyOn.both]: 'Both',
};
