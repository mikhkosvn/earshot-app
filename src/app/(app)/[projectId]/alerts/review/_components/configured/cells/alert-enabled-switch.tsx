'use client';

import { Switch } from '@/components/ui/switch';
import type { AlertRow } from '@/server/alerts/types';

import { useIsUpdatingAlert } from '../../../_hooks/mutations/use-is-updating-alert';
import { useUpdateAlertMutation } from '../../../_hooks/mutations/use-update-alert-mutation';

interface AlertEnabledSwitchProps {
  alert: AlertRow;
}

export function AlertEnabledSwitch({ alert }: AlertEnabledSwitchProps) {
  const updateAlert = useUpdateAlertMutation();
  const isUpdating = useIsUpdatingAlert(alert.id);

  return (
    <Switch
      checked={alert.enabled}
      disabled={isUpdating}
      aria-label={`Enable ${alert.name}`}
      onCheckedChange={(enabled) =>
        updateAlert.mutate({ alertId: alert.id, enabled })
      }
    />
  );
}
