export type CronHelpSection = {
  title: string;
  lines: string[];
};

export const CRON_HELP_SECTIONS: CronHelpSection[] = [
  {
    title: 'How to Use',
    lines: [
      "You can define a monitor's schedule in two ways: using the visual builder or manual input. The visual builder provides a user-friendly interface to set up your schedule, while manual input allows you to enter a cron expression directly.",
    ],
  },
  {
    title: 'Cron Expression Format',
    lines: [
      'A cron expression consists of five fields: minute hour day-of-month month day-of-week. Each field can contain numbers, ranges, lists, or special characters.',
    ],
  },
  {
    title: 'Special Characters',
    lines: [
      '* - Matches any value',
      '*/n - Runs every n units',
      ', - Separates values in a list',
      '- - Defines a range',
      'L - Last day of the month (for day-of-month field)',
    ],
  },
  {
    title: 'Examples',
    lines: [
      '*/5 * * * * - Every 5 minutes',
      '0 */2 * * * - Every 2 hours',
      '0 0 * * * - Daily at midnight',
      '0 0 * * 1 - Weekly on Monday',
      '0 0 1 * * - Monthly on the 1st',
    ],
  },
  {
    title: 'Timezone',
    lines: [
      'Select your local timezone to ensure the monitor runs at the correct time. The timezone affects when runs will be triggered relative to your local time.',
    ],
  },
];

export type CronPart = {
  label: string;
  hint: string;
};

export const CRON_PARTS: CronPart[] = [
  { label: 'Minute', hint: 'e.g. *, */5, 0-59, 30' },
  { label: 'Hour', hint: 'e.g. *, */2, 0-23, 14' },
  { label: 'Day of Month', hint: 'e.g. *, 1-31, 15,L: Last day of month' },
  { label: 'Month', hint: 'e.g. *, 1-12, 6' },
  { label: 'Day of Week', hint: 'e.g. *, 0-6 (0 = Sunday)' },
];
