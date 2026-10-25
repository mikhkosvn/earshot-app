import { format } from 'date-fns';

const TRIGGER_TIME_FORMAT = "MMM d, yyyy 'at' hh:mm a";

const RUN_TIME_FORMAT = 'MM/dd/yyyy, hh:mm:ss a';

export const triggerTimeText = (date: Date) =>
  format(date, TRIGGER_TIME_FORMAT);

export const runTimeText = (date: Date) => format(date, RUN_TIME_FORMAT);
