import { format } from 'date-fns';

export const formatMemberSince = (date: Date) => format(date, 'MMMM d, yyyy');

export const formatLastSignIn = (date: Date | null) => {
  if (!date) return 'Never';
  return format(date, "MMMM d, yyyy 'at' h:mm a");
};
