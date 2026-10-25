export const PlotColor = {
  blue: 'blue',
  green: 'green',
  amber: 'amber',
  red: 'red',
  purple: 'purple',
  cyan: 'cyan',
  orange: 'orange',
  pink: 'pink',
} as const;

export type PlotColor = (typeof PlotColor)[keyof typeof PlotColor];

export const PLOT_COLOR_VALUE: Record<PlotColor, string> = {
  [PlotColor.blue]: '#6a8caf',
  [PlotColor.green]: '#6a9f7b',
  [PlotColor.amber]: '#d1a85a',
  [PlotColor.red]: '#c96b6b',
  [PlotColor.purple]: '#9a80c0',
  [PlotColor.cyan]: '#5aa3ad',
  [PlotColor.orange]: '#d98a4a',
  [PlotColor.pink]: '#c97a9e',
};

export const PlotColorLabel: Record<PlotColor, string> = {
  [PlotColor.blue]: 'Blue',
  [PlotColor.green]: 'Green',
  [PlotColor.amber]: 'Amber',
  [PlotColor.red]: 'Red',
  [PlotColor.purple]: 'Purple',
  [PlotColor.cyan]: 'Cyan',
  [PlotColor.orange]: 'Orange',
  [PlotColor.pink]: 'Pink',
};

export const SERIES_COLORS: string[] = Object.values(PLOT_COLOR_VALUE);
