import type { MutationStatus as QueryMutationStatus } from '@tanstack/react-query';

export const MutationStatus = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  error: 'error',
} as const satisfies Record<QueryMutationStatus, QueryMutationStatus>;

export type MutationStatus =
  (typeof MutationStatus)[keyof typeof MutationStatus];
