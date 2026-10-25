export const PlotOutcome = {
  all: 'all',
  success: 'success',
  failure: 'failure',
} as const;

export type PlotOutcome = (typeof PlotOutcome)[keyof typeof PlotOutcome];
