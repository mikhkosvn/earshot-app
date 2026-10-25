export const PlotDataKind = {
  stat: 'stat',
  buckets: 'buckets',
  points: 'points',
  slices: 'slices',
} as const;

export type PlotDataKind = (typeof PlotDataKind)[keyof typeof PlotDataKind];
