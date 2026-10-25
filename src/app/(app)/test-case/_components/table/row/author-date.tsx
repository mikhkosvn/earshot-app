'use client';

import { formatAuthorDate } from '../../../_utils/format-author-date';

interface AuthorDateProps {
  date: Date;
  author: string | null;
}

export function AuthorDate({ date, author }: AuthorDateProps) {
  return (
    <time dateTime={date.toISOString()} suppressHydrationWarning>
      {formatAuthorDate(date, author)}
    </time>
  );
}
