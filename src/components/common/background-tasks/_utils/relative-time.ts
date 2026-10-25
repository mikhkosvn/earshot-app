import { differenceInSeconds, formatDistanceToNowStrict } from 'date-fns';

const JUST_NOW_SECONDS = 60;

export const relativeTime = (date: Date) => {
  if (differenceInSeconds(new Date(), date) < JUST_NOW_SECONDS)
    return 'just now';
  return formatDistanceToNowStrict(date, { addSuffix: true });
};
