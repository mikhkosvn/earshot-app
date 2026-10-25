'use client';

import { useRefreshOnStatusChange } from '../_hooks/live-status/use-refresh-on-status-change';

export function ResultLiveStatus() {
  useRefreshOnStatusChange();
  return null;
}
