const plural = (count: number, singular: string, many: string) => {
  if (count === 1) return singular;
  return many;
};

export const skippedMetricsText = (count: number) =>
  `${count} ${plural(count, 'metric', 'metrics')} won't be evaluated on this run`;

export const runCountText = (count: number) =>
  `${count} ${plural(count, 'run', 'runs')}`;

export const testCaseCountText = (count: number) =>
  `${count} ${plural(count, 'test case', 'test cases')}`;

export const problemCountText = (count: number) =>
  `The spec has ${count} ${plural(count, 'problem', 'problems')}`;

export const moreFieldsText = (open: boolean) => {
  if (open) return 'Show fewer fields';
  return 'Show 5 more fields';
};
