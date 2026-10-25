import { format } from 'date-fns';

export const formatVersionDate = (date: Date) =>
  format(date, 'MMM d, yyyy · hh:mm a');

export const recordCountText = (count: number) => {
  if (count === 1) return '1 record';
  return `${count} records`;
};

export const versionLabel = (version: number) => `v${version}`;
