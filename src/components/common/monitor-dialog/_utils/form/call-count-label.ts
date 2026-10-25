export const callUnit = (count: number) => {
  if (count === 1) return 'call';
  return 'calls';
};

export const scenarioUnit = (count: number) => {
  if (count === 1) return 'scenario';
  return 'scenarios';
};
