export const EnumView = {
  list: 'list',
  json: 'json',
} as const;

export type EnumView = (typeof EnumView)[keyof typeof EnumView];
