export const TileUnit = {
  percent: 'percent',
  score: 'score',
  value: 'value',
  text: 'text',
} as const;

export type TileUnit = (typeof TileUnit)[keyof typeof TileUnit];
