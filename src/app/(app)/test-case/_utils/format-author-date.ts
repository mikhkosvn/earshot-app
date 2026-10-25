import { format } from 'date-fns';

export const formatAuthorDate = (date: Date, author: string | null) => {
  const text = format(date, 'MM/dd, HH:mm');
  if (!author) return text;
  return `${text} (${author})`;
};
