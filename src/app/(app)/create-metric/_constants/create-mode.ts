export const CreateMode = {
  quick: 'quick',
  detail: 'detail',
} as const;

export type CreateMode = (typeof CreateMode)[keyof typeof CreateMode];
