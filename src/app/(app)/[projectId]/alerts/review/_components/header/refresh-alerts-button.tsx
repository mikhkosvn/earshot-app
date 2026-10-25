'use client';

import { RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useRefreshAlerts } from '../../_hooks/use-refresh-alerts';

export function RefreshAlertsButton() {
  const refresh = useRefreshAlerts();

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs"
      disabled={refresh.isPending}
      onClick={() => refresh.mutate()}
    >
      <RefreshCwIcon className={cn(refresh.isPending && 'animate-spin')} />
      Refresh
    </Button>
  );
}
