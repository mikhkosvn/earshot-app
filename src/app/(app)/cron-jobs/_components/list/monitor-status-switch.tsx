'use client';

import { Switch } from '@/components/ui/switch';
import type { MonitorListItem } from '@/server/monitors/types';

import { useSetMonitorActiveMutation } from '../../_hooks/mutations/use-set-monitor-active-mutation';
import { MonitorStatusLabel } from './monitor-status-label';

type MonitorStatusSwitchProps = {
  monitor: MonitorListItem;
};

export function MonitorStatusSwitch({ monitor }: MonitorStatusSwitchProps) {
  const setActive = useSetMonitorActiveMutation();

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={monitor.isActive}
        disabled={setActive.isPending}
        aria-label={`Active state of ${monitor.name}`}
        onCheckedChange={(isActive) =>
          setActive.mutate({ monitorId: monitor.id, isActive })
        }
      />
      <MonitorStatusLabel isActive={monitor.isActive} />
    </div>
  );
}
