'use client';

import { useHasCallsQuery } from '../_hooks/call-list/use-has-calls-query';
import { CallList } from './call-list/call-list';
import { CallsEmptyState } from './empty-state/calls-empty-state';

export function CallsContent() {
  const { data: hasCalls } = useHasCallsQuery();

  if (!hasCalls) return <CallsEmptyState />;
  return <CallList />;
}
