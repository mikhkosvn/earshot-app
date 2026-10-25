import { format } from 'date-fns';

const CREATED_AT_FORMAT = 'MM/dd/yyyy, h:mm a';

export const createdAtText = (date: Date) =>
  format(new Date(date), CREATED_AT_FORMAT);

export const scoreText = (successRate: number | null) => {
  if (successRate === null) return '-';
  return `${Math.round(successRate)}%`;
};

export const runsText = (completed: number, total: number) =>
  `${completed} / ${total}`;
