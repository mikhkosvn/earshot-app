export const ReviewViewState = {
  progress: 'progress',
  failed: 'failed',
  insufficient: 'insufficient',
  groups: 'groups',
} as const;

export type ReviewViewState =
  (typeof ReviewViewState)[keyof typeof ReviewViewState];
