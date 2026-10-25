const offsetLabel = (date: Date, timeZone: string) => {
  const part = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
  })
    .formatToParts(date)
    .find((item) => item.type === 'timeZoneName');
  const offset = part?.value.replace('GMT', '') ?? '';
  if (!offset) return 'UTC+00:00';
  return `UTC${offset}`;
};

export const formatCronDate = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';
  return `${value('weekday')}, ${value('month')} ${value('day')}, ${value('year')}, ${value('hour')}:${value('minute')}:${value('second')} (${offsetLabel(date, timeZone)})`;
};
